var friendList = require("../data/friends");

module.exports = function(app) {

    app.get("/api/friends", function(req,res) {
        res.json(friendList);
    });

    app.post("/api/friends", function(req, res){
        if (req.body) {
            friendList.push(req.body);
            //TODO add friend to friend list
        }
    });
}