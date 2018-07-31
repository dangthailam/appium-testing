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
    it("Paiment / Moyen de payement", function (done) {
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
            .elementByAccessibilityId("COMPLETE MY ORDER")
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeNavigationBar[@name="Payment"]', 2000)
            .should.eventually.exist
            .waitForElementByXPath('//XCUIElementTypeStaticText[@name="MEANS OF PAYMENT"]', 2000)
            .should.eventually.exist
            .elementByAccessibilityId('Credit card')
            .should.eventually.exist
            .elementByAccessibilityId('selected')
            .should.eventually.exist
            .click()
            .elementByAccessibilityId('PayPal')
            .should.eventually.exist
            .elementByXPath('(//XCUIElementTypeImage[@name="unselected"])[1]')
            .should.eventually.exist
            .elementByAccessibilityId('Cofinoga Card')
            .should.eventually.exist
            .elementByXPath('(//XCUIElementTypeImage[@name="unselected"])[2]')
            .should.eventually.exist
            .elementByAccessibilityId('3X Payment')
            .should.eventually.exist
            .elementByXPath('(//XCUIElementTypeImage[@name="unselected"])[3]')
            .should.eventually.exist
            .elementByAccessibilityId('4X Payment')
            .should.eventually.exist
            .elementByXPath('(//XCUIElementTypeImage[@name="unselected"])[4]')
            .should.eventually.exist
            .nodeify(done);
    });
});