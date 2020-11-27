var userName=document.forms['formjs']['userName'];
var passWord=document.forms['formjs']['passWord'];
var subMit=document.forms['formjs']['subMit'];

userName.onkeyup=function (){
    var usernamevalue=userName.value;
    if (usernamevalue.length <5 || usernamevalue.length > 20){
    userName.className='msg-eror';


    }
}
