var API_DOMAIN = 'https://2-dot-backup-server-002.appspot.com';
var REGEISTER_API_URL = '/_api/v2/songs/get-mine';
var token = localStorage.getItem('song_i_like_token');
if (token){
    alert(token);
}else {
    alert('chua dang nhap he thong');
}

document.addEventListener('DOMContentLoaded', function () {
    var getMySong = document.forms['login-form']['getMySong'];
    if (getMySong) {
        getMySong.onclick = function () {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        var responseJsonObject = JSON.parse(this.responseText);
                        console.log(responseJsonObject);
                    } else {
                        alert('lay bai hat khong thanh cong')

                    }
                }
            }

            xhr.open('GET', API_DOMAIN + REGEISTER_API_URL);
            // add request header content type json
            // xhr.setRequestHeader('Content-type', 'application/json');
            xhr.setRequestHeader('Authorization', `Basic ${token}`);
            xhr.send();
        }
    }


})
