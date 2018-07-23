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
        _shared.methods.shouldLogin(driver)
            .elementByAccessibilityId("Home")
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId("btn-cart",500)
            .should.elementByAccessibilityId.exist
            .click()
            .waitForElementByXPath("//XCUIElementTypeNavigationBar[@name=\"Basket 2 item\"]",500)
            .should.eventually.exist 
            .elementByXPath("//XCUIElementTypeApplication[@name=\"Vestiaire\"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[1]")
            .should.eventually.exist
            .elementByXPath("//XCUIElementTypeApplication[@name=\"Vestiaire\"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[2]")
            .should.eventually.exist
            .elementByAccessibilityId("2 items")
            .should.eventually.exist
            .elementByAccessibilityId("Total including taxes:")
            .should.eventually.exist
            .elementByAccessibilityId("COMPLETE MY ORDER")
            .should.eventually.exist
            .elementByAccessibilityId("Edit")
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId("Delete A BATHING APE, Cloth ballet flats, 500 €",500)
            .should.eventually.exist
            .click()
            .waitForElementByXPath("(//XCUIElementTypeButton[@name=\"Delete\"])[1]",500)
            .should.eventually.exist
            .click()
            .waitForElementByXPath("//XCUIElementTypeNavigationBar[@name=\"Basket 1 item\"]",500)
            .should.eventually.exist
            .elementByAccessibilityId("1 item")
            .should.eventually.exist
            .nodeify(done);
    });
    it("Ajouter un produit dans le panier", function (done) {
        _shared.methods.shouldLogin(driver)
            .elementByAccessibilityId("Home")
            .should.eventually.exist
            .click()
            .waitForElementByXPath("//XCUIElementTypeApplication[@name=\"Vestiaire\"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[2]/XCUIElementTypeTextField", 500)
            .should.eventually.exist
            .sendKeys(6009688)
            .waitForElementByXPath("//XCUIElementTypeApplication[@name=\"Vestiaire\"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeTable/XCUIElementTypeCell[1]",500)
            .should.eventually.exist
            .elementByAccessibilityId("Vestiaire_Collective.VCProductDetailWrapperView")
            .should.eventually.exist
            .swipe({
                startX: 400,
                startY: 600,
                endX: 200,
                endY: 200,
                duration: 1000
            })
            .elementByAccessibilityId("ADD TO BAG")
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId("bar_notif_confirm",500)
            .should.eventually.exist
            .elementByAccessibilityId("VIEW YOUR BASKET")
            .should.eventually.exist
            .click()
            .waitForElementByXPath("//XCUIElementTypeNavigationBar[@name=\"Basket 2 item\"]",500)
            .should.eventually.exist 
            .elementByXPath("//XCUIElementTypeApplication[@name=\"Vestiaire\"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[2]")
            .should.eventually.exist
            .elementByAccessibilityId("2 item")
            .should.eventually.exist
            .elementByAccessibilityId("Total including taxes:")
            .should.eventually.exist
            .elementByAccessibilityId("COMPLETE MY ORDER")
            .should.eventually.exist
            .nodeify(done);
    });
});