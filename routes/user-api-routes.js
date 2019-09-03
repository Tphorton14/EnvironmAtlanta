var db = require("../models");
require('dotenv').config();
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const { sequelize, User } = require('../models');
const passport = require('passport');
const session = require('express-session');

module.exports = function (app) {

    app.post("/api/users", function (req, res) {
        console.log('fired')
        db.User.create(req.body).then(function (dbUser) {
            res.json(dbUser);
        });
    });

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
                return done(null,user);
               // return profile.displayName;
            });
        }
    ));

    //Google Sign-In
    app.get('/auth/google',
        passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login']}));

    app.get('/auth/google/callback',
        passport.authenticate('google', { failureRedirect: '/login' }),
        function (req, res) {
            res.redirect('/');
        });
}