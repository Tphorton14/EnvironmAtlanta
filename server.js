const express = require('express');
const passport = require('passport');
const session = require('express-session');
const path = require('path');
const PORT = process.env.PORT || 8080;
const fs = require('fs');
// const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const LocalStrategy = require('passport-local').Strategy;
const api_routes = require('./routes/api-routes');
const { sequelize, User } = require('./models');



const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);
require("./routes/user-api-routes.js")(app);

passport.use(new LocalStrategy(
  function (username, password, done) {
    // return done(null, true);

    User.findOne({
      where: {
        username: username
      }
    }).then(user => {
      if (user) {
        const valid = user.validatePassword(password);

        if (valid) return done(null, user);

        return done(null, false);
      } else {
        done(null, false);
      }
    })

    // User.findOne({ username: username }, function (err, user) {
    //   if (err) { return done(err); }
    //   if (!user) {
    //     return done(null, false, { message: 'Incorrect username.' });
    //   }
    //   if (!user.validPassword(password)) {
    //     return done(null, false, { message: 'Incorrect password.' });
    //   }
    //   return done(null, user);
    // });
  }
));

passport.serializeUser(function (user, done) {
  console.log(user);
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});


app.use(session({
  secret: 'FTNQNguUmcYTTrzWiFMr8lqFGKqaXgH1',
  resave: false,
  saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'))
  // if (req.user) {
  //   res.send(`Welcome ${req.user.displayName}!`);
  // } else res.redirect('/login');
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'))
  // if (req.user) {
  //   res.send(`Welcome ${req.user.displayName}!`);
  // } else res.redirect('/login');
});

app.post('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
);

app.use('/api', api_routes);

// app.use('/', api_routes);

sequelize.sync({force: false})
  .then(() => app.listen(PORT, () => console.log('Listening on port %s', PORT)));

module.exports = app;















    // app.get('/login', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

    // app.get('/auth/google/callback',
    //   passport.authenticate('google', { failureRedirect: '/login' }),
    //   function (req, res) {
    //     console.log(req.user.displayName);
    //     res.redirect('/');
    //   });
// })