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

  async RestoreDesktopStateAsync(targetWindow: IDataBroswerWindow, dataToRestore: IDataOneWindowStorage) {
    this.debug().FuncStart(this.RestoreDesktopStateAsync.name);;

    if (this.MiscMan().NotNullOrUndefined([targetWindow, dataToRestore, dataToRestore.AllCEAr], this.RestoreDesktopStateAsync.name)) {
      for (var idx = 0; idx < dataToRestore.AllCEAr.length; idx++) {
        this.debug().Log('data idx: ' + idx + ':' + dataToRestore.AllCEAr.length);

        var desktopPromiser: PromiseChainRestoreDesktop = new PromiseChainRestoreDesktop(this.Xyyz);

        await desktopPromiser.RunOneChain(targetWindow, dataToRestore.AllCEAr[idx]);
      }
    }

    this.debug().FuncEnd(this.RestoreDesktopStateAsync.name);
  }
  async RestoreDataToOneIframeWorker(oneCEdata: IDataOneStorageCE, newIframe: IDataOneIframe) {
    this.debug().FuncStart(this.RestoreDataToOneIframeWorker.name, 'data not null: ' + (oneCEdata != null) + ' newFrame not null: ' + (newIframe !== null));
    var toReturn: boolean = false;

    this.debug().DebugDataOneIframe(newIframe);

    if (oneCEdata && newIframe) {
      await this.Xyyz.OneCEMan.RestoreCEStateAsync(oneCEdata, newIframe.ContentDoc);
      toReturn = true;
    } else {
      this.debug().Error(this.RestoreDataToOneIframeWorker.name, 'bad data');
      toReturn = false;
    }
    this.debug().FuncEnd(this.RestoreDataToOneIframeWorker.name, toReturn.toString());
    return toReturn;
  }

  async WaitForIframeCountDiffWorker(IFramesbefore: IDataOneIframe[], targetWin: IDataBroswerWindow) {
    this.debug().FuncStart(this.WaitForIframeCountDiffWorker.name);
    var toReturn: IDataOneIframe = null;

    var iterationJr = new IterationHelper(this.Xyyz, 10, this.WaitForIframeCountDiffWorker.name)

    while (!toReturn && iterationJr.DecrementAndKeepGoing()) {
      let beforeCount: number = IFramesbefore.length;

      var allIframesAfter: IDataOneIframe[] = this.GetAllLiveIframeData(targetWin);
      //var allIframesAfter: IDataOneIframe[];
      //if (result && result.length) {
      //  for (var idx = 0; idx < result.length; idx++) {
      //    allIframesAfter.push(<IDataOneIframe> result[idx]);
      //  }
      //}
      var count: number = allIframesAfter.length;
      this.debug().Log('iFrame count before: ' + IFramesbefore.length);
      this.debug().Log('iFrame count after: ' + allIframesAfter.length);

      if (count > beforeCount) {
        var newIframes: IDataOneIframe[] = allIframesAfter.filter(e => !IFramesbefore.includes(e));

        toReturn = newIframes[0];
      } else {
        var self = this;

        await iterationJr.Wait();
        //iterationJr.WaitAndThen(
        //  function () {
        //    self.WaitForIframeCountDiffWorker(IFramesbefore, targetWin, iterationJr);
        //  });
      }
    }

    this.debug().FuncEnd(this.WaitForIframeCountDiffWorker.name);
    return toReturn;
  }

  async  WaitForReadyIframe(dataOneIframe: IDataOneIframe, iterationJr: IterationHelper = null) {
    this.debug().FuncStart(this.WaitForReadyIframe.name, dataOneIframe.Id.asShort);

    this.debug().DebugDataOneIframe(dataOneIframe);

    var toReturn = false;

    if (!iterationJr) {
      iterationJr = new IterationHelper(this.Xyyz, 10, this.WaitForReadyIframe.name);
    }
    this.debug().MarkerA();

    while (iterationJr.DecrementAndKeepGoing() && toReturn === false) {
      this.debug().MarkerB();
      var currentReadyState: string = dataOneIframe.IframeElem.contentDocument.readyState.toString();
      var isReadyStateComplete = currentReadyState === 'complete';
      this.debug().Log('currentReadyState : ' + currentReadyState);;

      //if (currentReadyState !== 'uninitialized') {
      //  this.debug().Log('id: ' + dataOneIframe.IframeElem.id)
      //}
      this.debug().MarkerC();

      this.debug().Log('isReadyStateComplete: ' + isReadyStateComplete);

      if (isReadyStateComplete) {
        toReturn = true;
        this.debug().Log('toReturn A is ' + toReturn);
      } else {
        var self = this;
        this.debug().Log('about to Wait and then ');

        await iterationJr.Wait();

        this.debug().Log('toReturn C is ' + toReturn);
      }
      this.debug().Log('while is looping ' + toReturn);
    }
    this.debug().FuncEnd(this.WaitForReadyIframe.name, currentReadyState + ' ' + toReturn.toString());;
    return toReturn;
  }

  GetAllLiveIframeData(targetWindow: IDataBroswerWindow): IDataOneIframe[] {
    this.debug().FuncStart(this.GetAllLiveIframeData.name);
    var toReturn: IDataOneIframe[] = [];
    var iframeAr = targetWindow.DataDocSelf.Document.querySelectorAll(this.Const().Selector.SC.IframeContent);
    if (iframeAr) {
      this.debug().Log('iframeAr: ' + iframeAr.length);
      for (var ifrIdx = 0; ifrIdx < iframeAr.length; ifrIdx++) {
        this.debug().Log('pushing: ' + ifrIdx);

        var iframeElem: HTMLIFrameElement = <HTMLIFrameElement>iframeAr[ifrIdx];
        var id: IGuid = this.GuidMan().ParseGuid(iframeElem.id); //this.Xyyz.GuidMan.ParseGuid(iframeElem.getAttribute('id'))

        var dataOneIframe: IDataOneIframe = {
          Index: ifrIdx,
          IframeElem: iframeElem,
          Id: this.GuidMan().NewGuid(),
          ContentDoc: {
            DataWinParent: targetWindow,
            Document: iframeElem.contentDocument,
            HasParentDesktop: true,
            XyyzId: this.GuidMan().NewGuid(),
            IsCEDoc: true,
            ParentDesktop: null
          },
          Zindex: iframeElem.style.zIndex ? parseInt(iframeElem.style.zIndex) : -1
        }

        toReturn.push(dataOneIframe);
        //toReturn.push(this.GetNewIframeData(ifrIdx, null, iframeAr[ifrIdx]));
      }
    }
    this.debug().FuncEnd(this.GetAllLiveIframeData.name,  'count:  ' + toReturn.length);
    return toReturn;
  }

  SaveStateOneDesktop(targetWindow: IDataBroswerWindow) {
    this.debug().FuncStart(this.SaveStateOneDesktop.name);;
    this.debug().Log('SaveOneDesktop');;
    var livingIframeAr: IDataOneIframe[] = this.GetAllLiveIframeData(targetWindow);
    if (livingIframeAr && livingIframeAr.length > 0) {
      for (var iframeIdx = 0; iframeIdx < livingIframeAr.length; iframeIdx++) {
        this.debug().Log('iframeIdx: ' + iframeIdx);

        var targetIframeObj = livingIframeAr[iframeIdx];
        //this.debug().Log('targetIframe: ' + JSON.stringify(targetIframeObj));
        this.Xyyz.OneCEMan.SaveStateOneContentEditor(targetIframeObj.Id, targetIframeObj.ContentDoc);
      }
    }

    this.debug().FuncEnd(this.SaveStateOneDesktop.name);
  }
};