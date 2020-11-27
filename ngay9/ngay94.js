var contentDiv = document.getElementById('contentDiv');
var button = document.getElementById('button');
var keyWord = document.getElementById('keyWord');

button.onclick = function () {
    var layCodeve = new XMLHttpRequest();
    keyWord = keyWord.value;

    layCodeve.onreadystatechange = function (){
        if (this.readyState == 4) {
            if (this.status == 200) {
                var dataJson1 = JSON.parse(layCodeve.responseText);
                var thuchiennoichuoi = '';
                for (let i = 0; i < dataJson1.items.length; i++) {
                    const elements = dataJson1.items[i];
                    thuchiennoichuoi += `<iframe width="560" height="315" src="https://www.youtube.com/embed/${elements.id.videoId}" frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen></iframe>`;
                }

                contentDiv.innerHTML = thuchiennoichuoi;
            } else {
                contentDiv.innerHTML = 'Da co loi trong qua trinh xu ly'
            }
        }
    }
    layCodeve.open("GET", `https://content.googleapis.com/youtube/v3/search?q=${keyWord}&type=video&maxResults=12&part=snippet&key=AIzaSyCdzuV9z0gIiHg82mLHr8Zbb10sF39LTDM`);
    layCodeve.send();
}