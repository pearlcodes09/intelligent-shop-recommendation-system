const express = require("express");
const fs = require("fs");
const fetch = require("node-fetch");
const bodyParser = require("body-parser");

const app = express();
app.use(express.static("."));
app.use(bodyParser.json());


const GROQ_API_KEY = "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"; // Example: gsk_xxxxxxxxxxxxx

// Test Groq connection
app.get("/test", async (req, res) => {
  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "llama3-70b-8192", // 
        messages: [{ role: "user", content: "Hello, are you working?" }]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(" Groq API Error (test):", errorText);
      return res.status(500).send("Test failed: " + errorText);
    }

    const result = await response.json();
    res.json(result);
  } catch (err) {
    console.error(" Test Error:", err);
    res.status(500).send("Groq Test Fetch Error");
  }
});

//  Recommendation Route
app.post("/recommend", async (req, res) => {
  const userQuery = req.body.query;

  const shops = JSON.parse(fs.readFileSync("shops.json", "utf-8"));
  const products = JSON.parse(fs.readFileSync("products.json", "utf-8"));

  const prompt = `You are a helpful AI assistant. Based on the following shop and product data, respond to the user's query.

Shops: ${JSON.stringify(shops, null, 2)}

Products: ${JSON.stringify(products, null, 2)}

User: ${userQuery}

Respond with a clear recommendation including shops, products, and upsells.`;

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "llama3-70b-8192", // GROQ MODEL THAT WORKS NOW
        messages: [{ role: "user", content: prompt }]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(" Groq API Error (recommend):", errorText);
      return res.status(500).json({ response: "Groq API Error", error: errorText });
    }

    const result = await response.json();
    console.log(" Groq Recommendation Response:", result);

    const reply = result.choices?.[0]?.message?.content || "⚠️ No AI response.";
    res.json({ response: reply });
  } catch (err) {
    console.error(" Groq Fetch Error:", err);
    res.status(500).json({ response: "Groq Fetch Error", error: err.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});
