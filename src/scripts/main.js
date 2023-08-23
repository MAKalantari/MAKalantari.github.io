const scrollbar = document.getElementById("scrollbar");
const headerSpacer = document.getElementById("headerSpacer");
const header = document.getElementById("header");
const headerCite = document.getElementById("headerCite");
var cursor = {x: 0, y: 0}

if ((navigator.maxTouchPoints == 0) ||
(navigator.msMaxTouchPoints == 0)) {
    headerCite.style.setProperty("--transformX-check", "0px");
    header.style.setProperty("--header-move-anim-check", "none");

    window.addEventListener("mousemove", (e) => {
        cursor.x = e.clientX;
        cursor.y = e.clientY;

        header.style.backgroundPositionX = cursor.x/-10 + 'px';
        header.style.backgroundPositionY = cursor.y/-10 + 'px';

        headerCitePosX = header.getBoundingClientRect().width/2 - (window.innerWidth/2 - cursor.x)/20 - headerCite.getBoundingClientRect().width/2;
        headerCite.style.setProperty("--transformX-amount", headerCitePosX + 'px');

    });
} else {
    

}
setInterval(function() {
    const distance = document.documentElement.scrollTop;    
    const percent = Math.min((distance / (document.documentElement.offsetHeight - window.innerHeight) * 100), 100);
    scrollbar.style.width =  percent + '%';
    //headerSpacer.style.height = (100 + distance) + 'px';
}, 50);

function scrollto(input){
    const element = document.getElementById(input);
    const y = element.getBoundingClientRect().top + window.pageYOffset - 90;
    window.scrollTo({top: y, behavior: 'smooth'});
}