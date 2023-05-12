let header = document.getElementById("header");
let content = document.getElementById("content");
let sublist = document.querySelector(".navbar-item__sublist");
let cartAmount = document.querySelector(".cart-box .status");
const contentMain = document.querySelector(".content-main .row");
let cartItems = JSON.parse(localStorage.getItem("cart-items")) || {
    amount: 0,
    items: [],
};

const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

function marginHeader() {
    if (window.innerWidth >= 1024) {
        //Margin top cho phần content
        if (sublist.clientHeight > window.innerHeight - header.clientHeight) {
            sublist.style.overflow = "scroll";
        }
        sublist.style.maxHeight = `calc((100vh) - ${header.clientHeight}px)`;
        content.style.marginTop = `${header.clientHeight}px`;
    } else {
        //Margin top cho phần content
        let headerMobile = document.getElementById("header-mobile");
        if (sublist.clientHeight > window.innerHeight - headerMobile.clientHeight) {
            sublist.style.overflow = "scroll";
        }
        sublist.style.maxHeight = `calc((100vh) - ${headerMobile.clientHeight}px)`;
        content.style.marginTop = `${headerMobile.clientHeight}px`;
    }
}

async function load() {
    const dataUrl =
        "https://64069dc5862956433e556a26.mockapi.io/v1/diaDiemDuLich";
    const response = await fetch(dataUrl);
    const jsonData = await response.json();

    cartAmount.innerHTML = cartItems.amount || 0;

    marginHeader();

    window.onscroll = function () {
        if (window.scrollY > header.clientHeight) {
            header.style.position = "fixed";
        } else {
            header.style.position = "absolute";
        }
    };

    document.body.scrollTop = 0;

    //render tourDuLich
    async function loadDataMainContent() {
        let innerHtmlMainContent = "";
        jsonData.forEach((element, index) => {
            let date = element.ngayXuatPhat.split("-");
            let day = date[2];
            let month = date[1];
            let year = date[0];
            if (element.giaCu != 0) {
                innerHtmlMainContent += `
                <div class="col l-3 m-6 s-12 center-mobile tour-item">
                    <div class="widget">
                        <div style="background: url(${element.imgsTour[0]})
                        no-repeat center/cover;" class="widget__photo"></div>
                        <div data-idx=${index} onclick="handleItemTravel(${index})" class="widget__button">Đặt vé</div>
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

        // close mobile menu
        document.querySelectorAll(".nav-link").forEach((n) =>
            n.addEventListener("click", () => {
                hamburger.classList.remove("active");
                navMenu.classList.remove("active");
                //   Need to add Toggle aria-expanded value here as well because it stays as true when you click a menu item
            })
        );
    }

    if (contentMain) {
        loadDataMainContent();
    }

    //Responsive header
    const hamburger = document.querySelector("#header-mobile .hamburger");
    const navMenu = document.querySelector("#header-mobile .nav-menu");

    hamburger.addEventListener("click", () => {
        /* Toggle active class */
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");

        /* Toggle aria-expanded value */
        let menuOpen = navMenu.classList.contains("active");
        console.log(menuOpen);
        let newMenuOpenStatus = menuOpen;
        hamburger.setAttribute("aria-expanded", newMenuOpenStatus);
    });
}

load();
