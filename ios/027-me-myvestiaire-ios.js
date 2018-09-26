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

describe("Partie ME - My Vestiaire", function () {
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
    it("ME - My Vestiaire/My items", function (done) {
        driver.sleep(5000)
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
            .waitForElementByXPath('//XCUIElementTypeButton[@name="Me"]', 4000)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('My Vestiaire', 5000)
            .should.eventually.exist
            .elementByAccessibilityId('My items')
            .should.eventually.exist
            .elementByXPath('(//XCUIElementTypeImage[@name="arrow-right"])[2]')
            .should.eventually.exist
            .click()
            .sleep(2000)
            .hasElementByAccessibilityId('Items for sale')
            .then(function (exist) {
                if (exist)
                    return driver.elementByAccessibilityId('Items for sale')
                        .should.eventually.exist;

                else
                    return driver;
            })
            .hasElementByXPath('//XCUIElementTypeStaticText[starts-with(@name,"Offers received")]')
            .then(function (exist) {
                if (exist)
                    return driver.elementByXPath('//XCUIElementTypeStaticText[starts-with(@name,"Offers received")]')
                        .should.eventually.exist
                        .click()
                        .waitForElementByXPath('/XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell', 5000)
                        .should.eventually.exist
                        .elementByXPath('//XCUIElementTypeOther[@name="Offers received"]')
                        .should.eventually.exist
                        .elementByAccessibilityId('me alerts params')
                        .isEnabled()
                        .should.eventually.be.true
                        .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell/XCUIElementTypeImage[1]')
                        .should.eventually.exist
                        .elementByAccessibilityId('My items')
                        .should.eventually.exist
                        .click()
                        .sleep(500);
                else
                    return driver;
            })
            .hasElementByXPath('//XCUIElementTypeStaticText[starts-with(@name,"My items for sale")]')
            .then(function (exist) {
                if (exist)
                    return driver.elementByXPath('//XCUIElementTypeStaticText[starts-with(@name,"My items for sale")]')
                        .should.eventually.exist
                        .click()
                        .waitForElementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[1]', 5000)
                        .should.eventually.exist
                        .elementByXPath('//XCUIElementTypeOther[@name="My items for sale"]')
                        .should.eventually.exist
                        .elementByAccessibilityId('me alerts params')
                        .isEnabled()
                        .should.eventually.be.true
                        .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[1]/XCUIElementTypeImage[1]')
                        .should.eventually.exist
                        .elementByAccessibilityId('My items')
                        .should.eventually.exist
                        .click()
                        .sleep(500);

                else
                    return driver;
            })
            .hasElementByAccessibilityId('Items in process')
            .then(function (exist) {
                if (exist)
                    return driver.elementByAccessibilityId('Items in process')
                        .should.eventually.exist;
                else
                    return driver;
            })
            .hasElementByXPath('//XCUIElementTypeStaticText[starts-with(@name,"More photos requested")]')
            .then(function (exist) {
                if (exist)
                    return driver.elementByXPath('//XCUIElementTypeStaticText[starts-with(@name,"More photos requested")]')
                        .should.eventually.exist
                        .click()
                        .waitForElementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell', 5000)
                        .should.eventually.exist
                        .elementByXPath('//XCUIElementTypeOther[@name="More photos requested"]')
                        .should.eventually.exist
                        .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell/XCUIElementTypeImage')
                        .should.eventually.exist
                        .elementByAccessibilityId('My items')
                        .should.eventually.exist
                        .click()
                        .sleep(500);

                else
                    return driver;
            })
            .hasElementByAccessibilityId('Historical')
            .then(function (exist) {
                if (exist)
                    return driver.elementByAccessibilityId('Historical')
                        .should.eventually.exist;

                else
                    return driver;
            })
            .hasElementByXPath('//XCUIElementTypeStaticText[starts-with(@name,"Sold items")]')
            .then(function (exist) {
                if (exist)
                    return driver.elementByXPath('//XCUIElementTypeStaticText[starts-with(@name,"Sold items")]')
                        .should.eventually.exist
                        .click()
                        .waitForElementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell', 5000)
                        .should.eventually.exist
                        .elementByXPath('//XCUIElementTypeOther[@name="Sold items"]')
                        .should.eventually.exist
                        .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell/XCUIElementTypeImage')
                        .should.eventually.exist
                        .elementByAccessibilityId('My items')
                        .should.eventually.exist
                        .click()
                        .sleep(500);

                else
                    return driver;
            })
            .hasElementByXPath('//XCUIElementTypeStaticText[starts-with(@name,"Refused items")]')
            .then(function (exist) {
                if (exist)
                    return driver.elementByXPath('//XCUIElementTypeStaticText[starts-with(@name,"Refused items")]')
                        .should.eventually.exist
                        .click()
                        .waitForElementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell', 5000)
                        .should.eventually.exist
                        .elementByXPath('//XCUIElementTypeOther[@name="Refused items"]')
                        .should.eventually.exist
                        .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell/XCUIElementTypeImage')
                        .should.eventually.exist
                        .elementByAccessibilityId('My items')
                        .should.eventually.exist
                        .click()
                        .sleep(500);

                else
                    return driver;
            })
            .hasElementByXPath('//XCUIElementTypeStaticText[starts-with(@name,"Unreceived items")]')
            .then(function (exist) {
                if (exist)
                    return driver.elementByXPath('//XCUIElementTypeStaticText[starts-with(@name,"Unreceived items")]')
                        .should.eventually.exist
                        .click()
                        .waitForElementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell', 5000)
                        .should.eventually.exist
                        .elementByXPath('//XCUIElementTypeOther[@name="Unreceived items"]')
                        .should.eventually.exist
                        .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell/XCUIElementTypeImage')
                        .should.eventually.exist
                        .elementByAccessibilityId('My items')
                        .should.eventually.exist
                        .click()
                        .waitForElementByXPath('(//XCUIElementTypeButton[@name="Me"])[1]', 5000)
                        .should.eventually.exist
                        .click()
                        .waitForElementByXPath('//XCUIElementTypeOther[@name="Me"]', 5000)
                        .should.eventually.exist;

                else
                    return driver;
            })
            .nodeify(done);
    });
    it("ME - My Vestiaire/My orders", function (done) {
        driver.sleep(5000)
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
            .waitForElementByXPath('//XCUIElementTypeButton[@name="Me"]', 5000)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('My Vestiaire', 5000)
            .should.eventually.exist
            .elementByAccessibilityId('My orders')
            .should.eventually.exist
            .elementByXPath('(//XCUIElementTypeImage[@name="arrow-right"])[3]')
            .should.eventually.exist
            .click()
            .hasElementByXPath('(//XCUIElementTypeImage[@name="arrow-noire-down"])[1]')
            .then(function (exist) {
                if (exist)
                    return driver.elementByXPath('(//XCUIElementTypeImage[@name="arrow-noire-down"])[1]')
                        .should.eventually.exist
                        .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[1]', 5000)
                        .should.eventually.exist
                        .click()
                        .waitForElementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[2]', 5000)
                        .should.eventually.exist
                        .elementByAccessibilityId('arrow-right')
                        .should.eventually.exist
                        .click()
                        .waitForElementByXPath('//XCUIElementTypeOther[@name="Follow item"]', 5000)
                        .should.eventually.exist
                        .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeImage')
                        .should.eventually.exist
                        .elementByAccessibilityId('Order Cancelled')
                        .should.eventually.exist
                        .elementByAccessibilityId('Receipt Not received')
                        .should.eventually.exist
                        .elementByAccessibilityId('Quality control')
                        .should.eventually.exist
                        .elementByAccessibilityId('My orders')
                        .should.eventually.exist
                        .click()
                        .waitForElementByXPath('(//XCUIElementTypeButton[@name="Me"])[1]', 5000)
                        .should.eventually.exist
                        .click()
                        .waitForElementByXPath('//XCUIElementTypeOther[@name="Me"]', 5000)
                        .should.eventually.exist;
                else
                    return driver;
            })
            .nodeify(done);
    });
    it("ME - My Vestiaire/Price offers sent", function (done) {
        driver.sleep(5000)
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
            .waitForElementByXPath('//XCUIElementTypeButton[@name="Me"]', 5000)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('My Vestiaire', 5000)
            .should.eventually.exist
            .elementByXPath('(//XCUIElementTypeImage[@name="arrow-right"])[4]')
            .should.eventually.exist
            .elementByAccessibilityId('Price offers sent')
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeOther[@name="Price offers sent"]', 5000)
            .should.eventually.exist
            .elementByAccessibilityId('me alerts params')
            .isEnabled()
            .should.eventually.be.true
            .sleep(1000)
            .hasElementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell/XCUIElementTypeImage[1]')
            .then(function (exist) {
                if (exist)
                    return driver
                        .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell/XCUIElementTypeImage[1]')
                        .should.eventually.exist
                        .click()
                        .waitForElementByXPath('//XCUIElementTypeOther[@name="Negotiating area"]', 5000)
                        .should.eventually.exist
                        .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[1]/XCUIElementTypeImage')
                        .should.eventually.exist
                        .elementByAccessibilityId('Price offers sent')
                        .should.eventually.exist
                        .click()
                        .waitForElementByXPath('(//XCUIElementTypeButton[@name="Me"])[1]', 5000)
                        .should.eventually.exist
                        .click()
                        .waitForElementByXPath('//XCUIElementTypeOther[@name="Me"]', 5000)
                        .should.eventually.exist;
                else
                    return driver
                        .elementByXPath('//XCUIElementTypeStaticText[@name="You have no current negotiations."]')
                        .should.eventually.exist;
            })
            .nodeify(done);
    });
});