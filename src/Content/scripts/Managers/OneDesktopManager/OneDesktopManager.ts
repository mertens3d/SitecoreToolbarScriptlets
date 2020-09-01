import { IAllAgents } from "../../../../Shared/scripts/Interfaces/Agents/IAllAgents";
import { IDataDesktopState } from "../../../../Shared/scripts/Interfaces/IDataDtState";
import { IDataOneDoc } from "../../../../Shared/scripts/Interfaces/IDataOneDoc";
import { IDataOneStorageOneTreeState } from "../../../../Shared/scripts/Interfaces/IDataOneStorageOneTreeState";
import { IDataOneWindowStorage } from "../../../../Shared/scripts/Interfaces/IDataOneWindowStorage";
import { PromiseChainRestoreDesktop } from "../../Promises/PromiseChainRestoreDesktop";
import { ContentManagerBase } from "../../_first/_ContentManagerBase";
import { ContentHub } from "../ContentHub/ContentHub";
import { OneCEAgent } from "../OneCEAgent/OneCEAgent";
import { Guid } from "../../../../Shared/scripts/Helpers/Guid";

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

  async RestoreDesktopState(targetDoc: IDataOneDoc, dataToRestore: IDataOneWindowStorage): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.AllAgents.Logger.FuncStart(this.RestoreDesktopState.name);;

      if (this.MiscMan().NotNullOrUndefined([targetDoc, dataToRestore, dataToRestore.AllCEAr], this.RestoreDesktopState.name)) {
        for (var idx = 0; idx < dataToRestore.AllCEAr.length; idx++) {
          var desktopPromiser: PromiseChainRestoreDesktop = new PromiseChainRestoreDesktop(this.ContentHub, this.AllAgents);

          await desktopPromiser.RunOneChain(targetDoc, dataToRestore.AllCEAr[idx])
            .catch((err) => reject(err));
        }

        resolve();
      } else {
        reject(this.RestoreDesktopState.name + ' bad data');
      }

      this.AllAgents.Logger.FuncEnd(this.RestoreDesktopState.name);
    });
  }

  async RestoreDataToOneIframeWorker(oneTreeState: IDataOneStorageOneTreeState, targetCeAgent: OneCEAgent) {
    return new Promise<boolean>(async (resolve, reject) => {
      this.AllAgents.Logger.FuncStart(this.RestoreDataToOneIframeWorker.name, 'data not null: ' + (oneTreeState != null) + ' newFrame not null: ' + (targetCeAgent !== null));

      this.AllAgents.Logger.LogAsJsonPretty('oneTreeState', oneTreeState);

      if (oneTreeState && targetCeAgent) {
        await targetCeAgent.RestoreCEStateAsync(oneTreeState)
          .then(() => resolve(true))
          .catch((err) => {
            this.AllAgents.Logger.LogAsJsonPretty('oneTreeState', oneTreeState);
            this.AllAgents.Logger.ErrorAndThrow(this.RestoreDataToOneIframeWorker.name, 'bad data');
            reject((this.RestoreDataToOneIframeWorker.name + " " + err))
          })
      }
      this.AllAgents.Logger.FuncEnd(this.RestoreDataToOneIframeWorker.name);
    });
  }

  GetStateDesktop(): Promise<IDataDesktopState> {
    return new Promise(async (resolve, reject) => {
      this.AllAgents.Logger.FuncStart(this.GetStateDesktop.name);
      this.AllAgents.Logger.LogAsJsonPretty(this.GetStateDesktop.name, this.associatedDoc);

      var toReturnAllCeState: IDataDesktopState = this.AllAgents.HelperAgent.FactoryHelp.CreateNewDtDataShell();

      await this.AllAgents.HelperAgent.PromisesBasic.GetAllLiveIframeData(this.associatedDoc)
        .then((result) => toReturnAllCeState.livingIframeAr = result)
        .then(() => {
          if (toReturnAllCeState.livingIframeAr && toReturnAllCeState.livingIframeAr.length > 0) {
            for (var iframeIdx = 0; iframeIdx < toReturnAllCeState.livingIframeAr.length; iframeIdx++) {
              this.AllAgents.Logger.LogVal('iframeIdx: ', iframeIdx);
              var targetIframeObj = toReturnAllCeState.livingIframeAr[iframeIdx];
              var oneCeMan = new OneCEAgent(targetIframeObj.ContentDoc, this.AllAgents.Logger, this.AllAgents.HelperAgent);

              //todo - should this be checking for min value. There may be a different iframe that is not ce that is top

              oneCeMan.GetTreeState(Guid.NewRandomGuid())
                .then((oneCeState: IDataOneStorageOneTreeState) => {
                  toReturnAllCeState.AllCeData.push(oneCeState);

                  if (targetIframeObj.Zindex === 1) {
                    toReturnAllCeState.ActiveCeMan = oneCeMan;
                    toReturnAllCeState.ActiveCeState = oneCeState;
                  }
                })
                .catch((err) => this.AllAgents.Logger.ErrorAndThrow(this.GetStateDesktop.name, err));
            }
          }
        })
        .then(() => resolve(toReturnAllCeState))
        .catch((err) => reject(err));

      this.AllAgents.Logger.FuncEnd(this.GetStateDesktop.name);
    });
  }
}