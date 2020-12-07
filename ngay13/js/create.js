var token = localStorage.getItem('song_i_like_token');
if (token){
    alert(token);
}else {
    alert('chua dang nhap he thong');
}

var API_DOMAIN = 'https://2-dot-backup-server-002.appspot.com';
var REGEISTER_API_URL = '/_api/v2/songs';

document.addEventListener('DOMContentLoaded', function () {
    var createMySong = document.forms['login-form']['createMySong'];
    if (createMySong) {
        createMySong.onclick = function () {
            var createObject = {
                "name":"baiso2",
                "description": " le1@gmail.com ",
                "singer": "Hung",
                "author": "Author",
                "thumbnail": " http://song-thumbnail.png" ,
                "link": "https://res.cloudinary.com/dl0kozyhk/video/upload/v1606707858/B%E1%BA%B1ng_Ki%E1%BB%81u_-_Anh_S%E1%BA%BD_Nh%E1%BB%9B_M%C3%A3i_jq3jme.mp3"
            }
            var createObjectJson = JSON.stringify(createObject);

            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 201) {
                        var responseJsonObject = JSON.parse(this.responseText);
                        console.log(responseJsonObject);

                    } else {
                        alert('up len khong thanh cong')

                    }
                }
            }

            xhr.open('POST', API_DOMAIN + REGEISTER_API_URL);
            // add request header content type json
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.setRequestHeader('Authorization', `Basic ${token}`);
            xhr.send(createObjectJson);
        }
    }


})
domready    
