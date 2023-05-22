let array = [];
const contentSlider = document.querySelector(".content-slider");
let numberslider = 7;

//Load main conten
const dataUrl = "https://64069dc5862956433e556a26.mockapi.io/v1/diaDiemDuLich";
fetch(dataUrl)
    .then((res) => res.json())
    .then((res) => {
        array = res;
    });

function showAlert() {
    let alertBox = document.querySelector(".alertBox");
    alertBox.style.transform = "translateX(0%)";
    alertBox.style.opacity = "1";
    setTimeout(() => {
        closeAlert(alertBox);
    }, 2500);
}

function closeAlert(alertBox) {
    alertBox.style.transform = "translateX(100%)";
    alertBox.style.opacity = "0";
}

function handleTourDuLich() {
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
}

function handleItemTravel(idx) {
    //tạo biến để ngắn gọn code
    let data = array[idx];

    //Chuyển từ dạng 1000 => 1.000
    let giaCu = Number(data.giaCu).toLocaleString("en-US");
    let giaVe = Number(data.giaVe).toLocaleString("en-US");

    //Show thông tin travel ra
    content.innerHTML = `
    <div style="margin-top:${(header.clientHeight / 2)}px;" class="alertBox">
        Đã đặt tour thành công !
        <span
            class="closebtn"
            onclick="this.parentElement.style.transform='translateX(100%)';"
            >&times;</span
        >
    </div>
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
                            - ${tieuchuan} <br>
                        </span>
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
                <p class="itemTravel__rightcolumn--card--newprice">
                    Giá mới: ${giaVe} vnd
                </p>
                <p class="itemTravel__rightcolumn--card--oldprice">
                    Giá cũ: ${giaCu} vnd
                </p>
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
                    <ion-icon name="airplane-outline"></ion-icon>
                    Số lượng vé: ${data.soLuong}
                </p>
                <p
                    class="itemTravel__rightcolum--card--tour--item__title"
                    style="font-size: 14px"
                >
                    <ion-icon name="airplane-outline"></ion-icon>
                    Đã đặt: ${data.daDat}
                </p>
                <p
                    class="itemTravel__rightcolum--card--tour--item__title"
                    style="font-size: 14px"
                >
                    <ion-icon name="airplane-outline"></ion-icon>
                    Ngày xuất phát: ${data.ngayXuatPhat}
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
                <p
                    class="itemTravel__rightcolum--card--tour--item__title"
                    style="font-size: 14px"
                >
                    ${data.gioThieu}
                </p>
                <button data-item=${idx} class="itemTravel__rightcolumn--card--btn order-btn">
                    Đặt Tour
                </button>
                <button class="itemTravel__rightcolumn--card--btn">
                    Yêu cầu đặt
                </button>
            </div>
        </div>
    </div>
    `;
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
    let datVe = document.querySelector(".order-btn");
    datVe.addEventListener("click", function (e) {
        let orderTravel = array[Number(e.target.dataset.item)];
        let amount = cartItems.amount;
        cartItems.items.push(orderTravel);
        cartItems = {
            amount: ++amount,
            items: cartItems.items,
        };
        localStorage.setItem("cart-items", JSON.stringify(cartItems));
        showAlert();
        //Set số lượng hàng trong cart cho thằng status
        cartAmount.forEach((e) => {
            e.innerHTML = cartItems.amount || 0;
        });
    });
}

handleTourDuLich();
