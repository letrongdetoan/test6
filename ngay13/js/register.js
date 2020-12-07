var API_DOMAIN = 'https://2-dot-backup-server-002.appspot.com';
var REGEISTER_API_URL = '/_api/v2/members';


document.addEventListener('DOMContentLoaded', function () {
    var btnSubmit = document.forms['register-form']['btnSubmit'];
    if (btnSubmit) {
        //    Lay thong tin form
        //    Validate form
        var registerObject = {
            'firstName': 'ok',
            'lastName': 'detoan',
            'password': '123',
            'address': 'Ha Noi',
            'email': 'le1@gmail.com',
            'phone': '0976093810',
            'birthday': '1994-07-02',
            'gender': '1',
            'avatar': 'https://i.pinimg.com/736x/a4/87/cb/a487cb15d8d5950c3c31b6ada2e649ac.jpg'
        }
        var registerObjJson = JSON.stringify(registerObject);

        btnSubmit.onclick = function () {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 201) {
                        alert('thanhcong');
                        var responseJsonObject = JSON.parse(this.responseText);
                        console.log(responseJsonObject);
                    } else {
                        alert('dang ky khong thanh cong')

                    }
                }
            }

            xhr.open('POST', API_DOMAIN + REGEISTER_API_URL);
            // add request header content type json
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.send(registerObjJson);
        }
    }


})
for (let i = 0; i <; i++) {

}
dom