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
    it("Paiment / Adresse de livraison", function (done) {
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
            .then(function () {
                return _shared.methods.swipeBottomUpAndCheckIfElementExist(driver, "BILLING ADDRESS", "AccessibilityId");
            })
            .should.eventually.exist
            .elementByAccessibilityId('arrow-right')
            .should.eventually.exist
            .click()
            .elementByAccessibilityId('Phone *')
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[10]/XCUIElementTypeTextField')
            .should.eventually.exist
            .clear()
            .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[10]/XCUIElementTypeTextField')
            .sendKeys(Date.now() + "\n")
            .elementByAccessibilityId('SAVE ADDRESS')
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeNavigationBar[@name="Payment"]', 2000)
            .should.eventually.exist
            .nodeify(done);
    });
});