require('../setup');

const wd = require("wd"),
    Q = require('q'),
    actions = require('../actions'),
    _shared = require('../shared/login-ios');

wd.addPromiseChainMethod('swipe', actions.swipe);

const opts = {
    port: 4723
};

const desired = require('../desired').ios;

describe("Produit page - créer une alerte", function () {
    this.timeout(300000);
    let driver;
    let allPassed = true;

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
    it("Produit page - Description", function (done) {
        driver.sleep(5000)
            .hasElementByAccessibilityId('I UNDERSTOOD')
            .then(function (exist) {
                if (exist) {
                    return driver.waitForElementByAccessibilityId('I UNDERSTOOD', 5000)
                        .should.eventually.exist
                        .elementByAccessibilityId('Later')
                        .should.eventually.exist
                        .click()
                }
                else
                    return driver;
            })

            .hasElementByAccessibilityId('Allow')
            .then(function (exist) {
                if (exist) {
                    return driver.waitForElementByAccessibilityId('Allow', 5000)
                        .should.eventually.exist
                        .elementByAccessibilityId('Don’t Allow')
                        .should.eventually.exist
                        .click();
                }
                else
                    return driver;
            })
            .waitForElementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeCollectionView/XCUIElementTypeCell[1]/XCUIElementTypeOther/XCUIElementTypeOther', 5000)
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeTable/XCUIElementTypeCell[1]', 5000)
            .should.eventually.exist
            .swipe({
                startX: 200,
                startY: 400,
                endX: 100,
                endY: 100,
                duration: 800
            })
            .elementByAccessibilityId('MORE DESCRIPTION')
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeOther[@name="Product details"]', 5000)
            .should.eventually.exist
            .hasElementByAccessibilityId('TRANSLATE')
            .then(function (exist) {
                if (exist)
                    return driver.elementByAccessibilityId('TRANSLATE')
                        .isEnabled()
                        .should.eventually.to.be.true
                        .elementByAccessibilityId('Details')
                        .should.eventually.exist

                else
                    return driver
                        .elementByAccessibilityId('Details')
                        .should.eventually.exist;
            })
            .swipe({
                startX: 200,
                startY: 400,
                endX: 100,
                endY: 100,
                duration: 800
            })
            .elementByAccessibilityId('Category')
            .should.eventually.exist
            .elementByAccessibilityId('Condition')
            .should.eventually.exist
            .elementByAccessibilityId('bulle info')
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('Very good condition', 5000)
            .should.eventually.exist
            .elementByAccessibilityId('Product details')
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('Close', 5000)
            .should.eventually.exist
            .click()
            .sleep(500)
            .swipe({
                startX: 200,
                startY: 400,
                endX: 200,
                endY: 100,
                duration: 800
            })
            .hasElementByAccessibilityId('Wishlist')
            .then(function (exist) {
                if (exist)
                    return driver.elementByAccessibilityId('Wishlist')
                        .should.eventually.exist
                        .click()
                        .waitForElementByAccessibilityId('Saved in your wishlist', 5000)
                        .should.eventually.exist;

                else
                    return driver
                        .elementByAccessibilityId('Saved in your wishlist')
                        .should.eventually.exist
                        .click()
                        .waitForElementByAccessibilityId('Wishlist', 5000)
                        .should.eventually.exist;
            })
            .hasElementByAccessibilityId('Price reductions')
            .then(function (exist) {
                if (exist)
                    return driver.elementByAccessibilityId('Price reductions')
                        .should.eventually.exist
                        .click()
                        .waitForElementByAccessibilityId('Price reduction updates', 5000)
                        .should.eventually.exist;

                else
                    return driver
                        .elementByAccessibilityId('Price reduction updates')
                        .should.eventually.exist
                        .click()
                        .waitForElementByAccessibilityId('Price reductions', 5000)
                        .should.eventually.exist;
            })
            .click()
            .sleep(500)
            .hasElementByAccessibilityId('You unsubscribed from price reductions alerts on this item')
            .then(function (exist) {
                if (exist)
                    return driver.elementByAccessibilityId('You unsubscribed from price reductions alerts on this item')
                return driver
                    .elementByAccessibilityId('You subscribed from price reductions alerts on this item')
            })
            .elementByAccessibilityId('Create an alert')
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeOther[@name="Create an alert"]', 5000)
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeStaticText[@name="Color"]')
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeStaticText[@name="Material"]')
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeOther[@name="Model"]')
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('Close', 5000)
            .should.eventually.exist
            .click()
            .swipe({
                startX: 200,
                startY: 400,
                endX: 100,
                endY: 100,
                duration: 800
            })
            .elementByAccessibilityId('Create an alert')
            .should.eventually.exist
            .click()
            // .waitForElementByAccessibilityId('SAVE MY ALERT', 5000)
            .waitForElementByXPath('//XCUIElementTypeButton[@name="SAVE MY ALERT"]',5000)
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeStaticText[@name="I would like to receive my alert:"]', 5000)
            .should.eventually.exist
            .elementByAccessibilityId('SAVE MY ALERT')
            .should.eventually.exist
            .click()
            .sleep(1000)
            .hasElementByAccessibilityId('bar_notif_error')
            .then(function (exist) {
                if (exist)
                    return driver.elementByAccessibilityId('bar_notif_error')
                        .should.eventually.exist
                        .waitForElementByAccessibilityId('You have already created this alert.', 5000)
                        .should.eventually.exist;

                else
                    return driver.elementByAccessibilityId('bar_notif_confirm')
                        .should.eventually.exist;
            })
            .nodeify(done);
    });
});