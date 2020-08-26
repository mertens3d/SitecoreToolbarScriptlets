export enum SettingKey {
  // do not change numbers once in production.
  // the number is used in storage, not the name
  // a number can be retired, but do not reuse
  unknown = 0,

  //content settings - 3100's
  AutoLogin = 3100,
  __dead101 = 3101,
  DebugKeepDialogOpen = 3102,
  AutoSaveIntervalMin = 3103,
  UseCompactCss = 3104,

  //popup settings - 2200's
  MaxAutoSaveCount = 3200,
  LogToConsole = 3201,
  Test = 3202,

  //accordion - 3300's
  LgndPopUpLog = 3300,
  LgndForeSite = 3301,
  LgndHindSite = 3302,
  LgndSettings = 3303,
  LgndContentState = 3304,
  LgndInSite = 3305,
  LgndMessages = 3306,
  LgndBrowserState = 3307,
  LgndPopUpState = 3308,

  //both - 400'x
  LastUsedLogToStorageKey = 3400,
  AutoSnapshotBeforeWindowChange,
}