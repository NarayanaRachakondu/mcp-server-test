import * as puppeteer from 'puppeteer';
import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config();

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

export async function scrapeAndTranslate(
  url: string,
  language: string,
): Promise<any> {
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

async function translateText(
  text: string,
  targetLang: string,
): Promise<string> {
  const endpoint = `https://translation.googleapis.com/language/translate/v2`;
  const response = await axios.post(endpoint, null, {
    params: {
      q: text,
      target: targetLang,
      key: GOOGLE_API_KEY,
    },
  });

  return response.data.data.translations[0].translatedText;
}
