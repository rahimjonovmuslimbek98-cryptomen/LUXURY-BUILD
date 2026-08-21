require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const BOT_TOKEN = process.env.BOT_TOKEN;

// Telegram'ga xabar yuborish
async function sendTelegramMessage(message) {
    if (!BOT_TOKEN) {
        throw new Error("BOT_TOKEN topilmadi");
    }

    // Hozircha chat ID ni keyingi qadamda olamiz
    const chatId = process.env.CHAT_ID;

    if (!chatId) {
        throw new Error("CHAT_ID topilmadi");
    }

    const response = await fetch(
        `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: message
            })
        }
    );

    const data = await response.json();

    if (!data.ok) {
        throw new Error(data.description || "Telegram xatosi");
    }

    return data;
}


// Test route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "LUXURYBUILD backend ishlayapti 🚀"
    });
});


// Contact form
app.post("/api/contact", async (req, res) => {

    try {

        const {
            name,
            phone,
            service,
            message
        } = req.body;

        if (!name || !phone || !service || !message) {
            return res.status(400).json({
                success: false,
                message: "Barcha maydonlarni to‘ldiring."
            });
        }


        const telegramMessage = `
🏗️ LUXURYBUILD — YANGI SO‘ROV

👤 Ism: ${name}
📞 Telefon: ${phone}
🛠 Xizmat: ${service}

💬 Xabar:
${message}
        `.trim();


        await sendTelegramMessage(telegramMessage);


        res.json({
            success: true,
            message: "So‘rovingiz muvaffaqiyatli yuborildi."
        });


    } catch (error) {

        console.error("ERROR:", error.message);

        res.status(500).json({
            success: false,
            message: "Xabar yuborishda xatolik yuz berdi."
        });

    }

});
app.listen(PORT, "0.0.0.0", () => {

    console.log(`
====================================
LUXURYBUILD BACKEND
Server running on port ${PORT}
====================================
    `);

});
