import { IHindeCore } from "../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { ICommandDependancies } from "../../../Shared/scripts/Interfaces/ICommandDependancies";
import { ICommandData } from "../../../Shared/scripts/Interfaces/ICommandParams";
import { ICommandRecipes } from "../../../Shared/scripts/Interfaces/ICommandRecipes";
import { _ContentRecipeBase } from "./_ContentRecipeBase";
import { IStateOfScUi } from "../../../Shared/scripts/Interfaces/StateOf/IDataStateOfSitecoreWindow";
import { IStateOfStorageSnapShots } from "../../../Shared/scripts/Interfaces/StateOf/IStateOfStorageSnapShots";

export class RecipeSetStateFromMostRecent extends _ContentRecipeBase implements ICommandRecipes {
  constructor(hindeCore: IHindeCore, commandData: ICommandData, dependancies: ICommandDependancies) {
    super(hindeCore, commandData, dependancies, RecipeSetStateFromMostRecent.name);
  }

  Execute(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(RecipeSetStateFromMostRecent.name);
      let dataStorage: IStateOfStorageSnapShots = this.Dependancies.AtticAgent.GetStateOfStorageSnapShots();

      if (dataStorage) {
        let mostRecentDate: Date = new Date(1970, 1, 1);

        let mostRecent: IStateOfScUi = null;
        dataStorage.SnapShots.forEach((snapShot) => {
          if (snapShot.Meta.TimeStamp > mostRecentDate) {
            mostRecentDate = snapShot.Meta.TimeStamp;
            mostRecent = snapShot;
          }
        });

        this.CommandParams.ToAPIPayload.SnapShotOfStateScUiApi = mostRecent;

        //await this.Dependancies.ScUiProxy.SetStateOfSitecoreWindowAsync(this.CommandParams.ToAPIPayload)
        //  .then(() => resolve())
        //  .catch((err: any) => reject(RecipeSetStateFromMostRecent.name + ' | ' + err));
      }
      this.Logger.FuncEnd(RecipeSetStateFromMostRecent.name);
    });
  }
}