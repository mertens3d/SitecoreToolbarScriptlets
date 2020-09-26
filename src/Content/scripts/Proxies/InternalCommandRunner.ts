import { IHindSiteScUiProxy } from "../../../Shared/scripts/Interfaces/Agents/IContentApi/IContentApi";
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

export class InternalCommandRunner extends LoggableBase {
  Dependancies: ICommandDependancies;

  constructor(logger: ILoggerAgent, atticAgent: IContentAtticAgent, autoSnapShotAgent: AutoSnapShotAgent, scUiProxy: IHindSiteScUiProxy) {
    super(logger);
    this.Dependancies = {
      AtticAgent: atticAgent,
      AutoSnapShotAgent: autoSnapShotAgent,
      ScUiProxy: scUiProxy
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

  InitFromQueryString() {
    let commandParams = null; //todo we need to build this like from ContentMessageBroker.BuildCommandPayloadForInternal
    let recipe = new RecipeInitFromQueryStr(this.Logger, commandParams, this.Dependancies);
  }

  async RemoveSnapShot(commandParams: ICommandParams): Promise<void> {
    return new Promise(async (resolve, reject) => {
      let recipe = new RecipeRemoveItemFromStorage(this.Logger, commandParams, this.Dependancies);
      await recipe.Execute()
        .then(resolve)
        .catch((err) => reject(err));
    });
  }

  SetStateOfSitecoreWindow(internalCommandPayload: ICommandParams): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.Logger.LogVal("IdOfSelect", internalCommandPayload.TargetSnapShotId);
      let dataOneWindowStorage: IDataStateOfSitecoreWindow = this.Dependancies.AtticAgent.GetFromStorageBySnapShotId(internalCommandPayload.TargetSnapShotId);

      if (dataOneWindowStorage) {
        this.Dependancies.ScUiProxy.SetStateOfSitecoreWindowAsync(internalCommandPayload.ApiPayload, dataOneWindowStorage)
          .then(() => resolve())
          .catch((err) => reject(this.SetStateOfSitecoreWindow.name + ' | ' + err));
      };
    });
  }
}