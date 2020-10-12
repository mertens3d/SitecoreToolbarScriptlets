export enum ReplyCommandMsgFlag {
  Unknown = 0,

  // 200 - response
  RespCurState = 10499463,
  RespListeningAndReady = 10781265,
  RespNotReady = 10058031,
  RespTaskFailed = 10685617,
  RespTaskSuccessful = 10030157,
  RespFailedDidNotValidate = 10922052,
}

export enum ReqCommandMsgFlag {
  Unknown = 0,

  GetAllStorageOneWindow = 10003063,
  NewWindowTest = 10943188,
  Ping = 10100148,
  ReqRemoveFromStorage = 10827628,

  // requests
  CancelCommand = 10125827,
  OpenCERibbonNavigateLinks = 10391090,
  OpenCERibbonPresentationDetails = 10714851,
  ReqAddCETab = 10625684,
  ReqAdminB = 10889199,
  ReqClosePopUpWindow = 10700124,
  ReqDebugAutoSnapShot = 10463876,
  ReqDebugClearConsole = 10719358,
  ReqDebugTriggerReload = 10591674,
  ReqGoDesktop = 10667844,
  ReqLoginWithAdminB = 10587818,
  ReqOpenCE = 10466461,
  ReqQuickPublish = 10123608,
  ReqSetScModeEdit = 10533683,
  ReqSetScModeNormal = 10544213,
  ReqSetScModePreview = 10151645,
  ReqSetStateOfSitecoreNewWindow = 10202348,
  ReqSetStateOfSitecoreSameWindow = 10074231,
  ReqTakeSnapShot = 10495640,
  ReqToggleCompactCss = 10178105,
  ReqToggleFavorite = 10462769,
  ReqUpdateNickName = 10899837,
  SetStateFromMostRecent = 10611496,
  SetStateFromQueryString = 10754569,
  SetStateFromStorage = 10984640,
}