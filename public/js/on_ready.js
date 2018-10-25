$(document).ready(function () {

    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function () {

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        $(".navbar-burger").toggleClass("is-active");
        $(".navbar-menu").toggleClass("is-active");
    });

    $("#hinge").mouseover(function () {
        $("#hinge").addClass("animated hinge slower delay-2s");
    });

    $(".delete").click(function () {
        $(".success-notification").fadeOut("slow");
        $(".error-notification").fadeOut("slow");
    });
});