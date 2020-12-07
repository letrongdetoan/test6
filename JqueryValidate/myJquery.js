
// $.validator.addMethod('hello',function (value, element){
//    if (value == 'detoan'){
//        return false;
//    }
//     return true;
//
// },'de toan ko duoc phep');

$.validator.addMethod('sodienthoai',function (value1, ){
     return (value1.length === 10);
});

$.validator.addMethod('sodienthoaicophaiso0',function (value1){
    return (value1[0] == 0);

});

$('form[name="registerForm"]').validate({
    rules:{
        firstName: {
            sodienthoai: true,
            sodienthoaicophaiso0: true
        },
        lastName: {
            required: true,
            minlength: 5,
            maxlength: 15
        },
        email:{
            required: true
        },
        passWord: {
            required: true
        },
        confimPassWord: {
            equalTo:('[name="passWord"]'),
            required: true
        }
    },
    messages:{
        firstName: {
            required: languages.firstName_required,
            minlength: 'Ten phai dai hon 5 ky tu',
            sodienthoai: 'bat buoc phai la 10 so',
            sodienthoaicophaiso0: 'bat buoc phai la 10 so'
    }},
    submitHandler: function (){
        alert(1);
        return false;
    }
});
