﻿import { DocumentJacket } from "../../DOMJacket/DocumentJacket";
import { SnapShotFlavor } from "../../Shared/scripts/Enums/SnapShotFlavor";
import { IHindSiteScUiAPI } from "../../Shared/scripts/Interfaces/Agents/IContentApi/IContentApi";
import { IHindeCore } from "../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { IScWindowFacade } from "../../Shared/scripts/Interfaces/Agents/IScWindowManager/IScWindowManager";
import { IStateOfScUi } from "../../Shared/scripts/Interfaces/Data/States/IDataStateOfSitecoreWindow";
import { IApiCallPayload } from "../../Shared/scripts/Interfaces/IApiCallPayload";
import { _HindeCoreBase } from "../../Shared/scripts/LoggableBase";
import { ScUiManager } from "./Managers/SitecoreUiManager/SitecoreUiManager";
import { DesktopSFProxy } from "./Proxies/Desktop/DesktopProxy/DesktopProxy";
import { ScWindowFacade } from "./Proxies/ScWindowProxy";

export class HindSiteScUiAPI extends _HindeCoreBase implements IHindSiteScUiAPI {
  private ScUiMan: ScUiManager;
  private ScWindowFacade: IScWindowFacade;
  DocumentJacket: DocumentJacket;

  constructor(hindeCore: IHindeCore, scUiMan: ScUiManager, documentJacket: DocumentJacket) {
    super(hindeCore);

    this.Logger.CTORStart(HindSiteScUiAPI.name);

    this.ScUiMan = scUiMan;
    this.DocumentJacket = documentJacket;

    this.Logger.CTOREnd(HindSiteScUiAPI.name);
  }

  public async InstantiateHindSiteScUiProxy() {
    this.Logger.FuncStart(this.InstantiateHindSiteScUiProxy.name);
    try {
      this.ScWindowFacade = new ScWindowFacade(this.HindeCore, this.DocumentJacket);
      await this.ScWindowFacade.InstantiateAsyncMembers_ScWindowFacade();
    }
    catch (err) {
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

      if (this.ScWindowFacade) {
        await this.ScWindowFacade.GetStateOfScUiProxy(SnapShotFlavor.Live)
          .then((result: IStateOfScUi) => reply = result)
          .then(() => reply.ErrorStackScUiProxy = this.ErrorHand.ErrorStack)
          .then(() => resolve(reply))
          .catch((err) => reject(err));
      } else {
        resolve(reply);
      }
    });
  }

  AddContentEditorToDesktopAsync(apiCallPayload: IApiCallPayload): Promise<void> {
    return new Promise(async (resolve, reject) => {
      (<DesktopSFProxy>this.ScWindowFacade.StateFullProxy).AddContentEditorFrameAsync()
        .then(() => resolve())
        .catch((err) => reject());
    });
  }

  PublischActiveCE(commandData: IApiCallPayload): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.ScWindowFacade.PublishActiveCE()
        .then(() => resolve())
        .ca;
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
    this.ScUiMan.AdminB(this.DocumentJacket, null);
  }
}