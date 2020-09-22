import { LoggableBase } from "../../../Content/scripts/Managers/LoggableBase";
import { QueryStrKey } from "../../../Shared/scripts/Enums/QueryStrKey";
import { ILoggerAgent } from "../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IAbsoluteUrl } from "../../../Shared/scripts/Interfaces/IAbsoluteUrl";
import { ICommandHandlerDataForPopUp } from "../../../Shared/scripts/Interfaces/ICommandHandlerDataForPopUp";
import { BrowserTabAgent } from "../Managers/BrowserTabAgent";

export class HandlersForInternal extends LoggableBase {
  private BrowserTabAgent: BrowserTabAgent;


  constructor(logger: ILoggerAgent, browserTabAgent: BrowserTabAgent) {
    super(logger);
    this.BrowserTabAgent = browserTabAgent;
  
  }


  CloseWindow(evt: any) {
    window.close();
  }

  async HandlerForSnapShotRestoreTBDTab(data: ICommandHandlerDataForPopUp): Promise<void> {
    //TBD = To Be Determined
    data.EventMan.Handlers.Logger.FuncStart(data.EventMan.Handlers.HandlerForSnapShotRestoreTBDTab.name);
    try {
      if (!data.Evt.ctrlKey) {
        //await data.EventMan.Handlers.HandlerForSnapShotRestoreSameTab(data);
      } else {
        await data.EventMan.Handlers.HandlerForSnapShotRestoreNewTab(data);
      }
    } catch (err) {
      throw (err);
    }
    data.EventMan.Handlers.Logger.FuncEnd(data.EventMan.Handlers.HandlerForSnapShotRestoreTBDTab.name);
  }

  async HandlerForSnapShotRestoreNewTab(data: ICommandHandlerDataForPopUp) {
    data.EventMan.Handlers.Logger.FuncStart(data.EventMan.Handlers.HandlerForSnapShotRestoreNewTab.name);

    data.EventMan.Handlers.BrowserTabAgent.SetQueryStringKeyValue(QueryStrKey.hsTargetSs, data.EventMan.SelectSnapShotModule.GetSelectSnapshotId().Raw);

    let newUrl: IAbsoluteUrl = data.EventMan.Handlers.BrowserTabAgent.GetFullUrl();

    await data.EventMan.Handlers.CreateNewWindow(data, newUrl)
      .catch((ex) => {
        data.EventMan.Handlers.Logger.ErrorAndThrow(data.EventMan.Handlers.HandlerForSnapShotRestoreNewTab.name, ex.toString());
      });

    data.EventMan.Handlers.Logger.FuncEnd(this.HandlerForSnapShotRestoreNewTab.name);
  }

  CreateNewWindow(data: ICommandHandlerDataForPopUp, tabUrl: IAbsoluteUrl): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.CreateNewWindow.name);

      await this.BrowserTabAgent.CreateNewTab(tabUrl)
        .then(() => resolve())
        .catch((err) => reject(err));

      this.Logger.FuncEnd(this.CreateNewWindow.name);
    });
  }
}