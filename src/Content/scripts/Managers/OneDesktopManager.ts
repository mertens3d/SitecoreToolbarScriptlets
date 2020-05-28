import { ContentHub } from './ContentHub';
import { ContentManagerBase } from '../_first/_ContentManagerBase';
import { IterationHelper } from '../../../Shared/scripts/Classes/IterationHelper';
import { PromiseChainRestoreDesktop } from '../Promises/PromiseChainRestoreDesktop';
import { IDataOneStorageCE } from '../../../Shared/scripts/Interfaces/IDataOneStorageCE';
import { IDataOneIframe } from '../../../Shared/scripts/Interfaces/IDataOneIframe';
import { IDataOneWindowStorage } from '../../../Shared/scripts/Interfaces/IDataOneWindowStorage';
import { IDataOneDoc } from '../../../Shared/scripts/Interfaces/IDataOneDoc';
import { OneCEManager } from './OneCEManager';
import { IDataDtState } from '../../../Shared/scripts/Interfaces/IDataDtState';
import { ContentConst } from '../../../Shared/scripts/Interfaces/InjectConst';
import { PromiseResult } from '../../../Shared/scripts/Classes/PromiseResult';
import { IAllConentAgents } from '../../../Shared/scripts/Interfaces/Agents/IAllConentAgents';

export class OneDesktopManager extends ContentManagerBase {
  associatedDoc: IDataOneDoc;

  constructor(hub: ContentHub, associatedDoc: IDataOneDoc, contentAgents: IAllConentAgents) {
    super(hub, contentAgents);
    this.ContentAgents.Logger.FuncStart(OneDesktopManager.name);
    this.associatedDoc = associatedDoc;
    this.ContentAgents.Logger.FuncEnd(OneDesktopManager.name);
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
    this.ContentAgents.Logger.FuncStart(this.RestoreDesktopState.name);;

    if (this.MiscMan().NotNullOrUndefined([targetDoc, dataToRestore, dataToRestore.AllCEAr], this.RestoreDesktopState.name)) {
      for (var idx = 0; idx < dataToRestore.AllCEAr.length; idx++) {
        this.ContentAgents.Logger.Log('data idx: ' + idx + ':' + dataToRestore.AllCEAr.length);

        var desktopPromiser: PromiseChainRestoreDesktop = new PromiseChainRestoreDesktop(this.ContentHub, this.ContentAgents);

        await desktopPromiser.RunOneChain(targetDoc, dataToRestore.AllCEAr[idx]);
      }
    }

    this.ContentAgents.Logger.FuncEnd(this.RestoreDesktopState.name);
  }
  async RestoreDataToOneIframeWorker(oneCEdata: IDataOneStorageCE, newIframe: IDataOneIframe) {
    this.ContentAgents.Logger.FuncStart(this.RestoreDataToOneIframeWorker.name, 'data not null: ' + (oneCEdata != null) + ' newFrame not null: ' + (newIframe !== null));
    var toReturn: boolean = false;

    this.ContentAgents.Logger.DebugDataOneIframe(newIframe);

    if (oneCEdata && newIframe) {
      await this.OneScWinMan().OneCEMan.RestoreCEStateAsync(oneCEdata, newIframe.ContentDoc);
      toReturn = true;
    } else {
      this.ContentAgents.Logger.Error(this.RestoreDataToOneIframeWorker.name, 'bad data');
      toReturn = false;
    }
    this.ContentAgents.Logger.FuncEnd(this.RestoreDataToOneIframeWorker.name, toReturn.toString());
    return toReturn;
  }

  async WaitForIframeCountDiffWorker(IFramesbefore: IDataOneIframe[]) {
    this.ContentAgents.Logger.FuncStart(this.WaitForIframeCountDiffWorker.name);
    var toReturn: IDataOneIframe = null;

    var iterationJr = new IterationHelper(this.Helpers(), this.WaitForIframeCountDiffWorker.name, this.ContentAgents.HelperAgents)

    while (!toReturn && iterationJr.DecrementAndKeepGoing()) {
      let beforeCount: number = IFramesbefore.length;

      var allIframesAfter: IDataOneIframe[] = this.GetAllLiveIframeData();

      var count: number = allIframesAfter.length;
      this.ContentAgents.Logger.Log('iFrame count before: ' + IFramesbefore.length);
      this.ContentAgents.Logger.Log('iFrame count after: ' + allIframesAfter.length);

      if (count > beforeCount) {
        var newIframes: IDataOneIframe[] = allIframesAfter.filter(e => !IFramesbefore.includes(e));

        toReturn = newIframes[0];
      } else {
        await iterationJr.Wait();
      }
    }

    this.ContentAgents.Logger.FuncEnd(this.WaitForIframeCountDiffWorker.name);
    return toReturn;
  }

  GetAllLiveIframeData(): IDataOneIframe[] {
    this.ContentAgents.Logger.FuncStart(this.GetAllLiveIframeData.name);

    this.ContentAgents.Logger.DebugIDataOneDoc(this.associatedDoc);

    var toReturn: IDataOneIframe[] = [];

    this.ContentAgents.Logger.LogVal('querySelectorAll 9.2: ', ContentConst.Const.Selector.SC.IframeContent.sc920);

    var iframeAr = this.associatedDoc.ContentDoc.querySelectorAll(ContentConst.Const.Selector.SC.IframeContent.sc920);

    if (!iframeAr) {
      iframeAr = this.associatedDoc.ContentDoc.querySelectorAll(ContentConst.Const.Selector.SC.IframeContent.sc820);
    }

    this.ContentAgents.Logger.LogVal('found iframes count', iframeAr.length);
    if (iframeAr) {
      this.ContentAgents.Logger.Log('iframeAr: ' + iframeAr.length);
      for (var ifrIdx = 0; ifrIdx < iframeAr.length; ifrIdx++) {
        this.ContentAgents.Logger.Log('pushing: ' + ifrIdx);

        var iframeElem: HTMLIFrameElement = <HTMLIFrameElement>iframeAr[ifrIdx];
        var dataOneIframe: IDataOneIframe = this.Helpers().FactoryHelp.DataOneIframeFactory(iframeElem, 'desktop Iframe_' + ifrIdx);
        toReturn.push(dataOneIframe);
      }
    } else {
      this.ContentAgents.Logger.Log('no iframes found');
    }

    this.ContentAgents.Logger.LogVal('iframe count', toReturn.length);

    this.ContentAgents.Logger.FuncEnd(this.GetAllLiveIframeData.name, 'count:  ' + toReturn.length);
    return toReturn;
  }

  GetStateDesktop() {
    return new Promise(async (resolve, reject) => {
      this.ContentAgents.Logger.FuncStart(this.GetStateDesktop.name);
      this.ContentAgents.Logger.DebugIDataOneDoc(this.associatedDoc);

      let promiseResult: PromiseResult = new PromiseResult(this.GetStateDesktop.name, this.ContentAgents.Logger);

      var toReturnAllCeState: IDataDtState = this.Helpers().FactoryHelp.CreateNewDtDataShell();
      toReturnAllCeState.livingIframeAr = this.GetAllLiveIframeData();

      if (toReturnAllCeState.livingIframeAr && toReturnAllCeState.livingIframeAr.length > 0) {
        for (var iframeIdx = 0; iframeIdx < toReturnAllCeState.livingIframeAr.length; iframeIdx++) {
          this.ContentAgents.Logger.LogVal('iframeIdx: ', iframeIdx);

          var targetIframeObj = toReturnAllCeState.livingIframeAr[iframeIdx];

          var oneCeMan = new OneCEManager(this.ContentHub, targetIframeObj.ContentDoc, this.ContentAgents);

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

      this.ContentAgents.Logger.FuncEnd(this.GetStateDesktop.name);

      if (promiseResult.WasSuccessful()) {
        resolve(toReturnAllCeState);
      } else {
        reject(promiseResult.RejectReasons);
      }
    })
  }
};