export enum MsgFlag {
  Unknown = 0,
  GetAllStorageOneWindow = 1001,
  NewWindowTest = 1002,
  Ping = 1003,
  RemoveFromStorage = 1004,

  // 100 - requests
  ReqAddCETab = 1100,
  ReqAdminB = 1101,
  ReqGoDesktop = 1102,
  ReqLoginWithAdminB = 1103,
  ReqMarkFavorite = 1104,
  ReqOpenCE = 1105,
  ReqQuickPublish = 1106,
  ReqRestoreClick = 1107,
  Unused = 1108,
  ReqSetScMode = 1109,
  ReqTakeSnapShot = 1110,
  ReqToggleCompactCss = 1111,
  ReqUpdateNickName = 1112,

  // 200 - response
  RespCurState = 1200,
  RespTaskFailed  = 1201,
  RespListeningAndReady = 1202,
  _unused = 1203,
  RespTaskSuccessful = 1204,
  RespTest = 1205,
  RespNotReady = 1206,
}