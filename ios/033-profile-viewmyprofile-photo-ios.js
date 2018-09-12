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

describe("Profile - View my profile/Photo", function () {
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
    it("Profile - Image profile  ", function (done) {
        driver
            .waitForElementByXPath('//XCUIElementTypeButton[@name="Me"]', 4000)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('VIEW MY PROFILE',5000)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('placeholder_profil-big',5000)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('Take a picture',5000)
            .isEnabled()
            .should.eventually.be.true
            .elementByAccessibilityId('Choose existing')
            .isEnabled()
            .should.eventually.be.true
            .elementByAccessibilityId('Cancel')
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('placeholder_profil-big',5000)
            .should.eventually.exist
            .nodeify(done);
    });
    it("Profile - Image cover  ", function (done) {
        driver
            .waitForElementByXPath('//XCUIElementTypeButton[@name="Me"]', 4000)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('VIEW MY PROFILE',5000)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('cover-default',5000)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('Take a picture',5000)
            .isEnabled()
            .should.eventually.be.true
            .elementByAccessibilityId('Choose existing')
            .isEnabled()
            .should.eventually.be.true
            .elementByAccessibilityId('Cancel')
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('placeholder_profil-big',5000)
            .nodeify(done);
    });
});