const express = require('express');
const axios = require('axios');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Telegram config
const BOT_TOKEN = process.env.BOT_TOKEN || "8656295440:AAEUBRVs4umfJkh-YPm3XMJh52R3e9l56bw";
const CHAT_ID = process.env.CHAT_ID || "6283517295";
const DATA_FILE = 'data/forms.json';

// data papkasini yaratish (agar yo'q bo'lsa)
if (!fs.existsSync('data')) {
    fs.mkdirSync('data');
}

// Ma'lumotlarni JSON faylga saqlash
function saveToFile(data) {
    try {
        let existingData = [];
        if (fs.existsSync(DATA_FILE)) {
            const content = fs.readFileSync(DATA_FILE, 'utf8');
            if (content) existingData = JSON.parse(content);
        }
        
        existingData.push({
            ...data,
            timestamp: new Date().toISOString()
        });
        
        fs.writeFileSync(DATA_FILE, JSON.stringify(existingData, null, 2));
        console.log('✅ Ma\'lumot faylga saqlandi');
    } catch (err) {
        console.error('Faylga saqlashda xatolik:', err);
    }
}

// API endpoint
app.post('/api/send-form', async (req, res) => {
    try {
        const { name, email, phone, extra } = req.body;

        // Validation
        if (!name || !email || !phone) {
            return res.status(400).json({ 
                success: false, 
                error: "Barcha maydonlar to'ldirilishi kerak!" 
            });
        }

        console.log('📨 Ariza qabul qilindi:', { name, email, phone });

        // 1. JSON faylga saqlash
        saveToFile({ name, email, phone, extra });

        // 2. Telegram botga yuborish
        const message = `📥 <b>Yangi Ariza</b>
👤 <b>F.I.SH:</b> ${name}
📧 <b>Email:</b> ${email}
📱 <b>Telefon:</b> ${phone}
📝 <b>Qo'shimcha:</b> ${extra || "yo'q"}
⏰ <b>Vaqt:</b> ${new Date().toLocaleString('uz-UZ')}`;

        await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            chat_id: CHAT_ID,
            text: message,
            parse_mode: 'HTML'
        });

        console.log('✅ Telegram botga yuborildi');

        // 3. Frontend ga muvaffaqiyatli javob yuborish
        return res.json({ 
            success: true, 
            message: "Ariza muvaffaqiyatli yuborildi!" 
        });

    } catch (error) {
        console.error('❌ Xatolik:', error.message);
        return res.status(500).json({ 
            success: false, 
            error: "Server xatoligi: " + error.message 
        });
    }
});

// Saqlangan ma'lumotlarni ko'rish (ixtiyoriy)
app.get('/api/forms', (req, res) => {
    try {
        if (fs.existsSync(DATA_FILE)) {
            const data = fs.readFileSync(DATA_FILE, 'utf8');
            return res.json(JSON.parse(data || '[]'));
        }
        return res.json([]);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server ${PORT} portda ishlamoqda`);
    console.log(`📍 http://localhost:${PORT}`);
});
