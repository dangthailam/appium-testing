require('../setup');

const wd = require("wd"),
    actions = require('../actions'),
    _shared = require('../shared/login-ios');

wd.addPromiseChainMethod('swipe', actions.swipe);

const opts = {
    port: 4723
};

const desired = require('../desired').ios;

describe("Paiement", function () {
    this.timeout(300000);
    let driver;
    let allPassed = false;

    before(function () {
        driver = wd.promiseChainRemote(opts);
        require("../logging").configure(driver);
    });

    after(function () {
        if (!allPassed) {
            console.log("all tests passed");
        }
    });

    beforeEach(function () {
        return driver.init(desired);
    });

    afterEach(function () {
        allPassed = allPassed && this.currentTest.state === 'passed';
        return driver.quit();
    });
    it("Paiment / Valider le paiement", function (done) {
        _shared.methods.shouldLogin(driver, 'ngoc.le+4@vestiairecollective.com', '002299')
            // driver.sleep(500)
            .waitForElementByAccessibilityId("btn-cart", 2000)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId("Cancel", 500)
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeStaticText[@name="Basket 2 items"]')
            .should.eventually.exist
            .elementByAccessibilityId('Edit')
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[1]')
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[2]')
            .should.eventually.exist
            .elementByAccessibilityId("2 items")
            .should.eventually.exist
            .waitForElementByXPath('//XCUIElementTypeStaticText[starts-with(@name, "65 €")]', 1000)
            .then(function (element) {
                return element.getAttribute('value');
            })
            .then(function (value) {
                var productPrice1 = parseFloat(value.substring('65 €'.length, value.length - 2));
                console.log(productPrice1);
                return driver
                    .sleep(500);
            })
            .waitForElementByXPath('//XCUIElementTypeStaticText[starts-with(@name, "500 €")]', 1000)
            .then(function (element) {
                return element.getAttribute('value');
            })
            .then(function (value) {
                var productPrice2 = parseFloat(value.substring('500 €'.length, value.length - 2)); // Tai sao van may 500 € ma ko phai la 500
                console.log(productPrice2);
                return driver
                    .sleep(500);
            })
            .elementByAccessibilityId('2 items')
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeStaticText[starts-with(@name="565 €")]')
            .then(function (element) {
                return element.getAttribute('value');
            })
            .then(function (value) {
                var productTwoPrice = parseFloat(value.substring('565 €'.length, value.length - 2));
                console.log(productTwoPrice);
                return driver
                    .sleep(500);
            })
            .elementByXPath('//XCUIElementTypeStaticText[@name="8,90 €"]')
            .then(function (element) {
                return element.getAttribute('value');
            })
            .then(function (value) {
                var taxePrice = parseFloat(value.substring('8,90 €'.length, value.length - 2));
                console.log(taxePrice);
                return driver
                    .sleep(500);
            })
            .elementByAccessibilityId('Total including taxes:')
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeStaticText[starts-with(@name="573,90 €"]')
            .then(function (element) {
                return element.getAttribute('value');
            })
            .then(function (value) {
                var productTotalPrice = parseFloat(value.substring('573,90 €'.length, value.length - 2));
                console.log(productTotalPrice);
                return driver
                    .sleep(500);
            })
            .elementByAccessibilityId("COMPLETE MY ORDER")
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeNavigationBar[@name="Payment"]', 2000)
            .should.eventually.exist
            .then(function () {
                return _shared.methods.swipeBottomUpAndCheckIfElementExist(driver, "COMPLETE MY ORDER", "AccessibilityId");
            })
            // Stop here
            .nodeify(done);
    });
});