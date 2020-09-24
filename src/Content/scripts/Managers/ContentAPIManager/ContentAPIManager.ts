import { DefaultContentReplyPayload } from "../../../../Shared/scripts/Classes/Defaults/DefaultScWindowState";
import { MsgFlag } from "../../../../Shared/scripts/Enums/1xxx-MessageFlag";
import { SnapShotFlavor } from "../../../../Shared/scripts/Enums/SnapShotFlavor";
import { FactoryHelper } from "../../../../Shared/scripts/Helpers/FactoryHelper";
import { IHindSiteScWindowApi } from "../../../../Shared/scripts/Interfaces/Agents/IContentApi/IContentApi";
import { IContentAtticAgent } from "../../../../Shared/scripts/Interfaces/Agents/IContentAtticAgent/IContentAtticAgent";
import { ILoggerAgent } from "../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IScWindowManager } from "../../../../Shared/scripts/Interfaces/Agents/IScWindowManager/IScWindowManager";
import { IToastAgent } from "../../../../Shared/scripts/Interfaces/Agents/IToastAgent";
import { IDataStateOfSitecoreWindow } from "../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfSitecoreWindow";
import { IDataStateOfStorageSnapShots } from "../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfStorageSnapShots";
import { ICommandHandlerDataForContent } from "../../../../Shared/scripts/Interfaces/ICommandHandlerDataForContent";
import { IFactoryHelper } from "../../../../Shared/scripts/Interfaces/IFactoryHelper";
import { RecipeAddNewContentEditorToDesktop } from "../../ContentApi/Recipes/RecipeAddContentEditorToDesktop/RecipeAddContentEditorToDesktop";
import { RecipePublishActiveCe } from "../../ContentApi/Recipes/RecipePublishActiveCe/RecipePublishActiveCe";
import { RecipeRemoveItemFromStorage } from "../../ContentApi/Recipes/RecipeRemoveItemFromStorage/RecipeRemoveItemFromStorage";
import { RecipeForceAutoSnapShot } from "../../ContentApi/Recipes/RecipeRemoveItemFromStorage/RecipeForceAutoSnapShot";
import { RecipeSetStateOfSitecoreWindow } from "../../ContentApi/Recipes/RecipeRestore/RecipeRestore";
import { RecipeToggleFavorite } from "../../ContentApi/Recipes/RecipeToggleFavorite/RecipeToggleFavorite";
import { IDataContentReplyReceivedEvent_Payload } from "../../Proxies/Desktop/DesktopProxy/Events/ContentReplyReceivedEvent/IDataContentReplyReceivedEvent_Payload";
import { LoggableBase } from "../LoggableBase";
import { ScUiManager } from "../SitecoreUiManager/SitecoreUiManager";
import { RecipeSaveStateManual } from "../../ContentApi/Recipes/RecipeSaveState/RecipeSaveState";
import { AutoSnapShotAgent } from "../../Agents/AutoSnapShotAgent/AutoSnapShotAgent";
import { StaticHelpers } from "../../../../Shared/scripts/Classes/StaticHelpers";

export class ContentAPIManager extends LoggableBase implements IHindSiteScWindowApi {
  private AtticAgent: IContentAtticAgent;
  private FactoryHelp: IFactoryHelper;
  private ScUiMan: ScUiManager;
  private ScWinMan: IScWindowManager;
  private ToastAgent: IToastAgent;
  AutoSnapShotAgent: AutoSnapShotAgent;

  constructor(logger: ILoggerAgent, toastAgent: IToastAgent, scUiMan: ScUiManager, scWinMan: IScWindowManager, atticAgent: IContentAtticAgent, autoSnapShotAgent: AutoSnapShotAgent) {
    super(logger);

    this.Logger.FuncStart(ContentAPIManager.name);

    this.ToastAgent = toastAgent;
    this.ScUiMan = scUiMan;
    this.ScWinMan = scWinMan;
    this.FactoryHelp = new FactoryHelper(this.Logger);
    this.AtticAgent = atticAgent;
    this.AtticAgent.CleanOutOldAutoSavedData();
    this.AutoSnapShotAgent = autoSnapShotAgent;

    if (StaticHelpers.IsNullOrUndefined([this.AutoSnapShotAgent])) {
      this.Logger.ErrorAndThrow(ContentAPIManager.name, 'null check');
    }

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

      await this.ScWinMan.GetStateOfSitecoreWindow(SnapShotFlavor.Live)
        .then((result: IDataStateOfSitecoreWindow) => reply.StateOfSitecoreWindow = result)
        .then(() => this.AtticAgent.GetStateOfStorageSnapShots())
        .then((result: IDataStateOfStorageSnapShots) => reply.StateOfStorageSnapShots = result)
        .then(() => reply.ErrorStack = this.Logger.ErrorStack)
        .then(() => resolve(reply))
        .catch((err) => reject(err))
    });
  }

  //Notify(payloadData: PayloadDataFromPopUp): Promise<void> {
  //  return new Promise(async (resolve, reject) => {
  //    this.ToastAgent.PopUpToastNotification(this.ScWinMan.GetTopLevelDoc(), payloadData.ToastMessage);
  //  });
  //}

  AddCETab(commandData: ICommandHandlerDataForContent): Promise<void> {
    return new Promise(async (resolve, reject) => {
      await new RecipeAddNewContentEditorToDesktop(commandData.Logger, commandData.TargetDoc, commandData.DesktopProxy.DesktopStartBarAgent).Execute()
        .then(() => {
          this.ToastAgent.RaiseToastNotification(commandData.ScWinMan.GetTopLevelDoc(), "Success");
          resolve();
        })

        .catch((err) => reject(err));
    });
  }

  PublischActiveCE(commandData: ICommandHandlerDataForContent): Promise<void> {
    return new Promise(async (resolve, reject) => {
      await new RecipePublishActiveCe(commandData, this.FactoryHelp).Execute()
        .then(() => resolve)
        .catch((err) => reject(err));
    });
  }

  async DebugForceAutoSnapShot(commandData: ICommandHandlerDataForContent): Promise<void> {
    return new Promise(async (resolve, reject) => {
      let recipe = new RecipeForceAutoSnapShot(commandData);

      recipe.Execute()
        .then(() => resolve())
        .catch((err) => reject(this.DebugForceAutoSnapShot.name + ' | ' + err));

      
    });
  }

  async RemoveSnapShot(commandData: ICommandHandlerDataForContent): Promise<void> {
    return new Promise(async (resolve, reject) => {
      let recipe = new RecipeRemoveItemFromStorage(commandData, commandData.ToastAgent);
      await recipe.Execute()
        .then(resolve)
        .catch((err) => reject(err));
    });
  }

  async SaveWindowState(commandData: ICommandHandlerDataForContent): Promise<void> {
    return new Promise(async (resolve, reject) => {
      let recipe = new RecipeSaveStateManual(commandData);
      await recipe.Execute()
        .then(resolve)
        .catch((err) => reject(err));
    });
  }

  async ToggleCompactCss(commandData: ICommandHandlerDataForContent) {
    return new Promise(async (resolve, reject) => {
      //await this.ToggleCompactCss()
      //  .then(() => resolve())
      //  .catch((err) => reject(err));
    });
  }

  SetStateOfSitecoreWindow(commandData: ICommandHandlerDataForContent): Promise<void> {
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

  ToggleFavorite(commandData: ICommandHandlerDataForContent) {
    return new Promise(async (resolve, reject) => {
      await new RecipeToggleFavorite(commandData).Execute()
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  }

  Ping() {
    return new Promise(async (resolve, reject) => {
      resolve(MsgFlag.RespListeningAndReady);
    });
  }

  AdminB() {
    this.ScUiMan.AdminB(this.ScWinMan.GetTopLevelDoc(), null);
  }
}