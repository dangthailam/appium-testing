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
    it("Vérifier que l'on peut cliquer sur les contenus édito", function (done) {
        _shared.methods.shouldLogin(driver)
        // driver.sleep(500)
            .then(function () {
                return _shared.methods.swipeBottomUpAndCheckIfElementExist(driver, "//XCUIElementTypeApplication[@name=\"Vestiaire\"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeCollectionView/XCUIElementTypeCell[3]/XCUIElementTypeOther/XCUIElementTypeImage[1]")
            })
            .should.eventually.exist
            .click()
            // Ne pouvoir pas vérifier le contenu car ça change tout le temps > element change
            .elementByAccessibilityId("Back")
            .should.eventually.exist
            .click()
            .sleep(500)
            .then(function () {
                return _shared.methods.swipeBottomUpAndCheckIfElementExist(driver, "//XCUIElementTypeApplication[@name=\"Vestiaire\"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeCollectionView/XCUIElementTypeCell[3]/XCUIElementTypeOther/XCUIElementTypeImage[1]")
            })
            .should.eventually.exist
            .click()
            .elementByAccessibilityId("Back")
            .should.eventually.exist
            .click()
            .sleep(500)
            .then(function () {
                return _shared.methods.swipeBottomUpAndCheckIfElementExist(driver,"//XCUIElementTypeApplication[@name=\"Vestiaire\"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeCollectionView/XCUIElementTypeCell[3]/XCUIElementTypeOther/XCUIElementTypeImage[1]")
            })
            .should.eventually.exist
            .click()
            .elementByAccessibilityId("Back")
            .should.eventually.exist
            .click()
            .sleep(500)
            .then(function () {
                return _shared.methods.swipeBottomUpAndCheckIfElementExist(driver,"//XCUIElementTypeApplication[@name=\"Vestiaire\"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeCollectionView/XCUIElementTypeCell[3]/XCUIElementTypeOther/XCUIElementTypeImage[1]")
            })
            .should.eventually.exist
            .click()
            .elementByAccessibilityId("Back")
            .should.eventually.exist
            .click()
            .sleep(500)
            .then(function () {
                return _shared.methods.swipeBottomUpAndCheckIfElementExist(driver,"//XCUIElementTypeApplication[@name=\"Vestiaire\"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeCollectionView/XCUIElementTypeOther[3]/XCUIElementTypeButton")
            })
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId("Back",500)
            .should.eventually.exist
            .elementByXPath("//XCUIElementTypeApplication[@name=\"Vestiaire\"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeCollectionView/XCUIElementTypeOther[3]/XCUIElementTypeButton")
            .should.eventually.exist
            .nodeify(done);

            // .elementByAccessibilityId("WRITE A COMMENT")
            // .should.eventually.exist
            // .click()
            // .waitForElementByXPath("//XCUIElementTypeOther[@name=\"Chat\"]", 500)
            // .should.eventually.exist
            // .elementByAccessibilityId("Add a comment...")
            // .sendKeys("test")
            // .elementByAccessibilityId("Send")
            // .click()
            // .waitForElementByXPath("//XCUIElementTypeApplication[@name=\"Vestiaire\"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[2]", 500)
            // .should.eventually.exist
            // .elementByAccessibilityId("Close")
            // .should.eventually.exist
            // .click()
            // .waitForElementByAccessibilityId("WRITE A COMMENT", 500)
            // .should.eventually.exist
            // .nodeify(done);

    });

    it("Vérifier que l'on peut écrire les commentaires", function (done) {
        //_shared.methods.shouldLogin(driver)
        driver.sleep(200)
            .waitForElementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeCollectionView/XCUIElementTypeCell[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeImage', 3000)
            .should.eventually.exist
            .click()
            .sleep(500)
            .then(function () {
                return _shared.methods.swipeBottomUpAndCheckIfElementExist(driver, "WRITE A COMMENT");
            })
            .should.eventually.exist
            .click()
            .waitForElementByXPath("//XCUIElementTypeOther[@name=\"Chat\"]", 500)
            .should.eventually.exist
            .elementByAccessibilityId("Add a comment...")
            .sendKeys("test")
            .elementByAccessibilityId("Send")
            .click()
            .waitForElementByXPath("//XCUIElementTypeApplication[@name=\"Vestiaire\"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[2]", 500)
            .should.eventually.exist
            .elementByAccessibilityId("Close")
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId("WRITE A COMMENT", 500)
            .should.eventually.exist
            .nodeify(done);
    });

    
});