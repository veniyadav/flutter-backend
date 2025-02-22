export declare enum UserType {
    Normal = "normal",
    Admin = "admin",
    SuperAdmin = "superAdmin"
}
export declare enum MailType {
    VerifyEmail = "verifyEmail",
    ResetPassword = "resetPassword"
}
export declare enum VPushProvider {
    fcm = "fcm",
    onesignal = "onesignal"
}
export declare enum ChatRequestStatus {
    Accepted = "accepted",
    Refused = "refused",
    Canceled = "canceled",
    Pending = "pending"
}
export declare enum UserPrivacyTypes {
    ForReq = "forReq",
    Public = "public"
}
export declare enum UserRole {
    Prime = "prime",
    Admin = "admin",
    HasBadge = "hasBadge"
}
export declare enum AccessTokenType {
    Access = "access",
    Refresh = "refresh"
}
export declare enum NotificationType {
    Admin = "admin"
}
export declare enum TokenType {
    Access = "access",
    Refresh = "refresh"
}
export declare enum S3UploaderTypes {
    profileImage = "pic100",
    chatImage = "ci500",
    chatVideo = "cv501",
    chatFile = "cf502",
    chatVoice = "cv503",
    smallImage = "si400",
    mediumImage = "mi500",
    media = "media600"
}
export declare enum Platform {
    Android = "android",
    Ios = "ios",
    Web = "web",
    Linux = "linux",
    Mac = "macOs",
    Windows = "windows",
    Other = "other"
}
export declare enum PushTopics {
    AdminAndroid = "admin-android",
    AdminIos = "ios-android",
    Verified = "verified",
    UnVerified = "unverified"
}
export declare enum RegisterMethod {
    email = "email",
    phone = "phone",
    facebook = "facebook",
    gmail = "gmail",
    apple = "apple"
}
export declare enum RegisterStatus {
    accepted = "accepted",
    pending = "pending",
    notAccepted = "notAccepted"
}
export declare enum StoryPrivacy {
    Public = "public",
    SomePeople = "somePeople"
}
export declare enum StoryTextAlign {
    Center = "center",
    Left = "left",
    Right = "right"
}
export declare enum StoryType {
    Text = "text",
    Voice = "voice",
    Image = "image",
    Video = "video",
    File = "file"
}
export declare enum StoryFontType {
    Normal = "normal",
    Italic = "italic",
    Bold = "bold"
}
export declare enum ProfileType {
    Private = "private",
    Hidden = "hidden",
    Public = "public"
}
export declare enum MessageType {
    Text = "text",
    Voice = "voice",
    Image = "image",
    Video = "video",
    File = "file",
    AllDeleted = "allDeleted",
    Location = "location",
    Custom = "custom",
    Call = "call",
    Info = "info"
}
export declare enum RoomType {
    Single = "s",
    GroupChat = "g",
    Broadcast = "b",
    Order = "o"
}
export declare enum GroupRoleType {
    Member = "member",
    SuperAdmin = "superAdmin",
    Admin = "admin"
}
export declare enum DeleteMessageType {
    all = "all",
    me = "me"
}
export declare enum RoomTypingStatus {
    stop = "stop",
    typing = "typing",
    recording = "recording"
}
export declare enum ExceptionType {
    flutter = "flutter",
    dart = "dart",
    http = "http",
    sqlite = "sqlite",
    nestjs = "nestjs"
}
export declare enum SocketEventsType {
    v1OnNewMessage = "v1OnNewMessage",
    v1OnBanUserChat = "v1OnBanUserChat",
    v1OnDeleteMessageFromAll = "v1OnDeleteMessageFromAll",
    v1OnKickGroupMember = "v1OnKickGroupMember",
    v1OnMyOnline = "v1OnMyOnline",
    v1OnRoomStatusChange = "v1OnRoomStatusChange",
    v1OnDeliverChatRoom = "v1OnDeliverChatRoom",
    v1OnException = "v1OnException",
    v1OnEnterChatRoom = "v1OnEnterChatRoom",
    v1OnCallAccepted = "v1OnCallAccepted",
    v1OnCallEnded = "v1OnCallEnded",
    v1OnCallRejected = "v1OnCallRejected",
    v1OnIceCandidate = "v1OnIceCandidate",
    v1EnterChatRoom = "v1EnterChatRoom",
    v1KickGroupMember = "v1KickGroupMember",
    v1DeliverChatRoom = "v1DeliverChatRoom",
    v1MyOnline = "v1MyOnline",
    v1RoomStatusChange = "v1RoomStatusChange",
    v1IceCandidate = "v1IceCandidate"
}
export declare enum NotificationType {
    GroupChat = "groupChat",
    ProjectChat = "projectChat",
    SingleChat = "singleChat",
    Call = "call",
    ChatReq = "chatReq",
    NewFollow = "newFollow",
    BroadcastChat = "broadcastChat",
    deleteMessage = "deleteMessage"
}
export declare enum MessageFilter {
    Media = "media",
    Links = "links",
    File = "file",
    Voice = "voice",
    All = "all"
}
export declare enum MessageStatusType {
    Seen = "seen",
    Deliver = "deliver"
}
export declare enum CallStatus {
    Ring = "ring",
    Canceled = "canceled",
    Timeout = "timeout",
    Offline = "offline",
    Rejected = "rejected",
    Finished = "finished",
    ServerRestart = "serverRestart",
    InCall = "inCall"
}
export declare enum MeetPlatform {
    WebRtc = "webRtc",
    Agora = "agora"
}
export declare enum PaginateType {
    Page = "page",
    id = "id"
}
export declare enum SortType {
    Asc = "asc",
    Desc = "desc"
}
export declare enum MessageInfoType {
    UpdateTitle = "updateTitle",
    UpdateImage = "updateImage",
    AddGroupMember = "addGroupMember",
    UpAdmin = "upAdmin",
    DownMember = "downMember",
    Leave = "leave",
    Kick = "kick",
    CreateGroup = "createGroup",
    AddToBroadcast = "addToBroadcast"
}
