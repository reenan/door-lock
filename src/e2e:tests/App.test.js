import puppeteer from 'puppeteer'

let browser, page
beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: false,
    slowMo: 80,
    devtools: true,
  })
})

beforeEach (async () => {
  page = await browser.newPage()
})

afterEach (async () => {
  await page.close()
})

afterAll(() => {
  browser.close()
})

describe('init correctly', () => {
  test( 'renders texts correctly', async () => {
    await page.goto('http://0.0.0.0:3000')
    
    const h1 = await page.$eval('h1', e => e.innerText)
    const subHeader = await page.$eval('.sub.header', e => e.innerText)
    const button = await page.$eval('button', e => e.innerText)

    expect(h1).toEqual('Welcome to The Cloud Lock')
    expect(subHeader).toEqual("Your store's security matters, that is why we are here to help you ensure that no one without permissions will be opening your doors.")
    expect(button).toEqual('Protect my store')

  }, 16000)

  test('should open register modal on button click', async () => {
    await page.goto('http://0.0.0.0:3000')
    const button = await page.$('button')

    await button.click()

    const modal = await page.$('.modal')
    expect(modal).toBeTruthy()

    const modalTitle = await page.$eval('.modal .header', e => e.innerText)
    expect(modalTitle).toBe('Register your store')
  }, 16000)

  test('should be able to add a store name via input', async () => {
    await page.goto('http://0.0.0.0:3000')
    const button = await page.$('button')

    await button.click()
    const input = await page.$('.modal input')

    await input.click()
    await page.keyboard.press('C')
    await page.keyboard.press('l')
    await page.keyboard.press('a')
    await page.keyboard.press('y')
    
    const inputValue = await page.$eval('.modal input', e => e.value)
    expect(inputValue).toBe('Clay')
  }, 16000)

  test('should be able to register a store after clicking on register', async () => {
    await page.goto('http://0.0.0.0:3000')
    const button = await page.$('button')

    await button.click()
    const input = await page.$('.modal input')

    await input.click()
    await page.keyboard.press('C')
    await page.keyboard.press('l')
    await page.keyboard.press('a')
    await page.keyboard.press('y')
    
    const registerButton = await page.$('.modal .actions button')

    await registerButton.click()
    await page.waitForNavigation({ waitUntil: 'networkidle0' })

    const title = await page.$eval('h1', e => e.innerText)
    expect(title).toBe('Hello, Clay')

  }, 16000)

  test('should be able to keep data from local storage after having registed a store', async () => {
    // Created data on local storage on previous test
    await page.goto('http://0.0.0.0:3000')

    const title = await page.$eval('h1', e => e.innerText)
    expect(title).toBe('Hello, Clay')

  }, 16000)

  test('should be able to manage a stores doors', async () => {
    // Created data on local storage on previous test
    await page.goto('http://0.0.0.0:3000')

    const buttons = await page.$$('.customize-buttons button')

    await buttons[0].click()

    const doorsModalTitle = await page.$eval('.modal .header', e => e.innerText)
    expect(doorsModalTitle).toBe('Manage your doors')

    let itemWrappers = await page.$$('.item-wrapper')
    expect(itemWrappers.length).toBe(2)

    // Remove a door
    const deleteButton = await page.$('.ui.button i.remove.icon')
    await deleteButton.click()

    await page.waitFor(500)

    // Should have removed 1 door
    itemWrappers = await page.$$('.item-wrapper')
    expect(itemWrappers.length).toBe(1)

    // Add another door
    const addButton = await page.$('.right.floated.content .ui.button')
    await addButton.click()

    await page.waitFor(500)

    // Should added other door
    itemWrappers = await page.$$('.item-wrapper')
    expect(itemWrappers.length).toBe(2)

    const doorInput = await page.$$('.item-wrapper .ui.input')
    await doorInput[1].click()

    await page.keyboard.press('H')
    await page.keyboard.press('i')

    // Should have changed text on last input
    const newDoorInput = await page.$$('.item-wrapper .ui.input input')
    const newDoorInputValue = await (await newDoorInput[1].getProperty('value')).jsonValue()
    expect(newDoorInputValue).toBe('Hi')

    const saveButton = await page.$('.ui.positive.button')
    await saveButton.click()

    // Click on first employee to show doors
    await page.$eval('.employees > div:first-child', e => e.click())

    // Should have 2 doors
    const doorList = await page.$$('.doors > div')
    expect(doorList.length).toBe(2)

  }, 16000)
})
