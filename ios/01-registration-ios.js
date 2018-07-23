require('../setup');

const wd = require("wd"),
    actions = require('../actions'),
    _shared = require('../shared/login-ios');

wd.addPromiseChainMethod('swipe', actions.swipe);

const opts = {
    port: 4723
};

const desired = require('../desired').ios;

describe("Registration", function () {
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
    it("Signup with incorrect email", function (done) {
        _shared.methods.verifyLoginState(driver) // login and register page
            .waitForElementByAccessibilityId('btn-register', 2000)
            .should.eventually.exist
            .click()
            .elementByXPath("//XCUIElementTypeApplication[@name=\"Vestiaire\"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[2]")
            .should.eventually.exist
            .sendKeys("joeff@gmail")
            .elementByXPath("//XCUIElementTypeApplication[@name=\"Vestiaire\"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[3]/XCUIElementTypeSecureTextField")
            .should.eventually.exist
            .sendKeys("1234")
            .elementByXPath("//XCUIElementTypeApplication[@name=\"Vestiaire\"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[4]/XCUIElementTypeTextField")
            .should.eventually.exist
            .sendKeys("LEEEEE")
            .elementByAccessibilityId("Female")
            .should.eventually.exist
            .click()
            .elementByAccessibilityId("check OFF")
            .should.eventually.exist
            .click()
            .elementByAccessibilityId("SIGN UP")
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('bar_notif_error', 500)
            .should.eventually.exist
            .nodeify(done);
    });

    it("Signup with email existe", function (done) {
        _shared.methods.verifyLoginState(driver)
            .waitForElementByAccessibilityId('btn-register', 2000)
            .should.eventually.exist
            .click()
            .elementByXPath("//XCUIElementTypeApplication[@name=\"Vestiaire\"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[2]")
            .should.eventually.exist
            .sendKeys("ngoc.le+4@vestiairecollective.com")
            .elementByXPath("//XCUIElementTypeApplication[@name=\"Vestiaire\"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[3]/XCUIElementTypeSecureTextField")
            .should.eventually.exist
            .sendKeys("002299")
            .elementByXPath("//XCUIElementTypeApplication[@name=\"Vestiaire\"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[4]/XCUIElementTypeTextField")
            .should.eventually.exist
            .sendKeys("LEEEEE")
            .elementByAccessibilityId("Female")
            .should.eventually.exist
            .click()
            .elementByAccessibilityId("check OFF")
            .should.eventually.exist
            .click()
            .elementByAccessibilityId("SIGN UP")
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('bar_notif_error', 3000)
            .should.eventually.exist
            .nodeify(done);
    });

    it("Signup with correct email", function (done) {
        _shared.methods.verifyLoginState(driver)
            .waitForElementByAccessibilityId('btn-register', 2000)
            .should.eventually.exist
            .click()
            .waitForElementByXPath("//XCUIElementTypeApplication[@name=\"Vestiaire\"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[2]/XCUIElementTypeTextField", 1000)
            .should.eventually.exist
            .sendKeys('ngoc.le+' + Date.now() + '@vestiairecollective.com')
            .elementByXPath("//XCUIElementTypeApplication[@name=\"Vestiaire\"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[3]/XCUIElementTypeSecureTextField")
            .should.eventually.exist
            .sendKeys("09051989")
            .elementByXPath("//XCUIElementTypeApplication[@name=\"Vestiaire\"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[4]/XCUIElementTypeTextField")
            .should.eventually.exist
            .sendKeys("LEEEEE")
            .elementByAccessibilityId("Female")
            .should.eventually.exist
            .click()
            .elementByAccessibilityId("SIGN UP")
            .should.eventually.exist
            .click()
            .elementByAccessibilityId('bar_notif_error')
            .should.eventually.exist
            .elementByAccessibilityId("check OFF")
            .should.eventually.exist
            .click()
            .elementByAccessibilityId("SIGN UP")
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId("cross white", 5000)
            .click()
            .waitForElementByXPath('//XCUIElementTypeButton[@name="Me"]', 500)
            .should.eventually.exist
            .nodeify(done);
    });
});