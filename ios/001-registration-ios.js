require('../setup');

const wd = require("wd"),
    actions = require('../actions'),
    _shared = require('../shared/login-ios');

wd.addPromiseChainMethod('swipe', actions.swipe);

const opts = {
    port: 4723
};

const desired = require('../desired').ios;

describe("Inscription", function () {
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
    it("Inscrire avec l'email incorrect", function (done) {
        _shared.methods.verifyLoginState(driver) // login and register page
            .waitForElementByAccessibilityId('btn-register', 5000)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('Male', 5000)
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[3]/XCUIElementTypeTextField')
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[4]/XCUIElementTypeTextField')
            .should.eventually.exist
            .sendKeys("joeff@gmail")
            .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[5]/XCUIElementTypeSecureTextField')
            .should.eventually.exist
            .sendKeys("1234")
            .elementByAccessibilityId('Next:')
            .click()
            .waitForElementByAccessibilityId('eye show',5000)
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeSwitch[@name="By signing up, I agree to the terms and conditions of Vestiaire Collective"]')
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('SIGN UP', 5000)
            .should.eventually.exist
            .click()
            .sleep(3000)
            .hasElementByAccessibilityId('Me')
            .should.eventually.be.false
            .nodeify(done);
    });

    it("Inscrire avec l'email déjà existé", function (done) {
        _shared.methods.verifyLoginState(driver) // login and register page
            .waitForElementByAccessibilityId('btn-register', 5000)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('Male', 5000)
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[3]/XCUIElementTypeTextField')
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[4]/XCUIElementTypeTextField')
            .should.eventually.exist
            .sendKeys("ngoc.le+4@vestiairecollective.com")
            .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[5]/XCUIElementTypeSecureTextField')
            .should.eventually.exist
            .sendKeys("002299")
            .elementByAccessibilityId('Next:')
            .click()
            .waitForElementByAccessibilityId('eye show',5000)
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeSwitch[@name="By signing up, I agree to the terms and conditions of Vestiaire Collective"]')
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('SIGN UP', 5000)
            .should.eventually.exist
            .click()
            .sleep(3000)
            .hasElementByAccessibilityId('Me')
            .should.eventually.be.false
            .nodeify(done);
    });

    it("Inscrire avec l'email correct", function (done) {
        _shared.methods.verifyLoginState(driver) // login and register page
            .waitForElementByAccessibilityId('btn-register', 5000)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('Already a member? Log in',5000)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('Back',5000)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('btn-register', 5000)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('Male', 5000)
            .should.eventually.exist
            .click()
            .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[3]/XCUIElementTypeTextField')
            .should.eventually.exist
            .sendKeys("LEEEEE")
            .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[4]/XCUIElementTypeTextField')
            .should.eventually.exist
            .sendKeys('ngoc.le+' + Date.now() + '@vestiairecollective.com')
            .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[5]/XCUIElementTypeSecureTextField')
            .should.eventually.exist
            .sendKeys("09051989")
            .elementByAccessibilityId('Next:')
            .click()
            .waitForElementByAccessibilityId('eye show',5000)
            .should.eventually.exist
            .waitForElementByAccessibilityId('Receive the vestiaire collective newsletter',5000)
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeStaticText[@name="By signing up, I agree to the terms and conditions of Vestiaire Collective"]')
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeSwitch[@name="By signing up, I agree to the terms and conditions of Vestiaire Collective"]')
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('SIGN UP', 5000)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('Me', 5000)
            .should.eventually.exist
            .nodeify(done);
    });
});