var friendList = require("../data/friends");
const reducer = (accumulator, currentValue) => accumulator + currentValue;

module.exports = function(app) {

    app.get("/api/friends", function(req,res) {
        res.json(friendList);
    });

    app.post("/api/friends", function(req, res){
        if (req.body) {
            var searchScores = req.body.scores;
            var compareScores = new Array(searchScores.length);
            friendList.forEach(function(e) {
                e.scores.forEach(function(e,i) {
                    compareScores[i] = Math.abs(e - searchScores[i]);
                });
                console.log(compareScores);

            });


            friendList.push(req.body);
            res.send(friendList);
        }
    });
}