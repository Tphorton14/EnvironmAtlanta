$(document).ready(function () {

    function getUser() {
        console.log(document.cookie);
        // const user = $.cookie("user");
        var cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)user\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        const name = cookieValue.replace('%20', ' ')
        console.log(name);
        $("#welcomeUser").append(`<p>${name}</p>`);
    }

    getUser();

    $('#current-user').on('click', getUser);

    let nameInput = $("#name");
    let usernameInput = $("#username");
    let passwordInput = $("#password");
    let cityInput = $("#city");
    let zipcodeInput = $("#zipcode");
    console.log('loaded')
    $("#createUser").on("click", handleFormSubmit);

    function handleFormSubmit(event) {
        event.preventDefault();
        console.log('clicked')
        if (!nameInput.val().trim() || !usernameInput.val().trim() || !usernameInput.val().trim()) {
            return;
        }

        let newUser = {
            name: nameInput.val().trim(),
            userName: usernameInput.val().trim(),
            password: passwordInput.val().trim()

        };
        submitUser(newUser);
    }

    function submitUser(user) {
        console.log(user)
        $.post("/api/users", user, function () {
            window.location.href = "/"
            console.log(newUser)
        });
    }

    $('#signInUser').click(() => {
        $.get('/login', () => {

        })
    })


})