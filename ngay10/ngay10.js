var btnSave = document.forms['xuanbac']['save'];
var reset = document.forms['xuanbac']['reset'];
var show = document.forms['xuanbac']['show'];
var txtNoidung = document.forms['xuanbac']['noidung'];
var txtAnhNho = document.forms['xuanbac']['anhnho'];
var txtTieude = document.forms['xuanbac']['tieude'];
var txtDanhMuc= document.forms['xuanbac']['thetag'];
var contentDiv = document.getElementById("contentDiv");
var mangXuanBac = new Array();
var count = 0;
btnSave.onclick =function (){
    var noidung = txtNoidung.value;
    var anhnho = txtAnhNho.value;
    var tieude = txtTieude.value;
    var thetag = txtDanhMuc.value;
    var xuanbacObj = {
        'title': noidung,
        'thumbnail': anhnho,
        'content': tieude,
        'danhmuc': thetag
    }
    mangXuanBac.push(xuanbacObj);
}
reset.onclick = function (){
    txtNoidung.value = '';
    txtAnhNho.value = '';
    txtTieude.value = '';
    txtDanhMuc.value = '';
}
show.onclick = function (){
    for (; count < mangXuanBac.length; i++) {
        const elements = mangXuanBac[count];
        contentDiv.innerHTML += `<div> <h1> ${elements.title}</h1> <img src="${elements.thumbnail}" alt=""> 
        <p> ${elements.content}</p> <p>${elements.danhmuc}</p> </div>`;
        i=count;
        count = count + 1;
    }
}