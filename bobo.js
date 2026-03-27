/* =========================
GLOBAL ELEMENTLAR
========================= */

const container = document.getElementById("container");
const search = document.getElementById("search");
const voiceBtn = document.getElementById("voiceBtn");
const menuBtn = document.getElementById("menuBtn");
const menuPanel = document.getElementById("menuPanel");

/* =========================
MENU
========================= */

menuBtn.onclick = () => {

if(menuPanel.style.display === "block"){
menuPanel.style.display = "none";
}else{
menuPanel.style.display = "block";
}

};

/* =========================
BOBOKALON RO‘YXATI
========================= */

const bobolar = [

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
"Abdulla Qodiriy",
"Cho‘lpon",
"To'maris",
"Jaloliddin Manguberdi",
"Nodira Begim",
"Uvaysiy"

];

/* =========================
RASMLAR
========================= */

const images = {

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
"Abdulla Qodiriy":"download (18).jpeg",
"Cho‘lpon":"download (19).jpeg",
"To'maris":"download (20).jpeg",
"Jaloliddin Manguberdi":"download (21).jpeg",
"Nodira Begim":"download (22).jpeg",
"Uvaysiy":"download (23).jpeg"

};

/* =========================
CARD CHIQARISH
========================= */

function showCards(list){

container.innerHTML = "";

list.forEach(name=>{

const card = document.createElement("div");

card.className = "card";

card.innerHTML = `

<img src="${images[name]}">

<div class="name">${name}</div>

<button class="favBtn">⭐</button>

`;

card.onclick = () => {

window.location.href =
name.replaceAll(" ","_") + ".html";

};

card.querySelector(".favBtn").onclick = (e) => {

e.stopPropagation();
toggleFavorite(name);

};

container.appendChild(card);

});

}

showCards(bobolar);

/* =========================
SEARCH
========================= */

search.onkeyup = () => {

let value = search.value.toLowerCase();

let filtered = bobolar.filter(p =>
p.toLowerCase().includes(value)
);

showCards(filtered);

};

/* =========================
VOICE SEARCH
========================= */

if('webkitSpeechRecognition' in window){

const recognition = new webkitSpeechRecognition();

recognition.lang = "uz-UZ";

voiceBtn.onclick = () => {

recognition.start();

};

recognition.onresult = (e) => {

let text = e.results[0][0].transcript;

search.value = text;

let filtered = bobolar.filter(p =>
p.toLowerCase().includes(text.toLowerCase())
);

showCards(filtered);

};

}

/* =========================
RANDOM BOBOKALON
========================= */

function randomBobo(){

let random =
bobolar[Math.floor(Math.random()*bobolar.length)];

alert("Tasodifiy bobokalon: " + random);

window.open(
"https://uz.wikipedia.org/wiki/" +
random.replaceAll(" ","_")
);

}

/* =========================
FAVORITES
========================= */

let favorites = JSON.parse(
localStorage.getItem("favorites")
) || [];

function toggleFavorite(name){

if(favorites.includes(name)){

favorites = favorites.filter(f => f !== name);

}else{

favorites.push(name);

}

localStorage.setItem(
"favorites",
JSON.stringify(favorites)
);

}

/* =========================
STATISTICS
========================= */

function showStats(){

alert(

"Jami bobokalon: " + bobolar.length +
"\nFavorites: " + favorites.length

);

}

/* =========================
KEYBOARD SHORTCUT
========================= */

document.addEventListener("keydown", e=>{

if(e.key==="r"){
randomBobo();
}

if(e.key==="s"){
showStats();
}

});

/* =========================
WELCOME
========================= */

setTimeout(()=>{

console.log("Bobo Kalonlarimiz sayt yuklandi");

},1000);

// server.js
const express = require('express');
const session = require('express-session');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client('SIZNING_GOOGLE_CLIENT_ID');

const app = express();
app.use(express.json());
app.use(session({secret: 'supersecret', resave: false, saveUninitialized: true}));

// Foydalanuvchi tokenni yuboradi
app.post('/login', async (req, res) => {
    const {token} = req.body;
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: 'SIZNING_GOOGLE_CLIENT_ID'
    });
    const payload = ticket.getPayload();
    req.session.user = payload.email; // sessiyada saqlaymiz
    res.json({status: 'ok', email: payload.email});
});

// Agar sessiya mavjud bo‘lsa, foydalanuvchi avtomatik kiradi
app.get('/dashboard', (req, res) => {
    if(req.session.user){
        res.send(`Xush kelibsiz, ${req.session.user}`);
    } else {
        res.redirect('/');
    }
});

app.listen(3000, () => console.log('Server 3000 portda ishlayapti'));