$(document).ready(function () {
    $("#submit").on("click", function (event) {
        event.preventDefault();

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
                
                console.log(data);

            });
        } else {
            alert("Please fill out all fields before submitting!");
        }
    });
});
