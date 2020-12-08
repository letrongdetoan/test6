var API_DOMAIN = 'https://2-dot-backup-server-002.appspot.com';
var REGEISTER_API_URL = '/_api/v2/members/authentication';
var token = localStorage.getItem('song_i_like_token');


document.addEventListener('DOMContentLoaded', function () {
    var btnSubmit = document.forms['login-form']['btnSubmit'];
    if (btnSubmit) {
        btnSubmit.onclick = function () {
            var txtEmail = document.forms['login-form']['email'];
            var pwdPassWord = document.forms['login-form']['passWord'];
            var loginObject = {
                'email': txtEmail.value,
                'password': pwdPassWord.value
            }
            var loginObjectJson = JSON.stringify(loginObject);

            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 201) {
                        var responseJsonObject = JSON.parse(this.responseText);
                        console.log(responseJsonObject);
                        localStorage.setItem('song_i_like_token',responseJsonObject.token);
                    } else {
                        var erorLogin = document.querySelector('.erorLoginDefault');
                        console.log(erorLogin);
                        erorLogin.classList.remove('erorLoginDefault');
                        erorLogin.classList.add('erorLogin');

                    }
                }
            }

            xhr.open('POST', API_DOMAIN + REGEISTER_API_URL);
            // add request header content type json
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.send(loginObjectJson);
        }
    }


})
