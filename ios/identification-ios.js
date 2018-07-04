require('../setup');

const wd = require("wd"),
    actions = require('../actions'),
    _shared = require('../shared/login');

wd.addPromiseChainMethod('swipe', actions.swipe);

const opts = {
    port: 4723
};

const desired = require('../desired').ios;

describe("Identification user", function () {
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

    beforeEach(function() {
        return driver.init(desired);
    });

    afterEach(function() {
        allPassed = allPassed && this.currentTest.state === 'passed';
        return driver.quit();
    });

    it("Login with email and password", function (done) {
        _shared.login.shouldLogin(driver)
            .nodeify(done);
    });

    it("Login with bad email", function(done) {
        _shared.login.verifyLoginState(driver)
            .sleep(500)
            .elementByXPath('//XCUIElementTypeTable/XCUIElementTypeCell[2]/XCUIElementTypeTextField')
            .click()
            .sendKeys('lebichngoc090589@gm')
            .elementByXPath('//XCUIElementTypeTable/XCUIElementTypeCell[3]/XCUIElementTypeSecureTextField')
            .click()
            .sendKeys('09051989')
            .elementByXPath('//XCUIElementTypeButton[@name="LOG IN"]')
            .should.eventually.exist
            .click()
            .sleep(500)
            .elementByAccessibilityId('bar_notif_error')
            .should.eventually.exist
            .nodeify(done);
    });
});