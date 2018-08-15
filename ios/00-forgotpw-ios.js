require('../setup');

const wd = require("wd"),
    actions = require('../actions'),
    _shared = require('../shared/login-ios');

wd.addPromiseChainMethod('swipe', actions.swipe);

const opts = {
    port: 4723
};

const desired = require('../desired').ios;

describe("MDP oublié", function () {
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
    it("MDP oublié avec l'email incorrect", function (done) {
        _shared.methods.verifyLoginState(driver)
            .elementByAccessibilityId("btn-login")
            .should.eventually.exist
            .click()
            .elementByAccessibilityId('Forgotten password?')
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('Enter your email and we will send your password', 2000)
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[2]/XCUIElementTypeTextField')
            .should.eventually.exist
            .sendKeys("ngoc.le+10000@tttttttttt.com")
            .elementByAccessibilityId("SEND")
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('bar_notif_error',5000)
            .should.eventually.exist
            .nodeify(done);
    });

    it("MDP oublié avec l'email correct", function (done) {
        _shared.methods.verifyLoginState(driver)
            .elementByAccessibilityId("btn-login")
            .should.eventually.exist
            .click()
            .elementByAccessibilityId('Forgotten password?')
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('Enter your email and we will send your password', 2000)
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[2]/XCUIElementTypeTextField')
            .should.eventually.exist
            .sendKeys("ngoc.le+11@vestiairecollective.com")
            .elementByAccessibilityId("SEND")
            .should.eventually.exist
            .click()
            .sleep(3000)
            .hasElementByAccessibilityId("bar_notif_confirm")
            .then(function(exist) {
                if(exist)
                    return driver.elementByAccessibilityId("bar_notif_confirm");
                else
                    return driver.elementByAccessibilityId('bar_notif_error');
            })
            .should.eventually.exist
            .nodeify(done);
    });
});