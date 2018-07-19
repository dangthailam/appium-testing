require('../setup');

const wd = require("wd"),
    actions = require('../actions'),
    _shared = require('../shared/login-ios');

wd.addPromiseChainMethod('swipe', actions.swipe);

const opts = {
    port: 4723
};

const desired = require('../desired').ios;

describe("Vendeur - Gérer son produit", function () {
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

    it("Ajouter une nouvelle photo", function (done) {
        _shared.login.shouldLogin(driver)
            .elementByAccessibilityId("My items")
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId("My items for sale (5)", 500)
            .should.eventually.exist
            .click()
            .waitForElementByXPath("//XCUIElementTypeApplication[@name=\"Vestiaire\"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[1]/XCUIElementTypeImage[1]", 500)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId("like product",500)
            .should.eventually.exist
            .elementByAccessibilityId("share product")
            .should.eventually.exist
            .elementByAccessibilityId("btn-cart")
            .should.eventually.exist
            .elementByAccessibilityId("My items for sale")
            .should.eventually.exist
            .click()
            .waitForElementByXPath("(//XCUIElementTypeImage[@name=\"arrow-noire-down\"])[1]",500)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId("Add picture",500)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId("My items for sale",500)
            .should.eventually.exist
            .elementByXPath("//XCUIElementTypeApplication[@name=\"Vestiaire\"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeImage")
            .should.eventually.exist
            .elementByAccessibilityId("Add a new photo")
            .should.eventually.exist
            .elementByAccessibilityId("add photo sales")
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId("Camera", 500)
            .should.eventually.exist
            .elementByAccessibilityId("Cancel")
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId("add photo sales",500)
            .should.eventually.exist
            .click()
            .elementByAccessibilityId("Library")
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId("Camera Roll",500) // Khong truy cap duoc vao camera roll dt
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId("Photo, Landscape, August 08, 2012, 11:55 PM", 500)
            .click()
            .waitForElementByAccessibilityId("CONFIRM",500)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId("bar_notif_confirm",500)
            .should.eventually.exist
            .nodeify(done);
    });
    it("Baisse de prix", function (done) {
        _shared.login.shouldLogin(driver)
            .elementByAccessibilityId("My items")
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId("My items for sale (5)",500)
            .should.eventually.exist
            .click()
            .waitForElementByXPath("//XCUIElementTypeApplication[@name=\"Vestiaire\"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeImage",500)
            .should.eventually.exist
            .elementByAccessibilityId("Price reduction")
            .should.eventually.exist
            .click()
            .waitForElementByXPath("//XCUIElementTypeOther[@name=\"Price reduction\"]",500)
            .elementByAccessibilityId("Price reduction")
            .should.eventually.exist
            .elementByXPath("//XCUIElementTypeApplication[@name=\"Vestiaire\"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[1]/XCUIElementTypeTextField[2]")
            .should.eventually.exist
            .sendKeys(1000000)
            // Check button id "CONFIRM" can not click
            .elementByXPath("//XCUIElementTypeApplication[@name=\"Vestiaire\"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[1]/XCUIElementTypeTextField[2]")
            .should.eventually.exist
            .sendKeys(2)
            .elementByXPath("The new price of your item will appear on your item page: 250 € 300 €") // Tim cach viet function de co mot cai gia that lon de test lien tuc
            .should.eventually.exist
            .elementByAccessibilityId("CONFIRM")
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId("bar_notif_confirm",500)
            .should.eventually.exist
            .nodeify(done);
    });
    it("Baisse de prix", function (done) {
        _shared.login.shouldLogin(driver)
            .elementByAccessibilityId("My items")
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId("My items for sale (5)",500)
            .should.eventually.exist
            .click()
            .waitForElementByXPath("//XCUIElementTypeApplication[@name=\"Vestiaire\"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeImage",500)
            .should.eventually.exist
            .elementByAccessibilityId("Remove from sale")
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId("I no longer wish to sell it",500)
            .should.eventually.exist
            .elementByAccessibilityId("REMOVE THIS ITEM FROM SALE")
            .should.eventually.exist
            .elementByAccessibilityId("I sold the item elsewhere")
            .should.eventually.exist
            .click()
            // Check bouton id "REMOVE THIS ITEM FROM SALE" active
            .nodeify(done);
    });
});