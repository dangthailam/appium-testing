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

    beforeEach(function() {
        return driver.init(desired);
    });

    afterEach(function() {
        allPassed = allPassed && this.currentTest.state === 'passed';
        return driver.quit();
    });

    it ("Signup with correct email", function(done) {
        _shared.login.verifyLoginState(driver)
        .sleep(2000)
        .elementByAccessibilityId('btn-login')
        .should.eventually.exist
        .click()
        .sleep(1000)
        .elementByXPath("//XCUIElementTypeApplication[@name=\"Vestiaire\"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[2]/XCUIElementTypeTextField")
        .should.eventually.exist
        .sendKeys('ngoc.le+20@vestiairecollective.com')
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
        .elementByXPath("//XCUIElementTypeApplication[@name=\"Vestiaire\"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[1]")
        .should.eventually.exist
        .elementByXPath("//XCUIElementTypeApplication[@name=\"Vestiaire\"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[2]/XCUIElementTypeTextField")
        .should.eventually.exist
        .sendKeys(LEEEE)



        
        .nodeify(done);




    });
});