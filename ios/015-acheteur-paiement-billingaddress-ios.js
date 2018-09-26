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
            .waitForElementByAccessibilityId("btn-cart", 5000)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId("Cancel", 5000)
            .should.eventually.exist
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
            .click()
            .waitForElementByAccessibilityId('Phone *', 2000)
            .should.eventually.exist
            .waitForElementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[10]/XCUIElementTypeTextField', 2000)
            .should.eventually.exist
            .clear()
            .waitForElementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[10]/XCUIElementTypeTextField', 2000)
            .sendKeys(Date.now() + "\n")
            .waitForElementByAccessibilityId('SAVE ADDRESS', 2000)
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeNavigationBar[@name="Payment"]', 2000)
            .should.eventually.exist
            .nodeify(done);
    });
});