import puppeteer from 'puppeteer';

import { FileManager } from "./FileManager";

export class App {

  constructor() { }

  /**
   * run - run the app
   */
  public async run() {
    const browser = await puppeteer.launch();
    console.log('initialize app...');

    const page = await browser.newPage();
    await page.goto('https://www.bankmega.com/promolainnya.php#');
    
    if (!FileManager.IfExist()) {
      let htmlBody = await page.content();
      FileManager.SaveToFile(htmlBody);
    }

    // begin scraping 
    // narrow down element, get contentpromolain2
    const rootElement = await page.$eval('#contentpromolain2', (element) => {
      return element.outerHTML;
    });
    console.log(rootElement);

    await browser.close();
  }
}

// Start app
const tes = new App();
tes.run();