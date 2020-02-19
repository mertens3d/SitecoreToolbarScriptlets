import { ContentHub } from './ContentHub';
import { ContentManagerBase } from '../_first/_ContentManagerBase';
import { IterationHelper } from '../../../Shared/scripts/Classes/IterationHelper';
import { PromiseChainRestoreDesktop } from '../Promises/PromiseChainRestoreDesktop';
import { IDataBrowserTab } from '../../../Shared/scripts/Interfaces/IDataBrowserWindow';
import { IDataOneStorageCE } from '../../../Shared/scripts/Interfaces/IDataOneStorageCE';
import { IDataOneIframe } from '../../../Shared/scripts/Interfaces/IDataOneIframe';
import { IDataOneWindowStorage } from '../../../Shared/scripts/Interfaces/IDataOneWindowStorage';
import { IDataPayloadSnapShot } from '../../../Shared/scripts/Classes/IDataPayloadSnapShot';
import { IDataOneDoc } from '../../../Shared/scripts/Interfaces/IDataOneDoc';
import { OneCEManager } from './OneCEManager';
import { IDataDtState } from '../../../Shared/scripts/Interfaces/IDataDtState';
import { ContentConst } from '../../../Shared/scripts/Interfaces/InjectConst';
import { UrlParts } from '../../../Shared/scripts/Interfaces/UrlParts';
import { PromiseResult } from '../../../Shared/scripts/Classes/PromiseResult';

export class OneDesktopManager extends ContentManagerBase {
  associatedDoc: IDataOneDoc;

  constructor(hub: ContentHub, associatedDoc: IDataOneDoc) {
    hub.Logger.FuncStart(OneDesktopManager.name);
    super(hub);
    this.associatedDoc = associatedDoc;
    hub.Logger.FuncEnd(OneDesktopManager.name);
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

  async RestoreDesktopState(targetDoc: IDataOneDoc, dataToRestore: IDataOneWindowStorage) {
    this.Log().FuncStart(this.RestoreDesktopState.name);;

    if (this.MiscMan().NotNullOrUndefined([targetDoc, dataToRestore, dataToRestore.AllCEAr], this.RestoreDesktopState.name)) {
      for (var idx = 0; idx < dataToRestore.AllCEAr.length; idx++) {
        this.Log().Log('data idx: ' + idx + ':' + dataToRestore.AllCEAr.length);

        var desktopPromiser: PromiseChainRestoreDesktop = new PromiseChainRestoreDesktop(this.ContentHub);

        await desktopPromiser.RunOneChain(targetDoc, dataToRestore.AllCEAr[idx]);
      }
    }

    this.Log().FuncEnd(this.RestoreDesktopState.name);
  }
  async RestoreDataToOneIframeWorker(oneCEdata: IDataOneStorageCE, newIframe: IDataOneIframe) {
    this.Log().FuncStart(this.RestoreDataToOneIframeWorker.name, 'data not null: ' + (oneCEdata != null) + ' newFrame not null: ' + (newIframe !== null));
    var toReturn: boolean = false;

    this.Log().DebugDataOneIframe(newIframe);

    if (oneCEdata && newIframe) {
      await this.OneScWinMan().OneCEMan.RestoreCEStateAsync(oneCEdata, newIframe.ContentDoc);
      toReturn = true;
    } else {
      this.Log().Error(this.RestoreDataToOneIframeWorker.name, 'bad data');
      toReturn = false;
    }
    this.Log().FuncEnd(this.RestoreDataToOneIframeWorker.name, toReturn.toString());
    return toReturn;
  }

  async WaitForIframeCountDiffWorker(IFramesbefore: IDataOneIframe[]) {
    this.Log().FuncStart(this.WaitForIframeCountDiffWorker.name);
    var toReturn: IDataOneIframe = null;

    var iterationJr = new IterationHelper(this.Helpers(), this.WaitForIframeCountDiffWorker.name)

    while (!toReturn && iterationJr.DecrementAndKeepGoing()) {
      let beforeCount: number = IFramesbefore.length;

      var allIframesAfter: IDataOneIframe[] = this.GetAllLiveIframeData();

      var count: number = allIframesAfter.length;
      this.Log().Log('iFrame count before: ' + IFramesbefore.length);
      this.Log().Log('iFrame count after: ' + allIframesAfter.length);

      if (count > beforeCount) {
        var newIframes: IDataOneIframe[] = allIframesAfter.filter(e => !IFramesbefore.includes(e));

        toReturn = newIframes[0];
      } else {
        await iterationJr.Wait();
      }
    }

    this.Log().FuncEnd(this.WaitForIframeCountDiffWorker.name);
    return toReturn;
  }

  GetAllLiveIframeData(): IDataOneIframe[] {
    this.Log().FuncStart(this.GetAllLiveIframeData.name);

    this.Log().DebugIDataOneDoc(this.associatedDoc);

    var toReturn: IDataOneIframe[] = [];
    var iframeAr = this.associatedDoc.Document.querySelectorAll(ContentConst.Const.Selector.SC.IframeContent);
    this.Log().LogVal('found iframes count', iframeAr.length);
    if (iframeAr) {
      this.Log().Log('iframeAr: ' + iframeAr.length);
      for (var ifrIdx = 0; ifrIdx < iframeAr.length; ifrIdx++) {
        this.Log().Log('pushing: ' + ifrIdx);

        var iframeElem: HTMLIFrameElement = <HTMLIFrameElement>iframeAr[ifrIdx];
        var dataOneIframe: IDataOneIframe = this.ContentFactory().DateOneIframeFactory(iframeElem, this.associatedDoc, 'desktop Iframe_' + ifrIdx);
        toReturn.push(dataOneIframe);
      }
    } else {
      this.Log().Log('no iframes found');
    }

    this.Log().LogVal('iframe count', toReturn.length);

    this.Log().FuncEnd(this.GetAllLiveIframeData.name, 'count:  ' + toReturn.length);
    return toReturn;
  }

  GetStateDesktop() {
    return new Promise(async (resolve, reject) => {
      this.Log().FuncStart(this.GetStateDesktop.name);
      this.Log().DebugIDataOneDoc(this.associatedDoc);

      let promiseResult: PromiseResult = new PromiseResult(this.GetStateDesktop.name, this.Log());

      var toReturnAllCeState: IDataDtState = this.Helpers().FactoryHelp.CreateNewDtDataShell();
      toReturnAllCeState.livingIframeAr = this.GetAllLiveIframeData();

      if (toReturnAllCeState.livingIframeAr && toReturnAllCeState.livingIframeAr.length > 0) {
        for (var iframeIdx = 0; iframeIdx < toReturnAllCeState.livingIframeAr.length; iframeIdx++) {
          this.Log().LogVal('iframeIdx: ', iframeIdx);

          var targetIframeObj = toReturnAllCeState.livingIframeAr[iframeIdx];

          var oneCeMan = new OneCEManager(this.ContentHub, targetIframeObj.ContentDoc);

          //todo - should this be checking for min value. There may be a different iframe that is not ce that is top

          await oneCeMan.GetStateCe(this.Helpers().GuidHelp.EmptyGuid())
            .then((oneCeState: IDataOneStorageCE) => {
              toReturnAllCeState.AllCeData.push(oneCeState);

              if (targetIframeObj.Zindex === 1) {
                toReturnAllCeState.ActiveCeMan = oneCeMan;
                toReturnAllCeState.ActiveCeState = oneCeState;
              }

              promiseResult.MarkSuccessful();
            }
            )
            .catch((err) => promiseResult.MarkFailed(err));

          if (!promiseResult.WasSuccessful) {
            break;
          }
        }
      } else {
        promiseResult.MarkSuccessful();
      }

      this.Log().FuncEnd(this.GetStateDesktop.name);

      if (promiseResult.WasSuccessful()) {
        resolve(toReturnAllCeState);
      } else {
        reject(promiseResult.RejectMessage);
      }
    })
  }
};