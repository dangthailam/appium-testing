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
    it("Produit page - Bloc vendeur", function (done) {
        driver
            .waitForElementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeCollectionView/XCUIElementTypeCell[1]/XCUIElementTypeOther/XCUIElementTypeOther', 5000)
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeTable/XCUIElementTypeCell[1]', 5000)
            .should.eventually.exist
            .then(function () {
                return _shared.methods.swipeBottomUpAndCheckIfElementExist(driver, "See his/her Vestiaire", "AccessibilityId");
            })
            .elementByAccessibilityId('Seller')
            .should.eventually.exist
            .hasElementByAccessibilityId('FOLLOW')
            .then(function (exist) {
                if (exist)
                    return driver.elementByAccessibilityId('FOLLOW')
                        .should.eventually.exist
                        .click()
                        .waitForElementByAccessibilityId('SUBSCRIBER',5000)
                        .should.eventually.exist;

                else
                    return driver.elementByAccessibilityId('SUBSCRIBER')
                        .should.eventually.exist
                        .click()
                        .waitForElementByAccessibilityId('FOLLOW',5000)
                        .should.eventually.exist; 
            })
            .elementByAccessibilityId('See his/her Vestiaire')
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('picto share',5000)
            .should.eventually.exist
            .elementByAccessibilityId('back white')
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeTable/XCUIElementTypeCell[7]/XCUIElementTypeButton[1]',5000)
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeScrollView/XCUIElementTypeOther[1]/XCUIElementTypeOther/XCUIElementTypeOther[2]/XCUIElementTypeImage',5000)
            .should.eventually.exist
            .hasElementByAccessibilityId('Following')
            .then(function (exist) {
                if (exist)
                    return driver.elementByAccessibilityId('Following')
                        .should.eventually.exist;

                else
                    return driver.elementByAccessibilityId('Follow')
                        .should.eventually.exist;
            })
            .nodeify(done);
    });
});