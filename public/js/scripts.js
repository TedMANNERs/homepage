function switchColorMode() {
    var activeStyle = getActiveStyle();
    if(activeStyle === "default") 
        setActiveStyle("alternate");
    else
        setActiveStyle("default");    
}

function getStyleCookie() {
    var cookiePrefix = "style=";
    var cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
        const c = cookies[i];
        if(c.indexOf(cookiePrefix == 0))
            return c.substring(cookiePrefix.length, c.length);
    }
}

function getActiveStyle() {
    var i, a;
    var links = document.getElementsByTagName("link");
    for(i=0; (a = links[i]); i++) {
        var titleAttribute = a.getAttribute("title");
        if(a.getAttribute("rel").indexOf("style") != -1 && titleAttribute && !a.disabled) 
            return titleAttribute;
    }
    return null;
}

function setActiveStyle(title) {
    var i, a;
    var links = document.getElementsByTagName("link");
    for(i=0; (a = links[i]); i++) {
        var titleAttribute = a.getAttribute("title");
        if(a.getAttribute("rel").indexOf("style") != -1 && titleAttribute) {
            a.disabled = true;
            if(titleAttribute == title) {
                a.disabled = false;
                document.cookie = "style=" + title + ";";
            }
        }
    }
}

window.onload = function(e) {
    var cookie = getStyleCookie();
    var title = cookie ? cookie : "default";
    setActiveStyle(title);
    loadCanvas();
}

// =====================================
// Slideshow
// =====================================

function previousImage() {
    var slideshowImage = document.getElementById("slideshowImage");
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            slideshowImage.src = this.responseText;
        }
    };
    var currentImageUrl = slideshowImage.src.split("/").slice(3).join("/");
    http.open("GET", "/previousImage?currentImage=" + currentImageUrl, true);
    http.send();
}

function nextImage() {
    var slideshowImage = document.getElementById("slideshowImage");
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            slideshowImage.src = this.responseText;
        }
    };
    var currentImageUrl = slideshowImage.src.split("/").slice(3).join("/");
    http.open("GET", "/nextImage?currentImage=" + currentImageUrl, true);
    http.send();
}

// =====================================
// Navigation
// =====================================

function showHome() {
    var home = document.getElementById("homeContent").style.display = "flex";
    var slideshow = document.getElementById("slideshowContent").style.display = "none";
    var guestbook = document.getElementById("guestbookContent").style.display = "none";
}

function showGuestbook() {
    var home = document.getElementById("homeContent").style.display = "none";
    var slideshow = document.getElementById("slideshowContent").style.display = "none";
    var guestbook = document.getElementById("guestbookContent").style.display = "flex";

}

function showSlideshow() {
    var home = document.getElementById("homeContent").style.display = "none";
    var slideshow = document.getElementById("slideshowContent").style.display = "flex";
    var guestbook = document.getElementById("guestbookContent").style.display = "none";

}