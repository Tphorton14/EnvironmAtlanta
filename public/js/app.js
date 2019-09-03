$("#go").on("click", function (event) {
    event.preventDefault();
    const city = $('#inputCity').val()
    const zip = $('#inputZip').val()
    $.post('/api/earth911', { zip: zip }, function (data) {
        console.log(data);
        data.forEach(el => {
            $('#location').append(`<p>${el.description}</p>`)
        })
    })
});