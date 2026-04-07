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

    // Telegramga yuborish
try {
    const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

    const response = await axios.post(telegramUrl, {
        chat_id: CHAT_ID, // Bu sizning Telegram chat ID
        text: text        // Bu yuboriladigan xabar matni
    });

    if (response.data.ok) {
        console.log("Xabar Telegramga muvaffaqiyatli yuborildi!");
    } else {
        console.log("Telegram xabari yuborilmadi:", response.data);
    }

} catch (error) {
    console.error("Telegramga yuborishda xatolik:", error.message);
    throw error; // server.js da catch orqali JSON xabar yuboradi
}

        // JSON faylga saqlash
        let arizalar = [];
        if(fs.existsSync(DATA_FILE)){
            const raw = fs.readFileSync(DATA_FILE);
            arizalar = JSON.parse(raw);
        }
        arizalar.push({ name, city, phone, email, date: new Date() });
        fs.writeFileSync(DATA_FILE, JSON.stringify(arizalar, null, 2));

        res.json({ success:true });

    }catch(err){
        console.error(err);
        res.json({ success:false, error:err.message });
    }
});

// PORT sozlash (Render.com bilan mos)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server ishlayapti: http://localhost:${PORT}`);
});
