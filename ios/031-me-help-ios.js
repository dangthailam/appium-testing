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

describe("Partie ME - Help", function () {
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
    it("ME - Help/Our commission", function (done) {
        driver
            .waitForElementByXPath('//XCUIElementTypeButton[@name="Me"]', 4000)
            .should.eventually.exist
            .click()
            .sleep('1000')
            .then(function () {
                return _shared.methods.swipeBottomUpAndCheckIfElementExist(driver, "Our commission", "AccessibilityId");
            })
            .should.eventually.exist
            .elementByXPath('(//XCUIElementTypeImage[@name="arrow-right"])[16]')
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeStaticText[@name="Our commission means we can provide exclusive services!"]',10000)
            .should.eventually.exist
            .elementByXPath('(//XCUIElementTypeButton[@name="Me"])[1]')
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeButton[@name="Me"]', 4000)
            .should.eventually.exist
            .nodeify(done);
    });
    it("ME - Help/Contact us", function (done) {
        driver
            .waitForElementByXPath('//XCUIElementTypeButton[@name="Me"]', 4000)
            .should.eventually.exist
            .click()
            .sleep('1000')
            .then(function () {
                return _shared.methods.swipeBottomUpAndCheckIfElementExist(driver, "Contact Us", "AccessibilityId");
            })
            .should.eventually.exist
            .elementByXPath('(//XCUIElementTypeImage[@name="arrow-right"])[17]')
            .should.eventually.exist
            .click()
            // .waitForElementByXPath('//XCUIElementTypeOther[@name="Contact Us"]',5000)
            // .should.eventually.exist
            .waitForElementByAccessibilityId('Sign in',5000)
            .should.eventually.exist
            .elementByXPath('(//XCUIElementTypeButton[@name="Me"])[1]')
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeButton[@name="Me"]', 4000)
            .should.eventually.exist
            .nodeify(done);
    });
    it("ME - Help/FAQ", function (done) {
        driver
            .waitForElementByXPath('//XCUIElementTypeButton[@name="Me"]', 4000)
            .should.eventually.exist
            .click()
            .sleep('1000')
            .then(function () {
                return _shared.methods.swipeBottomUpAndCheckIfElementExist(driver, "FAQ", "AccessibilityId");
            })
            .should.eventually.exist
            .elementByXPath('(//XCUIElementTypeImage[@name="arrow-right"])[18]')
            .should.eventually.exist
            .click()
            // .waitForElementByXPath('//XCUIElementTypeOther[@name="FAQ"]',5000)
            // .should.eventually.exist
            .waitForElementByXPath('//XCUIElementTypeImage[@name="Logo"]',10000)
            .should.eventually.exist
            .elementByXPath('(//XCUIElementTypeButton[@name="Me"])[1]')
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeButton[@name="Me"]', 4000)
            .should.eventually.exist
            .nodeify(done);
    });
    it("ME - Help/Rate our app/Legal information/General", function (done) {
        driver
            .waitForElementByXPath('//XCUIElementTypeButton[@name="Me"]', 4000)
            .should.eventually.exist
            .click()
            .sleep('1000')
            .then(function () {
                return _shared.methods.swipeBottomUpAndCheckIfElementExist(driver, "Rate our app", "AccessibilityId");
            })
            .should.eventually.exist
            .elementByXPath('(//XCUIElementTypeImage[@name="arrow-right"])[19]')
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('Return to Vestiaire',5000)
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeButton[@name="Me"]', 4000)
            .should.eventually.exist
            .then(function () {
                return _shared.methods.swipeBottomUpAndCheckIfElementExist(driver, "Legal information", "AccessibilityId");
            })
            .elementByAccessibilityId('Legal information')
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeOther[@name="Legal information"]',5000)
            .should.eventually.exist
            .swipe({
                startX: 400,
                startY: 800,
                endX: 200,
                endY: 200,
                duration: 1000
            })
            .elementByXPath('//XCUIElementTypeStaticText[@name="DATA PROTECTION"]')
            .should.eventually.exist
            .elementByXPath('(//XCUIElementTypeButton[@name="Me"])[1]')
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeButton[@name="Me"]', 4000)
            .should.eventually.exist
            .then(function () {
                return _shared.methods.swipeBottomUpAndCheckIfElementExist(driver, "General conditions of use and sale", "AccessibilityId");
            })
            .elementByAccessibilityId('General conditions of use and sale')
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeOther[@name="General conditions of use and sale"]',5000)
            .should.eventually.exist
            .nodeify(done);
    });
});