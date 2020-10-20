﻿import { DocumentJacket } from "../../DOMJacket/scripts/Document/DocumentJacket";
import { ScRibbonCommand } from "../../Shared/scripts/Enums/eScRibbonCommand";
import { SnapShotFlavor } from "../../Shared/scripts/Enums/SnapShotFlavor";
import { ICoreTaskMonitor } from "../../Shared/scripts/Interfaces/Agents/Core/ITaskMonitorAgent";
import { IAPICore } from "../../Shared/scripts/Interfaces/Agents/IAPICore";
import { IHindSiteScUiProxy } from "../../Shared/scripts/Interfaces/Agents/IContentApi/IHindSiteScUiProxy";
import { IHindSiteScUiProxyRunTimeOptions } from "../../Shared/scripts/Interfaces/Agents/IContentApi/IHindSiteScUiProxyRunTimeOptions";
import { ICoreErrorHandler } from "../../Shared/scripts/Interfaces/Agents/IErrorHandlerAgent";
import { ILoggerAgent } from "../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IScWindowFacade } from "../../Shared/scripts/Interfaces/Agents/IScWindowManager/IScWindowManager";
import { IApiCallPayload } from "../../Shared/scripts/Interfaces/IApiCallPayload";
import { IStateOfScUi } from "../../Shared/scripts/Interfaces/StateOf/IDataStateOfSitecoreWindow";
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

  public async InstantiateHindSiteScUiProxy(): Promise<void> {
    this.Logger.FuncStart(this.InstantiateHindSiteScUiProxy.name);
    try {
      this.ScWindowFacade = new ScWindowFacade(this.ApiCore, this.DocumentJacket);
      await this.ScWindowFacade.InstantiateAsyncMembers();
    }
    catch (err: any) {
      this.ErrorHand.HandleFatalError(this.InstantiateHindSiteScUiProxy.name, err);
    }

    this.Logger.FuncEnd(this.InstantiateHindSiteScUiProxy.name);
  }

  GetStateOfScUiProxyWindow(snapshotFlavor: SnapShotFlavor): Promise<IStateOfScUi> {
    return this.ScWindowFacade.GetStateOfScUiProxy(snapshotFlavor);
  }

  GetStateOfScUiProxy(): Promise<IStateOfScUi> {
    return new Promise(async (resolve, reject) => {
      let reply: IStateOfScUi = null;

      if (this.ScWindowFacade) {
        await this.ScWindowFacade.GetStateOfScUiProxy(SnapShotFlavor.Live)
          .then((result: IStateOfScUi) => reply = result)
          .then(() => reply.ErrorStack = this.ErrorHand.ErrorStack)
          .then(() => resolve(reply))
          .catch((err: any) => reject(err));
      } else {
        resolve(reply);
      }
    });
  }

  AddContentEditorToDesktopAsync(apiCallPayload: IApiCallPayload): Promise<void> {
    return new Promise(async (resolve, reject) => {
      (<DesktopProxy>this.ScWindowFacade.StateFullProxy).AddContentEditorFrameAsync()
        .then(() => resolve())
        .catch((err: any) => reject());
    });
  }

  PublischActiveCE(commandData: IApiCallPayload): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.ScWindowFacade.PublishActiveCE()
        .then(() => resolve())
        .catch((err: any) => reject(this.ErrorHand.FormatRejectMessage([HindSiteScUiProxy.name, this.PublischActiveCE.name], err)));
    });
  }

  async ToggleCompactCss(commandData: IApiCallPayload): Promise<void> {
    return new Promise(async (resolve, reject) => {
      //await this.ToggleCompactCss()
      //  .then(() => resolve())
      //  .catch((err: any) => reject(err));
    });
  }

  SetStateOfSitecoreWindowAsync(apiCallPayload: IApiCallPayload, dataOneWindowStorage: IStateOfScUi): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.ScWindowFacade.SetStateOfScWin(dataOneWindowStorage)
        .then(() => resolve())
        .catch((err: any) => reject(err));
    });
  }

  async CEGoSelected(apiCallPayload: IApiCallPayload): Promise<void> {
    let text: string = '';
    if (window.getSelection()) {
      text = window.getSelection().toString();
    }

    alert(text);
  }

  async TriggerCERibbonCommand(scRibbonCommand: ScRibbonCommand): Promise<void> {
    this.Logger.FuncStart([HindSiteScUiProxy.name, this.TriggerCERibbonCommand.name], ScRibbonCommand[scRibbonCommand]);
    try {
      if ((typeof scRibbonCommand !== 'undefined') && scRibbonCommand !== ScRibbonCommand.Unknown) {
        this.ScWindowFacade.TriggerCERibbonCommand(scRibbonCommand);
      } else {
        this.ErrorHand.WarningAndContinue(this.TriggerCERibbonCommand.name, 'Invalid scRibbonCommand');
      }
    } catch (err: any) {
      this.ErrorHand.HandleFatalError(this.TriggerCERibbonCommand.name, err);
    }
    this.Logger.FuncEnd([HindSiteScUiProxy.name, this.TriggerCERibbonCommand.name]);
  }

  OpenContentEditor(): Promise<void>{
    throw new Error("Method not implemented.");
  }

  AdminB(commandData: IApiCallPayload):void{
    this.ScUiMan = new ScUiManager(this.ApiCore);
    this.ScUiMan.InitSitecoreUiManager();
    this.ScUiMan.AdminB(this.DocumentJacket, null);
  }
}