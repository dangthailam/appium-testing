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

describe("Partie ME - My account", function () {
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
    it("ME - My account/My details", function (done) {
        driver
            .waitForElementByXPath('//XCUIElementTypeButton[@name="Me"]', 5000)
            .should.eventually.exist
            .click()
            .then(function () {
                return _shared.methods.swipeBottomUpAndCheckIfElementExist(driver, "My details", "AccessibilityId");
            })
            .sleep(1000)
            .should.eventually.exist
            .elementByAccessibilityId('My details')
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeOther[@name="My details"]', 10000)
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeStaticText[@name="PROFILE DETAILS"]')
            .should.eventually.exist
            .elementByAccessibilityId('Picture')
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeStaticText[@name="Edit your profile picture"]', 10000)
            .should.eventually.exist
            .elementByAccessibilityId('Choose existing')
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeOther[@name="Photos"]', 5000)
            .should.eventually.exist
            .elementByAccessibilityId('Cancel')
            .should.eventually.exist
            .click()
            .elementByAccessibilityId('Title', 5000)
            .should.eventually.exist
            .click()
            .waitForElementByXPath('(//XCUIElementTypeOther[@name="TITLE"])[2]', 5000)
            .should.eventually.exist
            .elementByAccessibilityId('Mr')
            .should.eventually.exist
            .elementByAccessibilityId('Mrs')
            .should.eventually.exist
            .elementByAccessibilityId('My details')
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('Firstname', 5000)
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeStaticText[@name="Firstname"]')
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeCell[@name="cell-user-firstname"]/XCUIElementTypeTextField')
            .should.eventually.exist
            .elementByAccessibilityId('Surname*')
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeCell[@name="cell-user-lastname"]/XCUIElementTypeTextField')
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeCell[@name="cell-user-lastname"]/XCUIElementTypeTextField')
            .sendKeys('Bich')
            .elementByAccessibilityId('Done')
            .click()
            .elementByXPath('//XCUIElementTypeStaticText[@name="ACCOUNT INFORMATION"]')
            .should.eventually.exist
            .elementByAccessibilityId('Email')
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[5]/XCUIElementTypeTextField')
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeStaticText[@name="INTERNATIONAL PREFERENCES"]')
            .should.eventually.exist
            .elementByAccessibilityId('Language')
            .should.eventually.exist
            .click()
            .waitForElementByXPath('(//XCUIElementTypeOther[@name="LANGUAGE"])[2]', 5000)
            .should.eventually.exist
            .elementByAccessibilityId('French')
            .should.eventually.exist
            .elementByAccessibilityId('English')
            .should.eventually.exist
            .elementByAccessibilityId('German')
            .should.eventually.exist
            .elementByAccessibilityId('Italian')
            .should.eventually.exist
            .elementByAccessibilityId('Spanish')
            .should.eventually.exist
            .elementByAccessibilityId('My details')
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('Currency',5000)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('USD', 5000)
            .should.eventually.exist
            .elementByAccessibilityId('EUR')
            .should.eventually.exist
            .elementByAccessibilityId('My details')
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('Site', 5000)
            .should.eventually.exist
            .click()
            .waitForElementByXPath('(//XCUIElementTypeOther[@name="SITE"])[2]', 5000)
            .should.eventually.exist
            .then(function () {
                return _shared.methods.swipeBottomUpAndCheckIfElementExist(driver, "France", "AccessibilityId");
            })
            .click()
            .waitForElementByAccessibilityId('France',5000)
            .should.eventually.exist
            .swipe({
                startX: 200,
                startY: 400,
                endX: 200,
                endY: 200,
                duration: 1000
            })
            .elementByAccessibilityId('DEACTIVATE MY ACCOUNT')
            .isEnabled()
            .should.eventually.be.true
            .elementByXPath('(//XCUIElementTypeButton[@name="Me"])[1]')
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeButton[@name="Me"]', 4000)
            .should.eventually.exist
            .nodeify(done);
    });
    it("ME - My account/My addresses & phone number", function (done) {
        driver
            .waitForElementByXPath('//XCUIElementTypeButton[@name="Me"]', 5000)
            .should.eventually.exist
            .click()
            .sleep(1000)
            .then(function () {
                return _shared.methods.swipeBottomUpAndCheckIfElementExist(driver, "My account", "AccessibilityId");
            })
            .sleep(1000)
            // .elementByAccessibilityId('My addresses & phone number')
            .elementByXPath('//XCUIElementTypeStaticText[@name="My addresses & phone number "]')
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeOther[@name="My addresses & phone number"]',5000)
            .should.eventually.exist
            .elementByXPath('(//XCUIElementTypeImage[@name="arrow-right"])[1]')
            .should.eventually.exist
            .elementByAccessibilityId('Delivery addresses')
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('Set up a new address',5000)
            .should.eventually.exist
            .elementByAccessibilityId('arrow-right')
            .should.eventually.exist
            .elementByAccessibilityId('Delivery addresses')
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('My addresses & phone number',5000)
            .should.eventually.exist
            .elementByXPath('(//XCUIElementTypeButton[@name="Me"])[1]')
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeButton[@name="Me"]', 4000)
            .should.eventually.exist
            .nodeify(done);
    });
    it("ME - My account/My bank details", function (done) {
        driver
            .waitForElementByXPath('//XCUIElementTypeButton[@name="Me"]', 4000)
            .should.eventually.exist
            .click()
            .sleep('1000')
            .then(function () {
                return _shared.methods.swipeBottomUpAndCheckIfElementExist(driver, "My account", "AccessibilityId");
            })
            .elementByAccessibilityId('My bank details')
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeOther[@name="My bank details"]',10000)
            .should.eventually.exist
            .elementByAccessibilityId('I would like transfers to be made to :')
            .should.eventually.exist
            .elementByAccessibilityId('Bank')
            .should.eventually.exist
            .elementByAccessibilityId('Paypal')
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeStaticText[@name="Account owner"]')
            .should.eventually.exist
            .elementByAccessibilityId('Title')
            .should.eventually.exist
            .elementByXPath('(//XCUIElementTypeImage[@name="arrow-right"])[1]')
            .should.eventually.exist
            .elementByAccessibilityId('First name')
            .should.eventually.exist
            .elementByAccessibilityId('Surname')
            .should.eventually.exist
            .elementByAccessibilityId('Currency')
            .should.eventually.exist
            .then(function () {
                return _shared.methods.swipeBottomUpAndCheckIfElementExist(driver, "CONFIRM", "AccessibilityId");
            })
            .sleep(1000)
            .elementByAccessibilityId('Country of your bank')
            .should.eventually.exist
            .elementByXPath('(//XCUIElementTypeImage[@name="arrow-right"])[3]')
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeSwitch[@name="I have read and agree to the terms and conditions of vestiairecollective.com"]')
            .should.eventually.exist
            .elementByAccessibilityId('CONFIRM')
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('bar_notif_error', 5000)
            .should.eventually.exist
            .elementByXPath('(//XCUIElementTypeButton[@name="Me"])[1]')
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeButton[@name="Me"]', 4000)
            .should.eventually.exist
            .nodeify(done);
    });
    it("ME - My account/My payment methods", function (done) {
        driver
            .waitForElementByXPath('//XCUIElementTypeButton[@name="Me"]', 4000)
            .should.eventually.exist
            .click()
            .sleep('1000')
            .then(function () {
                return _shared.methods.swipeBottomUpAndCheckIfElementExist(driver, "My account", "AccessibilityId");
            })
            .sleep(1000)
            .should.eventually.exist
            .elementByAccessibilityId('My payment methods')
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeOther[@name="My payment methods"]',10000)
            .should.eventually.exist
            .hasElementByAccessibilityId('You do not have any registered credit cards.')
            .then(function (exist) {
                if (exist)
                    return driver
                        .elementByAccessibilityId('You do not have any registered credit cards.')
                        .should.eventually.exist;
                else
                    return driver // Ajouter le cas qu'il y a la carte bancaire
            })
            .elementByXPath('(//XCUIElementTypeButton[@name="Me"])[1]')
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeButton[@name="Me"]', 4000)
            .should.eventually.exist
            .nodeify(done);
    });
});