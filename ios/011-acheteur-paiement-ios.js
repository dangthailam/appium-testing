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
    it("Paiement", function (done) {
        _shared.methods.shouldLogin(driver)
            .waitForElementByAccessibilityId("btn-cart", 500)
            .should.elementByAccessibilityId.exist
            .click()
            .waitForElementByXPath("//XCUIElementTypeNavigationBar[@name=\"Basket 2 item\"]", 500)
            .should.eventually.exist
            .elementByXPath("//XCUIElementTypeApplication[@name=\"Vestiaire\"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[2]")
            .should.eventually.exist
            .elementByAccessibilityId("2 item")
            .should.eventually.exist
            .elementByAccessibilityId("Total including taxes:")
            .should.eventually.exist
            .elementByAccessibilityId("COMPLETE MY ORDER")
            .should.eventually.exist
            .click()
            .waitForElementByXPath("//XCUIElementTypeNavigationBar[@name=\"Payment\"]", 500)
            .should.eventually.exist
            .elementByXPath("//XCUIElementTypeOther[@name=\"DELIVERY ADDRESS\"]")
            .should.eventually.exist
            .elementByXPath("//XCUIElementTypeApplication[@name=\"Vestiaire\"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[1]")
            .should.eventually.exist
            .click()
            .waitForElementByXPath("//XCUIElementTypeNavigationBar[@name=\"Delivery addresses\"],500")
            .should.eventually.exist
            .elementByXPath("//XCUIElementTypeApplication[@name=\"Vestiaire\"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[2]")
            .should.eventually.exist
            .elementByAccessibilityId("Set up a new address")
            .should.eventually.exist
            .click()
            .waitForElementByXPath("//XCUIElementTypeNavigationBar[@name=\"Enter address\"]",500)
            .should.eventually.exist
            // Can phai test sau hon phan dien new adresse
            .elementByAccessibilityId("Delivery addresses")
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId("Payment",500)
            .should.eventually.exist
            .click()
            .waitForElementByXPath("//XCUIElementTypeApplication[@name=\"Vestiaire\"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[3]",500)
            .should.eventually.exist
            // Can test sau hon phan choose a collection point
            .elementByXPath("//XCUIElementTypeNavigationBar[@name=\"Collection point delivery\"]")
            .should.eventually.exist
            .elementByAccessibilityId("Payment")
            .should.eventually.exist
            .click()
            .waitForElementByXPath("//XCUIElementTypeOther[@name=\"DISCOUNT\"]",500)
            .should.eventually.exist
            .elementByAccessibilityId("DELETE")
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId("APPLY")
            .should.eventually.exist
            .elementByXPath("//XCUIElementTypeApplication[@name=\"Vestiaire\"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[4]/XCUIElementTypeTextField")
            .should.eventually.exist


            
            .nodeify(done);
    });
});