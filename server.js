// server.js
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());

// Telegram token va chat idni Environment Variable orqali oling
const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

// JSON faylga saqlash uchun yo‘l
const DATA_FILE = path.join(__dirname, "arizalar.json");

// POST /send endpoint
app.post("/send", async (req, res) => {
    const { name, city, phone, email } = req.body;

    if(!name || !city || !phone){
        return res.json({ success:false, error:"Ma’lumot yetarli emas" });
    }

    const text = `
📥 Yangi Ariza
👤 ${name}
🏠 ${city}
📱 ${phone}
📧 ${email}
`;

    try{
        // Telegramga yuborish
        await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            chat_id: CHAT_ID,
            text: text
        });

        // JSON faylga saqlash
        let arizalar = [];
        if(fs.existsSync(DATA_FILE)){
            const raw = fs.readFileSync(DATA_FILE);
            arizalar = JSON.parse(raw);
        }
        arizalar.push({ name, city, phone, email, date: new Date() });
        fs.writeFileSync(DATA_FILE, JSON.stringify(arizalar, null, 2));

        res.json({ success:true });

    } catch(err){
        console.error(err);
        res.json({ success:false, error:err.message });
    }
});

// PORT sozlash (Render.com bilan mos)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server ishlayapti: http://localhost:${PORT}`);
});
