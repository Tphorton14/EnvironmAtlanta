const express = require('express');
const passport = require('passport');
const session = require('express-session');
const path = require('path');
const PORT = process.env.PORT || 8080;
const fs = require('fs');
require('dotenv').config();
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
//const LocalStrategy = require('passport-local').Strategy;
const api_routes = require('./routes/api-routes');
const { sequelize, User } = require('./models');



const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);
require("./routes/user-api-routes.js")(app);

// passport.use(new LocalStrategy(
//   function(username, password, done) {
// //     // User.findOne({ username: username }, function(err, user) {
// //     //   if (err) { return done(err); }
// //     //   if (!user) {
// //     //     return done(null, false, { message: 'Incorrect username.' });
// //     //   }
// //     //   if (!user.validPassword(password)) {
// //     //     return done(null, false, { message: 'Incorrect password.' });
// //     //   }
// //     //   return done(null, user);
// //     // });
//   }
// ));

// //Storing user to server 
passport.serializeUser(function (user, done) {
  console.log(user);
  done(null, user);
});
// // Removing users to Server
passport.deserializeUser(function (user, done) {
  done(null, user);
});

// //Session-Storage
app.use(session({
  secret: 'FTNQNguUmcYTTrzWiFMr8lqFGKqaXgH1',
  resave: false,
  saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());

//Routes for Google Sign-In
app.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function (req, res) {
    res.redirect('/');
  });

// Use the GoogleStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a token, tokenSecret, and Google profile), and
//   invoke a callback with a user object.

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:8080/auth/google/callback"
},
  function (accessToken, refreshToken, profile, done) {
    console.log(profile)
    User.findOrCreate({
      where: {
        googleId: profile.id,
        name: profile.displayName
      },
      // defaults: {
      //   name: profile.displayName
      // }
    }).then(user => {
      console.log(user)
      return done(null, user);
    });
  }
));

//Google Sign-In
app.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

sequelize.sync({force: true})
  .then(() => app.listen(PORT, () => console.log('Listening on port %s', PORT)));

module.exports = app;