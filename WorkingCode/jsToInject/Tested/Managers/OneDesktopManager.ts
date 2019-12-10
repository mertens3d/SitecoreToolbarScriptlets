console.log('ManyTrees loaded');

class OneDesktopManager extends ManagerBase {

  constructor(xyyz: Hub) {
    xyyz.debug.FuncStartName(OneDesktopManager.name);
    super(xyyz)
    xyyz.debug.FuncEndName(OneDesktopManager.name);
  }

  //GetNewIframeData(index: number, docElem: Document, iframe: HTMLIFrameElement) {
  //  var toReturn: IDataOneIframe = {
  //    Index: index,
  //    DocElem: docElem,
  //    IframeElem: iframe,
  //    Id: this.Xyyz.GuidMan.ParseGuid(iframe.getAttribute('id'))
  //  }
  //  return toReturn;
  //}

  RestoreDesktopState(foundMatch: IDataOneWindow) {
    var allExistingIframe = this.GetAllLiveIframeData()
  }

  GetAllLiveIframeData() {
    this.Xyyz.debug.FuncStartName(this.GetAllLiveIframeData.name);
    var toReturn = [];
    var iframeAr = this.Xyyz.PageData.WinDataParent.Opener.Document.querySelectorAll(this.Const().Selector.IframeContent);
    if (iframeAr) {
      this.Xyyz.debug.Log('iframeAr: ' + iframeAr.length);
      for (var ifrIdx = 0; ifrIdx < iframeAr.length; ifrIdx++) {
        this.Xyyz.debug.Log('pushing: ' + ifrIdx);

        var iframeElem: HTMLIFrameElement = <HTMLIFrameElement>iframeAr[ifrIdx];
        var id: IGuid = this.Guidman().ParseGuid(iframeElem.id); //this.Xyyz.GuidMan.ParseGuid(iframeElem.getAttribute('id'))

        var dataOneIframe: IDataOneIframe = {
          Index: ifrIdx,
          DocElem: null,
          IframeElem: iframeElem,
          Id: id
        }

        toReturn.push(dataOneIframe);
        //toReturn.push(this.GetNewIframeData(ifrIdx, null, iframeAr[ifrIdx]));
      }
    }
    this.Xyyz.debug.FuncEndName(this.GetAllLiveIframeData.name + ' ' + toReturn.length);
    return toReturn;
  }

  SaveStateOneDesktop() {
    this.Xyyz.debug.FuncStartName(this.SaveStateOneDesktop.name);;
    this.Xyyz.debug.FuncStartName('SaveOneDesktop');;
    var livingIframeAr = this.GetAllLiveIframeData();
    if (livingIframeAr && livingIframeAr.length > 0) {
      for (var iframeIdx = 0; iframeIdx < livingIframeAr.length; iframeIdx++) {
        this.Xyyz.debug.Log('iframeIdx: ' + iframeIdx);

        var targetIframeObj = livingIframeAr[iframeIdx];
        this.Xyyz.debug.Log('targetIframe: ' + JSON.stringify(targetIframeObj));
        this.Xyyz.OneCEMan.SaveStateOneContentEditor(targetIframeObj.Id, targetIframeObj.DocElem);
      }
    }

    this.Xyyz.debug.Log('done gathering tree data');
    this.AtticMan().DrawDebugDataPretty(null);
    this.Xyyz.debug.FuncEndName(this.SaveStateOneDesktop.name);
  }
};