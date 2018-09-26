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

describe("Profile - View my profile", function () {
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
    it("Profile - Scroll bar", function (done) {
        driver.sleep(5000)
            .hasElementByAccessibilityId('I UNDERSTOOD')
            .then(function (exist) {
                if (exist) {
                    return driver.waitForElementByAccessibilityId('I UNDERSTOOD', 5000)
                        .should.eventually.exist
                        .elementByAccessibilityId('Later')
                        .should.eventually.exist
                        .click()
                }
                else
                    return driver;
            })

            .hasElementByAccessibilityId('Allow')
            .then(function (exist) {
                if (exist) {
                    return driver.waitForElementByAccessibilityId('Allow', 5000)
                        .should.eventually.exist
                        .elementByAccessibilityId('Don’t Allow')
                        .should.eventually.exist
                        .click();
                }
                else
                    return driver;
            })
            .waitForElementByXPath('//XCUIElementTypeButton[@name="Me"]', 4000)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('VIEW MY PROFILE', 5000)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('map-pin', 5000)
            .should.eventually.exist
            .elementByAccessibilityId('followed by')
            .should.eventually.exist
            .elementByAccessibilityId('follows')
            .should.eventually.exist
            .nodeify(done);
    });
});