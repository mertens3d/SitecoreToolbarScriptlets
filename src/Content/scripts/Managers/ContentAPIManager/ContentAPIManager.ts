import { PayloadDataFromPopUp } from "../../../../Shared/scripts/Classes/PayloadDataReqPopUp";
import { MsgFlag } from "../../../../Shared/scripts/Enums/1xxx-MessageFlag";
import { FactoryHelper } from "../../../../Shared/scripts/Helpers/FactoryHelper";
import { IHindSiteScWindowApi } from "../../../../Shared/scripts/Interfaces/Agents/IContentApi/IContentApi";
import { ILoggerAgent } from "../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IScWindowManager } from "../../../../Shared/scripts/Interfaces/Agents/IScWindowManager/IScWindowManager";
import { IToastAgent } from "../../../../Shared/scripts/Interfaces/Agents/IToastAgent";
import { IDataContentReplyReceivedEvent_Payload } from "../../Proxies/Desktop/DesktopProxy/Events/ContentReplyReceivedEvent/IDataContentReplyReceivedEvent_Payload";
import { ICommandHndlrDataForContent } from "../../../../Shared/scripts/Interfaces/ICommandHndlrDataForContent";
import { RecipeAddNewContentEditorToDesktop } from "../../ContentApi/Recipes/RecipeAddContentEditorToDesktop/RecipeAddContentEditorToDesktop";
import { RecipePublishActiveCe } from "../../ContentApi/Recipes/RecipePublishActiveCe/RecipePublishActiveCe";
import { RecipeRemoveItemFromStorage } from "../../ContentApi/Recipes/RecipeRemoveItemFromStorage/RecipeRemoveItemFromStorage";
import { RecipeSetStateOfSitecoreWindow } from "../../ContentApi/Recipes/RecipeRestore/RecipeRestore";
import { RecipeSaveState } from "../../ContentApi/Recipes/RecipeSaveState/RecipeSaveState";
import { RecipeToggleFavorite } from "../../ContentApi/Recipes/RecipeToggleFavorite/RecipeToggleFavorite";
import { LoggableBase } from "../LoggableBase";
import { ScUiManager } from "../SitecoreUiManager/SitecoreUiManager";
import { ISettingsAgent } from "../../../../Shared/scripts/Interfaces/Agents/ISettingsAgent";
import { IFactoryHelper } from "../../../../Shared/scripts/Interfaces/IFactoryHelper";
import { DefaultContentReplyPayload } from "../../../../Shared/scripts/Classes/Defaults/DefaultScWindowState";
import { IDataStateOfSitecoreWindow } from "../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfSitecoreWindow";
import { IDataStateOfStorageSnapShots } from "../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfStorageSnapShots";
import { IContentAtticAgent } from "../../../../Shared/scripts/Interfaces/Agents/IContentAtticAgent/IContentAtticAgent";

export class ContentAPIManager extends LoggableBase implements IHindSiteScWindowApi {
  private AtticAgent: IContentAtticAgent;
  private FactoryHelp: IFactoryHelper;
  private ScUiMan: ScUiManager;
  private ScWinMan: IScWindowManager;
  private SettingsAgent: ISettingsAgent;
  private ToastAgent: IToastAgent;

  constructor(logger: ILoggerAgent, toastAgent: IToastAgent, scUiMan: ScUiManager, scWinMan: IScWindowManager, settingsAgent: ISettingsAgent, atticAgent: IContentAtticAgent) {
    super(logger);

    this.Logger.FuncStart(ContentAPIManager.name);

    this.ToastAgent = toastAgent;
    this.ScUiMan = scUiMan;
    this.ScWinMan = scWinMan;
    this.SettingsAgent = settingsAgent;
    this.FactoryHelp = new FactoryHelper(this.Logger);
    this.AtticAgent = atticAgent;
    this.AtticAgent.CleanOutOldAutoSavedData();
    this.Logger.FuncEnd(ContentAPIManager.name);
  }

  //async UpdateNickname(commandData: ICommandHndlrDataForContent): Promise<void> {
  //  return new Promise(async (resolve, reject) => {
  //    await new RecipeChangeNickName(commandData).Execute()
  //      .then(() => resolve())
  //      .catch((err) => reject(err));
  //  })
  //}

  GetStateOfContent(): Promise<IDataContentReplyReceivedEvent_Payload> {
    return new Promise(async (resolve, reject) => {
      let reply: IDataContentReplyReceivedEvent_Payload = new DefaultContentReplyPayload();

      await this.ScWinMan.GetStateOfSitecoreWindow()
        .then((result: IDataStateOfSitecoreWindow) => reply.StateOfSitecoreWindow = result)

        .then(() => this.AtticAgent.GetStateOfStorageSnapShots())
        .then((result: IDataStateOfStorageSnapShots) => reply.StateOfStorageSnapShots = result)
        .then(() => reply.ErrorStack = this.Logger.ErrorStack)
        .then(() => resolve(reply))
        .catch((err) => reject(err))
    });
  }

  Notify(payloadData: PayloadDataFromPopUp): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.ToastAgent.PopUpToastNotification(this.ScWinMan.GetTopLevelDoc(), payloadData.ScreenMessage);
    });
  }

  AddCETab(commandData: ICommandHndlrDataForContent): Promise<void> {
    return new Promise(async (resolve, reject) => {
      await new RecipeAddNewContentEditorToDesktop(commandData.Logger, commandData.TargetDoc, commandData.SettingsAgent, commandData.DesktopProxy.DesktopStartBarAgent).Execute()
        .then(() => {
          this.ToastAgent.PopUpToastNotification(commandData.ScWinMan.GetTopLevelDoc(), "Success");
          resolve();
        })

        .catch((err) => reject(err));
    });
  }

  PublischActiveCE(commandData: ICommandHndlrDataForContent): Promise<void> {
    return new Promise(async (resolve, reject) => {
      await new RecipePublishActiveCe(commandData, this.FactoryHelp).Execute()
        .then(() => resolve)
        .catch((err) => reject(err));
    });
  }

  async RemoveSnapShot(commandData: ICommandHndlrDataForContent): Promise<void> {
    return new Promise(async (resolve, reject) => {
      let recipe = new RecipeRemoveItemFromStorage(commandData, commandData.ToastAgent);
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

  SetStateOfSitecoreWindow(commandData: ICommandHndlrDataForContent): Promise<void> {
    return new Promise(async (resolve, reject) => {
      let recipe = new RecipeSetStateOfSitecoreWindow(commandData.Logger, commandData.ScWinMan.GetScUrlAgent(), commandData.AtticAgent, commandData.ScWinMan.GetTopLevelDoc(), commandData.ScWinMan.MakeScWinRecipeParts(), commandData.ScWinMan.DesktopProxy(), commandData.ToastAgent, commandData.ScWinMan.ContentEditorProxy(), commandData.TargetSnapShotId, commandData.SettingsAgent);// .ContentHub.ContentMessageMan.__restoreClick(commandData.PayloadData)

      await recipe.Execute()
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  }

  OpenContentEditor() {
    throw new Error("Method not implemented.");
  }

  MarkFavorite(commandData: ICommandHndlrDataForContent) {
    return new Promise(async (resolve, reject) => {
      await new RecipeToggleFavorite(commandData).Execute()
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  }

  Ping(payloadData: PayloadDataFromPopUp) {
    return new Promise(async (resolve, reject) => {
      resolve(MsgFlag.RespListeningAndReady);
    });
  }

  AdminB() {
    this.ScUiMan.AdminB(this.ScWinMan.GetTopLevelDoc(), null);
  }
}