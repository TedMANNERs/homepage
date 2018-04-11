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

var particle_no = 25;
var canvas, ctx, particles, endAngle;
var isReverse = false;

window.requestAnimFrame = (function() {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 1000 / 60);
    };
})();

function loadCanvas() {
    canvas = document.getElementById("statistics");
    ctx = canvas.getContext("2d");

    endAngle = 0;
    particles = [];
    var w = 200;
    var h = 100;
    canvas.width = w;
    canvas.height = h;
    animloop();
}

function reset() {
    ctx.fillStyle = "#FFFFFF";
    ctx.clearRect(0, 0 , 200, 200);
    ctx.font = "18pt Segoe UI";
    ctx.fillStyle = "black";
    ctx.fillText("Loading", 78, 55, 44);
}
  
function progressRing() {
    this.hue = 0;

    this.draw = function() {
        ctx.beginPath();
        ctx.arc(100, 50, 30, 0, endAngle*Math.PI, isReverse);
        ctx.lineWidth = 7;
        ctx.strokeStyle = 'hsla(' + this.hue + ', 100%, 40%, 1)';
        ctx.stroke();
        ctx.fillStyle = 'hsla(' + this.hue + ', 100%, 40%, 1)';
        var grad = ctx.createLinearGradient(0, 0, 0, 130);
        grad.addColorStop(0, "transparent");
        grad.addColorStop(1, "rgba(0,0,0,0.5)");
        ctx.fillStyle = grad;
    }
}
  
function particle() {
    var point = getPoint(100, 50, 30, endAngle);
    this.x = point[0];
    this.y = point[1];

    this.vx = 0.8 + Math.random() * 1;
    this.v = Math.random() * 5;
    this.g = 1 + Math.random() * 3;
    this.down = false;

    this.draw = function() {
        ctx.fillStyle = 'hsla(' + (ring.hue + 0.3) + ', 100%, 40%, 1)';;
        var size = Math.random() * 2;
        ctx.fillRect(this.x, this.y, size, size);
    }
}

function getPoint(c1,c2,radius,angle){
    return [c1 + Math.cos(angle * Math.PI) * radius, c2 + Math.sin(angle * Math.PI) * radius];
}
  
ring = new progressRing();
  
function draw() {
    reset();

    if (endAngle < 2.0) {
        ring.hue += 0.8;
        ring.draw();
        endAngle += 0.02;
    }
    else {
        endAngle = 0;
        isReverse = !isReverse;
        reset();
        ring.hue -= 0.8;
        counter = 0;
        particles = [];
    } 

    for (var i = 0; i < particle_no; i += 10) {
        particles.push(new particle());
    }
    update();
}
  
function update() {
    for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.x -= p.vx;
        if (p.down == true) {
            p.g += 0.1;
            p.y += p.g;
        } else {
            if (p.g < 0) {
                p.down = true;
                p.g += 0.1;
                p.y += p.g;
            } else {
                p.y -= p.g;
                p.g -= 0.1;
            }
        }
        p.draw();
    }
}
  
function animloop() {
    draw();
    requestAnimFrame(animloop);
}