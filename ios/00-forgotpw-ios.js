require('../setup');

const wd = require("wd"),
    actions = require('../actions'),
    _shared = require('../shared/login-ios');

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

    beforeEach(function () {
        return driver.init(desired);
    });

    afterEach(function () {
        allPassed = allPassed && this.currentTest.state === 'passed';
        return driver.quit();
    });
    it("Forgot password with incorrect email ", function (done) {
        _shared.methods.verifyLoginState(driver)
            .elementByAccessibilityId("btn-login")
            .click()
            .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[5]')
            .click()
            .waitForElementByAccessibilityId("Enter your email and we will send your password", 2000)
            .should.eventually.exist
            .elementByXPath("//XCUIElementTypeApplication[@name=\"Vestiaire\"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[1]")
            .sendKeys("ngoc.le+10000@tttttttttt.com")
            .elementByAccessibilityId("SEND")
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('bar_notif_error', 500)
            .should.eventually.exist
            .nodeify(done);
    });

    it("Forgot password with correct email ", function (done) {
        _shared.methods.verifyLoginState(driver)
            .elementByAccessibilityId("btn-login")
            .click()
            .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[5]')
            .click()
            .waitForElementByAccessibilityId("Enter your email and we will send your password", 2000)
            .should.eventually.exist
            .elementByXPath("//XCUIElementTypeApplication[@name=\"Vestiaire\"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[1]")
            .sendKeys("ngoc.le+11@vestiairecollective.com")
            .elementByAccessibilityId("SEND")
            .should.eventually.exist
            .click()
            .sleep(500)
            .hasElementByAccessibilityId("bar_notif_confirm")
            .then(function(exist) {
                if(!exist){
                    return driver.elementByAccessibilityId("bar_notif_error");
                }
                return driver.elementByAccessibilityId('bar_notif_confirm');
            })
            .should.eventually.exist
            .nodeify(done);
    });
});