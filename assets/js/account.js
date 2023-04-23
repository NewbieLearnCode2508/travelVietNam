let submitBtn = document.querySelector(".account__submit-btn");
let form = document.querySelector(".account__form");
form.onsubmit = (e) => {
    e.preventDefault();
};
const accountUrl = "https://64069dc5862956433e556a26.mockapi.io/v1/accounts";

let dataAccount = [];
fetch(accountUrl)
    .then((res) => res.json())
    .then((res) => {
        dataAccount = res;
    });

function handleLogin() {
    console.log(dataAccount);
}

function checkEnableAccount(account) {
    let check = true;
    for (let i = 0; i < dataAccount.length; i++) {
        if (dataAccount[i].email == account.email) {
            check = false;
            break;
        }
    }
    return check;
}

function handleRegister() {
    let firstName = document.querySelector(".regis-first-name");
    let lastName = document.querySelector(".regis-last-name");
    let email = document.querySelector(".regis-email");
    let password = document.querySelector(".regis-password");
    let repassword = document.querySelector(".regis-repassword");
    let account = {
        firstName: firstName.value.trim(),
        lastName: lastName.value.trim(),
        email: email.value.trim(),
        password: password.value.trim(),
        repassword: repassword.value.trim(),
    };
    if (
        firstName.value != "" &&
        lastName.value != "" &&
        validateEmail(email.value) &&
        password.value.length >= 6 &&
        password.value != "" &&
        repassword.value != "" &&
        repassword.value == password.value
    ) {
        if (checkEnableAccount(account)) {
            firstName.value = "";
            lastName.value = "";
            email.value = "";
            password.value = "";
            repassword.value = "";
            fetch(accountUrl, {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, *cors, same-origin
                cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                credentials: "same-origin", // include, *same-origin, omit
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: "follow", // manual, *follow, error
                referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify(account),
            });
            confirm("Đăng ký thành công !");
        } else {
            alert("Email này đã có người đăng ký");
            email.value = "";
            email.focus();
        }
    }
}

submitBtn.onclick = function () {
    let type = submitBtn.dataset.type;
    if (type == "login") {
        handleLogin();
    } else if (type == "register") {
        handleRegister();
    }
};
