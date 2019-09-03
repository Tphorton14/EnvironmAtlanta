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
    const zip = req.body.zip
    const apiKey = "eb8ae1e5f2bbf847";
    const url = `http://api.earth911.com/earth911.getPostalData?country=US&postal_code=${zip}&api_key=${apiKey}`
    axios.get(url).then(response => {
      const { longitude, latitude } = response.data.result
      const url = `http://api.earth911.com/earth911.searchLocations?latitude=${latitude}&longitude=${longitude}&api_key=${apiKey}`
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
        userName: req.body.user
      }
    }).then(function (user) {
      if (user) {
        db.Post.create({
          userId: user.id,
          body: req.body.body,
        })
          .then(function (dbPost) {
            res.json(dbPost);
          });
      }
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

