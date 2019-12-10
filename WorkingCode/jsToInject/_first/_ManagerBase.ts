console.log('_ManagerBase loaded');
class ManagerBase {
  Xyyz: Hub;

  constructor(xyyz: Hub) {
    //console.log(xyyzHub);
    this.Xyyz = xyyz;
    //console.log('SpokeBase');
  }

  AtticMan(): AtticManager {
    return this.Xyyz.AtticMan;
  }
  UiMan(): UiManager {
    return this.Xyyz.UiMan;
  }
  debug(): Debug {
    return this.Xyyz.debug;
  }
  Const(): IConst{
    return this.Xyyz.Const;
  }

  Guidman(): GuidManager {
    return this.Xyyz.GuidMan;
  }
  OpenerDoc(): Document {
    return this.Xyyz.PageData.WinDataParent.Opener.Document;
  }
}

exports = ManagerBase;