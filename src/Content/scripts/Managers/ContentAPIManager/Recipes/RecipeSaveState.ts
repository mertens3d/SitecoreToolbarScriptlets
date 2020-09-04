import { ICommandRecipes } from "../../../../../Shared/scripts/Interfaces/ICommandRecipes";
import { RecipeBase } from "./RecipeBase";
import { ICommandHndlrDataForContent } from "../../../../../Shared/scripts/Interfaces/ICommandHndlrDataForContent";
import { ContentAtticManager } from "../../ContentAtticManager/ContentAtticManager";

export class RecipeSaveState extends RecipeBase implements ICommandRecipes {
 private AtticMan: ContentAtticManager;

  constructor(commandData: ICommandHndlrDataForContent, atticMan: ContentAtticManager) {
    
    super(commandData);

    this.AtticMan = atticMan;
  }
  Execute(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      await this.CommandData.ContentHub.OneWindowMan.GetWindowState(this.CommandData.PayloadData.SnapShotSettings)
        .then((windowState) => this.AtticMan.WriteToStorage(windowState))
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  }
}