const wd = require('wd');

var swipeCounter = 0;

function swipeBottomUpAndCheckIfElementExist(driver, query, queryType) {
    if (swipeCounter > 50) {
        throw "Element not found";
    }

    let hasElementMethod = 'hasElementBy' + queryType;
    let getElementMethod = 'elementBy' + queryType;

    swipeCounter++;

    return driver
        //.execute('mobile: scroll', { direction: 'down' })
        .swipe({ startX: 100, endX: 100, startY: 400, endY: 100, duration: 1000 })
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

function shouldLogin(driver, login, password, registerWhenLoginFailed = false) {
    return verifyLoginState(driver)
        .waitForElementByAccessibilityId('btn-login', 5000)
        .click()
        .waitForElementByXPath('//XCUIElementTypeTable/XCUIElementTypeCell[2]/XCUIElementTypeTextField', 5000)
        .sendKeys(login)
        .elementByXPath('//XCUIElementTypeTable/XCUIElementTypeCell[3]/XCUIElementTypeSecureTextField')
        .sendKeys(password)
        .elementByXPath('//XCUIElementTypeButton[@name="Next:"]')
        .click()
        .elementByXPath('//XCUIElementTypeButton[@name="LOG IN"]')
        .should.eventually.exist
        .click()
        .sleep(5000)
        .hasElementByAccessibilityId('I UNDERSTOOD')
        .then(function (exist) {
            if (exist) {
                return driver.elementByAccessibilityId('I UNDERSTOOD')
                    .should.eventually.exist
                    .elementByAccessibilityId('Later')
                    .should.eventually.exist
                    .click()
            }
            else
                return driver;
        })
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
                    .waitForElementByXPath('//XCUIElementTypeButton[@name="SIGN UP"]', 5000)
                    .click()
                    .waitForElementByXPath('//XCUIElementTypeButton[@name="Me"]', 5000)
                    .click()
                    .waitForElementByXPath('//XCUIElementTypeStaticText[@name="VIEW MY PROFILE"]', 5000)
                    .should.eventually.exist
                    .swipe({
                        startX: 200,
                        startY: 500,
                        endX: 200,
                        endY: 200,
                        duration: 1000
                    })
                    .elementByAccessibilityId('My details')
                    .should.eventually.exist
                    .click()
                    .waitForElementByAccessibilityId('Currency', 5000)
                    .should.eventually.exist
                    .click()
                    .waitForElementByAccessibilityId('EUR', 5000)
                    .should.eventually.exist
                    .click()
                    .waitForElementByXPath('//XCUIElementTypeButton[@name="Me"]', 5000)
                    .should.eventually.exist
                    .click()
                    .waitForElementByXPath('//XCUIElementTypeStaticText[@name="VIEW MY PROFILE"]', 5000)
                    .should.eventually.exist
                    .swipe({
                        startX: 200,
                        startY: 500,
                        endX: 200,
                        endY: 200,
                        duration: 1000
                    })
                    .elementByAccessibilityId('My details')
                    .should.eventually.exist
                    .click()
                    .waitForElementByAccessibilityId('Site', 5000)
                    .should.eventually.exist
                    .click()
                    .sleep(2000)
                    .then(function () {
                        return swipeBottomUpAndCheckIfElementExist(driver, "France", "AccessibilityId");
                    })
                    .should.eventually.exist
                    .click()
                    .sleep(3000)
                    .elementByAccessibilityId("Home")
                    .should.eventually.exist
                    .click()
                    .waitForElementByAccessibilityId('Home', 5000);
            }
        });
}

function verifyLoginState(driver) {
    return driver.sleep(5000)
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

        .waitForElementByXPath('//XCUIElementTypeButton[@name="Me"]', 7000)
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
                    .waitForElementByXPath('//XCUIElementTypeButton[@name="Me"]', 5000)
                    .click().sleep(500);
            else
                return driver.sleep(500);
        });
}



function searchTestProd(driver, productId) {
    return driver.sleep(5000)
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