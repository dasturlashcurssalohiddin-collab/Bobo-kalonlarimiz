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

app.post("/send", async (req, res) => {
    const { name, city, phone, email } = req.body;

    if(!name || !city || !phone){
        return res.json({ success:false });
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
        await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,{
            chat_id: CHAT_ID,
            text: text
        });

        // Ma’lumotni JSON faylga saqlash
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
        res.json({ success:false });
    }
});

// ===== PORT sozlash =====
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Server ishlayapti: http://localhost:${PORT}`);
});
