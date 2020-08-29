﻿import { ICommandHndlrDataForContent } from "../../../../../Shared/scripts/Interfaces/ICommandHndlrDataForContent";
import { ICommandRecipes } from "../../../../../Shared/scripts/Interfaces/ICommandRecipes";
import { RecipeBase } from "./RecipeBase";

export class RecipeRemoveItemFromStorage extends RecipeBase implements ICommandRecipes {
  constructor(commandData: ICommandHndlrDataForContent) {
    super(commandData)
  }
  Execute(): Promise<void>{
    return new Promise(async (resolve, reject) => {

      await this.CommandData.ContentHub.AtticMan.RemoveOneFromStorage(this.CommandData.PayloadData.IdOfSelect)
        .then(() => {
          this.CommandData.ContentMessageBroker.AllAgents.ToastAgent.Notify(this.CommandData.ContentHub.SitecoreUiMan.TopLevelDoc(), "Success");
          resolve();
        }
        )
        .catch((err) => reject(err));

    });
  }
}