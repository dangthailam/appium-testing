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
    it("Paiment / Moyen de payement - credit card", function (done) {
        driver
            .waitForElementByAccessibilityId("btn-cart", 9000)
            .should.eventually.exist
            .click()
            .sleep(2000)
            .waitForElementByAccessibilityId("Cancel", 9000)
            .should.eventually.exist
            .elementByAccessibilityId('Edit')
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[1]')
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[2]')
            .should.eventually.exist
            .elementByAccessibilityId("2 items")
            .should.eventually.exist
            .elementByAccessibilityId("COMPLETE MY ORDER")
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('Credit card',5000)
            .should.eventually.exist
            .click()
            .sleep(500)
            .swipe({
                startX: 100,
                startY: 600,
                endX: 100,
                endY: 100,
                duration: 800
            })
            .elementByAccessibilityId('COMPLETE MY ORDER')
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('Yes', 5000)
            .should.eventually.exist
            .click()
            // .waitForElementByAccessibilityId('Secured Checkout', 50000)
            // .should.eventually.exist
            // .elementByXPath('//XCUIElementTypeButton[@name="Payment"]')
            // .should.eventually.exist
            // .click()
            // .waitForElementByXPath('//XCUIElementTypeNavigationBar[@name="Payment"]', 5000)
            // .should.eventually.exist
            .nodeify(done);
    });
    it("Paiment / Moyen de payement - paypal", function (done) {
        driver
            .waitForElementByAccessibilityId("btn-cart", 9000)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId("Cancel", 9000)
            .should.eventually.exist
            .elementByAccessibilityId('Edit')
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[1]')
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[2]')
            .should.eventually.exist
            .elementByAccessibilityId("2 items")
            .should.eventually.exist
            .elementByAccessibilityId("COMPLETE MY ORDER")
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeNavigationBar[@name="Payment"]', 2000)
            .should.eventually.exist
            .then(function () {
                return _shared.methods.swipeBottomUpAndCheckIfElementExist(driver, "PayPal", "AccessibilityId");
            })
            .should.eventually.exist
            .click()
            .sleep(500)
            .swipe({
                startX: 100,
                startY: 600,
                endX: 100,
                endY: 100,
                duration: 800
            })
            .elementByAccessibilityId('COMPLETE MY ORDER')
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('Yes', 5000)
            .should.eventually.exist
            .click()
            // .waitForElementByXPath('//XCUIElementTypeOther[@name="Pay with PayPal"]', 50000)
            // .should.eventually.exist
            // .elementByXPath('//XCUIElementTypeButton[@name="Payment"]')
            // .should.eventually.exist
            // .click()
            // .waitForElementByXPath('//XCUIElementTypeNavigationBar[@name="Payment"]', 5000)
            // .should.eventually.exist
            .nodeify(done);
    });
    it("Paiment / Moyen de payement - confinoga card", function (done) {
        driver
            .waitForElementByAccessibilityId("btn-cart", 9000)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId("Cancel", 9000)
            .should.eventually.exist
            .elementByAccessibilityId('Edit')
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[1]')
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[2]')
            .should.eventually.exist
            .elementByAccessibilityId("2 items")
            .should.eventually.exist
            .elementByAccessibilityId("COMPLETE MY ORDER")
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeNavigationBar[@name="Payment"]', 5000)
            .should.eventually.exist
            .then(function () {
                return _shared.methods.swipeBottomUpAndCheckIfElementExist(driver, "Cofinoga Card", "AccessibilityId");
            })
            .should.eventually.exist
            .click()
            .sleep(500)
            .swipe({
                startX: 100,
                startY: 600,
                endX: 100,
                endY: 100,
                duration: 800
            })
            .elementByAccessibilityId('COMPLETE MY ORDER')
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('Yes', 5000)
            .should.eventually.exist
            .click()
            // .waitForElementByXPath('(//XCUIElementTypeStaticText[@name="Payment confirmation"])[2]', 50000)
            // .should.eventually.exist
            // .elementByXPath('//XCUIElementTypeButton[@name="Payment"]')
            // .should.eventually.exist
            // .click()
            // .waitForElementByXPath('//XCUIElementTypeNavigationBar[@name="Payment"]', 2000)
            // .should.eventually.exist
            .nodeify(done);
    });
    it("Paiment / Moyen de payement - 3X payement", function (done) {
        driver
            .waitForElementByAccessibilityId("btn-cart", 9000)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId("Cancel", 9000)
            .should.eventually.exist
            .elementByAccessibilityId('Edit')
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[1]')
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[2]')
            .should.eventually.exist
            .elementByAccessibilityId("2 items")
            .should.eventually.exist
            .elementByAccessibilityId("COMPLETE MY ORDER")
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeNavigationBar[@name="Payment"]', 5000)
            .should.eventually.exist
            .swipe({
                startX: 200,
                startY: 400,
                endX: 100,
                endY: 100,
                duration: 800
            })
            .elementByAccessibilityId('3X Payment free installments')
            .should.eventually.exist
            .click()
            .sleep(500)
            .swipe({
                startX: 100,
                startY: 600,
                endX: 100,
                endY: 100,
                duration: 800
            })
            .elementByAccessibilityId('COMPLETE MY ORDER')
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('Yes', 5000)
            .should.eventually.exist
            .click()
            // .waitForElementByAccessibilityId('Paiement de votre achat en X fois par CB', 50000)
            // .should.eventually.exist
            // .elementByXPath('//XCUIElementTypeButton[@name="Payment"]')
            // .should.eventually.exist
            // .click()
            // .waitForElementByXPath('//XCUIElementTypeNavigationBar[@name="Payment"]', 5000)
            // .should.eventually.exist
            .nodeify(done);
    });
    it("Paiment / Moyen de payement - 4X payement", function (done) {
        driver
            .waitForElementByAccessibilityId("btn-cart", 9000)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId("Cancel", 9000)
            .should.eventually.exist
            .elementByAccessibilityId('Edit')
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[1]')
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[2]')
            .should.eventually.exist
            .elementByAccessibilityId("2 items")
            .should.eventually.exist
            .elementByAccessibilityId("COMPLETE MY ORDER")
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeNavigationBar[@name="Payment"]', 5000)
            .should.eventually.exist
            .swipe({
                startX: 200,
                startY: 400,
                endX: 100,
                endY: 100,
                duration: 800
            })
            .elementByAccessibilityId('4X Payment')
            .should.eventually.exist
            .click()
            .sleep(500)
            .swipe({
                startX: 100,
                startY: 600,
                endX: 100,
                endY: 100,
                duration: 800
            })
            .elementByAccessibilityId('COMPLETE MY ORDER')
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('Yes', 5000)
            .should.eventually.exist
            .click()
            // .waitForElementByAccessibilityId('Paiement de votre achat en X fois par CB', 50000)
            // .should.eventually.exist
            // .elementByXPath('//XCUIElementTypeButton[@name="Payment"]')
            // .should.eventually.exist
            // .click()
            // .waitForElementByXPath('//XCUIElementTypeNavigationBar[@name="Payment"]', 2000)
            // .should.eventually.exist
            .nodeify(done);
    });
});