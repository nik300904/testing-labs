const assert = require('assert')
const { Builder, Browser } = require('selenium-webdriver')
const PolytechPage = require('./Polytech')
const fs = require('fs')

describe('Тесты Расписания', function() {
    this.timeout(30000)
    let driver
    let polytechPage

    before(async () => {
        driver = new Builder().forBrowser(Browser.EDGE).build()
        polytechPage = new PolytechPage(driver)
        await polytechPage.open()
    })

    after(async () => {
        await driver.quit()
    })

    afterEach(async function() {
        if (this.currentTest.state === 'failed') {
            let testName = this.currentTest.title.replace(/\s+/g, '_')
            let date = new Date().toISOString().replace(/:/g, '-')
            let screenshotName = `${testName}_${date}.png`
            let image = await driver.takeScreenshot()
            fs.writeFileSync(screenshotName, image, 'base64')
        }
    })

    it('Переход на страницу расписания', async () => {
        await polytechPage.clickScheduleButton()
        await driver.sleep(1000)
    })

    it('Открытыие расписания в новой вкладке', async () => {
        await polytechPage.clickView()
        await driver.sleep(1000)

        let handles = await driver.getAllWindowHandles()
        assert.equal(handles.length, 2, "Должна была открыться новая вкладку")
        await driver.switchTo().window(handles[1])
    })

    it('Ввод номера группы и отображение результата', async () => {
        await polytechPage.enterGroupNumber('221-322')
        await driver.sleep(1000)

        let searchResult = await driver.findElement(polytechPage.searchResultLocator)
        let resultText = await searchResult.getText()
        assert.ok(resultText.includes('221-322'), "Не отображается группа")
    })

    it('Открытыие страницы результатов', async () => {
        await polytechPage.clickSearchResult()
        await driver.sleep(3000)
    })
})