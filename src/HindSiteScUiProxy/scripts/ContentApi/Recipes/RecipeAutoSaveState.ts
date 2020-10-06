import { SnapShotFlavor } from "../../../../Shared/scripts/Enums/SnapShotFlavor";
import { IHindSiteScUiAPI } from "../../../../Shared/scripts/Interfaces/Agents/IContentApi/IContentApi";
import { IContentAtticAgent } from "../../../../Shared/scripts/Interfaces/Agents/IContentAtticAgent/IContentAtticAgent";
import { IHindeCore } from "../../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { IStateOfScUi } from "../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfSitecoreWindow";
import { _HindeCoreBase } from "../../../../Shared/scripts/LoggableBase";

export class RecipeAutoSaveState extends _HindeCoreBase {
  private ScUiProxy: IHindSiteScUiAPI;
  private AtticAgent: IContentAtticAgent;

  constructor(hindeCore: IHindeCore, scUiProxy: IHindSiteScUiAPI, atticAgent: IContentAtticAgent) {
    super(hindeCore);
    this.ScUiProxy = scUiProxy;
    this.AtticAgent = atticAgent;
  }

  async ExecuteAsync(windowStatePrior: IStateOfScUi): Promise<IStateOfScUi> {
    return new Promise(async (resolve, reject) => {
      this.ScUiProxy.GetStateOfScUiProxyWindow(SnapShotFlavor.Autosave)
        .then((windowStateNew: IStateOfScUi) => {
          let hasCorrectData = windowStateNew && windowStateNew.Meta && windowStateNew.Meta.Hash
            && windowStatePrior && windowStatePrior.Meta && windowStatePrior.Meta.Hash;

          if (!hasCorrectData || (windowStateNew.Meta.Hash !== windowStatePrior.Meta.Hash)) {
              this.Logger.Log('states are different, save snap shot');

              this.AtticAgent.WriteStateOfSitecoreToStorage(windowStateNew);
            } else {
              this.Logger.Log('states are same, no save');
            }
          resolve(windowStateNew);
        })
        .catch((err) => reject(err));
    });
  }
}