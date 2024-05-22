const { By, until, WebDriver } = require('selenium-webdriver')

class firstPage {
    constructor(driver) {
        this.driver = driver
        this.url = 'https://funpay.com/'
        this.catalog = By.xpath("/html/body/div/div[1]/section/div[2]/div/div[2]/div/div/div[2]/div[2]/div[16]/div/div[1]/a");
        this.server = By.xpath("//select[@class='form-control showcase-filter-input']");
        this.option = By.xpath("/html/body/div/div[1]/section/div[2]/div/div[3]/div/div[2]/div[1]/div/div/div/div[1]/div[2]/div[1]/div/form/div[1]/select/option[2]");
        this.sort = By.xpath("//div[contains(@class, 'tc-price') and contains(@class, 'text-right') and contains(@class, 'sort') and contains(@class, 'ascending')]");
    }

    async open() {
        await this.driver.get(this.url)
        await this.driver.manage().window().maximize()
    }

    async clickCatalog() {
        await this.driver.wait(until.elementLocated(this.catalog), 3000)
        await this.driver.findElement(this.catalog).click()
    }

    async changeServer() {
        await this.driver.wait(until.elementLocated(this.server), 3000)
        let item = await this.driver.findElement(this.server)

        let data = await item.getText()

        console.log(data);

        await item.click()

        await this.driver.wait(until.elementLocated(this.option), 3000)

        let option = await this.driver.findElement(this.option)

        let data_option = await item.getText()

        console.log(data_option);

        await option.click()

        return true
    }

    async sortByPrice() {
        await this.driver.wait(until.elementLocated(this.sort), 3000)
        await this.driver.findElement(this.sort).click()
    }
}

module.exports = firstPage