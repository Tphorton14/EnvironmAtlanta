var db = require("../models");

module.exports = function(app){

    app.post("/api/users", function (req,res){
        db.User.create(req.body).then(function(dbUser){
            res.json(dbUser);
        });
    });
}