export enum SettingKey {
  // do not change numbers once in production.
  // the number is used in storage, not the name
  // a number can be retired, but do not reuse
  unknown = 0,

  //content settings
  AutoLogin = 30415718,
  DebugKeepDialogOpen = 3030395177,
  AutoSaveIntervalMin = 880521,
  UseCompactCss = 30605306,
  AutoSaveRetainDays = 30077911,
  AutoRenameCeButton = 30710590,

  //popup settings
  MaxAutoSaveCount = 30338682,
  EnableDebugging = 30775114,

  //accordion
  LgndBrowserState = 30226039,
  LgndContentState = 30330190,
  LgndForeSite = 30967099,
  LgndHindSite = 30669129,
  LgndMessages = 30755408,
  LgndPopUpLog = 30243921,
  LgndPopUpState = 30868073,
  LgndSettings = 30342605,

  //both
  LastUsedLogToStorageKey = 30046822,
  AutoSnapshotBeforeWindowChange = 30966373,
  LgndPopUpDebug = 30583894,
  AutoRestoreState = 30581057,
}