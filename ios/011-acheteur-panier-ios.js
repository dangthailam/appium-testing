require('../setup');

const wd = require("wd"),
    actions = require('../actions'),
    _shared = require('../shared/login-ios');

wd.addPromiseChainMethod('swipe', actions.swipe);

const opts = {
    port: 4723
};

const desired = require('../desired').ios;

describe("Panier", function () {
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
    it("Supprimer un produit dans le panier", function (done) {
        _shared.methods.shouldLogin(driver, 'ngoc.le+4@vestiairecollective.com', '002299')
            .sleep(2000)
            .elementByAccessibilityId("btn-cart")
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId("Cancel", 5000)
            .should.eventually.exist
            .elementByAccessibilityId('Edit')
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[1]')
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[2]')
            .should.eventually.exist
            .elementByAccessibilityId("2 items")
            .should.eventually.exist
            .elementByAccessibilityId("Total including taxes:")
            .should.eventually.exist
            .elementByAccessibilityId("COMPLETE MY ORDER")
            .should.eventually.exist
            .elementByAccessibilityId("Edit")
            .should.eventually.exist
            .swipe({
                startX: 300,
                startY: 200,
                endX: 100,
                endY: 200,
                duration: 800
            })
            .waitForElementByAccessibilityId("OK", 5000)
            .should.eventually.exist
            .waitForElementByXPath('(//XCUIElementTypeButton[@name="Delete"])[1]', 500)
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeStaticText[@name="Basket 1 item"]', 500)
            .should.eventually.exist
            .elementByAccessibilityId("1 item")
            .should.eventually.exist
            .nodeify(done);
    });
    it("Ajouter un produit dans le panier", function (done) {
        _shared.methods.searchTestProd(driver, '6009688')
            .swipe({
                startX: 100,
                startY: 300,
                endX: 100,
                endY: 100,
                duration: 800
            })
            .waitForElementByAccessibilityId("ADD TO BAG", 5000)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId("bar_notif_confirm", 3000)
            .should.eventually.exist 
            .waitForElementByAccessibilityId("VIEW YOUR BASKET", 3000)
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeStaticText[@name="Basket 2 items"]', 3000)
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[2]')
            .should.eventually.exist
            .elementByAccessibilityId("2 items")
            .should.eventually.exist
            .elementByAccessibilityId("Total including taxes:")
            .should.eventually.exist
            .elementByAccessibilityId("COMPLETE MY ORDER")
            .should.eventually.exist
            .nodeify(done);
    });
});