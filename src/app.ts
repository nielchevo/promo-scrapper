import puppeteer from 'puppeteer';

export class App {

    constructor() {}

    /**
     * run - run the app
     */
    public async run() {
        const browser = await puppeteer.launch();
        console.log('initialize app...');
        
        const page = await browser.newPage();
        await page.goto('https://www.bankmega.com/promolainnya.php#');
        
        let htmlBody = await page.content();
        console.log(htmlBody);

        await browser.close();
    }
}

// Start app
const tes = new App();
tes.run();