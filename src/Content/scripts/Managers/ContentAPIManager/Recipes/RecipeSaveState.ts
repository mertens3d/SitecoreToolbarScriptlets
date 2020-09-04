﻿import { ICommandRecipes } from "../../../../../Shared/scripts/Interfaces/ICommandRecipes";
import { RecipeBase } from "./RecipeBase";
import { ICommandHndlrDataForContent } from "../../../../../Shared/scripts/Interfaces/ICommandHndlrDataForContent";

export class RecipeSaveState extends RecipeBase implements ICommandRecipes {
  constructor(commandData: ICommandHndlrDataForContent) {
    super(commandData);
  }
  Execute(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      await this.CommandData.ContentHub.OneWindowMan.GetWindowState(this.CommandData.PayloadData.SnapShotSettings)
        .then((windowState) => this.CommandData.ContentHub.AtticMan.WriteToStorage(windowState))
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  }
}