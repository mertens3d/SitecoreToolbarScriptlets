﻿import { PromiseResult } from '../../../Shared/scripts/Classes/PromiseResult';
import { scWindowType } from '../../../Shared/scripts/Enums/scWindowType';
import { IAllAgents } from '../../../Shared/scripts/Interfaces/Agents/IAllAgents';
import { IDataDesktopState } from '../../../Shared/scripts/Interfaces/IDataDtState';
import { IDataOneDoc } from '../../../Shared/scripts/Interfaces/IDataOneDoc';
import { IDataOneIframe } from '../../../Shared/scripts/Interfaces/IDataOneIframe';
import { IDataOneStorageOneTreeState } from '../../../Shared/scripts/Interfaces/IDataOneStorageOneTreeState';
import { IDataOneWindowStorage } from '../../../Shared/scripts/Interfaces/IDataOneWindowStorage';
import { IDataPayloadSnapShot } from '../../../Shared/scripts/Interfaces/IDataPayloadSnapShot';
import { ContentManagerBase } from '../_first/_ContentManagerBase';
import { ContentHub } from './ContentHub/ContentHub';
import { OneCEAgent } from './OneCEAgent/OneCEAgent';
import { OneDesktopManager } from './OneDesktopManager/OneDesktopManager';
import { Guid } from '../../../Shared/scripts/Helpers/Guid';

export class OneScWindowManager extends ContentManagerBase {
  OneDesktopMan: OneDesktopManager = null;
  OneCEAgent: OneCEAgent = null;

  constructor(hub: ContentHub, AllAgents: IAllAgents) {
    super(hub, AllAgents);
    this.AllAgents.Logger.FuncStart(OneScWindowManager.name);

    this.AllAgents.Logger.FuncEnd(OneScWindowManager.name);
  }

  InitOneScWindowManager() {
    let currPageType = this.ScUiMan().GetCurrentPageType();

    if (currPageType === scWindowType.Desktop) {
      this.OneDesktopMan = new OneDesktopManager(this.ContentHub, this.ScUiMan().TopLevelDoc(), this.AllAgents);
    } else if (currPageType === scWindowType.ContentEditor) {
      this.OneCEAgent = new OneCEAgent(this.ScUiMan().TopLevelDoc(), this.AllAgents.Logger, this.AllAgents.HelperAgent);
    }
  }

  SaveWindowState(snapShotSettings: IDataPayloadSnapShot): Promise<IDataOneWindowStorage> {
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
        var id = Guid.GetEmptyGuid();

        await this.OneCEAgent.GetTreeState(id)
          .then((state: IDataOneStorageOneTreeState) => {
            snapShot.AllCEAr.push(state);
            promiseResult.MarkSuccessful();
          })
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
        this.AllAgents.Logger.ErrorAndThrow(this.SaveWindowState.name, 'Invalid page location ' + snapShotSettings.CurrentPageType);
      }

      this.AllAgents.Logger.FuncEnd(this.SaveWindowState.name);

      if (promiseResult.WasSuccessful()) {
        resolve(snapShot);
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
  private async __getTopLevelIframe(targetDoc: IDataOneDoc): Promise<IDataOneIframe> {
    return new Promise(async (resolve, reject) => {
      var toReturn: IDataOneIframe = null;

      var allIframe: IDataOneIframe[];

      await this.AllAgents.HelperAgent.PromisesBasic.GetAllLiveIframeData(targetDoc)
        .then((result) => {
          allIframe = result

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
        })
        .then(() => resolve(toReturn))
        .catch((err) => this.AllAgents.Logger.ErrorAndThrow(this.__getTopLevelIframe.name, err));
    })
  }

  async SetCompactCss(targetDoc: IDataOneDoc) {
    //if (this.ScUiMan().GetCurrentPageType() === scWindowType.ContentEditor) {
    await this.OneCEAgent.SetCompactCss();
    //}
  }

  async RestoreStateToTargetDoc(targetDoc: IDataOneDoc, dataToRestore: IDataOneWindowStorage): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.AllAgents.Logger.FuncStart(this.RestoreStateToTargetDoc.name);

      if (dataToRestore) {
        if (dataToRestore.WindowType === scWindowType.ContentEditor || dataToRestore.WindowType === scWindowType.Desktop) {
          if (dataToRestore.WindowType === scWindowType.ContentEditor) {
            await this.OneCEAgent.RestoreCEStateAsync(dataToRestore.AllCEAr[0])
              .then(() => this.AllAgents.ToastAgent.Notify(targetDoc, 'Restore Completed'));
          } else {
            await this.OneDesktopMan.RestoreDesktopState(targetDoc, dataToRestore)
              .then(() => this.AllAgents.ToastAgent.Notify(targetDoc, 'Restore Completed'));
          }
        }
        else {
          this.AllAgents.Logger.ErrorAndThrow(this.RestoreStateToTargetDoc.name, 'Data not restored. Not in Desktop or Content Editor');
        }
      }
      else {
        this.AllAgents.ToastAgent.Notify(targetDoc, "No data found to restore");
      }

      resolve();

      //reject(this.RestoreStateToTargetDoc.name +  " something went wrong");
      this.AllAgents.Logger.FuncEnd(this.RestoreStateToTargetDoc.name);
    });
  }
}