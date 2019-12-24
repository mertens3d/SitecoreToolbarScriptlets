console.log('_ManagerBase loaded');

class ManagerBase {
  Xyyz: Hub;

  constructor(xyyz: Hub) {
    this.Xyyz = xyyz;
  }

  AtticMan(): AtticManager { return this.Xyyz.AtticMan; }
  Const(): IConst { return this.Xyyz.Const; }
  debug(): Debug { return this.Xyyz.debug; }
  DesktopMan(): OneDesktopManager { return this.Xyyz.OneDesktopMan; }
  GuidMan(): GuidManager { return this.Xyyz.GuidMan; }
  locMan(): LocationManager { return this.Xyyz.LocationMan; }
  OneCEMan(): OneCEManager { return this.Xyyz.OneCEMan; }
  OneWinMan(): OneWindowManager { return this.Xyyz.OneWindowMan; }
  PageDataMan(): PageDataManager { return this.Xyyz.PageDataMan; }
  UiMan(): UiManager { return this.Xyyz.UiMan; }
  Utilites(): Utilities { return this.Xyyz.Utilities; }
  MiscMan(): MiscManager { return this.Xyyz.MiscMan; }
  PromiseGen(): PromiseGeneric { return this.Xyyz.PromiseGeneric; }


}

exports = ManagerBase;