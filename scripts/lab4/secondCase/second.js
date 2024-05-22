const { By, until, WebDriver } = require('selenium-webdriver')

class SecondPage {
    constructor(driver) {
        this.driver = driver
        this.url = 'https://funpay.com/'
        this.catalog = By.xpath("//a[text()='Золото']");
        this.online = By.xpath("/html/body/div/div[1]/section/div[2]/div/div[3]/div/div[2]/div[1]/div/div/div/div[1]/div[2]/div[1]/div/form/div[2]/label");
        this.clickToSeller = By.xpath("//a[@data-online='1']");
        this.card = By.xpath("/html/body/div/div[1]/section/div[2]/div/div/div/div[2]/div/div[1]/form/div[1]/div/button/div");
        this.method = By.xpath("//span[text()='Банковская карта RU']");
        this.input = By.xpath("/html/body/div/div[1]/section/div[2]/div/div/div/div[2]/div/div[1]/form/div[2]/div[1]/div/input");
        this.name = By.xpath("/html/body/div/div[1]/section/div[2]/div/div/div/div[2]/div/div[1]/form/div[3]/input");
        this.buy = By.xpath("//button[contains(@class, 'btn') and contains(@class, 'btn-primary') and contains(@class, 'btn-block')]");
    }

    async open() {
        await this.driver.get(this.url)
        await this.driver.manage().window().maximize()
    }

    async clickCatalog() {
        await this.driver.wait(until.elementLocated(this.catalog), 3000)
        await this.driver.findElement(this.catalog).click()
    }

    async turnSellersOnline() {
        await this.driver.wait(until.elementLocated(this.online), 3000)
        let item = await this.driver.findElement(this.online)

        await item.click()
    }

    async clickToSellerProfile() {
        await this.driver.wait(until.elementLocated(this.clickToSeller), 3000)
        let element = await this.driver.findElement(this.clickToSeller)

        await this.driver.executeScript("arguments[0].scrollIntoView(true);", element);

        await this.driver.executeScript("arguments[0].click();", element);
    }

    async testBuy() {
        await this.driver.wait(until.elementLocated(this.card), 3000)
        let element = await this.driver.findElement(this.card)

        await this.driver.executeScript("arguments[0].scrollIntoView(true);", element);

        await this.driver.executeScript("arguments[0].click();", element);

        await this.driver.wait(until.elementLocated(this.method), 3000)
        await this.driver.findElement(this.method).click()

        await this.driver.sleep(1000)

        await this.driver.wait(until.elementLocated(this.input), 3000)
        await this.driver.findElement(this.input).sendKeys("5000")

        await this.driver.wait(until.elementLocated(this.name), 3000)
        await this.driver.findElement(this.name).sendKeys("nik300904")
    
        await this.driver.sleep(1000)
    
        await this.driver.wait(until.elementLocated(this.buy), 3000)
        await this.driver.findElement(this.buy).click()
    }
}

module.exports = SecondPage