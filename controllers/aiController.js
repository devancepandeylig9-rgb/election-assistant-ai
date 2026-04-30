const natural = require('natural');

// Initialize the NLP Classifier
const classifier = new natural.LogisticRegressionClassifier();

// ==========================================
// 1. Define the Knowledge Base (Responses)
// ==========================================
const responses = {
    greeting: `
        <p>Hello again! I am your Election Assistant AI.</p>
        <p>You can ask me about how elections work, eligibility, the voting process, or what to do if you suspect election fraud.</p>
    `,
    how_elections_work: `
        <p>Elections in India are managed by the <strong>Election Commission of India (ECI)</strong>.</p>
        <h3>Step 1: Announcement</h3>
        <p>The ECI announces the dates for the election and the Model Code of Conduct starts.</p>
        <h3>Step 2: Nominations</h3>
        <p>Candidates file their nomination papers to contest in the election.</p>
        <h3>Step 3: Campaigning</h3>
        <p>Political parties and candidates campaign to win the support of voters.</p>
        <h3>Step 4: Voting Day & Results</h3>
        <p>Voters cast their votes. After counting, results are declared.</p>
    `,
    voting_process: `
        <p>Voting is a simple and important process. Here is how you do it:</p>
        <h3>Step 1: Check your name</h3>
        <p>Verify that your name is on the official voter list.</p>
        <h3>Step 2: Go to the polling booth</h3>
        <p>Visit your designated polling booth on election day with your Voter ID.</p>
        <h3>Step 3: Verification</h3>
        <p>The polling officer will check your ID and mark your finger with indelible ink.</p>
        <h3>Step 4: Cast your vote</h3>
        <p>Go to the Electronic Voting Machine (EVM), press the button next to your chosen candidate, and wait for the beep sound. You can also verify your vote on the VVPAT machine.</p>
    `,
    eligibility: `
        <p>To be eligible to vote in India, you must meet the following criteria:</p>
        <ul>
            <li><strong>Citizenship:</strong> You must be a citizen of India.</li>
            <li><strong>Age:</strong> You must be 18 years of age or older.</li>
            <li><strong>Registration:</strong> You must be enrolled in the electoral roll (voter list) of your area.</li>
        </ul>
        <p>You should have a Voter ID card (EPIC) or another valid government ID for verification at the booth.</p>
    `,
    timeline: `
        <p>An election follows a strict timeline set by the Election Commission:</p>
        <ul>
            <li><strong>Press Note:</strong> The schedule is announced.</li>
            <li><strong>Notification:</strong> The formal notification is issued, officially starting the process.</li>
            <li><strong>Nominations & Scrutiny:</strong> Candidates submit their names, which are then checked for validity.</li>
            <li><strong>Polling Day:</strong> Citizens go to the booths to cast their votes.</li>
            <li><strong>Counting:</strong> Votes are counted, and the winner is officially declared.</li>
        </ul>
    `,
    tampering_fraud: `
        <p>The Election Commission takes vote tampering and fraud very seriously.</p>
        <h3>EVM Security</h3>
        <p>Electronic Voting Machines (EVMs) are standalone devices, not connected to the internet, making them highly secure against hacking. Furthermore, the <strong>VVPAT (Voter Verifiable Paper Audit Trail)</strong> system allows you to physically verify that your vote was cast correctly.</p>
        <h3>Reporting Fraud</h3>
        <p>If you suspect tampering, bribery, or any illegal activities at the polling booth, it is a criminal offense under the Representation of the People Act, 1951.</p>
        <p><strong>You must immediately report it to:</strong></p>
        <ul>
            <li>The Presiding Officer at your polling booth.</li>
            <li>The official Voter Helpline Number: <strong>1950</strong>.</li>
            <li>The Election Commission via the cVIGIL app or their official website: <a href="https://eci.gov.in" target="_blank">eci.gov.in</a>.</li>
        </ul>
    `,
    contact_info: `
        <p>If you need official help, you can reach out to the Election Commission of India (ECI) through the following official channels:</p>
        <ul>
            <li><strong>National Voter Helpline:</strong> Call <strong>1950</strong> (Toll-Free).</li>
            <li><strong>Official Website:</strong> <a href="https://eci.gov.in" target="_blank">https://eci.gov.in</a></li>
            <li><strong>Voter Portal:</strong> <a href="https://voters.eci.gov.in" target="_blank">https://voters.eci.gov.in</a> (For registration and checking status)</li>
            <li><strong>Mobile App:</strong> Download the Voter Helpline App or the cVIGIL app (for reporting violations).</li>
        </ul>
    `,
    fallback: `
        <p>I am only trained to answer questions regarding the Indian Election process.</p>
        <p>I can help you with topics like:</p>
        <ul>
            <li>How Elections Work</li>
            <li>The Voting Process</li>
            <li>Voter Eligibility</li>
            <li>EVMs and Tampering Laws</li>
            <li>Official Contact Information</li>
        </ul>
        <p>Please ask me about one of these topics!</p>
    `
};

// ==========================================
// 2. Train the NLP Model
// ==========================================

// Train: Greetings
classifier.addDocument('hello', 'greeting');
classifier.addDocument('hi', 'greeting');
classifier.addDocument('hey', 'greeting');
classifier.addDocument('good morning', 'greeting');

// Train: How Elections Work
classifier.addDocument('how do elections work', 'how_elections_work');
classifier.addDocument('explain the election process', 'how_elections_work');
classifier.addDocument('what happens during an election', 'how_elections_work');
classifier.addDocument('election procedure', 'how_elections_work');
classifier.addDocument('how does india conduct elections', 'how_elections_work');

// Train: Voting Process
classifier.addDocument('how to vote', 'voting_process');
classifier.addDocument('what is the voting process', 'voting_process');
classifier.addDocument('where do i go to vote', 'voting_process');
classifier.addDocument('how do i cast my vote', 'voting_process');
classifier.addDocument('what do i do at the polling booth', 'voting_process');
classifier.addDocument('voting machine', 'voting_process');

// Train: Eligibility
classifier.addDocument('am i eligible to vote', 'eligibility');
classifier.addDocument('who can vote', 'eligibility');
classifier.addDocument('what is the minimum age to vote', 'eligibility');
classifier.addDocument('voting age', 'eligibility');
classifier.addDocument('do i need to be a citizen', 'eligibility');
classifier.addDocument('eligibility criteria', 'eligibility');

// Train: Timeline
classifier.addDocument('what is the election timeline', 'timeline');
classifier.addDocument('when do elections happen', 'timeline');
classifier.addDocument('what are the stages of an election', 'timeline');
classifier.addDocument('election schedule', 'timeline');
classifier.addDocument('dates of election', 'timeline');

// Train: Tampering & Fraud
classifier.addDocument('what if my vote is tampered', 'tampering_fraud');
classifier.addDocument('can evms be hacked', 'tampering_fraud');
classifier.addDocument('someone is forcing me to vote', 'tampering_fraud');
classifier.addDocument('report election fraud', 'tampering_fraud');
classifier.addDocument('is the voting machine safe', 'tampering_fraud');
classifier.addDocument('what is vvpat', 'tampering_fraud');
classifier.addDocument('bribery at the polling booth', 'tampering_fraud');
classifier.addDocument('they are rigging the election', 'tampering_fraud');

// Train: Contact Info
classifier.addDocument('how do i contact the election commission', 'contact_info');
classifier.addDocument('what is the helpline number', 'contact_info');
classifier.addDocument('eci website', 'contact_info');
classifier.addDocument('where can i complain', 'contact_info');
classifier.addDocument('customer service number', 'contact_info');
classifier.addDocument('official website link', 'contact_info');

// Perform the actual training synchronously on startup
classifier.train();

// ==========================================
// 3. Inference Function
// ==========================================
async function generateAiResponse(userMessage) {
    // 1. Analyze the user's message
    const classifications = classifier.getClassifications(userMessage);
    
    // 2. Get the top classification
    const topMatch = classifications[0];
    
    // 3. Determine if the model is confident enough
    // The confidence threshold might need tuning depending on data
    if (topMatch && topMatch.value > 0.4) {
        return responses[topMatch.label];
    } else {
        // If confidence is low, the question might be off-topic
        return responses.fallback;
    }
}

module.exports = { generateAiResponse };
