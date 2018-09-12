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

describe("Profile - Manage my availability", function () {
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
    it("Profile - Manage my availability", function (done) {
        driver
            .waitForElementByXPath('//XCUIElementTypeButton[@name="Me"]', 4000)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('Manage my availability',5000)
            .should.eventually.exist
            .elementByXPath('(//XCUIElementTypeImage[@name="arrow-right"])[1]')
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeOther[@name="Manage my availability"]',5000)
            .should.eventually.exist
            .elementByAccessibilityId('Temporarily unavailable')
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeSwitch[starts-with(@name, "Temporarily unable to ship your sold items?")]')
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('Start date',5000)
            .should.eventually.exist
            .elementByAccessibilityId('End date')
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[2]/XCUIElementTypeTextField[1]')
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeStaticText[@name="Start date Select"]',5000)
            .should.eventually.exist
            .elementByAccessibilityId('OK')
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[2]/XCUIElementTypeTextField[2]',5000)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('Start date',5000)
            .should.eventually.exist
            .elementByAccessibilityId('OK')
            .should.eventually.exist
            .click()
            .waitForElementByXPath('(//XCUIElementTypeButton[@name="Me"])[1]',5000)
            .should.eventually.exist
            .nodeify(done);
    });
});