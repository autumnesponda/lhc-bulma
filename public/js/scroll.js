$("#scroll-button").click(function () {
    $('html, body').animate({
        scrollTop: $("#services").offset().top
    }, 1000);
});