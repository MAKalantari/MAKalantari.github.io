const win = document.getElementById("window");
const winContent = document.getElementById("windowContent");

var locale = null;

const window_settings = `
<section>
    <h1 fetchlang="settings.0">settings</h1>
    <h2 fetchlang="settings.1"></h2>
    <ul id="theme-settings">
        <li data="mix" class="as-button" onclick="setDocumentAttribute('theme', 'mix'); openSettings();">
            <label fetchlang="settings.2"></label>
            <div class="color" style="--color: #3A3A3A"/></div>
            <div class="color" style="--color: #f6f6f6"/></div>
            <div class="color" style="--color: #101010"/></div>
            <div class="color" style="--color: #fff"/></div>
            <div class="spacer"></div>
            <div class="radio-button" style="--label: '';"></div>
        </li>

        <li data="light" class="as-button" onclick="setDocumentAttribute('theme', 'light'); openSettings();">
            <label fetchlang="settings.3"></label>
            <div class="color" style="--color: #ddd"/></div>
            <div class="color" style="--color: #f8f8f8"/></div>
            <div class="color" style="--color: #101010"/></div>
            <div class="color" style="--color: #fff"/></div>
            <div class="spacer"></div>
            <div class="radio-button" style="--label: '';"></div>
        </li>

        <li data="dark" class="as-button" onclick="setDocumentAttribute('theme', 'dark'); openSettings();">
            <label fetchlang="settings.4"></label>
            <div class="color" style="--color: #3A3A3A"/></div>
            <div class="color" style="--color: #242424"/></div>
            <div class="color" style="--color: #efefef"/></div>
            <div class="color" style="--color: #000"/></div>
            <div class="spacer"></div>
            <div class="radio-button" style="--label: '';"></div>
        </li>
    </ul>

    <h2 fetchlang="settings.5"></h2>
    <ul id="font-settings">
        <li data="small" class="as-button" onclick="setDocumentAttribute('font', 'small'); openSettings();">
            <label fetchlang="settings.6">small</label>
            <div class="spacer"></div>
            <div class="radio-button" style="--label: '';"></div>
        </li>

        <li data="medium" class="as-button" onclick="setDocumentAttribute('font', 'medium'); openSettings();">
            <label fetchlang="settings.7">medium</label>
            <div class="spacer"></div>
            <div class="radio-button" style="--label: '';"></div>
        </li>

        <li data="big" class="as-button" onclick="setDocumentAttribute('font', 'big'); openSettings();">
            <label fetchlang="settings.8">big</label>
            <div class="spacer"></div>
            <div class="radio-button" style="--label: '';"></div>
        </li>

        <li data="huge" class="as-button" onclick="setDocumentAttribute('font', 'huge'); openSettings();">
            <label fetchlang="settings.9">huge</label>
            <div class="spacer"></div>
            <div class="radio-button" style="--label: '';"></div>
        </li>
    </ul>
</section>
<div>
    <button fetchlang="settings.10" onclick="closeWindow()"></button>
</div>
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
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        localStorage.setItem("theme", "dark");
        current.theme = "dark";
    } else {
        localStorage.setItem("theme", "mix");
        current.theme = "mix";
    }
}
    
current.font = localStorage.getItem("font");
if (current.font == undefined || current.font == null) {
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        localStorage.setItem("font", "small");
        current.font = "small";
    } else {
        localStorage.setItem("font", "medium");
        current.font = "medium";
    }

}

current.language = localStorage.getItem("language");
if (current.language == undefined || current.language == null) {
    var _language = "persian"

    if (window.navigator.language == "en" || window.navigator.language == "en_US")
        _language = "english";

    localStorage.setItem("language", _language);
    current.language = _language;
} 

function setLanguage(input) {
    setDocumentAttribute("language", input);
}

function getLanguage(update = true){
    const localePath = "../src/locales/" + current.language + ".json";
    fetch(localePath)
    .then((response) => response.json())
    .then((data) => {
      locale = data[0];
      if (update)
        updateLanguage();
    });

}

function updateLanguage(element = document){
    const elements = element.querySelectorAll('[fetchlang]');

    for (var i = 0; i < elements.length; i++) {
        if (elements[i]) {
            const _data = elements[i].getAttribute("fetchlang");
            if (_data != null) {
                const _array = elements[i].getAttribute("fetchlang").split('.');
                if (_array[0] == "!only") {
                    if (_array[1] != current.language)  
                    elements[i].remove();
                }
                else
                    elements[i].innerHTML = locale[_array[0]][+ _array[1]];
            }
        }
    }
}

function switchLanguage() {
    console.log(current.language);
    if(current.language == "english")
        setLanguage("persian");
    else
        setLanguage("english");
    location.reload();
}
function setInnerByLang(element) {
    const data = element.getAttribute("fetchlang").split('.');
    element.innerHTML = locale[data[0]][+ data[1]];
}

function init(){
    setDocumentAttribute("theme", current.theme);
    setDocumentAttribute("font", current.font);
    setLanguage(current.language);
    getLanguage(true);
    if (current.language == "english") {
        document.documentElement.style.setProperty("--text-direction", "ltr");
    } else if (current.language  == "persian") {
        document.documentElement.style.setProperty("--text-direction", "rtl");
    }
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
    updateLanguage(winContent);
}

function updateLooks() {
    document.getElementById("theme_button").innerHTML = current.theme;
    document.getElementById("font_button").innerHTML = current.font;
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
    // updateLooks();

    if (_function != null)
        _function();
}



function scrollto(input){
    const element = document.getElementById(input);
    const y = element.getBoundingClientRect().top + window.pageYOffset - 90;
    window.scrollTo({top: y, behavior: 'smooth'});
}