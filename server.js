// server.js
const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors());
app.use(express.json());

const BOT_TOKEN = "8656295440:AAEUBRVs4umfJkh-YPm3XMJh52R3e9l56bw";
const CHAT_ID = "6283517295";

app.post("/submit", async (req, res) => {
    const { name, email, phone, extra } = req.body;

    const text = `📥 Yangi Ariza:\n👤 F.I.SH: ${name}\n📧 Email: ${email}\n📱 Telefon: ${phone || 'N/A'}\n📝 Qo‘shimcha: ${extra || 'N/A'}`;

    try {
        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ chat_id: CHAT_ID, text })
        });
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.json({ success: false });
    }
});

app.listen(3000, () => console.log("Server 3000-portda ishga tushdi"));
