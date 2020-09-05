import { ICommandRecipes } from "../../../../../../Shared/scripts/Interfaces/ICommandRecipes";
import { IDataOneDoc } from "../../../../../../Shared/scripts/Interfaces/IDataOneDoc";
import { RecipeBase } from "../RecipeBase";

export class RecipeRestoreState extends RecipeBase implements ICommandRecipes {
  async Execute(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.Execute.name);
      try {
        if (this.CommandData) {
          if (this.CommandData.TargetSnapShotId) {
            this.Logger.LogVal("IdOfSelect", this.CommandData.TargetSnapShotId);
            var dataOneWindowStorage;

            await this.CommandData.AtticAgent.GetFromStorageById(this.CommandData.TargetSnapShotId)
              .then((result) => dataOneWindowStorage = result)
              .catch((err) => reject(err));

            if (dataOneWindowStorage) {
              var self = this;
              var targetDoc: IDataOneDoc = this.CommandData.ScWinMan.TopLevelDoc();

              if (targetDoc) {
                await this.CommandData.ScWinMan.RestoreStateToTargetDoc(targetDoc, dataOneWindowStorage)
                  .then(() => resolve())
                  .catch((err) => reject(err))
              }
              else {
                reject(this.Execute.name + ' no target window');
              }
            }
          } else {
            reject(this.Execute.name + ' No IdOfSelect');
          }
        } else {
          reject(this.Execute.name + ' No data')
        }
      } catch (err) {
        reject(err)
      }

      this.Logger.FuncEnd(this.Execute.name);
    });
  }
}