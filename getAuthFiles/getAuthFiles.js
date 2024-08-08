
const puppeteer = require('puppeteer')
const puppeteerExtra = require('puppeteer-extra');
const Stealth = require('puppeteer-extra-plugin-stealth');
puppeteerExtra.use(Stealth());
const fs = require('fs')

const username = 'phucclts_getAuth_test_<index>@gmail.com'
const password = '123456aA'
const baseDomain = '167.172.74.<index>'
const startIndex = 34
const range = 2
const endIndex = startIndex + range

async function main () {
  const resultArray = []
  const browser = await puppeteer.launch();
  const context = browser.defaultBrowserContext();
  await context.overridePermissions('https://app.zerossl.com/', ['clipboard-read']);
  const array = Array.from({length: range}).map((_, index) => index + startIndex)
  await Promise.all(array.map((mappedIndex)=> getAuthFile(browser, mappedIndex, resultArray)))
  // console.log(resultArray)
  // writeToFile(resultArray)
  browser.close()
}

async function getAuthFile(browser, index, resultArray) {
  const page = await browser.newPage();
  await page.setDefaultTimeout(5000);
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
    await page.close()
    return
  }

console.log('signupBtnSelectorext')
  try {
    await page.waitForNavigation();
  } catch (error) {
    await page.screenshot({path: `screenshot/waitForNavigation${index}.png`})
    console.log('waitForNavigation')
    console.log(error)
    await page.close()
    return
  }

console.log('waitForNavigation')
  try {
    const newCertBtnSelector = await page.waitForSelector('div.right_section > a');
    newCertBtnSelector.click()
  } catch (error) {
    console.log('newCertBtnSelector')
    console.log(error)
    await page.screenshot({path: `screenshot/newCertBtnSelector_${index}.png`})
    await page.close()
    return
  }

console.log('newCertBtnSelector')
  try {
    await page.waitForNetworkIdle('');
  } catch (error) {
    console.log('waitForNetworkIdle')
    console.log(error)
    await page.screenshot({path: `screenshot/waitForNetworkIdle${index}.png`})
    await page.close()
    return
  }

console.log('waitForNetworkIdle')
  try {
    await page.type(
      'body > div:nth-child(5) > section > div > main > div > div > div > ul > li.step.open > div > form > div.form_row.domains > div > div > input[type=text]:nth-child(3)',
      baseDomain.replace('<index>', index)
    );
  } catch (error) {
    await page.screenshot({path: `screenshot/input_domain${index}.png`})
    console.log('input_domain')
    console.log(error)
    await page.close()
    return
  }

console.log('input_domain')
  try {
    await page.waitForNetworkIdle('');
  } catch (error) {
    console.log('waitForNetworkIdle')
    console.log(error)
    await page.screenshot({path: `screenshot/waitForNetworkIdle${index}.png`})
    await page.close()
    return
  }

console.log('waitForNetworkIdle')

  try {
    const domainNextBtnSelector = await page.waitForSelector('body > div:nth-child(5) > section > div > main > div > div > div > ul > li.step.open > div > form > div.form_row.domains > a');
    domainNextBtnSelector.click()
  } catch (error) {
    console.log('domainNextBtnSelector')
    console.log(error)
    await page.screenshot({path: `screenshot/domainNextBtnSelector${index}.png`})
    await page.close()
    return
  }

console.log('domainNextBtnSelector')
  try {
    const trialBtnSelector = await page.waitForSelector('body > div:nth-child(5) > section > div > main > div > div > div > ul > li.step.open > div > form > div:nth-child(2) > label > div');
    trialBtnSelector.click()
    await page.screenshot({path: `screenshot/trialBtnSelector${index}.png`})
  } catch (error) {
    console.log('trialBtnSelector')
    console.log(error)
    await page.screenshot({path: `screenshot/trialBtnSelector${index}.png`})
    await page.close()
    return
  }
console.log('trialBtnSelector')

  try {
    const trialNextBtnSelector = await page.waitForSelector('body > div:nth-child(5) > section > div > main > div > div > div > ul > li.step.open > div > form > div:nth-child(3) > a');
    trialNextBtnSelector.click()
  } catch (error) {
    console.log('trialNextBtnSelector')
    console.log(error)
    await page.screenshot({path: `screenshot/trialNextBtnSelector${index}.png`})
    await page.close()
    return
  }
console.log('trialNextBtnSelector')
  try {
    await page.waitForNetworkIdle('');
  } catch (error) {
    console.log('waitForNetworkIdle')
    console.log(error)
    await page.screenshot({path: `screenshot/waitForNetworkIdle${index}.png`})
    await page.close()
    return
  }

  try {
    const addOnNextBtnSelector = await page.waitForSelector('body > div:nth-child(5) > section > div > main > div > div > div > ul > li.step.open > div > form > div:nth-child(3) > a');
    addOnNextBtnSelector.click()
  } catch (error) {
    console.log('addOnNextBtnSelector')
    console.log(error)
    await page.screenshot({path: `screenshot/addOnNextBtnSelector${index}.png`})
    await page.close()
    return
  }
console.log('addOnNextBtnSelector')

  try {
    await page.waitForNetworkIdle('');
  } catch (error) {
    console.log('waitForNetworkIdle')
    console.log(error)
    await page.screenshot({path: `screenshot/waitForNetworkIdle${index}.png`})
    await page.close()
    return
  }

console.log('waitForNetworkIdle')

  try {
    const csrNextBtnSelector = await page.waitForSelector('body > div:nth-child(5) > section > div > main > div > div > div > ul > li.step.open > div > form > div:nth-child(3) > a');
    csrNextBtnSelector.click()
  } catch (error) {
    console.log('csrNextBtnSelector')
    console.log(error)
    await page.screenshot({path: `screenshot/csrNextBtnSelector${index}.png`})
    await page.close()
    return
  }
console.log('csrNextBtnSelector')

  try {
    const finalizeNextBtnSelector = await page.waitForSelector('div.form_row.checkout > a');
    finalizeNextBtnSelector.click()
    await page.screenshot({path: `screenshot/finalizeNextBtnSelector${index}.png`})
  } catch (error) {
    console.log('finalizeNextBtnSelector error')
    console.log(error)
    await page.screenshot({path: `screenshot/finalizeNextBtnSelector${index}.png`})
    await page.close()
    return
  }
console.log('finalizeNextBtnSelector')

  try {
    await page.waitForNavigation();
    await page.screenshot({path: `screenshot/waitForNavigation${index}.png`})
  } catch (error) {
    await page.screenshot({path: `screenshot/waitForNavigation${index}.png`})
    console.log('waitForNavigation')
    console.log(error)
    await page.close()
    return
  }

console.log('waitForNavigation')
  try {
    await page.screenshot({path: `screenshot/fileUploadBtnSelector${index}.png`})
    const fileUploadBtnSelector = await page.waitForSelector('body > div:nth-child(5) > section > div > main > div > div > section.steps_container > ul > li.step.open > div > form > div.form_row.radio.validation_method.last > label > div.radio_button');
    fileUploadBtnSelector.click()
  } catch (error) {
    console.log('fileUploadBtnSelector')
    console.log(error)
    await page.screenshot({path: `screenshot/fileUploadBtnSelector${index}.png`})
    await page.close()
    return
  }
console.log('fileUploadBtnSelector')

  try {
    const downloadBtnSelector = await page.waitForSelector('body > div:nth-child(5) > section > div > main > div > div > section.steps_container > ul > li.step.open > div > form > div.form_row.radio.validation_method.last > label > div.verification_box > div:nth-child(2) > ol > li:nth-child(1) > a');
    await page.screenshot({path: `screenshot/beforedownload${index}.png`})
    downloadBtnSelector.click()
    await page.screenshot({path: `screenshot/afterdownload${index}.png`})
  } catch (error) {
    console.log('downloadBtnSelector')
    console.log(error)
    await page.screenshot({path: `screenshot/downloadBtnSelector${index}.png`})
    await page.close()
    return
  }
console.log('downloadBtnSelector')

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
