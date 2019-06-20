import puppeteer from 'puppeteer'

let browser, page
beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: false,
    slowMo: 80,
    devtools: false,
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

/**
 * An user shall be able to go though the "complete use" of the
 * application, which includes rendering the app, registering
 * a store, managing its resources, requesting to open doors and
 * being able to see a log of requests.
 */
describe('complete use', () => {
  /**
   * Initial page should render normally, with some expected texts
   */
  test( 'renders texts correctly', async () => {
    await page.goto('http://0.0.0.0:3000')

    const h1 = await page.$eval('h1', e => e.innerText)
    const subHeader = await page.$eval('.sub.header', e => e.innerText)
    const button = await page.$eval('button', e => e.innerText)

    expect(h1).toEqual('Welcome to The Cloud Lock')
    expect(subHeader).toEqual("Your store's security matters, that is why we are here to help you ensure that no one without permissions will be opening your doors.")
    expect(button).toEqual('Protect my store')

  }, 16000)

  /**
   * After clicking on register button, an user shall be allowed
   * to enter a name via an input and register his/hers store
   */
  test('should be able to register a store after clicking on register', async () => {
    await page.goto('http://0.0.0.0:3000')
    const button = await page.$('button')

    await button.click()
    const input = await page.$('.modal input')

    const modal = await page.$('.modal')
    expect(modal).toBeTruthy()

    const modalTitle = await page.$eval('.modal .header', e => e.innerText)
    expect(modalTitle).toBe('Register your store')

    await input.click()
    await page.keyboard.press('C')
    await page.keyboard.press('l')
    await page.keyboard.press('a')
    await page.keyboard.press('y')

    const inputValue = await page.$eval('.modal input', e => e.value)
    expect(inputValue).toBe('Clay')

    const registerButton = await page.$('.modal .actions button')

    await registerButton.click()
    await page.waitForNavigation({ waitUntil: 'networkidle0' })

    const title = await page.$eval('h1', e => e.innerText)
    expect(title).toBe('Hello, Clay')

  }, 16000)

  /**
   * After registering a store, if comming back to the application
   * the user needs to be redirected to his/hers stores page and be able
   * to be greeted by its name.
   */
  test('should be able to keep data from local storage after having registed a store', async () => {
    await page.goto('http://0.0.0.0:3000')

    const title = await page.$eval('h1', e => e.innerText)
    expect(title).toBe('Hello, Clay')

  }, 16000)

  /**
   * Opening Doors Modal should allow a user to delete doors,
   * create new ones, modify them and see them appearing on Store's page
   * after selecting an employee.
   */
  test('should be able to manage a stores doors', async () => {
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

    // Should have added other door
    itemWrappers = await page.$$('.item-wrapper')
    expect(itemWrappers.length).toBe(2)

    const doorInput = await page.$$('.item-wrapper .ui.input')
    await doorInput[1].click()

    await page.keyboard.press('B')
    await page.keyboard.press('a')
    await page.keyboard.press('r')

    // Should have changed text on last input
    const newDoorInput = await page.$$('.item-wrapper .ui.input input')
    const newDoorInputValue = await (await newDoorInput[1].getProperty('value')).jsonValue()
    expect(newDoorInputValue).toBe('Bar')

    const saveButton = await page.$('.ui.positive.button')
    await saveButton.click()

    await page.waitForResponse(response => {
      return response.status() === 200
    })

    // Click on first employee to show doors
    await page.$eval('.employees > div:first-child', e => e.click())

    // Should have 2 doors
    const doorList = await page.$$('.doors > div')
    expect(doorList.length).toBe(2)

  }, 16000)

  /**
   * Opening Roles Modal should allow a user to change roles permissions,
   * create new roles, modify them and see them appearing on Employees modal
   * role select options.
   */
  test('should be able to manage a stores roles', async () => {
    await page.goto('http://0.0.0.0:3000')

    const buttons = await page.$$('.customize-buttons button')

    await buttons[1].click()

    const rolesModalTitle = await page.$eval('.modal .header', e => e.innerText)
    expect(rolesModalTitle).toBe('Manage your roles')

    let itemWrappers = await page.$$('.item-wrapper')
    expect(itemWrappers.length).toBe(4)

    // Remove a role
    const deleteButton = await page.$('.ui.button i.remove.icon')
    await deleteButton.click()

    await page.waitFor(500)

    // Should have removed 1 role
    itemWrappers = await page.$$('.item-wrapper')
    expect(itemWrappers.length).toBe(3)

    // Add another role
    const addButton = await page.$('.right.floated.content .ui.button')
    await addButton.click()

    await page.waitFor(500)

    // Should have added other role
    itemWrappers = await page.$$('.item-wrapper')
    expect(itemWrappers.length).toBe(4)

    const roleInput = await page.$$('.item-wrapper .ui.input')
    await roleInput[3].click()

    await page.keyboard.press('T')
    await page.keyboard.press('e')
    await page.keyboard.press('s')
    await page.keyboard.press('t')

    // Should have changed text on last input
    const newRoleInput = await page.$$('.item-wrapper .ui.input input')
    const newRoleInputValue = await (await newRoleInput[3].getProperty('value')).jsonValue()
    expect(newRoleInputValue).toBe('Test')

    // Needs to be able to change a door permission
    const nestedDoorsList = await page.$$('.roles-permission-door-list > div.item')
    const lastItemLastDoorPermisison = nestedDoorsList[nestedDoorsList.length - 1]

    let lastItemLastDoorPermisisonValue = await (await lastItemLastDoorPermisison.getProperty('innerText')).jsonValue()
    expect(lastItemLastDoorPermisisonValue.startsWith('Not allowed')).toBeTruthy()

    await lastItemLastDoorPermisison.click()
    await page.waitFor(500)

    lastItemLastDoorPermisisonValue = await (await lastItemLastDoorPermisison.getProperty('innerText')).jsonValue()
    expect(lastItemLastDoorPermisisonValue.startsWith('Allowed')).toBeTruthy()

    const saveButton = await page.$('.ui.positive.button')
    await saveButton.click()

    await page.waitForResponse(response => {
      return response.status() === 200
    })

    // Open employees modal to check if new role is appearing as option
    await buttons[2].click()

    const employeeRoleSelectList = await page.$$('.employee-list-item .ui.selection.dropdown')
    await employeeRoleSelectList[0].click()

    const employeeRoleSelectOptions = await page.$$('.employee-list-item .ui.visible.selection.dropdown .visible.menu > div.item')
    const lastOptionText = await (await employeeRoleSelectOptions[employeeRoleSelectOptions.length - 1].getProperty('innerText')).jsonValue()
    expect(lastOptionText).toBe('Test')

  }, 20000)

   /**
   * Opening Employees Modal should allow a user to delete, create and modify
   * employees, changing their names and roles.
   */
  test('should be able to manage a stores employees', async () => {
    await page.goto('http://0.0.0.0:3000')

    const buttons = await page.$$('.customize-buttons button')

    await buttons[2].click()

    const employeesModalTitle = await page.$eval('.modal .header', e => e.innerText)
    expect(employeesModalTitle).toBe('Manage your employees')

    let itemWrappers = await page.$$('.item-wrapper')
    expect(itemWrappers.length).toBe(4)

    // Remove a employee
    const deleteButton = await page.$('.ui.button i.remove.icon')
    await deleteButton.click()

    await page.waitFor(500)

    // Should have removed 1 employee
    itemWrappers = await page.$$('.item-wrapper')
    expect(itemWrappers.length).toBe(3)

    // Add another employee
    const addButton = await page.$('.right.floated.content .ui.button')
    await addButton.click()

    await page.waitFor(500)

    // Should have added other employee
    itemWrappers = await page.$$('.item-wrapper')
    expect(itemWrappers.length).toBe(4)

    const employeeInput = await page.$$('.item-wrapper .ui.input')
    await employeeInput[3].click()

    await page.keyboard.press('E')
    await page.keyboard.press('v')
    await page.keyboard.press('a')

    // Should have changed text on last input
    const newEmployeeInput = await page.$$('.item-wrapper .ui.input input')
    const newEmployeeInputValue = await (await newEmployeeInput[3].getProperty('value')).jsonValue()
    expect(newEmployeeInputValue).toBe('Eva')

    // Needs to be able to change an employees
    const rolesDropdownList = await page.$$('.employee-list-item .ui.selection.dropdown')
    const lastDropdown = rolesDropdownList[rolesDropdownList.length - 1]

    let lastDropdownValue = await (await lastDropdown.getProperty('innerText')).jsonValue()
    expect(lastDropdownValue).toBe('Select a role')

    await lastDropdown.click()

    const roleDropdownOptions = await page.$$('.employee-list-item .ui.visible.selection.dropdown .visible.menu > div.item')
    await roleDropdownOptions[0].click()

    lastDropdownValue = await (await lastDropdown.getProperty('innerText')).jsonValue()
    expect(lastDropdownValue).not.toBe('Select a role')

    const saveButton = await page.$('.ui.positive.button')
    await saveButton.click()

    await page.waitForResponse(response => {
      return response.status() === 200
    })

    // Should see Eva (lastDropdownValue) on employees list
    const employeeList = await page.$$('.employees > div')

    const lastEmployeeText = await (await employeeList[employeeList.length - 1].getProperty('innerText')).jsonValue()
    expect(lastEmployeeText).toBe(`Eva (${lastDropdownValue})`)

  }, 16000)

  /**
   * Should be able to click on an employee and try to open doors
   * if it shows that he/she is allowed to open the door, the request
   * needs to be accepted, otherwise, it needs to show that it was rejected.
   * Also, all requests needs to be logged
   */
  test('should be able to request opening doors and see requests on log', async () => {
    await page.goto('http://0.0.0.0:3000')

    // Click on first employee to show doors
    await page.$eval('.employees > div:first-child', e => e.click())

    const doorList = await page.$$('.doors > div')

    // Should have permission for first door but not for the second one
    const firstDoor = doorList[0]
    const firstDoorText = await (await firstDoor.getProperty('innerText')).jsonValue()
    expect(firstDoorText.startsWith('Allowed to open')).toBeTruthy()

    await firstDoor.click()

    await page.waitForResponse(response => {
      return response.status() === 200
    })

    const firstDoorClass = await (await firstDoor.getProperty('className')).jsonValue()
    expect(firstDoorClass).toBe('door open')

    const secondDoor = doorList[1]
    const secondDoorText = await (await secondDoor.getProperty('innerText')).jsonValue()
    expect(secondDoorText.startsWith('Not allowed to open')).toBeTruthy()

    await secondDoor.click()

    await page.waitForResponse(response => {
      return response.status() === 200
    })

    const secondDoorClass = await (await secondDoor.getProperty('className')).jsonValue()
    expect(secondDoorClass).toBe('door blocked')

    // Should have logged two requests, one of them reporting that it was allowed
    // and one of them reporting it was not.
    const logItems = await page.$$('.logs-container > div')
    expect(logItems.length).toBe(2)

    const firstLogItemText = await (await logItems[0].getProperty('innerText')).jsonValue()
    expect(firstLogItemText.indexOf('and his/hers request was accepted')).not.toBe(-1)

    const secondLogItemText = await (await logItems[1].getProperty('innerText')).jsonValue()
    expect(secondLogItemText.indexOf('and his/hers request was not accepted')).not.toBe(-1)

  }, 16000)
})
