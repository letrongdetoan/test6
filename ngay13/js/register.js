var API_DOMAIN = 'https://2-dot-backup-server-002.appspot.com';
var REGEISTER_API_URL = '/_api/v2/members';


document.addEventListener('DOMContentLoaded', function () {
    var btnSubmit = document.forms['register-form']['btnSubmit'];
    var btnfirstName = document.forms['register-form']['firstName'];
    var btnlastName = document.forms['register-form']['lastName'];
    var btnpassword = document.forms['register-form']['password'];
    var btnaddress = document.forms['register-form']['address'];
    var btnemail = document.forms['register-form']['email'];
    var btnphone = document.forms['register-form']['phone'];
    var btnbirthday = document.forms['register-form']['birthday'];
    var btngender = document.forms['register-form']['gender'];
    var btnavatar = document.forms['register-form']['avatar'];



    if (btnSubmit) {
        //    Lay thong tin form
        //    Validate form
        var registerObject = {
            'firstName': btnfirstName.value,
            'lastName': btnlastName.value,
            'password': btnpassword.value,
            'address': btnaddress.value,
            'email': btnemail.value,
            'phone': btnphone.value,
            'birthday': btnbirthday.value,
            'gender': btngender.value,
            'avatar': btnavatar.value
        };
        console.log(registerObject);
        var registerObjJson = JSON.stringify(registerObject);

        // btnSubmit.onclick = function () {
        //     var xhr = new XMLHttpRequest();
        //     xhr.onreadystatechange = function () {
        //         if (this.readyState == 4) {
        //             if (this.status == 201) {
        //                 alert('thanhcong');
        //                 var responseJsonObject = JSON.parse(this.responseText);
        //                 console.log(responseJsonObject);
        //             } else {
        //                 alert('dang ky khong thanh cong')
        //
        //             }
        //         }
        //     }
        //
        //     xhr.open('POST', API_DOMAIN + REGEISTER_API_URL);
        //     // add request header content type json
        //     xhr.setRequestHeader('Content-type', 'application/json');
        //     xhr.send(registerObjJson);
        // }
    };


});
