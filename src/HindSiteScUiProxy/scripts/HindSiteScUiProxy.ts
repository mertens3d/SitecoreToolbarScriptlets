import { DocumentJacket } from "../../DOMJacket/scripts/Document/DocumentJacket";
import { APICommandFlag } from "../../Shared/scripts/Enums/APICommand";
import { ICoreTaskMonitor } from "../../Shared/scripts/Interfaces/Agents/Core/ITaskMonitorAgent";
import { IAPICore } from "../../Shared/scripts/Interfaces/Agents/IAPICore";
import { IHindSiteScUiProxy } from "../../Shared/scripts/Interfaces/Agents/IContentApi/IHindSiteScUiProxy";
import { IHindSiteScUiProxyRunTimeOptions } from "../../Shared/scripts/Interfaces/Agents/IContentApi/IHindSiteScUiProxyRunTimeOptions";
import { ICoreErrorHandler } from "../../Shared/scripts/Interfaces/Agents/IErrorHandlerAgent";
import { ILoggerAgent } from "../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IScWindowFacade } from "../../Shared/scripts/Interfaces/Agents/IScWindowManager/IScWindowManager";
import { IToApiCallPayload } from "../../Shared/scripts/Interfaces/IApiCallPayload";
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


  public async StartUp(): Promise<void> {
    this.Logger.FuncStart([HindSiteScUiProxy.name, this.StartUp.name]);
    try {
      if (!this.IsInstatiated) {
        this.ScWindowFacade = new ScWindowFacade(this.ApiCore, this.DocumentJacket);
        await this.ScWindowFacade.InstantiateAsyncMembers()
          .then(() => this.IsInstatiated = true)
          .catch((err) => this.ErrorHand.HandleFatalError([HindSiteScUiProxy.name, this.StartUp.name], err));
      }
    }
    catch (err: any) {
      this.ErrorHand.HandleFatalError([HindSiteScUiProxy.name, this.StartUp.name], err);
    }

    this.Logger.FuncEnd([HindSiteScUiProxy.name, this.StartUp.name]);
  }

  APICommand(commandData: IToApiCallPayload): Promise<IScUiReturnPayload> {
    return new Promise(async (resolve, reject) => {

      this.Logger.FuncStart([HindSiteScUiProxy.name, this.APICommand.name], APICommandFlag[commandData.APICommand]);


      let returnPayload: IScUiReturnPayload = this.DefaultReturnPayload();
      await this.StartUp()
        .then(async () => {
          switch (commandData.APICommand) {
            case APICommandFlag.NavigateBack:
              this.TriggerCERibbonCommand(commandData)
                .then((scUiReturnPayload: IScUiReturnPayload) => returnPayload = scUiReturnPayload)
                .catch((err) => this.ErrorHand.FormatRejectMessage([HindSiteScUiProxy.name, this.APICommand.name, JSON.stringify(commandData, null, 2)], err));
              break;
            case APICommandFlag.NavigateForward:
              this.TriggerCERibbonCommand(commandData)
                .then((scUiReturnPayload: IScUiReturnPayload) => returnPayload = scUiReturnPayload)
                .catch((err) => this.ErrorHand.FormatRejectMessage([HindSiteScUiProxy.name, this.APICommand.name, JSON.stringify(commandData, null, 2)], err));
              break;
            case APICommandFlag.NavigateLinks:
              this.TriggerCERibbonCommand(commandData)
                .then((scUiReturnPayload: IScUiReturnPayload) => returnPayload = scUiReturnPayload)
                .catch((err) => this.ErrorHand.FormatRejectMessage([HindSiteScUiProxy.name, this.APICommand.name, JSON.stringify(commandData, null, 2)], err));
              break;
            case APICommandFlag.NavigateUp:
              this.TriggerCERibbonCommand(commandData)
                .then((scUiReturnPayload: IScUiReturnPayload) => returnPayload = scUiReturnPayload)
                .catch((err) => this.ErrorHand.FormatRejectMessage([HindSiteScUiProxy.name, this.APICommand.name, JSON.stringify(commandData, null, 2)], err));
              break;
            case APICommandFlag.PresentationDetails:
              this.TriggerCERibbonCommand(commandData)
                .then((scUiReturnPayload: IScUiReturnPayload) => returnPayload = scUiReturnPayload)
                .catch((err) => this.ErrorHand.FormatRejectMessage([HindSiteScUiProxy.name, this.APICommand.name, JSON.stringify(commandData, null, 2)], err));
              break;
            case APICommandFlag.ToggleRawValues:
              this.TriggerCERibbonCommand(commandData)
                .then((scUiReturnPayload: IScUiReturnPayload) => returnPayload = scUiReturnPayload)
                .catch((err) => this.ErrorHand.FormatRejectMessage([HindSiteScUiProxy.name, this.APICommand.name, JSON.stringify(commandData, null, 2)], err));
              break;
            case APICommandFlag.GetStateOfScUiProxy:
              await      this.GetStateOfScUiProxy(commandData)
                .then((scUiReturnPayload: IScUiReturnPayload) => returnPayload = scUiReturnPayload)
                .catch((err) => this.ErrorHand.FormatRejectMessage([HindSiteScUiProxy.name, this.APICommand.name, JSON.stringify(commandData, null, 2)], err));
              break;

            case APICommandFlag.AddContentEditorToDesktopAsync:
              this.AddContentEditorToDesktopAsync(commandData)
                .then((scUiReturnPayload: IScUiReturnPayload) => returnPayload = scUiReturnPayload)
                .catch((err) => this.ErrorHand.FormatRejectMessage([HindSiteScUiProxy.name, this.APICommand.name, JSON.stringify(commandData, null, 2)], err));
              break;

            case APICommandFlag.PublischActiveCE:
              this.PublischActiveCE(commandData)
                .then((scUiReturnPayload: IScUiReturnPayload) => returnPayload = scUiReturnPayload)
                .catch((err) => this.ErrorHand.FormatRejectMessage([HindSiteScUiProxy.name, this.APICommand.name, JSON.stringify(commandData, null, 2)], err));
              break;

            case APICommandFlag.ToggleCompactCss:
              this.ToggleCompactCss(commandData)
                .then((scUiReturnPayload: IScUiReturnPayload) => returnPayload = scUiReturnPayload)
                .catch((err) => this.ErrorHand.FormatRejectMessage([HindSiteScUiProxy.name, this.APICommand.name, JSON.stringify(commandData, null, 2)], err));
              break;

            case APICommandFlag.SetStateOfSitecoreWindowAsync:
              this.SetStateOfSitecoreWindowAsync(commandData)
                .then((scUiReturnPayload: IScUiReturnPayload) => returnPayload = scUiReturnPayload)
                .catch((err) => this.ErrorHand.FormatRejectMessage([HindSiteScUiProxy.name, this.APICommand.name, JSON.stringify(commandData, null, 2)], err));
              break;

            case APICommandFlag.CEGoSelected:
              this.CEGoSelected(commandData)
                .then((scUiReturnPayload: IScUiReturnPayload) => returnPayload = scUiReturnPayload)
                .catch((err) => this.ErrorHand.FormatRejectMessage([HindSiteScUiProxy.name, this.APICommand.name, JSON.stringify(commandData, null, 2)], err));
              break;

            case APICommandFlag.OpenContentEditor:
              this.OpenContentEditor(commandData)
                .then((scUiReturnPayload: IScUiReturnPayload) => returnPayload = scUiReturnPayload)
                .catch((err) => this.ErrorHand.FormatRejectMessage([HindSiteScUiProxy.name, this.APICommand.name, JSON.stringify(commandData, null, 2)], err));
              break;

            case APICommandFlag.AdminB:
              this.AdminB(commandData)
                .then((scUiReturnPayload: IScUiReturnPayload) => returnPayload = scUiReturnPayload)
                .catch((err) => this.ErrorHand.FormatRejectMessage([HindSiteScUiProxy.name, this.APICommand.name, JSON.stringify(commandData, null, 2)], err));
              break;

            default:
          }
        })
        .then(() => resolve(returnPayload))
        .catch((err) => reject(this.ErrorHand.FormatRejectMessage([HindSiteScUiProxy.name, this.GetStateOfScUiProxy.name], err)));


      this.Logger.FuncEnd([HindSiteScUiProxy.name, this.APICommand.name], APICommandFlag[commandData.APICommand]);
    });
  }

  private DefaultReturnPayload(): IScUiReturnPayload {
    let defaultVal: IScUiReturnPayload = {
      StateOfScUi: null,
    }
    return defaultVal;
  }

  private async GetStateOfScUiProxy(apiCallPayload: IToApiCallPayload): Promise<IScUiReturnPayload> {
    return new Promise(async (resolve, reject) => {
      let returnPayload: IScUiReturnPayload = this.DefaultReturnPayload();
      await this.StartUp()
        .then(() => this.ScWindowFacade.GetStateOfScUiProxy(apiCallPayload.SnapShotFlavor))
        .then((stateOfScUi: IStateOfScUi) => returnPayload.StateOfScUi = stateOfScUi)
        .then(() => resolve(returnPayload))
        .catch((err) => this.ErrorHand.HandleFatalError([HindSiteScUiProxy.name, this.GetStateOfScUiProxy.name], err));
    });
  }

  private async AddContentEditorToDesktopAsync(apiCallPayload: IToApiCallPayload): Promise<IScUiReturnPayload> {
    return new Promise(async (resolve, reject) => {
      let returnPayload: IScUiReturnPayload = this.DefaultReturnPayload();
      await this.StartUp()
        .then(() => (<DesktopProxy>this.ScWindowFacade.StateFullProxy).AddContentEditorFrameAsync())
        .then(() => resolve(returnPayload))
        .catch((err: any) => reject(err));
    });
  }

  private async PublischActiveCE(apiCallPayload: IToApiCallPayload): Promise<IScUiReturnPayload> {
    return new Promise(async (resolve, reject) => {
      let returnPayload: IScUiReturnPayload = this.DefaultReturnPayload();
      await this.StartUp()
        .then(() => this.ScWindowFacade.PublishActiveCE())
        .then(() => resolve(returnPayload))
        .catch((err: any) => reject(this.ErrorHand.FormatRejectMessage([HindSiteScUiProxy.name, this.PublischActiveCE.name], err)));
    });
  }

  private async ToggleCompactCss(apiCallPayload: IToApiCallPayload): Promise<IScUiReturnPayload> {
    return new Promise(async (resolve, reject) => {
      let returnPayload: IScUiReturnPayload = this.DefaultReturnPayload();
      await this.StartUp()
        //await this.ToggleCompactCss()
        .then(() => resolve(returnPayload))
        .catch((err: any) => reject(err));
    });
  }

  private async SetStateOfSitecoreWindowAsync(apiCallPayload: IToApiCallPayload): Promise<IScUiReturnPayload> {
    return new Promise(async (resolve, reject) => {
      let returnPayload: IScUiReturnPayload = this.DefaultReturnPayload();
      await this.StartUp()
        .then(() => this.ScWindowFacade.SetStateOfScWin(apiCallPayload.DataOneWindowStorage))
        .then(() => resolve(returnPayload))
        .catch((err: any) => reject(err));
    });
  }

  private async CEGoSelected(apiCallPayload: IToApiCallPayload): Promise<IScUiReturnPayload> {
    return new Promise(async (resolve, reject) => {
      let returnPayload: IScUiReturnPayload = this.DefaultReturnPayload();
      await this.StartUp()
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

  private async TriggerCERibbonCommand(apiCallPayload: IToApiCallPayload): Promise<IScUiReturnPayload> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart([HindSiteScUiProxy.name, this.TriggerCERibbonCommand.name], APICommandFlag[apiCallPayload.APICommand]);
      let returnPayload: IScUiReturnPayload = this.DefaultReturnPayload();
      await this.StartUp()
        .then(() => {
          if ((typeof apiCallPayload.APICommand !== 'undefined') && apiCallPayload.APICommand !== APICommandFlag.Unknown) {
            this.ScWindowFacade.TriggerCERibbonCommand(apiCallPayload.APICommand);
          } else {
            this.ErrorHand.WarningAndContinue(this.TriggerCERibbonCommand.name, 'Invalid scRibbonCommand');
          }
        })
        .then(() => resolve(returnPayload))
        .catch((err: any) => reject(this.ErrorHand.FormatRejectMessage(this.TriggerCERibbonCommand.name, err)));
      this.Logger.FuncEnd([HindSiteScUiProxy.name, this.TriggerCERibbonCommand.name]);
    });
  }

  private async OpenContentEditor(apiCallPayload: IToApiCallPayload): Promise<IScUiReturnPayload> {
    throw new Error("Method not implemented.");
  }

  private async AdminB(apiCallPayload: IToApiCallPayload): Promise<IScUiReturnPayload> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart([HindSiteScUiProxy.name, this.TriggerCERibbonCommand.name], APICommandFlag[apiCallPayload.APICommand]);
      let returnPayload: IScUiReturnPayload = this.DefaultReturnPayload();
      await this.StartUp()
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