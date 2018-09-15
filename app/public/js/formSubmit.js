$(document).ready(function () {














    $("#submit").on("click", function (event) {
        event.preventDefault();


        var interests = ["books", "art", "music", "television", "movies", "food", "games", "sports", "exercise", "outdoors", "crafts", "cars"];
        // Form validation
        function validateForm() {
            var isValid = true;
            $(".form-control").each(function () {
                if ($(this).val() === "") {
                    isValid = false;
                }
            });

            $(".chosen-select").each(function () {

                if ($(this).val() === "") {
                    isValid = false;
                }
            });
            return isValid;
        }

        // If all required fields are filled
        if (validateForm()) {
            // Create an object for the user"s data
            var userData = {
                name: $("#name").val(),
                photo: $("#photo").val(),
                scores: [
                    $("#q-books").val(),
                    $("#q-art").val(),
                    $("#q-music").val(),
                    $("#q-tv").val(),
                    $("#q-movies").val(),
                    $("#q-food").val(),
                    $("#q-games").val(),
                    $("#q-sports").val(),
                    $("#q-exercise").val(),
                    $("#q-outdoors").val(),
                    $("#q-crafts").val(),
                    $("#q-cars").val()
                ]
            };

            $.get(userData.photo)
                .done(function () {
                    $.post("/api/friends", userData).then(createModal);
                })
                .fail(function () {
                    userData.photo = '../images/profiledefault.png';
                    $.post("/api/friends", userData).then(createModal);
                });
            $.get(userData.photo)
                .done(function () {
                    console.log("success");
                })
                .fail(function () {
                    userData.photo = '../images/profiledefault.png';
                    console.log("new photo");
                });

            // AJAX post the data to the friends API.
            var createModal = function (data) {
                var frModal = $("<div>").css({
                    "top": "0",
                    "right": "0",
                    "left": "0",
                    "bottom": "0",
                    "background-color": "rgba(0,0,0,0.4)",
                    "text-align": "center",
                    "position": "absolute",
                });
                $(frModal).on("click", function () {
                    $(frModal).remove();
                });
                var msgBox = $("<div>").css({
                    "position": "absolute",
                    "left": "15%",
                    "top": "15%",
                    "max-height": "70%",
                    "width": "70%",
                    "background-color": "rgba(40,40,40,0.7)",
                    "text-align": "center",
                    "margin": "auto",
                    "border-radius": "1em",
                    "border": "1px solid rgba(10,10,10,0.9)"
                });

                var imgSources = [data.fiveFriend.photo,
                data.oneFriend.photo,
                data.zeroFriend.photo,
                data.totalFriend.photo];
                var profileImg = $("<img>");





                profileImg.attr({
                    src: imgSources[0],
                    alt: 'profile pic',
                });
                profileImg.css({
                    "max-width": "50%",
                    "max-height": "300px",
                    "margin": "5vh auto ",
                    "display": "block"
                });
                var msg = $("<h2>");
                msg.css({
                    "width": "80%",
                    "color": "rgb(230,230,240)",
                    "background-color": "rgb(30,30,30)",
                    "margin": "auto auto 5vh auto",
                    "padding": "5%",
                    "position": "block",
                    "border-radius": "5px"
                });
                msg.text("You matched with "+data.fiveFriend.name+"!");
                msgBox.append(profileImg);
                msgBox.append(msg);
                frModal.append(msgBox);
                $("body").append(frModal);
                // console.log(data);
            };

        } else {
            alert("Please fill out all fields before submitting!");
        }
    });
});
