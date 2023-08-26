const scrollbar = document.getElementById("scrollbar");
const header = document.getElementById("header");
const headerCite = document.getElementById("headerCite");

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

window.addEventListener("scroll", (e) => {
    headerCite.style.top = 100 + document.documentElement.scrollTop/3 + 'px';
    const distance = document.documentElement.scrollTop;    
    const percent = Math.min((distance / (document.documentElement.offsetHeight - window.innerHeight) * 100), 100);
    scrollbar.style.width =  percent + '%';
})
