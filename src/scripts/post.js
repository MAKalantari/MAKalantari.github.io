const commentsElement = document.getElementById("comments");
const postContainer = document.getElementById("post");
const pageTitle = document.getElementById("pageTitle");
const postTitle = document.getElementById("postTitle");

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

var postName = 404;
var post;
var postContent = "";

if (urlParams.get('n') != null) {
    postName = urlParams.get('n');
}

function loadPost(){
    const _path = "/blog/posts/" + postName + ".json";
    fetch(_path)
    .then((response) => response.json())
    .then((data) => {
        post = data;
        loadContent(post);
    });
} loadPost();

function loadContent(input) {
    var _current_language_index = 0;

    for (var l = 0; l < input.language.length; l++) {
        if (input.language[l] == current.language) {
            _current_language_index = l;
            break;
        }
    }

    const _path = input.content[_current_language_index];

    fetch(_path)
    .then((file) => {
        file.text()
        .then((data) => {
            postContent = data;
            showPost(post);
        })
    });





}

function showPost(input){
    var _current_language_index = 0;
    var _content_languages = "";
    var _tags = "";

    for (var i = 0; i < input.language.length; i++) {
        _content_languages += `<a class="info" fetchlang="` + input.language_code[i] + `"></a>`;
        if (input.language[i] == current.language) {
            _current_language_index = i;
        }
    }
    
    for (var i = 0; i < input.tags[_current_language_index].length; i++) {
        _tags += "<a> " + input.tags[_current_language_index][i] + "</a>";
    }

    pageTitle.innerHTML = input.title[_current_language_index] + " - " + input.author[_current_language_index];
    postTitle.innerHTML = input.title[_current_language_index];

    var _content = `
    <section>
        <cite>
            <img src="${input.thumbnail[_current_language_index]}"/>
            <section>
            <section>
                <a class="info"><span style="font-size: var(--font-smaller)" fetchlang="post.1"></span>: ${input.date[_current_language_index]}</a>
                ${_content_languages}
                ${_tags}
            </section>
            <section>${input.description[_current_language_index]}</section>
            <section>
                <label fetchlang="post.0"></label>
                <hr class="is"/>
                <label>${input.author[_current_language_index]}</label>
            </section>
            </section>
        </cite>
        <div class="top">
            <section>
                <label fetchlang="settings.5"></label>
                <button fetchlang="settings.6" onclick="setDocumentAttribute('font', 'small')"></button>
                <button fetchlang="settings.7" onclick="setDocumentAttribute('font', 'medium')"></button>
                <button fetchlang="settings.8" onclick="setDocumentAttribute('font', 'big')"></button>
                <button fetchlang="settings.9" onclick="setDocumentAttribute('font', 'huge')"></button>
                <button></button>
            </section>
            <section>
                <label fetchlang="settings.1"></label>
                <button fetchlang="settings.2" onclick="setDocumentAttribute('theme', 'mix')"></button>
                <button fetchlang="settings.3" onclick="setDocumentAttribute('theme', 'light')"></button>
                <button fetchlang="settings.4" onclick="setDocumentAttribute('theme', 'dark')"></button>
                <button></button>
            </section>
        </div>
        <div class="content">
            <pre>${postContent}</pre>
        </div>
    </section>
`
    postContainer.innerHTML = _content;
    updateLanguage(postContainer);
}

function setComments(){
    commentsElement.innerHTML = "";
    var comments = document.createElement('script');
    comments.setAttribute("src", "https://utteranc.es/client.js");
    comments.setAttribute("repo", "makalantari/MAKalantari.github.io");
    comments.setAttribute("issue-term", `${postName}_${current.language}`);
    comments.setAttribute("theme", ifTrueReturn(current.theme == "dark", "github-dark", "github-light"));
    comments.setAttribute("crossorigin", "anonymous");
    comments.setAttribute("async", "");
    commentsElement.appendChild(comments);
} setComments();