require('../setup');

const wd = require("wd"),
    actions = require('../actions'),
    _shared = require('../shared/login-ios');

wd.addPromiseChainMethod('swipe', actions.swipe);

const opts = {
    port: 4723
};

const desired = require('../desired').ios;

describe("My favourites", function () {
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

    it("Ajouter ou enlever un produit dans ma wish list", function (done) {
        //_shared.methods.shouldLogin(driver)
        driver
            .hasElementByAccessibilityId('I UNDERSTOOD')
            .then(function (exist) {
                if (exist) {
                    return driver.waitForElementByAccessibilityId('I UNDERSTOOD', 5000)
                        .should.eventually.exist
                        .elementByAccessibilityId('Later')
                        .should.eventually.exist
                        .click()
                }
                else
                    return driver;
            })

            .hasElementByAccessibilityId('Allow')
            .then(function (exist) {
                if (exist) {
                    return driver.waitForElementByAccessibilityId('Allow', 5000)
                        .should.eventually.exist
                        .elementByAccessibilityId('Don’t Allow')
                        .should.eventually.exist
                        .click();
                }
                else
                    return driver;
            })
            .waitForElementByXPath("(//XCUIElementTypeButton[@name=\"like product\"])[1]", 5000)
            .click()
            .waitForElementByAccessibilityId("bar_notif_confirm", 500)
            .should.eventually.exist
            .hasElementByAccessibilityId("This item has been added to your favourites")
            .then(function (exist) {
                if (exist) {
                    return driver.elementByAccessibilityId("This item has been added to your favourites");
                }
                else
                    return driver.elementByAccessibilityId("This item has been removed from your favourites");
            })
            .should.eventually.exist
            // Ne pouvoir pas vérifier dans la page Profile > My wishlist car le temps d'attendre est trop long
            .nodeify(done);

    });
});