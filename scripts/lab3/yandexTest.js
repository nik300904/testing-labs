const assert = require('assert')
const { Builder, Browser } = require('selenium-webdriver')
const YandexPage = require('./yandex')
const fs = require('fs')

describe('Тесты Расписания', function() {
    this.timeout(30000)
    let driver
    let yandexPage
    let firstElement

    before(async () => {
        driver = new Builder().forBrowser(Browser.FIREFOX).build()
        yandexPage = new YandexPage(driver)
        await yandexPage.open()
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

    it('Переход на страницу игровых приставок', async () => {
        await driver.sleep(3489);
        await yandexPage.clickXboxButton();
        await driver.sleep(1000);
    })

    it('Вывод 5 логов', async () => {
        await driver.sleep(500);
        await yandexPage.logFiveProducts();
        await driver.sleep(1000);
    })

    it('Запоминание первого элемента', async () => {
        await driver.sleep(500);
        let element = await yandexPage.rememberFirstElement();
        await driver.sleep(1000);

        firstElement = element;

        console.log(element);

        assert.ok(element, "Не смог прочитать")
    })

    it('Добавление в избранное', async () => {
        await driver.sleep(500);
        await yandexPage.likeProduct()
        await driver.sleep(1000)
    })

    it('Нажатие на избранное', async () => {
        await yandexPage.likeProduct()
    })

    it('Нажатие на панели на избранное и сверка данных', async () => {
        let data = await yandexPage.clickToFavorite()
        await driver.sleep(1000)

        assert.equal(data.price, firstElement.price)
    })

    it('Удаление из избранного', async () => {
        await yandexPage.deleteFromFavorite()
        await driver.sleep(1000)
    })

    it('Обновление страницы', async () => {
        await yandexPage.refreshPage()
    })
})