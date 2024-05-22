const assert = require('assert')
const { allure } = require("allure-mocha/runtime")
const { Builder, Browser } = require('selenium-webdriver')
const SecondPage = require('./second')
const fs = require('fs')

describe('Тесты Расписания', function() {
    this.timeout(30000)
    let driver
    let secondPage
    let logs = []

    function log(message) {
        logs.push(message)
        console.log(message)
    }

    before(async () => {
        driver = new Builder().forBrowser(Browser.FIREFOX).build()
        secondPage = new SecondPage(driver)
        await secondPage.open()
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

    it('Переход на страницу с товарами', async () => {
        await allure.step("Перешел на страницу с товаром", async () => {
            try {
                await secondPage.clickCatalog()
                log("Перешел на страницу с товаром")
                allure.attachment("Log", Buffer.from(logs.join("\n")), "text/plain")
            } catch (error) {
                log(`Ошибка: ${error}`)
                await takeScreenshot(this.test.title.replace(/\s+/g, '_'))
                await allure.step("Шаг провалился", {}, async () => {
                    throw error
                })
            }
            await driver.sleep(1000)
        })
    })

    it('Сортировка продавцов, которые онлайн', async () => {
        await allure.step("Сортировка продавцов, которые онлайн", async () => {
            try {
                await secondPage.turnSellersOnline()
                log("Сортировка продавцов, которые онлайн")
                allure.attachment("Log", Buffer.from(logs.join("\n")), "text/plain")
            } catch (error) {
                log(`Ошибка: ${error}`)
                await takeScreenshot(this.test.title.replace(/\s+/g, '_'))
                await allure.step("Шаг провалился", {}, async () => {
                    throw error
                })
            }
            await driver.sleep(1000)
        })
    })

    it('Переход на профиль пользователя', async () => {
        await allure.step("Переход на профиль пользователя", async () => {
            try {
                await secondPage.clickToSellerProfile()
                log("Переход на профиль пользователя")
                allure.attachment("Log", Buffer.from(logs.join("\n")), "text/plain")
            } catch (error) {
                log(`Ошибка: ${error}`)
                await takeScreenshot(this.test.title.replace(/\s+/g, '_'))
                await allure.step("Шаг провалился", {}, async () => {
                    throw error
                })
            }
            await driver.sleep(1000)
        })
    })

    it('Покупка товара', async () => {
        await allure.step("Покупка товара", async () => {
            try {
                await secondPage.testBuy()
                log("Покупка товара")
                allure.attachment("Log", Buffer.from(logs.join("\n")), "text/plain")
            } catch (error) {
                log(`Ошибка: ${error}`)
                await takeScreenshot(this.test.title.replace(/\s+/g, '_'))
                await allure.step("Шаг провалился", {}, async () => {
                    throw error
                })
            }
            await driver.sleep(1000)
        })
    })
})