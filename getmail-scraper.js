const puppeteer = require('puppeteer');
const jsdom = require('jsdom');
const regexEmail = /([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}/ig; 

require('events').EventEmitter.defaultMaxListeners = 20;

async function getMails() {
  try {

    const lastPage = 162;
    const browser = await puppeteer.launch() ;
    const page = await browser.newPage();

    for (let index = 0; index < lastPage; index++) {
        let response = await page.goto('https://www.csiaexchange.com/common/default.aspx?id=4&pi=' + index + '&salt=62706');
        let body = await response.text();
    
        let { window: { document } } = new jsdom.JSDOM(body);  
    
        document.querySelectorAll('article').forEach(element => {
          let matches = element.textContent.matchAll(regexEmail);
          for (const match of matches) {
            console.log(match[0]);
          }
        });

        console.log("-----");
        console.log(index);
        console.log("-----");
    }      

    await browser.close();
  } catch (error) {
    console.error(error);
  }

  console.log("-----");
  console.log("Finish Process");
  console.log(Date());
  console.log("-----");
}


(async () => {
  console.log("-----");
  console.log("Init Process");
  console.log(Date());
  console.log("-----");
   
  getMails();

})();
