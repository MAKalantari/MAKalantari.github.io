const scrollbar = document.getElementById("scrollbar");
const headerSpacer = document.getElementById("headerSpacer");
const header = document.getElementById("header");
const headerCite = document.getElementById("headerCite");
const win = document.getElementById("window");
const winContent = document.getElementById("windowContent");

const window_settings = `
<h1>settings</h1>
<h2>themes</h2>
<ul id="theme-settings">
    <li data="mix" class="as-button" onclick="setDocumentAttribute('theme', 'mix'); openSettings();">
        <label>Mix: [</label>
        <div class="color" style="--color: #3A3A3A"/></div>
        <div class="color" style="--color: #f6f6f6"/></div>
        <div class="color" style="--color: #101010"/></div>
        <div class="color" style="--color: #fff"/></div>
        <label> ]</label>
        <div class="spacer"></div>
        <div class="radio-button" style="--label: '';"></div>
    </li>

    <li data="light" class="as-button" onclick="setDocumentAttribute('theme', 'light'); openSettings();">
        <label>Light: [</label>
        <div class="color" style="--color: #ddd"/></div>
        <div class="color" style="--color: #f8f8f8"/></div>
        <div class="color" style="--color: #101010"/></div>
        <div class="color" style="--color: #fff"/></div>
        <label> ]</label>
        <div class="spacer"></div>
        <div class="radio-button" style="--label: '';"></div>
    </li>

    <li data="dark" class="as-button" onclick="setDocumentAttribute('theme', 'dark'); openSettings();">
        <label>Dark: [</label>
        <div class="color" style="--color: #3A3A3A"/></div>
        <div class="color" style="--color: #242424"/></div>
        <div class="color" style="--color: #efefef"/></div>
        <div class="color" style="--color: #000"/></div>
        <label> ]</label>
        <div class="spacer"></div>
        <div class="radio-button" style="--label: '';"></div>
    </li>
</ul>

<h2>font size</h2>
<ul id="font-settings">
    <li data="small" class="as-button" onclick="setDocumentAttribute('font', 'small'); openSettings();">
        <label>small [</label>
        <label style="font-size: var(--font-small);">aA zZ 01 09</label>
        <label>]</label>
        <div class="spacer"></div>
        <div class="radio-button" style="--label: '';"></div>
    </li>

    <li data="medium" class="as-button" onclick="setDocumentAttribute('font', 'medium'); openSettings();">
        <label>medium [</label>
        <label style="font-size: var(--font-medium);">aA zZ 01 09</label>
        <label>]</label>
        <div class="spacer"></div>
        <div class="radio-button" style="--label: '';"></div>
    </li>

    <li data="big" class="as-button" onclick="setDocumentAttribute('font', 'big'); openSettings();">
        <label>big [</label>
        <label style="font-size: var(--font-big);">aA zZ 01 09</label>
        <label>]</label>
        <div class="spacer"></div>
        <div class="radio-button" style="--label: '';"></div>
    </li>

    <li data="huge" class="as-button" onclick="setDocumentAttribute('font', 'huge'); openSettings();">
        <label>huge [</label>
        <label style="font-size: var(--font-huge);">aA zZ 01 09</label>
        <label>]</label>
        <div class="spacer"></div>
        <div class="radio-button" style="--label: '';"></div>
    </li>
</ul>
`;

function runIfValid(id, _function, step = 50) {
    const _local_interval = setInterval(() => {
        const _elem = document.getElementById(id);
        if (_elem != null && _elem != 'undefined' ) {
                _function(_elem);
                clearInterval(_local_interval);
        }
    }, step);
}

function openSettings() {
    openWindow(window_settings);
    runIfValid("theme-settings", (parent) => {
        checkWhichIsSet(parent, 'data', current.theme, (element) => {
            element.setAttribute('class', 'as-button current');
        }, (element) => {
            element.setAttribute('class', 'as-button');
        });
    });

    runIfValid("font-settings", (parent) => {
        checkWhichIsSet(parent, 'data', current.font, (element) => {
            element.setAttribute('class', 'as-button current');
        }, (element) => {
            element.setAttribute('class', 'as-button');
        });
    });
}

var cursor = {x: 0, y: 0}
var current = JSON.parse(`
{
    "theme":"",
    "font":"",
    "language":""
}`);

current.theme = localStorage.getItem("theme");
if (current.theme == undefined || current.theme == null) {
    localStorage.setItem("theme", "mix");
    current.theme = "mix";
}
    
current.font = localStorage.getItem("font");
if (current.font == undefined || current.font == null) {
    localStorage.setItem("font", "medium");
    current.font = "medium";
}

current.language = localStorage.getItem("language");
if (current.language == undefined || current.effects == null) {
    localStorage.setItem("language", "english");
    current.language = "english";
} 

function init(){
    setDocumentAttribute("theme", current.theme);
    setDocumentAttribute("font", current.font);
    setDocumentAttribute("language", current.effects);

} init();


function runIf(statement = false, _function = null) {
    if(statement && _function != null)
        _function();
}

function checkWhichIsSet(parent, _attr, _data, _function = null, _else_function = null) {
    if (_function != null) {
        for(var i = 0; i < parent.children.length; i++) {
            if (parent.children[i].getAttribute(_attr) == _data)
                _function(parent.children[i]);
            else if (_else_function != null)
                    _else_function(parent.children[i]);
            
        }
    }
}

function closeWindow() {
    win.style.display = "none";
    winContent.innerHTML = '';
}

function openWindow(input) {
    winContent.innerHTML = input;
    win.style.display = "block";
}

function updateLooks() {
    document.getElementById("theme_button").innerHTML = current.theme;
    document.getElementById("font_button").innerHTML = current.font;
    document.getElementById("language_button").innerHTML = current.language;
}

function setDocumentAttribute(attr, input, _function = null) {

    var _array = document.documentElement.getAttribute("class").split(' ');
    const index = _array.indexOf(_array.find((element) => element.includes(attr)));
    if (index != -1) {
        var _result = "";
        _array[index] = attr + '-' + input;
        _result = _array.join(" ");
        document.documentElement.setAttribute("class", _result);

            current[attr] = input;
            localStorage.setItem(attr, input);
    }
    updateLooks();

    if (_function != null)
        _function();
}


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

function scrollto(input){
    const element = document.getElementById(input);
    const y = element.getBoundingClientRect().top + window.pageYOffset - 90;
    window.scrollTo({top: y, behavior: 'smooth'});
}