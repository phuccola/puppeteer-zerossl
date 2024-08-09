
const puppeteer = require('puppeteer')
const puppeteerExtra = require('puppeteer-extra');
const Stealth = require('puppeteer-extra-plugin-stealth');
puppeteerExtra.use(Stealth());
const fs = require('fs')

const domains = [
  '178.128.24.17',
]

const username = 'garson6789-24-<index>@gmail.com'
const password = 'Makati@2024'

async function main () {
  const resultArray = []
  const errArray = []
  const browser = await puppeteer.launch({headless:false});
  const context = browser.defaultBrowserContext();
  await context.overridePermissions('https://app.zerossl.com/', ['clipboard-read']);
  await Promise.all(Array.from({length: domains.length}).map((_ ,index)=> getAuthFile(browser, index, resultArray, errArray)))
  console.log(resultArray)
  console.log(errArray)
  writeToFile(resultArray, errArray)
  browser.close()
}

async function getAuthFile(browser, index, resultArray, errArray) {
  const page = await browser.newPage();
  await page.setDefaultTimeout(20000);
  await page.setViewport({width: 1080, height: 1024});
  await page.goto('https://app.zerossl.com/signup');
  await page.type('#signup input[type=text]', username.replace('<index>', index));
  await page.type('#signup input[type=password]', password);
  try {
    const signupBtnSelector = await page.waitForSelector('#signup button');
    await signupBtnSelector.click();
  } catch (error) {
    await errorHandle('signupBtnSelector', index, error, page, errArray)
    return
  }

  try {
    await page.waitForNavigation();
  } catch (error) {
    await errorHandle('waitForNavigation', index, error, page, errArray)
    return
  }

  try {
    const newCertBtnSelector = await page.waitForSelector('div.right_section > a', {timeout: 1000});
    newCertBtnSelector.click()
  } catch (error) {
    await errorHandle('newCertBtnSelector', index, error, page, errArray)
    return
  }

  try {
    await page.waitForNetworkIdle('');
  } catch (error) {
    await errorHandle('waitForNetworkIdle', index, error, page, errArray)
    return
  }

  try {
    await page.type(
      'body > div:nth-child(5) > section > div > main > div > div > div > ul > li.step.open > div > form > div.form_row.domains > div > div > input[type=text]:nth-child(3)',
      domains[index]
    );
  } catch (error) {
    await errorHandle('inputDomain', index, error, page, errArray)
    return
  }

  try {
    await page.waitForNetworkIdle('');
  } catch (error) {
    await errorHandle('waitForNetworkIdle', index, error, page, errArray)
    return
  }


  try {
    const domainNextBtnSelector = await page.waitForSelector('body > div:nth-child(5) > section > div > main > div > div > div > ul > li.step.open > div > form > div.form_row.domains > a');
    domainNextBtnSelector.click()
  } catch (error) {
    await errorHandle('domainNextBtnSelector', index, error, page, errArray)
    return
  }

  try {
    const ninetyBtnSelector = await page.waitForSelector('body > div:nth-child(5) > section > div > main > div > div > div > ul > li.step.open > div > form > div:nth-child(2) > label > div');
    ninetyBtnSelector.click()
  } catch (error) {
    await errorHandle('trialBtnSelector', index, error, page, errArray)
    return
  }

  try {
    await page.waitForNetworkIdle('');
  } catch (error) {
    await errorHandle('waitForNetworkIdle', index, error, page, errArray)
    return
  }

  try {
    const ninetyBtnSelector = await page.waitForSelector('body > div:nth-child(5) > section > div > main > div > div > div > ul > li.step.open > div > form > div:nth-child(2) > label > div');
    ninetyBtnSelector.click()
  } catch (error) {
    await errorHandle('trialBtnSelector', index, error, page, errArray)
    return
  }

  try {
    const trialNextBtnSelector = await page.waitForSelector('body > div:nth-child(5) > section > div > main > div > div > div > ul > li.step.open > div > form > div:nth-child(3) > a');
    trialNextBtnSelector.click()
  } catch (error) {
    await errorHandle('trialNextBtnSelector', index, error, page, errArray)
    return
  }
  try {
    await page.waitForNetworkIdle('');
  } catch (error) {
    await errorHandle('waitForNetworkIdle', index, error, page, errArray)
    return
  }

  try {
    const addOnNextBtnSelector = await page.waitForSelector('body > div:nth-child(5) > section > div > main > div > div > div > ul > li.step.open > div > form > div:nth-child(3) > a');
    addOnNextBtnSelector.click()
  } catch (error) {
    await errorHandle('addOnNextBtnSelector', index, error, page, errArray)
    return
  }

  try {
    await page.waitForNetworkIdle('');
  } catch (error) {
    await errorHandle('waitForNetworkIdle', index, error, page, errArray)
    return
  }

  try {
    const csrNextBtnSelector = await page.waitForSelector('body > div:nth-child(5) > section > div > main > div > div > div > ul > li.step.open > div > form > div:nth-child(3) > a');
    csrNextBtnSelector.click()
  } catch (error) {
    await errorHandle('csrNextBtnSelector', index, error, page, errArray)
    return
  }

  try {
    const freeSelectionSelector = await page.waitForSelector('body > div:nth-child(5) > section > div > main > div > div > div > ul > li.step.is_lockable.finalize.open > div > form > div.plans.yearly > div.plan.free.selected > div.bottom_section > a');
    freeSelectionSelector.click()
  } catch (error) {
    await errorHandle('csrNextBtnSelector', index, error, page, errArray)
    return
  }

  try {
    const finalizeNextBtnSelector = await page.waitForSelector('div.form_row.checkout > a');
    finalizeNextBtnSelector.click()
  } catch (error) {
    await errorHandle('finalizeNextBtnSelector', index, error, page, errArray)
    return
  }

  try {
    await page.waitForNetworkIdle('');
  } catch (error) {
    await errorHandle('waitForNetworkIdle', index, error, page, errArray)
    return
  }

  try {
    const fileUploadBtnSelector = await page.waitForSelector('body > div:nth-child(5) > section > div > main > div > div > section.steps_container > ul > li.step.open > div > form > div.form_row.radio.validation_method.last > label > div.radio_button');
    fileUploadBtnSelector.click()
  } catch (error) {
    await errorHandle('fileUploadBtnSelector', index, error, page, errArray)
    return
  }

  try {
    const downloadBtnSelector = await page.waitForSelector('body > div:nth-child(5) > section > div > main > div > div > section.steps_container > ul > li.step.open > div > form > div.form_row.radio.validation_method.last > label > div.verification_box > div:nth-child(2) > ol > li:nth-child(1) > a');
    downloadBtnSelector.click()
  } catch (error) {
    await errorHandle('downloadBtnSelector', index, error, page, errArray)
    return
  }


  try {
    await page.waitForNetworkIdle('');
    const linkSelector = await page.waitForSelector('body > div:nth-child(5) > section > div > main > div > div > section.steps_container > ul > li.step.open > div > form > div.form_row.radio.validation_method.last > label > div.verification_box > div:nth-child(2) > ol > li:nth-child(3) > a');
    const linkSelectorText = await  linkSelector?.evaluate(el => el.textContent)
    const newDoneLine = linkSelectorText + '/' + username.replace('<index>', index)
    console.log(newDoneLine)
    resultArray.push(newDoneLine)
    await page.waitForNetworkIdle('');
    await page.close()
    console.log('done ', domains[index])
  } catch (error) {
    await errorHandle('linkSelectorText', index, error, page, errArray)
    return
  }

}

async function errorHandle(name, index, error, page, errArray) {
  await page.screenshot({path: `screenshot/${name}_${domains[index]}.png`})
  const newErrorLine = domains[index] + '/' + username.replace('<index>', index)
  errArray.push(newErrorLine)
  console.log(name, newErrorLine)
  console.log(error)
  await page.close()
}


function writeToFile(doneArr, errorArr) {
  doneArr.forEach( s => fs.appendFileSync('./result/getAuth_done.txt', s + '\n'))
  errorArr.forEach( s => fs.appendFileSync('./result/getAuth_err.txt', s + '\n'))
}

main()
