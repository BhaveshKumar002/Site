// netlify/functions/chat.js
const fetch = require("node-fetch");

exports.handler = async function(event, context) {
  try {
    const body = JSON.parse(event.body);
    const messages = body.messages;
    const model = body.model;

    const API_KEY = process.env.API_KEY;

    // Call your AI API here, example:
    const response = await fetch("https://api.openrouter.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model,
        messages
      })
    });

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: "API call failed" })
      };
    }

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
