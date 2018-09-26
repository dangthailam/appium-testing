require('../setup');

const wd = require("wd"),
    actions = require('../actions'),
    _shared = require('../shared/login-ios');

wd.addPromiseChainMethod('swipe', actions.swipe);

const opts = {
    port: 4723
};

const desired = require('../desired').ios;

describe("Connection", function () {
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

    it("Connecter avec l'email et mdp vide", function (done) {
        _shared.methods.verifyLoginState(driver)
            .elementByAccessibilityId("btn-login")
            .should.eventually.exist
            .click()
            .elementByXPath("//XCUIElementTypeApplication[@name=\"Vestiaire\"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[2]/XCUIElementTypeTextField")
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeTable/XCUIElementTypeCell[2]/XCUIElementTypeTextField')
            .click()
            .sendKeys('ngoc.le+4@vestiairecollective.com')
            .elementByAccessibilityId("LOG IN")
            .should.eventually.exist
            .click()
            .sleep(3000)
            .hasElementByAccessibilityId('Me')
            .should.eventually.be.false
            .nodeify(done);
    });

    it.skip("Connecter avec l'email incorrect", function (done) {
        _shared.methods.verifyLoginState(driver)
            .elementByAccessibilityId("btn-login")
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeTable/XCUIElementTypeCell[2]/XCUIElementTypeTextField', 2000)
            .should.eventually.exist
            .click()
            .sendKeys('ngoc.le+4@vestiaire.com')
            .elementByXPath('//XCUIElementTypeTable/XCUIElementTypeCell[3]/XCUIElementTypeSecureTextField')
            .should.eventually.exist
            .click()
            .sendKeys('002299')
            .elementByAccessibilityId("LOG IN")
            .should.eventually.exist
            .click()
            .sleep(3000)
            .hasElementByAccessibilityId('Me')
            .should.eventually.be.false
            .nodeify(done);
    });

    it("Connecter avec mdp incorrect", function (done) {
        _shared.methods.verifyLoginState(driver)
            .elementByAccessibilityId("btn-login")
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeTable/XCUIElementTypeCell[2]/XCUIElementTypeTextField', 2000)
            .should.eventually.exist
            .click()
            .sendKeys('ngoc.le+4@vestiairecollective.com')
            .elementByXPath('//XCUIElementTypeTable/XCUIElementTypeCell[3]/XCUIElementTypeSecureTextField')
            .should.eventually.exist
            .click()
            .sendKeys('002233')
            .elementByAccessibilityId("LOG IN")
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('bar_notif_error', 3000)
            .should.eventually.exist
            .hasElementByAccessibilityId('Me')
            .should.eventually.be.false
            .nodeify(done);
    });

    it("Connecter avec email et mdp correct", function (done) {
        _shared.methods.shouldLogin(driver, 'ngoc.le+4@vestiairecollective.com', '002299')
            .nodeify(done);
    });
});