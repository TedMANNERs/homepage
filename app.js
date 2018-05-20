const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3000
const  availableImages = [
    "images/veryFastDoggo.jpg",
    "images/mittwoch.jpg",
    "images/mrskeltal.jpg",
    "images/why.jpg",
    "images/jazz.jpg",
    "images/communism.png",
    "images/americanChopperArgument.jpg"
]

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.sendFile(path.join(__dirname + "/index.html")));

app.post('/addGuestbookEntry', function(req, res) {
    res.send('Thanks for your guestbook entry, ' + req.body.name + '.');
});

app.get('/previousImage', function(req, res) {
    var url = req.query.currentImage;
    var newUrl = url.replace(/^[a-z]{4}\:\/{2}[a-z]{1,}\:[0-9]{1,4}.(.*)/, '$1');
    console.log(url);
    console.log(newUrl);
    var index = availableImages.indexOf(newUrl);
    console.log(index);
    console.log(availableImages);
    if(index <= 0)
        index = availableImages.length;
    console.log(index);
    res.send(availableImages[index - 1]);
});

app.get('/nextImage', function(req, res) {
    var url = req.query.currentImage;
    var newUrl = url.replace(/^[a-z]{4}\:\/{2}[a-z]{1,}\:[0-9]{1,4}.(.*)/, '$1');
    var index = availableImages.indexOf(newUrl);
    if(index >= availableImages.length - 1)
        index = 0;
    res.send(availableImages[index + 1]);
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));