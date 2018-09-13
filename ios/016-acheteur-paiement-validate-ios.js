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

describe("Paiement", function () {
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

    function parsePriceToNumber(val) {
        return parseFloat(val.substring(0, val.length - 2).replace(',','.'));
    }

    it("Paiment / Valider le paiement", function (done) {
        var totalByCalculated = 0;
        var totalReal = 0;
        var firstInsuranceFee = 0;
        var firstTotalIncludeTaxe = 0;
        var secondTotalReal = 0;
        var secondTotalIncludeTaxe = 0;

        //_shared.methods.shouldLogin(driver, 'ngoc.le+4@vestiairecollective.com', '002299')
            driver.sleep(500)
            .waitForElementByAccessibilityId("btn-cart", 2000)
            .should.eventually.exist
            .click()
            .sleep(2000)
            .waitForElementByAccessibilityId("Cancel", 5000)
            .should.eventually.exist
            .elementByAccessibilityId('Edit')
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[1]')
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[2]')
            .should.eventually.exist
            .elementByAccessibilityId("2 items")
            .should.eventually.exist
            // extract all items and accumulate their prices
            .elementsByXPath('//XCUIElementTypeWindow[1]//XCUIElementTypeTable/XCUIElementTypeCell/XCUIElementTypeStaticText[4]')
            .then(function(elements){
                var items = elements.length;
                var deferred = Q.defer();
                var counter = 0;

                elements.forEach(function(e) {
                    e.getValue().then(function(val) {
                        counter++;
                        totalByCalculated += parsePriceToNumber(val);

                        if(counter == items) {
                            deferred.resolve(true);
                        }
                    });
                });
                return deferred.promise;
            })
            .elementByXPath('//XCUIElementTypeOther[XCUIElementTypeStaticText[contains(@value, "item")]]/XCUIElementTypeStaticText[2]')
            .then(function(e) {
                var deferred = Q.defer();

                e.getValue()
                    .then(function(val) {
                        totalReal = parsePriceToNumber(val);
                        deferred.resolve(true);
                    });

                return deferred.promise;
            })
            .elementByXPath('//XCUIElementTypeOther[XCUIElementTypeStaticText[starts-with(@value, "Contribution to postage and insurance fees:")]]/XCUIElementTypeStaticText[2]')
            .then(function(e) {
                var deferred = Q.defer();

                e.getValue().then(function(val) {
                    firstInsuranceFee = parsePriceToNumber(val);
                    deferred.resolve(true);
                });

                return deferred.promise;
            })
            .elementByXPath('//XCUIElementTypeOther[XCUIElementTypeStaticText[starts-with(@value, "Total including taxes:")]]/XCUIElementTypeStaticText[2]')
            .then(function(e) {
                var deferred = Q.defer();

                e.getValue().then(function(val) {
                    firstTotalIncludeTaxe = parsePriceToNumber(val);
                    deferred.resolve(true);
                });

                return deferred.promise;
            })
            .elementByAccessibilityId('COMPLETE MY ORDER')
            .click()
            .waitForElementByXPath('//XCUIElementTypeNavigationBar[@name="Payment"]', 2000)
            .then(function () {
                return _shared.methods.swipeBottomUpAndCheckIfElementExist(driver, "COMPLETE MY ORDER", "AccessibilityId");
            })
            .elementByXPath('//XCUIElementTypeCell[XCUIElementTypeStaticText[starts-with(@value, "Total including taxes:")]]/XCUIElementTypeStaticText[2]')
            .then(function(e) {
                var deferred = Q.defer();

                e.getValue().then(function(val) {
                    secondTotalIncludeTaxe = parsePriceToNumber(val);
                    deferred.resolve(true);
                });

                return deferred.promise;
            })
            .elementByXPath('//XCUIElementTypeCell[XCUIElementTypeStaticText[contains(@value, "item")]]/XCUIElementTypeStaticText[2]')
            .then(function(e) {
                var deferred = Q.defer();

                e.getValue().then(function(val) {
                    secondTotalReal = parsePriceToNumber(val);
                    deferred.resolve(true);
                });

                return deferred.promise;
            })
            .then(function() {
                console.log('totalByCalculated', totalByCalculated);
                console.log('totalReal', totalReal);
                console.log('firstInsuranceFee', firstInsuranceFee);
                console.log('firstTotalIncludeTaxe', firstTotalIncludeTaxe);
                console.log('secondTotalReal', secondTotalReal);
                console.log('secondTotalIncludeTaxe', secondTotalIncludeTaxe);

                return totalByCalculated === totalReal
                    && totalByCalculated + firstInsuranceFee === firstTotalIncludeTaxe
                    && totalReal === secondTotalReal
                    && firstTotalIncludeTaxe === secondTotalIncludeTaxe;
            })
            .should.eventually.to.be.true
            .nodeify(done);
    });
});