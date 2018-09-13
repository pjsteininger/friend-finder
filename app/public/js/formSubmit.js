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

            // AJAX post the data to the friends API.
            $.post("/api/friends", userData, function (data) {
                var friendSug = $("<div>");
                friendSug.css({
                    "max-height": "600px",
                    "max-width": "800px",
                    "background-color": "rgba(0,0,0,0.4)",
                    "text-align": "center",
                    margin: "25vh auto",

                });
                friendSug.append($("<div>").css({
                    height: "50%",
                    width: "50%",
                    "background-color": "rgba(20,20,20,0.9",
                    "text-align": "center",
                    margin: "auto",
                    padding: "200px, 100px, 200px, 100px"
                }));
                var imgSources = [data.fiveFriend.photo,
                    data.oneFriend.photo,
                    data.zeroFriend.photo,
                    data.totalFriend.photo];
                friendSug.children().append("<img src='"+imgSources[0]+"' alt='profile pic' height=200px>");
                $("body").append(friendSug);
                console.log(data);

            });
        } else {
            alert("Please fill out all fields before submitting!");
        }
    });
});
