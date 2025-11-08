const express = require('express');
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

// API endpoint for the Writing Score Test
app.post('/api/writing-score', async (req, res) => {
    try {
        const { essay } = req.body;
        const prompt = `Please act as an IELTS examiner and evaluate the following essay on the topic "The importance of international tourism." Provide an estimated band score and detailed feedback on task response, coherence and cohesion, lexical resource, and grammatical range and accuracy.

        Essay:
        ${essay}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text();

        res.json({ feedback: text });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
});

// API endpoint for the Speaking Practice
app.post('/api/speaking-practice', async (req, res) => {
    try {
        const { answer, question } = req.body;
        if (answer) {
            const prompt = `The user was asked the following IELTS Speaking test question: "${question}". The user responded: "${answer}". Please provide feedback on the user's response, focusing on fluency, lexical resource, grammatical range, and accuracy.`;
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = await response.text();
            res.json({ feedback: text });
        } else {
            const prompt = "Please ask me a question that would be suitable for Part 1 of the IELTS Speaking test.";
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = await response.text();
            res.json({ question: text });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
});

// API endpoint for the Reading Test
app.post('/api/reading-test', async (req, res) => {
    try {
        const { answer } = req.body;
        const prompt = `The reading passage is about the rise of Artificial Intelligence. The question is: "According to the passage, what is the main goal of AI research?". The user's answer is: "${answer}". Please evaluate this answer for correctness based on the passage and provide brief feedback. The passage states that "Research in AI is concerned with producing machines to automate tasks requiring intelligent behavior."`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text();

        res.json({ feedback: text });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
