function shouldLogin(driver) {
    return verifyLoginState(driver)
        .waitForElementByAccessibilityId('btn-login', 2000)
        .click()
        .waitForElementByXPath('//XCUIElementTypeTable/XCUIElementTypeCell[2]/XCUIElementTypeTextField', 500)
        .sendKeys('ngoc.le+4@vestiairecollective.com')
        .elementByXPath('//XCUIElementTypeTable/XCUIElementTypeCell[3]/XCUIElementTypeSecureTextField')
        .sendKeys('002299')
        .elementByXPath('//XCUIElementTypeButton[@name="LOG IN"]')
        .should.eventually.exist
        .click()
        .waitForElementByXPath('//XCUIElementTypeButton[@name="Me"]', 5000)
        .click()
        .elementByXPath('//XCUIElementTypeStaticText[@name="VIEW MY PROFILE"]')
        .should.eventually.exist;
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
                    .waitForElementByXPath('//XCUIElementTypeButton[@name="Me"]', 500)
                    .click().sleep(500);
            else
                return driver.sleep(500);
        });
}


exports.login = {
    verifyLoginState,
    shouldLogin
};