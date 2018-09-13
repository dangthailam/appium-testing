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
    it('Vérification la direction à la produit page ', function (done) {
        var informationStr = [];

        driver.waitForElementByAccessibilityId("Me", 5000)
            .elementsByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeCollectionView/XCUIElementTypeCell[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[2]/XCUIElementTypeStaticText')
            .then(function (elements) {
                var count = elements.length;
                var counter = 0;
                var deferred = Q.defer();
                elements.forEach(function (e) {
                    e.getValue().then(function (val) {
                        informationStr.push(val);
                        counter++;

                        if (counter === count) {
                            deferred.resolve(true);
                        }
                    });
                });
                return deferred.promise;
            })
            .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeCollectionView/XCUIElementTypeCell[1]/XCUIElementTypeOther/XCUIElementTypeOther')
            .click()
            .waitForElementsByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeTable/XCUIElementTypeCell[2]/XCUIElementTypeStaticText', 4000)
            .then(function (elements) {
                var count = elements.length;
                var counter = 0;
                var secondPageInformation = [];
                var deferred = Q.defer();
                elements.forEach(function (e) {
                    e.getValue().then(function (val) {
                        secondPageInformation.push(val);
                        counter++;

                        if (counter === count) {
                            deferred.resolve(secondPageInformation);
                        }
                    });
                });
                return deferred.promise;
            })
            .then(function (secondPageInfos) {
                var arr1 = informationStr.map(function (i) {
                    return i.toLowerCase();
                });

                var arr2 = secondPageInfos.map(function (i) {
                    return i.toLowerCase();
                });

                console.log(arr1, arr2);
                return arr1.every(function (info) {
                    return arr2.indexOf(info) !== -1;
                });
            })
            .should.eventually.be.true
            .sleep(1000)
            .nodeify(done);
    });
    it("Produit page - Bloc générale", function (done) {
        driver
            .waitForElementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeCollectionView/XCUIElementTypeCell[1]/XCUIElementTypeOther/XCUIElementTypeOther', 5000)
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeTable/XCUIElementTypeCell[1]', 5000)
            .should.eventually.exist
            .swipe({
                startX: 100,
                startY: 400,
                endX: 100,
                endY: 100,
                duration: 800
            })
            .waitForElementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeTable/XCUIElementTypeCell[2]', 5000)
            .should.eventually.exist
            .hasElementByAccessibilityId('More Info')
            .then(function (exist) {
                if (exist)
                    return driver.elementByAccessibilityId('More Info')
                        .should.eventually.exist
                        .click()
                        .waitForElementByAccessibilityId('Cancel',5000)
                        .should.eventually.exist
                        .click();
                else
                    return driver;
            })
            .sleep(500)
            .hasElementByXPath('(//XCUIElementTypeButton[@name="More Info"])[2]')
            .then(function (exist) {
                if (exist)
                    return driver.elementByXPath('(//XCUIElementTypeButton[@name="More Info"])[2]')
                        .should.eventually.exist
                        .click()
                        .waitForElementByXPath('//XCUIElementTypeOther[@name="Size guide"]', 10000)
                        .should.eventually.exist
                        .elementByAccessibilityId('Cancel')
                        .should.eventually.exist
                        .click()
                        .waitForElementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeTable/XCUIElementTypeCell[1]',5000)
                        .should.eventually.exist;
                else
                    return driver.elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeTable/XCUIElementTypeCell[1]')
                        .should.eventually.exist;
            })
            .sleep(500)
            // .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeTable/XCUIElementTypeCell[2]/XCUIElementTypeButton[2]')
            // .should.eventually.exist
            // .click()
            // .waitForElementByAccessibilityId('cover-default',5000)
            // .should.eventually.exist
            // .elementByXPath('//XCUIElementTypeButton[@name="picto share"]')
            // .should.eventually.exist
            // .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeScrollView/XCUIElementTypeOther[1]/XCUIElementTypeOther/XCUIElementTypeOther[2]', 5000)
            // .should.eventually.exist
            // .elementByAccessibilityId('back white')
            // .should.eventually.exist
            // .click()
            // .waitForElementByAccessibilityId('Vestiaire_Collective.VCProductDetailWrapperView', 5000)
            // .should.eventually.exist

            .nodeify(done);
    });
});