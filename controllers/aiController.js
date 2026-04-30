const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Gemini AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'MISSING_KEY');

// System prompt to strictly limit the model's domain and guide responses
const SYSTEM_PROMPT = `
You are the official Interactive Election Assistant AI for the Indian Election Process. 
Your primary goal is to guide citizens, explain laws, and provide accurate information about elections in India.

CRITICAL RULES:
1. ONLY answer questions related to the Indian election process, voting laws, eligibility, timelines, tampering (EVMs), and related democratic processes.
2. If the user asks about ANYTHING else (sports, coding, general knowledge, movies, etc.), politely refuse and state that you can only answer election-related queries.
3. If the user asks about tampering, fraud, or issues with voting, explain the laws, the VVPAT system, and strictly provide the official ECI helpline (1950) and website (https://eci.gov.in) for grievances.
4. Keep your answers concise, informative, and formatted with basic HTML tags (like <p>, <h3>, <ul>, <li>, <strong>) as your output will be directly rendered in a web chat interface. DO NOT use markdown.
5. Always maintain a helpful, neutral, and official tone.
`;

async function generateAiResponse(userMessage) {
    if (!process.env.GEMINI_API_KEY) {
        return "<p><strong>Error:</strong> The AI service is currently unavailable (Missing API Key). Please set up the GEMINI_API_KEY to enable AI features.</p>";
    }

    try {
        // Use gemini-1.5-flash which is the standard model
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Generate content by combining system prompt and user message
        const prompt = `${SYSTEM_PROMPT}\n\nUser Question: ${userMessage}\n\nResponse (in HTML format):`;
        
        const result = await model.generateContent(prompt);
        const response = result.response.text();
        
        return response;
    } catch (error) {
        console.error("Gemini API Error:", error);
        return "<p>I apologize, but I am having trouble connecting to the election database right now. Please try again later.</p>";
    }
}

module.exports = { generateAiResponse };
