let titles = "";
let doctors = "";
let requirements = "";

fetch('src/resources/database/titles.json')
    .then((response) => response.json())
    .then((json) => {
        titles = json;
    });

fetch('src/resources/database/doctors.json')
    .then((response) => response.json())
    .then((json) => {
        doctors = json;
    });

fetch('src/resources/database/requirements.json')
    .then((requirements) => requirements.json())
    .then((json) => {
        requirements = json;
    });

const tim = setInterval(function(t = tim) {
    if (titles != "" && doctors != "" && requirements != "") {
        setUpDatabase();
        clearInterval(t);
    }
}, 50);

const EDocument = document.documentElement;

const ETooltip = document.getElementById("tooltip");

const ETul = document.getElementById("teethInput_UL");
const ETur = document.getElementById("teethInput_UR");
const ETdl = document.getElementById("teethInput_DL");
const ETdr = document.getElementById("teethInput_DR");
const EJaw = document.getElementById("jawList");
const EAge = document.getElementById("ageInput");

const EDef = document.getElementById("titleInput");
const EAltUp = document.getElementById("altUpBtn");
const EAltDown = document.getElementById("altDownBtn");
const EDefList = document.getElementById("titles");
const EDoc = document.getElementById("doctorInput");
const EDocMatch = document.getElementById("matchingDocBtn");
const EDocGeneral = document.getElementById("generalDocBtn");
const EDocList = document.getElementById("doctors");
const ECst = document.getElementById("costInput");
const EMaxPay = document.getElementById("maxPayBtn");
const EMainPay = document.getElementById("payBtn");

const EMsg = document.getElementById("msgBox");

const EEvl = document.getElementById("evaluateButton");
const EClr = document.getElementById("clearButton");
const EMor = document.getElementById("moreButton");

const evaluateScreen = document.getElementById("evaluation");
const evaluateList = document.getElementById("evalList");   
const evaluateCopy = document.getElementById("evalCopy");
const evaluateClose = document.getElementById("evalClose");   

const moreScreen = document.getElementById("more");
const moreClose = document.getElementById("moreClose");   
const themeList = document.getElementById("themeList");
const fontList = document.getElementById("fontList");
const franchiseInput = document.getElementById("franchiseInput");
const factorInput = document.getElementById("factorInput");
const autoAgeInput = document.getElementById("autoAgeInput");

const reqInfoScreen = document.getElementById("reqinfo");
const reqInfoTitle = document.getElementById("reqinfoTitle");
const reqInfoContent = document.getElementById("reqinfoContent");
const reqInfoClose = document.getElementById("reqinfoClose");

const toothNumTitle = document.getElementById("toothNumTitle");

const generalToothSigns = "12345678۱۲۳۴۵۶۷۸ABCDEabcde";
const kidToothSigns = "ABCDEabcde";

var factor = 1;
var isKid = false;
var autoSetAge = false;
var toothNum;
var globalDocElement = null;
var globalDefElement = null;
var franchise;
var playSound = true;




if (localStorage.getItem('document_style_0') != undefined)
    setDocumentStyling(0, localStorage.getItem('document_style_0'));
else
    localStorage.setItem('document_style_0', "theme-light");

if (localStorage.getItem('document_style_1') != undefined)
    setDocumentStyling(1, localStorage.getItem('document_style_1'));
else
    localStorage.setItem('document_style_1', "font-medium");

if (localStorage.getItem('franchise') != undefined) {
    franchise = localStorage["franchise"];
    franchiseInput.value = franchise;
} else {
    franchise = 0;
    localStorage["franchise"] = 0;
    franchiseInput.value = 0;
}

if (localStorage.getItem('factor') != undefined) {
    factor = localStorage["factor"];
    factorInput.value = factor;
} else {
    factor = 1;
    localStorage["factor"] = 1;
    factorInput.value = 1;
}

if (localStorage["autoSetAge"] == "true") {
    autoAgeInput.checked = true;
} else {
    autoAgeInput.checked = false;
}

if (localStorage["playSound"] == "true") {
    //autoAgeInput.checked = true;
} else {
    //autoAgeInput.checked = false;
}
     
themeList.value = localStorage['document_style_0'];
fontList.value = localStorage['document_style_1'];

 document.body.addEventListener("click", (e) => {
    var audio = document.getElementById("audio");
    if(playSound && e.target.nodeName == "BUTTON")
        audio.play();
 });

 document.body.addEventListener("mouseover", (e) => {
    if(e.target.nodeName == "BUTTON") {
        if(e.target.getAttribute("tip") != null) {
            ETooltip.style.display = "block";
            ETooltip.style.left = e.target.getBoundingClientRect().left + "px";
            ETooltip.style.top = e.target.getBoundingClientRect().top + (e.target.clientHeight) + "px";
            ETooltip.innerHTML = `${e.target.getAttribute("tip")}`;
        }
    }
 });

 document.body.addEventListener("mouseout", (e) => {
    if(e.target.nodeName == "BUTTON") {
        if(e.target.getAttribute("tip") != null) {
            ETooltip.style.display = "none";
        }
    }
 });


//  * * * * * * * * * * * * * * *
//  E V E N T   L I S T E N E R S
//  * * * * * * * * * * * * * * *

ETul.oninput = (e) => { setupToothInput(e.target); }
ETur.oninput = (e) => { setupToothInput(e.target); }
ETdl.oninput = (e) => { setupToothInput(e.target); }
ETdr.oninput = (e) => { setupToothInput(e.target); }
EJaw.oninput = (e) => {
    if (e.target.value >= 33 && e.target.value <=38 ) {
        ETul.value = null;
        ETur.value = null;
        ETdl.value = null;
        ETdr.value = null;
        toothNum = e.target.value;
        toothNumTitle.innerHTML = EJaw.options[EJaw.selectedIndex].text;
    } else if (e.target.value == 0) {
        toothNumTitle.innerHTML = "شماره دندان";
        toothNum = null;
    }
    
}




EAltUp.onclick = (e) => {
    if (globalDefElement != null) {
        var alt = getElementByKey(titles, globalDefElement["altUp"]);
        if (alt != null) {
            EDef.value = alt["def"] + " [" + alt["key"] + "] ";
            defGeneralChange();
        }
    }
}

EAltDown.onclick = (e) => {
    if (globalDefElement != null) {
        var alt = getElementByKey(titles, globalDefElement["altDown"]);
        if (alt != null) {
            EDef.value = alt["def"] + " [" + alt["key"] + "] ";
            defGeneralChange();
        }
    }
}

EDocMatch.onclick = (e) => {
    if (globalDefElement != null) {
        if(globalDefElement["doc"][0] != undefined) {
            var doc = getElementByKey(doctors, globalDefElement["doc"][0]); 
            if (doc != null) {
                EDoc.value = doc["per"] + ' ' + doc["eng"] + " [" + doc["key"] + "]";
                docGeneralChange();
            }
        }
    }
}

EDocGeneral.onclick = (e) => {
    if (globalDefElement != null) {
        var doc = getElementByKey(doctors, 1); 
        if (doc != null) {
            EDoc.value = doc["per"] + doc["eng"] + " [" + doc["key"] + ']';
            docGeneralChange();
        }
    }
    
}

EMainPay.onclick = (e) => {
    setECstOptions();
    if (ECst.getAttribute("placeholder") != "" && ECst.getAttribute("placeholder") != "مبلغ هزینه به ریال" )
        ECst.value = ECst.getAttribute("placeholder");
}

EMaxPay.onclick = (e) => {
    setECstOptions(factor);
    if (ECst.getAttribute("placeholder") != "" && ECst.getAttribute("placeholder") != "مبلغ هزینه به ریال" )
        ECst.value = ECst.getAttribute("placeholder");
}

ETul.onfocus = (e) => {e.target.select();}
ETur.onfocus = (e) => {e.target.select();}
ETdl.onfocus = (e) => {e.target.select();}
ETdr.onfocus = (e) => {e.target.select();}

ETul.onclick = (e) => {e.target.select();}
ETur.onclick = (e) => {e.target.select();}
ETdl.onclick = (e) => {e.target.select();}
ETdr.onclick = (e) => {e.target.select();}

EAge.onfocus = (e) => {e.target.select();}
EAge.onclick = (e) => {e.target.select();}

ETul.addEventListener('keydown', function(e) {
    e.target.select();
    e.stopImmediatePropagation();
    if(e.key=="Enter")
        EAge.focus();
    else if (e.key == "ArrowDown") {
        ETul.value = "";
        ETdl.focus();
    }
    else if (e.key == "ArrowRight") {
        ETul.value = "";
        ETur.focus();
    }
});

ETur.addEventListener('keydown', function(e) {
    e.target.select();
    e.stopImmediatePropagation();
    if(e.key=="Enter")
        EAge.focus();
    else if (e.key == "ArrowDown") {
        ETur.value = "";
        ETdr.focus();
    }
    else if (e.key == "ArrowLeft") {
        ETur.value = "";
        ETul.focus();
    }
});


ETdl.addEventListener('keydown', function(e) {
    e.target.select();
    e.stopImmediatePropagation();
    if(e.key=="Enter")
        EAge.focus();
    else if (e.key == "ArrowUp") {
        ETdl.value = "";
        ETul.focus();
    }
    else if (e.key == "ArrowRight") {
        ETdl.value = "";
        ETdr.focus();
    }
});

ETdr.addEventListener('keydown', function(e) {
    e.target.select();
    e.stopImmediatePropagation();
    if(e.key=="Enter")
        EAge.focus();
    else if (e.key == "ArrowUp") {
        ETdr.value = "";
        ETur.focus();
    }
    else if (e.key == "ArrowLeft") {
        ETdr.value = "";
        ETdl.focus();
    }
});


EAge.onkeydown = (e) => { if(e.key=="Enter") EDef.focus(); };

ECst.oninput = (e) => {
    e.target.value = splitNum(e.target.value, 3);
}


reqInfoClose.onclick = (e) => {
    reqInfoScreen.style.display = "none";
    reqInfoContent.innerHTML = "";
}

function defaultEvaluation() {
    // only time globalDefElement sets outside of EDef.change for safety
    if (EDef.value != undefined)
        globalDefElement = getDef();

    // only time globalDefElement sets outside of EDef.change for safety
    if (EDoc.value != undefined)
        globalDocElement = getDoc();

    if (ETul.value != undefined)
        setupToothInput(ETul);
    else if (ETur.value != undefined)
        setupToothInput(ETur);
    else if (ETdl.value != undefined)
        setupToothInput(ETdl);
    else if (ETdr.value != undefined)
        setupToothInput(ETdr);


    if (EAge.value == undefined)
        addMsg("فیلد سن بیمار را پر کنید");
    if (toothNum == undefined)
        addMsg("فیلد شماره دندان را پر کنید");
    if (globalDocElement == null)
        addMsg("فیلد پزشک را پر کنید");
    if (globalDefElement == null)
        addMsg("فیلد عنوان هزینه را پر کنید");
    if (ECst.value == null || ECst.value == 0)
        addMsg("فیلد مبلغ را پر کنید");

    if (toothNum != undefined && EAge.value != undefined && globalDocElement != null && globalDefElement != null)
        evaluate(toothNum, EAge.value, globalDocElement["key"], globalDefElement["key"]);
}

EEvl.onclick = (e) => {
    defaultEvaluation();
}

EClr.onclick = (e) => {
    ETdl.value = null;
    ETdr.value = null;
    ETul.value = null;
    ETur.value = null;
    EJaw.value = null;
    EAge.value = null;
    EDef.value = null;
    EDoc.value = null;
    ECst.value = null;
    ECst.setAttribute("placeholder", "مبلغ هزینه به ریال");
    toothNumTitle.innerHTML = "شماره دندان";
    EMsg.innerHTML = "";
    toothNum = null;
    globalDefElement = null;
    globalDocElement = null;
    EAltUp.disabled = true;
    EAltDown.disabled = true;
    EDocGeneral.disabled = true;
    EDocMatch.disabled = true;
    EMainPay.disabled = true;
    EMaxPay.disabled = true;
}

EMor.onclick = (e) => {
    moreScreen.style.display = "flex";
}

moreClose.onclick = (e) => {
    franchise = franchiseInput.value;
    factor = factorInput.value;
    localStorage["franchise"] = franchise;
    localStorage["factor"] = factor;
    moreScreen.style.display = "none";
}

themeList.onchange = (e) => {
    setDocumentStyling(0, e.target.value);
}

fontList.onchange = (e) => {
    setDocumentStyling(1, e.target.value);
}

autoAgeInput.onchange = (e) => {
    if(autoAgeInput.checked) {
        autoSetAge = true;
        autoAgeInput.value = "true";
        localStorage["autoSetAge"] = true;
    }
    else {
        autoSetAge = false;
        autoAgeInput.value = "false";
        localStorage["autoSetAge"] = false;
    }
}

function getCostMatch(doc, def) {
    if (doc != "" && def != "") {
        if (doc == '0') {
            return Number(getElementByKey(titles, def)["prc"][0]);
        } else {
            var acceptedDoctors = getElementByKey(titles, def)["doc"];
            for (var i = 0; i < acceptedDoctors.length; i++) {
                if(acceptedDoctors[i] == doc)
                    return Number(getElementByKey(titles, def)["prc"][1]);
            }
            return Number(getElementByKey(titles, def)["prc"][0]);
        }
    }
    return 0;
}

function getDef(){
    var value;
    if (clearifyStringFrom(EDef.value, "Dd") == clearifyStringTo(EDef.value, "0123456789/")) 
        value = String(EDef.value);
    else {
        value = String(EDef.value).substring(String(EDef.value).indexOf('[') + 1, String(EDef.value).indexOf(']'));
        value = clearifyStringTo(value, "0123456789/");
    }
    return getElementByKey(titles, value);
}

function getDoc() {
    var value;
    if (String(EDoc.value) == clearifyStringTo(EDoc.value, "0123456789")) { 
        value = EDoc.value;
    }
    else {
        value = String(EDoc.value).substring(String(EDoc.value).indexOf('['), String(EDoc.value).indexOf(']'));
        value = clearifyStringTo(value, "0123456789");
    }
    return getElementByKey(doctors, value);
}

function getAgeGroup (input) {
    if (input >= 0 && input <= 9) {
        return 1;
    } else
    if (input == 10) {
        return 2;
    } else
    if (input >= 11 && input <= 12) {
        return 3;
    } else
    if (input >= 13 && input <= 16) {
        return 4;
    } else
    if (input >= 17) {
        return 5;
    }
    return 0;
}

function evaluate(tooth, age, doc, def) {
    var defElement = getElementByKey(titles, def);
    var docElement;
    if (defElement != null) {
        var pass = 0;

        for (var n = 0; n < defElement["for"].length; n++) {
            if (tooth == defElement["for"][n]) {
                pass++;
                break;
            }
        }   
        if (pass != 1)
        addMsg(`شماره دندان وارد شده (${toPalmer(tooth).join(" ")}) مشمول هزینه (${defElement["def"]}) نیست`, "color:red");

        if (ECst.value != "" && ECst.value != null && Number(clearifyStringTo(ECst.value, "0123456789")) > 0)
            pass++;
        else
            addMsg("مبلغ وارد شده صحیح نیست", "color:red")

        for (var i = 0; i < defElement["age"].length; i++) {
            if(getAgeGroup(age) == (defElement["age"][i])) {
                pass++;
                break;
            }
            if (i == defElement["age"].length - 1)
                addMsg("سن بیمار مشمول هزینه نیست", "color:red");
        }
            

        if (pass < 3) {

        } else {
            ECst.blur();
            evaluateScreen.style.display = "flex";
            
            var price = 0;

            if (doc != undefined && def != "") {
                
                if (doc != 1) {
                    
                    var acceptedDoctors = getElementByKey(titles, def)["doc"];
                    for (var i = 0; i < acceptedDoctors.length; i++) {
                        if(acceptedDoctors[i] == doc) {
                            
                            price =  getElementByKey(titles, def)["prc"][1];
                            docElement = getElementByKey(doctors, doc);
                            break;
                        }
                        if (i >= acceptedDoctors.length - 1) {
                            var tmpDoc = getElementByKey(doctors, doc)["per"];
                            addEvalMsg(`هزینه ارائه شده مشمول تخصص پزشک (${tmpDoc}) نیست. تعرفه دندانپزشک عمومی ارزیابی شد.`, "color: red;", "توجه: ");
                        }
                    }
                }

                if (price == 0) {
                    price = getElementByKey(titles, def)["prc"][0];
                    docElement = getElementByKey(doctors, '1', "key");
                }
                
            }
            var paid, priceWithFactor, payAfterFranchise;
            paid = clearifyStringTo(ECst.value, "0123456789");
            priceWithFactor = price * factor;
            maxPay = Math.min(priceWithFactor, paid);
            payAfterFranchise = Math.round(maxPay/100 * (100 - franchise));

            evaluateCopy.value = payAfterFranchise;
            evaluateCopy.innerHTML = splitNum(String(payAfterFranchise), 3);

            var reqItems = "";
            for (var i  = 0; i < defElement["req"].length; i++) {
                const reqElement = getElementByKey(requirements, defElement["req"][i]);
                reqItems += `<button value="${reqElement["key"]}" onclick="showReq(${reqElement["key"]})">${reqElement["min"]}</button>`;
            }

            var andItems = "";
            for (var i  = 0; i < defElement["and"].length; i++) {
                andItems += `<button tip="${getElementByKey(titles, defElement["and"][i])["def"]}" value="${defElement["and"][i]}" onclick="showDef('${defElement["and"][i]}')">D${defElement["and"][i]}</button>`;
            }

            var notItems = "";
            for (var i  = 0; i < defElement["not"].length; i++) {
                notItems += `<button tip="${getElementByKey(titles, defElement["not"][i])["def"]}" value="${defElement["not"][i]}" onclick="showDef('${defElement["not"][i]}')">D${defElement["not"][i]}</button>`;
            }
            
            var etcItems = "";
            for (var i  = 0; i < defElement["etc"].length; i++) {
                etcItems += `<br>${i+1}- ${defElement["etc"][i]}`;
            }
            if (etcItems != "")
            addEvalMsg(etcItems, "color: var(--warning-color);", "توضیحات: ");

            if (defElement["req"].length > 0)
                addEvalMsg(reqItems, "display: flex; align-items: center; gap: 5px;", "مدارک:");
            if (defElement["and"].length > 0)
                addEvalMsg(andItems, "display: flex; align-items: center; gap: 5px;", "هم‌نیاز:");
            if (defElement["not"].length > 0)
                addEvalMsg(notItems, "display: flex; align-items: center; gap: 5px;", "مغایر:");
            addEvalMsg(defElement["def"], "border-bottom: 1px solid; margin-bottom: 10px;", "هزینه: ");
            addEvalMsg('D' + defElement["key"], "", "کد: ");
            addEvalMsg(toPalmer(tooth)[0] + " " + toPalmer(tooth)[1] + " " + toPalmer(tooth)[2], "", "دندان: ");
            addEvalMsg(docElement["per"], "", "پزشک: ");
            addEvalMsg(age, "", "سن بیمار: ");

            
            addEvalMsg(paid + " <span class='less'>" + Num2persian(paid) + " ریال</span>", "border-bottom: 1px solid; margin-bottom: 10px;", "مبلغ اعلامی:");
            addEvalMsg(price  + " <span class='less'>" + Num2persian(price) + " ریال</span>", "", "تعرفه اصلی: ");
            if (factor != 1)
                addEvalMsg(priceWithFactor  + " <span class='less'>" + Num2persian(priceWithFactor) + " ریال</span>", "", `تعرفه با ضریب ${factor} : `);
            addEvalMsg(maxPay  + " <span class='less'>" + Num2persian(maxPay) + " ریال</span>", "", `پرداختی بدون فرانشیز: `);
            if (franchise > 0)
                addEvalMsg(payAfterFranchise  + " <span class='less'>" + Num2persian(payAfterFranchise) + " ریال</span>", "text-decoration: underline;", `پرداختی با اعمال فرانشیز ${franchise}% : `);

        }
    }

}


function isOneOf(input, array) {
    if (input == null || input == undefined || input == "")
        return false
    for (var i = 0; i < array.length; i++)
        if(input == array[i])
            return true;
    return false;
}


// more of side feature
// adds some important details to evaluation process
// for when the user doesnt know much about dental insurance
function instantReminder() {
    // without def
    if (isOneOf(toothNum, [1, 16, 17, 32]))
    addMsg("وجود حتمی دندان عقل از روی گرافی قبل بررسی شود", "color: var(--reminder-color)");

    // with def
    if (globalDefElement != null){
        if (isOneOf(globalDefElement["key"], ["3310/3"]) && isOneOf(toothNum, [3, 14, 19, 30]))
            addMsg("دندان 6 معمولا دارای سه کانال است. جهت تایید کانال اضافه (چهار کاناله بودن)، گرافی به دقت بررسی شود.", "color: var(--reminder-color)");
    }

    // with doc
    if (globalDocElement != null){
    }

    //with both
    if (globalDefElement != null && globalDocElement != null) {

    }
}

evaluateCopy.onclick = () => {
    navigator.clipboard.writeText(evaluateCopy.value);
    const intTmp = setInterval((t = intTmp, e = evaluateCopy) => {
        e.innerHTML = splitNum(e.value);
        clearInterval(t);
    }, 750);
    evaluateCopy.innerHTML = "کپی شد";
}

evaluateClose.onclick = () => {
    evaluateScreen.style.display = "none";
    evaluateList.innerHTML = "";
}


function setECstOptions(_factor = 1) {
    if (globalDefElement != null && globalDocElement == null) {
        ECst.setAttribute("placeholder", splitNum(Number(globalDefElement["prc"][0]) * _factor, 3));
        EMainPay.disabled = false;
        EMaxPay.disabled = false;
    }
    else if (globalDefElement == null) {
        ECst.setAttribute("placeholder", "مبلغ هزینه به ریال");
        EMainPay.disabled = true;
        EMaxPay.disabled = true;
    } else {
        ECst.setAttribute("placeholder", splitNum(getCostMatch(globalDocElement["key"], globalDefElement["key"]) * _factor, 3))
        EMainPay.disabled = false;
        EMaxPay.disabled = false;
    }
    
}

function defGeneralChange(){
    globalDefElement = getDef();
    if (globalDefElement != null){
        EDocGeneral.disabled = false;
        EDocMatch.disabled = false;
        if (globalDefElement["altUp"] != "")
            EAltUp.disabled = false;
        else 
            EAltUp.disabled = true;
        if (globalDefElement["altDown"] != "")
            EAltDown.disabled = false;
        else 
            EAltDown.disabled = true;
    } else {
        EDocGeneral.disabled = true;
        EDocMatch.disabled = true;
        EAltUp.disabled = true;
        EAltDown.disabled = true;
    }
    setECstOptions();
    instantReminder();
}

function docGeneralChange() {
    globalDocElement = getDoc();
    setECstOptions();
}


// ### All EDef Inputs ###
EDef.onchange = defGeneralChange;
EDef.oninput = defGeneralChange;
EDefList.onselect = defGeneralChange;
EDef.onkeydown = (e) => {
    if(e.key == "Backspace") {
        EDef.value = '';
        defGeneralChange();
    }
    else if(e.key == "Enter") {
        defGeneralChange();
        EDoc.focus();
    }
}

// ### All EDoc Inputs ###
EDoc.onchange = docGeneralChange;
EDoc.oninput = docGeneralChange;
EDocList.onselect = docGeneralChange;
EDoc.onkeydown = (e) => {
    e.stopImmediatePropagation();
    docGeneralChange();
    if(e.key == "Backspace") {
        EDoc.value = '';
        docGeneralChange();
    }
    else if(e.key == "Enter") {
        if(globalDocElement == null)
            EDoc.value = 1;
        docGeneralChange();
        ECst.focus();
    }
}

// ### All ECst Inputs ###
ECst.onkeydown = (e) => {
    if(e.key == "Backspace")
        ECst.value = '';
    else if(e.key == "Enter") {
        defaultEvaluation();
    } else if(e.key == "ArrowLeft") {
        e.stopImmediatePropagation();
        if (ECst.value == null || ECst.value == '') {
            setECstOptions();
            ECst.value = ECst.getAttribute("placeholder");
        }
    } else if(e.key == "ArrowRight") {
        e.stopImmediatePropagation();
        if (ECst.value == null || ECst.value == '') {
            setECstOptions(factor);
            ECst.value = ECst.getAttribute("placeholder");
        }
    }
}

function splitNum(input, step = 3) {
    var temp = clearifyStringTo(String(input), "0123456789");
    var value = "";
    for (var i = 0; i < temp.length; i++) {
        value += temp[i];
        if ((temp.length - i -1) % step == 0 && i != temp.length - 1)
            value += "' ";
    }
    return value;
}

//  * * * * * * * * *
//  F U N C T I O N S
//  * * * * * * * * *

function setUpDatabase() {
    for (var i = 0; i < titles.length; i++) {
        EDefList.innerHTML += `<option key='` + titles[i]["key"] + `' num='` + i + `'>` + titles[i]["def"] + " [" + titles[i]["key"] + `]</option>`;
    }

    for (var i = 0; i < doctors.length; i++) {
        EDocList.innerHTML += `<option key='` + doctors[i]["key"] + `' num='` + i + `'>` + doctors[i]["per"] + ` ${doctors[i]["eng"]} ` + " [" + doctors[i]["key"] + `]</option>`;
    }
}

function toUniversal(input) {
    switch (input) {
        case caseExpression1:
          statements
        case caseExpression2:
          statements
        // …
        case caseExpressionN:
          statements
        default:
          statements
      }
      
}

function clearifyStringFrom (input, from) {
    var result = "";
    for (var i = 0; i < input.length; i++) {
        var shouldAdd = true;
        for (var n = 0; n < from.length; n++) {
            if (input[i] == from[n]) {
                shouldAdd = false;
                break;
            }
        }
        if (shouldAdd)
            result += input[i];
    }
    return result;
}

function clearifyStringTo(input, to) {
    var result = "";
    for (var i = 0; i < input.length; i++) {
        for(var n = 0; n < to.length; n++) {
            if(input[i] == to[n]) {
                result += input[i];
                break;
            }
        }
    }

    return result;
}

function isOfString(input, ref) {
    var isOf = 0;
    for (var i = 0; i < input.length; i++) {
        for (var n = 0; n < ref.length; n++) {
            if (input[i] == ref[n]) {
                isOf++;
                break;
            }
        }
    }
    if (isOf == input.length)
        return true;
    return false;
}

function setupToothInput(input) {
    input.value = clearifyStringTo(String(input.value), generalToothSigns);
    if (input.value.length > 0) {
        input.value = input.value[0];
        input.value = String(input.value).toUpperCase();
        if (input != ETul)
            ETul.value = null;
        if (input != ETur)
            ETur.value = null;
        if (input != ETdl)
            ETdl.value = null;
        if (input != ETdr)
            ETdr.value = null;

        EJaw.value = null;

        if(autoSetAge) {
            if (isOfString(input.value, kidToothSigns)) {
                isKid = true;
                EAge.value = 8;
            } else {
                isKid = false;
                EAge.value = 18;
            }
        } else {
            if (isOfString(input.value, kidToothSigns) && EAge.value > 12) {
                EAge.setAttribute("class", EAge.getAttribute("class") + " redBorderBold");
                var masg = `سن وارد شده (${EAge.value}) با شماره دندان ${input.value} (${input.getAttribute("tag")}) تنساب ندارد`;
                addMsg(masg);
                input.value = null;
                toothNum = -1;
                setTimeout(() => {
                    EAge.setAttribute("class", EAge.getAttribute("class").replace(" redBorderBold", ""));
                }, 300);
            }
            
        }



        if (isOfString(input.value, kidToothSigns)) {
            toothNum = eval(input.getAttribute("formula").replace('m', '5').replace('n', letterToNum(input.value)));
            toothNumTitle.innerHTML = "شماره دندان: " + toothNum + " کودک ";
        } else {
            toothNum = eval(input.getAttribute("formula").replace('m', '8').replace('n', input.value));
            toothNumTitle.innerHTML = "شماره دندان: " + toothNum;
        }
    }

    instantReminder();
}

function addMsg(input, style = "") {
    var children = EMsg.children;
    if ((children.length > 0 && children[0].innerHTML != input) || children.length == 0)
        EMsg.innerHTML = `<li style="${style}; --tag: '${children.length+1} ';">` + input + "</li>" + EMsg.innerHTML;
}


function addEvalMsg(input, style = "", tag="", other ="") {
    var children = evaluateList.children;
    
    evaluateList.innerHTML = `<li ${other} style="${style} --tag: '${tag} ';">` + input + "</li>" + evaluateList.innerHTML;
}



function toPalmer(input) {
    var result = [0, "", ""];
    var n = 8;
    if(isKid)
        n = 5;
    if (input >= 1 && input <= n) {
        result[0] = n - input + 1;
        result[1] = "بالا";
        result[2] = "راست";
        return result;
    }
    if (input >= n + 1 && input <= n * 2) {
        result[0] = input - n;
        result[1] = "بالا";
        result[2] = "چپ";
        return result;
    }
    if (input >= n * 3 + 1 && input <= n * 4) {
        result[0] = input - 24;
        result[1] = "پایین";
        result[2] = "راست";
        return result;
    }
    if (input >= n * 2 + 1 && input <= n * 3) {
        result[0] = 24 - input + 1;
        result[1] = "پایین";
        result[2] = "چپ";
        return result;
    }
    if (input == 33) {
        result[0] = "";
        result[1] = "فک";
        result[2] = "پایین";
        return result;
    }
    if (input == 34) {
        result[0] = "";
        result[1] = "فک";
        result[2] = "بالا";
        return result;
    }
    if (input == 35) {
        result[0] = "";
        result[1] = "فک";
        result[2] = "بالا و پایین";
        return result;
    }
    if (input == 36) {
        result[0] = "";
        result[1] = "نیمه راست";
        result[2] = "فک";
        return result;
    }
    if (input == 37) {
        result[0] = "";
        result[1] = "نیمه میانی";
        result[2] = "فک";
        return result;
    }
    if (input == 38) {
        result[0] = "";
        result[1] = "نیمه چپ";
        result[2] = "فک";
        return result;
    }
    
    return null;
}

function letterToNum(input) {
    var letters = "ABCDE";
    for (var n = 1; n < 6; n++) {
        if (input == letters[n-1]) {
            return n;
        }
    }
    return 0;
}

function getElementByKey(array, value, key = "key") {
    for (var i = 0; i < array.length; i++)
        if (array[i][key] == value)
            return array[i];
    return null;
}

function setDocumentStyling(index, input) {
    var all = EDocument.getAttribute("class").split(' ');
    all[index] = input;
    EDocument.setAttribute("class", all.join(' '));
    const id = "document_style_" + String(index);
    localStorage.setItem(id, input);
}

function showReq(input) {
    var infoElement = getElementByKey(requirements, input);
    reqInfoScreen.style.display = "flex";
    reqInfoTitle.innerHTML = infoElement["per"];
    reqInfoContent.innerHTML += `<li style="--tag:'مختصر:';">${infoElement["min"]}</li>`;
    reqInfoContent.innerHTML += `<li style="--tag:'انگلیسی:';">${infoElement["eng"]}</li>`;
    reqInfoContent.innerHTML += `<li style="--tag:'توضیحات:';">${infoElement["det"]}</li>`;
    reqInfoContent.innerHTML += `<img src="${infoElement["img"]}"/>`;
}

function showDef(input) {
    var infoElement = getElementByKey(titles, input);
    reqInfoScreen.style.display = "flex";
    reqInfoTitle.innerHTML = infoElement["def"];
    var teeth = "";
    for (var i = 0; i < infoElement["for"].length; i++)
        teeth += toPalmer(infoElement["for"][i]).join(" ") + " | ";

    reqInfoContent.innerHTML += `<li style="--tag:'سنین:';">${infoElement["age"]}</li>`;
    reqInfoContent.innerHTML += `<li style="--tag:'دندان‌های:';">${teeth}</li>`;
    reqInfoContent.innerHTML += `<li style="--tag:'توضیحات:';">${infoElement["etc"]}</li>`;
}

document.getElementById("loginpage").onkeydown = (e) => {
    if (e.key == "Enter") {
        login();
    }
}

if (localStorage["autoLogin"] == "true") {
    document.getElementById("username").value = localStorage["usr"];
    document.getElementById("password").value = localStorage["psw"];
    if (!login()) {
        document.getElementById("loginpage").style.display = "flex";
    }
} else {
    document.getElementById("loginpage").style.display = "flex";
}

function login() {
    fetch('https://kalantari.info/dandaan/src/resources/database/dataset.json')
    .then((response) => response.json())
    .then((json) => {
        for (var i = 0; i < json.length; i++) {
            if (json[i]["0"] == document.getElementById("username").value &&
                json[i]["1"] == document.getElementById("password").value) {

                    addMsg(json[i]["3"] + "، خوش آمدید.");
                    if (document.getElementById("loginCheck").checked) {
                        localStorage["usr"] = json[i]["0"];
                        localStorage["psw"] = json[i]["1"];
                        localStorage["autoLogin"] = "true";
                        
                    }
                    else {
                        localStorage.removeItem("usr");
                        localStorage.removeItem("psw");
                        localStorage["autoLogin"] = "false";
                    }
                    document.getElementById("loginpage").remove();
                    return true;
                }
                if (i == json.length - 1) {
                    document.getElementById("loginMsg").innerHTML = "نام کاربری یا رمز عبور اشتباه است"; 
                }
        }
    });
    return false;
}


function logout() {
    localStorage.removeItem("usr");
    localStorage.removeItem("psw");
    localStorage["autoLogin"] = "false";
    location.reload();
}










/**
 *
 * @type {string}
 */
const delimiter = ' و ';

/**
 *
 * @type {string}
 */
const zero = 'صفر';

/**
 *
 * @type {string}
 */
const negative = 'منفی ';

/**
 *
 * @type {*[]}
 */
const letters = [
  ['', 'یک', 'دو', 'سه', 'چهار', 'پنج', 'شش', 'هفت', 'هشت', 'نه'],
  ['ده', 'یازده', 'دوازده', 'سیزده', 'چهارده', 'پانزده', 'شانزده', 'هفده', 'هجده', 'نوزده', 'بیست'],
  ['', '', 'بیست', 'سی', 'چهل', 'پنجاه', 'شصت', 'هفتاد', 'هشتاد', 'نود'],
  ['', 'یکصد', 'دویست', 'سیصد', 'چهارصد', 'پانصد', 'ششصد', 'هفتصد', 'هشتصد', 'نهصد'],
  ['', ' هزار', ' میلیون', ' میلیارد', ' بیلیون', ' بیلیارد', ' تریلیون', ' تریلیارد',
    ' کوآدریلیون', ' کادریلیارد', ' کوینتیلیون', ' کوانتینیارد', ' سکستیلیون', ' سکستیلیارد', ' سپتیلیون',
    ' سپتیلیارد', ' اکتیلیون', ' اکتیلیارد', ' نانیلیون', ' نانیلیارد', ' دسیلیون', ' دسیلیارد'
  ],
];

/**
 * Decimal suffixes for decimal part
 * @type {string[]}
 */
const decimalSuffixes = [
  '',
  'دهم',
  'صدم',
  'هزارم',
  'ده‌هزارم',
  'صد‌هزارم',
  'میلیونوم',
  'ده‌میلیونوم',
  'صدمیلیونوم',
  'میلیاردم',
  'ده‌میلیاردم',
  'صد‌‌میلیاردم'
];

/**
 * Clear number and split to 3 sections
 * @param {*} num
 */
const prepareNumber = (num) => {
  let out = num;
  if (typeof out === 'number') {
    out = out.toString();
  }

  //make first part 3 chars
  if (out.length % 3 === 1) {
    out = `00${out}`;
  } else if (out.length % 3 === 2) {
    out = `0${out}`;
  }
  // Explode to array
  return out.replace(/\d{3}(?=\d)/g, '$&*').split('*');
};

//tinyNumToWord convert 3tiny parts to word
const tinyNumToWord = (num) => {
  // return zero
  if (parseInt(num, 0) === 0) {
    return '';
  }
  const parsedInt = parseInt(num, 0);
  if (parsedInt < 10) {
    return letters[0][parsedInt];
  }
  if (parsedInt <= 20) {
    return letters[1][parsedInt - 10];
  }
  if (parsedInt < 100) {
    const one = parsedInt % 10;
    const ten = (parsedInt - one) / 10;
    if (one > 0) {
      return letters[2][ten] + delimiter + letters[0][one];
    }
    return letters[2][ten];
  }
  const one = parsedInt % 10;
  const hundreds = (parsedInt - (parsedInt % 100)) / 100;
  const ten = (parsedInt - ((hundreds * 100) + one)) / 10;
  const out = [letters[3][hundreds]];
  const secondPart = ((ten * 10) + one);

  if (secondPart === 0) {
    return out.join(delimiter);
  }

  if (secondPart < 10) {
    out.push(letters[0][secondPart]);
  } else if (secondPart <= 20) {
    out.push(letters[1][secondPart - 10]);
  } else {
    out.push(letters[2][ten]);
    if (one > 0) {
      out.push(letters[0][one]);
    }
  }
  
  return out.join(delimiter);
};


/**
 * Convert Decimal part
 * @param decimalPart
 * @returns {string}
 * @constructor
 */
const convertDecimalPart = (decimalPart) => {
  // Clear right zero
  decimalPart = decimalPart.replace(/0*$/, "");

  if (decimalPart === '') {
    return '';
  }

  if (decimalPart.length > 11) {
    decimalPart = decimalPart.substr(0, 11);
  }
  return ' ممیز ' + Num2persian(decimalPart) + ' ' + decimalSuffixes[decimalPart.length];
};

/**
 * Main function
 * @param input
 * @returns {string}
 * @constructor
 */
const Num2persian = (input) => {
  // Clear Non digits
  input = input.toString().replace(/[^0-9.-]/g, '');
  let isNegative = false;
  const floatParse = parseFloat(input);
  // return zero if this isn't a valid number
  if (isNaN(floatParse)) {
    return zero;
  }
  // check for zero
  if (floatParse === 0){
    return zero;
  }
  // set negative flag:true if the number is less than 0
  if (floatParse < 0){
    isNegative = true;
    input = input.replace(/-/g, '');
  }

  // Declare Parts
  let decimalPart = '';
  let integerPart = input;
  let pointIndex = input.indexOf('.');
  // Check for float numbers form string and split Int/Dec
  if (pointIndex > -1) {
    integerPart = input.substring(0, pointIndex);
    decimalPart = input.substring(pointIndex + 1, input.length);
  }

  if (integerPart.length > 66) {
    return 'خارج از محدوده';
  }

  // Split to sections
  const slicedNumber = prepareNumber(integerPart);
  // Fetch Sections and convert
  const out = [];
  for (let i = 0; i < slicedNumber.length; i += 1) {
    const converted = tinyNumToWord(slicedNumber[i]);
    if (converted !== '') {
      out.push(converted + letters[4][slicedNumber.length - (i + 1)]);
    }
  }

  // Convert Decimal part
  if (decimalPart.length > 0) {
    decimalPart = convertDecimalPart(decimalPart);
  }

  return (isNegative?negative:'') + out.join(delimiter) + decimalPart;
};

//@deprecated
String.prototype.toPersianLetter = function () {
  return Num2persian(this);
};

//@deprecated
Number.prototype.toPersianLetter = function () {
  return Num2persian(parseFloat(this).toString());
};

String.prototype.num2persian = function () {
  return Num2persian(this);
};

Number.prototype.num2persian = function () {
  return Num2persian(parseFloat(this).toString());
};