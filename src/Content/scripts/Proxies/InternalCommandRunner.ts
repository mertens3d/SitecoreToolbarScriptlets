﻿import { IHindSiteScUiProxy } from "../../../Shared/scripts/Interfaces/Agents/IContentApi/IContentApi";
import { IContentAtticAgent } from "../../../Shared/scripts/Interfaces/Agents/IContentAtticAgent/IContentAtticAgent";
import { ILoggerAgent } from "../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IDataStateOfSitecoreWindow } from "../../../Shared/scripts/Interfaces/Data/States/IDataStateOfSitecoreWindow";
import { ICommandDependancies } from "../../../Shared/scripts/Interfaces/ICommandDependancies";
import { ICommandParams } from "../../../Shared/scripts/Interfaces/ICommandParams";
import { LoggableBase } from "../../../Shared/scripts/LoggableBase";
import { AutoSnapShotAgent } from "../Agents/AutoSnapShotAgent";
import { RecipeForceAutoSnapShot } from "../Recipes/RecipeForceAutoSnapShot";
import { RecipeInitFromQueryStr } from "../Recipes/RecipeInitFromQueryStr";
import { RecipeRemoveItemFromStorage } from "../Recipes/RecipeRemoveItemFromStorage";
import { RecipeSaveStateManual } from "../Recipes/RecipeSaveState";
import { RecipeToggleFavorite } from "../Recipes/RecipeToggleFavorite";
import { RecipeChangeNickName } from "../Recipes/RecipeChangeNickName";
import { MsgFlag } from "../../../Shared/scripts/Enums/1xxx-MessageFlag";
import { ScUrlAgent } from "../../../Shared/scripts/Agents/Agents/UrlAgent/ScUrlAgent";

export class InternalCommandRunner extends LoggableBase {
  Dependancies: ICommandDependancies;


  constructor(logger: ILoggerAgent, atticAgent: IContentAtticAgent, autoSnapShotAgent: AutoSnapShotAgent, scUiProxy: IHindSiteScUiProxy, scUrlAgent: ScUrlAgent) {
    super(logger);

    this.Dependancies = {
      AtticAgent: atticAgent,
      AutoSnapShotAgent: autoSnapShotAgent,
      ScUiProxy: scUiProxy,
      Logger: this.Logger,
      ScUrlAgent: scUrlAgent
    }
  }

  async SetNickName(commandParams: ICommandParams): Promise<void> {
    return new Promise(async (resolve, reject) => {
      //let recipe = new RecipeForceAutoSnapShot(this.Logger, commandParams, this.Dependancies);

      let recipe = new RecipeChangeNickName(this.Logger, commandParams, this.Dependancies);

      recipe.Execute()
        .then(() => resolve())
        .catch((err) => reject(this.DebugForceAutoSnapShot.name + ' | ' + err));
    });
  }

  Ping() {
    return new Promise(async (resolve, reject) => {
      resolve(MsgFlag.RespListeningAndReady);
    });
  }

  async DebugForceAutoSnapShot(commandParams: ICommandParams): Promise<void> {
    return new Promise(async (resolve, reject) => {
      let recipe = new RecipeForceAutoSnapShot(this.Logger, commandParams, this.Dependancies);

      recipe.Execute()
        .then(() => resolve())
        .catch((err) => reject(this.DebugForceAutoSnapShot.name + ' | ' + err));
    });
  }

  async SaveWindowState(commandParams: ICommandParams): Promise<void> {
    return new Promise(async (resolve, reject) => {
      let recipe = new RecipeSaveStateManual(this.Logger, commandParams, this.Dependancies);
      await recipe.Execute()
        .then(resolve)
        .catch((err) => reject(err));
    });
  }

  ToggleFavorite(commandParams: ICommandParams) {
    return new Promise(async (resolve, reject) => {
      await new RecipeToggleFavorite(this.Logger, commandParams, this.Dependancies).Execute()
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  }

  async InitFromQueryString(commandParams: ICommandParams): Promise<void> {
    try {
      let recipe = new RecipeInitFromQueryStr(this.Logger, commandParams, this.Dependancies);
      recipe.Execute()
    } catch (err) {
      this.Logger.ErrorAndThrow(this.InitFromQueryString.name, err);
    }
  }

  async RemoveSnapShot(commandParams: ICommandParams): Promise<void> {
    return new Promise(async (resolve, reject) => {
      let recipe = new RecipeRemoveItemFromStorage(this.Logger, commandParams, this.Dependancies);
      await recipe.Execute()
        .then(resolve)
        .catch((err) => reject(err));
    });
  }

  SetStateOfSitecoreWindow(commandParams: ICommandParams, dependancies: ICommandDependancies): Promise<void> {
    return new Promise(async (resolve, reject) => {
      dependancies.Logger.LogAsJsonPretty("IdOfSelect", commandParams.TargetSnapShotId);
      let dataOneWindowStorage: IDataStateOfSitecoreWindow = dependancies.AtticAgent.GetFromStorageBySnapShotId(commandParams.TargetSnapShotId);

      if (dataOneWindowStorage) {
        dependancies.ScUiProxy.SetStateOfSitecoreWindowAsync(commandParams.ApiPayload, dataOneWindowStorage)
          .then(() => resolve())
          .catch((err) => reject(this.SetStateOfSitecoreWindow.name + ' | ' + err));
      };
    });
  }
}