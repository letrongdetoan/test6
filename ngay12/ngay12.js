const YOUTUBE_API ='https://content.googleapis.com/youtube/v3/search';
const YOUTUBE_API_KEY ='AIzaSyCdzuV9z0gIiHg82mLHr8Zbb10sF39LTDM';
const LIMIT_VIDEO = 16;


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
                        thuchiennoichuoi += `<img class="col-3 imgYoutube" src="${elements.snippet.thumbnails.high.url}" alt="${elements.id.videoId}">`;
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
        if (event.target.className == 'col-3 imgYoutube') {
            showVideo.innerHTML = `id="showVideo"><iframe class="videoYoutube" width="560" height="315" src="https://www.youtube.com/embed/${event.target.alt}"
           frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
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

