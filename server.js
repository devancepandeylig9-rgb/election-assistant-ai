require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const { generateAiResponse } = require('./controllers/aiController');

const app = express();
const PORT = process.env.PORT || 8080;

// Security Middlewares
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            styleSrc: ["'self'", "https://fonts.googleapis.com", "'unsafe-inline'"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            connectSrc: ["'self'"]
        }
    }
}));
app.use(cors());
app.use(express.json());

// Serve static files from the root directory
app.use(express.static(path.join(__dirname, '.')));

// API Endpoint for AI Chat
app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }
        const response = await generateAiResponse(message);
        res.json({ response });
    } catch (error) {
        console.error('Error generating AI response:', error);
        res.status(500).json({ error: 'Failed to process request. Please try again later.' });
    }
});

// Explicitly serve index.html for root requests
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Only start the server if not in test mode
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

module.exports = app;
