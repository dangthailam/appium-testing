require('../setup');

const wd = require("wd"),
    actions = require('../actions'),
    _shared = require('../shared/login-ios');

wd.addPromiseChainMethod('swipe', actions.swipe);

const opts = {
    port: 4723
};

const desired = require('../desired').ios;

describe("Wishlist", function () {
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

    it("Ajouter ou enlever un produit dans my wish list", function (done) {
        _shared.login.shouldLogin(driver)
            .elementByAccessibilityId("Home")
            .should.eventually.exist
            .click()
            .waitForElementByXPath("//XCUIElementTypeApplication[@name=\"Vestiaire\"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeCollectionView/XCUIElementTypeCell[1]/XCUIElementTypeOther/XCUIElementTypeOther",500)
            .swipe({
                startX: 100,
                startY: 600,
                endX: 200,
                endY: 200,
                duration: 800
            })
            .elementByAccessibilityId("Wishlist")
            .then(function (exist) {
                if (exist) {
                    return driver.elementByAccessibilityId("Wishlist")
                    .should.eventually.exist
                    .click()
                    .waitForElementByAccessibilityId("bar_notif_confirm", 500)
                    .should.eventually.exist
                    .hasElementByAccessibilityId("This item has been added your Wish List")
                    .elementByAccessibilityId("This item has been added your Wish List");
                }
                return driver.elementByAccessibilityId("Saved in your wishlist")
                    .elementByAccessibilityId("This item has been removed from your Wish List");
            })
            .should.eventually.exist
            .elementByAccessibilityId("Me")
            .should.eventually.exist
            .click()
            .elementByAccessibilityId("My wishlist")
            .should.eventually.exist
            .click()
            .waitForElementByXPath("//XCUIElementTypeApplication[@name=\"Vestiaire\"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeCollectionView/XCUIElementTypeCell[1]/XCUIElementTypeOther/XCUIElementTypeOther",1800000)
            .should.eventually.exist
            .nodeify(done);
    });
});