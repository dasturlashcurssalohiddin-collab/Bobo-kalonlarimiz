const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const BOT_TOKEN = "8656295440:AAEUBRVs4umfJkh-YPm3XMJh52R3e9l56bw";
const CHAT_ID = "6283517295";

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
        await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,{
            chat_id: CHAT_ID,
            text: text
        });

        res.json({ success:true });

    }catch(err){
        res.json({ success:false });
    }
});

app.listen(3000, ()=>{
    console.log("Server ishlayapti: http://localhost:3000");
});