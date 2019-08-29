var db = require("../../models");

// Routes
// =============================================================
module.exports = function (app) {

    // GET route for getting all of the posts (COMMUNITY PAGE)
    app.get("/api/posts/", function (req, res) {
        db.Post.findAll({})
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

    app.post("/api/newsFeed/", function (req, res) {
        db.Post.create({})
            .then(function (dbPost) {
                res.send(dbPost);
            });
    });

    app.get("/api/newsFeed/", function (req, res) {
        db.Post.findAll({})
            .then(function (dbPost) {
                res.json(dbPost);
            });
    });

};
