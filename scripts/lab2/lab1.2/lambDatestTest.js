const assert = require('assert');
const { Builder, Browser } = require('selenium-webdriver');
const LambDatest = require('./LambDatest');
const fs = require('fs');

describe('Тесты Todo App', function() {
    this.timeout(30000);
    let driver;
    let lambDatest;

    before(async () => {
        driver = await new Builder().forBrowser(Browser.EDGE).build();
        lambDatest = new LambDatest(driver);
        await lambDatest.open();
    });

    after(async () => {
        await driver.quit();
    });

    afterEach(async function() {
        if (this.currentTest.state === 'failed') {
            const testName = this.currentTest.title.replace(/\s+/g, '_');
            const date = new Date().toISOString().replace(/:/g, '-');
            const screenshotName = `${testName}_${date}.png`;
            const image = await driver.takeScreenshot();
            fs.writeFileSync(screenshotName, image, 'base64');
        }
    });

    it('Проверка отображение заголовка', async () => {
        const title = await lambDatest.getTitle();
        const isTitleDisplayed = await title.isDisplayed();
        assert.ok(isTitleDisplayed, "Не отображается");
    });

    it('Добавление и заверешние элементов', async () => {
        const totalItems = 5;
        let remainingItems = totalItems;

        for (let i = 1; i <= totalItems; i++) {
            await lambDatest.verifyRemainingText(remainingItems, totalItems);
            await lambDatest.checkItemClass(i, "done-false");

            const previousRemaining = remainingItems;
            await lambDatest.clickItem(i);
            remainingItems--;

            await lambDatest.checkItemClass(i, "done-true");
            await lambDatest.verifyRemainingText(remainingItems, totalItems);
            assert.strictEqual(remainingItems, previousRemaining - 1, "Элементы уменьшились на 1");
        }

        const previousTotal = totalItems;
        const previousRemaining = remainingItems;

        await lambDatest.addItem("New Item");
        remainingItems++;
        const newTotal = previousTotal + 1;

        await lambDatest.checkItemClass(6, "done-false");
        await lambDatest.verifyRemainingText(remainingItems, newTotal);
        assert.strictEqual(remainingItems, previousRemaining + 1, "Кол-во оставшихся элементов не увеличилось на 1 после добавления нового элемента");
        assert.strictEqual(newTotal, previousTotal + 1, "Общее кол-во элементов не увеличилось на 1 после добавления нового элемента");

        await lambDatest.clickItem(6);
        remainingItems--;

        await lambDatest.checkItemClass(6, "done-true");
        await lambDatest.verifyRemainingText(remainingItems, newTotal);
        assert.strictEqual(remainingItems, previousRemaining, "Кол-во оставшихся элементов не уменьшилось на 1 после зачёркивания нового элемента");
    });
});
