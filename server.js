// server.js
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const fetch = require("node-fetch");

const app = express();
const PORT = 3000;

// Telegram ma'lumotlari
const BOT_TOKEN = "TOKENINGIZNI_BU_YERGA";
const CHAT_ID = "CHAT_ID_BU_YERGA";

app.use(bodyParser.json());
app.use(express.static("public")); // index.html shu yerda bo'ladi

// Route formni qabul qilish uchun
app.post("/api/send-form", async (req, res) => {
    const data = req.body;

    // Telegramga yuborish
    const text = `📥 Yangi Ariza:\n👤 F.I.SH: ${data.name}\n📧 Email: ${data.email}\n📱 Telefon: ${data.phone}\n📝 Qo'shimcha: ${data.extra}`;

    try {
        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ chat_id: CHAT_ID, text })
        });

        // JSON faylga saqlash
        const filePath = "./submissions.json";
        let submissions = [];
        if (fs.existsSync(filePath)) {
            const oldData = fs.readFileSync(filePath);
            submissions = JSON.parse(oldData);
        }
        submissions.push(data);
        fs.writeFileSync(filePath, JSON.stringify(submissions, null, 2));

        // Frontendga javob
        res.json({ success: true });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
});

app.listen(PORT, () => console.log(`Server ${PORT} portda ishlayapti...`));
