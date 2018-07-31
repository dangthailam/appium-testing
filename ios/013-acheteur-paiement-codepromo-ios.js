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
    it("Paiement / Code promotion", function (done) {
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
            .waitForElementByXPath('//XCUIElementTypeOther[@name="DISCOUNT"]', 2000)
            .should.eventually.exist
            .hasElementByAccessibilityId('DELETE')
            .then(function (exist) {
                if (exist) {
                    return driver.elementByAccessibilityId('DELETE')
                        .should.eventually.exist
                        .click()
                        .waitForElementByAccessibilityId("APPLY",2000)
                        .should.eventually.exist;
                }
                else
                    return driver.elementByAccessibilityId("APPLY")
                        .should.eventually.exist;
            })
            .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[4]/XCUIElementTypeTextField')
            .should.eventually.exist
            //code invalide
            .sendKeys('AABBCCDD')
            .sleep(500)
            .elementByAccessibilityId("APPLY")
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('bar_notif_error', 3000)
            .should.eventually.exist
            //code expiré
            .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[4]/XCUIElementTypeTextField')
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('Clear text',1000)
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[4]/XCUIElementTypeTextField', 500)
            .should.eventually.exist
            .sendKeys('ELIT')
            .sleep(500)
            .elementByAccessibilityId("APPLY")
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('bar_notif_error', 3000)
            .should.eventually.exist
            //code article non compris
            .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[4]/XCUIElementTypeTextField')
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId("Clear text",1000)
            .should.eventually.exist
            .click()
            .waitForElementByXPath("//XCUIElementTypeApplication[@name=\"Vestiaire\"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[4]/XCUIElementTypeTextField", 500)
            .should.eventually.exist
            .sendKeys("09091989")
            .sleep(500)
            .elementByAccessibilityId("APPLY")
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('bar_notif_error', 3000)
            .should.eventually.exist
            //code montant minimum non atteint
            .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[4]/XCUIElementTypeTextField')
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId("Clear text",1000)
            .should.eventually.exist
            .click()
            .waitForElementByXPath("//XCUIElementTypeApplication[@name=\"Vestiaire\"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[4]/XCUIElementTypeTextField", 500)
            .should.eventually.exist
            .sendKeys("19891989")
            .sleep(500)
            .elementByAccessibilityId("APPLY")
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('bar_notif_error', 3000)
            .should.eventually.exist
            // code valide
            .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[4]/XCUIElementTypeTextField')
            .should.eventually.exist
            .click()
            .elementByAccessibilityId("Clear text")
            .should.eventually.exist
            .click()
            .waitForElementByXPath("//XCUIElementTypeApplication[@name=\"Vestiaire\"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[4]/XCUIElementTypeTextField", 500)
            .should.eventually.exist
            .sendKeys("09051989")
            .sleep(500)
            .elementByAccessibilityId("APPLY")
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('bar_notif_confirm', 3000)
            .should.eventually.exist
            .nodeify(done);
    });
});