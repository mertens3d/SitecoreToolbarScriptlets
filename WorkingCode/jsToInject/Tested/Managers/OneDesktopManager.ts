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

  async RestoreDesktopState(targetWindow: IDataBroswerWindow, dataToRestore: IDataOneWindowStorage) {
    this.debug().FuncStart(this.RestoreDesktopState.name);;

    for (var idx = 0; idx < dataToRestore.AllCEAr.length; idx++) {
      this.debug().Log('idx: ' + idx);

      var desktopPromiser: PromiseChainRestoreDesktop = new PromiseChainRestoreDesktop(this.Xyyz);
      await desktopPromiser.RunOneChain(targetWindow, dataToRestore.AllCEAr[idx]);

      this.debug().FuncEnd(this.RestoreDesktopState.name);
    }
  }
  RestoreDataToOneIframeWorker(oneCEdata: IDataOneStorageCE, newIframe: IDataOneIframe) {
    this.debug().FuncStart(this.RestoreDataToOneIframeWorker.name, 'data not null: ' + (oneCEdata != null) + ' newFrame not null: ' + (newIframe !== null));
    var toReturn: boolean = false;

    this.debug().DebugDataOneIframe(newIframe);

    if (oneCEdata && newIframe) {
      this.Xyyz.OneCEMan.RestoreCEState(oneCEdata, newIframe.ContentDoc);
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

    var iterationJr = new IterationHelper(this.Xyyz, 20, 1000, this.WaitForIframeCountDiffWorker.name)

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

        await iterationJr.WaitAndThenB();
        //iterationJr.WaitAndThen(
        //  function () {
        //    self.WaitForIframeCountDiffWorker(IFramesbefore, targetWin, iterationJr);
        //  });
      }
    }

    this.debug().FuncEnd(this.WaitForIframeCountDiffWorker.name);
    return toReturn;
  }

  private __getBigRedButtonElem(targetWin: IDataBroswerWindow) {
    this.debug().FuncStart(this.__getBigRedButtonElem.name, 'targetWin not null: ' + (targetWin !== null));
    var toReturn: HTMLElement = <HTMLElement>targetWin.Window.document.getElementById(this.Const().ElemId.sc.scStartButton.sc920);
    if (!toReturn) {
      toReturn = <HTMLElement>targetWin.Window.document.getElementById(this.Const().ElemId.sc.scStartButton.sc820);
    }

    this.debug().FuncEnd(this.__getBigRedButtonElem.name, 'toReturn: ' + (toReturn !== null));
    return toReturn;
  }

  WaitForAndClickRedStartButtonWorker(targetWin: IDataBroswerWindow, iterationJr: IterationHelper = null) {
    this.debug().FuncStart(this.WaitForAndClickRedStartButtonWorker.name, 'targetDoc not null: ' + (targetWin !== null));
    var toReturn: boolean = false;

    if (!iterationJr) {
      iterationJr = new IterationHelper(this.Xyyz, 10, 1000, this.WaitForAndClickRedStartButtonWorker.name);
    }
    if (iterationJr.DecrementAndKeepGoing()) {
      var found = this.__getBigRedButtonElem(targetWin);
      if (found) {
        this.debug().Log('red button found, clicking it');
        found.click();
        toReturn = true;
      } else {
        var self = this;
        iterationJr.WaitAndThen(() => {
          self.WaitForAndClickRedStartButtonWorker(targetWin, iterationJr);
        });
      }
    } else {
      toReturn = false;
    }

    this.debug().FuncEnd(this.WaitForAndClickRedStartButtonWorker.name);
    return toReturn;
  }

  async  WaitForReadyIframe(dataOneIframe: IDataOneIframe, iterationJr: IterationHelper = null) {
    this.debug().FuncStart(this.WaitForReadyIframe.name, dataOneIframe.Id.asShort);

    this.debug().DebugDataOneIframe(dataOneIframe);

    var toReturn = false;

    if (!iterationJr) {
      iterationJr = new IterationHelper(this.Xyyz, 20, 1000, this.WaitForReadyIframe.name);
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

        await iterationJr.WaitAndThenB();

        this.debug().Log('toReturn C is ' + toReturn);
      }
      this.debug().Log('while is looping ' + toReturn);
    }
    this.debug().FuncEnd(this.WaitForReadyIframe.name, currentReadyState + ' ' + toReturn.toString());;
    return toReturn;
  }

  WaitForAndThenClickCEFromMenuWorker(targetWin: IDataBroswerWindow, iterationJr: IterationHelper = null) {
    this.debug().FuncStart(this.WaitForAndThenClickCEFromMenuWorker.name);;
    var toReturn = false;
    if (!iterationJr) {
      iterationJr = new IterationHelper(this.Xyyz, 10, 1000, this.WaitForAndThenClickCEFromMenuWorker.name);
    }

    if (iterationJr.DecrementAndKeepGoing()) {
      var menuLeft: HTMLElement = targetWin.Window.document.querySelector('.scStartMenuLeftOption');
      if (menuLeft) {
        menuLeft.click();
        toReturn = true;
      } else {
        var self = this;
        iterationJr.WaitAndThen(
          function () {
            self.WaitForAndThenClickCEFromMenuWorker(targetWin, iterationJr);
          }
        );
      }
    } else {
      toReturn = false;
    }

    this.debug().FuncEnd(this.WaitForAndThenClickCEFromMenuWorker.name);;
    return toReturn;
  }

  GetAllLiveIframeData(targetWindow: IDataBroswerWindow): IDataOneIframe[] {
    this.debug().FuncStart(this.GetAllLiveIframeData.name);
    var toReturn: IDataOneIframe[] = [];
    var iframeAr = targetWindow.DataDocSelf.Document.querySelectorAll(this.Const().Selector.IframeContent);
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

    this.debug().Log('done gathering tree data');
    this.AtticMan().DrawDebugDataPretty(null);
    this.debug().FuncEnd(this.SaveStateOneDesktop.name);
  }
};