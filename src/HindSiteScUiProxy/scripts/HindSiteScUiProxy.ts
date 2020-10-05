import { SnapShotFlavor } from "../../Shared/scripts/Enums/SnapShotFlavor";
import { IHindSiteScUiAPI } from "../../Shared/scripts/Interfaces/Agents/IContentApi/IContentApi";
import { IHindeCore } from "../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { IScWindowFacade } from "../../Shared/scripts/Interfaces/Agents/IScWindowManager/IScWindowManager";
import { IStateOfScUi } from "../../Shared/scripts/Interfaces/Data/States/IDataStateOfSitecoreWindow";
import { IApiCallPayload } from "../../Shared/scripts/Interfaces/IApiCallPayload";
import { _HindeCoreBase } from "../../Shared/scripts/LoggableBase";
import { ScUiManager } from "./Managers/SitecoreUiManager/SitecoreUiManager";
import { ScDocumentFacade } from "../Facades/ScDocumentFacade";
import { ScWindowFacade } from "./Proxies/ScWindowProxy";
import { ContentEditorSFProxy } from "./Proxies/ContentEditor/ContentEditorProxy/ContentEditorProxy";
import { DesktopSFProxy } from "./Proxies/Desktop/DesktopProxy/DesktopProxy";

export class HindSiteScUiAPI extends _HindeCoreBase implements IHindSiteScUiAPI {
  private ScUiMan: ScUiManager;
  private ScWindowFacade: IScWindowFacade;
  private TopDocumentFacade: ScDocumentFacade;

  constructor(hindeCore: IHindeCore, scUiMan: ScUiManager, documentFacade: ScDocumentFacade) {
    super(hindeCore);

    this.Logger.CTORStart(HindSiteScUiAPI.name);

    this.ScUiMan = scUiMan;
    this.TopDocumentFacade = documentFacade;

    this.Logger.CTOREnd(HindSiteScUiAPI.name);
  }

  public async InstantiateHindSiteScUiProxy() {
    this.Logger.FuncStart(this.InstantiateHindSiteScUiProxy.name);
    try {
      this.ScWindowFacade = new ScWindowFacade(this.HindeCore, this.TopDocumentFacade);
      await this.ScWindowFacade.Instantiate_ScWindowFacade();
    } catch (err) {
      this.ErrorHand.ErrorAndThrow(this.InstantiateHindSiteScUiProxy.name, err);
    }

    this.Logger.FuncEnd(this.InstantiateHindSiteScUiProxy.name);
  }

  GetStateOfScUiProxyWindow(snapshotFlavor: SnapShotFlavor): Promise<IStateOfScUi> {
    return this.ScWindowFacade.GetStateOfScUiProxy(snapshotFlavor);
  }

  GetStateOfScUiProxy(): Promise<IStateOfScUi> {
    return new Promise(async (resolve, reject) => {
      let reply: IStateOfScUi = null;

      await this.ScWindowFacade.GetStateOfScUiProxy(SnapShotFlavor.Live)
        .then((result: IStateOfScUi) => reply = result)
        .then(() => reply.ErrorStackScUiProxy = this.ErrorHand.ErrorStack)
        .then(() => resolve(reply))
        .catch((err) => reject(err))
    });
  }

  AddContentEditorToDesktopAsync(apiCallPayload: IApiCallPayload): Promise<void> {
    return new Promise(async (resolve, reject) => {
      (<DesktopSFProxy>this.ScWindowFacade.StateFullProxy).AddContentEditorAsync()
        .then(() => resolve())
        .catch((err) => reject())
    });
  }

  PublischActiveCE(commandData: IApiCallPayload): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.ScWindowFacade.PublishActiveCE()
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

  SetStateOfSitecoreWindowAsync(commandData: IApiCallPayload, dataOneWindowStorage: IStateOfScUi): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.ScWindowFacade.SetStateOfScWin(dataOneWindowStorage)
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  }

  OpenContentEditor() {
    throw new Error("Method not implemented.");
  }

  AdminB(commandData: IApiCallPayload) {
    this.ScUiMan.AdminB(this.TopDocumentFacade, null);
  }
}