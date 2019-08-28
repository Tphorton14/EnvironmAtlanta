
    module.exports = function(app) {
        app.get("/newsFeed", function(req, res) {
          res.sendFile(path.join(__dirname, "../newsFeed.html"));
        });
}