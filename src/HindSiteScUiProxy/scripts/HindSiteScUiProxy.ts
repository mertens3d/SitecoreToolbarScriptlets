import { RecipeBasics } from "../../Shared/scripts/Classes/RecipeBasics";
import { MsgFlag } from "../../Shared/scripts/Enums/1xxx-MessageFlag";
import { SnapShotFlavor } from "../../Shared/scripts/Enums/SnapShotFlavor";
import { FactoryHelper } from "../../Shared/scripts/Helpers/FactoryHelper";
import { IHindSiteScWindowApi } from "../../Shared/scripts/Interfaces/Agents/IContentApi/IContentApi";
import { ILoggerAgent } from "../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IScUrlAgent } from "../../Shared/scripts/Interfaces/Agents/IScUrlAgent/IScUrlAgent";
import { IScWindowProxy } from "../../Shared/scripts/Interfaces/Agents/IScWindowManager/IScWindowManager";
import { IDataOneDoc } from "../../Shared/scripts/Interfaces/Data/IDataOneDoc";
import { IDataStateOfSitecoreWindow } from "../../Shared/scripts/Interfaces/Data/States/IDataStateOfSitecoreWindow";
import { IApiCallPayload } from "../../Shared/scripts/Interfaces/ICommandHandlerDataForContent";
import { IFactoryHelper } from "../../Shared/scripts/Interfaces/IFactoryHelper";
import { RecipeAddNewContentEditorToDesktop } from "./ContentApi/Recipes/RecipeAddContentEditorToDesktop";
import { RecipePublishActiveCe } from "./ContentApi/Recipes/RecipePublishActiveCe";
import { LoggableBase } from "./Managers/LoggableBase";
import { ScWindowProxy } from "./Proxies/ScWindowProxy";
import { ScWindowRecipePartials } from "./Managers/ScWindowManager/ScWindowRecipePartials";
import { ScUiManager } from "./Managers/SitecoreUiManager/SitecoreUiManager";

export class HindSiteScUiProxy extends LoggableBase implements IHindSiteScWindowApi {
  private FactoryHelp: IFactoryHelper;
  private ScUiMan: ScUiManager;
  private ScWindowProxy: IScWindowProxy;
  private RecipeBasics: RecipeBasics;
  private ScWinRecipeParts: ScWindowRecipePartials;
  private ScUrlAgent: IScUrlAgent;
  private TopLevelDoc: IDataOneDoc;

  constructor(logger: ILoggerAgent, scUiMan: ScUiManager, scUrlAgent: IScUrlAgent, TopDoc: IDataOneDoc) {
    super(logger);

    this.Logger.FuncStart(HindSiteScUiProxy.name);

    this.ScUrlAgent = scUrlAgent;
    this.ScUiMan = scUiMan;
    this.TopLevelDoc = TopDoc;
    this.FactoryHelp = new FactoryHelper(this.Logger);
    this.RecipeBasics = new RecipeBasics(this.Logger);

    this.ScWinRecipeParts = new ScWindowRecipePartials(this.Logger);

    this.InitscWinProxy();

    this.Logger.FuncEnd(HindSiteScUiProxy.name);
  }
  OnReadyInitScWindowManager() {
    this.ScWindowProxy.OnReadyInitScWindowManager();
  }

  private InitscWinProxy() {
    this.ScWindowProxy = new ScWindowProxy(this.Logger, this.ScUrlAgent);
  }

  GetStateOfSitecoreWindow(snapshotFlavor: SnapShotFlavor): Promise<IDataStateOfSitecoreWindow> {
    return this.ScWindowProxy.GetStateOfSitecoreWindow(snapshotFlavor);
  }

  RaiseToastNotification(arg0: string) {
    throw new Error("Method not implemented.");
  }

  //async UpdateNickname(commandData: ICommandHndlrDataForContent): Promise<void> {
  //  return new Promise(async (resolve, reject) => {
  //    await new RecipeChangeNickName(commandData).Execute()
  //      .then(() => resolve())
  //      .catch((err) => reject(err));
  //  })
  //}

  GetStateOfScWindow(): Promise<IDataStateOfSitecoreWindow> {
    return new Promise(async (resolve, reject) => {
      let reply: IDataStateOfSitecoreWindow = null;

      await this.ScWindowProxy.GetStateOfSitecoreWindow(SnapShotFlavor.Live)
        .then((result: IDataStateOfSitecoreWindow) => reply = result)
        .then(() => reply.ErrorStack = this.Logger.ErrorStack)
        .then(() => resolve(reply))
        .catch((err) => reject(err))
    });
  }

  //Notify(payloadData: PayloadDataFromPopUp): Promise<void> {
  //  return new Promise(async (resolve, reject) => {
  //    this.ToastAgent.PopUpToastNotification(this.scWinProxy.GetTopLevelDoc(), payloadData.ToastMessage);
  //  });
  //}

  AddCETab(apiCallPayload: IApiCallPayload): Promise<void> {
    return new Promise(async (resolve, reject) => {
      await new RecipeAddNewContentEditorToDesktop(this.Logger, apiCallPayload, this.ScWindowProxy).Execute()
        .then(() => {
          resolve();
        })
        .catch((err) => reject(err));
    });
  }

  PublischActiveCE(commandData: IApiCallPayload): Promise<void> {
    return new Promise(async (resolve, reject) => {
      await new RecipePublishActiveCe(this.Logger, commandData, this.ScWindowProxy, this.FactoryHelp, this.TopLevelDoc).Execute()
        .then(() => resolve)
        .catch((err) => reject(err));
    });
  }

  async ToggleCompactCss(commandData: IApiCallPayload) {
    return new Promise(async (resolve, reject) => {
      //await this.ToggleCompactCss()
      //  .then(() => resolve())
      //  .catch((err) => reject(err));
    });
  }

  SetStateOfSitecoreWindowAsync(commandData: IApiCallPayload, dataOneWindowStorage: IDataStateOfSitecoreWindow): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.ScWindowProxy.SetStateOfScWin(dataOneWindowStorage)
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  }

  OpenContentEditor() {
    throw new Error("Method not implemented.");
  }

  Ping() {
    return new Promise(async (resolve, reject) => {
      resolve(MsgFlag.RespListeningAndReady);
    });
  }

  AdminB(commandData: IApiCallPayload) {
    this.ScUiMan.AdminB(this.TopLevelDoc, null);
  }
}