exports.android = {
    "platformName": "Android",
    "platformVersion": "7.1.1",
    "deviceName": "Android Emulator",
    "app": "/Users/ngoc.le/Documents/ngoc.le/Appium/app-prod-debug.apk",
    "automationName": "UiAutomator2",
    "appWaitActivity": "*.LoginActivity"
};

exports.ios = {
    "platformName": "iOS",
    "platformVersion": "12.0",
    "deviceName": "iPhone Simulator",
    "app": "/Users/ngoc.le/Documents/ngoc.le/Appium/app09.20/Vestiaire Collective.app",
    "connectHardwareKeyboard": true,
    "noReset": true
};