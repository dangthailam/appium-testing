require('../setup');

const wd = require("wd"),
    actions = require('../actions'),
    _shared = require('../shared/login-ios');

wd.addPromiseChainMethod('swipe', actions.swipe);

const opts = {
    port: 4723
};

const desired = require('../desired').ios;

describe("Dépôt un article", function () {
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


    it("Dépôt un article / Information", function (done) {
        driver
            .waitForElementByAccessibilityId("Sell", 5000)
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeOther[@name=\"Sell\"]', 5000)
            .should.eventually.exist
            .elementByAccessibilityId("btn-sell")
            .should.eventually.exist
            .elementByAccessibilityId('Resale Calculator')
            .should.eventually.exist
            .elementByAccessibilityId('Calculate the potential resale value of your pre-loved items with our easy to use Resale Calculator.')
            .should.eventually.exist
            .elementByXPath('(//XCUIElementTypeImage[@name="arrow-right"])[1]')
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[2]')
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('Information', 5000)
            .should.eventually.exist
            .click()
            .waitForElementByXPath('(//XCUIElementTypeStaticText[@name="Sub-category"])[1]', 5000)
            .click()
            .waitForElementByAccessibilityId('Handbags', 5000)
            .should.eventually.exist
            .click()
            .waitForElementByXPath('(//XCUIElementTypeStaticText[@name="Material"])[1]', 5000)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('Cotton', 5000)
            .should.eventually.exist
            .click()
            .waitForElementByXPath('(//XCUIElementTypeStaticText[@name="How do I know what the primary material of the item is?"])[2]', 5000)
            .should.eventually.exist
            .elementByAccessibilityId('arrow-noire-up')
            .should.eventually.exist
            .click()
            .waitForElementByXPath('(//XCUIElementTypeStaticText[@name="We advise that you refer to the label detailing the composition of your item."])[1]', 5000)
            .should.eventually.exist
            .waitForElementByAccessibilityId('arrow-noire-down', 5000)
            .click()
            .waitForElementByAccessibilityId('OK', 5000)
            .should.eventually.exist
            .click()
            .waitForElementByXPath('(//XCUIElementTypeStaticText[@name="Colour"])[1]', 5000)
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeStaticText[@name="Anthracite"]', 5000)
            .should.eventually.exist
            .click()
            .waitForElementByXPath('(//XCUIElementTypeStaticText[@name="Printed"])[1]', 5000)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('Leopard', 5000)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('CONFIRM THIS STEP', 5000)
            .isEnabled()
            .should.eventually.be.true
            .elementByAccessibilityId('back')
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('2', 5000)
            .should.eventually.exist
            .nodeify(done);
    });

    it("Dépôt un article / Photos", function (done) {
        driver
            .waitForElementByAccessibilityId("Sell", 5000)
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeOther[@name=\"Sell\"]', 5000)
            .should.eventually.exist
            .elementByAccessibilityId("btn-sell")
            .should.eventually.exist
            .elementByAccessibilityId('Resale Calculator')
            .should.eventually.exist
            .elementByAccessibilityId('Calculate the potential resale value of your pre-loved items with our easy to use Resale Calculator.')
            .should.eventually.exist
            .elementByXPath('(//XCUIElementTypeImage[@name="arrow-right"])[1]')
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[2]')
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('Photos', 5000)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('Main photo', 5000)
            .should.eventually.exist
            .elementByXPath('(//XCUIElementTypeImage[@name="add_more_photo"])[1]')
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('Camera', 5000)
            .isEnabled()
            .should.eventually.be.true
            .elementByAccessibilityId('Library')
            .isEnabled()
            .should.eventually.be.true
            .elementByAccessibilityId('Cancel')
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('2nd photo', 5000)
            .should.eventually.exist
            .elementByXPath('(//XCUIElementTypeImage[@name="add_more_photo"])[1]')
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('Camera', 5000)
            .isEnabled()
            .should.eventually.be.true
            .elementByAccessibilityId('Library')
            .isEnabled()
            .should.eventually.be.true
            .elementByAccessibilityId('Cancel')
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeStaticText[@name="3rd photo (optional)"]', 5000)
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeStaticText[@name="4th photo (optional)"]')
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeStaticText[@name="5th photo (optional)"]')
            .should.eventually.exist
            .swipe({
                startX: 100,
                startY: 300,
                endX: 100,
                endY: 100,
                duration: 800
            })
            .elementByXPath('//XCUIElementTypeOther[@name="More photos (optional) You can add one, two, three or more photos..."]')
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[6]/XCUIElementTypeCollectionView/XCUIElementTypeCell/XCUIElementTypeOther/XCUIElementTypeButton')
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('Camera', 5000)
            .isEnabled()
            .should.eventually.be.true
            .elementByAccessibilityId('Library')
            .isEnabled()
            .should.eventually.be.true
            .elementByAccessibilityId('Cancel')
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('OK', 5000)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('Description', 5000)
            .should.eventually.exist
            .nodeify(done);
    });
    it("Dépôt un article / Description", function (done) {
        driver
            .waitForElementByAccessibilityId("Sell", 5000)
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeOther[@name=\"Sell\"]', 5000)
            .should.eventually.exist
            .elementByAccessibilityId("btn-sell")
            .should.eventually.exist
            .elementByAccessibilityId('Resale Calculator')
            .should.eventually.exist
            .elementByAccessibilityId('Calculate the potential resale value of your pre-loved items with our easy to use Resale Calculator.')
            .should.eventually.exist
            .elementByXPath('(//XCUIElementTypeImage[@name="arrow-right"])[1]')
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[2]')
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('Description', 5000)
            .should.eventually.exist
            .click()
            .waitForElementByXPath('(//XCUIElementTypeStaticText[@name="Measurements"])[1]', 5000)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('Unit', 5000)
            .should.eventually.exist
            .elementByAccessibilityId('Height', 5000)
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther[2]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[2]/XCUIElementTypeTextField')
            .should.eventually.exist
            .sendKeys('20')
            .elementByAccessibilityId('Width')
            .should.eventually.exist
            .sendKeys('30')
            .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther[2]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[3]/XCUIElementTypeTextField')
            .should.eventually.exist
            .elementByAccessibilityId('Depth')
            .should.eventually.exist
            .sendKeys('40')
            .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther[2]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[4]/XCUIElementTypeTextField')
            .should.eventually.exist
            .click()/// Khong the click duoc vao nut OK
            .nodeify(done);
    });
    it("Dépôt un article / Condition & price", function (done) {
        driver
            .waitForElementByAccessibilityId("Sell", 5000)
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeOther[@name=\"Sell\"]', 5000)
            .should.eventually.exist
            .elementByAccessibilityId("btn-sell")
            .should.eventually.exist
            .elementByAccessibilityId('Resale Calculator')
            .should.eventually.exist
            .elementByAccessibilityId('Calculate the potential resale value of your pre-loved items with our easy to use Resale Calculator.')
            .should.eventually.exist
            .elementByXPath('(//XCUIElementTypeImage[@name="arrow-right"])[1]')
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[2]')
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('Condition & price', 5000)
            .should.eventually.exist
            .click()
            .waitForElementByXPath('(//XCUIElementTypeStaticText[@name="Condition"])[1]', 5000)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('Very good condition', 5000)
            .should.eventually.exist
            .elementByXPath('(//XCUIElementTypeImage[@name="arrow-black-down"])[1]')
            .should.eventually.exist
            .click()
            .waitForElementByXPath('(//XCUIElementTypeStaticText[@name="Reasons for refusal"])[1]', 5000)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('Good condition', 5000)
            .should.eventually.exist
            .elementByXPath('(//XCUIElementTypeImage[@name="arrow-black-down"])[2]')
            .should.eventually.exist
            .click()
            .waitForElementByXPath('(//XCUIElementTypeStaticText[@name="Reasons for refusal"])[2]', 5000)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('Fair condition')
            .should.eventually.exist
            .elementByXPath('(//XCUIElementTypeImage[@name="arrow-black-down"])[3]')
            .should.eventually.exist
            .click()
            .waitForElementByXPath('(//XCUIElementTypeStaticText[@name="Reasons for refusal"])[3]', 5000)
            .should.eventually.exist
            .click() /// Khong the click duoc vao nut OK
            .nodeify(done);
    });
    it("Dépôt un article / Seller", function (done) {
        driver
            .waitForElementByAccessibilityId("Sell", 5000)
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeOther[@name=\"Sell\"]', 5000)
            .should.eventually.exist
            .elementByAccessibilityId("btn-sell")
            .should.eventually.exist
            .elementByAccessibilityId('Resale Calculator')
            .should.eventually.exist
            .elementByAccessibilityId('Calculate the potential resale value of your pre-loved items with our easy to use Resale Calculator.')
            .should.eventually.exist
            .elementByXPath('(//XCUIElementTypeImage[@name="arrow-right"])[1]')
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[2]')
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('Seller', 5000)
            .should.eventually.exist
            .click()
            .waitForElementByXPath('(//XCUIElementTypeStaticText[@name="Shipping Item From"])[1]', 5000)
            .should.eventually.exist
            .elementByXPath('(//XCUIElementTypeStaticText[@name="Mobile number"])[2]')
            .should.eventually.exist
            .elementByXPath('(//XCUIElementTypeStaticText[@name="Personal Contact Information"])[2]')
            .should.eventually.exist
            .elementByXPath('(//XCUIElementTypeStaticText[@name="Payments"])[1]')
            .should.eventually.exist
            .elementByAccessibilityId('CONFIRM THIS STEP')
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('Optional information',5000)
            .should.eventually.exist
            .click()
            .waitForElementByXPath('(//XCUIElementTypeStaticText[@name="Vintage"])[1]',5000)
            .should.eventually.exist
            .elementByXPath('(//XCUIElementTypeStaticText[@name="Origin"])[1]')
            .should.eventually.exist
            .elementByXPath('(//XCUIElementTypeStaticText[@name="Invoice"])[1]')
            .should.eventually.exist
            .elementByXPath('(//XCUIElementTypeStaticText[@name="Serial number"])[1]')
            .should.eventually.exist
            .elementByXPath('(//XCUIElementTypeStaticText[@name="Packaging"])[1]')
            .should.eventually.exist
            .elementByXPath('(//XCUIElementTypeStaticText[@name="Test product"])[1]')
            .should.eventually.exist
            .click()
            .waitForElementByXPath('(//XCUIElementTypeStaticText[@name="Test product"])[3]',5000)
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeSwitch[@name="Test product"]')
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('back',5000)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('CONFIRM', 5000)
            .should.eventually.exist
            .isEnabled()
            .should.eventually.be.true
            .nodeify(done);
    });
});