clickbutton = document.getElementById('button');
inputUrl = document.getElementById('inputUrl');
upImages = document.getElementById('upImages');
thongbaoloi = document.getElementById('thongbaoloi');

clickbutton.onclick = function () {
     inputUrl1 = inputUrl.value;
    if (inputUrl1 == '') {
        thongbaoloi.innerHTML = '<br><div class="loi" style="color: red">Khong duoc de trong</div>'
    } else {
        upImages.innerHTML += `<div><img class="col-4 col-s-12" id="upImages" src="${inputUrl1}" alt=""></div>`;
        inputUrl.value = "";
    }
}