let array = [];
let numberslider = 7;
//Load main conten
const dataUrl = "https://64069dc5862956433e556a26.mockapi.io/v1/diaDiemDuLich";
fetch(dataUrl)
    .then((res) => res.json())
    .then((res) => {
        array = res;
    });

async function showItemTravel(idx) {
    //Lấy content
    const content = document.querySelector("#content");
    //tạo biến để ngắn gọn code
    let data = array[idx];

    //Chuyển từ dạng 1000 => 1.000
    let giaCu = Number(data.giaCu).toLocaleString("en-US");
    let giaVe = Number(data.giaVe).toLocaleString("en-US");

    //Show thông tin travel ra
    content.innerHTML = `
    <div class="content__current-position">
        <a
            href="../../index.html"
            class="content__current-position__home-page"
            >Trang chủ</a
        >
        <span style="margin: 0 5px">/</span>
        <a
            href="../pages/tourDuLich.html"
            class="content__current-position__current-page"
            >Tour du lịch</a
        >
        <span style="margin: 0 5px">/</span>
        <a
            class="content__current-position__current-page"
            >${data.diaDiem}</a
        >
    </div>
    <div class="itemTravel">
        <div class="itemTravel__leftcolumn">
            <div class="itemTravel__leftcolumn--card">
                <div class="card-content">
                    <img
                        class="itemTravel__leftcolumn--card--picture"
                        src="${data.imgsTour[1]}"
                    />
                </div>
            </div>
            <div class="itemTravel__leftcolumn--card">
                <h2>CHƯƠNG TRÌNH TOUR</h2>
                <div class="itemTravel__leftcolumn--card--tour">
                    ${data.chuongTrinh.map((value, index) => {
                        console.log(value, index);
                        return `
                                <div class="itemTravel__leftcolumn--card--tour--item">
                                    <img src="${value.imgNgay}" />
                                    <span class="itemTravel__leftcolumn--card--tour--item__date">
                                        Ngày ${index}: ${value.viTri}
                                        NẴNG
                                    </span>
                                    <p
                                        class="itemTravel__leftcolumn--card--tour--item__title"
                                    >
                                        ${value.gthieuNgay}
                                    </p>
                                </div>
                            `;
                    })}
                </div>
                <h2>CHÍNH SÁCH TOUR</h2>
                <div class="itemTravel__leftcolumn--card--tour">
                    ${data.tieuChuan.map((tieuchuan, idxTC) => {
                        return `
                        <span
                            class="itemTravel__leftcolumn--card--tour--item__title"
                        >
                            - ${tieuchuan}
                        </span>
                        <br /><br />
                        `;
                    })}
                </div>
                <h2>ĐIỀU KHOẢN & QUY ĐỊNH</h2>
                <div class="itemTravel__leftcolumn--card--tour">
                    <p
                        class="itemTravel__leftcolumn--card--tourRules"
                    >
                        Điều khoản & Quy định đang cập nhật.
                    </p>
                </div>
                <h2>ĐẶT TOUR</h2>
                <div class="itemTravel__leftcolumn--card--tour">
                    <p
                        class="itemTravel__leftcolumn--card--tourRules"
                    >
                        Đang cập nhật.
                    </p>
                </div>
            </div>
        </div>
        <div class="itemTravel__rightcolumn">
            <div class="itemTravel__rightcolumn--card">
                <h2>
                    ${data.diaDiem}
                </h2>
                <br /><br />
                <p class="itemTravel__rightcolumn--card--newprice">
                    Giá mới: ${giaVe} vnd
                </p>
                <p class="itemTravel__rightcolumn--card--oldprice">
                    Giá cũ: ${giaCu} vnd
                </p>
                <br /><br /><br />
                <p
                    class="itemTravel__rightcolum--card--tour--item__title"
                    style="font-size: 14px"
                >
                    <ion-icon name="airplane-outline"></ion-icon>
                    Di chuyển bằng ${data.phuongTien}
                </p>
                <p
                    class="itemTravel__rightcolum--card--tour--item__title"
                    style="font-size: 14px"
                >
                    <ion-icon
                        name="calendar-clear-outline"
                    ></ion-icon>
                    Lịch khởi hành: Các ngày trong tuần
                </p>
                <p
                    class="itemTravel__rightcolum--card--tour--item__title"
                    style="font-size: 14px"
                >
                    <ion-icon name="calendar-outline"></ion-icon>
                    Thời gian: ${data.soNgay} ngày
                </p>
                <br />
                <p
                    class="itemTravel__rightcolum--card--tour--item__title"
                    style="font-size: 14px"
                >
                    ${data.gioThieu}
                </p>
                <br />
                <button class="itemTravel__rightcolumn--card--btn">
                    Đặt Tour
                </button>
                <button class="itemTravel__rightcolumn--card--btn">
                    Yêu cầu đặt
                </button>
            </div>
        </div>
    </div>
    `;
    console.log(array[idx]);
}

function marginHeader() {
    let header = document.getElementById("header");
    let content = document.getElementById("content");
    let sublist = document.querySelector(".navbar-item__sublist");
    //Margin top cho phần content
    if (sublist.clientHeight > window.innerHeight - header.clientHeight) {
        sublist.style.overflow = "scroll";
    }
    sublist.style.maxHeight = `calc((100vh) - ${header.clientHeight}px)`;
    content.style.marginTop = `${header.clientHeight}px`;
}

async function load() {
    const response = await fetch(dataUrl);
    const jsonData = await response.json();

    const contentMain = document.querySelector(".content-main .row");
    const contentSlider = document.querySelector(".content-slider");

    const showIntrolBtn = document.getElementById("showIntrolBtn");

    marginHeader();

    //Hiện introl của trang web
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

    //render slider
    if (contentSlider) {
        let sliders = "";
        for (let i = 1; i <= numberslider; i++) {
            sliders += `
            <div class="content-slider__item">
                <img
                    src="../imgs/slider/slider_${i}.jpg"
                    alt="slide ${i}"
                    class="content-slider__item-img"
                />
            </div>
            `;
        }
        contentSlider.innerHTML = sliders;
    }

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
    document.body.scrollTop = 0;

    //render tourDuLich
    function loadDataMainContent() {
        let innerHtmlMainContent = "";
        jsonData.forEach((element, index) => {
            let date = element.ngayXuatPhat.split("-");
            let day = date[2];
            let month = date[1];
            let year = date[0];
            if (element.giaCu != 0) {
                innerHtmlMainContent += `<div class="col l-3 m-6 s-12">
                    <div class="widget">
                        <div style="background: url(${element.imgsTour[0]})
                        no-repeat center/cover;" class="widget__photo"></div>
                        <div data-idx=${index} onclick="showItemTravel(${index})" class="widget__button">Đặt vé</div>
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
        contentMain.innerHTML = innerHtmlMainContent;
    }
    if (contentMain) {
        loadDataMainContent();
    }
}

load();
