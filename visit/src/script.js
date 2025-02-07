const EDoc = document.documentElement;
const yearsRight = document.getElementById("yearsright");
const docsLeft = document.getElementById("doctorsleft");
const docsRight = document.getElementById("doctorsright");
const stampTitle = document.getElementById("stamptitle");
const ECost = document.getElementById("cost");
const EFarsicost = document.getElementById("farsicost");
const EFirstins = document.getElementById("firstins");
const EFranchise = document.getElementById("franchise");
const EPayment = document.getElementById("payment");
const EAge = document.getElementById("age");;

var hasFrstIns = undefined;
var age = 18;
var doc = 970000;
var year = 0;
var cost = 0;
var franchise = 0;
var payment = 0;

const stampDegree = (Math.floor(Math.random() * 70) + -35) * -1;
document.documentElement.style.setProperty("--stampdeg", stampDegree + "deg");

function reEvaluate() {
    payment = evaluate(doc);
    EPayment.innerText = payment;
}

EAge.addEventListener("input", (e) => {
    age = e.target.value;
    reEvaluate();
});


EFranchise.addEventListener("input", (e) => {
    franchise = e.target.value / 100;
    reEvaluate();
});


EFirstins.addEventListener("change", (e) => {
    if(e.target.options.selectedIndex == 0) {
        hasFrstIns = undefined
    } else if (e.target.options.selectedIndex == 1) {
        hasFrstIns = false;
    } else {
        hasFrstIns = true;
    }
    reEvaluate();
});


yearsRight.addEventListener("change", (e) => {
    year = e.target.length - e.target.options.selectedIndex - 1;
    reEvaluate();
});

docsLeft.addEventListener("change", (e) => {
    docsRight.options.selectedIndex = e.target.options.selectedIndex;
    stampTitle.innerText = "پزشک " + e.target.value;
    doc = Number(e.target.options[e.target.selectedIndex].getAttribute("key"));
    reEvaluate();
});

docsRight.addEventListener("change", (e) => {
    docsLeft.options.selectedIndex = e.target.options.selectedIndex;
    stampTitle.innerText = "پزشک " + e.target.value;
    doc = Number(e.target.options[e.target.selectedIndex].getAttribute("key"));
    reEvaluate();
});

ECost.addEventListener("input", (e) => {
    cost = Number(e.target.value);
    EFarsicost.innerText = Num2persian(Math.round(e.target.value/10)) + " تومان";
    reEvaluate();
});

const dataStr = `
    [
        {
            "key": 970000,
            "ttl": "عمومی",
            "cst": [
                    [945700, 1260000]
                    ],
            "age": [0, 999],
            "det": ""
        },
        {
            "key": 970001,
            "ttl": "عمومی با سابقه 15 سال",
            "cst": [
                    [1087555, 1449000]
                    ],
            "age": [0, 999],
            "det": "سابقه بالای 15 سال باید در مهر پزشک یا فاکتور ذکر شد باشد، در غیر اینصورت بیمه مجاز به پرداخت تعرفه پزشک عمومی عادی است."
        },
        {
            "key": 970015,
            "alt": 970000,
            "ttl": "متخصص",
            "cst": [
                    [1499400, 1890000]
                    ],
            "age": [0, 999],
            "det": "ویزیت متخصص زنان تنها شامل بانوان است و جهت ویزیت آقایان، تعرفه پزشک عمومی محاسبه می شود."
        },
        {
            "key": 970030,
            "alt": 970000,
            "ttl": "فوق تخصص",
            "cst": [
                    [1925400, 2410000]
                    ],
            "age": [0, 999],
            "det": "ویزیت فوق متخصص زنان تنها شامل بانوان است و جهت ویزیت آقایان، تعرفه پزشک عمومی محاسبه می شود."
        },
        {
            "key": 970066,
            "alt": 970015,
            "ttl": "متخصص کودکان",
            "cst": [
                    [1799280, 2268000]
                    ],
            "age": [0, 6],
            "det": "شامل کودکان زیر 7 سال."
        },
        {
            "key": 970076,
            "alt": 970030,
            "ttl": "فوق تخصص کودکان",
            "cst": [
                    [2322480, 2892000]
                    ],
            "age": [0, 6],
            "det": "شامل کودکان زیر 7 سال."
        }
    ]
`;

const data = JSON.parse(dataStr);

function evaluate(key) {

    for (var i = 0; i < data.length; i++) {
        const e = data[i];
        if (e["key"] == key) {

            if (age >= e["age"][0] && age <= e["age"][1]) {
                // in case of undefined
                if (hasFrstIns == true) {
                    console.log(Math.min(e["cst"][year][0], cost))
                    return Math.min(e["cst"][year][0], cost);
                } else if (hasFrstIns == false) {
                    console.log(Math.min(e["cst"][year][1], cost) - (Math.min(e["cst"][year][1], cost) * franchise))
                    return Math.min(e["cst"][year][1], cost) - (Math.min(e["cst"][year][1], cost) * franchise);
                // undefined
                } else {
                    // has first insurance 
                    if (Math.abs(e["cst"][year][0] - cost) < Math.abs(e["cst"][year][1] - cost)) {
                        return Math.min(e["cst"][year][0], cost);
                    // doesnt have first insurance 
                    } else {

                        return Math.min(e["cst"][year][1], cost) - (Math.min(e["cst"][year][1], cost) * franchise);
                    }
                }
            } else {
                err("سن بیمار مشمول تخصص نیست. هزینه تخصص یک پله پایینتر ارزیابی شد.");
                setTimeout(()=>{
                    err("");
                }, 1000);
                return evaluate(e["alt"]);

            }
        }

    };
    
}

function err(input) {
    document.getElementById("err").innerText = input;
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