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
const startIndex = 12
const range = 1
const endIndex = startIndex + range

async function main () {
  const resultArray = []
  const browser = await puppeteer.launch();

  const array = Array.from({length: range}).map((_, index) => index + startIndex)
  await Promise.all(array.map((mappedIndex)=> getCSR(browser, `167.172.74.${mappedIndex}`, resultArray)))
  writeToFile(resultArray)
  browser.close()
  await callCertificate(resultArray[0])
}

async function callCertificate(data) {
  const lines = data.split('\n')
  let certReq = ''
  let isCertReq = false
  for (let i = 0; i < lines.length; i++){
    if (lines[i].includes('BEGIN CERTIFICATE REQUEST')) {
      isCertReq = true;
      continue;
    }
    if (lines[i].includes('END CERTIFICATE REQUEST')) {
      break;
    }
    if (isCertReq) {
      certReq = certReq + lines[i];
    }
  }

  const domain = '206.189.87.149'
  const rawRes = await fetch('https://api.zerossl.com/certificates?access_key=5ca9f8bf41e16b5c8e677c5e219e482a', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      certificate_domains: domain,
      certificate_csr: certReq
    })
  })
  const res = await rawRes.json()
  console.log(res.validation)

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
    const keySizeSelector = await page.waitForSelector('body > div > div > div > div.columns > div > form > div:nth-child(8) > label:nth-child(3)');
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
    console.log('generateBtn')
    console.log(error)
  }

  try {
    await page.waitForNetworkIdle()
    const csr = await page.waitForSelector('#csr');
    const csrContent = await csr?.evaluate(el => el.value)
    resultArray.push(csrContent);
  } catch (error) {
    await page.screenshot({path: `screenshot/csr_${CN}.png`})
    console.log('csr')
    console.log(error)
  }

  await page.close();
}

function writeToFile(arr) {
  const resultFile = fs.createWriteStream(`result/key_${startIndex}_${endIndex}.txt`);
  resultFile.on('error', function(err) { console.log(err) });
  arr.forEach(function(item) { resultFile.write(item + '\n'); });
  resultFile.end();
}

main()
