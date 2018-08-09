require('../setup');

const wd = require("wd"),
    actions = require('../actions'),
    _shared = require('../shared/login-ios');

wd.addPromiseChainMethod('swipe', actions.swipe);

const opts = {
    port: 4723
};

const desired = require('../desired').ios;

describe("Connection/ Inscription Facebook", function () {
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
    it("Inscription avec facebook", function (done) {
        _shared.methods.verifyLoginState(driver)
            .elementByAccessibilityId('btn-register')
            .click()
            .waitForElementByAccessibilityId('Sign up with Facebook', 2000)
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeAlert[@name="“Vestiaire Collective” Wants to Use “facebook.com” to Sign In"]', 3000)
            .should.eventually.exist
            .waitForElementByAccessibilityId('This allows the app and website to share information about you.', 3000)
            .should.eventually.exist
            .waitForElementByAccessibilityId('Cancel', 2000)
            .should.eventually.exist
            .waitForElementByAccessibilityId('Continue', 2000)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('Cancel',5000)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('Sign up with Facebook', 2000)
            .should.eventually.exist
            .nodeify(done);
    });
});