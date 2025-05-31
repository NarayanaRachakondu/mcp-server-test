import { Injectable } from '@nestjs/common';
import { scrapeAndTranslate } from './tools/scrape-and-translate.tool';
import { summarizeText } from './tools/summarize-text.tool';

@Injectable()
export class AppService {
  // 1. Return available tool definitions
  getToolMetadata() {
    return [
      {
        name: 'scrapeAndTranslate',
        description:
          'Scrape HTML from a URL and translate it to a given language.',
        parameters: {
          type: 'object',
          properties: {
            url: { type: 'string', description: 'Website URL to scrape' },
            language: {
              type: 'string',
              description: 'Target language code (e.g., te)',
            },
          },
          required: ['url', 'language'],
        },
      },
      {
        name: 'summarizeText',
        description: 'Summarize a long text into 3–5 bullet points.',
        parameters: {
          type: 'object',
          properties: {
            text: {
              type: 'string',
              description: 'The input text to summarize',
            },
          },
          required: ['text'],
        },
      },
    ];
  }

  // 2. Handle tool invocation
  async invokeTool(toolName: string, input: any) {
    switch (toolName) {
      case 'scrapeAndTranslate':
        return await scrapeAndTranslate(input.url, input.language);

      case 'summarizeText':
        return await summarizeText(input.text);

      default:
        return { error: `Unknown tool: ${toolName}` };
    }
  }
}
