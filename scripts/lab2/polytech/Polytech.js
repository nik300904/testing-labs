const { By, until } = require('selenium-webdriver')

class PolytechPage {
    constructor(driver) {
        this.driver = driver
        this.url = 'https://mospolytech.ru/'
        this.scheduleButtonLocator = By.xpath("//a[@class='user-nav__item-link' and @title='Расписание']")
        this.viewOnSiteButtonLocator = By.xpath("//a[@href='https://rasp.dmami.ru/' and @class='btn text-button']")
        this.searchInputLocator = By.xpath("//input[@class='groups']")
        this.searchResultLocator = By.xpath("//div[@id='221-322']")
    }

    async open() {
        await this.driver.get(this.url)
        await this.driver.manage().window().maximize()
    }

    async clickScheduleButton() {
        await this.driver.wait(until.elementLocated(this.scheduleButtonLocator), 6000)
        await this.driver.findElement(this.scheduleButtonLocator).click()
    }

    async clickView() {
        await this.driver.wait(until.elementLocated(this.viewOnSiteButtonLocator), 6000)
        await this.driver.findElement(this.viewOnSiteButtonLocator).click()
    }

    async enterGroupNumber(groupNumber) {
        await this.driver.wait(until.elementLocated(this.searchInputLocator), 6000)
        await this.driver.findElement(this.searchInputLocator).sendKeys(groupNumber)
        await this.driver.sleep(1000)
    }

    async clickSearchResult() {
        await this.driver.wait(until.elementLocated(this.searchResultLocator), 6000)
        await this.driver.findElement(this.searchResultLocator).click()
    }
}

module.exports = PolytechPage