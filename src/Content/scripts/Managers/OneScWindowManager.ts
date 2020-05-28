import { ContentHub } from './ContentHub';
import { ContentManagerBase } from '../_first/_ContentManagerBase';
import { PromiseChainQuickPublish } from '../Promises/PromiseChainQuickPublish';
import { IDataOneStorageCE } from '../../../Shared/scripts/Interfaces/IDataOneStorageCE';
import { IDataOneIframe } from '../../../Shared/scripts/Interfaces/IDataOneIframe';
import { scWindowType } from '../../../Shared/scripts/Enums/scWindowType';
import { IDataOneWindowStorage } from '../../../Shared/scripts/Interfaces/IDataOneWindowStorage';
import { IDataOneDoc } from '../../../Shared/scripts/Interfaces/IDataOneDoc';
import { IDataPayloadSnapShot } from '../../../Shared/scripts/Interfaces/IDataPayloadSnapShot';
import { OneDesktopManager } from './OneDesktopManager';
import { OneCEManager } from './OneCEManager';
import { IDataDtState } from '../../../Shared/scripts/Interfaces/IDataDtState';
import { PromiseResult } from '../../../Shared/scripts/Classes/PromiseResult';
import { IAllConentAgents } from '../../../Shared/scripts/Interfaces/Agents/IAllConentAgents';

export class OneScWindowManager extends ContentManagerBase {
  OneDesktopMan: OneDesktopManager = null;
  OneCEMan: OneCEManager = null;

  constructor(hub: ContentHub, contentAgents: IAllConentAgents) {
    super(hub, contentAgents);
    this.ContentAgents.Logger.FuncStart(OneScWindowManager.name);

    this.ContentAgents.Logger.FuncEnd(OneScWindowManager.name);
  }

  Init() {
    //Init() {
    //  //todo put back ? var currentPageType = this.PageMan().GetCurrentPageType();
    //  //todo put back ?  this.CreateNewWindowSnapShot(currentPageType, SnapShotFlavor.Unknown);
    //}
    let currPageType = this.ScUiMan().GetCurrentPageType();
    if (currPageType === scWindowType.Desktop) {
      this.OneDesktopMan = new OneDesktopManager(this.ContentHub, this.ScUiMan().TopLevelDoc(), this.ContentAgents);
    } else if (currPageType === scWindowType.ContentEditor) {
      this.OneCEMan = new OneCEManager(this.ContentHub, this.ScUiMan().TopLevelDoc(), this.ContentAgents);
    }
  }

  SaveWindowState(snapShotSettings: IDataPayloadSnapShot) {
    return new Promise(async (resolve, reject) => {
      this.ContentAgents.Logger.FuncStart(this.SaveWindowState.name);

      let promiseResult: PromiseResult = new PromiseResult(this.SaveWindowState.name, this.ContentAgents.Logger);

      var snapShot: IDataOneWindowStorage = this.Helpers().FactoryHelp.CreateShellIDataOneWindowStorage(snapShotSettings.CurrentPageType, snapShotSettings.Flavor);

      if (snapShotSettings) {
        if (snapShotSettings.SnapShotNewNickname) {
          snapShot.NickName = snapShotSettings.SnapShotNewNickname;
        }
        snapShot.Flavor = snapShotSettings.Flavor;
      }

      if (snapShotSettings.CurrentPageType === scWindowType.ContentEditor) {
        this.ContentAgents.Logger.MarkerA();
        var id = this.ContentHub.Helpers.GuidHelp.EmptyGuid();

        await this.OneCEMan.GetStateCe(id)
          .then((state: IDataOneStorageCE) => {
            snapShot.AllCEAr.push(state);
            promiseResult.MarkSuccessful();
          }
          )
          .catch((err) => promiseResult.MarkFailed(err));
      }
      else if (snapShotSettings.CurrentPageType === scWindowType.Desktop) {
        this.ContentAgents.Logger.MarkerB();

        await this.OneDesktopMan.GetStateDesktop()
          .then((states: IDataDtState) => {
            snapShot.AllCEAr = states.AllCeData;
            promiseResult.MarkSuccessful();
          })
          .catch((err) => promiseResult.MarkFailed(err));
      }
      else {
        this.ContentAgents.Logger.Error(this.SaveWindowState.name, 'Invalid page location ' + snapShotSettings.CurrentPageType);
      }

      this.ContentAgents.Logger.FuncEnd(this.SaveWindowState.name);

      if (promiseResult.WasSuccessful) {
        await this.AtticMan().WriteToStorage(snapShot)
          .then(promiseResult.MarkSuccessful)
          .catch((err) => promiseResult.MarkFailed(err));
      }



      if (promiseResult.WasSuccessful()) {
        resolve();
      } else {
        reject(promiseResult.RejectReasons);
      }
    });
  }
  //WaitForPageLoad(desiredPageType: WindowType, targetWindow: IDataBrowserWindow, iteration: number, successCallBack: Function) {
  //  this.debug().FuncStart(this.WaitForPageLoad.name, 'Iteration: ' + iteration + ' | Desired type: ' + WindowType[desiredPageType]);
  //  var targetPageType: WindowType = this.PageMan().GetPageTypeOfTargetWindow(targetWindow.Window);
  //  if (targetPageType !== desiredPageType) {
  //    var self = this;
  //    if (iteration > 0) {
  //      iteration = iteration - 1;
  //      setTimeout(function () {
  //        self.WaitForPageLoad(desiredPageType, targetWindow, iteration, successCallBack);
  //      }, self.Const().Timeouts.WaitFogPageLoad);
  //    }
  //  } else {
  //    this.debug().Log('success, triggering callback: ' + successCallBack.name);
  //    successCallBack();
  //  }
  //  this.debug().FuncEnd(this.WaitForPageLoad.name);
  //}
  private __getTopLevelIframe(targetDoc: IDataOneDoc) {
    var toReturn: IDataOneIframe = null;
    var allIframe = this.OneDesktopMan.GetAllLiveIframeData();
    var maxZVal = -1;
    if (allIframe && allIframe.length > 0) {
      for (var idx = 0; idx < allIframe.length; idx++) {
        var candidateIframe = allIframe[idx];
        if (candidateIframe && candidateIframe.Zindex > maxZVal) {
          toReturn = candidateIframe;
          maxZVal = candidateIframe.Zindex;
        }
      }
    }
    return toReturn;
  }
  async PublishActiveCE(targetDoc: IDataOneDoc) {
    this.ContentAgents.Logger.FuncStart(this.PublishActiveCE.name);
    var currentWindowType = this.ScUiMan().GetCurrentPageType();
    var docToPublish: IDataOneDoc = null;
    if (currentWindowType === scWindowType.Desktop) {
      var topIframe: IDataOneIframe = this.__getTopLevelIframe(targetDoc);
      if (topIframe) {
        docToPublish = topIframe.ContentDoc;
      }
    }
    else {
      docToPublish = this.ScUiMan().TopLevelDoc();
    }
    this.ContentAgents.Logger.Log('docToPublish', this.ContentAgents.Logger.IsNullOrUndefined(docToPublish));
    if (docToPublish) {
      var publishChain: PromiseChainQuickPublish = new PromiseChainQuickPublish(this.ContentHub, this.ContentAgents);
      await publishChain.PublishCE(docToPublish);
    }
    this.ContentAgents.Logger.FuncEnd(this.PublishActiveCE.name);
  }
  async RestoreWindowStateToTarget(targetDoc: IDataOneDoc, dataToRestore: IDataOneWindowStorage) {
    this.ContentAgents.Logger.FuncStart(this.RestoreWindowStateToTarget.name);
    if (dataToRestore) {
      if (dataToRestore.WindowType === scWindowType.ContentEditor) {
        await this.OneCEMan.RestoreCEStateAsync(dataToRestore.AllCEAr[0], targetDoc);
      }
      else if (dataToRestore.WindowType === scWindowType.Desktop) {
        await this.OneDesktopMan.RestoreDesktopState(targetDoc, dataToRestore);
      }
      else {
        this.ContentAgents.Logger.Error(this.RestoreWindowStateToTarget.name, 'No match found for snap shot');
      }
      this.ContentAgents.Logger.FuncEnd(this.RestoreWindowStateToTarget.name);
    }
  }

  //UpdateStorage() {
  //  this.debug().FuncStart(this.UpdateStorage.name);
  //  this.AtticMan().WriteToStorage(this.__activeWindowSnapShot);
  //  this.debug().FuncEnd(this.UpdateStorage.name);
  //}

  //FindMatchingCeData(oneCeData: IDataOneStorageCE): IDataOneStorageCE {
  //  var toReturn: IDataOneStorageCE = null;
  //  for (var idx = 0; idx < this.__activeWindowSnapShot.AllCEAr.length; idx++) {
  //    var candidate: IDataOneStorageCE = this.__activeWindowSnapShot.AllCEAr[idx];
  //    if (candidate.Id === oneCeData.Id) {
  //      toReturn = candidate;
  //      break;
  //    }
  //  }
  //  this.debug().Log('match found :' + (toReturn !== null));
  //  return toReturn;
  //}
}