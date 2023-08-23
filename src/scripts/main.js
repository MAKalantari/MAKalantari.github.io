const scrollbar = document.getElementById("scrollbar");
const headerSpacer = document.getElementById("headerSpacer");
const header = document.getElementById("header");

setInterval(function() {
    const percent = Math.min((document.documentElement.scrollTop / (document.documentElement.offsetHeight - window.innerHeight) * 100), 100);
    console.log(percent);
    scrollbar.style.width =  percent + '%';
    headerSpacer.style.height = (25 + percent*3) + '%';
}, 50);

function scrollto(input){
    const element = document.getElementById(input);
    const y = element.getBoundingClientRect().top + window.pageYOffset - 90;
    window.scrollTo({top: y, behavior: 'smooth'});
}