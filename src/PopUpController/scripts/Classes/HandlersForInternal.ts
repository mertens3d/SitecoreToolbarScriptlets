﻿import { _HindeCoreBase } from "../../../Shared/scripts/LoggableBase";
import { IHindeCore } from "../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IAbsoluteUrl } from "../../../Shared/scripts/Interfaces/IAbsoluteUrl";
import { ICommandHandlerDataForPopUp } from "../../../Shared/scripts/Interfaces/ICommandHandlerDataForPopUp";
import { BrowserTabAgent } from "../Agents/BrowserTabAgent";
import { QueryStrKey } from "../../../Shared/scripts/Enums/QueryStrKey";
import { IUiCommandFlagRaisedEvent_Payload } from "../../../Shared/scripts/Events/UiCommandFlagRaisedEvent/IUiCommandFlagRaisedEvent_Payload";

export class HandlersForInternal extends _HindeCoreBase {
  private BrowserTabAgent: BrowserTabAgent;

  constructor(hindeCore: IHindeCore, browserTabAgent: BrowserTabAgent) {
    super(hindeCore);
    this.BrowserTabAgent = browserTabAgent;
  }

  CloseWindow(evt: any) {
    window.close();
  }

  async HandlerForSnapShotRestoreTBDTab(data: ICommandHandlerDataForPopUp): Promise<void> {
    //TBD = To Be Determined
    this.Logger.FuncStart(this.HandlerForSnapShotRestoreTBDTab.name);
    try {
      if (!data.Evt.ctrlKey) {
        //await this.HandlerForSnapShotRestoreSameTab(data);
      } else {
        //todo - put back maybe await this.HandlerForSnapShotRestoreNewTab(data);
      }
    } catch (err) {
      throw (err);
    }
    this.Logger.FuncEnd(this.HandlerForSnapShotRestoreTBDTab.name);
  }

  async HandlerForSnapShotRestoreNewTab(uiCommandFlagRaisedEvent_Payload: IUiCommandFlagRaisedEvent_Payload) {
    this.Logger.FuncStart(this.HandlerForSnapShotRestoreNewTab.name);

    this.BrowserTabAgent.SetQueryStringKeyValue(QueryStrKey.hsTargetSs, uiCommandFlagRaisedEvent_Payload.StateOfPopUp.SelectSnapShotId.Raw);

    let newUrl: IAbsoluteUrl = this.BrowserTabAgent.GetFullUrl();

    await this.CreateNewWindow(newUrl)
      .catch((ex) => {
        this.Logger.ErrorAndThrow(this.HandlerForSnapShotRestoreNewTab.name, ex.toString());
      });

    this.Logger.FuncEnd(this.HandlerForSnapShotRestoreNewTab.name);
  }

  CreateNewWindow(tabUrl: IAbsoluteUrl): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.CreateNewWindow.name);

      await this.BrowserTabAgent.CreateNewTab(tabUrl)
        .then(() => resolve())
        .catch((err) => reject(err));

      this.Logger.FuncEnd(this.CreateNewWindow.name);
    });
  }
}