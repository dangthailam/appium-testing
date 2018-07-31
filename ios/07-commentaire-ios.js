require('../setup');

const wd = require("wd"),
    actions = require('../actions'),
    _shared = require('../shared/login-ios');

wd.addPromiseChainMethod('swipe', actions.swipe);

const opts = {
    port: 4723
};

const desired = require('../desired').ios;

describe("Contenus édito / Commentaire", function () {
    this.timeout(300000);
    let driver;
    let allPassed = false;

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
    it("Vérifier que l'on peut écrire les commentaires", function (done) {
        _shared.methods.searchTestProd(driver, '6009688')
            .then(function () {
                return _shared.methods.swipeBottomUpAndCheckIfElementExist(driver, "WRITE A COMMENT", "AccessibilityId");
            })
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeOther[@name="Chat"]', 500)
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[2]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeTextView')
            .should.eventually.exist
            .sendKeys("test")
            .elementByAccessibilityId("Send")
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId("Close",1000)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId("WRITE A COMMENT", 1000)
            .should.eventually.exist
            .nodeify(done);
    });
});