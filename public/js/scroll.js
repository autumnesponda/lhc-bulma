$("#scroll-button, #services-link").click(function () {
    $('html, body').animate({
        scrollTop: $("#services").offset().top
    }, 1400);
});