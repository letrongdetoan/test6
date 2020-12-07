var API_DOMAIN = 'https://2-dot-backup-server-002.appspot.com';
var REGEISTER_API_URL = '/_api/v2/members';
var url= API_DOMAIN + REGEISTER_API_URL;

$('button').click(function (){
    guigiulieu(laydulieudangky());
});

fixdata = function (){
    var registerObject = {
        'firstName': 'ok',
        'lastName': 'detoan',
        'password': '123',
        'address': 'Ha Noi',
        'email': '444f4@gmail.com',
        'phone': '0976093810',
        'birthday': '1994-07-02',
        'gender': '1',
        'avatar': 'https://i.pinimg.com/736x/a4/87/cb/a487cb15d8d5950c3c31b6ada2e649ac.jpg'
    };
    var datasend = JSON.stringify(registerObject);
    return datasend;
};
}
laydulieudangky = function (){
    var data = {
        'firstName': 'ok',
        'lastName': 'detoan',
        'password': '123',
        'address': 'Ha Noi',
        'email': '444f4@gmail.com',
        'phone': '0976093810',
        'birthday': '1994-07-02',
        'gender': %('input'),
        'avatar': 'https://i.pinimg.com/736x/a4/87/cb/a487cb15d8d5950c3c31b6ada2e649ac.jpg'
    }


    var registerObject = {
        'firstName': 'ok',
        'lastName': 'detoan',
        'password': '123',
        'address': 'Ha Noi',
        'email': '444f4@gmail.com',
        'phone': '0976093810',
        'birthday': '1994-07-02',
        'gender': '1',
        'avatar': 'https://i.pinimg.com/736x/a4/87/cb/a487cb15d8d5950c3c31b6ada2e649ac.jpg'
    };
    var datasend = JSON.stringify(registerObject);
    return datasend;
};

guigiulieu = function (datadulieu){
    $.ajax({
        'url': url,
        'data': datadulieu,
        'headers': {
            'Content-type': 'application/json',
            'Authorization': 'Basic'
        },
        'type': 'POST',
        'success': function (data, status, xhr){
            alert('da thanh cong roi');
            console.log(data);
            console.log(status);
            console.log(xhr);
            console.log("Da up len thanh cong");
        },
        'error': function (){
            alert('da that bai');
            JSON.parse((requestAnimationFrame()))
        }
    })
};
