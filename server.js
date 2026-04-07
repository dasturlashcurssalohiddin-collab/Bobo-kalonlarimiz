const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // static fayllar uchun

// Telegram config
const BOT_TOKEN = process.env.BOT_TOKEN || "8656295440:AAEUBRVs4umfJkh-YPm3XMJh52R3e9l56bw";
const CHAT_ID = process.env.CHAT_ID || "6283517295";

// API endpoint - formani qabul qilish
app.post('/api/send-form', async (req, res) => {
    try {
        const { name, email, phone, extra } = req.body;

        // Validation
        if(!name || !email || !phone){
            return res.status(400).json({ error: "Barcha maydonlar to'ldirilishi kerak!" });
        }

        // Telegram xabar
        const message = `📥 <b>Yangi Ariza</b>
👤 <b>F.I.SH:</b> ${name}
📧 <b>Email:</b> ${email}
📱 <b>Telefon:</b> ${phone}
📝 <b>Qo'shimcha:</b> ${extra || "yo'q"}`;

        // Telegram API ga yuborish
        await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            chat_id: CHAT_ID,
            text: message,
            parse_mode: 'HTML'
        });

        return res.json({ success: true, message: "Ariza muvaffaqiyatli yuborildi!" });

    } catch (error) {
        console.error('Xatolik:', error.message);
        return res.status(500).json({ error: "Server xatoligi yuz berdi" });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server ${PORT} portda ishlamoqda`);
});
