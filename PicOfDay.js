var block = document.getElementById('picofday');

var request = new XMLHttpRequest();

request.open('GET', 'https://api.nasa.gov/planetary/apod?api_key=0CtLaNazapANbV4KCOb6YPDVDHnIsmF30MYmrQ5R', true);

request.onload = function() {
    var data = JSON.parse(request.response);

    if (request.status >= 200 && request.status < 400) {
        var image_url = data.hdurl;

        var image = document.createElement('img');
        image.setAttribute('src', image_url);
        image.setAttribute('id', 'main-image');
        block.appendChild(image);

        var picdescription = document.createElement('p');
        picdescription.textContent = data.explanation
        picdescription.setAttribute('id', 'explanation');
        block.appendChild(picdescription);
    } else {
        const errorMessage = document.createElement('marquee');
        errorMessage.textContent = `It's not working! Check if you have inputed dates that are in yyyy-MM-DD format.`;
        block.appendChild(errorMessage);
    }
}

request.send();
