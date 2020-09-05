import { ICommandRecipes } from "../../../../../../Shared/scripts/Interfaces/ICommandRecipes";
import { IDataOneDoc } from "../../../../../../Shared/scripts/Interfaces/IDataOneDoc";
import { RecipeBase } from "../RecipeBase";

export class RecipeRestore extends RecipeBase implements ICommandRecipes {
  async Execute(): Promise<void> {
    await this.__restoreClick()
    }
  __restoreClick(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.__restoreClick.name);
      try {
        if (this.CommandData) {
          if (this.CommandData.PayloadData.IdOfSelect) {
            this.Logger.LogVal("IdOfSelect", this.CommandData.PayloadData.IdOfSelect);
            var dataOneWindowStorage;

            await this.CommandData.AtticMan.GetFromStorageById(this.CommandData.PayloadData.IdOfSelect)
              .then((result) => dataOneWindowStorage = result)
              .catch((err) => reject(err));

            if (dataOneWindowStorage) {
              var self = this;
              var targetDoc: IDataOneDoc = this.CommandData.ScUiMan.TopLevelDoc();

              if (targetDoc) {
                await this.CommandData.ScWinMan.RestoreStateToTargetDoc(targetDoc, dataOneWindowStorage)
                  .then(() => resolve())
                  .catch((err) => reject(err))
              }
              else {
                reject(this.__restoreClick.name + ' no target window');
              }
            }
          } else {
            reject(this.__restoreClick.name + ' No IdOfSelect');
          }
        } else {
          reject(this.__restoreClick.name + ' No data')
        }
      } catch (err) {
        reject(err)
      }

      this.Logger.FuncEnd(this.__restoreClick.name);
    });
  }
}
