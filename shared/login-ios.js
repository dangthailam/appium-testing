const wd = require('wd');

var swipeCounter = 0;

function shouldLogin(driver, login, password, registerWhenLoginFailed = false) {
    return verifyLoginState(driver)
        .waitForElementByAccessibilityId('btn-login', 2000)
        .click()
        .waitForElementByXPath('//XCUIElementTypeTable/XCUIElementTypeCell[2]/XCUIElementTypeTextField', 1000)
        .sendKeys(login)
        .elementByXPath('//XCUIElementTypeTable/XCUIElementTypeCell[3]/XCUIElementTypeSecureTextField')
        .sendKeys(password)
        .elementByXPath('//XCUIElementTypeButton[@name="Next:"]')
        .click()
        .elementByXPath('//XCUIElementTypeButton[@name="LOG IN"]')
        .should.eventually.exist
        .click()
        .sleep(1000)
        .hasElementByXPath('//XCUIElementTypeButton[@name="Me"]')
        .then(function (exist) {
            if (exist) {
                return driver.waitForElementByXPath('//XCUIElementTypeButton[@name="Me"]', 5000)
                    .click()
                    .elementByXPath('//XCUIElementTypeStaticText[@name="VIEW MY PROFILE"]')
                    .should.eventually.exist
                    .elementByAccessibilityId("Home")
                    .should.eventually.exist
                    .click();
            } else if (registerWhenLoginFailed) {
                return driver
                    .elementByXPath('//XCUIElementTypeOther[XCUIElementTypeStaticText[@name="Not yet a member? Sign up"]]/XCUIElementTypeButton')
                    .click()
                    .waitForElementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[3]/XCUIElementTypeTextField', 3000)
                    .sendKeys('Ngoc')
                    .elementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[4]/XCUIElementTypeTextField')
                    .clear()
                    .sendKeys(login)
                    .waitForElementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTable/XCUIElementTypeCell[5]/XCUIElementTypeSecureTextField', 4000)
                    .sendKeys(password)
                    .elementByXPath('//XCUIElementTypeButton[@name="Next:"]')
                    .click()
                    .waitForElementByXPath('//XCUIElementTypeSwitch[@name="By signing up, I agree to the terms and conditions of Vestiaire Collective"]', 4000)
                    .click()
                    .elementByXPath('//XCUIElementTypeButton[@name="SIGN UP"]')
                    .click()
                    .waitForElementByXPath('//XCUIElementTypeButton[@name="Me"]', 5000)
                    .click()
                    .elementByXPath('//XCUIElementTypeStaticText[@name="VIEW MY PROFILE"]')
                    .should.eventually.exist
                    .elementByAccessibilityId("Home")
                    .should.eventually.exist
                    .click();
            }
        });
}

function verifyLoginState(driver) {
    return driver
        .waitForElementByXPath('//XCUIElementTypeButton[@name="Me"]', 4000)
        .should.eventually.exist
        .click()
        .swipe({
            startX: 100,
            startY: 600,
            endX: 100,
            endY: 100,
            duration: 800
        })
        .hasElementByXPath('//XCUIElementTypeCell[@name="cell-user-logout"]')
        .then(function (exist) {
            if (exist)
                return driver.elementByXPath('//XCUIElementTypeCell[@name="cell-user-logout"]')
                    .click()
                    .waitForElementByXPath('//XCUIElementTypeButton[@name="Me"]', 1000)
                    .click().sleep(500);
            else
                return driver.sleep(500);
        });
}

function swipeBottomUpAndCheckIfElementExist(driver, query, queryType) {
    if (swipeCounter > 50) {
        throw "Element not found";
    }

    let hasElementMethod = 'hasElementBy' + queryType;
    let getElementMethod = 'elementBy' + queryType;

    swipeCounter++;

    return driver
        .execute('mobile: scroll', { direction: 'down' })
        .then(function () {
            return driver[hasElementMethod](query)
                .then(function (exist) {
                    console.log(exist);
                    if (exist) {
                        return driver[getElementMethod](query)
                            .then(function (element) {
                                return element.getLocation().then(function (loc) {
                                    console.log('location *********************', loc);
                                    if (loc.y > 0 && loc.y < 600) {
                                        return element;
                                    } else {
                                        return swipeBottomUpAndCheckIfElementExist(driver, query, queryType);
                                    }
                                });
                            });
                    } else {
                        return swipeBottomUpAndCheckIfElementExist(driver, query, queryType);
                    }
                });
        });
}

function searchTestProd(driver, productId) {
    return driver.sleep(500)
        .waitForElementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[2]/XCUIElementTypeTextField', 2000)
        .click()
        .waitForElementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTextField', 2000)
        .should.eventually.exist
        .sendKeys(productId + '\n')
        .waitForElementByXPath('//XCUIElementTypeApplication[@name="Vestiaire"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeTable/XCUIElementTypeCell[1]', 2000)
        .should.eventually.exist
        .elementByAccessibilityId("Vestiaire_Collective.VCProductDetailWrapperView")
        .should.eventually.exist;
}

exports.methods = {
    verifyLoginState,
    shouldLogin,
    swipeBottomUpAndCheckIfElementExist,
    searchTestProd
};