import { LoggableBase } from "../../../Content/scripts/Managers/LoggableBase";
import { HindSiteSettingWrapper } from "../../../Shared/scripts/Agents/Agents/SettingsAgent/HindSiteSettingWrapper";
import { MsgFlag } from "../../../Shared/scripts/Enums/1xxx-MessageFlag";
import { QueryStrKey } from "../../../Shared/scripts/Enums/QueryStrKey";
import { SettingFlavor } from "../../../Shared/scripts/Enums/SettingFlavor";
import { IHindSiteSetting } from "../../../Shared/scripts/Interfaces/Agents/IGenericSetting";
import { ILoggerAgent } from "../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { ISettingsAgent } from "../../../Shared/scripts/Interfaces/Agents/ISettingsAgent";
import { IAbsoluteUrl } from "../../../Shared/scripts/Interfaces/IAbsoluteUrl";
import { ICommandHandlerDataForPopUp } from "../../../Shared/scripts/Interfaces/ICommandHandlerDataForPopUp";
import { IStateOfPopUp } from "../../../Shared/scripts/Interfaces/IMsgPayload";
import { BrowserTabAgent } from "../Managers/BrowserTabAgent";
import { SelectSnapshotModule } from "../UiModules/SelectSnapshotModule/SelectSnapshotModule";

export class HandlersForInternal extends LoggableBase {
  private SettingsAgent: ISettingsAgent;
  private BrowserTabAgent: BrowserTabAgent;
  ModuleSelectSnapShots: SelectSnapshotModule;

  constructor(logger: ILoggerAgent, settingsAgent: ISettingsAgent, browserTabAgent: BrowserTabAgent, moduleSelectSnapShots: SelectSnapshotModule) {
    super(logger);
    this.SettingsAgent = settingsAgent;
    this.BrowserTabAgent = browserTabAgent;
    this.ModuleSelectSnapShots = moduleSelectSnapShots;
  }

  public GetStateOfPopUp(msgFlag: MsgFlag): IStateOfPopUp {
    this.Logger.FuncStart(this.GetStateOfPopUp.name);

    let wrappedSettings: HindSiteSettingWrapper[] = this.SettingsAgent.GetSettingsByFlavor([SettingFlavor.ContentAndPopUpStoredInPopUp, SettingFlavor.ContentOnly]);

    let settingsToSend: IHindSiteSetting[] = [];
    wrappedSettings.forEach((wrappedSetting: HindSiteSettingWrapper) => settingsToSend.push(wrappedSetting.HindSiteSetting));

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

    return stateOfPopUp;
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

    this.ModuleSelectSnapShots
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