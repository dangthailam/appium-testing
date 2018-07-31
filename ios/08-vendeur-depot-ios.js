require('../setup');

const wd = require("wd"),
    actions = require('../actions'),
    _shared = require('../shared/login-ios');

wd.addPromiseChainMethod('swipe', actions.swipe);

const opts = {
    port: 4723
};

const desired = require('../desired').ios;

describe("Vendeur - Dépôt produit", function() {
    this.timeout(300000);
    let driver;
    let allPassed = false;

    before(function() {
        driver = wd.promiseChainRemote(opts);
        require("../logging").configure(driver);
    });

    after(function() {
        if (!allPassed) {
            console.log("all tests passed");
        }
    });

    beforeEach(function() {
        return driver.init(desired);
    });

    afterEach(function() {
        allPassed = allPassed && this.currentTest.state === 'passed';
        return driver.quit();
    });

    it("Dépôt un article OK", function(done) {
        driver
            .waitForElementByAccessibilityId("Sell",1000)
            .should.eventually.exist
            .click()
            .waitForElementByXPath("//XCUIElementTypeOther[@name=\"Sell\"]", 500)
            .should.eventually.exist
            .elementByAccessibilityId("btn-sell")
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId("Women", 500)
            .should.eventually.exist
            .click()
            .waitForElementByXPath("(//XCUIElementTypeStaticText[@name=\"Bags\"])[2]", 500)
            .should.eventually.exist
            .click()
            .elementByXPath("(//XCUIElementTypeStaticText[@name=\"Clutch bags\"])[2]")
            .should.eventually.exist
            .elementByXPath("(//XCUIElementTypeStaticText[@name=\"Backpacks\"])[2]")
            .should.eventually.exist
            .elementByXPath("(//XCUIElementTypeStaticText[@name=\"Travel bags\"])[2]")
            .should.eventually.exist
            .elementByXPath("(//XCUIElementTypeStaticText[@name=\"Handbags\"])[2]")
            .should.eventually.exist
            .click()
            // Search marque thi ko tim duoc element
            .nodeify(done);
    });
});