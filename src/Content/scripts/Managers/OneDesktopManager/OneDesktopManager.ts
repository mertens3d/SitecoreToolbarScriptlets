import { RecipeBasics } from "../../../../Shared/scripts/Classes/RecipeBasics";
import { Guid } from "../../../../Shared/scripts/Helpers/Guid";
import { ILoggerAgent } from "../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IDataDesktopState } from "../../../../Shared/scripts/Interfaces/IDataDtState";
import { IDataOneDoc } from "../../../../Shared/scripts/Interfaces/IDataOneDoc";
import { IDataOneStorageOneTreeState } from "../../../../Shared/scripts/Interfaces/IDataOneStorageOneTreeState";
import { IDataOneWindowStorage } from "../../../../Shared/scripts/Interfaces/IDataOneWindowStorage";
import { LoggableBase } from "../LoggableBase";
import { MiscManager } from "../MiscManager/MiscManager";
import { OneCEAgent } from "../../Agents/OneCEAgent/OneCEAgent";
import { ScWindowManager } from "../ScWindowManager/ScWindowManager";
import { PromiseChainRestoreDesktop } from "../../PromiseChainRestoreDesktop/PromiseChainRestoreDesktop";

export class OneDesktopManager extends LoggableBase {
  private associatedDoc: IDataOneDoc;
  private RecipeBasics: RecipeBasics;
  private MiscMan: MiscManager;
  private OneScWinMan: ScWindowManager;

  constructor(logger: ILoggerAgent, associatedDoc: IDataOneDoc, recipeBasics: RecipeBasics, miscMan: MiscManager, oneScWinMan: ScWindowManager) {
    super(logger);

    this.Logger.InstantiateStart(OneDesktopManager.name);
    this.associatedDoc = associatedDoc;
    this.RecipeBasics = recipeBasics;
    this.MiscMan = miscMan;
    this.OneScWinMan = oneScWinMan;
    this.Logger.InstantiateEnd(OneDesktopManager.name);
  }

  async RestoreDesktopState(targetDoc: IDataOneDoc, dataToRestore: IDataOneWindowStorage): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.RestoreDesktopState.name);;

      if (this.MiscMan.NotNullOrUndefined([targetDoc, dataToRestore, dataToRestore.AllCEAr], this.RestoreDesktopState.name)) {
        for (var idx = 0; idx < dataToRestore.AllCEAr.length; idx++) {
          var desktopPromiser: PromiseChainRestoreDesktop = new PromiseChainRestoreDesktop(this.Logger, this.MiscMan, this.RecipeBasics, this.OneScWinMan);

          await desktopPromiser.RunOneChain(targetDoc, dataToRestore.AllCEAr[idx], this.RecipeBasics)

            .catch((err) => reject(err));
        }

        resolve();
      } else {
        reject(this.RestoreDesktopState.name + ' bad data');
      }

      this.Logger.FuncEnd(this.RestoreDesktopState.name);
    });
  }

  async RestoreDataToOneIframeWorker(oneTreeState: IDataOneStorageOneTreeState, targetCeAgent: OneCEAgent): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.RestoreDataToOneIframeWorker.name);

      if (oneTreeState && targetCeAgent) {
        await targetCeAgent.RestoreCEStateAsync(oneTreeState)
          .then(() => resolve())
          .catch((err) => {
            this.Logger.LogAsJsonPretty('oneTreeState', oneTreeState);
            this.Logger.ErrorAndThrow(this.RestoreDataToOneIframeWorker.name, 'bad data');
            reject((this.RestoreDataToOneIframeWorker.name + " " + err))
          })
      }
      this.Logger.FuncEnd(this.RestoreDataToOneIframeWorker.name);
    });
  }
  private CreateNewDtDataShell(): IDataDesktopState {
    var toReturn: IDataDesktopState = {
      AllCeData: [],
      livingIframeAr: [],
      ActiveCeMan: null,
      ActiveCeState: null
    }

    return toReturn;
  }
  GetStateDesktop(): Promise<IDataDesktopState> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.GetStateDesktop.name);
      this.Logger.LogAsJsonPretty(this.GetStateDesktop.name, this.associatedDoc);

      var toReturnAllCeState: IDataDesktopState = this.CreateNewDtDataShell();

      await this.RecipeBasics.GetAllLiveIframeData(this.associatedDoc)
        .then((result) => toReturnAllCeState.livingIframeAr = result)
        .then(() => {
          if (toReturnAllCeState.livingIframeAr && toReturnAllCeState.livingIframeAr.length > 0) {
            for (var iframeIdx = 0; iframeIdx < toReturnAllCeState.livingIframeAr.length; iframeIdx++) {
              this.Logger.LogVal('iframeIdx: ', iframeIdx);
              var targetIframeObj = toReturnAllCeState.livingIframeAr[iframeIdx];
              var oneCeMan = new OneCEAgent(targetIframeObj.ContentDoc, this.Logger);

              //todo - should this be checking for min value. There may be a different iframe that is not ce that is top

              oneCeMan.GetTreeState(Guid.NewRandomGuid())
                .then((oneCeState: IDataOneStorageOneTreeState) => {
                  toReturnAllCeState.AllCeData.push(oneCeState);

                  if (targetIframeObj.Zindex === 1) {
                    toReturnAllCeState.ActiveCeMan = oneCeMan;
                    toReturnAllCeState.ActiveCeState = oneCeState;
                  }
                })
                .catch((err) => this.Logger.ErrorAndThrow(this.GetStateDesktop.name, err));
            }
          }
        })
        .then(() => resolve(toReturnAllCeState))
        .catch((err) => reject(err));

      this.Logger.FuncEnd(this.GetStateDesktop.name);
    });
  }
}