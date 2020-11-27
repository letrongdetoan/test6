var dulieuchovao = document.getElementById('noiDung');

var laydulieu = new XMLHttpRequest();
laydulieu.onreadystatechange = function (){
    if (this.readyState == 4){
        if (this.status == 200){
            dulieuchovao.innerHTML = this.responseText;
        }
    }
}
laydulieu.open("get", `https://content.googleapis.com/youtube/v3/search?q=covua&type=video&maxResults=100&part=snippet&key=AIzaSyCdzuV9z0gIiHg82mLHr8Zbb10sF39LTDM`);
laydulieu.send();