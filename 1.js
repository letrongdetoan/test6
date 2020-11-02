document.addEventListener("DOMContentLoaded",function(){
// truy xat phan tu declick
    var nut=document.getElementsByClassName('declick');
    var nd=document.getElementsByClassName('dehienthi');
    for (var i = nut.length - 1; i >= 0; i--) {
        nut[i].onclick = function(){
            if (this.classList[1] =='mautrang') {
                this.classList.remove('mautrang');
                var ndhienra=this.getAttribute('data-hienlen');
            // cho tat ca div hien thi khac an di
            var phan_tu_hien_ra = document.getElementById(ndhienra);
                        //cho div an hien ra
            phan_tu_hien_ra.classList.remove('ra');
            }


            else{

            //cho tat ca bo mau trang di
            for (var k = nut.length - 1; k >= 0; k--) {
                nut[k].classList.remove('mautrang');
            }
            // cho doi tuong duoc kich mau trang
            this.classList.toggle('mautrang');
            //lay ve datahienlien
            var ndhienra=this.getAttribute('data-hienlen');
            // cho tat ca div hien thi khac an di
            var phan_tu_hien_ra = document.getElementById(ndhienra);
            for (var i = nd.length - 1; i >= 0; i--) {
                nd[i].classList.remove('ra');
            }
            //cho div an hien ra
            phan_tu_hien_ra.classList.toggle('ra');
            }
        }
    }
},false)