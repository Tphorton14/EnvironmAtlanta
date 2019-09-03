

var path = require("path");


module.exports = function(app) {
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
      });
    app.get("/recycleNearYou", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/recycleNearYou.html"));
      });
    app.get("/charity", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/charity.html"));
      });
    app.get("/newsfeed", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/newsfeed.html"));
      });
    app.get("/community", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/community.html"));
      });
}