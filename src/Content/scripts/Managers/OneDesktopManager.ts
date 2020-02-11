import { ContentHub } from './ContentHub';
import { ContentManagerBase } from '../_first/_ContentManagerBase';
import { IterationHelper } from '../../../Shared/scripts/Classes/IterationHelper';
import { PromiseChainRestoreDesktop } from '../Promises/PromiseChainRestoreDesktop';
import { IDataBrowserWindow } from '../../../Shared/scripts/Interfaces/IDataBrowserWindow';
import { IDataOneStorageCE } from '../../../Shared/scripts/Interfaces/IDataOneStorageCE';
import { IDataOneIframe } from '../../../Shared/scripts/Interfaces/IDataOneIframe';
import { IDataOneWindowStorage } from '../../../Shared/scripts/Interfaces/IDataOneWindowStorage';
import { IDataPayloadSnapShot } from '../../../Shared/scripts/Classes/IDataPayloadSnapShot';

export class OneDesktopManager extends ContentManagerBase {
  constructor(xyyz: ContentHub) {
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

  async RestoreDesktopStateAsync(targetWindow: IDataBrowserWindow, dataToRestore: IDataOneWindowStorage) {
    this.debug().FuncStart(this.RestoreDesktopStateAsync.name);;

    if (this.MiscMan().NotNullOrUndefined([targetWindow, dataToRestore, dataToRestore.AllCEAr], this.RestoreDesktopStateAsync.name)) {
      for (var idx = 0; idx < dataToRestore.AllCEAr.length; idx++) {
        this.debug().Log('data idx: ' + idx + ':' + dataToRestore.AllCEAr.length);

        var desktopPromiser: PromiseChainRestoreDesktop = new PromiseChainRestoreDesktop(this.ContentHub);

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
      await this.ContentHub.OneCEMan.RestoreCEStateAsync(oneCEdata, newIframe.ContentDoc);
      toReturn = true;
    } else {
      this.debug().Error(this.RestoreDataToOneIframeWorker.name, 'bad data');
      toReturn = false;
    }
    this.debug().FuncEnd(this.RestoreDataToOneIframeWorker.name, toReturn.toString());
    return toReturn;
  }

  async WaitForIframeCountDiffWorker(IFramesbefore: IDataOneIframe[], targetWin: IDataBrowserWindow) {
    this.debug().FuncStart(this.WaitForIframeCountDiffWorker.name);
    var toReturn: IDataOneIframe = null;

    var iterationJr = new IterationHelper(this.debug(), this.WaitForIframeCountDiffWorker.name)

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

        await iterationJr.Wait();
      }
    }

    this.debug().FuncEnd(this.WaitForIframeCountDiffWorker.name);
    return toReturn;
  }

  GetAllLiveIframeData(targetWindow: IDataBrowserWindow): IDataOneIframe[] {
    this.debug().FuncStart(this.GetAllLiveIframeData.name);
    var toReturn: IDataOneIframe[] = [];
    var iframeAr = targetWindow.DataDocSelf.Document.querySelectorAll(this.Const().Selector.SC.IframeContent);
    if (iframeAr) {
      this.debug().Log('iframeAr: ' + iframeAr.length);
      for (var ifrIdx = 0; ifrIdx < iframeAr.length; ifrIdx++) {
        this.debug().Log('pushing: ' + ifrIdx);

        var iframeElem: HTMLIFrameElement = <HTMLIFrameElement>iframeAr[ifrIdx];
        var dataOneIframe: IDataOneIframe = this.Factoryman().DateOneIframeFactory(iframeElem, targetWindow.DataDocSelf, 'desktop Iframe_' + ifrIdx);
        dataOneIframe.ContentDoc.HasParentDesktop = true;
        dataOneIframe.ContentDoc.IsCEDoc = true;
        toReturn.push(dataOneIframe);
      }
    }
    this.debug().FuncEnd(this.GetAllLiveIframeData.name, 'count:  ' + toReturn.length);
    return toReturn;
  }

  GetActiveDesktopIframeData() {
    this.debug().FuncStart(this.GetActiveDesktopIframeData.name);
    var toReturn: IDataOneIframe = null;
    var livingIframeAr: IDataOneIframe[] = this.GetAllLiveIframeData(this.PageDataMan().TopLevelWindow());

    if (livingIframeAr) {
      for (var idx = 0; idx < livingIframeAr.length; idx++) {
        if (livingIframeAr[idx].Zindex === 1) {
          toReturn = livingIframeAr[idx];
          break;
        }

      }
    }
    this.debug().FuncEnd(this.GetActiveDesktopIframeData.name);
    return toReturn;
  }

  SaveStateOneDesktop(targetWindow: IDataBrowserWindow, snapShotSettings: IDataPayloadSnapShot) {
    this.debug().FuncStart(this.SaveStateOneDesktop.name);;
    this.debug().Log('SaveOneDesktop');;
    var livingIframeAr: IDataOneIframe[] = this.GetAllLiveIframeData(targetWindow);
    if (livingIframeAr && livingIframeAr.length > 0) {
      for (var iframeIdx = 0; iframeIdx < livingIframeAr.length; iframeIdx++) {
        this.debug().Log('iframeIdx: ' + iframeIdx);

        var targetIframeObj = livingIframeAr[iframeIdx];
        //this.debug().Log('targetIframe: ' + JSON.stringify(targetIframeObj));
        this.ContentHub.OneCEMan.SaveStateOneContentEditor(targetIframeObj.Id, targetIframeObj.ContentDoc, snapShotSettings);
      }
    }

    this.debug().FuncEnd(this.SaveStateOneDesktop.name);
  }
};