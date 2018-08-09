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
        _shared.methods.verifyLoginState(driver)
            .elementByAccessibilityId("Sell")
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeOther[@name=\"Sell\"]', 2000)
            .should.eventually.exist
            .elementByAccessibilityId("btn-sell")
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('Calculate the potential resale value of your pre-loved items with our easy to use Resale Calculator.', 2000)
            .should.eventually.exist
            .elementByAccessibilityId('Resale Calculator')
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[2]')
            .should.eventually.exist
            .elementByXPath('(//XCUIElementTypeImage[@name="arrow-right"])[1]')
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('1', 2000)
            .should.eventually.exist
            .elementByAccessibilityId('Information')
            .should.eventually.exist
            .elementByXPath('(//XCUIElementTypeStaticText[@name="Sub-category"])[1]')
            .click()
            .waitForElementByAccessibilityId('Handbags', 2000)
            .should.eventually.exist
            .click()
            .waitForElementByXPath('(//XCUIElementTypeStaticText[@name="Material"])[1]', 2000)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('Cotton', 2000)
            .should.eventually.exist
            .click()
            .waitForElementByXPath('(//XCUIElementTypeStaticText[@name="How do I know what the primary material of the item is?"])[2]', 2000)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('arrow-noire-down', 2000)
            .click()
            .waitForElementByAccessibilityId('OK', 2000)
            .should.eventually.exist
            .click()
            .waitForElementByXPath('(//XCUIElementTypeStaticText[@name="Colour"])[1]', 2000)
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeStaticText[@name="Anthracite"]', 2000)
            .should.eventually.exist
            .click()
            .waitForElementByXPath('(//XCUIElementTypeStaticText[@name="Printed"])[1]', 2000)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('Leopard', 2000)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('OK', 2000)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('CONFIRM THIS STEP')
            .isEnabled()
            .should.eventually.be.true
            .elementByAccessibilityId('back')
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('2', 2000)
            .should.eventually.exist
            .nodeify(done);
    });

    it.skip("Dépôt un article / Photos", function (done) {
        driver.sleep(500)
            .elementByAccessibilityId("Sell")
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeOther[@name=\"Sell\"]', 2000)
            .should.eventually.exist
            .elementByAccessibilityId("btn-sell")
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('Calculate the potential resale value of your pre-loved items with our easy to use Resale Calculator.', 2000)
            .should.eventually.exist
            .elementByAccessibilityId('Resale Calculator')
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[2]')
            .should.eventually.exist
            .elementByXPath('(//XCUIElementTypeImage[@name="arrow-right"])[1]')
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('2', 2000)
            .should.eventually.exist
            .elementByAccessibilityId('Photos')
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('Main photo', 2000)
            .should.eventually.exist
            .elementByXPath('(//XCUIElementTypeImage[@name="add_more_photo"])[1]')
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('Camera', 2000)
            .isEnabled()
            .should.eventually.be.true
            .elementByAccessibilityId('Library')
            .isEnabled()
            .should.eventually.be.true
            .elementByAccessibilityId('Cancel')
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('2nd photo', 2000)
            .should.eventually.exist
            .elementByXPath('(//XCUIElementTypeImage[@name="add_more_photo"])[1]')
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('Camera', 2000)
            .isEnabled()
            .should.eventually.be.true
            .elementByAccessibilityId('Library')
            .isEnabled()
            .should.eventually.be.true
            .elementByAccessibilityId('Cancel')
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('33rd photo (optional)', 2000)
            .should.eventually.exist
            .elementByAccessibilityId('4th photo (optional)')
            .should.eventually.exist
            .elementByAccessibilityId('5th photo (optional)')
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
            .waitForElementByAccessibilityId('Camera', 2000)
            .isEnabled()
            .should.eventually.be.true
            .elementByAccessibilityId('Library')
            .isEnabled()
            .should.eventually.be.true
            .elementByAccessibilityId('Cancel')
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('OK', 2000)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('3', 2000)
            .should.eventually.exist
            .nodeify(done);
    });
    it.skip("Dépôt un article / Description", function (done) {
        driver.sleep(500)
            .elementByAccessibilityId("Sell")
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeOther[@name=\"Sell\"]', 2000)
            .should.eventually.exist
            .elementByAccessibilityId("btn-sell")
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('Calculate the potential resale value of your pre-loved items with our easy to use Resale Calculator.', 2000)
            .should.eventually.exist
            .elementByAccessibilityId('Resale Calculator')
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[2]')
            .should.eventually.exist
            .elementByXPath('(//XCUIElementTypeImage[@name="arrow-right"])[1]')
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('3', 2000)
            .should.eventually.exist
            .elementByAccessibilityId('Description')
            .should.eventually.exist
            .click()
            .waitForElementByXPath('(//XCUIElementTypeStaticText[@name="Description"])[1]', 2000)
            .should.eventually.exist
            .click()
            .waitForElementByXPath('(//XCUIElementTypeOther[@name="Description"])[1]', 2000)
            .should.eventually.exist
            .waitForElementByAccessibilityId('OK', 2000)
            .should.eventually.exist
            .click()
            .waitForElementByXPath('(//XCUIElementTypeStaticText[@name="Measurements"])[1]', 2000)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('Unit', 2000)
            .should.eventually.exist
            .elementByAccessibilityId('Height', 2000)
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
            .waitForElementByAccessibilityId('OK', 2000)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('back', 2000)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('4', 2000)
            .should.eventually.exist
            .nodeify(done);
    });
    it.skip("Dépôt un article / Condition & price", function (done) {
        driver.sleep(500)
            .elementByAccessibilityId("Sell")
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeOther[@name=\"Sell\"]', 2000)
            .should.eventually.exist
            .elementByAccessibilityId("btn-sell")
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('Calculate the potential resale value of your pre-loved items with our easy to use Resale Calculator.', 2000)
            .should.eventually.exist
            .elementByAccessibilityId('Resale Calculator')
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[2]')
            .should.eventually.exist
            .elementByXPath('(//XCUIElementTypeImage[@name="arrow-right"])[1]')
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('4', 2000)
            .should.eventually.exist
            .elementByAccessibilityId('Condition & price')
            .should.eventually.exist
            .click()
            .waitForElementByXPath('(//XCUIElementTypeStaticText[@name="Condition"])[1]', 2000)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('Very good condition', 2000)
            .should.eventually.exist
            .elementByAccessibilityId('A second-hand bag in very good condition is one that has rarely been used and has been very well looked after.')
            .should.eventually.exist
            .elementByXPath('(//XCUIElementTypeImage[@name="arrow-black-down"])[1]')
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('Damaged corners/material, oxidised or missing accessories (torch, mirror, tab, padlock, keys, strap), discolouration, stains (ink, ball-point pen, makeup), lingering odours (smoke, musty smell). An item that has been modified or repaired. Deep scratches, scrapes.', 2000)
            .should.eventually.exist
            .elementByXPath('(//XCUIElementTypeStaticText[@name="Reasons for refusal"])[1]')
            .should.eventually.exist
            .click()
            .elementByAccessibilityId('Good condition')
            .should.eventually.exist
            .elementByAccessibilityId('A second-hand bag is in good condition if it has been used and looked after, with light signs of use.')
            .should.eventually.exist
            .elementByXPath('(//XCUIElementTypeImage[@name="arrow-black-down"])[1]')
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('Marked/damaged leather, worn out corners, lining that is torn or with holes, bad stains (ink, makeup, ball-pointpen), repairs that have not been indicated in the description, lingering odours (smoke/musty smell).', 2000)
            .should.eventually.exist
            .elementByXPath('(//XCUIElementTypeStaticText[@name="Reasons for refusal"])[2]')
            .should.eventually.exist
            .click()
            .elementByAccessibilityId('Fair condition')
            .should.eventually.exist
            .elementByAccessibilityId('A second-hand bag is in acceptable condition if it has been used regularly, with signs of wear and tear.')
            .should.eventually.exist
            .elementByXPath('(//XCUIElementTypeImage[@name="arrow-black-down"])[1]')
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('Dirty with a great deal of wear and tear, lining that has been torn or with holes, item requiring repair.', 2000)
            .should.eventually.exist
            .elementByXPath('(//XCUIElementTypeStaticText[@name="Reasons for refusal"])[2]')
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('OK', 2000)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('back', 2000)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('Seller', 2000)
            .should.eventually.exist
            .nodeify(done);
    });
    it.skip("Dépôt un article / Seller", function (done) {
        ddriver.sleep(500)
            .elementByAccessibilityId("Sell")
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeOther[@name=\"Sell\"]', 2000)
            .should.eventually.exist
            .elementByAccessibilityId("btn-sell")
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('Calculate the potential resale value of your pre-loved items with our easy to use Resale Calculator.', 2000)
            .should.eventually.exist
            .elementByAccessibilityId('Resale Calculator')
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[2]')
            .should.eventually.exist
            .elementByXPath('(//XCUIElementTypeImage[@name="arrow-right"])[1]')
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('Seller', 2000)
            .should.eventually.exist
            .waitForElementByXPath('//XCUIElementTypeOther[@name="Seller"]', 2000)
            .should.eventually.exist
            .click()
            .waitForElementByXPath('(//XCUIElementTypeStaticText[@name="Shipping Item From"])[1]', 2000)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('OK', 2000)
            .should.eventually.exist
            .elementByXPath('((//XCUIElementTypeStaticText[@name="United States"])[1]')
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('OK', 2000)
            .should.eventually.exist
            .elementByXPath('(//XCUIElementTypeStaticText[@name="Mobile number"])[2]')
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('OK', 2000)
            .should.eventually.exist
            .elementByXPath('(//XCUIElementTypeStaticText[@name="+33 683618912"])[1]')
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('OK', 2000)
            .should.eventually.exist
            .elementByXPath('(//XCUIElementTypeStaticText[@name="Personal Contact Information"])[2]')
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('OK', 2000)
            .should.eventually.exist
            .elementByXPath('(//XCUIElementTypeStaticText[@name="Saved"])[1]')
            .should.eventually.exist
            .click()
            .elementByXPath('(//XCUIElementTypeStaticText[@name="Payments"])[1]')
            .should.eventually.exist
            .click()
            .elementByXPath('(//XCUIElementTypeStaticText[@name="Saved"])[3]')
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('OK', 2000)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('CONFIRM THIS STEP', 2000)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('CONFIRM', 2000)
            .should.eventually.exist
            .elementByAccessibilityId("Buy now")
            .isEnabled()
            .should.eventually.be.true
            .nodeify(done);
    });
});