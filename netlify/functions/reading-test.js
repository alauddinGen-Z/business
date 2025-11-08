const { GoogleGenerativeAI } = require('@google/generative-ai');

exports.handler = async function (event, context) {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const { answer } = JSON.parse(event.body);
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

        const prompt = `The reading passage is about the rise of Artificial Intelligence. The question is: "According to the passage, what is the main goal of AI research?". The user's answer is: "${answer}". Please evaluate this answer for correctness based on the passage and provide brief feedback. The passage states that "Research in AI is concerned with producing machines to automate tasks requiring intelligent behavior."`;

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
