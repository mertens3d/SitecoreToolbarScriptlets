import { PayloadDataFromPopUp } from "../../../../Shared/scripts/Classes/PayloadDataReqPopUp";
import { MsgFlag } from "../../../../Shared/scripts/Enums/1xxx-MessageFlag";
import { ILoggerAgent } from "../../../../Shared/scripts/Interfaces/Agents/ILoggerBase";
import { ICommandHndlrDataForContent } from "../../../../Shared/scripts/Interfaces/ICommandHndlrDataForContent";
import { IContentState } from "../../../../Shared/scripts/Interfaces/IContentState/IContentState";
import { RecipeChangeNickName } from "./Recipes/RecipeChangeNickName";
import { RecipePublishActiveCe } from "./Recipes/RecipePublishActiveCe";
import { RecipeRemoveItemFromStorage } from "./Recipes/RecipeRemoveItemFromStorage";
import { RecipeSaveState } from "./Recipes/RecipeSaveState/RecipeSaveState";
import { RecipeToggleFavorite } from "./Recipes/RecipeToggleFavorite";
import { ContentStateManager } from "../../Classes/ContentStateManager/ContentStateManager";
import { IToastAgent } from "../../../../Shared/scripts/Interfaces/Agents/IToastAgent";
import { SitecoreUiManager } from "../SitecoreUiManager/SitecoreUiManager";
import { PromisesRecipes } from "../../../../Shared/scripts/Classes/PromisesRecipes";
import { RecipeBasics } from "../../../../Shared/scripts/Classes/PromiseGeneric";
import { RecipeRestore } from "./Recipes/RecipeRestore/RecipeRestore";

export class ContentAPIManager {
  private Logger: ILoggerAgent;
  private ContentFactory: ContentStateManager;
  private ToastAgent: IToastAgent;
  private ScUiMan: SitecoreUiManager;
  private PromisesRecipes: PromisesRecipes;
  private RecipeBasics: RecipeBasics;

  constructor(logger: ILoggerAgent, contentFactory: ContentStateManager, toastAgent: IToastAgent, scUiMan: SitecoreUiManager, promisesRecipes: PromisesRecipes, recipeBasics: RecipeBasics) {
    this.Logger = logger;

    this.Logger.FuncStart(ContentAPIManager.name);

    this.ContentFactory = contentFactory;
    this.ToastAgent = toastAgent;
    this.ScUiMan = scUiMan;
    this.PromisesRecipes = promisesRecipes;
    this.RecipeBasics = recipeBasics;
    this.Logger.FuncEnd(ContentAPIManager.name);
  }

  async UpdateNickname(commandData: ICommandHndlrDataForContent): Promise<void> {
    return new Promise(async (resolve, reject) => {
      await new RecipeChangeNickName(commandData, commandData.AtticMan).Execute()
        .then(() => resolve())
        .catch((err) => reject(err));
    })
  }

  GetContentState(): Promise<IContentState> {
    return new Promise(async (resolve, reject) => {
      await this.ContentFactory.PopulateContentState()
        .then((result: IContentState) => resolve(result))
        .catch((err) => reject(err))
    });
  }

  Notify(payloadData: PayloadDataFromPopUp): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.ToastAgent.PopUpToastNotification(this.ScUiMan.TopLevelDoc(), payloadData.ScreenMessage);
    });
  }

  AddCETab(commandData: ICommandHndlrDataForContent): Promise<void> {
    return new Promise(async (resolve, reject) => {
      await this.PromisesRecipes.FromDesktopOpenNewCEIframe(commandData.TopLevelDoc, this.RecipeBasics)
        .then(() => {
          this.ToastAgent.PopUpToastNotification(commandData.TopLevelDoc, "Success");
          resolve();
        })

        .catch((err) => reject(err));
    });
  }

  PublischActiveCE(commandData: ICommandHndlrDataForContent): Promise<void> {
    return new Promise(async (resolve, reject) => {
      await new RecipePublishActiveCe(commandData, commandData.FactoryHelp).Execute()
        .then(() => resolve)
        .catch((err) => reject(err));
    });
  }

  async RemoveSnapShot(commandData: ICommandHndlrDataForContent): Promise<void> {
    return new Promise(async (resolve, reject) => {
      let recipe = new RecipeRemoveItemFromStorage(commandData, commandData.AtticMan, commandData.ToastAgent);
      await recipe.Execute()
        .then(resolve)
        .catch((err) => reject(err));
    });
  }

  async SaveWindowState(commandData: ICommandHndlrDataForContent): Promise<void> {
    return new Promise(async (resolve, reject) => {
      let recipe = new RecipeSaveState(commandData);
      await recipe.Execute()
        .then(resolve)
        .catch((err) => reject(err));
    });
  }

  async ToggleCompactCss(payloadData: PayloadDataFromPopUp) {
    return new Promise(async (resolve, reject) => {
      await this.ToggleCompactCss(payloadData)
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  }

  RestoreSnapshop(commandData: ICommandHndlrDataForContent): Promise<void> {
    return new Promise(async (resolve, reject) => {
      await new RecipeRestore(commandData).Execute()// .ContentHub.ContentMessageMan.__restoreClick(commandData.PayloadData)
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  }

  OpenContentEditor() {
    throw new Error("Method not implemented.");
  }

  MarkFavorite(commandData: ICommandHndlrDataForContent) {
    return new Promise(async (resolve, reject) => {
      await new RecipeToggleFavorite(commandData, commandData.AtticMan).Execute()
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  }

  Ping(payloadData: PayloadDataFromPopUp) {
    return new Promise(async (resolve, reject) => {
      //if (this. ReadyForMessages) {
      resolve(MsgFlag.RespListeningAndReady);
      //} else {
      //  reject(MsgFlag.RespNotReady)
      //}
    });
  }
  AdminB() {
    this.ScUiMan.AdminB(this.ScUiMan.TopLevelDoc(), null);
  }
}