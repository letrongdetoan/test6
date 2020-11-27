var butoon = document.getElementById('click');
var keyWord = document.getElementById('keyWord');

butoon.onclick = function (){
    keyWord = keyWord.value;
    var laydulieu= new XMLHttpRequest();
    laydulieu.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200){
                var respondJson =  JSON.parse(laydulieu.responseText);
                var htmlContent = '';
                for (let i = 0; i < respondJson.items.length; i++) {
                    const element = respondJson.items[i];
                    htmlContent +=  `<img src=${element.snippet.thumbnails.high.url}>`;
                }


                document.getElementById('noiDung').innerHTML = htmlContent;
            }
            else {
                document.getElementById('noiDung').innerHTML=`Noi dung da bi loi`;
            }
        }
    }
laydulieu.open("GET", `https://content.googleapis.com/youtube/v3/search?q=${keyWord}&type=video&maxResults=100&part=snippet&key=AIzaSyCdzuV9z0gIiHg82mLHr8Zbb10sF39LTDM`);
laydulieu.send();
}