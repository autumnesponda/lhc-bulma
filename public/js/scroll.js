$("#scroll-button").click(function () {
    $('html, body').animate({
        scrollTop: $("#portfolio").offset().top
    }, 2000);
});