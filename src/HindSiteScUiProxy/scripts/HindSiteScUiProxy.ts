import { DocumentJacket } from "../../DOMJacket/scripts/Document/DocumentJacket";
import { ScRibbonCommand } from "../../Shared/scripts/Enums/eScRibbonCommand";
import { ICoreTaskMonitor } from "../../Shared/scripts/Interfaces/Agents/Core/ITaskMonitorAgent";
import { IAPICore } from "../../Shared/scripts/Interfaces/Agents/IAPICore";
import { IHindSiteScUiProxy } from "../../Shared/scripts/Interfaces/Agents/IContentApi/IHindSiteScUiProxy";
import { IHindSiteScUiProxyRunTimeOptions } from "../../Shared/scripts/Interfaces/Agents/IContentApi/IHindSiteScUiProxyRunTimeOptions";
import { ICoreErrorHandler } from "../../Shared/scripts/Interfaces/Agents/IErrorHandlerAgent";
import { ILoggerAgent } from "../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IScWindowFacade } from "../../Shared/scripts/Interfaces/Agents/IScWindowManager/IScWindowManager";
import { IApiCallPayload } from "../../Shared/scripts/Interfaces/IApiCallPayload";
import { IStateOfScUi } from "../../Shared/scripts/Interfaces/StateOf/IDataStateOfSitecoreWindow";
import { IScUiReturnPayload } from "../../Shared/scripts/Interfaces/StateOf/IScUiReturnPayload";
import { ScUiManager } from "./Managers/SitecoreUiManager/SitecoreUiManager";
import { DesktopProxy } from "./Proxies/Desktop/DesktopProxy/DesktopProxy";
import { ScWindowFacade } from "./Proxies/ScWindowFacade";

export class HindSiteScUiProxy implements IHindSiteScUiProxy {
  private ScUiMan: ScUiManager;
  private ScWindowFacade: IScWindowFacade;
  private DocumentJacket: DocumentJacket;
  private ApiCore: IAPICore;
  private Logger: ILoggerAgent;
  private ErrorHand: ICoreErrorHandler;
  private IsInstatiated: boolean = false;

  constructor(loggerAgent: ILoggerAgent, errorHand: ICoreErrorHandler, taskMon: ICoreTaskMonitor, documentJacket: DocumentJacket, runTimeOptions: IHindSiteScUiProxyRunTimeOptions) {
    this.ApiCore = {
      ErrorHand: errorHand,
      Logger: loggerAgent,
      RunTimeOptions: runTimeOptions,
      TaskMonitor: taskMon,
      //TypeDiscriminator: TypeDiscriminator.ApiCore,
    }

    this.Logger = this.ApiCore.Logger;
    this.ErrorHand = this.ApiCore.ErrorHand;

    this.Logger.CTORStart(HindSiteScUiProxy.name);

    this.DocumentJacket = documentJacket;

    this.Logger.CTOREnd(HindSiteScUiProxy.name);
  }

  private async InstantiateHindSiteScUiProxy(): Promise<void> {
    this.Logger.FuncStart(this.InstantiateHindSiteScUiProxy.name);
    try {
      if (!this.IsInstatiated) {
        this.ScWindowFacade = new ScWindowFacade(this.ApiCore, this.DocumentJacket);
        await this.ScWindowFacade.InstantiateAsyncMembers()
          .then(() => this.IsInstatiated = true)
      }
    }
    catch (err: any) {
      this.ErrorHand.HandleFatalError(this.InstantiateHindSiteScUiProxy.name, err);
    }

    this.Logger.FuncEnd(this.InstantiateHindSiteScUiProxy.name);
  }

  private DefaultReturnPayload(): IScUiReturnPayload {
    let defaultVal: IScUiReturnPayload = {
      StateOfScUi: null,
    }
    return defaultVal;
  }

  async GetStateOfScUiProxy(apiCallPayload: IApiCallPayload): Promise<IScUiReturnPayload> {
    return new Promise(async (resolve, reject) => {
      let returnPayload: IScUiReturnPayload = this.DefaultReturnPayload();
      await this.InstantiateHindSiteScUiProxy()
        .then(() => this.ScWindowFacade.GetStateOfScUiProxy(apiCallPayload.SnapShotFlavor))
        .then((stateOfScUi: IStateOfScUi) => returnPayload.StateOfScUi = stateOfScUi)
        .then(() => resolve(returnPayload))
        .catch((err) => this.ErrorHand.HandleFatalError([HindSiteScUiProxy.name, this.GetStateOfScUiProxy.name], err));
    });
  }

  public async AddContentEditorToDesktopAsync(apiCallPayload: IApiCallPayload): Promise<IScUiReturnPayload> {
    return new Promise(async (resolve, reject) => {
      let returnPayload: IScUiReturnPayload = this.DefaultReturnPayload();
      await this.InstantiateHindSiteScUiProxy()
        .then(() => (<DesktopProxy>this.ScWindowFacade.StateFullProxy).AddContentEditorFrameAsync())
        .then(() => resolve(returnPayload))
        .catch((err: any) => reject(err));
    });
  }

  public async PublischActiveCE(apiCallPayload: IApiCallPayload): Promise<IScUiReturnPayload> {
    return new Promise(async (resolve, reject) => {
      let returnPayload: IScUiReturnPayload = this.DefaultReturnPayload();
      await this.InstantiateHindSiteScUiProxy()
        .then(() => this.ScWindowFacade.PublishActiveCE())
        .then(() => resolve(returnPayload))
        .catch((err: any) => reject(this.ErrorHand.FormatRejectMessage([HindSiteScUiProxy.name, this.PublischActiveCE.name], err)));
    });
  }

  public async ToggleCompactCss(apiCallPayload: IApiCallPayload): Promise<IScUiReturnPayload> {
    return new Promise(async (resolve, reject) => {
      let returnPayload: IScUiReturnPayload = this.DefaultReturnPayload();
      await this.InstantiateHindSiteScUiProxy()
        //await this.ToggleCompactCss()
        .then(() => resolve(returnPayload))
        .catch((err: any) => reject(err));
    });
  }

  public async SetStateOfSitecoreWindowAsync(apiCallPayload: IApiCallPayload): Promise<IScUiReturnPayload> {
    return new Promise(async (resolve, reject) => {
      let returnPayload: IScUiReturnPayload = this.DefaultReturnPayload();
      await this.InstantiateHindSiteScUiProxy()
        .then(() => this.ScWindowFacade.SetStateOfScWin(apiCallPayload.DataOneWindowStorage))
        .then(() => resolve(returnPayload))
        .catch((err: any) => reject(err));
    });
  }

  public async CEGoSelected(apiCallPayload: IApiCallPayload): Promise<IScUiReturnPayload> {
    return new Promise(async (resolve, reject) => {
      let returnPayload: IScUiReturnPayload = this.DefaultReturnPayload();
      await this.InstantiateHindSiteScUiProxy()
        .then(() => {
          let text: string = '';
          if (window.getSelection()) {
            text = window.getSelection().toString();
            alert(text);
          }
        })
        .then(() => resolve(returnPayload))
        .catch((err: any) => reject(err));
    });
  }

  public async TriggerCERibbonCommand(apiCallPayload: IApiCallPayload): Promise<IScUiReturnPayload> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart([HindSiteScUiProxy.name, this.TriggerCERibbonCommand.name], ScRibbonCommand[apiCallPayload.ScRibbonCommand]);
      let returnPayload: IScUiReturnPayload = this.DefaultReturnPayload();
      await this.InstantiateHindSiteScUiProxy()
        .then(() => {
          if ((typeof apiCallPayload.ScRibbonCommand !== 'undefined') && apiCallPayload.ScRibbonCommand !== ScRibbonCommand.Unknown) {
            this.ScWindowFacade.TriggerCERibbonCommand(apiCallPayload.ScRibbonCommand);
          } else {
            this.ErrorHand.WarningAndContinue(this.TriggerCERibbonCommand.name, 'Invalid scRibbonCommand');
          }
        })
        .then(() => resolve(returnPayload))
        .catch((err: any) => reject(this.ErrorHand.FormatRejectMessage(this.TriggerCERibbonCommand.name, err)));
      this.Logger.FuncEnd([HindSiteScUiProxy.name, this.TriggerCERibbonCommand.name]);
    });
  }

  public async OpenContentEditor(apiCallPayload: IApiCallPayload): Promise<IScUiReturnPayload> {
    throw new Error("Method not implemented.");
  }

  public async AdminB(apiCallPayload: IApiCallPayload): Promise<IScUiReturnPayload> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart([HindSiteScUiProxy.name, this.TriggerCERibbonCommand.name], ScRibbonCommand[apiCallPayload.ScRibbonCommand]);
      let returnPayload: IScUiReturnPayload = this.DefaultReturnPayload();
      await this.InstantiateHindSiteScUiProxy()
        .then(() => {
          this.ScUiMan = new ScUiManager(this.ApiCore);
          this.ScUiMan.InitSitecoreUiManager();
          this.ScUiMan.AdminB(this.DocumentJacket, null);
        })
        .then(() => resolve(returnPayload))
        .catch((err: any) => reject(this.ErrorHand.FormatRejectMessage(this.TriggerCERibbonCommand.name, err)));
    });
  }
}