const YOUTUBE_API ='https://content.googleapis.com/youtube/v3/search';
const YOUTUBE_API_KEY ='AIzaSyCdzuV9z0gIiHg82mLHr8Zbb10sF39LTDM';
const LIMIT_VIDEO = 12;


document.addEventListener('DOMContentLoaded',function (){
    var contentDiv = document.getElementById('contentDiv');
    var button = document.getElementById('button');
    var keyWord = document.getElementById('keyWord');
    var showVideo = document.getElementById('showVideo');
    var content = document.getElementById('content');
    var span = document.getElementById("close");
//Lay anh
    button.onclick = function () {
        var layCodeve = new XMLHttpRequest();
        keyWord1 = keyWord.value;
        layCodeve.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    var dataJson1 = JSON.parse(layCodeve.responseText);
                    var thuchiennoichuoi = '';
                    for (let i = 0; i < dataJson1.items.length; i++) {
                        const elements = dataJson1.items[i];
                        thuchiennoichuoi += `<div class="col-3"> <img class="col-12 imgYoutube" src="${elements.snippet.thumbnails.high.url}" title="${elements.id.videoId}"> <div title="${elements.id.videoId}" class="col-12 imgYoutube">${elements.snippet.title}</div> </div>`;
                    }
                    contentDiv.innerHTML = thuchiennoichuoi;
                } else {
                    contentDiv.innerHTML = 'Da co loi trong qua trinh xu ly';
                }
            }
        }
        layCodeve.open("GET", `${YOUTUBE_API}?q=${keyWord1}&type=video&maxResults=${LIMIT_VIDEO}&part=snippet&key=${YOUTUBE_API_KEY}`);
        layCodeve.send();
        keyWord.value = '';
    }

//lay video
    content.addEventListener('click', function (event) {
        if (event.target.className == 'col-12 imgYoutube') {
            showVideo.innerHTML = `<iframe width="560" height="315" class="videoYoutube" src="https://www.youtube.com/embed/${event.target.title}"</iframe>`;
            showVideo.style.display = 'block';
            span.style.display = 'block'
        }
    })

//tat kich video
    span.onclick = function() {
        showVideo.style.display = "none";
        span.style.display = "none";
    }
})
var layCodeve = new XMLHttpRequest();
layCodeve.onreadystatechange = function () {
    if (this.readyState == 4) {
        if (this.status == 200) {
            var dataJson1 = JSON.parse(layCodeve.responseText);
            var thuchiennoichuoi = '';
            for (let i = 0; i < dataJson1.items.length; i++) {
                const elements = dataJson1.items[i];
                thuchiennoichuoi += `<div class="col-3"> <img class="col-12 imgYoutube" src="${elements.snippet.thumbnails.high.url}" title="${elements.id.videoId}"> <div title="${elements.id.videoId}" class="col-12 imgYoutube">${elements.snippet.title}</div> </div>`;
            }
            contentDiv.innerHTML = thuchiennoichuoi;
        } else {
            contentDiv.innerHTML = 'Da co loi trong qua trinh xu ly';
        }
    }
}
