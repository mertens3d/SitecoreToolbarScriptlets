console.log('_ManagerBase loaded'); 

class ManagerBase {
  Xyyz: Hub;

  constructor(xyyz: Hub) {
    this.Xyyz = xyyz;
  }

  AtticMan(): AtticManager { return this.Xyyz.AtticMan; }
  Const(): IConst { return this.Xyyz.Const; }
  debug(): Debug { return this.Xyyz.debug; }
  GuidMan(): GuidManager { return this.Xyyz.GuidMan; }
  PageDataMan(): PageDataManager { return this.Xyyz.PageDataMan; }
  UiMan(): UiManager { return this.Xyyz.UiMan; }
  Utilites(): Utilities  { return this.Xyyz.Utilities; }
}

exports = ManagerBase;