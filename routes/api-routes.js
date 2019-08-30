var db = require("../models");
var axios = require("axios");

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


};
