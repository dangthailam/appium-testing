require('../setup');

const wd = require("wd"),
    Q = require('q'),
    actions = require('../actions'),
    _shared = require('../shared/login-ios');

wd.addPromiseChainMethod('swipe', actions.swipe);

const opts = {
    port: 4723
};

const desired = require('../desired').ios;

describe("Produit page", function () {
    this.timeout(300000);
    let driver;
    let allPassed = true;

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


    it.skip("Recherche un produit", function (done) {
        // _shared.login.shouldLogin(driver)
        driver
            .waitForElementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[2]/XCUIElementTypeTextField', 3000)
            .click()
            .waitForElementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTextField', 2000)
            .should.eventually.exist
            .sendKeys('Dior')
            .elementByXPath('//XCUIElementTypeStaticText[@name="dior "]')
            .should.eventually.exist
            .click()
            .waitForElementByXPath("//XCUIElementTypeApplication[@name='Vestiaire']/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeTabBar", 2000)
            .should.eventually.exist
            .elementByXPath("//XCUIElementTypeApplication[@name='Vestiaire']/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeCollectionView/XCUIElementTypeCell[1]/XCUIElementTypeOther/XCUIElementTypeOther")
            .should.eventually.exist
            .elementByAccessibilityId("Back")
            .should.eventually.exist
            .elementByAccessibilityId("FILTER & SORT")
            .should.eventually.exist
            .nodeify(done);
    });

    it("Filtre", function (done) {
        // _shared.login.shouldLogin(driver)
        driver
            .waitForElementByXPath('//XCUIElementTypeButton[@name="Me"]', 5000)
            .then(function () {
                return _shared.methods.swipeBottomUpAndCheckIfElementExist(driver, "SEE ALL NEW ITEMS", "AccessibilityId");
            })
            .click()
            .waitForElementByAccessibilityId("New items", 5000)
            .should.eventually.exist
            .elementByAccessibilityId("Back")
            .should.eventually.exist
            .elementByAccessibilityId("btn-cart")
            .should.eventually.exist
            .elementByAccessibilityId("FILTER & SORT")
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId("Woman categories", 5000)
            .should.eventually.exist
            .click()
            .elementByAccessibilityId("Bags")
            .should.eventually.exist
            .elementByXPath('(//XCUIElementTypeImage[@name="arrow_down_categories"])[2]')
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('Handbags', 5000)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId("CONFIRM", 5000)
            .click()
            .then(function () {
                return _shared.methods.swipeBottomUpAndCheckIfElementExist(driver, "//XCUIElementTypeSwitch[starts-with(@name, 'Ready to ship  Items shipped within 48 hours')]", "XPath");
            })
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeButton[starts-with(@name, "SEE")]', 5000)
            .should.eventually.exist
            .click()
            .waitForElementByXPath("//XCUIElementTypeApplication[@name='Vestiaire']/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeCollectionView/XCUIElementTypeCell[1]/XCUIElementTypeOther/XCUIElementTypeOther", 5000)
            .should.eventually.exist
            .elementByAccessibilityId("ALERT")
            .should.eventually.exist
            .elementByAccessibilityId("FILTER (2)")
            .should.eventually.exist
            // console.log ("Vérification la page produit retourne au produit list à l'endroit de produit")
            .swipe({
                startX: 200,
                startY: 600,
                endX: 200,
                endY: 200,
                duration: 1000
            })
            .elementByXPath(`//XCUIElementTypeCollectionView/XCUIElementTypeCell[@y > 0][1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeStaticText`)
            .getValue()
            .then(function(productName) {
                return driver.elementByXPath(`//XCUIElementTypeStaticText[@name="` + productName + `"]`)
                    .click()
                    .waitForElementByXPath(`//XCUIElementTypeButton[@name="New items"]`, 5000)
                    .click()
                    .hasElementByXPath(`//XCUIElementTypeStaticText[@name="` + productName + `"]`);
            })
            .should.eventually.be.true
            .sleep(1000)
            .nodeify(done);
    });
});