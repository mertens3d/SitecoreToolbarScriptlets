console.log('ManyTrees loaded');

class OneDesktopManager extends ManagerBase {

  constructor(xyyz: Hub) {
    xyyz.debug.FuncStart(OneDesktopManager.name);
    super(xyyz)
    xyyz.debug.FuncEnd(OneDesktopManager.name);
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

  RestoreDesktopState(foundMatch: IDataOneWindowStorage) {
    //var allExistingIframe = this.GetAllLiveIframeData()
  }

  GetAllLiveIframeData(targetWindow: IDataBroswerWindow) {
    this.debug().FuncStart(this.GetAllLiveIframeData.name);
    var toReturn = [];
    var iframeAr = targetWindow.DataDocSelf.Document.querySelectorAll(this.Const().Selector.IframeContent);
    if (iframeAr) {
      this.debug().Log('iframeAr: ' + iframeAr.length);
      for (var ifrIdx = 0; ifrIdx < iframeAr.length; ifrIdx++) {
        this.debug().Log('pushing: ' + ifrIdx);

        var iframeElem: HTMLIFrameElement = <HTMLIFrameElement>iframeAr[ifrIdx];
        var id: IGuid = this.GuidMan().ParseGuid(iframeElem.id); //this.Xyyz.GuidMan.ParseGuid(iframeElem.getAttribute('id'))

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
    this.debug().FuncEnd(this.GetAllLiveIframeData.name + ' ' + toReturn.length);
    return toReturn;
  }

  SaveStateOneDesktop(targetWindow: IDataBroswerWindow) {
    this.debug().FuncStart(this.SaveStateOneDesktop.name);;
    this.debug().FuncStart('SaveOneDesktop');;
    var livingIframeAr = this.GetAllLiveIframeData(targetWindow);
    if (livingIframeAr && livingIframeAr.length > 0) {
      for (var iframeIdx = 0; iframeIdx < livingIframeAr.length; iframeIdx++) {
        this.debug().Log('iframeIdx: ' + iframeIdx);

        var targetIframeObj = livingIframeAr[iframeIdx];
        this.debug().Log('targetIframe: ' + JSON.stringify(targetIframeObj));
        this.Xyyz.OneCEMan.SaveStateOneContentEditor(targetIframeObj.Id, targetIframeObj.DocElem);
      }
    }

    this.debug().Log('done gathering tree data');
    this.AtticMan().DrawDebugDataPretty(null);
    this.debug().FuncEnd(this.SaveStateOneDesktop.name);
  }
};