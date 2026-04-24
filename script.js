// Select important DOM elements
const chatDisplay = document.getElementById('chat-display');
const userInput = document.getElementById('user-input');

// Define our AI's knowledge base and rules
const knowledgeBase = {
    election: {
        // Keywords to trigger this response
        keywords: ['election', 'work', 'what is', 'process'],
        content: `
            <p>Elections in India are managed by the Election Commission of India (ECI).</p>
            <h3>Step 1: Announcement</h3>
            <p>The ECI announces the dates for the election and the Model Code of Conduct starts.</p>
            <h3>Step 2: Nominations</h3>
            <p>Candidates file their nomination papers to contest in the election.</p>
            <h3>Step 3: Campaigning</h3>
            <p>Political parties and candidates campaign to win the support of voters.</p>
            <h3>Step 4: Voting Day & Results</h3>
            <p>Voters cast their votes. After counting, results are declared.</p>
            <p class="follow-up">Do you want to know about the voting process?</p>
        `
    },
    vote: {
        keywords: ['vote', 'voting', 'how to vote', 'evm'],
        content: `
            <p>Voting is a simple and important process. Here is how you do it:</p>
            <h3>Step 1: Check your name</h3>
            <p>Verify that your name is on the official voter list.</p>
            <h3>Step 2: Go to the polling booth</h3>
            <p>Visit your designated polling booth on election day with your Voter ID.</p>
            <h3>Step 3: Verification</h3>
            <p>The polling officer will check your ID and mark your finger with indelible ink.</p>
            <h3>Step 4: Cast your vote</h3>
            <p>Go to the Electronic Voting Machine (EVM), press the button next to your chosen candidate, and wait for the beep sound.</p>
            <p class="follow-up">Do you want to check the eligibility criteria?</p>
        `
    },
    eligibility: {
        keywords: ['eligibility', 'eligible', 'who can', 'age', 'register', 'voter id'],
        content: `
            <p>To be eligible to vote in India, you must meet the following criteria:</p>
            <h3>Step 1: Citizenship</h3>
            <p>You must be a citizen of India.</p>
            <h3>Step 2: Age</h3>
            <p>You must be 18 years of age or older.</p>
            <h3>Step 3: Registration</h3>
            <p>You must be enrolled in the electoral roll (voter list) of your area.</p>
            <h3>Step 4: ID Proof</h3>
            <p>You should have a Voter ID card (EPIC) or another valid government ID for verification at the booth.</p>
            <p class="follow-up">Do you want to know the timeline of an election?</p>
        `
    },
    timeline: {
        keywords: ['timeline', 'stages', 'dates', 'schedule', 'when'],
        content: `
            <p>An election follows a strict timeline set by the Election Commission:</p>
            <h3>Step 1: Press Note</h3>
            <p>The schedule is announced via a press note.</p>
            <h3>Step 2: Notification</h3>
            <p>The formal notification is issued, officially starting the process.</p>
            <h3>Step 3: Nominations & Scrutiny</h3>
            <p>Candidates submit their names, which are then checked for validity.</p>
            <h3>Step 4: Polling Day</h3>
            <p>The day when citizens go to the booths to cast their votes.</p>
            <h3>Step 5: Counting</h3>
            <p>Votes are counted, and the winner is officially declared.</p>
            <p class="follow-up">Do you have any other questions?</p>
        `
    },
    fallback: {
        // Fallback response when no keywords match
        content: `
            <p>I am not sure I understand. I can help you with:</p>
            <ul>
                <li>How Elections Work</li>
                <li>Voting Process</li>
                <li>Eligibility criteria</li>
                <li>Election Timeline</li>
            </ul>
            <p class="follow-up">Please ask me about one of these topics!</p>
        `
    }
};

// Listen for the "Enter" key in the input box
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Function triggered when quick action buttons are clicked
function sendQuickMessage(text) {
    userInput.value = text;
    sendMessage();
}

// Core function to handle sending messages
function sendMessage() {
    const text = userInput.value.trim();
    if (text === '') return; // Don't send empty messages

    // 1. Add the user's message to the chat
    addMessage(text, 'user-message');
    
    // Clear the input box
    userInput.value = '';

    // 2. Add a slight delay before the bot replies to make it feel natural
    setTimeout(() => {
        const responseHTML = getBotResponse(text.toLowerCase());
        addMessage(responseHTML, 'bot-message', true);
    }, 600); // 600ms delay
}

// Function to find the right bot response based on keywords
function getBotResponse(text) {
    // Loop through each category in our knowledge base
    for (const key in knowledgeBase) {
        if (key === 'fallback') continue;
        
        const keywords = knowledgeBase[key].keywords;
        // Check if the user's text contains any of the keywords
        for (const keyword of keywords) {
            if (text.includes(keyword)) {
                return knowledgeBase[key].content; // Return the matched content
            }
        }
    }
    
    // If no keywords matched, return the fallback content
    return knowledgeBase.fallback.content;
}

// Helper function to append a message to the chat UI
function addMessage(content, className, isHTML = false) {
    // Create a new div element
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${className}`;
    
    // Set content either as HTML or plain text
    if (isHTML) {
        messageDiv.innerHTML = content;
    } else {
        messageDiv.textContent = content;
    }
    
    // Add the message to the display area
    chatDisplay.appendChild(messageDiv);
    
    // Auto-scroll to the bottom so the latest message is visible
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
}
