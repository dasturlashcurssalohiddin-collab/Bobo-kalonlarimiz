// server.js
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());

// Environment variables (Render.com yoki lokal .env)
const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

// JSON faylga saqlash uchun yo‘l
const DATA_FILE = path.join(__dirname, "arizalar.json");

// POST /send endpoint
app.post("/send", async (req, res) => {
    const { name, city, phone, email } = req.body;

    if (!name || !city || !phone) {
        return res.json({ success: false, error: "Ma’lumot yetarli emas" });
    }

    const text = `
📥 Yangi Ariza
👤 ${name}
🏠 ${city}
📱 ${phone}
📧 ${email}
`;

    try {
        // Telegramga yuborish
        const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
        const telegramRes = await axios.post(telegramUrl, {
            chat_id: CHAT_ID,
            text: text
        });

        if (!telegramRes.data.ok) {
            return res.json({ success: false, error: "Telegramga yuborilmadi" });
        }

        // JSON faylga saqlash
        let arizalar = [];
        if (fs.existsSync(DATA_FILE)) {
            arizalar = JSON.parse(fs.readFileSync(DATA_FILE));
        }
        arizalar.push({ name, city, phone, email, date: new Date() });
        fs.writeFileSync(DATA_FILE, JSON.stringify(arizalar, null, 2));

        res.json({ success: true });

    } catch (err) {
        console.error("Xatolik:", err.message);
        res.json({ success: false, error: err.message });
    }
});

// PORT sozlash
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server ishlayapti port: ${PORT}`));
