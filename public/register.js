$(document).ready( function() {
    $('#registrationForm').click(function () {
        var email = $("#email").val();
        var password = $("#password").val();
        var user = {
            email: email,
            password: password
        };

        $.ajax({
            type: 'POST',
            url: '/registerToDb',
            data: user,
            success: () => {
                console.log("ajax call success");
            }
        });
    });
});
