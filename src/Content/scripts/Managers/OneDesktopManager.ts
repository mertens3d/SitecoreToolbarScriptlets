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

export class OneDesktopManager extends ContentManagerBase {
  associatedDoc: IDataOneDoc;

  constructor(hub: ContentHub, associatedDoc: IDataOneDoc) {
    hub.debug.FuncStart(OneDesktopManager.name);
    super(hub);
    this.associatedDoc = associatedDoc;
    hub.debug.FuncEnd(OneDesktopManager.name);
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
    this.debug().FuncStart(this.RestoreDesktopState.name);;

    if (this.MiscMan().NotNullOrUndefined([targetDoc, dataToRestore, dataToRestore.AllCEAr], this.RestoreDesktopState.name)) {
      for (var idx = 0; idx < dataToRestore.AllCEAr.length; idx++) {
        this.debug().Log('data idx: ' + idx + ':' + dataToRestore.AllCEAr.length);

        var desktopPromiser: PromiseChainRestoreDesktop = new PromiseChainRestoreDesktop(this.ContentHub);

        await desktopPromiser.RunOneChain(targetDoc, dataToRestore.AllCEAr[idx]);
      }
    }

    this.debug().FuncEnd(this.RestoreDesktopState.name);
  }
  async RestoreDataToOneIframeWorker(oneCEdata: IDataOneStorageCE, newIframe: IDataOneIframe) {
    this.debug().FuncStart(this.RestoreDataToOneIframeWorker.name, 'data not null: ' + (oneCEdata != null) + ' newFrame not null: ' + (newIframe !== null));
    var toReturn: boolean = false;

    this.debug().DebugDataOneIframe(newIframe);

    if (oneCEdata && newIframe) {
      await this.OneScWinMan().OneCEMan.RestoreCEStateAsync(oneCEdata, newIframe.ContentDoc);
      toReturn = true;
    } else {
      this.debug().Error(this.RestoreDataToOneIframeWorker.name, 'bad data');
      toReturn = false;
    }
    this.debug().FuncEnd(this.RestoreDataToOneIframeWorker.name, toReturn.toString());
    return toReturn;
  }

  async WaitForIframeCountDiffWorker(IFramesbefore: IDataOneIframe[]) {
    this.debug().FuncStart(this.WaitForIframeCountDiffWorker.name);
    var toReturn: IDataOneIframe = null;

    var iterationJr = new IterationHelper(this.Helpers(), this.WaitForIframeCountDiffWorker.name)

    while (!toReturn && iterationJr.DecrementAndKeepGoing()) {
      let beforeCount: number = IFramesbefore.length;

      var allIframesAfter: IDataOneIframe[] = this.GetAllLiveIframeData();

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

  GetAllLiveIframeData(): IDataOneIframe[] {
    this.debug().FuncStart(this.GetAllLiveIframeData.name);

    this.debug().DebugIDataOneDoc(this.associatedDoc);

    var toReturn: IDataOneIframe[] = [];
    var iframeAr = this.associatedDoc.Document.querySelectorAll(ContentConst.Const.Selector.SC.IframeContent);
    if (iframeAr) {
      this.debug().Log('iframeAr: ' + iframeAr.length);
      for (var ifrIdx = 0; ifrIdx < iframeAr.length; ifrIdx++) {
        this.debug().Log('pushing: ' + ifrIdx);

        var iframeElem: HTMLIFrameElement = <HTMLIFrameElement>iframeAr[ifrIdx];
        var dataOneIframe: IDataOneIframe = this.Factoryman().DateOneIframeFactory(iframeElem, this.associatedDoc, 'desktop Iframe_' + ifrIdx);
        dataOneIframe.ContentDoc.HasParentDesktop = true;
        toReturn.push(dataOneIframe);
      }
    }
    this.debug().FuncEnd(this.GetAllLiveIframeData.name, 'count:  ' + toReturn.length);
    return toReturn;
  }

  GetState(): IDataDtState {
    this.debug().FuncStart(this.GetState.name);
    this.debug().DebugIDataOneDoc(this.associatedDoc);

    var toReturnAllCeState: IDataDtState = this.Helpers().FactoryHelp.CreateNewDtDataShell();
    toReturnAllCeState.livingIframeAr = this.GetAllLiveIframeData();

    if (toReturnAllCeState.livingIframeAr && toReturnAllCeState.livingIframeAr.length > 0) {
      for (var iframeIdx = 0; iframeIdx < toReturnAllCeState.livingIframeAr.length; iframeIdx++) {
        this.debug().Log('iframeIdx: ' + iframeIdx);

        var targetIframeObj = toReturnAllCeState.livingIframeAr[iframeIdx];

        
        var oneCeMan = new OneCEManager(this.ContentHub, targetIframeObj.ContentDoc);

        //todo - should this be checking for min value. There may be a different iframe that is not ce that is top
        if (targetIframeObj.Zindex === 1) {
          toReturnAllCeState.ActiveCeMan = oneCeMan;
        }

        var oneCeState = oneCeMan.GetState(this.Helpers().GuidHelp.EmptyGuid());
        toReturnAllCeState.AllCeData.push(oneCeState);
      }
    }

    this.debug().FuncEnd(this.GetState.name);

    return toReturnAllCeState;
  }
};