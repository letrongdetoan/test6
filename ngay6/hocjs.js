// var test= document.getElementsByClassName('test');
// var test1=document.getElementsByTagName('h1');
// var test2=document.querySelectorAll('div p.test');
// console.log(test);
// console.log(test1);
// console.log(test2);
// document.querySelector('[name=first]');
// document.querySelector('form[name="form1"]input[name=first]');

// console.log(document.forms['register-form']);
// var form=document.forms['register-form'];
// console.log(form['country']);
// console.log(form['country']);
// console.log(form['country']);
// console.log(form['country']);
// console.log(document.forms['register-form']['firstname']);
// console.log(document.forms['register-form']['lastname']);
// console.log(document.forms['register-form']['country']);
//
// var testform = document.querySelector('form[name="register-form"]');
// testform=testform['firstname'];
// console.log(testform);

var submit = document.forms['register-form']['submit1'];
submit.onclick= function (){
    alert('helloo');
};
