$("#scroll-button").click(function () {
    $('html, body').animate({
        scrollTop: $("#footer").offset().top
    }, 2000);
});