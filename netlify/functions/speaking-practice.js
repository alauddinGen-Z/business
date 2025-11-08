const { GoogleGenerativeAI } = require('@google/generative-ai');

exports.handler = async function (event, context) {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const { answer, question } = JSON.parse(event.body);
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

        if (answer) {
            const prompt = `The user was asked the following IELTS Speaking test question: "${question}". The user responded: "${answer}". Please provide feedback on the user's response, focusing on fluency, lexical resource, grammatical range, and accuracy.`;
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = await response.text();
            return {
                statusCode: 200,
                body: JSON.stringify({ feedback: text }),
            };
        } else {
            const prompt = "Please ask me a question that would be suitable for Part 1 of the IELTS Speaking test.";
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = await response.text();
            return {
                statusCode: 200,
                body: JSON.stringify({ question: text }),
            };
        }
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'An error occurred while processing your request.' }),
        };
    }
};
