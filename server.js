// server.js

// 1. Import the packages we installed
const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const cors = require('cors');

// 2. Load the environment variables (like our API key) from the .env file
dotenv.config();

// 3. Set up the Express app
const app = express();
const PORT = 3000; // The port our server will run on
// --- ADD THIS LINE ---
// This tells Express to serve any file in the 'public' folder
app.use(express.static('public'));

// 4. Use middleware
app.use(cors()); // Allows our HTML page to talk to this server
app.use(express.json()); // Allows the server to understand JSON data

// 5. Define the API endpoint that our front-end will call
app.post('/humanize', async (req, res) => {
    try {
        // Get the text, tone, and style sent from the front-end
        const { text, tone, style } = req.body;
        const apiKey = process.env.API_KEY;

        // --- THIS IS WHERE YOU MAKE THE EXTERNAL API CALL ---
        // You will need to replace the URL and the data structure
        // with the one required by your specific AI service (e.g., OpenAI, Gemini).

        const response = await axios.post('https://api.external-ai-service.com/v1/humanize', {
            // Example data structure - CHANGE THIS to match your API's documentation
            prompt: `Humanize the following text in a ${tone} and ${style} style: ${text}`,
            max_tokens: 150
        }, {
            headers: {
                'Authorization': `Bearer ${apiKey}`, // Standard way to send a key
                'Content-Type': 'application/json'
            }
        });

        // Send the humanized text back to the front-end
        // The path to the text might be different, e.g., response.data.choices[0].text
        res.json({ humanizedText: response.data.humanized_text });

    } catch (error) {
        console.error('Error calling AI API:', error);
        res.status(500).json({ message: 'Failed to humanize text.' });
    }
});

// 6. Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});



