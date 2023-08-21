const content = document.getElementById("content");
const title = document.getElementById("title");

var current;

//------------------------------------------------
const main_content = `
<li><button onclick="setContent(about_content, 'ABOUT')">ABOUT</button></li>
<li><button onclick="setContent(contact_content, 'CONTACT')">CONTACT</button></li>
<li><button onclick="setContent(projects_content, 'PROJECTS')">PROJECTS</button></li>
<li><button>OPTIONS</button></li>
`;

const about_content = `
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

const contact_content = `
<li>
<label>telegram:</label>
<button onclick="setContent(contact_content, 'CONTACT')">@MA_Kalantari</button>
</li>

<li>
<label>e-mail:</label>
<button onclick="setContent(contact_content, 'CONTACT')">mk3000ss@gmail.com</button>
</li>

<li>
<label>phone:</label>
<button onclick="setContent(contact_content, 'CONTACT')">+98 993 992 7949</button>
</li>
<br/>
<li><button onclick="setContent(main_content, 'MAIN')">BACK</button></li>
`;

const projects_content = `
<li>[ AntiqueOcean ]</li>
<li>
<button onclick="setContent(avp_content, 'Antique Video Player')">AVP</button>
</li>
<br/>
<li>[ Personal ]</li>
<li>
<button onclick="setContent(avp_content, 'CONTACT')">TabdilYaar (تبدیل یار)</button>
</li>
<li>
<button onclick="setContent(avp_content, 'CONTACT')">Iluminated Scene (ue4)</button>
</li>

<br/>
<li><button onclick="setContent(main_content, 'MAIN')">BACK</button></li>
`;

const avp_content = `
<li>
AVP is an open-source and free desktop Video Player developed by Electron-js.
</li>

<li>
<button onclick="">Go To Page</button>
</li>
<br/>
<li><button onclick="setContent(projects_content, 'PROJECTS')">BACK</button></li>
`;



function setContent(input, _title) {
    content.innerHTML = input;
    title.innerHTML = _title;
    current = _title;

}

function init(){
    setContent(main_content, "MAIN");
} init();

