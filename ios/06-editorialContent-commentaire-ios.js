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

    beforeEach(function() {
        return driver.init(desired);
    });

    afterEach(function() {
        allPassed = allPassed && this.currentTest.state === 'passed';
        return driver.quit();
    });

    it("Vérifier que l'on peut cliquer sur les contenus édito / que l'on peut écrire les commentaires", function (done) {
        _shared.login.shouldLogin(driver)
        .elementByAccessibilityId("Home")
        .should.eventually.exist
        .click()
        .sleep(500)
        .swipe({
            startX: 400,
            startY: 600,
            endX: 200,
            endY: 200,
            duration: 800
        })  // KO swipe
        .elementByXPath("//XCUIElementTypeApplication[@name=\"Vestiaire\"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeCollectionView/XCUIElementTypeCell[3]/XCUIElementTypeOther/XCUIElementTypeImage[1]")
        .should.eventually.exist
        .click()
        .elementByXPath("//XCUIElementTypeApplication[@name=\"Vestiaire\"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeCollectionView")
        .should.eventually.exist
        .elementByAccessibilityId("btn-cart")
        .should.eventually.exist
        .elementByAccessibilityId("Back")
        .should.eventually.exist
        .click()
        .sleep(500)
        .swipe({
            startX: 400,
            startY: 600,
            endX: 200,
            endY: 200,
            duration: 1000
        })
        .elementByXPath("//XCUIElementTypeApplication[@name=\"Vestiaire\"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeCollectionView/XCUIElementTypeCell[3]/XCUIElementTypeOther/XCUIElementTypeImage[1]")
        .should.eventually.exist
        .click()
        .waitForElementByXPath("//XCUIElementTypeApplication[@name=\"Vestiaire\"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeCollectionView",500)
        .should.eventually.exist
        .elementByAccessibilityId("btn-cart")
        .should.eventually.exist
        .elementByAccessibilityId("Back")
        .should.eventually.exist
        .click()
        .sleep(500)
        .swipe({
            startX: 400,
            startY: 600,
            endX: 200,
            endY: 200,
            duration: 1000
        })
        .elementByXPath("//XCUIElementTypeApplication[@name=\"Vestiaire\"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeCollectionView/XCUIElementTypeCell[3]/XCUIElementTypeOther/XCUIElementTypeImage[1]")
        .should.eventually.exist
        .click()
        .waitForElementByAccessibilityId("main",500)
        .should.eventually.exist
        .elementByAccessibilityId("Back")
        .should.eventually.exist
        .click()
        .sleep(500)
        .swipe({
            startX: 400,
            startY: 600,
            endX: 200,
            endY: 200,
            duration: 1000
        })
        .elementByXPath("//XCUIElementTypeApplication[@name=\"Vestiaire\"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeCollectionView/XCUIElementTypeCell[3]/XCUIElementTypeOther/XCUIElementTypeImage[1]")
        .should.eventually.exist
        .click()
        .waitForElementByXPath("//XCUIElementTypeNavigationBar[@name=\"Sell\"]",500)
        .should.eventually.exist
        .elementByAccessibilityId("btn-sell")
        .should.eventually.exist
        .elementByAccessibilityId("Home")
        .should.eventually.exist
        .click()
        .sleep(500)
        .swipe({
            startX: 400,
            startY: 600,
            endX: 200,
            endY: 200,
            duration: 1000
        })
        .elementByXPath("//XCUIElementTypeApplication[@name=\"Vestiaire\"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeCollectionView/XCUIElementTypeOther[3]/XCUIElementTypeButton")
        .should.eventually.exist
        .click()
        .waitForElementByAccessibilityId("main",500)
        .should.eventually.exist
        .elementByAccessibilityId("Back")
        .should.eventually.exist
        .click()
        .waitForElementByXPath("//XCUIElementTypeApplication[@name=\"Vestiaire\"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[2]/XCUIElementTypeTextField",500)
        .should.eventually.exist
        .sendKeys("5731296")
        .sleep(500)
        .swipe({
            startX: 400,
            startY: 600,
            endX: 200,
            endY: 200,
            duration: 1000
        })
        .elementByAccessibilityId("WRITE A COMMENT")
        .should.eventually.exist
        .click()
        .waitForElementByXPath("//XCUIElementTypeOther[@name=\"Chat\"]",500)
        .should.eventually.exist
        .elementByAccessibilityId("Add a comment...")
        .sendKeys("test")
        .elementByAccessibilityId("Send")
        .click()
        .waitForElementByXPath("//XCUIElementTypeApplication[@name=\"Vestiaire\"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[2]",500)
        .should.eventually.exist
        .elementByAccessibilityId("Close")
        .should.eventually.exist
        .click()
        .waitForElementByAccessibilityId("WRITE A COMMENT",500)
        .should.eventually.exist
        .nodeify(done);

    });
});