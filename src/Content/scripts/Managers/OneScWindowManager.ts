﻿import { ContentHub } from './ContentHub';
import { ContentManagerBase } from '../_first/_ContentManagerBase';
import { PromiseChainQuickPublish } from '../Promises/PromiseChainQuickPublish';
import { IDataOneStorageCE } from '../../../Shared/scripts/Interfaces/IDataOneStorageCE';
import { IDataOneIframe } from '../../../Shared/scripts/Interfaces/IDataOneIframe';
import { scWindowType } from '../../../Shared/scripts/Enums/scWindowType';
import { IDataOneWindowStorage } from '../../../Shared/scripts/Interfaces/IDataOneWindowStorage';
import { IDataOneDoc } from '../../../Shared/scripts/Interfaces/IDataOneDoc';
import { IDataPayloadSnapShot } from '../../../Shared/scripts/Interfaces/IDataPayloadSnapShot';
import { OneDesktopManager } from './OneDesktopManager';
import { OneCEAgent } from './OneCEAgent';
import { IDataDesktopState } from '../../../Shared/scripts/Interfaces/IDataDtState';
import { PromiseResult } from '../../../Shared/scripts/Classes/PromiseResult';
import { IAllAgents } from '../../../Shared/scripts/Interfaces/Agents/IAllAgents';

export class OneScWindowManager extends ContentManagerBase {
  OneDesktopMan: OneDesktopManager = null;
  OneCEAgent: OneCEAgent = null;

  constructor(hub: ContentHub, AllAgents: IAllAgents) {
    super(hub, AllAgents);
    this.AllAgents.Logger.FuncStart(OneScWindowManager.name);

    this.AllAgents.Logger.FuncEnd(OneScWindowManager.name);
  }

  Init() {

    let currPageType = this.ScUiMan().GetCurrentPageType();

    if (currPageType === scWindowType.Desktop) {
      this.OneDesktopMan = new OneDesktopManager(this.ContentHub, this.ScUiMan().TopLevelDoc(), this.AllAgents);
    } else if (currPageType === scWindowType.ContentEditor) {
      this.OneCEAgent = new OneCEAgent(this.ScUiMan().TopLevelDoc(), this.AllAgents.Logger, this.AllAgents.HelperAgent);
    }
  }

  SaveWindowState(snapShotSettings: IDataPayloadSnapShot) {
    return new Promise(async (resolve, reject) => {
      this.AllAgents.Logger.FuncStart(this.SaveWindowState.name);

      let promiseResult: PromiseResult = new PromiseResult(this.SaveWindowState.name, this.AllAgents.Logger);

      var snapShot: IDataOneWindowStorage = this.AllAgents.HelperAgent.FactoryHelp.CreateShellIDataOneWindowStorage(snapShotSettings.CurrentPageType, snapShotSettings.Flavor);

      if (snapShotSettings) {
        if (snapShotSettings.SnapShotNewNickname) {
          snapShot.NickName = snapShotSettings.SnapShotNewNickname;
        }
        snapShot.Flavor = snapShotSettings.Flavor;
      }

      if (snapShotSettings.CurrentPageType === scWindowType.ContentEditor) {
        this.AllAgents.Logger.MarkerA();
        var id = this.AllAgents.HelperAgent.GuidHelp.EmptyGuid();

        await this.OneCEAgent.GetStateCe(id)
          .then((state: IDataOneStorageCE) => {
            snapShot.AllCEAr.push(state);
            promiseResult.MarkSuccessful();
          }
          )
          .catch((err) => promiseResult.MarkFailed(err));
      }
      else if (snapShotSettings.CurrentPageType === scWindowType.Desktop) {
        this.AllAgents.Logger.MarkerB();

        await this.OneDesktopMan.GetStateDesktop()
          .then((states: IDataDesktopState) => {
            snapShot.AllCEAr = states.AllCeData;
            promiseResult.MarkSuccessful();
          })
          .catch((err) => promiseResult.MarkFailed(err));
      }
      else {
        this.AllAgents.Logger.Error(this.SaveWindowState.name, 'Invalid page location ' + snapShotSettings.CurrentPageType);
      }

      this.AllAgents.Logger.FuncEnd(this.SaveWindowState.name);

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
    this.AllAgents.Logger.FuncStart(this.PublishActiveCE.name);
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
    this.AllAgents.Logger.Log('docToPublish', this.AllAgents.Logger.IsNullOrUndefined(docToPublish));
    if (docToPublish) {
      var publishChain: PromiseChainQuickPublish = new PromiseChainQuickPublish(this.ContentHub, this.AllAgents);
      await publishChain.PublishCE(docToPublish);
    }
    this.AllAgents.Logger.FuncEnd(this.PublishActiveCE.name);
  }
  async RestoreWindowStateToTargetDoc(targetDoc: IDataOneDoc, dataToRestore: IDataOneWindowStorage) {
    this.AllAgents.Logger.FuncStart(this.RestoreWindowStateToTargetDoc.name);
    if (dataToRestore) {
      if (dataToRestore.WindowType === scWindowType.ContentEditor) {
        await this.OneCEAgent.RestoreCEStateAsync(dataToRestore.AllCEAr[0], targetDoc);
      }
      else if (dataToRestore.WindowType === scWindowType.Desktop) {
        await this.OneDesktopMan.RestoreDesktopState(targetDoc, dataToRestore);
      }
      else {
        this.AllAgents.Logger.Error(this.RestoreWindowStateToTargetDoc.name, 'No match found for snap shot');
      }
      this.AllAgents.Logger.FuncEnd(this.RestoreWindowStateToTargetDoc.name);
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