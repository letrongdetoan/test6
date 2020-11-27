var butoon = document.getElementById('click');
var keyWord= document.getElementById('keyWord').value;

butoon.onclick = function (){
    var laydilieu= new XMLHttpRequest();
    laydilieu.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200){
                // var respondJson =  JSON.parse(laydilieu.responseText);
                // var htmlContent = '';
                // for (let i = 0; i < respondJson.items.length; i++) {
                //     const element = respondJson.items[i];
                //     htmlContent +=  `<img src=${element.snippet.thumbnails.high.url}>`;
                // }


                document.getElementById('noiDung').innerHTML = laydilieu.responseText;
            }
            else {
                document.getElementById('noiDung').innerHTML=`Noi dung da bi loi`;
            }
        }
    }
laydilieu.open("GET", "texttest.txt");
laydilieu.send();
}