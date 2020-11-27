var contentDiv = document.getElementById('contentDiv');
var keyWord = document.getElementById('keyWord');
var button = document.getElementById('button');

button.onclick = function ()    {






    keyWord = keyWord.value;
    var laydulieu = new XMLHttpRequest();
        laydulieu.onreadystatechange = function (){
                if (this.readyState == 4){
            if (this.status == 200){
                var dulieuJson = JSON.parse(laydulieu.responseText);
                var noidulieu = '';
                for (let i = 0; i < dulieuJson.items.length; i++) {
                    const elements = dulieuJson.items[i];
                    noidulieu += `<img onclick="loadVideoID('${elements.id.videoId}')" src="${elements.snippet.thumbnails.high.url}" alt="">`;
                    noidulieu += `<iframe width="560" height="315" src="https://www.youtube.com/embed/${elements.id.videoId}" frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen></iframe>`;
                }
                contentDiv.innerHTML = noidulieu;
            }
            else {
                contentDiv.innerHTML = "Loi khong xac dinh";
            }
        }
    }
    laydulieu.open("GET", `https://content.googleapis.com/youtube/v3/search?q=${keyWord}&type=video&maxResults=24&part=snippet&key=AIzaSyCdzuV9z0gIiHg82mLHr8Zbb10sF39LTDM`);
    laydulieu.send();
    modal.style.display = "block";
    modalImg.src = ;
    captionText.innerHTML = this.alt;
}

// Get the modal
var modal = document.getElementById("myModal");

// Get the image and insert it inside the modal - use its "alt" text as a caption
var img = document.getElementById("myImg");
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");
img.onclick = function(){
    modal.style.display = "block";
    modalImg.src = this.src;
    captionText.innerHTML = this.alt;
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}