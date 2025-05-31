"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const scrape_and_translate_tool_1 = require("./tools/scrape-and-translate.tool");
const summarize_text_tool_1 = require("./tools/summarize-text.tool");
let AppService = class AppService {
    getToolMetadata() {
        return [
            {
                name: "scrapeAndTranslate",
                description: "Scrape HTML from a URL and translate it to a given language.",
                parameters: {
                    type: "object",
                    properties: {
                        url: { type: "string", description: "Website URL to scrape" },
                        language: {
                            type: "string",
                            description: "Target language code (e.g., te)",
                        },
                    },
                    required: ["url", "language"],
                },
            },
            {
                name: "summarizeText",
                description: "Summarize a long text into 3–5 bullet points.",
                parameters: {
                    type: "object",
                    properties: {
                        text: {
                            type: "string",
                            description: "The input text to summarize",
                        },
                    },
                    required: ["text"],
                },
            },
        ];
    }
    async invokeTool(toolName, input) {
        switch (toolName) {
            case "scrapeAndTranslate":
                return await (0, scrape_and_translate_tool_1.scrapeAndTranslate)(input.url, input.language);
            case "summarizeText":
                return await (0, summarize_text_tool_1.summarizeText)(input.text);
            default:
                return { error: `Unknown tool: ${toolName}` };
        }
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
//# sourceMappingURL=app.service.js.map