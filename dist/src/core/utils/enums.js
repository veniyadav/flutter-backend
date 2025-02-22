"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageInfoType = exports.SortType = exports.PaginateType = exports.MeetPlatform = exports.CallStatus = exports.MessageStatusType = exports.MessageFilter = exports.SocketEventsType = exports.ExceptionType = exports.RoomTypingStatus = exports.DeleteMessageType = exports.GroupRoleType = exports.RoomType = exports.MessageType = exports.ProfileType = exports.StoryFontType = exports.StoryType = exports.StoryTextAlign = exports.StoryPrivacy = exports.RegisterStatus = exports.RegisterMethod = exports.PushTopics = exports.Platform = exports.S3UploaderTypes = exports.TokenType = exports.NotificationType = exports.AccessTokenType = exports.UserRole = exports.UserPrivacyTypes = exports.ChatRequestStatus = exports.VPushProvider = exports.MailType = exports.UserType = void 0;
var UserType;
(function (UserType) {
    UserType["Normal"] = "normal";
    UserType["Admin"] = "admin";
    UserType["SuperAdmin"] = "superAdmin";
})(UserType = exports.UserType || (exports.UserType = {}));
var MailType;
(function (MailType) {
    MailType["VerifyEmail"] = "verifyEmail";
    MailType["ResetPassword"] = "resetPassword";
})(MailType = exports.MailType || (exports.MailType = {}));
var VPushProvider;
(function (VPushProvider) {
    VPushProvider["fcm"] = "fcm";
    VPushProvider["onesignal"] = "onesignal";
})(VPushProvider = exports.VPushProvider || (exports.VPushProvider = {}));
var ChatRequestStatus;
(function (ChatRequestStatus) {
    ChatRequestStatus["Accepted"] = "accepted";
    ChatRequestStatus["Refused"] = "refused";
    ChatRequestStatus["Canceled"] = "canceled";
    ChatRequestStatus["Pending"] = "pending";
})(ChatRequestStatus = exports.ChatRequestStatus || (exports.ChatRequestStatus = {}));
var UserPrivacyTypes;
(function (UserPrivacyTypes) {
    UserPrivacyTypes["ForReq"] = "forReq";
    UserPrivacyTypes["Public"] = "public";
})(UserPrivacyTypes = exports.UserPrivacyTypes || (exports.UserPrivacyTypes = {}));
var UserRole;
(function (UserRole) {
    UserRole["Prime"] = "prime";
    UserRole["Admin"] = "admin";
    UserRole["HasBadge"] = "hasBadge";
})(UserRole = exports.UserRole || (exports.UserRole = {}));
var AccessTokenType;
(function (AccessTokenType) {
    AccessTokenType["Access"] = "access";
    AccessTokenType["Refresh"] = "refresh";
})(AccessTokenType = exports.AccessTokenType || (exports.AccessTokenType = {}));
var NotificationType;
(function (NotificationType) {
    NotificationType["Admin"] = "admin";
})(NotificationType = exports.NotificationType || (exports.NotificationType = {}));
var TokenType;
(function (TokenType) {
    TokenType["Access"] = "access";
    TokenType["Refresh"] = "refresh";
})(TokenType = exports.TokenType || (exports.TokenType = {}));
var S3UploaderTypes;
(function (S3UploaderTypes) {
    S3UploaderTypes["profileImage"] = "pic100";
    S3UploaderTypes["chatImage"] = "ci500";
    S3UploaderTypes["chatVideo"] = "cv501";
    S3UploaderTypes["chatFile"] = "cf502";
    S3UploaderTypes["chatVoice"] = "cv503";
    S3UploaderTypes["smallImage"] = "si400";
    S3UploaderTypes["mediumImage"] = "mi500";
    S3UploaderTypes["media"] = "media600";
})(S3UploaderTypes = exports.S3UploaderTypes || (exports.S3UploaderTypes = {}));
var Platform;
(function (Platform) {
    Platform["Android"] = "android";
    Platform["Ios"] = "ios";
    Platform["Web"] = "web";
    Platform["Linux"] = "linux";
    Platform["Mac"] = "macOs";
    Platform["Windows"] = "windows";
    Platform["Other"] = "other";
})(Platform = exports.Platform || (exports.Platform = {}));
var PushTopics;
(function (PushTopics) {
    PushTopics["AdminAndroid"] = "admin-android";
    PushTopics["AdminIos"] = "ios-android";
    PushTopics["Verified"] = "verified";
    PushTopics["UnVerified"] = "unverified";
})(PushTopics = exports.PushTopics || (exports.PushTopics = {}));
var RegisterMethod;
(function (RegisterMethod) {
    RegisterMethod["email"] = "email";
    RegisterMethod["phone"] = "phone";
    RegisterMethod["facebook"] = "facebook";
    RegisterMethod["gmail"] = "gmail";
    RegisterMethod["apple"] = "apple";
})(RegisterMethod = exports.RegisterMethod || (exports.RegisterMethod = {}));
var RegisterStatus;
(function (RegisterStatus) {
    RegisterStatus["accepted"] = "accepted";
    RegisterStatus["pending"] = "pending";
    RegisterStatus["notAccepted"] = "notAccepted";
})(RegisterStatus = exports.RegisterStatus || (exports.RegisterStatus = {}));
var StoryPrivacy;
(function (StoryPrivacy) {
    StoryPrivacy["Public"] = "public";
    StoryPrivacy["SomePeople"] = "somePeople";
})(StoryPrivacy = exports.StoryPrivacy || (exports.StoryPrivacy = {}));
var StoryTextAlign;
(function (StoryTextAlign) {
    StoryTextAlign["Center"] = "center";
    StoryTextAlign["Left"] = "left";
    StoryTextAlign["Right"] = "right";
})(StoryTextAlign = exports.StoryTextAlign || (exports.StoryTextAlign = {}));
var StoryType;
(function (StoryType) {
    StoryType["Text"] = "text";
    StoryType["Voice"] = "voice";
    StoryType["Image"] = "image";
    StoryType["Video"] = "video";
    StoryType["File"] = "file";
})(StoryType = exports.StoryType || (exports.StoryType = {}));
var StoryFontType;
(function (StoryFontType) {
    StoryFontType["Normal"] = "normal";
    StoryFontType["Italic"] = "italic";
    StoryFontType["Bold"] = "bold";
})(StoryFontType = exports.StoryFontType || (exports.StoryFontType = {}));
var ProfileType;
(function (ProfileType) {
    ProfileType["Private"] = "private";
    ProfileType["Hidden"] = "hidden";
    ProfileType["Public"] = "public";
})(ProfileType = exports.ProfileType || (exports.ProfileType = {}));
var MessageType;
(function (MessageType) {
    MessageType["Text"] = "text";
    MessageType["Voice"] = "voice";
    MessageType["Image"] = "image";
    MessageType["Video"] = "video";
    MessageType["File"] = "file";
    MessageType["AllDeleted"] = "allDeleted";
    MessageType["Location"] = "location";
    MessageType["Custom"] = "custom";
    MessageType["Call"] = "call";
    MessageType["Info"] = "info";
})(MessageType = exports.MessageType || (exports.MessageType = {}));
var RoomType;
(function (RoomType) {
    RoomType["Single"] = "s";
    RoomType["GroupChat"] = "g";
    RoomType["Broadcast"] = "b";
    RoomType["Order"] = "o";
})(RoomType = exports.RoomType || (exports.RoomType = {}));
var GroupRoleType;
(function (GroupRoleType) {
    GroupRoleType["Member"] = "member";
    GroupRoleType["SuperAdmin"] = "superAdmin";
    GroupRoleType["Admin"] = "admin";
})(GroupRoleType = exports.GroupRoleType || (exports.GroupRoleType = {}));
var DeleteMessageType;
(function (DeleteMessageType) {
    DeleteMessageType["all"] = "all";
    DeleteMessageType["me"] = "me";
})(DeleteMessageType = exports.DeleteMessageType || (exports.DeleteMessageType = {}));
var RoomTypingStatus;
(function (RoomTypingStatus) {
    RoomTypingStatus["stop"] = "stop";
    RoomTypingStatus["typing"] = "typing";
    RoomTypingStatus["recording"] = "recording";
})(RoomTypingStatus = exports.RoomTypingStatus || (exports.RoomTypingStatus = {}));
var ExceptionType;
(function (ExceptionType) {
    ExceptionType["flutter"] = "flutter";
    ExceptionType["dart"] = "dart";
    ExceptionType["http"] = "http";
    ExceptionType["sqlite"] = "sqlite";
    ExceptionType["nestjs"] = "nestjs";
})(ExceptionType = exports.ExceptionType || (exports.ExceptionType = {}));
var SocketEventsType;
(function (SocketEventsType) {
    SocketEventsType["v1OnNewMessage"] = "v1OnNewMessage";
    SocketEventsType["v1OnBanUserChat"] = "v1OnBanUserChat";
    SocketEventsType["v1OnDeleteMessageFromAll"] = "v1OnDeleteMessageFromAll";
    SocketEventsType["v1OnKickGroupMember"] = "v1OnKickGroupMember";
    SocketEventsType["v1OnMyOnline"] = "v1OnMyOnline";
    SocketEventsType["v1OnRoomStatusChange"] = "v1OnRoomStatusChange";
    SocketEventsType["v1OnDeliverChatRoom"] = "v1OnDeliverChatRoom";
    SocketEventsType["v1OnException"] = "v1OnException";
    SocketEventsType["v1OnEnterChatRoom"] = "v1OnEnterChatRoom";
    SocketEventsType["v1OnCallAccepted"] = "v1OnCallAccepted";
    SocketEventsType["v1OnCallEnded"] = "v1OnCallEnded";
    SocketEventsType["v1OnCallRejected"] = "v1OnCallRejected";
    SocketEventsType["v1OnIceCandidate"] = "v1OnIceCandidate";
    SocketEventsType["v1EnterChatRoom"] = "v1EnterChatRoom";
    SocketEventsType["v1KickGroupMember"] = "v1KickGroupMember";
    SocketEventsType["v1DeliverChatRoom"] = "v1DeliverChatRoom";
    SocketEventsType["v1MyOnline"] = "v1MyOnline";
    SocketEventsType["v1RoomStatusChange"] = "v1RoomStatusChange";
    SocketEventsType["v1IceCandidate"] = "v1IceCandidate";
})(SocketEventsType = exports.SocketEventsType || (exports.SocketEventsType = {}));
(function (NotificationType) {
    NotificationType["GroupChat"] = "groupChat";
    NotificationType["ProjectChat"] = "projectChat";
    NotificationType["SingleChat"] = "singleChat";
    NotificationType["Call"] = "call";
    NotificationType["ChatReq"] = "chatReq";
    NotificationType["NewFollow"] = "newFollow";
    NotificationType["BroadcastChat"] = "broadcastChat";
    NotificationType["deleteMessage"] = "deleteMessage";
})(NotificationType = exports.NotificationType || (exports.NotificationType = {}));
var MessageFilter;
(function (MessageFilter) {
    MessageFilter["Media"] = "media";
    MessageFilter["Links"] = "links";
    MessageFilter["File"] = "file";
    MessageFilter["Voice"] = "voice";
    MessageFilter["All"] = "all";
})(MessageFilter = exports.MessageFilter || (exports.MessageFilter = {}));
var MessageStatusType;
(function (MessageStatusType) {
    MessageStatusType["Seen"] = "seen";
    MessageStatusType["Deliver"] = "deliver";
})(MessageStatusType = exports.MessageStatusType || (exports.MessageStatusType = {}));
var CallStatus;
(function (CallStatus) {
    CallStatus["Ring"] = "ring";
    CallStatus["Canceled"] = "canceled";
    CallStatus["Timeout"] = "timeout";
    CallStatus["Offline"] = "offline";
    CallStatus["Rejected"] = "rejected";
    CallStatus["Finished"] = "finished";
    CallStatus["ServerRestart"] = "serverRestart";
    CallStatus["InCall"] = "inCall";
})(CallStatus = exports.CallStatus || (exports.CallStatus = {}));
var MeetPlatform;
(function (MeetPlatform) {
    MeetPlatform["WebRtc"] = "webRtc";
    MeetPlatform["Agora"] = "agora";
})(MeetPlatform = exports.MeetPlatform || (exports.MeetPlatform = {}));
var PaginateType;
(function (PaginateType) {
    PaginateType["Page"] = "page";
    PaginateType["id"] = "id";
})(PaginateType = exports.PaginateType || (exports.PaginateType = {}));
var SortType;
(function (SortType) {
    SortType["Asc"] = "asc";
    SortType["Desc"] = "desc";
})(SortType = exports.SortType || (exports.SortType = {}));
var MessageInfoType;
(function (MessageInfoType) {
    MessageInfoType["UpdateTitle"] = "updateTitle";
    MessageInfoType["UpdateImage"] = "updateImage";
    MessageInfoType["AddGroupMember"] = "addGroupMember";
    MessageInfoType["UpAdmin"] = "upAdmin";
    MessageInfoType["DownMember"] = "downMember";
    MessageInfoType["Leave"] = "leave";
    MessageInfoType["Kick"] = "kick";
    MessageInfoType["CreateGroup"] = "createGroup";
    MessageInfoType["AddToBroadcast"] = "addToBroadcast";
})(MessageInfoType = exports.MessageInfoType || (exports.MessageInfoType = {}));
//# sourceMappingURL=enums.js.map