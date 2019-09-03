

$("#location").hide();
$(document).ready(function () {

    $("#go").on("click", function (event) {
        event.preventDefault();
        $("#location").show();
        const city = $('#inputCity').val()
        const zip = $('#inputZip').val()
        $.post('/api/earth911', { city: city, zip: zip }, function (data) {
            console.log(data);
            data.forEach(el => {
                $('#location').append(`<p>${el.description} ${el.distance} miles away</p>`);
            })
        })
    });
});