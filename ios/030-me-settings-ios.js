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

describe("Partie ME - Settings", function () {
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
    it("ME - Settings/Push notifications", function (done) {
        driver
            .waitForElementByXPath('//XCUIElementTypeButton[@name="Me"]', 5000)
            .should.eventually.exist
            .click()
            .sleep(1000)
            .then(function () {
                return _shared.methods.swipeBottomUpAndCheckIfElementExist(driver, "Push notifications", "AccessibilityId");
            })
            .elementByAccessibilityId('Push notifications')
            .should.eventually.exist
            .click()
            .hasElementByAccessibilityId('Allow')
            .then(function (exist) {
                if (exist)
                    return driver
                        .elementByAccessibilityId('Allow')
                        .should.eventually.exist
                        .elementByAccessibilityId('Don’t Allow')
                        .should.eventually.exist
                        .click();
                else
                    return driver
            })
            .sleep(2000)
            .elementByAccessibilityId('Your push notifications are currently switched off')
            .should.eventually.exist
            .elementByAccessibilityId('OPT IN')
            .should.eventually.exist
            .click()
            .waitForElementByXPath('(//XCUIElementTypeOther[@name="ALLOW VESTIAIRE TO ACCESS"])[1]', 5000)
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeCell[@name="Notifications"]')
            .should.eventually.exist
            .elementByAccessibilityId('Return to Vestiaire')
            .should.eventually.exist
            .click()
            .waitForElementByXPath('(//XCUIElementTypeButton[@name="Me"])[1]',5000)
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeButton[@name="Me"]', 4000)
            .should.eventually.exist
            .nodeify(done);
    });
    it("ME - Settings/Subscription", function (done) {
        driver
            .waitForElementByXPath('//XCUIElementTypeButton[@name="Me"]', 5000)
            .should.eventually.exist
            .click()
            .sleep(1000)
            .then(function () {
                return _shared.methods.swipeBottomUpAndCheckIfElementExist(driver, "Subscriptions", "AccessibilityId");
            })
            .elementByAccessibilityId('Subscriptions')
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeOther[@name="Subscriptions"]', 5000)
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeSwitch[@name="Vestiaire Collective newsletter"]')
            .should.eventually.exist
            .click()
            .click()
            .elementByXPath('//XCUIElementTypeSwitch[@name="Updates from our partners"]')
            .should.eventually.exist
            .click()
            .click()
            .elementByXPath('//XCUIElementTypeSwitch[@name="Offers from Sellers"]')
            .should.eventually.exist
            .click()
            .click()
            .elementByXPath('//XCUIElementTypeSwitch[@name="Email alerts"]')
            .should.eventually.exist
            .click()
            .click()
            .elementByXPath('(//XCUIElementTypeButton[@name="Me"])[1]')
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeButton[@name="Me"]', 4000)
            .should.eventually.exist
            .nodeify(done);
    });
    it("ME - Settings/Privacy", function (done) {
        driver
            .waitForElementByXPath('//XCUIElementTypeButton[@name="Me"]', 5000)
            .should.eventually.exist
            .click()
            .sleep(1000)
            .then(function () {
                return _shared.methods.swipeBottomUpAndCheckIfElementExist(driver, "Privacy", "AccessibilityId");
            })
            .elementByAccessibilityId('Privacy')
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeOther[@name="Privacy"]', 5000)
            .should.eventually.exist
            .elementByAccessibilityId('Allow search')
            .should.eventually.exist
            .elementByAccessibilityId('Allow search, Members can search for me using my last name, first name or my email address')
            .should.eventually.exist
            .elementByAccessibilityId('Allow mentions')
            .should.eventually.exist
            .elementByAccessibilityId('Allow mentions, Members can mention me in comments.')
            .should.eventually.exist
            .elementByXPath('(//XCUIElementTypeButton[@name="Me"])[1]')
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeButton[@name="Me"]', 4000)
            .should.eventually.exist
            .nodeify(done);
    });
    it("ME - Settings/Refer a friend", function (done) {
        driver
            .waitForElementByXPath('//XCUIElementTypeButton[@name="Me"]', 4000)
            .should.eventually.exist
            .click()
            .sleep(1000)
            .then(function () {
                return _shared.methods.swipeBottomUpAndCheckIfElementExist(driver, "Refer A Friend", "AccessibilityId");
            })
            .elementByAccessibilityId('Refer A Friend')
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeOther[@name="Refer A Friend"]', 5000)
            .should.eventually.exist
            .elementByAccessibilityId('Refer a friend !')
            .should.eventually.exist
            .elementByAccessibilityId('INVITE FRIENDS')
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('Cancel', 5000)
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeStaticText[@name="PAST ACTIONS"]', 5000)
            .should.eventually.exist
            .elementByXPath('(//XCUIElementTypeButton[@name="Me"])[1]')
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeButton[@name="Me"]', 4000)
            .should.eventually.exist
            .nodeify(done);
    });
});