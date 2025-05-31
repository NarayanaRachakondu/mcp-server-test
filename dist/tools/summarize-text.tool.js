"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.summarizeText = summarizeText;
const dotenv = require("dotenv");
const axios_1 = require("axios");
dotenv.config();
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
async function summarizeText(text) {
    const prompt = `Summarize the following text into 3-5 bullet points:\n\n${text}`;
    const requestBody = {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.5,
    };
    try {
        const response = await axios_1.default.post('https://api.openai.com/v1/chat/completions', requestBody, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${OPENAI_API_KEY}`,
            },
        });
        const content = response.data.choices[0].message.content;
        return content
            .split('\n')
            .filter((line) => line.trim().startsWith('•') || line.trim().startsWith('-'));
    }
    catch (error) {
        console.error('OpenAI API error:', error);
        throw new Error('Failed to summarize text');
    }
}
//# sourceMappingURL=summarize-text.tool.js.map