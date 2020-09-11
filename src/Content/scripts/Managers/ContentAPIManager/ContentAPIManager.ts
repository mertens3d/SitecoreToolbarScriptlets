import { PayloadDataFromPopUp } from "../../../../Shared/scripts/Classes/PayloadDataReqPopUp";
import { MsgFlag } from "../../../../Shared/scripts/Enums/1xxx-MessageFlag";
import { FactoryHelper } from "../../../../Shared/scripts/Helpers/FactoryHelper";
import { IHindSiteScWindowApi } from "../../../../Shared/scripts/Interfaces/Agents/IContentApi/IContentApi";
import { ILoggerAgent } from "../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IScWindowManager } from "../../../../Shared/scripts/Interfaces/Agents/IScWindowManager/IScWindowManager";
import { IToastAgent } from "../../../../Shared/scripts/Interfaces/Agents/IToastAgent";
import { IContentReplyPayload } from "../../../../Shared/scripts/Interfaces/Data/IContentState";
import { ICommandHndlrDataForContent } from "../../../../Shared/scripts/Interfaces/ICommandHndlrDataForContent";
import { RecipeAddNewContentEditorToDesktop } from "../../ContentApi/Recipes/RecipeAddContentEditorToDesktop/RecipeAddContentEditorToDesktop";
import { RecipePublishActiveCe } from "../../ContentApi/Recipes/RecipePublishActiveCe/RecipePublishActiveCe";
import { RecipeRemoveItemFromStorage } from "../../ContentApi/Recipes/RecipeRemoveItemFromStorage/RecipeRemoveItemFromStorage";
import { RecipeRestoreState } from "../../ContentApi/Recipes/RecipeRestore/RecipeRestore";
import { RecipeSaveState } from "../../ContentApi/Recipes/RecipeSaveState/RecipeSaveState";
import { RecipeToggleFavorite } from "../../ContentApi/Recipes/RecipeToggleFavorite/RecipeToggleFavorite";
import { LoggableBase } from "../LoggableBase";
import { ScUiManager } from "../SitecoreUiManager/SitecoreUiManager";
import { ISettingsAgent } from "../../../../Shared/scripts/Interfaces/Agents/ISettingsAgent";
import { IFactoryHelper } from "../../../../Shared/scripts/Interfaces/IFactoryHelper";

export class ContentAPIManager extends LoggableBase implements IHindSiteScWindowApi {
  private ToastAgent: IToastAgent;
  private ScUiMan: ScUiManager;
  private FactoryHelp: IFactoryHelper;
  private ScWinMan: IScWindowManager;
  private SettingsAgent: ISettingsAgent;

  constructor(logger: ILoggerAgent, toastAgent: IToastAgent, scUiMan: ScUiManager, scWinMan: IScWindowManager, settingsAgent: ISettingsAgent) {
    super(logger);

    this.Logger.FuncStart(ContentAPIManager.name);

    this.ToastAgent = toastAgent;
    this.ScUiMan = scUiMan;
    this.ScWinMan = scWinMan;
    this.SettingsAgent = settingsAgent;
    this.FactoryHelp = new FactoryHelper(this.Logger, this.SettingsAgent);

    this.Logger.FuncEnd(ContentAPIManager.name);
  }

  //async UpdateNickname(commandData: ICommandHndlrDataForContent): Promise<void> {
  //  return new Promise(async (resolve, reject) => {
  //    await new RecipeChangeNickName(commandData).Execute()
  //      .then(() => resolve())
  //      .catch((err) => reject(err));
  //  })
  //}

  GetStateContent(): Promise<IContentReplyPayload> {
    return new Promise(async (resolve, reject) => {
      await this.ScWinMan.GetStateScWindow()
        .then((result: IContentReplyPayload) => resolve(result))
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

  RestoreSnapshop(commandData: ICommandHndlrDataForContent): Promise<void> {
    return new Promise(async (resolve, reject) => {
      let recipe = new RecipeRestoreState(commandData.Logger, commandData.ScWinMan.GetScUrlAgent(), commandData.AtticAgent, commandData.ScWinMan.GetTopLevelDoc(), commandData.ScWinMan.MakeScWinRecipeParts(), commandData.ScWinMan.DesktopUiProxy, commandData.ToastAgent, commandData.ScWinMan.ContentEditorProxy, commandData.TargetSnapShotId, this.SettingsAgent);// .ContentHub.ContentMessageMan.__restoreClick(commandData.PayloadData)

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