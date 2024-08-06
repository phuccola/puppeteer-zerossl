const puppeteer = require('puppeteer')
const puppeteerExtra = require('puppeteer-extra');
const Stealth = require('puppeteer-extra-plugin-stealth');
const fs = require('fs')
puppeteerExtra.use(Stealth());

const form = {
  country: 'VN',
  state: 'HCM',
  locality: 'HCM',
  organization: 'cola',
  organization_unit: 'cola',
  AN: 'colatv',
}

async function main () {
  const resultArray = []
  const browser = await puppeteer.launch();

  getCSR(browser, '167.172.74.191', resultArray)
  // const array = Array.from({length: range}).map((_, index) => index + startIndex)
  // await Promise.all(array.map((mappedIndex)=>getAPIKey(browser, mappedIndex, resultArray)))
  // console.log(resultArray)
  // writeToFile(resultArray)
  browser.close()
}

async function getCSR(browser, CN, resultArray) {
  const page = await browser.newPage();
  await page.setViewport({width: 1080, height: 1024});
  await page.goto('https://csrgenerator.com/');
  
  await page.type('body > div > div > div > div.columns > div > form > div:nth-child(1) > input', form.country);
  await page.type('body > div > div > div > div.columns > div > form > div:nth-child(2) > input', form.state);
  await page.type('body > div > div > div > div.columns > div > form > div:nth-child(3) > input', form.locality);
  await page.type('body > div > div > div > div.columns > div > form > div:nth-child(4) > input', form.organization);
  await page.type('body > div > div > div > div.columns > div > form > div:nth-child(5) > input', form.organization_unit);
  await page.type('body > div > div > div > div.columns > div > form > div:nth-child(6) > input', CN);
  await page.type('body > div > div > div > div.columns > div > form > div:nth-child(7) > input', form.AN);

  try {
    const keySizeSelector = await page.waitForSelector('body > div > div > div > div.columns > div > form > div:nth-child(8) > label:nth-child(2) > i');
    await keySizeSelector.click();
  } catch (error) {
    await page.screenshot({path: `screenshot/keySizeSelector_${CN}.png`})
    console.log('keySizeSelector')
    console.log(error)
  }

  try {
    const generateBtn = await page.waitForSelector('body > div > div > div > div.columns > div > form > button');
    await generateBtn.click();
  } catch (error) {
    await page.screenshot({path: `screenshot/generateBtn_${CN}.png`})
    console.log('generateBtn')
    console.log(error)
  }

  try {
    const csr = await page.waitForSelector('#csr');
    const csrContent = await csr?.evaluate(el => el.textContent)
    console.log(csrContent)
  } catch (error) {
    await page.screenshot({path: `screenshot/csr_${CN}.png`})
    console.log('csr')
    console.log(error)
  }

  await page.close();
}

function writeToFile(arr) {
  const pairFile = fs.createWriteStream(`result/pair_${startIndex}_${endIndex}.txt`);
  pairFile.on('error', function(err) { console.log(err) });
  arr.forEach(function(item) { pairFile.write(item.join(': ') + '\n'); });
  pairFile.end();

  const keyFile = fs.createWriteStream(`result/key_${startIndex}_${endIndex}.txt`);
  keyFile.on('error', function(err) { console.log(err) });
  arr.forEach(function(item) { keyFile.write(item[1] + '\n'); });
  keyFile.end();
}


main()
