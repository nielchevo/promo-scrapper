import puppeteer from 'puppeteer';

import { FileManager } from "./FileManager";

export class App {

  constructor() { }

  /**
   * run - run the app
   */
  public async run() {
    try{
      const browser = await puppeteer.launch();
      console.log('initialize app...');
  
      const page = await browser.newPage();
      await page.setViewport({width: 1080, height: 1920});
      await page.goto('https://www.bankmega.com/promolainnya.php#');
      
      if (!FileManager.IfExist()) {
        let htmlBody = await page.content();
        FileManager.SaveToFile(htmlBody);
      }
  
      const subPromo = await page.$$eval("#contentpromolain2 div#subcatpromo div img", e => {
        return e.map(i => {
          return i;
        });
      })
      console.log(subPromo);
    
      // on click handle
      const ds = await page.$('img#travel');
        ds?.click().then( ()=> console.log("done !"));
      
      await page.waitForSelector("#contenpromolain2 ", { timeout: 3000});
      await page.screenshot({ path: './images.jpeg', type: "jpeg"});

      // const x = await (await page.waitForSelector("table.tablepaging")).$$eval("#contentpromolain2 table.tablepaging tr td a", el => { 
      //     return el.map(e => {
      //       if(e.hasAttribute('id')) {
      //         return e.outerHTML;
      //       }
      //     });
      // });
      // console.log(x);

      await page.close();
      await browser.close();
    } catch (error) {
      if (error) console.log(error);
    }
  }
}

// Start app
const tes = new App();
tes.run();