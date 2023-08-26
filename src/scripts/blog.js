const scrollbar = document.getElementById("scrollbar");

window.addEventListener("scroll", (e) => {
    const distance = document.documentElement.scrollTop;    
    const percent = Math.min((distance / (document.documentElement.offsetHeight - window.innerHeight) * 100), 100);
    scrollbar.style.width =  percent + '%';
})
