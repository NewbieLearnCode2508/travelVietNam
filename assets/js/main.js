function load() {
    let header = document.getElementById("header");
    let content = document.getElementById("content");
    let sublist = document.querySelector(".navbar-item__sublist");

    if (sublist.clientHeight > window.innerHeight - header.clientHeight) {
        sublist.style.overflow = "scroll";
    }
    sublist.style.maxHeight = `calc((100vh) - ${header.clientHeight}px)`;
    content.style.marginTop = `${header.clientHeight}px`;

    $(document).ready(function () {
        $(".content-slider").slick({
            centerMode: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            infinite: true,
            cssEase: "linear",
            variableWidth: true,
            variableHeight: true,
            arrows: false,
        });
    });

    $(".content-slider__prev-btn").click(function (e) {
        e.preventDefault();
        $(".content-slider").slick("slickPrev");
    });

    $(".content-slider__next-btn").click(function (e) {
        e.preventDefault();
        $(".content-slider").slick("slickNext");
    });
}

load();
