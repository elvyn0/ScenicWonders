const OpenAI = require("openai");
const Hotel = require("../models/hotelModel");

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

const aiChat = async (req, res) => {
  try {
    const { message } = req.body;

    const hotels = await Hotel.find().limit(5).select("name location price");

    const completion = await client.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: `
You are an AI assistant for a Scenic wonders.
This app  focused mainly on travelers, user's can post picture ,write blogs or stories  to share their expirence and also can book hotels.
This is basically a social media for travellers.

RULES:
HOTEL DATA (use ONLY this):
${JSON.stringify(hotels)}

- Only suggest hotels based on the data provided by the app.
- Do NOT invent or mention real-world hotels unless explicitly asked.
- If no data is available, say "No hotels found in our listings."
- Keep answers short, clear, and user-friendly.
- Help users with booking, pricing, and travel suggestions.

STYLE:
- Be conversational but concise.
- Do not use long paragraphs.
- Format lists cleanly when suggesting hotels.

FORMAT:
1. Name - Location - Price

      `,
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    res.status(200).json({
      success: true,
      reply: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error("Ai chatBot error:", error);
    res.status(500).json({ success: false, error: "AI error" });
  }
};

module.exports = { aiChat };
