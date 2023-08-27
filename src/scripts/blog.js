
const scrollbar = document.getElementById("scrollbar");
const postContainer = document.getElementById("posts");
const topPicks = document.getElementById("topPicks");
const tagsContainer = document.getElementById("tags");
const pages1 = document.getElementById("pages1");
const pages2 = document.getElementById("pages2");

var meta = [];
var posts = [];
var topPosts = [];
var tags = [];
var postLoadProgress;
var page = 1;
var currentPostCount = 0;
var currentPostsArray;

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);


if (urlParams.get('page') != null) {
    page = urlParams.get('page');
}

var postsPerPage = localStorage.getItem('posts_per_page');
if (localStorage.getItem('posts_per_page') == null) {
    postsPerPage = 12;
    localStorage.setItem('posts_per_page', 12);
} else
    postsPerPage = parseInt(postsPerPage);


window.addEventListener("scroll", (e) => {
    const distance = document.documentElement.scrollTop;    
    const percent = Math.min((distance / (document.documentElement.offsetHeight - window.innerHeight) * 100), 100);
    scrollbar.style.width =  percent + '%';
})

function getMeta(load_posts = false, load_top_posts = false, load_tags = false) {
    const _path = "/blog/posts/meta.json";
    fetch(_path)
    .then((response) => response.json())
    .then((data) => {
        meta = [];
        for (var i = 0; i < data.length; i++) {
            if (findInArray(data[i].language, current.language) != -1) 
                meta.push(data[i]);
        }

        if (load_posts)
            loadPosts(page, postsPerPage);
        if(load_top_posts)
            loadTopPosts();
        if(load_tags)
            loadTags();

    });
} getMeta(true, true, true);

function addToCountingMap(map, key) {
    var _added = false;
    for (var i = 0; i < map.length; i++) {
        if (map[i][0] == key) {
            map[i][1] += 1;
            _added = true;
            break;
        }
    }
    if (!_added)
        map.push([key, 1]);
}

function loadTags() {
    tags = [];

    for (var i = 0; i < meta.length; i++){
        const _current_language_index = findInArray(meta[i].language, current.language);
        for (var t = 0; t < meta[i].tags[_current_language_index].length; t++) {
            addToCountingMap(tags, meta[i].tags[_current_language_index][t]);
        }
    }

    showTags(tags);
}

function setPostsPerPage(input) {
    postsPerPage = input;
    localStorage.setItem('posts_per_page', input);
    loadPosts(page, postsPerPage);
}


function findInArray (array, element) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] == element)
            return i;
    }
    return -1;
}

function loadTopPosts(){
    const _children = topPicks.children;
    topPosts = [];
    var topPostLoadProgress = _children.length;
    for (var i  = 0; i < _children.length; i++) {
        const index = i;
        const _path = "/blog/posts/" + _children[i].innerHTML + ".json";

        fetch(_path)
        .then((response) => response.json())
        .then((data) => {
            topPosts.push(data);
            topPostLoadProgress--;
            if (topPostLoadProgress == 0) {
                showTopPosts(topPosts);
            }
        });
    }
}

function updatePages(input){
    currentPostCount = input.length;
    var _content = `<label fetchlang="titles.7"></label>`;
    for (var i = 1; i < Math.ceil(currentPostCount / postsPerPage) + 1 && i < 7; i++) {
        if (i != page)
            _content += `<a href="?page=${i}">${i}</a>`;
        else
            _content += `<a class="current">${i}</a>`;
    }
    if (Math.ceil(currentPostCount / postsPerPage) > 7) {
        _content += `...<a  href="?page=${Math.ceil(currentPostCount / postsPerPage)}" ${ifTrueReturn(page == Math.ceil(currentPostCount / postsPerPage), 'class="current"')}>${Math.ceil(currentPostCount / postsPerPage)}</a>`
    } else if (Math.ceil(currentPostCount / postsPerPage) == 7) {
        _content += `<a  href="?page=${Math.ceil(currentPostCount / postsPerPage)}" ${ifTrueReturn(page == 7, 'class="current"')}>${Math.ceil(currentPostCount / postsPerPage)}</a>`;
    }
    pages1.innerHTML = _content;
    pages2.innerHTML = _content;
}

function loadPosts(page, count = -1, search = []){
    posts = [];

    if (typeof count != "number")
        count = parseInt(count);

    if (typeof page != "number")
        page = parseInt(page);

    const _index_start = (page - 1) * count;

    var _index_end = 0;
    if(count == -1)
        _index_end = meta.length;
    else
        _index_end = Math.min(meta.length - 1, _index_start + count - 1);

    var postLoadProgress =  _index_end - _index_start + 1;

    for (var i  = _index_start; i < _index_end + 1; i++) {
        const index = i;
        const _path = "/blog/posts/" + meta[index].name + ".json";

        fetch(_path)
        .then((response) => response.json())
        .then((data) => {
            posts.push(data);
            postLoadProgress--;
            if (postLoadProgress == 0) {
                showPosts(posts);
            }
        });
    }
}


function showPosts(input) {
    currentPostsArray = input;
    var _content = "";

    for (var i = 0; i < input.length; i++) {
        const index = i;
        var _current_language_index = 0;
        var _content_languages = "";

        for (var l = 0; l < input[index].language.length; l++) {
            _content_languages += `<label fetchlang="` + input[index].language_code[l] + `"></label>`;
            if (input[index].language[l] == current.language) {
                _current_language_index = l;
            }
        }

        var _content_tags = "";
        for (var t = 0; t < input[index].tags[_current_language_index].length; t++) {
            _content_tags += `<label>` + input[index].tags[_current_language_index][t] + `</label>`;
        }

        _content += `
            <a class="auto-fill-width" href="/blog/post/?n=${meta[index].name}">
            <section>
                    <img src="${input[index].thumbnail[_current_language_index]}"/>
                    ${_content_languages}
            </section>
            <section>
                <cite>
                    <h1>${input[index].title[_current_language_index]}</h1>
                    <span>${input[index].description[_current_language_index]}</span>
                </cite>
                <div>
                    ${_content_tags}
                </div>
            </section>
            </a>
    `
    }
    postContainer.innerHTML = _content;

    updatePages(meta);
    updateLanguage(pages1);
    updateLanguage(pages2);
    updateLanguage(postContainer);
}


function showTopPosts(input) {
    var _content = `<div class="section-title" fetchlang="titles.4"></div>`;
    for (var i = 0; i < input.length; i++) {
        const index = i;
        var _current_language_index = 0;
        var _content_languages = "";

        for (var l = 0; l < input[index].language.length; l++) {
            _content_languages += `<label fetchlang="` + input[index].language_code[l] + `"></label>`;
            if (input[index].language[l] == current.language) {
                _current_language_index = l;
            }
        }

        var _content_tags = "";
        for (var t = 0; t < input[index].tags[_current_language_index].length; t++) {
            _content_tags += `<label>` + input[index].tags[_current_language_index][t] + `</label>`;
        }

        _content += `
            <a href="/blog/post/?n=${meta[index].name}">

            <section>
                <img src="${input[index].thumbnail[_current_language_index]}"/>
                <cite>
                    <h1>${input[index].title[_current_language_index]}</h1>
                    <span>${input[index].description[_current_language_index]}</span>
                </cite>
            </section>
            <div>
                <label>${input[index].date[_current_language_index]}</label>
                ${_content_tags}
            </div>
        </a>
    `
    }
    topPicks.innerHTML = _content;

    updateLanguage(topPicks);
}

function showTags(input) {
    var _content = "";
    for (var i = 0; i < tags.length; i++) {
        _content += `<a href="" style="--count: '${tags[i][1]}';">${tags[i][0]}</a>`;
    }
    tagsContainer.innerHTML = _content;
}