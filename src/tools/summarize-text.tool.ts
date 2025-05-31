import * as dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

export async function summarizeText(text: string) {
  const prompt = `Summarize the following text into 3-5 bullet points:\n\n${text}`;

  const requestBody = {
    model: "claude-3-haiku-20240307", // or `claude-3-sonnet-20240229`, etc.
    max_tokens: 1000,
    temperature: 0.5,
    system:
      "You are a helpful assistant that summarizes content into bullet points.",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  };

  try {
    const response = await axios.post(
      "https://api.anthropic.com/v1/messages",
      requestBody,
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
        },
      },
    );

    const content = processResponse(response.data);
    return content;
  } catch (error) {
    console.error("Anthropic API error:", error.response?.data || error);
    throw new Error("Failed to summarize text using Claude");
  }
}

function processResponse(data: any) {
  const rawText = data?.content?.[0]?.text?.trim() || "";
  return {
    output: rawText,
  };
}
