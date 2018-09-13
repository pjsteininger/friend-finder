var Friend = function (name, photo, scores) {
    this.name = name;
    this.photo = photo;
    this.scores = scores;
}

var friendList = [
    new Friend("Jim", "https://pbs.twimg.com/profile_images/3171824697/ef75d90df2e65ce326acf30262df5918_400x400.jpeg",
        [3, 5, 3, 3, 4, 2, 5, 4, 4, 1, 1, 2]),
    new Friend("Rando Catfishian", "https://upload.wikimedia.org/wikipedia/commons/d/d8/Channelcat.jpg",
        Array.from({ length: 12 }, () => Math.floor(1 + Math.random() * 5)))
]

module.exports = {
    friendList: friendList,
    Friend: Friend
};