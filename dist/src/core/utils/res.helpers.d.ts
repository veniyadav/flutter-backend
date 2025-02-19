export declare enum ApiCode {
    SUCCESS = 2000,
    FAILED = 4000,
    VERIFY_EMAIL_SEND = 2100,
    CLINT_NEED_UPDATE = 5500
}
export declare const resOK: (data: any, code?: ApiCode, msg?: null) => {
    code: ApiCode;
    data: any;
    msg: null;
};
export declare const resErr: (data: string) => {
    success: boolean;
    code: ApiCode;
    data: string;
};
export declare const i18nApi: {
    invalidLoginDataString: string;
    userEmailNotFound: string;
    yourAccountBlockedString: string;
    yourAccountDeletedString: string;
    userAlreadyRegisterString: string;
    codeHasBeenExpiredString: string;
    invalidCodeString: string;
    whileAuthCanFindYouString: string;
    userRegisterStatusNotAcceptedYetString: string;
    deviceHasBeenLogoutFromAllDevicesString: string;
    userDeviceSessionEndDeviceDeletedString: string;
    noCodeHasBeenSendToYouToVerifyYourEmailString: string;
    roomAlreadyInCallString: string;
    peerUserInCallNowString: string;
    callNotAllowedString: string;
    peerUserDeviceOfflineString: string;
    emailMustBeValid: string;
    wait2MinutesToSendMail: string;
    userNotActivated: string;
};
