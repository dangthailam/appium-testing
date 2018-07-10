function shouldLogin(driver) {
    return verifyLoginState(driver)
        .sleep(2000)
        .elementByXPath('//XCUIElementTypeTable/XCUIElementTypeCell[2]/XCUIElementTypeTextField')
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
    return driver.sleep(1000)
        .elementByXPath('//XCUIElementTypeButton[@name="Me"]')
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
                    .sleep(500)
                    .elementByXPath('//XCUIElementTypeButton[@name="Me"]')
                    .click()
                    .sleep(500)
                    .elementByAccessibilityId('btn-login');
            else
                return driver.elementByAccessibilityId('btn-login');
        })
        .click();
}


exports.login = {
    verifyLoginState,
    shouldLogin
};