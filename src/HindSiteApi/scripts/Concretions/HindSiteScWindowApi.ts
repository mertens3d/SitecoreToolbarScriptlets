import { RecipeAddNewContentEditorToDesktop } from "../../../Content/scripts/ContentApi/Recipes/RecipeAddContentEditorToDesktop/RecipeAddContentEditorToDesktop";
import { RecipeChangeNickName } from "../../../Content/scripts/ContentApi/Recipes/RecipeChangeNickName/RecipeChangeNickName";
import { RecipePublishActiveCe } from "../../../Content/scripts/ContentApi/Recipes/RecipePublishActiveCe/RecipePublishActiveCe";
import { RecipeForceAutoSnapShot } from "../../../Content/scripts/ContentApi/Recipes/RecipeRemoveItemFromStorage/RecipeForceAutoSnapShot";
import { RecipeRemoveItemFromStorage } from "../../../Content/scripts/ContentApi/Recipes/RecipeRemoveItemFromStorage/RecipeRemoveItemFromStorage";
import { RecipeSetStateOfSitecoreWindow } from "../../../Content/scripts/ContentApi/Recipes/RecipeRestore/RecipeRestore";
import { RecipeSaveStateManual } from "../../../Content/scripts/ContentApi/Recipes/RecipeSaveState/RecipeSaveState";
import { RecipeToggleFavorite } from "../../../Content/scripts/ContentApi/Recipes/RecipeToggleFavorite/RecipeToggleFavorite";
import { ScUiManager } from "../../../Content/scripts/Managers/SitecoreUiManager/SitecoreUiManager";
import { IDataContentReplyReceivedEvent_Payload } from "../../../Content/scripts/Proxies/Desktop/DesktopProxy/Events/ContentReplyReceivedEvent/IDataContentReplyReceivedEvent_Payload";
import { DefaultContentReplyPayload } from "../../../Shared/scripts/Classes/Defaults/DefaultScWindowState";
import { StaticHelpers } from "../../../Shared/scripts/Classes/StaticHelpers";
import { MsgFlag } from "../../../Shared/scripts/Enums/1xxx-MessageFlag";
import { SnapShotFlavor } from "../../../Shared/scripts/Enums/SnapShotFlavor";
import { FactoryHelper } from "../../../Shared/scripts/Helpers/FactoryHelper";
import { IContentAtticAgent } from "../../../Shared/scripts/Interfaces/Agents/IContentAtticAgent/IContentAtticAgent";
import { IContentBrowserProxy } from "../../../Shared/scripts/Interfaces/Agents/IContentBrowserProxy";
import { IFactoryApi } from "../../../Shared/scripts/Interfaces/Agents/IFactoryApi";
import { ILoggerAgent } from "../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IScWindowManager } from "../../../Shared/scripts/Interfaces/Agents/IScWindowManager/IScWindowManager";
import { IHindSiteScWindowApi } from "../../../Shared/scripts/Interfaces/Api/IHindSiteScWindowApi";
import { IDataStateOfSitecoreWindow } from "../../../Shared/scripts/Interfaces/Data/States/IDataStateOfSitecoreWindow";
import { IDataStateOfStorageSnapShots } from "../../../Shared/scripts/Interfaces/Data/States/IDataStateOfStorageSnapShots";
import { ICommandHandlerDataForContent } from "../../../Shared/scripts/Interfaces/ICommandHandlerDataForContent";
import { IFactoryHelper } from "../../../Shared/scripts/Interfaces/IFactoryHelper";
import { LoggableBase } from "../../../Shared/scripts/LoggableBase";

export class HindSiteScWindowApi extends LoggableBase implements IHindSiteScWindowApi {
  private FactoryHelp: IFactoryHelper;
  private ScUiMan: ScUiManager;
  private ScWinMan: IScWindowManager;
  ContentBrowserProxy: IContentBrowserProxy;
  Factory: IFactoryApi;

  constructor(logger: ILoggerAgent, scUiMan: ScUiManager, scWinMan: IScWindowManager, contentBrowserProxy: IContentBrowserProxy) {
    super(logger);

    this.Logger.FuncStart(HindSiteScWindowApi.name);

    this.ScUiMan = scUiMan;
    this.ScWinMan = scWinMan;
    this.FactoryHelp = new FactoryHelper(this.Logger);

    this.ContentBrowserProxy = contentBrowserProxy;
    if (StaticHelpers.IsNullOrUndefined([this.ContentBrowserProxy])) {
      this.Logger.ErrorAndThrow(HindSiteScWindowApi.name, 'null check');
    }

    this.Logger.FuncEnd(HindSiteScWindowApi.name);
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
      await new RecipeAddNewContentEditorToDesktop(commandData).Execute()
        .then(() => {
          //this.ToastAgent.RaiseToastNotification(commandData.ScWinMan.GetTopLevelDoc(), "Success");
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

  async SetNickName(commandData: ICommandHandlerDataForContent): Promise<void> {
    return new Promise(async (resolve, reject) => {
      //RecipeToExecute = new RecipeChangeNickName(this.Logger, messageFromController.SnapShotNewNickname, messageFromController.SelectSnapshotId, this.AtticAgent)

      let recipe = new RecipeChangeNickName(commandData);

      recipe.Execute()
        .then(() => resolve())
        .catch((err) => reject(this.SetNickName.name + ' | ' + err));
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
      let recipe = new RecipeSetStateOfSitecoreWindow(commandData);// .ContentHub.ContentMessageMan.__restoreClick(commandData.PayloadData)

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