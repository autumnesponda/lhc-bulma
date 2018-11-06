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

    $(".slider").slick({
        autoplay: true,
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        lazyLoad: 'ondemand',
        centerMode: true,
        centerPadding: '60px',
        responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true,
                    lazyLoad: 'ondemand',
                    arrows: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                    lazyLoad: 'ondemand',
                    arrows: false
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                    lazyLoad: 'ondemand',
                    arrows: false
                }
            }
        ]
    });
});