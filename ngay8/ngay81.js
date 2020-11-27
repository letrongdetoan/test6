var danhsachthilai= new Array();
var clickvao= document.getElementById('btnBienHinh');
clickvao.onclick = function (){
    var tencuaform=document.forms['thi-lai-form']['full-name'];
    if (tencuaform){
        giatrichovao=tencuaform.value;
        danhsachthilai.push(giatrichovao);

        var noidungcuadiv=document.getElementById('content');
        if (noidungcuadiv){
            var noidungcuadiv1='<ul>';
            for (var i = 0; i < danhsachthilai.length; i++) {
                noidungcuadiv1 +=`<li>${danhsachthilai[i]}</li>`;
            }
            noidungcuadiv1+='</ul>';
            noidungcuadiv.innerHTML=noidungcuadiv1;
        }
    }
}
/*
Buoc 1: Tao mot mang de luu tru toan bo danh sach
Buoc 2: lay phan tu click
Buoc 3: Khi click se lam nhung viec sau
    Buoc 1: lay phan tu cua form
    Buoc 2: lay gia trin trong phan tu form
    Buoc 3: dung ham psu de cho vao mang luu tru;
    Buoc 4: lay vi tri can hien thi trong html
    buoc 5: dung innethtml de chuyen noi dung vao do (thuc hien noi chuoi)
            Buoc1:  khai bao 1 bien tam de tranh bi dong bo
            buoc2 : cho ul ban dau
            buoc 3 + voi danh sach
            buoc 4 noi voi ul ket thuc
            hoan thien noi chuoi
 */