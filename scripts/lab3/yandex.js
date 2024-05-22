const { By, until, WebDriver } = require('selenium-webdriver')

class YandexPage {
    constructor(driver) {
        this.driver = driver
        this.url = 'https://market.yandex.ru'
        this.catalog = By.xpath("//button[contains(@class, '_30-fz') and contains(@class, 'button-focus-ring') and contains(@class, 'Hkr1q') and contains(@class, '_1pHod') and contains(@class, '_2rdh3') and contains(@class, '_3rbM-')]");
        this.xboxButtonHover = By.xpath("//a[contains(@class, '_3yHCR') and .//span[text()='Все для гейминга']]");
        this.xboxButton = By.xpath("//a[contains(@class, '_2re3U') and contains(@class, 'ltlqD') and contains(@class, '_2TBT0') and text() = 'Игровые приставки']")
        this.products = By.xpath("//div[@class='m4M-1']");
        this.whiteHeart = By.xpath("//button[@class='_2VECW']");
        this.redHeart = By.xpath("//button[@class='_2VECW']");
        this.price = By.xpath("//span[@class='_1ArMm']");
        this.notification = By.xpath("//a[contains(@class, '_2wiey') and contains(@class, '_2rQlS') and contains(@class, 'r_nt5')]");
        this.favorite = By.xpath("//div[contains(@class, '_1Uhd-') and text()='Избранное']");
        this.productFavorite = By.xpath("//h3[contains(@class, 'G_TNq') and contains(@class, '_2SUA6') and contains(@class, '_33utW') and contains(@class, '_13aK2') and contains(@class, '_2a1rW') and contains(@class, '_1A5yJ')]");
        this.priceFavorite = By.xpath("//h3[contains(@class, 'G_TNq') and contains(@class, '_2SUA6') and contains(@class, '_33utW') and contains(@class, '_13aK2') and contains(@class, '_2a1rW') and contains(@class, '_1A5yJ')]");
        this.notificationDelete = By.xpath("//div[contains(@class, '_3RJHd') and contains(@class, '_2rQlS')]");
    }

    async open() {
        await this.driver.get(this.url)
        await this.driver.manage().window().maximize()
    }

    async clickXboxButton() {
        await this.driver.wait(until.elementLocated(this.catalog), 3000)
        await this.driver.findElement(this.catalog).click()

        await this.driver.wait(until.elementLocated(this.xboxButtonHover), 6000)

        let xboxButtonHover = await this.driver.findElement(this.xboxButtonHover)

        let actions = this.driver.actions({async: true});
        await actions.move({origin: xboxButtonHover}).perform();

        await this.driver.wait(until.elementLocated(this.xboxButton), 6000)

        let xbox = await this.driver.findElements(this.xboxButton)

        await xbox[1].click()
    }

    async logFiveProducts() {
        await this.driver.wait(until.elementLocated(this.products), 6000)
        let products = await this.driver.findElements(this.products);

        for (let i = 0; i < Math.min(products.length, 5); i++) {
            let productName = await products[i].getText();
            console.log(`Product ${i + 1}: ${productName}`);
        }
    }

    async rememberFirstElement() {
        await this.driver.wait(until.elementLocated(this.products), 6000)

        let products = await this.driver.findElements(this.products); 
        // Беру второй т.к. у первого элемента нету кнопки сердца для добавление в избранное
        let firstProductName = await products[2].getText();

        await this.driver.wait(until.elementLocated(this.price), 6000)

        let price = await this.driver.findElements(this.price);
        let firstProductPrice = await price[2].getText();

        await this.driver.sleep(1000)

        return { titname: firstProductName, price: firstProductPrice }
    }

    async likeProduct() {
        // await this.driver.sleep(100000)
        await this.driver.wait(until.elementLocated(this.whiteHeart), 6000)
        let elems = await this.driver.findElements(this.whiteHeart)

        let elem = elems[2]

        await this.driver.executeScript("arguments[0].click();", elem)

        // Если тут не вылетит ошибка, значит код сработал как надо
        await this.driver.wait(until.elementLocated(this.notification), 3000);
    }


    async clickToFavorite() {
        await this.driver.wait(until.elementLocated(this.favorite), 6000)
        await this.driver.findElement(this.favorite).click()

        await this.driver.wait(until.elementLocated(this.productFavorite), 6000)

        let product = await this.driver.findElement(this.productFavorite); 

        let productName = await product.getText();
        console.log(productName);

        await this.driver.wait(until.elementLocated(this.price), 6000)

        let price = await this.driver.findElement(this.price); 

        let priceData = await price.getText();
        console.log(price);

        await this.driver.sleep(10000)

        return { titname: productName, price: priceData }
        // await
    }

    async deleteFromFavorite() {
        await this.driver.wait(until.elementLocated(this.redHeart), 6000)
        await this.driver.findElement(this.redHeart).click()

        // Если тут не вылетит ошибка, значит код сработал как надо
        await this.driver.wait(until.elementLocated(this.notificationDelete), 6000)
    }

    async refreshPage() {
        await this.driver.navigate().refresh();
    }
}

module.exports = YandexPage