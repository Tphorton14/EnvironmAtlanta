var db = require("../models");
var axios = require("axios");

var NewsAPI = require('newsapi');
const newsapi = new NewsAPI('185145ab685d4df1bd29d79b88c3cc79');
var today = new Date();
var ddToday = String(today.getDate()).padStart(2, '0');
var mmToday = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyyToday = today.getFullYear();

today = yyyyToday + '-' + ddToday + '-' + mmToday;
var todayString = today.toDateString;
console.log(todayString);

var lastWeek = new Date();
var ddLastWeek = String(lastWeek.getDate()).padStart(2, '0');
var mmLastWeek = String(lastWeek.getMonth()).padStart(2, '0');
var yyyyLastWeek = lastWeek.getFullYear();
lastWeek = yyyyLastWeek; + '-' + ddLastWeek + '-' + mmLastWeek;
var lastWeekString = lastWeek.toDateString;
console.log(lastWeekString);

// Routes
// =============================================================
module.exports = function (app) {


  app.post("/api/earth911", function (req, res) {
    const { city, zip } = req.body
    const apiKey = "eb8ae1e5f2bbf847";
    const googleApiKey = 'AIzaSyCP3IsvfAnbbGkV3UMS_LfA06n4hulTel0'
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${city},+${zip}&key=${googleApiKey}`
    // const url = `http://api.earth911.com/earth911.getPostalData?country=US&postal_code=${zip}&city=${city}&api_key=${apiKey}`
    axios.get(url).then(response => {
      console.log(response.data.results[0].geometry.location)
      const { lat, lng } = response.data.results[0].geometry.location
      const url = `http://api.earth911.com/earth911.searchLocations?latitude=${lat}&longitude=${lng}&api_key=${apiKey}`
      axios.get(url).then(response => {
        const data = response.data.result.filter(el => {
          return (
            !el.description.includes('Goodwill')
            && (el.location_type_id === 1
              || el.location_type_id === 13
              || el.location_type_id === 31)
          )
        })
        res.json(data)
      })
    })
  })

  // GET route for getting all of the posts (COMMUNITY PAGE)
  app.get("/api/posts/", function (req, res) {
    db.Post.findAll()
      .then(function (dbPost) {
        res.json(dbPost);
      });
  });


  // GET route for retrieving a User's posts (COMMUNITY PAGE)
  app.get("/api/posts/:user", function (req, res) {
    db.Post.findOne({
      where: {
        id: req.params.user
      }
    })
      .then(function (dbPost) {
        res.json(dbPost);
      });
  });

  // POST route for saving a new post (COMMUNITY PAGE)
  app.post("/api/posts", function (req, res) {
    console.log(req.body);
    db.User.findOne({
      where: {
        name: req.body.user
      }
    }).then(function(user) {
      console.log(user, "user")
      if (user){
        user.createPost({
          name: user.name,
          body: req.body.body,
        })
          .then(function (dbPost) {
            res.json(dbPost);
          });
      }
    })
    db.Post.create({
      user: req.body.user,
      body: req.body.body,
    })
      .then(function (dbPost) {
        res.json(dbPost);
      });
  });

  // DELETE route for deleting posts (COMMUNITY PAGE)
  app.delete("/api/posts/:id", function (req, res) {
    db.Post.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(function (dbPost) {
        res.json(dbPost);
      });
  });

  app.get("/api/newsfeed", function (req, res) {
    newsapi.v2.everything({
      q: 'recycling',
      sources: 'newsweek, time, the-huffington-post, bbc-news, cnn, the-new-york-times',
      domains: 'newsweek.com, time.com, huffpost.com, www.bbc.com, cnn.com, nytimes.com',
      from: lastWeekString,
      to: todayString,
      language: 'en',
      sortBy: 'date',
      page: 2
    }).then(response => {
      console.log(response);
      res.json(response);
    })
  })
}

