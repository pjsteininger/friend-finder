var friendList = require("../data/friends");
const reducer = (accumulator, currentValue) => accumulator + currentValue;

module.exports = function (app) {

    app.get("/api/friends", function (req, res) {
        res.json(friendList);
    });

    app.post("/api/friends", function (req, res) {
        if (req.body) {
            var submitScores = req.body.scores;
            var friendScores = new Array(friendList.length);
            for (var i = 0; i < friendList.length; i++) {
                var otherScores = friendList[i].scores;
                var diff = new Array(otherScores.length);
                var fives = 0;
                var ones = 0;
                var zeroes = 0;
                for (var j = 0; j < otherScores.length; j++) {
                    diff[j] = submitScores[j] - otherScores[j];
                    if (diff[j] == 0) {
                        zeroes++;
                    }
                    if (submitScores[j] == otherScores[j]) {
                        if (submitScores[j] == 5) {
                            fives++;
                        } else if (submitScores[j] == 1) {
                            ones++;
                        }
                    }
                }
                friendScores[i] = {
                    friend: {
                        name: friendList[i].name,
                        photo: friendList[i].photo
                    },
                    compare: {
                        diff: diff,
                        zeroes: zeroes
                    },
                    matches: {
                        fives: fives,
                        ones: ones
                    }
                }
            }
            var zeroFriend = {
                name: "",
                photo: "",
                zeroes: 0
            }
            var fiveFriend = {
                name: "",
                photo: "",
                fives: []
            }
            var oneFriend = {
                name: "",
                photo: "",
                ones: []
            }
            var totalFriend = {
                name: "",
                photo: "",
                total: 0
            }
            
            
            friendScores.forEach(function(e,i) {
                if (Math.random() < 0.5) {

                }


            });
            friendList.push({
                name: req.body.name,
                photo: req.body.photo,
                scores: req.body.scores
            });
            res.send(friendScores);
        }
    });
}