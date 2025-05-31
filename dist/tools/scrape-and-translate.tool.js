"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrapeAndTranslate = scrapeAndTranslate;
const puppeteer = require("puppeteer");
const axios_1 = require("axios");
const dotenv = require("dotenv");
dotenv.config();
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
async function scrapeAndTranslate(url, language) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url);
    const content = await page.$eval('body', (el) => el.innerText);
    await browser.close();
    const translated = await translateText(content, language);
    return {
        original: content.slice(0, 300),
        translated: translated.slice(0, 300),
    };
}
async function translateText(text, targetLang) {
    const endpoint = `https://translation.googleapis.com/language/translate/v2`;
    const response = await axios_1.default.post(endpoint, null, {
        params: {
            q: text,
            target: targetLang,
            key: GOOGLE_API_KEY,
        },
    });
    return response.data.data.translations[0].translatedText;
}
//# sourceMappingURL=scrape-and-translate.tool.js.map