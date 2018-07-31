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

    it.skip("Ajouter une nouvelle photo", function (done) {
        driver
            .waitForElementByAccessibilityId('Me', 4000)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId("My items", 1000)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId("My items for sale (5)", 500)
            .should.eventually.exist
            .click()
            .waitForElementByXPath("//XCUIElementTypeApplication[@name=\"Vestiaire\"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[1]/XCUIElementTypeImage[1]", 500)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId("like product", 500)
            .should.eventually.exist
            .elementByAccessibilityId("share product")
            .should.eventually.exist
            .elementByAccessibilityId("btn-cart")
            .should.eventually.exist
            .elementByAccessibilityId("My items for sale")
            .should.eventually.exist
            .click()
            .waitForElementByXPath("(//XCUIElementTypeImage[@name=\"arrow-noire-down\"])[1]", 500)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId("Add picture", 500)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId("My items for sale", 500)
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
            .waitForElementByAccessibilityId("add photo sales", 500)
            .should.eventually.exist
            .click()
            .elementByAccessibilityId("Library")
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId("Camera Roll", 500) // Khong truy cap duoc vao camera roll dt
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId("Photo, Landscape, August 08, 2012, 11:55 PM", 500)
            .click()
            .waitForElementByAccessibilityId("CONFIRM", 500)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId("bar_notif_confirm", 500)
            .should.eventually.exist
            .nodeify(done);
    });
    it("Baisse de prix", function (done) {
        var productPrice = 50;
        driver
            .waitForElementByAccessibilityId('Me', 4000)
            .click()
            .elementByAccessibilityId("My items")
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeStaticText[starts-with(@name, "My items for sale")]', 500)
            .should.eventually.exist
            .click()
            .waitForElementByXPath('(//XCUIElementTypeImage[@name="arrow-noire-down"])[1]', 500)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId("Price reduction", 500)
            .should.eventually.exist
            .click()
            .elementByXPath('//XCUIElementTypeStaticText[contains(@name, "On the site:")]')

            .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[1]/XCUIElementTypeTextField[2]')
            .should.eventually.exist
            .sendKeys(0)
            .elementByXPath('//XCUIElementTypeButton[@name="OK"]')
            .click()
            // Check button id "CONFIRM" can not click
            .waitForElementByAccessibilityId('CONFIRM', 2000)
            .isEnabled()
            .should.eventually.be.false
            .sleep(1500)
            .nodeify(done);
    });
    it.skip("Retirer un prod en vente", function (done) {
        driver
            .waitForElementByAccessibilityId('Me', 4000)
            .should.eventually.exist
            .click()
            .elementByAccessibilityId("My items")
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId("My items for sale (5)", 500)
            .should.eventually.exist
            .click()
            .waitForElementByXPath("//XCUIElementTypeApplication[@name=\"Vestiaire\"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeImage", 500)
            .should.eventually.exist
            .elementByAccessibilityId("Remove from sale")
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId("I no longer wish to sell it", 500)
            .should.eventually.exist
            .elementByAccessibilityId("REMOVE THIS ITEM FROM SALE")
            .should.eventually.exist
            .elementByAccessibilityId("I sold the item elsewhere")
            .should.eventually.exist
            .click()
            // Check bouton id "REMOVE THIS ITEM FROM SALE" active
            .waitForElementByAccessibilityId('REMOVE THIS ITEM FROM SALE', 2000)
            .isEnabled()
            .should.eventually.be.false
            .sleep(1500)
            .nodeify(done);
    });
});