const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

const aiChat = async (req, res) => {
  try {
    const { message } = req.body;

    const completion = await client.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: "You are a helpful travel assistant for a hotel booking website.",
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
    console.log(error);
    res.status(500).json({ success: false, error: "AI error" });
  }
};

module.exports = { aiChat };

{
  /**  */
}
