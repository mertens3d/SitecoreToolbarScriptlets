import { PayloadDataFromPopUp } from "../../../../Shared/scripts/Classes/PayloadDataReqPopUp";
import { MsgFlag } from "../../../../Shared/scripts/Enums/1xxx-MessageFlag";
import { IAllAgents } from "../../../../Shared/scripts/Interfaces/Agents/IAllAgents";
import { ICommandHndlrDataForContent } from "../../../../Shared/scripts/Interfaces/ICommandHndlrDataForContent";
import { IContentState } from "../../../../Shared/scripts/Interfaces/IContentState/IContentState";
import { ContentManagerBase } from "../../_first/_ContentManagerBase";
import { ContentHub } from "../ContentHub/ContentHub";
import { RecipeChangeNickName } from "./Recipes/RecipeChangeNickName";
import { RecipePublishActiveCe } from "./Recipes/RecipePublishActiveCe";
import { RecipeRemoveItemFromStorage } from "./Recipes/RecipeRemoveItemFromStorage";
import { RecipeSaveState } from "./Recipes/RecipeSaveState";
import { RecipeToggleFavorite } from "./Recipes/RecipeToggleFavorite";

export class ContentAPIManager extends ContentManagerBase {

  constructor(hub: ContentHub, AllAgents: IAllAgents) {
    super(hub, AllAgents);
    
    this.AllAgents.Logger.FuncStart(ContentAPIManager.name);



    this.AllAgents.Logger.FuncEnd(ContentAPIManager.name);
  }

  async UpdateNickname(commandData: ICommandHndlrDataForContent): Promise<void>{
    return new Promise(async (resolve, reject) => {
      await new RecipeChangeNickName(commandData, commandData.AtticMan).Execute()
        .then(() => resolve())
        .catch((err) => reject(err));
    })
  }

  GetContentState(): Promise<IContentState> {
    return new Promise(async (resolve, reject) => {
      await this.ContentFactory().PopulateContentState()
        .then((result: IContentState) => resolve(result))
        .catch((err) => reject(err))
    });
  }

  Notify(payloadData: PayloadDataFromPopUp): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.AllAgents.ToastAgent.PopUpToastNotification(this.ScUiMan().TopLevelDoc(), payloadData.ScreenMessage);
    });
  }

  AddCETab(commandData: ICommandHndlrDataForContent): Promise<void> {
    return new Promise(async (resolve, reject) => {
      await this.AllAgents.HelperAgent.PromisesRecipes.FromDesktopOpenNewCEIframe(commandData.TopLevelDoc)
        .then(() => {
          this.AllAgents.ToastAgent.PopUpToastNotification(commandData.TopLevelDoc, "Success");
          resolve();
        })

        .catch((err) => reject(err));
    });
  }

  PublischActiveCE(commandData: ICommandHndlrDataForContent): Promise<void> {
    return new Promise(async (resolve, reject) => {
      await new RecipePublishActiveCe(commandData).Execute()
        .then(() => resolve)
        .catch((err) => reject(err));
    });
  }

  async RemoveSnapShot(commandData: ICommandHndlrDataForContent): Promise<void> {
    return new Promise(async (resolve, reject) => {
      let recipe = new RecipeRemoveItemFromStorage(commandData, commandData.AtticMan);
      await recipe.Execute()
        .then(resolve)
        .catch((err) => reject(err));
    });
  }

  async SaveWindowState(commandData: ICommandHndlrDataForContent): Promise<void> {
    return new Promise(async (resolve, reject) => {
      let recipe = new RecipeSaveState(commandData, commandData.AtticMan);
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

  RestoreSnapshop(commandData: ICommandHndlrDataForContent): Promise<void>{
    return new Promise(async (resolve, reject) => {
      await commandData.ContentHub.ContentMessageMan.__restoreClick(commandData.PayloadData)
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
    this.ScUiMan().AdminB(this.ScUiMan().TopLevelDoc(), null);
  }
}