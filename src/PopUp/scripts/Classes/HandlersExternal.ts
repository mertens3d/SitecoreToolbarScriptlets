import { LoggableBase } from "../../../Content/scripts/Managers/LoggableBase";
import { IDataContentReplyReceivedEvent_Payload } from "../../../Content/scripts/Proxies/Desktop/DesktopProxy/Events/ContentReplyReceivedEvent/IDataContentReplyReceivedEvent_Payload";
import { MsgFlag } from "../../../Shared/scripts/Enums/1xxx-MessageFlag";
import { QueryStrKey } from "../../../Shared/scripts/Enums/QueryStrKey";
import { SettingFlavor } from "../../../Shared/scripts/Enums/SettingFlavor";
import { Guid } from "../../../Shared/scripts/Helpers/Guid";
import { ILoggerAgent } from "../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { ISettingsAgent } from "../../../Shared/scripts/Interfaces/Agents/ISettingsAgent";
import { IAbsoluteUrl } from "../../../Shared/scripts/Interfaces/IAbsoluteUrl";
import { ICommandHandlerDataForPopUp } from "../../../Shared/scripts/Interfaces/ICommandHandlerDataForPopUp";
import { IStateOfPopUp } from "../../../Shared/scripts/Interfaces/IMsgPayload";
import { PopUpMessagesBrokerAgent } from "../Agents/PopUpMessagesBrokerAgent";
import { BrowserTabAgent } from "../Managers/TabManager";
import { SelectSnapshotModule } from "../UiModules/SelectSnapshotModule/SelectSnapshotModule";

export class HandlersExternalEvent extends LoggableBase {
  private SettingsAgent: ISettingsAgent;
  private BrowserTabAgent: BrowserTabAgent;
  private PopUPMessageBroker: PopUpMessagesBrokerAgent;
    ModuleSelectSnapShots: SelectSnapshotModule;

  constructor(logger: ILoggerAgent, settingsAgent: ISettingsAgent, browserTabAgent: BrowserTabAgent, popUpMessagesBroker: PopUpMessagesBrokerAgent, moduleSelectSnapShots: SelectSnapshotModule) {
    super(logger);
    this.SettingsAgent = settingsAgent;
    this.PopUPMessageBroker = popUpMessagesBroker;
    this.BrowserTabAgent = browserTabAgent;
    this.ModuleSelectSnapShots = moduleSelectSnapShots;
  }

  private GetStateOfPopUp(msgFlag: MsgFlag, data: ICommandHandlerDataForPopUp): IStateOfPopUp {
    this.Logger.FuncStart(this.GetStateOfPopUp.name);

    let settingsToSend = this.SettingsAgent.GetSettingsByFlavor([SettingFlavor.ContentAndPopUpStoredInPopUp, SettingFlavor.ContentOnly]);

    //stateOfPopUp.Payload.IdOfSelect = data.MenuState.SelectSnapshotId;

    var stateOfPopUp: IStateOfPopUp = {
      MsgFlag: msgFlag,
      WindowType: this.BrowserTabAgent.GetWindowType(),
      SelectSnapshotId: this.ModuleSelectSnapShots.GetSelectSnapshotId(),
      CurrentContentPrefs: settingsToSend,
      IsValid: false,
      CurrentNicknameValue: '',
      SnapShotNewNickname: '',
      ToastMessage: ''

    }



    //(msgFlag, , , settingsToSend);
    //this.Logger.FuncEnd(this.GetStateOfPopUp.name);
    return stateOfPopUp;
  }

  SendMessageToContentAsync(stateOfPopUp: IStateOfPopUp): Promise<IDataContentReplyReceivedEvent_Payload> {
    return new Promise(async (resolve, reject) => {
      this.PopUPMessageBroker.SendMessageToContentAsync(stateOfPopUp)
        .then((result: IDataContentReplyReceivedEvent_Payload) => resolve(result))
        .catch((err) => reject(err));
    });
  }

  async AddCETab(commandHndlrData: ICommandHandlerDataForPopUp) {
    return new Promise<void>(async (resolve, reject) => {
      let stateOfPopUp: IStateOfPopUp = commandHndlrData.EventMan.Handlers.External.GetStateOfPopUp(MsgFlag.ReqAddCETab, commandHndlrData);

      this.PopUPMessageBroker.SendCommandToContent(stateOfPopUp)
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  }

  async PutAdminB(data: ICommandHandlerDataForPopUp) {
    return new Promise<void>(async (resolve, reject) => {
      let stateOfPopUp: IStateOfPopUp = data.EventMan.Handlers.External.GetStateOfPopUp(MsgFlag.ReqAdminB, data);

      await data.EventMan.PopUpMesssageBrokerAgent.SendCommandToContent(stateOfPopUp)
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  }

  async QuickPublish(data: ICommandHandlerDataForPopUp) {
    return new Promise<void>(async (resolve, reject) => {
      let stateOfPopUp: IStateOfPopUp = data.EventMan.Handlers.External.GetStateOfPopUp(MsgFlag.ReqQuickPublish, data);

      await data.EventMan.PopUpMesssageBrokerAgent.SendCommandToContent(stateOfPopUp)
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  }

  async HandlerForSnapShotCreate(data: ICommandHandlerDataForPopUp) {
    return new Promise<void>(async (resolve, reject) => {
      let stateOfPopUp: IStateOfPopUp = data.EventMan.Handlers.External.GetStateOfPopUp(MsgFlag.ReqTakeSnapShot, data);

      await data.EventMan.PopUpMesssageBrokerAgent.SendCommandToContent(stateOfPopUp)
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  }

  async HandlerForSnapShotRestoreTBDTab(data: ICommandHandlerDataForPopUp): Promise<void> {
    //TBD = To Be Determined
    data.EventMan.Handlers.External.Logger.FuncStart(data.EventMan.Handlers.External.HandlerForSnapShotRestoreTBDTab.name);
    try {
      if (!data.Evt.ctrlKey) {
        await data.EventMan.Handlers.External.HandlerForSnapShotRestoreSameTab(data);
      } else {
        await data.EventMan.Handlers.External.HandlerForSnapShotRestoreNewTab(data);
      }
    } catch (err) {
      throw (err);
    }
    data.EventMan.Handlers.External.Logger.FuncEnd(data.EventMan.Handlers.External.HandlerForSnapShotRestoreTBDTab.name);
  }

  async HandlerForPing(data: ICommandHandlerDataForPopUp): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      let stateOfPopUp: IStateOfPopUp = data.EventMan.Handlers.External.GetStateOfPopUp(MsgFlag.Ping, data);

      await data.EventMan. PopUpMesssageBrokerAgent.SendCommandToContent(stateOfPopUp)
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  }

  async HandlerForSnapShotRestoreSameTab(data: ICommandHandlerDataForPopUp): Promise<void> {
    return new Promise(async (resolve, reject) => {
      data.EventMan.Handlers.External.Logger.FuncStart(data.EventMan.Handlers.External.HandlerForSnapShotRestoreSameTab.name);

      var stateOfPopUp = data.EventMan.Handlers.External.GetStateOfPopUp(MsgFlag.ReqSetStateOfSitecoreWindow, data);
      
     

      await data.EventMan.PopUpMesssageBrokerAgent.SendCommandToContent(stateOfPopUp)
        .then(() => resolve())
        .catch((ex) => reject(ex));

      data.EventMan.Handlers.External.Logger.FuncEnd(data.EventMan.Handlers.External.HandlerForSnapShotRestoreSameTab.name);
    });
  }

  async HandlerForSnapShotRestoreNewTab(data: ICommandHandlerDataForPopUp) {
    data.EventMan.Handlers.External.Logger.FuncStart(data.EventMan.Handlers.External.HandlerForSnapShotRestoreNewTab.name);

    this.ModuleSelectSnapShots
    data.EventMan.Handlers.External.BrowserTabAgent.SetQueryStringKeyValue(QueryStrKey.hsTargetSs, data.EventMan.SelectSnapShotModule.GetSelectSnapshotId().Raw);

    let newUrl: IAbsoluteUrl = data.EventMan.Handlers.External.BrowserTabAgent.GetFullUrl();

    await data.EventMan.Handlers.External.HandlerForCreateNewWindow(data, newUrl)
      .catch((ex) => {
        data.EventMan.Handlers.External.Logger.ErrorAndThrow(data.EventMan.Handlers.External.HandlerForSnapShotRestoreSameTab.name, ex.toString());
      });

    data.EventMan.Handlers.External.Logger.FuncEnd(this.HandlerForSnapShotRestoreNewTab.name);
  }

  async HandlerForSnapShotUpdateNickName(data: ICommandHandlerDataForPopUp) {
    return new Promise<void>(async (resolve, reject) => {
      let stateOfPopUp: IStateOfPopUp = data.EventMan.Handlers.External.GetStateOfPopUp(MsgFlag.ReqUpdateNickName, data);

  

      await data.EventMan.PopUpMesssageBrokerAgent.SendCommandToContent(stateOfPopUp)
        .then(() => resolve())
        .catch((err) => reject(err));
    })
  }

  HandlerForCancelOperation(data: ICommandHandlerDataForPopUp) {
  }

  HandlerForToggleFavorite(data: ICommandHandlerDataForPopUp) {
    return new Promise<void>(async (resolve, reject) => {
      var stateOfPopUp: IStateOfPopUp = data.EventMan.Handlers.External.GetStateOfPopUp(MsgFlag.ReqMarkFavorite, data);
      await data.EventMan.PopUpMesssageBrokerAgent.SendCommandToContent(stateOfPopUp)
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  }

  HandlerForSnapShotRemove(data: ICommandHandlerDataForPopUp) {
    return new Promise<void>(async (resolve, reject) => {
      let stateOfPopUp: IStateOfPopUp = data.EventMan.Handlers.External.GetStateOfPopUp(MsgFlag.ReqRemoveFromStorage, data);

      var result: boolean = confirm('Remove ?: ' + Guid.AsShort(stateOfPopUp.SelectSnapshotId));
      if (result === true) {
        await data.EventMan.PopUpMesssageBrokerAgent.SendCommandToContent(stateOfPopUp)
          .then(() => resolve())
          .catch((err) => reject(err));
      } else {
        reject('Canceled');
      }
    });
  }

  HandlerForCompactCE(data: ICommandHandlerDataForPopUp) {
    return new Promise<void>(async (resolve, reject) => {
      let stateOfPupUp: IStateOfPopUp = data.EventMan.Handlers.External.GetStateOfPopUp(MsgFlag.ReqToggleCompactCss, data);

      await data.EventMan.PopUpMesssageBrokerAgent.SendCommandToContent(stateOfPupUp)
        .then(() => resolve())
        .catch((err) => reject(err));
    })
  }

  HandlerForCreateNewWindow(data: ICommandHandlerDataForPopUp, tabUrl: IAbsoluteUrl): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.HandlerForCreateNewWindow.name);

      await this.BrowserTabAgent.CreateNewTab(tabUrl)
        .then(() => resolve())
        .catch((err) => reject(err));

      this.Logger.FuncEnd(this.HandlerForCreateNewWindow.name);
    });
  }

  HandlerForPresentationDetails(data: ICommandHandlerDataForPopUp) {
    this.Logger.ErrorAndThrow(this.HandlerForPresentationDetails.name, 'to do');
  }
}