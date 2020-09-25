import { LoggableBase } from "../../../Shared/scripts/LoggableBase";
import { ILoggerAgent } from "../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IAbsoluteUrl } from "../../../Shared/scripts/Interfaces/IAbsoluteUrl";
import { ICommandHandlerDataForPopUp } from "../../../Shared/scripts/Interfaces/ICommandHandlerDataForPopUp";
import { PopUpBrowserTabAgent } from "../Managers/PopUpBrowserTabAgent";
import { IUiCommandFlagRaisedEvent_Payload } from "../Events/UiCommandFlagRaisedEvent/IUiCommandFlagRaisedEvent_Payload";
import { QueryStrKey } from "../../../Shared/scripts/Enums/QueryStrKey";

export class HandlersForInternal extends LoggableBase {
  private PopUpBrowserTabAgent: PopUpBrowserTabAgent;

  constructor(logger: ILoggerAgent, browserTabAgent: PopUpBrowserTabAgent) {
    super(logger);
    this.PopUpBrowserTabAgent = browserTabAgent;
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

    this.PopUpBrowserTabAgent.SetQueryStringKeyValue(QueryStrKey.hsTargetSs, uiCommandFlagRaisedEvent_Payload.StateOfPopUp.SelectSnapShotId.Raw);

    let newUrl: IAbsoluteUrl = this.PopUpBrowserTabAgent.GetFullUrl();

    await this.CreateNewWindow(newUrl)
      .catch((ex) => {
        this.Logger.ErrorAndThrow(this.HandlerForSnapShotRestoreNewTab.name, ex.toString());
      });

    this.Logger.FuncEnd(this.HandlerForSnapShotRestoreNewTab.name);
  }

  CreateNewWindow(tabUrl: IAbsoluteUrl): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.CreateNewWindow.name);

      await this.PopUpBrowserTabAgent.CreateNewTab(tabUrl)
        .then(() => resolve())
        .catch((err) => reject(err));

      this.Logger.FuncEnd(this.CreateNewWindow.name);
    });
  }
}