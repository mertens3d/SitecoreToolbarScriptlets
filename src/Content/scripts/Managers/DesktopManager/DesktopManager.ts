import { ILoggerAgent } from "../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IDataDesktopState } from "../../../../Shared/scripts/Interfaces/Data/IDataDesktopState";
import { IDataOneDoc } from "../../../../Shared/scripts/Interfaces/Data/IDataOneDoc";
import { IDataOneStorageOneTreeState } from "../../../../Shared/scripts/Interfaces/Data/IDataOneStorageOneTreeState";
import { IDataOneWindowStorage } from "../../../../Shared/scripts/Interfaces/Data/IDataOneWindowStorage";
import { MiscAgent } from "../../Agents/MiscAgent/MiscAgent";
import { OneCEAgent } from "../../Agents/OneCEAgent/OneCEAgent";
import { RecipeRestoreDesktop } from "../../ContentApi/Recipes/RecipeRestoreDesktop/RecipeRestoreDesktop";
import { IframeHelper } from "../../Helpers/IframeHelper";
import { LoggableBase } from "../LoggableBase";

export class DesktopAgent extends LoggableBase {
  private MiscAgent: MiscAgent;
  private  AssociatedDoc: IDataOneDoc;

  constructor(logger: ILoggerAgent, miscAgent: MiscAgent, associatedDoc: IDataOneDoc) {
    super(logger);

    this.Logger.InstantiateStart(DesktopAgent.name);
    this.MiscAgent = miscAgent;
    this.AssociatedDoc = associatedDoc;
    this.Logger.InstantiateEnd(DesktopAgent.name);
  }

  async GetStateDesktop(): Promise<IDataDesktopState> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.GetStateDesktop.name);
      this.Logger.LogAsJsonPretty(this.GetStateDesktop.name, this.AssociatedDoc);

      var toReturnDesktopState: IDataDesktopState = this.CreateNewDtDataShell();
      let iframeHelper = new IframeHelper(this.Logger);

      await iframeHelper.GetHostedIframes(this.AssociatedDoc)
        .then((result) => toReturnDesktopState.HostedIframes = result)
        .then(() => {
          if (toReturnDesktopState.HostedIframes && toReturnDesktopState.HostedIframes.length > 0) {
            for (var iframeIdx = 0; iframeIdx < toReturnDesktopState.HostedIframes.length; iframeIdx++) {
              this.Logger.LogVal('iframeIdx: ', iframeIdx);

              var targetIframeObj = toReturnDesktopState.HostedIframes[iframeIdx];

              var oneCeAgent = new OneCEAgent(targetIframeObj.ContentDoc, this.Logger);

              //todo - should this be checking for min value. There may be a different iframe that is not ce that is top

              oneCeAgent.GetTreeState()
                .then((oneCeState: IDataOneStorageOneTreeState) => {
                  toReturnDesktopState.HostedContentEditors.push(oneCeState);

                  if (targetIframeObj.Zindex === 1) {
                    toReturnDesktopState.ActiveCEAgent = oneCeAgent;
                    toReturnDesktopState.ActiveCeState = oneCeState;
                  }
                })
                .catch((err) => this.Logger.ErrorAndThrow(this.GetStateDesktop.name, err));
            }
          }
        })
        .then(() => resolve(toReturnDesktopState))
        .catch((err) => reject(err));

      this.Logger.FuncEnd(this.GetStateDesktop.name);
    });
  }

  async RestoreDesktopState(targetDoc: IDataOneDoc, dataToRestore: IDataOneWindowStorage): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.RestoreDesktopState.name);;

      if (this.MiscAgent.NotNullOrUndefined([targetDoc, dataToRestore, dataToRestore.AllCEAr], this.RestoreDesktopState.name)) {
        for (var idx = 0; idx < dataToRestore.AllCEAr.length; idx++) {


          var recipe: RecipeRestoreDesktop = new RecipeRestoreDesktop(this.Logger, targetDoc, dataToRestore.AllCEAr[idx]);

          await recipe.Execute()

            .catch((err) => reject(err));
        }

        resolve();
      } else {
        reject(this.RestoreDesktopState.name + ' bad data');
      }

      this.Logger.FuncEnd(this.RestoreDesktopState.name);
    });
  }

  

  CreateNewDtDataShell(): IDataDesktopState {
    var toReturn: IDataDesktopState = {
      HostedContentEditors: [],
      HostedIframes: [],
      ActiveCEAgent: null,
      ActiveCeState: null
    }

    return toReturn;
  }
}