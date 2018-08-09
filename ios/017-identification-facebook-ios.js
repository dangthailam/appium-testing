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

    it("Connecter avec facebook", function (done) {
        _shared.methods.verifyLoginState(driver)
            .elementByAccessibilityId("btn-login")
            .click()
            // .click()
            .waitForElementByAccessibilityId('Connect with Facebook', 2000)
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
            .sleep(5000)
            .hasElementByAccessibilityId('Log into Facebook | Facebook')
            .then(function (exist) {
                if (exist)
                    return driver
                        // .elementByAccessibilityId('Log into Facebook | Facebook')
                        // .should.eventually.exist
                        // .elementByAccessibilityId('Cancel')
                        // .should.eventually.exist
                        // .elementByAccessibilityId('Log into your Facebook account to connect to Vestiaire Collective')
                        // .should.eventually.exist
                        .elementByXPath('//XCUIElementTypeOther[@name="main"]/XCUIElementTypeTextField')
                        .should.eventually.exist
                        .click()
                        .getLocation()
                        .then(function (loc) {
                            var action = new wd.TouchAction();

                            action.longPress({ x: loc.x, y: loc.y + 20 })
                                .wait(3000)
                                .moveTo({ x: loc.x + 344, y: loc.y + 20 })
                                .release();

                            return driver.performTouchAction(action);
                        })
                        .sleep(2000);
                // .getValue()
                // .then(function (val) {
                //     console.log(val);
                //     return val;
                // })
                // .elementByXPath('//XCUIElementTypeOther[@name="main"]/XCUIElementTypeTextField[@value="val"]')

                // .clear()
                // .elementByXPath('//XCUIElementTypeOther[@name="main"]/XCUIElementTypeSecureTextField')
                // .should.eventually.exist
                // .click()
                // .elementByXPath('//XCUIElementTypeOther[@name="main"]/XCUIElementTypeTextField')
                // .should.eventually.exist
                // .clear()
                // .sendKeys('ngoc.le@vestiairecollective.com')
                // .elementByXPath('//XCUIElementTypeOther[@name="main"]/XCUIElementTypeSecureTextField')
                // .should.eventually.exist
                // .click()
                // .sendKeys('Ngoc1234')
                // .elementByAccessibilityId('Log In')
                // .should.eventually.exist
                // .click()
                // .waitForElementByXPath('//XCUIElementTypeOther[@name="Confirm Login"]', 3000)
                // .should.eventually.exist
                // .elementByXPath('(//XCUIElementTypeButton[@name="Cancel"])[1]')
                // .should.eventually.exist
                // .waitForElementByXPath('//XCUIElementTypeOther[@name="Confirm Login"]', 3000)
                // .should.eventually.exist
                // .elementByXPath('//XCUIElementTypeOther[@name="Facebook"]')
                // .should.eventually.exist
                // .elementByAccessibilityId('You previously logged in to Vestiaire Collective with Facebook.')
                // .should.eventually.exist
                // .elementByAccessibilityId('Would you like to continue?')
                // .should.eventually.exist
                // .elementByXPath('(//XCUIElementTypeButton[@name="Cancel"])[2]')
                // .should.eventually.exist
                // .elementByAccessibilityId('Continue')
                // .should.eventually.exist
                // .click()
                // .waitForElementByAccessibilityId('Me', 5000)
                // .should.eventually.exist
                // .sleep(500);
                else
                    return driver.elementByXPath('//XCUIElementTypeOther[@name="Confirm Login"]')
                        .should.eventually.exist
                        .elementByXPath('(//XCUIElementTypeButton[@name="Cancel"])[1]')
                        .should.eventually.exist
                        .waitForElementByXPath('//XCUIElementTypeOther[@name="Confirm Login"]', 3000)
                        .should.eventually.exist
                        .elementByXPath('//XCUIElementTypeOther[@name="Facebook"]')
                        .should.eventually.exist
                        .elementByAccessibilityId('You previously logged in to Vestiaire Collective with Facebook.')
                        .should.eventually.exist
                        .elementByAccessibilityId('Would you like to continue?')
                        .should.eventually.exist
                        .elementByXPath('(//XCUIElementTypeButton[@name="Cancel"])[2]')
                        .should.eventually.exist
                        .elementByAccessibilityId('Continue')
                        .should.eventually.exist
                        .click()
                        .waitForElementByAccessibilityId('Me', 5000)
                        .should.eventually.exist
                        .sleep(500);
            })
            .nodeify(done)
        // .waitForElementByXPath('//XCUIElementTypeAlert[@name="“Vestiaire Collective” Wants to Use “facebook.com” to Sign In"]', 3000)
        // .should.eventually.exist
        // .waitForElementByAccessibilityId('This allows the app and website to share information about you.', 3000)
        // .should.eventually.exist
        // .waitForElementByAccessibilityId('Cancel', 2000)
        //             .should.eventually.exist
        //             .waitForElementByAccessibilityId('Continue', 2000)
        //             .should.eventually.exist
        // .click()
        // .waitForElementByAccessibilityId('Log into Facebook | Facebook', 5000)
        // .should.eventually.exist
        // .elementByXPath("//XCUIElementTypeOther[@name=\"main\"]/XCUIElementTypeTextField")
        // .should.eventually.exist
        // .sendKeys("ngoc.le@vestiairecollective.com")
        // .elementByXPath("//XCUIElementTypeOther[@name=\"main\"]/XCUIElementTypeSecureTextField")
        // .should.eventually.exist
        // .click()
        // .sendKeys("Ngoc1234")
        // .elementByAccessibilityId("Log In")
        // .click()
        // .elementByAccessibilityId("Tiếp tục")
        // .click()
        // .waitForElementByAccessibilityId('Me', 3000)
        // .should.eventually.exist
        // .nodeify(done);
    });
});