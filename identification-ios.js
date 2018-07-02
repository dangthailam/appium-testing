require('./setup');

const wd = require("wd");
// const addContext = require('mochawesome/addContext');

const opts = {
    port: 4723
};

const desired = require('./desired').ios;

describe("Identification user", function() {
    this.timeout(300000);
    let driver;
    let passed = false;

    before(function() {
        driver = wd.promiseChainRemote(opts);
        require("./logging").configure(driver);
        return driver
            .init(desired);
    });

    after(function() {
        if(!passed){
            console.log("not passed");
        }
        return driver
            .quit()
            .finally(function() {
                console.log('finish');
            });
    });

    it("Login with email and password", function(done) {
        driver.sleep(3000)
            //.elementsByClassName('XCUIElementTypeCell')
            //XCUIElementTypeStaticText[@name="New in We love"]
            .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeCollectionView/XCUIElementTypeCell[1]')
            .should.eventually.exist
            .click()
            .sleep(1000)
            .elementByAccessibilityId('btn-login')
            .should.eventually.exist
            .click()
            .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[2]/XCUIElementTypeTextField')
            .should.eventually.exist
            .sendKeys('lebichngoc090589@gmail.com')
            .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[3]/XCUIElementTypeSecureTextField')
            .should.eventually.exist
            .sendKeys('09051989')
            .elementByXPath('//XCUIElementTypeButton[@name="LOG IN"]')
            .should.eventually.exist
            .click()
            .sleep(2000)
            .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeCollectionView')
            .should.eventually.exist
            .nodeify(done);
            
    });
});