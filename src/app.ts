import puppeteer from 'puppeteer';

import { FileManager } from "./FileManager";
import { ResolveOptions } from 'dns';

export class App {
  
  private mMainData:PromoCategory; 
  
  private mMainURL = "https://www.bankmega.com/";
  private DELAY_CLICK = 4000;
  
  constructor() {
    
  }

  /**
   * run - run the app
   */
  public async run() {
    try{
      // const browser = await puppeteer.launch();
      console.log('initialize app...');
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      
      // Open promo page
      await page.goto(this.mMainURL+"promolainnya.php#");
      
      // if (!FileManager.IfExist()) {
      //   let htmlBody = await page.content();
      //   FileManager.SaveToFile(htmlBody);
      // }
  
      const promoCategory = await page.$$eval("#contentpromolain2 div#subcatpromo div img", e => {
        return e.map(i => {
          return `img#${i.getAttribute('id')}`;
        });
      })
      console.log(promoCategory);
      
      /* Main looping flow */
      for (const promo of promoCategory) {
        
        console.info(`--> Current category: ${promo.toString()}`);

        

        // Simulate click promo to refresh page.
        const ds = await page.$(promo.toString());
        ds?.click().then( ()=> console.log("done !"));

        await page.waitFor(1500); // wait delay page to load
        
        const pagination = await page.$$eval("#contentpromolain2 table.tablepaging tr td a", el => { 
          // Eliminate goto: first and last in pagination
          const pageIndex = el.filter(e => e.hasAttribute('id'));
          return pageIndex.map(e => e.getAttribute('title')?.toString());
        })
        .then( async (pageLength) => {

          // Begin looping pagination
          for (const it of pageLength) {
            await (async ()=> {
              console.log(`pagination: ${it}`);
              const ds = await page.$(`[title="${it}"]`);
              ds?.click().then( () => console.log(`Done event click with selector [title="${it}"]`));

              await page.waitFor(this.DELAY_CLICK);

              // Get all of Promo detail url link
              const promoThumbnail = await page.$$eval("#promolain li a", (el) => {
                return el.map((e) => {
                  return e.getAttribute('href');
                });
              }).then( async (urlLinks) =>{

                // Begin click promo thumbnail and scrape data
                for (const urlLink of urlLinks) {
                  let link = urlLink?.toString();
                  
                  let promoDetailPage = await browser.newPage();

                  await (async () => {
                    console.log(`Begin new page ${link?.toString()}`);
                    let urlDetail = this.mMainURL+link?.toString();
                    console.log('url detail : ', urlDetail);
                    await promoDetailPage.goto(urlDetail, {waitUntil: "load"})
                      .then(e => console.log(`goto response: ${e?.status}`))
                      .catch(e => console.log(e));

                    // scrap promo detail page
                    const data = await promoDetailPage.evaluate(()=> { 
                      let title = document.querySelector('div.titleinside > h3:nth-child(1)')?.innerHTML;
                      let area = document.querySelector('.area > b:nth-child(1)')?.innerHTML;
                      let dateStart = document.querySelector('.periode > b:nth-child(1)')?.innerHTML;
                      let dateEnd = document.querySelector('.periode > b:nth-child(2)')?.innerHTML;
                      
                      const scrapData = { 
                        title: title, 
                        area: area,
                        periodeBegin: dateStart, 
                        periodeEnd: dateEnd 
                      };

                      return scrapData;
                    });

                    console.log(`our scraped data: ${JSON.stringify(data)}`);
                  })().then( async () => {
                    console.log(`Done looping page ${link}. we can close this page`);
                    await promoDetailPage.close();
                  })
                }
                console.log(promoThumbnail);

              })
            })().then( async ()=> {
              console.log('on done scrape thumbnail');
            });
          }
        });
      }
      
      // Get all of Promo detail url link
      // const promoThumbnail = await page.$$eval("#promolain li a", (el) => {
      //   return el.map((e) => {
      //     return e.getAttribute('href');
      //   });
      // });

      // Begin click promo thumbnail and scrape data
      // for (const urlLink of promoThumbnail) {
      //   let link = urlLink?.toString();
        
      //   let promoDetailPage = await browser.newPage();
      //   await (async () => {
      //     console.log(`Begin new page ${link?.toString()}`);
      //     let urlDetail = this.mMainURL+link?.toString();
      //     console.log('url detail : ', urlDetail);
      //     await promoDetailPage.goto(urlDetail, {waitUntil: "load"})
      //       .then(e => console.log(`goto response: ${e?.status}`))
      //       .catch(e => console.log(e));

      //     // scrap promo detail page
      //     const data = await promoDetailPage.evaluate(()=> { 
      //       let title = document.querySelector('div.titleinside > h3:nth-child(1)')?.innerHTML;
      //       let area = document.querySelector('.area > b:nth-child(1)')?.innerHTML;
      //       let dateStart = document.querySelector('.periode > b:nth-child(1)')?.innerHTML;
      //       let dateEnd = document.querySelector('.periode > b:nth-child(2)')?.innerHTML;
            
      //       const scrapData = { 
      //         title: title, 
      //         area: area,
      //         periodeBegin: dateStart, 
      //         periodeEnd: dateEnd 
      //       };

      //       return scrapData;
      //     });

      //     console.log(`our scraped data: ${JSON.stringify(data)}`);
      //   })().then( async () => {
      //     console.log(`Done looping page ${link}. we can close this page`);
      //     await promoDetailPage.close();
      //   })
      // }
      // console.log(promoThumbnail);
      
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