/* BOBOLAR RO'YXATI */

const bobolar=[

"Alisher Navoiy",
"Amir Temur",
"Mirzo Ulug‘bek",
"Zahiriddin Bobur",
"Ibn Sino",
"Muhammad al-Xorazmiy",
"Al-Beruniy",
"Ahmad al-Farg‘oniy",
"Imom al-Buxoriy",
"Imom at-Termiziy",
"Ahmad Yassaviy",
"Bahouddin Naqshband",
"Najmiddin Kubro",
"Mahmud Qoshg‘ariy",
"Mahmud Zamaxshariy",
"Abu Mansur Moturidiy",
"Al-Farobiy",
"Abdurauf Fitrat",
"Abdulla Qodiriy",
"Cho‘lpon",
"Hamza Hakimzoda Niyoziy",
"Munavvar Qori",
"Mahmudxo‘ja Behbudiy",
"To'maris",
"Jaloliddin Manguberdi",
"Nodira Begim",
"Uvaysiy",
"Muhammad Yusuf",
"Qutayba ibn Muslim"

];


/* RASMLAR */

const images={

"Alisher Navoiy":"download (1).jpeg",
"Amir Temur":"download (2).jpeg",
"Mirzo Ulug‘bek":"download (3).jpeg",
"Zahiriddin Bobur":"download (4).jpeg",
"Ibn Sino":"download (5).jpeg",
"Muhammad al-Xorazmiy":"download (6).jpeg",
"Al-Beruniy":"download (7).jpeg",
"Ahmad al-Farg‘oniy":"download (8).jpeg",
"Imom al-Buxoriy":"download (9).jpeg",
"Imom at-Termiziy":"download (10).jpeg",
"Ahmad Yassaviy":"download (11).jpeg",
"Bahouddin Naqshband":"download (12).jpeg",
"Najmiddin Kubro":"download (13).jpeg",
"Mahmud Qoshg‘ariy":"download (14).jpeg",
"Mahmud Zamaxshariy":"download (15).jpeg",
"Abu Mansur Moturidiy":"download (16).jpeg",
"Al-Farobiy":"download (17).jpeg",
"Abdurauf Fitrat":"download (18).jpeg",
"Abdulla Qodiriy":"download (19).jpeg",
"Cho‘lpon":"download (20).jpeg",
"Hamza Hakimzoda Niyoziy":"download (21).jpeg",
"Munavvar Qori":"download (22).jpeg",
"Mahmudxo‘ja Behbudiy":"download (23).jpeg",
"To'maris":"download (24).jpeg",
"Jaloliddin Manguberdi":"download (25).jpeg",
"Nodira Begim":"download (26).jpeg",
"Uvaysiy":"download (27).jpeg",
"Muhammad Yusuf":"download (29).jpeg",
"Qutayba ibn Muslim":"download (30).jpeg"

};


/* KONTAINER */

const container=document.getElementById("container");
const search=document.getElementById("search");


/* KARTOCHKALAR CHIQARISH */

function showCards(list){

container.innerHTML="";

list.forEach(name=>{

const card=document.createElement("div");
card.className="card";

card.innerHTML=`
<img src="${images[name]}">
<div class="name">${name}</div>
`;

card.onclick=()=>{
window.open("https://uz.wikipedia.org/wiki/"+name.replaceAll(" ","_"));
};

container.appendChild(card);

});

}

showCards(bobolar);


/* QIDIRUV */

search.addEventListener("keyup",()=>{

let value=search.value.toLowerCase();

let filtered=bobolar.filter(person=>
person.toLowerCase().includes(value)
);

showCards(filtered);

});


/* MENU */

const menuBtn=document.getElementById("menuBtn");
const menuPanel=document.getElementById("menuPanel");

menuBtn.onclick=()=>{
menuPanel.style.display=
menuPanel.style.display==="block"?"none":"block";
};


/* FILTER */

function toggleFilter(){

const menu=document.getElementById("filterMenu");

menu.style.display=
menu.style.display==="block"?"none":"block";

}

function filterPeople(type){

if(type==="all"){
showCards(bobolar);
return;
}

const categories={

"Alisher Navoiy":"yozuvchi",
"Amir Temur":"sarkarda",
"Mirzo Ulug‘bek":"olim",
"Zahiriddin Bobur":"yozuvchi",
"Ibn Sino":"olim",
"Muhammad al-Xorazmiy":"olim",
"Al-Beruniy":"olim",
"Ahmad al-Farg‘oniy":"olim",
"Imom al-Buxoriy":"din",
"Imom at-Termiziy":"din",
"Ahmad Yassaviy":"din",
"Bahouddin Naqshband":"din",
"Najmiddin Kubro":"din",
"Mahmud Qoshg‘ariy":"olim",
"Mahmud Zamaxshariy":"olim",
"Abu Mansur Moturidiy":"din",
"Al-Farobiy":"olim",
"Abdurauf Fitrat":"yozuvchi",
"Abdulla Qodiriy":"yozuvchi",
"Cho‘lpon":"yozuvchi",
"Hamza Hakimzoda Niyoziy":"yozuvchi",
"Munavvar Qori":"yozuvchi",
"Mahmudxo‘ja Behbudiy":"yozuvchi",
"To'maris":"sarkarda",
"Jaloliddin Manguberdi":"sarkarda",
"Nodira Begim":"yozuvchi",
"Uvaysiy":"yozuvchi",
"Muhammad Yusuf":"yozuvchi",
"Qutayba ibn Muslim":"sarkarda"

};

let filtered=bobolar.filter(name=>
categories[name]===type
);

showCards(filtered);

}


/* TRANSLATE */

function toggleTranslate(){

const menu=document.getElementById("translateMenu");

menu.style.display=
menu.style.display==="block"?"none":"block";

}

const translations={

uz:{
search:"Bobo kalon nomini yozing..."
},

en:{
search:"Type ancestor name..."
},

ru:{
search:"Введите имя..."
},

ar:{
search:"اكتب اسم السلف"
}

};

function changeLang(lang){

document.getElementById("search").placeholder=
translations[lang].search;

}


/* VOICE SEARCH */

const voiceBtn=document.getElementById("voiceBtn");

if('webkitSpeechRecognition' in window){

const recognition=new webkitSpeechRecognition();

recognition.lang="uz-UZ";

voiceBtn.onclick=()=>{
recognition.start();
};

recognition.onresult=(event)=>{

let text=event.results[0][0].transcript;

search.value=text;

search.dispatchEvent(new Event("keyup"));

};

}else{

voiceBtn.style.display="none";

}


/* HELP WINDOW */

const helpBtn=document.getElementById("helpBtn");
const helpWindow=document.getElementById("helpWindow");

helpBtn.onclick=()=>{
helpWindow.style.display="flex";
}

function closeHelp(){
helpWindow.style.display="none";
}

/* TRANSLATE MENU */

function toggleTranslate(){

const menu=document.getElementById("translateMenu");

menu.style.display=
menu.style.display==="block"?"none":"block";

}

/* FILTER MENU */

function toggleFilter(){

const menu=document.getElementById("filterMenu");

menu.style.display=
menu.style.display==="block"?"none":"block";

}

/* FILTER PEOPLE */

const categories={

"Alisher Navoiy":"yozuvchi",
"Amir Temur":"sarkarda",
"Mirzo Ulug‘bek":"olim",
"Zahiriddin Bobur":"yozuvchi",
"Ibn Sino":"olim",
"Muhammad al-Xorazmiy":"olim",
"Al-Beruniy":"olim",
"Ahmad al-Farg‘oniy":"olim",
"Imom al-Buxoriy":"din",
"Imom at-Termiziy":"din",
"Ahmad Yassaviy":"din",
"Bahouddin Naqshband":"din",
"Najmiddin Kubro":"din",
"Mahmud Qoshg‘ariy":"olim",
"Mahmud Zamaxshariy":"olim",
"Abu Mansur Moturidiy":"din",
"Al-Farobiy":"olim",
"Abdurauf Fitrat":"yozuvchi",
"Abdulla Qodiriy":"yozuvchi",
"Cho‘lpon":"yozuvchi",
"Hamza Hakimzoda Niyoziy":"yozuvchi",
"Munavvar Qori":"yozuvchi",
"Mahmudxo‘ja Behbudiy":"yozuvchi",
"To'maris":"sarkarda",
"Jaloliddin Manguberdi":"sarkarda",
"Nodira Begim":"yozuvchi",
"Uvaysiy":"yozuvchi",
"Muhammad Yusuf":"yozuvchi",
"Qutayba ibn Muslim":"sarkarda"

};

card.innerHTML = `
<img src="${img}">
<div class="name">${name}</div>
<button class="viewBtn">Ko'rish</button>
`;

function toggleTranslate(){

let menu=document.getElementById("translateMenu")

menu.style.display=
menu.style.display==="block"?"none":"block"

}

function toggleFilter(){

let menu=document.getElementById("filterMenu")

menu.style.display=
menu.style.display==="block"?"none":"block"

}