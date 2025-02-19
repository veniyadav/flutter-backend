"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.i18nApi = exports.resErr = exports.resOK = exports.ApiCode = void 0;
var ApiCode;
(function (ApiCode) {
    ApiCode[ApiCode["SUCCESS"] = 2000] = "SUCCESS";
    ApiCode[ApiCode["FAILED"] = 4000] = "FAILED";
    ApiCode[ApiCode["VERIFY_EMAIL_SEND"] = 2100] = "VERIFY_EMAIL_SEND";
    ApiCode[ApiCode["CLINT_NEED_UPDATE"] = 5500] = "CLINT_NEED_UPDATE";
})(ApiCode = exports.ApiCode || (exports.ApiCode = {}));
const resOK = (data, code = ApiCode.SUCCESS, msg) => ({
    code,
    data,
    msg,
});
exports.resOK = resOK;
const resErr = (data) => ({
    success: false,
    code: ApiCode.FAILED,
    data,
});
exports.resErr = resErr;
exports.i18nApi = {
    invalidLoginDataString: "invalidLoginData",
    userEmailNotFound: "userEmailNotFound",
    yourAccountBlockedString: "yourAccountBlocked",
    yourAccountDeletedString: "yourAccountDeleted",
    userAlreadyRegisterString: "userAlreadyRegister",
    codeHasBeenExpiredString: "codeHasBeenExpired",
    invalidCodeString: "invalidCode",
    whileAuthCanFindYouString: "whileAuthCanFindYou",
    userRegisterStatusNotAcceptedYetString: "userRegisterStatusNotAcceptedYet",
    deviceHasBeenLogoutFromAllDevicesString: "deviceHasBeenLogoutFromAllDevices",
    userDeviceSessionEndDeviceDeletedString: "userDeviceSessionEndDeviceDeleted",
    noCodeHasBeenSendToYouToVerifyYourEmailString: "noCodeHasBeenSendToYouToVerifyYourEmail",
    roomAlreadyInCallString: "roomAlreadyInCall",
    peerUserInCallNowString: "peerUserInCallNow",
    callNotAllowedString: "callNotAllowed",
    peerUserDeviceOfflineString: "peerUserDeviceOffline",
    emailMustBeValid: "emailMustBeValid",
    wait2MinutesToSendMail: "wait2MinutesToSendMail",
    userNotActivated: "User Not activated",
};
//# sourceMappingURL=res.helpers.js.map