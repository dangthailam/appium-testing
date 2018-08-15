require('../setup');

const wd = require("wd"),
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
    it("Paiment / Delivery adresse", function (done) {
        driver
            .waitForElementByAccessibilityId("btn-cart", 5000)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId("Cancel", 5000)
            .should.eventually.exist
            .waitForElementByXPath('//XCUIElementTypeStaticText[@name="Basket 2 items"]',2000)
            .should.eventually.exist
            .elementByAccessibilityId('Edit')
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[1]')
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[2]')
            .should.eventually.exist
            .elementByAccessibilityId("2 items")
            .should.eventually.exist
            .elementByAccessibilityId("Total including taxes:")
            .should.eventually.exist
            .elementByAccessibilityId("COMPLETE MY ORDER")
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeNavigationBar[@name="Payment"]', 1000)
            .should.eventually.exist
            .waitForElementByAccessibilityId('Option 1: home delivery 8,90 €',2000)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('Set up a new address',10000)
            .should.eventually.exist
            .elementByAccessibilityId('arrow-right')
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeNavigationBar[@name="Enter address"]', 5000)
            .should.eventually.exist
            .elementByAccessibilityId('Delivery addresses')
            .should.eventually.exist
            .elementByAccessibilityId('Address name *')
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[1]/XCUIElementTypeTextField')
            .should.eventually.exist
            .sendKeys("ABC")
            .elementByAccessibilityId('Title *')
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('Mr', 5000)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('First name *', 5000)
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[3]/XCUIElementTypeTextField')
            .should.eventually.exist
            .sendKeys("LKJ")
            .sleep(500)
            .swipe({
                startX: 100,
                startY: 300,
                endX: 100,
                endY: 100,
                duration: 800
            })
            .elementByAccessibilityId('Surname *')
            .should.eventually.exist
            .sendKeys("BABY")
            .sleep(500)
            .swipe({
                startX: 100,
                startY: 300,
                endX: 100,
                endY: 100,
                duration: 800
            })
            .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[4]/XCUIElementTypeTextField')
            .should.eventually.exist
            .elementByAccessibilityId('Country *')
            .should.eventually.exist
            .click()
            .sleep(500)
            .swipe({
                startX: 100,
                startY: 300,
                endX: 100,
                endY: 100,
                duration: 800
            })
            .waitForElementByAccessibilityId("France", 500)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('Address *', 500)
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[7]/XCUIElementTypeTextField')
            .should.eventually.exist
            .sendKeys('FGH')
            .sleep(500)
            .swipe({
                startX: 100,
                startY: 300,
                endX: 100,
                endY: 100,
                duration: 800
            })
            .elementByAccessibilityId('Zip Code *')
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[9]/XCUIElementTypeTextField')
            .should.eventually.exist
            .sendKeys('75001')
            .sleep(500)
            .swipe({
                startX: 100,
                startY: 300,
                endX: 100,
                endY: 100,
                duration: 800
            })
            .elementByAccessibilityId('City *')
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[10]/XCUIElementTypeTextField')
            .should.eventually.exist
            .sendKeys('ABC')
            .sleep(500)
            .swipe({
                startX: 100,
                startY: 300,
                endX: 100,
                endY: 100,
                duration: 800
            })
            .elementByAccessibilityId('Phone *')
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[11]/XCUIElementTypeTextField')
            .sendKeys('0123456')
            .sleep(500)
            .swipe({
                startX: 100,
                startY: 300,
                endX: 100,
                endY: 100,
                duration: 800
            })
            .elementByAccessibilityId("SAVE ADDRESS")
            .should.eventually.exist
            .click()
            .sleep(500)
            .hasElementByAccessibilityId('bar_notif_confirm')
            .then(function (exist) {
                if (exist) {
                    return driver.elementByAccessibilityId('bar_notif_confirm') // Test profond partie set up new adresse
                    .sleep();
                }
                else
                    return driver.elementByAccessibilityId('bar_notif_error')
                    .sleep(3000)
                    .elementByAccessibilityId("Delivery addresses")
                    .should.eventually.exist
                    .click();
            })
            .waitForElementByXPath('(//XCUIElementTypeButton[@name="Edit"])[2]', 1000)
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeOther[@name="Enter address"]',1000)
            .should.eventually.exist
            .elementByAccessibilityId('Delivery addresses')
            .should.eventually.exist
            .sleep(500)
            .elementByAccessibilityId('Phone *')
            .should.eventually.exist
            .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[11]/XCUIElementTypeTextField')
            .should.eventually.exist
            .clear()
            .sleep(500)
            .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[11]/XCUIElementTypeTextField')
            .should.eventually.exist
            .sendKeys('0'+ Date.now()) 
            .sleep(1000)
            .swipe({
                startX: 100,
                startY: 300,
                endX: 100,
                endY: 100,
                duration: 800
            })
            .elementByAccessibilityId("SAVE ADDRESS")
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('bar_notif_confirm', 10000)
            .should.eventually.exist 
            .waitForElementByAccessibilityId('Option 2: collection point delivery 8,90 € - Ensured by Colissimo',1000)
            .should.eventually.exist
            .click()
            .waitForElementByAccessibilityId('Choose a collection point', 5000)
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[1]',5000)
            .should.eventually.exist
            .click()
            .waitForElementByXPath('(//XCUIElementTypeImage[@name="unselected"])[1]',2000)
            .should.eventually.exist
            .waitForElementByAccessibilityId('Payment', 5000)
            .should.eventually.exist
            .click()
            .waitForElementByXPath('//XCUIElementTypeNavigationBar[@name="Payment"]', 1000) 
            .should.eventually.exist
            .nodeify(done);
    });
});