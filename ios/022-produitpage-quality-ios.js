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

describe("Produit page", function () {
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
    it("Produit page - Bloc Qualité / Information", function (done) {
        driver
            .waitForElementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeCollectionView/XCUIElementTypeCell[1]/XCUIElementTypeOther/XCUIElementTypeOther', 5000)
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeTable/XCUIElementTypeCell[1]', 2000)
            .should.eventually.exist
            .then(function () {
                return _shared.methods.swipeBottomUpAndCheckIfElementExist(driver, "Quality control", "AccessibilityId");
            })
            .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeTable/XCUIElementTypeCell[6]/XCUIElementTypeButton[1]')
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('INFORMATIONS',5000)
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeStaticText[@name="Quality Control"]')
            .should.eventually.exist
            .click()
            .sleep(500)
            .elementByXPath('//XCUIElementTypeStaticText[@name="Item location "]')
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('Close',5000)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('Shipping and returns',5000)
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeTable/XCUIElementTypeCell[6]/XCUIElementTypeButton[3]')
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('Shipping',5000)
            .should.eventually.exist
            // .elementByXPath('//XCUIElementTypeSwitch[starts-with(@name, "The item is currently held by the seller")]')
            // .should.eventually.exist ???????????????????????????????????????????
            .elementByAccessibilityId('INFORMATIONS')
            .should.eventually.exist
            .elementByAccessibilityId('Close')
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('100% secure payment',5000)
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeTable/XCUIElementTypeCell[6]/XCUIElementTypeButton[4]')
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeStaticText[@name="100% secure"]', 5000)
            .should.eventually.exist
            .elementByAccessibilityId('INFORMATIONS')
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeStaticText[@name="100% secure payment"]')
            .should.eventually.exist
            .waitForElementByAccessibilityId('Returns', 5000)
            .should.eventually.exist
            .click()
            // .waitForElementByXPath('//XCUIElementTypeSwitch[starts-with(@name, "In accordance with our General Conditions of Sale ")]', 5000) > ????????
            .waitForElementByXPath('(//XCUIElementTypeLink[@name="More information"])[1]',5000)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('Sign in', 20000)
            .should.eventually.exist
            .elementByAccessibilityId('Cancel')
            .should.eventually.exist
            .click()
            .waitForElementByXPath('(//XCUIElementTypeLink[@name="More information"])[2]',5000)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('Sign in', 20000)
            .should.eventually.exist
            .elementByAccessibilityId('Cancel')
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('Returns', 5000)
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeStaticText[@name="100% secure payment"]',5000)
            .should.eventually.exist
            .waitForElementByAccessibilityId('Help', 5000)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('Write to Us',2000)
            .should.eventually.exist
            .nodeify(done);
    });
});