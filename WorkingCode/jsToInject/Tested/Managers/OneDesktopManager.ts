console.log('ManyTrees loaded');

class OneDesktopManager extends ManagerBase {
    RestoreDesktopState(foundMatch: IDataOneWindow) {
        throw new Error("Method not implemented.");
    }
  constructor(xyyz: Hub) {
    xyyz.debug.FuncStartName(OneDesktopManager.name);
    super(xyyz)
    xyyz.debug.FuncEndName(OneDesktopManager.name);
  }

  GetNewIframeData(index: number, docElem: Document, iframe: HTMLIFrameElement) {
    var toReturn: IDataOneIframe = {
      Index: index,
      DocElem: docElem,
      IframeElem: iframe,
      Id: this.Xyyz.GuidMan.ParseGuid( iframe.getAttribute('id'))
    }
    return toReturn;
  }

  GetAllLiveIframeData(targetDoc) {
    this.Xyyz.debug.FuncStartName(this.GetAllLiveIframeData.name);
    var toReturn = [];
    var iframeAr = targetDoc.querySelectorAll('iframe[src*=content]');
    if (iframeAr) {
      this.Xyyz.debug.Log('iframeAr: ' + iframeAr.length);
      for (var ifrIdx = 0; ifrIdx < iframeAr.length; ifrIdx++) {
        this.Xyyz.debug.Log('pushing: ' + ifrIdx);
        toReturn.push(this.GetNewIframeData(ifrIdx, null, iframeAr[ifrIdx]));
      }
    }
    this.Xyyz.debug.FuncEndName(this.GetAllLiveIframeData.name + ' ' + toReturn.length);
    return toReturn;
  }

  

  

  

  SaveStateOneDesktop() {
    this.Xyyz.debug.FuncStartName(this.SaveStateOneDesktop.name);;
    this.Xyyz.debug.FuncStartName('SaveOneDesktop');;
    var livingIframeAr = this.GetAllLiveIframeData(this.Xyyz.PageData.WinData.Opener.Document);
    if (livingIframeAr && livingIframeAr.length > 0) {
      for (var iframeIdx = 0; iframeIdx < livingIframeAr.length; iframeIdx++) {
        this.Xyyz.debug.Log('iframeIdx: ' + iframeIdx);

        var targetIframeObj = livingIframeAr[iframeIdx];
        this.Xyyz.debug.Log('targetIframe: ' + JSON.stringify(targetIframeObj));
        this.Xyyz.OneCEMan.SaveStateOneContentEditor(targetIframeObj.Id, targetIframeObj.DocElem);
      }
    }

    this.Xyyz.debug.Log('done gathering tree data');
    this.Xyyz.OneWindowMan.DrawDebugDataPretty(null);
    this.Xyyz.debug.FuncEndName(this.SaveStateOneDesktop.name);
  }

  
};