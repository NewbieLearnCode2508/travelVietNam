async function load() {
    let header = document.getElementById("header");
    let content = document.getElementById("content");
    let sublist = document.querySelector(".navbar-item__sublist");
    const contentMain = document.querySelector(".content-main .row");

    //Load main conten
    const dataUrl =
        "https://64069dc5862956433e556a26.mockapi.io/v1/diaDiemDuLich";

    const response = await fetch(dataUrl);
    const jsonData = await response.json();
    let innerHtmlMainContent = "";
    function loadDataMainContent() {
        jsonData.forEach((element) => {
            let date = element.ngayXuatPhat.split("-");
            let day = date[2];
            let month = date[1];
            let year = date[0];
            if (element.giaCu != 0) {
                innerHtmlMainContent += `<div class="col l-3 m-6 s-12">
                    <div class="widget">
                        <div style="background: url(${element.imgsTour[0]})
                        no-repeat center/cover;" class="widget__photo"></div>
                        <div class="widget__button">Đặt vé</div>
                        <div class="widget__details">
                            <div class="widget__name">
                                ${element.diaDiem}
                            </div>
                            <div class="widget__vehicle">${
                                element.phuongTien
                            }</div>
                            <div class="widget__info">
                                <div class="center">
                                    <span> khởi hành lúc: </span>
                                    <span class="widget__info-time">
                                        Ngày ${day} tháng ${month} năm ${year}
                                    </span>
                                    </div>
                                    <div class="center">
                                    <span>Thời gian:</span>
                                    <span class="widget__info-date">
                                        ${element.soNgay} ngày
                                    </span>
                                </div>
                                <div class="center">
                                    <span class="widget__info-date">
                                        ${element.giaVe} vnđ
                                    </span>
                                </div>
                                <div class="center">
                                    <span
                                        class="widget__info-price--old"
                                    >
                                        ${
                                            element.giaCu != 0
                                                ? element.giaCu
                                                : ""
                                        } vnđ
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
            }
        });
        if (contentMain) {
            contentMain.innerHTML = innerHtmlMainContent;
        }
        const showIntrolBtn = document.getElementById("showIntrolBtn");
        if (showIntrolBtn) {
            showIntrolBtn.onclick = () => {
                const videoIntrol = document.querySelector(".video-introl");
                videoIntrol.style.opacity = 1;
                videoIntrol.style.userSelect = "all";
                videoIntrol.style.pointerEvents = "all";
            };
            document.querySelector(".video-introl .bg-blur").onclick = () => {
                const videoIntrol = document.querySelector(".video-introl");
                videoIntrol.style.opacity = 0;
                videoIntrol.style.userSelect = "none";
                videoIntrol.style.pointerEvents = "none";
            };
        }

    }
    loadDataMainContent();
    //Margin top cho phần content
    if (sublist.clientHeight > window.innerHeight - header.clientHeight) {
        sublist.style.overflow = "scroll";
    }
    sublist.style.maxHeight = `calc((100vh) - ${header.clientHeight}px)`;
    content.style.marginTop = `${header.clientHeight}px`;

    //setup slider
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

    //tùy chỉnh nút next prev của slider
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
