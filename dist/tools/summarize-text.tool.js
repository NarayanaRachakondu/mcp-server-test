"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.summarizeText = summarizeText;
const dotenv = require("dotenv");
const axios_1 = require("axios");
dotenv.config();
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
async function summarizeText(text) {
    const prompt = `Summarize the following text into 3-5 bullet points:\n\n${text}`;
    const requestBody = {
        model: "claude-3-haiku-20240307",
        max_tokens: 1000,
        temperature: 0.5,
        system: "You are a helpful assistant that summarizes content into bullet points.",
        messages: [
            {
                role: "user",
                content: prompt,
            },
        ],
    };
    try {
        const response = await axios_1.default.post("https://api.anthropic.com/v1/messages", requestBody, {
            headers: {
                "Content-Type": "application/json",
                "x-api-key": ANTHROPIC_API_KEY,
                "anthropic-version": "2023-06-01",
            },
        });
        const content = response.data.content
            .map((item) => item.text)
            .join("\n");
        return content
            .split("\n")
            .filter((line) => line.trim().startsWith("•") || line.trim().startsWith("-"));
    }
    catch (error) {
        console.error("Anthropic API error:", error.response?.data || error);
        throw new Error("Failed to summarize text using Claude");
    }
}
//# sourceMappingURL=summarize-text.tool.js.map