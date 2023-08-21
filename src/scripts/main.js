/* Copyright (C) 2023 muhammad ali kalantari <mk3000ss@gmail.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

const content = document.getElementById("content");
const title = document.getElementById("title");

var currentMenu;
var main_content;
var about_content;
var contact_content;
var projects_content;
var avp_content;
var options_content;

var current = JSON.parse(`
{
    "theme":"",
    "font":""
}`);

current.theme = localStorage.getItem("theme");
if (current.theme === undefined) {
    localStorage.setItem("theme", "black");
    current.theme = "black";
}
    
current.font = localStorage.getItem("font");
if (current.font === undefined) {
    localStorage.setItem("font", "normal");
    current.font = "normal";
} 




function generateContents() {
    main_content = `
    <li><button onclick="setContent(about_content, 'ABOUT')">ABOUT</button></li>
    <li><button onclick="setContent(contact_content, 'CONTACT')">CONTACT</button></li>
    <li><button onclick="setContent(projects_content, 'PROJECTS')">PROJECTS</button></li>
    <li><button onclick="setContent(options_content, 'OPTIONS')">OPTIONS</button></li>
    `;

    about_content = `
    <li><span>+ Hello, I'm Muhammad Ali Kalantari!</span></li>
    <br/>
    <li><span>+ i'm a c++ programmer and i also design websites for fun</span></li>
    <br/>
    <li><span>+ my main interest is GameDev and i'm quite familliar with UnrealEngine.</span></li>
    <br/>
    <li><span>+ i have worked on mu own graphics engine before (using opengl) and know some stuff about the world of game engines.</span></li>
    <br/><br/>
    <li><button onclick="setContent(main_content, 'MAIN')">BACK</button></li>
    `;

    contact_content = `
    <li>
    <label>telegram:</label>
    <button onclick="window.open('https://t.me/ma_kalantari', '_blank');">@MA_Kalantari</button>
    </li>

    <li>
    <label>e-mail:</label>
    <button onclick="location.href='mailto:mk3000ss@gmail.com?subject=From Webpage';">mk3000ss@gmail.com</button>
    </li>

    <li>
    <label>phone:</label>
    <button onclick="navigator.clipboard.writeText('+989939927949'); notif('copied');">+98 993 992 7949</button>
    </li>
    <br/>
    <li><button onclick="setContent(main_content, 'MAIN')">BACK</button></li>
    `;

    projects_content = `
    <label>[ AntiqueOcean ]</label>
    <li>
    <button onclick="setContent(avp_content, 'Antique Video Player')">AVP</button>
    </li>
    <br/>
    <label>[ Personal ]</label>
    <li>
    <button onclick="window.open('https://antiqueocean.github.io/TabdilYaar/', '_blank');">TabdilYaar (تبدیل یار)</button>
    </li>
    <li>
    <button onclick="window.open('https://antiqueocean.itch.io/illuminated-isometric-scene', '_blank');">Iluminated Scene (ue4)</button>
    </li>

    <br/>
    <li><button onclick="setContent(main_content, 'MAIN')">BACK</button></li>
    `;

    avp_content = `
    <li>
    AVP is an open-source and free desktop Video Player developed by Electron-js.
    </li>

    <li>
    <button onclick="window.open('https://antiqueocean.github.io/avp-public/', '_blank');">Go To Page</button>
    </li>
    <br/>
    <li><button onclick="setContent(projects_content, 'PROJECTS')">BACK</button></li>
    `;

    options_content = `
    <label>themes:</label>
    <li>
    <button onclick="setDocumentAttribute('theme', 'black')">BLACK</button>
    </li>
    <li>
    <button onclick="setDocumentAttribute('theme', 'grey')">GREY</button>
    </li>
    <li>
    <button onclick="setDocumentAttribute('theme', 'blue')">BLUE</button>
    </li>
    <br/>
    <label>font size:</label>
    <li>
    <button onclick="setDocumentAttribute('font', 'normal')">NORMAL</button>
    </li>
    <li>
    <button onclick="setDocumentAttribute('font', 'big')">BIG</button>
    </li>

    <br/>
    <li><button onclick="setContent(main_content, 'MAIN')">BACK</button></li>
    `;
}

function init(){
    generateContents();
    setContent(main_content, "MAIN");
    setDocumentAttribute("theme", current.theme);
    setDocumentAttribute("font", current.font);
} init();

function setDocumentAttribute(attr, input) {

    var _array = document.documentElement.getAttribute("class").split(' ');
    const index = _array.indexOf(_array.find((element) => element.includes(attr)));
    if (index != -1) {
        var _result = "";
        _array[index] = attr + '-' + input;
        _result = _array.join(" ");
        document.documentElement.setAttribute("class", _result);

            current[attr] = input;
            localStorage.setItem(attr, input);

        generateContents();
    }
}

function setContent(input, _title) {
    content.innerHTML = input;
    title.innerHTML = _title;
    currentMenu = _title;
}

function ifReturn(statement, returnTrue, returnFalse) {
    if (statement)
        return returnTrue;
    return returnFalse;
}

function notif(input) {
    alert(input);
}