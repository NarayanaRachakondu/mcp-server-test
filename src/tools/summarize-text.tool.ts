import * as dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export async function summarizeText(text: string): Promise<string[]> {
  const prompt = `Summarize the following text into 3-5 bullet points:\n\n${text}`;

  const requestBody = {
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.5,
  };

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      requestBody,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      },
    );

    const content = response.data.choices[0].message.content;

    return content
      .split('\n')
      .filter(
        (line) => line.trim().startsWith('•') || line.trim().startsWith('-'),
      );
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw new Error('Failed to summarize text');
  }
}
