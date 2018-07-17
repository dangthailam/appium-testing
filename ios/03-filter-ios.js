require('../setup');

const wd = require("wd"),
    actions = require('../actions'),
    _shared = require('../shared/login-ios');

wd.addPromiseChainMethod('swipe', actions.swipe);

const opts = {
    port: 4723
};

const desired = require('../desired').ios;

describe("Filtre", function () {
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

    beforeEach(function() {
        return driver.init(desired);
    });

    afterEach(function() {
        allPassed = allPassed && this.currentTest.state === 'passed';
        return driver.quit();
    });

    it("Filtre", function (done) {
        _shared.login.shouldLogin(driver)
            .elementByAccessibilityId("Home")
            .should.eventually.exist
            .click()
            .sleep(500)
            .swipe({
                startX: 100,
                startY: 600,
                endX: 200,
                endY: 200,
                duration: 800
            })
            .swipe({
                startX: 100,
                startY: 600,
                endX: 200,
                endY: 200,
                duration: 800
            })
            /// Check cai swipe de keo xuong
            .elementByAccessibilityId("SEE ALL NEW ITEMS")
            .should.eventually.exist
            .click()
            .elementByAccessibilityId("New items")
            .should.eventually.exist
            .elementByAccessibilityId("Back")
            .should.eventually.exist
            .elementByAccessibilityId("btn-cart")
            .should.eventually.exist
            .elementByAccessibilityId("FILTER & SORT")
            .should.eventually.exist
            .click()
            .elementByAccessibilityId("Close")
            .should.eventually.exist
            .click()
            .elementByAccessibilityId("Home")
            .click()
            .waitForElementByXPath("//XCUIElementTypeApplication[@name=\"Vestiaire\"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[2]/XCUIElementTypeTextField",500)
            .click()
            .elementByAccessibilityId("Close")
            .should.eventually.exist
            .elementByXPath("//XCUIElementTypeApplication[@name=\"Vestiaire\"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTextField")
            .click()
            .elementByAccessibilityId("Dior")
            .should.eventually.exist
            .elementByXPath("(//XCUIElementTypeButton[@name=\"cross historic\"])[1]")
            .should.eventually.exist
            .click()
            .sendKeys("Dior")
            .waitForElementByAccessibilityId("dior",500)
            .should.eventually.exist
            .elementByXPath("//XCUIElementTypeNavigationBar[@name=\"Dior 26499 items\"]")
            .should.eventually.exist
            .elementByXPath("//XCUIElementTypeApplication[@name=\"Vestiaire\"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeTabBar")
            .should.eventually.exist
            .elementByXPath("//XCUIElementTypeApplication[@name=\"Vestiaire\"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeCollectionView/XCUIElementTypeCell[1]/XCUIElementTypeOther/XCUIElementTypeOther")
            .should.eventually.exist
            .elementByAccessibilityId("Back")
            .should.eventually.exist
            .elementByAccessibilityId("FILTER & SORT")
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId("Woman categories",500)
            .should.eventually.exist
            .click()
            .elementByAccessibilityId("Bags")
            .should.eventually.exist
            .elementByAccessibilityId("arrow_up_categories")
            .should.eventually.exist
            .click()
            .waitForElementByXPath("//XCUIElementTypeApplication[@name=\"Vestiaire\"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[2]",500)
            .should.eventually.exist
            .click()
            .elementByXPath("//XCUIElementTypeApplication[@name=\"Vestiaire\"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[5]")
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId("CONFIRM",1000)
            .click()
            .waitForElementByXPath("//XCUIElementTypeSwitch[@name=\"Ready to ship  Items shipped within 48 hours (304)\"]",500)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId("SEE (308 RESULTS)",500)
            .should.eventually.exist
            .click()
            .waitForElementByXPath("//XCUIElementTypeNavigationBar[@name=\"Dior 308 items\"]",500)
            .should.eventually.exist
            .elementByXPath("//XCUIElementTypeApplication[@name=\"Vestiaire\"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeCollectionView/XCUIElementTypeCell[1]/XCUIElementTypeOther/XCUIElementTypeOther")
            .should.eventually.exist
            .elementByAccessibilityId("ALERT")
            .should.eventually.exist
            .elementByAccessibilityId("FILTER (2)")
            .should.eventually.exist
            .nodeify(done);
    });
});