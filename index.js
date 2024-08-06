const puppeteer = require('puppeteer')
const puppeteerExtra = require('puppeteer-extra');
const Stealth = require('puppeteer-extra-plugin-stealth');
const fs = require('fs')
puppeteerExtra.use(Stealth());
const password = 'Makati@2024'
const username = 'garson6789-<index>@gmail.com'
const startIndex = 197
const range = 4
const endIndex = startIndex + range

async function main () {
  const resultArray = []
  const browser = await puppeteer.launch();
  const array = Array.from({length: range}).map((_, index) => index + startIndex)
  await Promise.all(array.map((mappedIndex)=>getAPIKey(browser, mappedIndex, resultArray)))
  console.log(resultArray)
  writeToFile(resultArray)
  browser.close()
}

async function getAPIKey(browser, index, resultArray) {
  const page = await browser.newPage();
  await page.setViewport({width: 1080, height: 1024});
  await page.goto('https://app.zerossl.com/signup');
  await page.type('#signup input[type=text]', username.replace('<index>', index));
  await page.type('#signup input[type=password]', password);
  try {
    const signupBtnSelector = await page.waitForSelector('#signup button');
    await signupBtnSelector.click();
  } catch (error) {
    await page.screenshot({path: `screenshot/signupBtnSelector_${index}.png`})
    console.log('signupBtnSelectorext')
    console.log(error)
  }

  try {
    await page.waitForNavigation();
  } catch (error) {
    await page.screenshot({path: `screenshot/waitForNavigation${index}.png`})
    console.log('waitForNavigation')
    console.log(error)
  }

  try {
    const developerSelector = await page.waitForSelector('body > div:nth-child(5) > section > div > div.left > div > ul > li.developer > a');
    developerSelector.click()
  } catch (error) {
    console.log('developerSelector')
    console.log(error)
    await page.screenshot({path: `screenshot/developerSelector_${index}.png`})
  }

  try {
    const apiKeySelector = await page.waitForSelector('body > div:nth-child(5) > section > div > main > div > div > section:nth-child(2) > div:nth-child(2) > div > span');
    const APIKey = await  apiKeySelector?.evaluate(el => el.textContent)
    resultArray.push([username.replace('<index>', index), APIKey]);
  } catch (error) {
    console.log('apiKeySelector')
    console.log(error)
    await page.screenshot({path: `screenshot/apiKeySelector_${index}.png`})
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
