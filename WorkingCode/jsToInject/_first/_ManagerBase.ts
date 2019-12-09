console.log('_ManagerBase loaded');
class ManagerBase {
  Xyyz: Hub;

  constructor(xyyz: Hub) {
    //console.log(xyyzHub);
    this.Xyyz = xyyz;
    //console.log('SpokeBase');
  }

  OpenerDoc(): Document {
    return this.Xyyz.PageData.WinData.Opener.Document;
  }
}

exports = ManagerBase;