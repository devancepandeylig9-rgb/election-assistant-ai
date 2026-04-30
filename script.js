// Select important DOM elements
const chatDisplay = document.getElementById('chat-display');
const userInput = document.getElementById('user-input');
const loadingIndicator = document.getElementById('loading-indicator');

// Handle form submission to support both button click and Enter key
function handleFormSubmit(event) {
    event.preventDefault();
    sendMessage();
}

// Function triggered when quick action buttons are clicked
function sendQuickMessage(text) {
    userInput.value = text;
    sendMessage();
}

// Core function to handle sending messages
async function sendMessage() {
    const text = userInput.value.trim();
    if (text === '') return; // Don't send empty messages

    // 1. Add the user's message to the chat
    addMessage(text, 'user-message');
    
    // Clear the input box
    userInput.value = '';

    // Show loading indicator
    showLoading(true);

    try {
        // Fetch AI response from the backend server
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: text })
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        const data = await response.json();
        
        // Hide loading indicator before showing the message
        showLoading(false);
        
        // Add the bot's response to the chat
        addMessage(data.response || 'Sorry, I received an empty response.', 'bot-message', true);
    } catch (error) {
        console.error('Error fetching AI response:', error);
        showLoading(false);
        addMessage('<p>Sorry, I am having trouble connecting to the server. Please check your connection and try again.</p>', 'bot-message', true);
    }
}

// Helper to show/hide loading indicator
function showLoading(isLoading) {
    if (isLoading) {
        loadingIndicator.classList.add('active');
        // Ensure the loading indicator is below previous messages but above input
        chatDisplay.appendChild(loadingIndicator);
        chatDisplay.scrollTop = chatDisplay.scrollHeight;
    } else {
        loadingIndicator.classList.remove('active');
    }
}

// Helper function to append a message to the chat UI
function addMessage(content, className, isHTML = false) {
    // Create a new div element
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${className}`;
    messageDiv.setAttribute('tabindex', '0'); // Make it focusable for screen readers
    
    // Set content either as HTML or plain text
    if (isHTML) {
        messageDiv.innerHTML = content;
    } else {
        messageDiv.textContent = content;
    }
    
    // Add the message to the display area (before the loading indicator if it exists)
    if (loadingIndicator.parentNode === chatDisplay) {
        chatDisplay.insertBefore(messageDiv, loadingIndicator);
    } else {
        chatDisplay.appendChild(messageDiv);
    }
    
    // Auto-scroll to the bottom so the latest message is visible
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
}
