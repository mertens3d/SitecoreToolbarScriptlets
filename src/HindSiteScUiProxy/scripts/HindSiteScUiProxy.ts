import { ToastAgent } from "../../Shared/scripts/Agents/Agents/ToastAgent/ToastAgent";
import { SnapShotFlavor } from "../../Shared/scripts/Enums/SnapShotFlavor";
import { IHindSiteScUiProxy } from "../../Shared/scripts/Interfaces/Agents/IContentApi/IContentApi";
import { ILoggerAgent } from "../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IScUrlAgent } from "../../Shared/scripts/Interfaces/Agents/IScUrlAgent/IScUrlAgent";
import { IScWindowProxy } from "../../Shared/scripts/Interfaces/Agents/IScWindowManager/IScWindowManager";
import { IDataOneDoc } from "../../Shared/scripts/Interfaces/Data/IDataOneDoc";
import { IDataStateOfLiveHindSite } from "../../Shared/scripts/Interfaces/Data/States/IDataStateOfSitecoreWindow";
import { IApiCallPayload } from "../../Shared/scripts/Interfaces/ICommandHandlerDataForContent";
import { LoggableBase } from "../../Shared/scripts/LoggableBase";
import { ScUiManager } from "./Managers/SitecoreUiManager/SitecoreUiManager";
import { ScWindowProxy } from "./Proxies/ScWindowProxy";

export class HindSiteScUiProxy extends LoggableBase implements IHindSiteScUiProxy {
  private ScUiMan: ScUiManager;
  private ScWindowProxy: IScWindowProxy;
  private ScUrlAgent: IScUrlAgent;
  private TopLevelDoc: IDataOneDoc;
  ToastAgent: ToastAgent;

  constructor(logger: ILoggerAgent, scUiMan: ScUiManager, scUrlAgent: IScUrlAgent, TopDoc: IDataOneDoc, toastAgent: ToastAgent) {
    super(logger);

    this.Logger.CTORStart(HindSiteScUiProxy.name);

    this.ScUrlAgent = scUrlAgent;
    this.ScUiMan = scUiMan;
    this.TopLevelDoc = TopDoc;
    this.ToastAgent = toastAgent;
    this.InitscWinProxy();

    this.Logger.CTOREnd(HindSiteScUiProxy.name);
  }
  public async OnReady_InitScWindowManager() {
    this.Logger.FuncStart(this.OnReady_InitScWindowManager.name);
    try {
    await this.ScWindowProxy.Instantiate_ScWindowProxy();

    } catch (err) {
      this.Logger.ErrorAndThrow(this.OnReady_InitScWindowManager.name, err);
    }




    this.Logger.FuncEnd(this.OnReady_InitScWindowManager.name);
  }

  private InitscWinProxy() {
    this.ScWindowProxy = new ScWindowProxy(this.Logger, this.ScUrlAgent);
  }

  GetStateOfSitecoreWindow(snapshotFlavor: SnapShotFlavor): Promise<IDataStateOfLiveHindSite> {
    return this.ScWindowProxy.GetStateOfSitecoreWindow(snapshotFlavor);
  }

  RaiseToastNotification(arg0: string) {
    this.ToastAgent.RaiseToastNotification(arg0);
  }

  //async UpdateNickname(commandData: ICommandHndlrDataForContent): Promise<void> {
  //  return new Promise(async (resolve, reject) => {
  //    await new RecipeChangeNickName(commandData).Execute()
  //      .then(() => resolve())
  //      .catch((err) => reject(err));
  //  })
  //}

  GetStateOfScWindow(): Promise<IDataStateOfLiveHindSite> {
    return new Promise(async (resolve, reject) => {
      let reply: IDataStateOfLiveHindSite = null;

      await this.ScWindowProxy.GetStateOfSitecoreWindow(SnapShotFlavor.Live)
        .then((result: IDataStateOfLiveHindSite) => reply = result)
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

  AddContentEditorToDesktopAsync(apiCallPayload: IApiCallPayload): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.ScWindowProxy.DesktopProxy.AddContentEditorAsync()
        .then(() => resolve())
        .catch((err) => reject())
    });
  }

  PublischActiveCE(commandData: IApiCallPayload): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.ScWindowProxy.PublishActiveCE()
        .then(() => resolve())
        .ca
    });
  }

  async ToggleCompactCss(commandData: IApiCallPayload) {
    return new Promise(async (resolve, reject) => {
      //await this.ToggleCompactCss()
      //  .then(() => resolve())
      //  .catch((err) => reject(err));
    });
  }

  SetStateOfSitecoreWindowAsync(commandData: IApiCallPayload, dataOneWindowStorage: IDataStateOfLiveHindSite): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.ScWindowProxy.SetStateOfScWin(dataOneWindowStorage)
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  }

  OpenContentEditor() {
    throw new Error("Method not implemented.");
  }

  AdminB(commandData: IApiCallPayload) {
    this.ScUiMan.AdminB(this.TopLevelDoc, null);
  }
}