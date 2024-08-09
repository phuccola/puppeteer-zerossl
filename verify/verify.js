
const puppeteer = require('puppeteer')
const puppeteerExtra = require('puppeteer-extra');
const Stealth = require('puppeteer-extra-plugin-stealth');
puppeteerExtra.use(Stealth());
const fs = require('fs')

const username = 'phucclts_<index>@gmail.com'
const password = '123456aA'
const startIndex = 2
const range = 1
const endIndex = startIndex + range

async function main () {
  const resultArray = []
  const browser = await puppeteer.launch();
  const context = browser.defaultBrowserContext();
  await context.overridePermissions('https://app.zerossl.com/', ['clipboard-read']);
  const array = Array.from({length: range}).map((_, index) => index + startIndex)
  await Promise.all(array.map((mappedIndex)=> getHash(browser, mappedIndex, resultArray)))
  console.log(resultArray)
  // writeToFile(resultArray)
  browser.close()
}

async function getHash(browser, index, resultArray) {
  const page = await browser.newPage();
  await page.setViewport({width: 1254, height: 1024});
  await page.setDefaultTimeout(5000);
  await page.goto('https://app.zerossl.com/login');
  await page.type('#login input[type=email]', username.replace('<index>', index));
  await page.type('#login input[type=password]', password);

  try {
    const loginBtnSelector = await page.waitForSelector('#login > fieldset > div:nth-child(5) > button');
    await loginBtnSelector.click();
  } catch (error) {
    console.log('loginBtnSelector')
    console.log(error)
  }

  try {
    await page.waitForNavigation();
  } catch (error) {
    console.log('waitForNavigation')
    console.log(error)
  }

  try {
    const draftBtnSelector = await page.waitForSelector('body > div:nth-child(5) > section > div > main > div > div > section.tabs_section > div > a:nth-child(1)');
    await draftBtnSelector.click();
  } catch (error) {
    console.log('draftBtnSelector')
    console.log(error)
  }

  try {
    await page.waitForNetworkIdle();
  } catch (error) {
    console.log('waitForNetworkIdle')
    console.log(error)
  }

  try {
    const verifyBtnSelector = await page.waitForSelector('body > div:nth-child(5) > section > div > main > div > div > section.list > ul > li:nth-child(2) > div.actions.dropdown > a.button.primary');
    await verifyBtnSelector.click({
      offset: {
        x: 92,
        y: 0,
      }
    });
  } catch (error) {
    await page.screenshot({path: `screenshot/verifyBtnSelector_${index}.png`})
    console.log('verifyBtnSelector')
    console.log(error)
  }

  try {
    const copyBtnSelector = await page.waitForSelector('body > div:nth-child(5) > section > div > main > div > div > section.list > ul > li:nth-child(2) > div.actions.dropdown > ul > li:nth-child(1) > a');
    await copyBtnSelector.click();
    const hash = await page.evaluate(() => navigator.clipboard.readText())
    resultArray.push(hash)
  } catch (error) {
    await page.screenshot({path: `screenshot/copyBtnSelector_${index}.png`})
    console.log('copyBtnSelector')
    console.log(error)
  }

  await page.close();
}

main()
