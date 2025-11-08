const { GoogleGenerativeAI } = require('@google/generative-ai');

exports.handler = async function (event, context) {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const { essay } = JSON.parse(event.body);
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

        const prompt = `Please act as an IELTS examiner and evaluate the following essay on the topic "The importance of international tourism." Provide an estimated band score and detailed feedback on task response, coherence and cohesion, lexical resource, and grammatical range and accuracy.

        Essay:
        ${essay}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text();

        return {
            statusCode: 200,
            body: JSON.stringify({ feedback: text }),
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'An error occurred while processing your request.' }),
        };
    }
};
