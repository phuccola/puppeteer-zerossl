const puppeteer = require('puppeteer')
const puppeteerExtra = require('puppeteer-extra');
const Stealth = require('puppeteer-extra-plugin-stealth');
puppeteerExtra.use(Stealth());
const fs = require('fs')

const username = 'garson6789-21-<index>@gmail.com'
const password = 'Makati@2024'

async function main () {
  let doneLines = []
  const resultArray = []
  const errArray = []
  const browser = await puppeteer.launch({headless:false});
  const context = browser.defaultBrowserContext();
  await context.overridePermissions('https://app.zerossl.com/', ['clipboard-read']);
  fs.readFile('./result/getAuth_done.txt', {encoding: 'utf-8'}, async function(err,data){
    if (!err) {
      doneLines = data.split('\n')

      if (doneLines.length < 1) return
      await Promise.all(doneLines.map(async (line)=> await verifyDomain(browser, line, resultArray, errArray)))
      console.log(resultArray)
      console.log(errArray)
      writeToFile(resultArray, errArray)
      browser.close()
    } else {
      console.log(err);
    }
  });

}

async function verifyDomain(browser, line, resultArray, errArray) {
  const domain = getDomain(line)
  const email = getEmail(line)
  if (domain == false || email == false) return

  const page = await browser.newPage();
  await page.setDefaultTimeout(20000);
  await page.setViewport({width: 1080, height: 1024});
  await page.goto('https://app.zerossl.com/login');
  await page.type('#login > fieldset > div:nth-child(3) > input[type=email]', email);
  await page.type('#login > fieldset > div:nth-child(4) > input[type=password]', password);
  try {
    const signupBtnSelector = await page.waitForSelector('#login > fieldset > div:nth-child(5) > button');
    await signupBtnSelector.click();
  } catch (error) {
    await errorHandle('signupBtnSelector', domain, error, page, errArray)
    return
  }

  try {
    await page.waitForNavigation();
  } catch (error) {
    await errorHandle('waitForNavigation', domain, error, page, errArray)
    return
  }

  try {
    const draftBtnSelector = await page.waitForSelector('body > div:nth-child(5) > section > div > main > div > div > section.tabs_section > div > a:nth-child(1)');
    await draftBtnSelector.click();
  } catch (error) {
    await errorHandle('draftBtnSelector', domain, error, page, errArray)
    return
  }

  try {
    await page.waitForNetworkIdle();
  } catch (error) {
    await errorHandle('waitForNetworkIdle', domain, error, page, errArray)
    return
  }

  try {
    const verifyBtnSelector = await page.waitForSelector('body > div:nth-child(5) > section > div > main > div > div > section.list > ul > li:nth-child(2) > div.actions.dropdown > a.button.primary');
    await verifyBtnSelector.click();
  } catch (error) {
    await errorHandle('verifyBtnSelector', domain, error, page, errArray)
    return
  }

  try {
    await page.waitForNetworkIdle();
  } catch (error) {
    await errorHandle('waitForNetworkIdle', domain, error, page, errArray)
    return
  }

  try {
    const filUploadRaioSelector = await page.waitForSelector('body > div:nth-child(5) > section > div > main > div > div > section.steps_container > ul > li.step.open > div > form > div.form_row.radio.validation_method.last > label > div.radio_button');
    await filUploadRaioSelector.click();
  } catch (error) {
    await errorHandle('filUploadRaioSelector', domain, error, page, errArray)
    return
  }

  try {
    await page.waitForNetworkIdle();
  } catch (error) {
    await errorHandle('waitForNetworkIdle', domain, error, page, errArray)
    return
  }

  try {
    const nextStepSelector = await page.waitForSelector('body > div:nth-child(5) > section > div > main > div > div > section.steps_container > ul > li.step.open > div > form > div:nth-child(4) > a');
    await nextStepSelector.click();
  } catch (error) {
    await errorHandle('nextStepSelector', domain, error, page, errArray)
    return
  }

  try {
    await page.waitForNetworkIdle();
  } catch (error) {
    await errorHandle('waitForNetworkIdle', domain, error, page, errArray)
    return
  }

  try {
    const verifyBtnSelector = await page.waitForSelector('body > div:nth-child(5) > section > div > main > div > div > section.steps_container > ul > li.step.finalize.open > div > form > div.form_row.submit > a.button.run_validation');
    await verifyBtnSelector.click();
  } catch (error) {
    await errorHandle('verifyBtnSelector', domain, error, page, errArray)
    return
  }

  try {
    await page.waitForNetworkIdle();
  } catch (error) {
    await errorHandle('waitForNetworkIdle', domain, error, page, errArray)
    return
  }

  try {
    const alertSuccessSelector = await page.waitForSelector(
      'body > div:nth-child(5) > section > div > main > div > div > aside > p',
      {timeout: 15000}
    );
  } catch (error) {
    await errorHandle('alertSuccessSelector', domain, error, page, errArray)
    return
  }

  try {
    const downloadBtnSelector = await page.waitForSelector(
      'body > div:nth-child(5) > section > div > main > div > div > section.steps_container > ul > li.step.open > div > form > div.form_row.server_type > a',
      {timeout: 30000}
    );
    await downloadBtnSelector.click();
  } catch (error) {
    await errorHandle('downloadBtnSelector', domain, error, page, errArray)
    return
  }

  try {
    await page.waitForNetworkIdle('');
    resultArray.push(domain + '/' + email)
    await page.close()
    console.log('done ', domain)
  } catch (error) {
    await errorHandle('downloading', domain, error, page, errArray)
    return
  }

}

function getDomain(text) {
  const domainRegex = /(?<=\/\/).+?(?=\/)/
  const domain = text.match(domainRegex)
  if (domain) {
    return domain[0]
  } else {
    return false
  }
}

function getEmail(text) {
  const emailRegex = /(?<=txt\/).+?com/
  const email = text.match(emailRegex)
  if (email) {
    return email[0]
  } else {
    return false
  }
}

async function errorHandle(name, domain, error, page, errArray) {
  await page.screenshot({path: `screenshot/${name}_${domain}.png`})
  const newErrorLine = domain 
  errArray.push(newErrorLine)
  console.log(name, newErrorLine)
  console.log(error)
  await page.close()
}


function writeToFile(doneArr, errorArr) {
  doneArr.forEach( s => fs.appendFileSync('./result/verify_done.txt', s + '\n'))
  errorArr.forEach( s => fs.appendFileSync('./result/verify_err.txt', s + '\n'))
}

main()
