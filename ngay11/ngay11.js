var image = document.getElementById('image');
var contentDiv = document.getElementById('contentDiv');
var close = document.getElementById('close');

image.onclick = function () {
    image.style.display = 'none';
    contentDiv.style.display = 'block';
}

close.onclick = function () {
    image.style.display = 'block';
    contentDiv.style.display = 'none';
}

