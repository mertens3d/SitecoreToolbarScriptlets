export enum SettingKey {
    // do not change numbers once in production.
    // the number is used in storage, not the name
    // a number can be retired, but do not reuse
    unknown = 0,
    //content settings - 100's
    AutoLogin = 100,
    AutoSaveEnabled = 101,
    DebugKeepDialogOpen = 102,
    AutoSaveIntervalMin = 103,
    //popup settings - 200's
    MaxAutoSaveCount = 200,
    LogToConsole = 201,
    Test = 202,
    //accordian - 300's
    LgndLog = 300,
    LgndForeSite = 301,
    LgndHindSite = 302,
    LgndSettings = 303,
    LgndState = 304,
    NotUsed
}