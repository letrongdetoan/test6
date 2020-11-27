var button = document.getElementById('button');
var keyWord = document.getElementById('keyWord');
var contentDiv = document.getElementById('contentDiv');

button.onclick = function () {
    var layDuLieu = new XMLHttpRequest();
    keyWord = keyWord.value;

    layDuLieu.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                dulieuJson = JSON.parse(layDuLieu.responseText);
                var noidulieu = '';
                for (let i = 0; i < dulieuJson.items.length; i++) {
                    const elements = dulieuJson.items[i];
                    noidulieu += `<iframe width="560" height="315" src="https://www.youtube.com/embed/${elements.id.videoId}" frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen></iframe>`;

                }
                contentDiv.innerHTML = noidulieu;
            } else {
                contentDiv.innerHTML = 'Du lieu bi loi';

            }
        }

    }
    layDuLieu.open("GET", `https://content.googleapis.com/youtube/v3/search?q=${keyWord}&type=video&maxResults=12&part=snippet&key=AIzaSyCdzuV9z0gIiHg82mLHr8Zbb10sF39LTDM`);
    layDuLieu.send();
}