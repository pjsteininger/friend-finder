var fr = require("../data/friends");
var Friend = fr.Friend;
var friendList = fr.friendList;
const reducer = (accumulator, currentValue) => accumulator + currentValue;
module.exports = function (app) {

    app.get("/api/friends", function (req, res) {
        res.json(friendList);
    });

    app.post("/api/friends", function (req, res) {
        if (req.body) {
            var submitScores = Array(req.body.scores.length);
            req.body.scores.forEach((e, i) => {
                submitScores[i] = parseInt(e);
            });
            var friendScores = new Array(friendList.length);
            for (var i = 0; i < friendList.length; i++) {
                var otherScores = friendList[i].scores;
                var diff = new Array(otherScores.length);
                var fives = 0;
                var ones = 0;
                var zeroes = 0;
                for (var j = 0; j < otherScores.length; j++) {
                    diff[j] = Math.abs(submitScores[j] - otherScores[j]);
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
            friendSuggestions = {
                zeroFriend: {
                    name: friendScores[0].friend.name,
                    photo: friendScores[0].friend.photo,
                    zeroes: friendScores[0].compare.zeroes
                },
                fiveFriend: {
                    name: friendScores[0].friend.name,
                    photo: friendScores[0].friend.photo,
                    fives: friendScores[0].matches.fives
                },
                oneFriend: {
                    name: friendScores[0].friend.name,
                    photo: friendScores[0].friend.photo,
                    ones: friendScores[0].matches.ones
                },
                totalFriend: {
                    name: friendScores[0].friend.name,
                    photo: friendScores[0].friend.photo,
                    total: friendScores[0].compare.diff.reduce(reducer)
                }
            }


            for (var i = 1; i < friendScores.length; i++) {
                if (friendScores[i].compare.zeroes > friendSuggestions.zeroFriend.zeroes) {
                    friendSuggestions.zeroFriend.zeroes = friendScores[i].compare.zeroes;
                    friendSuggestions.zeroFriend.name = friendScores[i].friend.name;
                    friendSuggestions.zeroFriend.photo = friendScores[i].friend.photo;
                }
                if (friendScores[i].matches.fives > friendSuggestions.fiveFriend.fives) {
                    friendSuggestions.fiveFriend.fives = friendScores[i].matches.fives;
                    friendSuggestions.fiveFriend.name = friendScores[i].friend.name;
                    friendSuggestions.fiveFriend.photo = friendScores[i].friend.photo;
                }
                if (friendScores[i].matches.ones > friendSuggestions.oneFriend.ones) {
                    friendSuggestions.oneFriend.ones = friendScores[i].matches.ones;
                    friendSuggestions.oneFriend.name = friendScores[i].friend.name;
                    friendSuggestions.oneFriend.photo = friendScores[i].friend.photo;
                }
                if (friendScores[i].compare.diff.reduce(reducer) < friendSuggestions.totalFriend.total) {
                    friendSuggestions.totalFriend.total = friendScores[i].compare.diff.reduce(reducer);
                    friendSuggestions.totalFriend.name = friendScores[i].friend.name;
                    friendSuggestions.totalFriend.photo = friendScores[i].friend.photo;
                }
                if (Math.random() < 0.5) {

                }
            };

            friendList.push(new Friend(req.body.name, req.body.photo, submitScores));
            res.send(friendSuggestions);
        }
    });
}