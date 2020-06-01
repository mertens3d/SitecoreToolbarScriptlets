import { ContentHub } from './ContentHub';
import { ContentManagerBase } from '../_first/_ContentManagerBase';
import { IterationDrone } from '../../../Shared/scripts/Agents/Drones/IterationDrone';
import { PromiseChainRestoreDesktop } from '../Promises/PromiseChainRestoreDesktop';
import { IDataOneStorageCE } from '../../../Shared/scripts/Interfaces/IDataOneStorageCE';
import { IDataOneIframe } from '../../../Shared/scripts/Interfaces/IDataOneIframe';
import { IDataOneWindowStorage } from '../../../Shared/scripts/Interfaces/IDataOneWindowStorage';
import { IDataOneDoc } from '../../../Shared/scripts/Interfaces/IDataOneDoc';
import { OneCEAgent } from './OneCEAgent';
import { IDataDesktopState } from '../../../Shared/scripts/Interfaces/IDataDtState';
import { ContentConst } from '../../../Shared/scripts/Interfaces/InjectConst';
import { PromiseResult } from '../../../Shared/scripts/Classes/PromiseResult';
import { IAllAgents } from '../../../Shared/scripts/Interfaces/Agents/IAllAgents';

export class OneDesktopManager extends ContentManagerBase {
  associatedDoc: IDataOneDoc;

  constructor(hub: ContentHub, associatedDoc: IDataOneDoc, AllAgents: IAllAgents) {
    super(hub, AllAgents);
    this.AllAgents.Logger.FuncStart(OneDesktopManager.name);
    this.associatedDoc = associatedDoc;
    this.AllAgents.Logger.FuncEnd(OneDesktopManager.name);
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
    this.AllAgents.Logger.FuncStart(this.RestoreDesktopState.name);;

    if (this.MiscMan().NotNullOrUndefined([targetDoc, dataToRestore, dataToRestore.AllCEAr], this.RestoreDesktopState.name)) {
      for (var idx = 0; idx < dataToRestore.AllCEAr.length; idx++) {
        this.AllAgents.Logger.Log('data idx: ' + idx + ':' + dataToRestore.AllCEAr.length);

        var desktopPromiser: PromiseChainRestoreDesktop = new PromiseChainRestoreDesktop(this.ContentHub, this.AllAgents);

        await desktopPromiser.RunOneChain(targetDoc, dataToRestore.AllCEAr[idx]);
      }
    }

    this.AllAgents.Logger.FuncEnd(this.RestoreDesktopState.name);
  }

  async RestoreDataToOneIframeWorker(oneCEdata: IDataOneStorageCE, targetIframe: IDataOneIframe) {
    this.AllAgents.Logger.FuncStart(this.RestoreDataToOneIframeWorker.name, 'data not null: ' + (oneCEdata != null) + ' newFrame not null: ' + (targetIframe !== null));
    var toReturn: boolean = false;

    this.AllAgents.Logger.DebugDataOneIframe(targetIframe);

    if (oneCEdata && targetIframe) {
      await this.OneScWinMan().OneCEAgent.RestoreCEStateAsync(oneCEdata, targetIframe.ContentDoc);
      toReturn = true;
    } else {
      this.AllAgents.Logger.Error(this.RestoreDataToOneIframeWorker.name, 'bad data');
      toReturn = false;
    }
    this.AllAgents.Logger.FuncEnd(this.RestoreDataToOneIframeWorker.name, toReturn.toString());
    return toReturn;
  }

  async WaitForIframeCountDiffWorker(IFramesbefore: IDataOneIframe[]) {
    this.AllAgents.Logger.FuncStart(this.WaitForIframeCountDiffWorker.name);
    var toReturn: IDataOneIframe = null;

    var iterationJr = new IterationDrone(this.AllAgents.Logger, this.WaitForIframeCountDiffWorker.name)

    while (!toReturn && iterationJr.DecrementAndKeepGoing()) {
      let beforeCount: number = IFramesbefore.length;

      var allIframesAfter: IDataOneIframe[] = this.GetAllLiveIframeData();

      var count: number = allIframesAfter.length;
      this.AllAgents.Logger.Log('iFrame count before: ' + IFramesbefore.length);
      this.AllAgents.Logger.Log('iFrame count after: ' + allIframesAfter.length);

      if (count > beforeCount) {
        var newIframes: IDataOneIframe[] = allIframesAfter.filter(e => !IFramesbefore.includes(e));

        toReturn = newIframes[0];
      } else {
        await iterationJr.Wait();
      }
    }

    this.AllAgents.Logger.FuncEnd(this.WaitForIframeCountDiffWorker.name);
    return toReturn;
  }

  GetAllLiveIframeData(): IDataOneIframe[] {
    this.AllAgents.Logger.FuncStart(this.GetAllLiveIframeData.name);

    this.AllAgents.Logger.DebugIDataOneDoc(this.associatedDoc);

    var toReturn: IDataOneIframe[] = [];

    this.AllAgents.Logger.LogVal('querySelectorAll 9.2: ', ContentConst.Const.Selector.SC.IframeContent.sc920);

    var iframeAr = this.associatedDoc.ContentDoc.querySelectorAll(ContentConst.Const.Selector.SC.IframeContent.sc920);

    if (!iframeAr) {
      iframeAr = this.associatedDoc.ContentDoc.querySelectorAll(ContentConst.Const.Selector.SC.IframeContent.sc820);
    }

    this.AllAgents.Logger.LogVal('found iframes count', iframeAr.length);
    if (iframeAr) {
      this.AllAgents.Logger.Log('iframeAr: ' + iframeAr.length);
      for (var ifrIdx = 0; ifrIdx < iframeAr.length; ifrIdx++) {
        this.AllAgents.Logger.Log('pushing: ' + ifrIdx);

        var iframeElem: HTMLIFrameElement = <HTMLIFrameElement>iframeAr[ifrIdx];
        var dataOneIframe: IDataOneIframe = this.AllAgents.HelperAgent.FactoryHelp.DataOneIframeFactory(iframeElem, 'desktop Iframe_' + ifrIdx);
        toReturn.push(dataOneIframe);
      }
    } else {
      this.AllAgents.Logger.Log('no iframes found');
    }

    this.AllAgents.Logger.LogVal('iframe count', toReturn.length);

    this.AllAgents.Logger.FuncEnd(this.GetAllLiveIframeData.name, 'count:  ' + toReturn.length);
    return toReturn;
  }

  GetStateDesktop() {
    return new Promise(async (resolve, reject) => {
      this.AllAgents.Logger.FuncStart(this.GetStateDesktop.name);
      this.AllAgents.Logger.DebugIDataOneDoc(this.associatedDoc);

      let promiseResult: PromiseResult = new PromiseResult(this.GetStateDesktop.name, this.AllAgents.Logger);

      var toReturnAllCeState: IDataDesktopState = this.AllAgents.HelperAgent.FactoryHelp.CreateNewDtDataShell();
      toReturnAllCeState.livingIframeAr = this.GetAllLiveIframeData();

      if (toReturnAllCeState.livingIframeAr && toReturnAllCeState.livingIframeAr.length > 0) {
        for (var iframeIdx = 0; iframeIdx < toReturnAllCeState.livingIframeAr.length; iframeIdx++) {
          this.AllAgents.Logger.LogVal('iframeIdx: ', iframeIdx);

          var targetIframeObj = toReturnAllCeState.livingIframeAr[iframeIdx];

          var oneCeMan = new OneCEAgent(targetIframeObj.ContentDoc, this.AllAgents.Logger, this.AllAgents.HelperAgent);

          //todo - should this be checking for min value. There may be a different iframe that is not ce that is top

          await oneCeMan.GetStateCe(this.AllAgents.HelperAgent.GuidHelp.EmptyGuid())
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

      this.AllAgents.Logger.FuncEnd(this.GetStateDesktop.name);

      if (promiseResult.WasSuccessful()) {
        resolve(toReturnAllCeState);
      } else {
        reject(promiseResult.RejectReasons);
      }
    })
  }
};