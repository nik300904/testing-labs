const assert = require('assert')
const { allure } = require("allure-mocha/runtime")
const { Builder, Browser } = require('selenium-webdriver')
const FirstPage = require('./first')
const fs = require('fs')

describe('Тесты Расписания', function() {
    this.timeout(30000)
    let driver
    let firstPage
    let logs = []

    function log(message) {
        logs.push(message)
        console.log(message)
    }

    before(async () => {
        driver = new Builder().forBrowser(Browser.FIREFOX).build()
        firstPage = new FirstPage(driver)
        await firstPage.open()
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
                await firstPage.clickCatalog()
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

    it('Смена сервера', async () => {
        await allure.step("Смена сервера", async () => {
            try {
                await firstPage.changeServer();
                log("Поменял игровой сервер")
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

    it('Сортировка товаров по цене', async () => {
        await allure.step("Сортировка товаров по цене", async () => {
            try {
                await firstPage.changeServer();
                log("Отсортировал все товары по цене(убыванию)")
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