import puppeteer from 'puppeteer';

import { FileManager } from "./FileManager";

export class App {

  private promoThumbnail:Array<string> = [];

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
          return `img#${i.getAttribute('id')}`;
        });
      })
      console.log(subPromo);
      
      /* Main looping flow */
      for (const promo of subPromo) {
        // simulate click promo
        console.log('category : ', promo.toString());
        const ds = await page.$(promo.toString());
        ds?.click().then( ()=> console.log("done !"));

        await page.waitFor(1500); //wait page to
        await page.screenshot({ path: './images.jpeg', type: "jpeg"});
        
        const pagination = await (await page.waitForSelector("table.tablepaging")).$$eval("#contentpromolain2 table.tablepaging tr td a", el => { 
          const newEl = el.filter(e => e.hasAttribute('id'));
          return newEl.map(e=>e);
        });
      }
      
      // get promo detail 
      const promoThumbnail = await page.$$eval("#promolain li a", (el) => {
        return el.map((e) => {
          return e.getAttribute('href');
        });
      });

      promoThumbnail.forEach(element => {
        console.log(`Begin new page ${element?.toString()}`);
      });  

      console.log(promoThumbnail);
      
      await page.close();
      await browser.close();
    } catch (error) {
      if (error) console.log(error);
    }
  }

  private scrapeNewPage() {
    
  }
}

// Start app
const tes = new App();
tes.run();