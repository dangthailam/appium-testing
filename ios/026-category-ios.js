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

describe("Catégorie", function () {
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
    it.skip("Catégorie - Women", function (done) {
        driver
            .waitForElementByAccessibilityId('Buy',5000)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('WOMEN',5000)
            .should.eventually.exist
            .elementByAccessibilityId('New items')
            .should.eventually.exist
            .elementByXPath('(//XCUIElementTypeImage[@name="arrow_down_categories"])[1]')
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeScrollView/XCUIElementTypeOther[2]/XCUIElementTypeOther/XCUIElementTypeOther[2]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[2]',5000)
            .should.eventually.exist
            .elementByAccessibilityId('Brands A-Z')
            .should.eventually.exist
            .elementByAccessibilityId('Bags')
            .should.eventually.exist
            .elementByXPath('(//XCUIElementTypeImage[@name="arrow_down_categories"])[2]')
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeScrollView/XCUIElementTypeOther[2]/XCUIElementTypeOther/XCUIElementTypeOther[2]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[2]',5000)
            .should.eventually.exist
            .elementByAccessibilityId('Clothes')
            .should.eventually.exist
            .elementByXPath('(//XCUIElementTypeImage[@name="arrow_down_categories"])[3]')
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeScrollView/XCUIElementTypeOther[2]/XCUIElementTypeOther/XCUIElementTypeOther[2]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[2]',5000)
            .should.eventually.exist
            .elementByAccessibilityId('Shoes')
            .should.eventually.exist
            .elementByXPath('(//XCUIElementTypeImage[@name="arrow_down_categories"])[4]')
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeScrollView/XCUIElementTypeOther[2]/XCUIElementTypeOther/XCUIElementTypeOther[2]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[2]',5000)
            .should.eventually.exist
            .elementByAccessibilityId('Jewellery')
            .should.eventually.exist
            .elementByXPath('(//XCUIElementTypeImage[@name="arrow_down_categories"])[5]')
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeScrollView/XCUIElementTypeOther[2]/XCUIElementTypeOther/XCUIElementTypeOther[2]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[2]',5000)
            .should.eventually.exist
            .elementByAccessibilityId('Watch')
            .should.eventually.exist
            .elementByXPath('(//XCUIElementTypeImage[@name="arrow_down_categories"])[6]')
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeScrollView/XCUIElementTypeOther[2]/XCUIElementTypeOther/XCUIElementTypeOther[2]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[2]',5000)
            .should.eventually.exist
            .nodeify(done);
    });
    it.skip("Catégorie - Men", function (done) {
        driver
            .waitForElementByAccessibilityId('Buy',5000)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('MEN',5000)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('New In',5000)
            .should.eventually.exist
            .elementByXPath('(//XCUIElementTypeImage[@name="arrow_down_categories"])[1]')
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeScrollView/XCUIElementTypeOther[2]/XCUIElementTypeOther/XCUIElementTypeOther[2]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[2]',5000)
            .should.eventually.exist
            .elementByAccessibilityId('Brands A-Z')
            .should.eventually.exist
            .elementByAccessibilityId('Clothes')
            .should.eventually.exist
            .elementByXPath('(//XCUIElementTypeImage[@name="arrow_down_categories"])[2]')
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeScrollView/XCUIElementTypeOther[2]/XCUIElementTypeOther/XCUIElementTypeOther[2]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[2]',5000)
            .should.eventually.exist
            .elementByAccessibilityId('Shoes')
            .should.eventually.exist
            .elementByXPath('(//XCUIElementTypeImage[@name="arrow_down_categories"])[3]')
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeScrollView/XCUIElementTypeOther[2]/XCUIElementTypeOther/XCUIElementTypeOther[2]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[2]',5000)
            .should.eventually.exist
            .elementByAccessibilityId('Bags')
            .should.eventually.exist
            .elementByXPath('(//XCUIElementTypeImage[@name="arrow_down_categories"])[4]')
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeScrollView/XCUIElementTypeOther[2]/XCUIElementTypeOther/XCUIElementTypeOther[2]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[2]',5000)
            .should.eventually.exist
            .elementByAccessibilityId('Watch')
            .should.eventually.exist
            .elementByXPath('(//XCUIElementTypeImage[@name="arrow_down_categories"])[5]')
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeScrollView/XCUIElementTypeOther[2]/XCUIElementTypeOther/XCUIElementTypeOther[2]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[2]',5000)
            .should.eventually.exist
            .elementByAccessibilityId('Accessories')
            .should.eventually.exist
            .elementByXPath('(//XCUIElementTypeImage[@name="arrow_down_categories"])[6]')
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeScrollView/XCUIElementTypeOther[2]/XCUIElementTypeOther/XCUIElementTypeOther[2]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[2]',5000)
            .should.eventually.exist
            .nodeify(done);
    });
    it.skip("Catégorie - Design", function (done) {
        driver
            .waitForElementByAccessibilityId('Buy',5000)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('LIFESTYLE',5000)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('All lifestyle',5000)
            .should.eventually.exist
            .elementByAccessibilityId('Brands A-Z')
            .should.eventually.exist
            .elementByAccessibilityId('Design & Decoration')
            .should.eventually.exist
            .elementByXPath('(//XCUIElementTypeImage[@name="arrow_down_categories"])[1]')
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeScrollView/XCUIElementTypeOther[2]/XCUIElementTypeOther/XCUIElementTypeOther[2]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[2]',5000)
            .should.eventually.exist
            .elementByAccessibilityId('Arts & culture')
            .should.eventually.exist
            .elementByXPath('(//XCUIElementTypeImage[@name="arrow_down_categories"])[2]')
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeScrollView/XCUIElementTypeOther[2]/XCUIElementTypeOther/XCUIElementTypeOther[2]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[2]',5000)
            .should.eventually.exist
            .elementByAccessibilityId('Sport & Leisure')
            .should.eventually.exist
            .elementByAccessibilityId('High-tech')
            .should.eventually.exist
            .elementByAccessibilityId('Animals')
            .should.eventually.exist
            .elementByXPath('(//XCUIElementTypeImage[@name="arrow_down_categories"])[3]')
            .should.eventually.exist
            .click()
            .sleep(500)
            .nodeify(done);
    });
    it("Catégorie - Top designers", function (done) {
        driver
        .waitForElementByAccessibilityId('Buy',5000)
        .should.eventually.exist
        .click()
        .waitForElementByAccessibilityId('WOMEN',5000)
        .should.eventually.exist
        .elementByAccessibilityId('New items')
        .should.eventually.exist
        .click()
        .waitForElementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeScrollView/XCUIElementTypeOther[2]/XCUIElementTypeOther/XCUIElementTypeOther[2]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[2]',5000)
        .should.eventually.exist
        .elementByAccessibilityId('Brands A-Z')
        .should.eventually.exist
        .elementByAccessibilityId('Bags')
        .should.eventually.exist
        .click()
        .waitForElementByAccessibilityId('Top brands',5000)
        .should.eventually.exist
        .click()
        .waitForElementByXPath('//XCUIElementTypeStaticText[@name="ALEXANDER MCQUEEN"]',5000)
        .should.eventually.exist
        .click()
        .waitForElementByXPath('(//XCUIElementTypeStaticText[@name="ALEXANDER MCQUEEN"])[1]',5000)
        .should.eventually.exist
        .nodeify(done);
    });

});