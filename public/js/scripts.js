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
}