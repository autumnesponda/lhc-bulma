$(document).ready( function() {
    $('#loginForm').click(function () {
        var email = $("#email").val();
        var password = $("#password").val();
        var user = {
            email: email,
            password: password
        };
        $.ajax({
            type: 'POST',
            url: '/login',
            data: user,
            success: (data) => {
                debugger;
                console.log(data);
                console.log("ajax call success function");
            }
        });
    });
});
