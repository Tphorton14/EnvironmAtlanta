$(document).ready(function () {

    let nameInput = $("#name");
    let usernameInput = $("#username");
    let passwordInput = $("#password");
    let cityInput = $("#city");
    let zipcodeInput = $("#zipcode");
    console.log('loaded')
    $("#createUser").on("click", handleFormSubmit);

    function handleFormSubmit(event){
        event.preventDefault();
        console.log('clicked')
        if(!nameInput.val().trim()|| !usernameInput.val().trim() || !usernameInput.val().trim()){
            return;
        }

        let newUser = {
            name: nameInput.val().trim(),
            userName: usernameInput.val().trim(),
            password: passwordInput.val().trim()
            
        };
        submitUser(newUser);
    }

    function submitUser(user){
        $.post("/api/users", user, function() {
            window.location.href = "/"
            console.log(newUser)
        });
    }
})