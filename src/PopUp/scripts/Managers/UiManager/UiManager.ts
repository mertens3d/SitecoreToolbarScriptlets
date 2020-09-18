import { ScUrlAgent } from '../../../../Shared/scripts/Agents/Agents/UrlAgent/ScUrlAgent';
import { BuiltDateStamp } from '../../../../Shared/scripts/AutoBuild/BuildNum';
import { StaticHelpers } from '../../../../Shared/scripts/Classes/StaticHelpers';
import { MenuCommandKey } from '../../../../Shared/scripts/Enums/2xxx-MenuCommand';
import { SettingKey } from '../../../../Shared/scripts/Enums/3xxx-SettingKey';
import { GuidData } from '../../../../Shared/scripts/Helpers/GuidData';
import { IAccordianManager } from '../../../../Shared/scripts/Interfaces/Agents/IAccordianManager';
import { IGenericSetting } from '../../../../Shared/scripts/Interfaces/Agents/IGenericSetting';
import { ILoggerAgent } from '../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { IUiVisibilityTestAgent } from "../../../../Shared/scripts/Interfaces/Agents/IUiVisibilityTestProctorAgent";
import { ISettingsAgent } from '../../../../Shared/scripts/Interfaces/Agents/ISettingsAgent';
import { IDataStateOfSitecoreWindow } from "../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfSitecoreWindow";
import { IDataStateOfStorageSnapShots } from '../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfStorageSnapShots';
import { ISelectSnapUiMutationEvent_Payload } from '../../Events/SelectSnapUiMutationEvent/ISelectSnapUiMutationEvent_Payload';
import { CommandManager } from '../../Classes/AllCommands';
import { PopConst } from '../../Classes/PopConst';
import { BrowserTabAgent } from '../TabManager';
import { UiStateManager } from '../UiButtonStateManager';
import { SelectSnapshotModule } from '../../UiModules/SelectSnapshotModule/SelectSnapshotModule';
import { SettingsModule } from '../../UiModules/SettingsModule/SettingsModule';
import { FeedbackModuleBrowserState } from '../../UiModules/UiFeedbackModules/FeedbackModuleBrowserState';
import { CancelButtonModule } from '../../UiModules/ButtonModules/CancelButtonModule';
import { FeedbackModuleMessages_Observer } from '../../UiModules/UiFeedbackModules/FeedbackModuleMessages';
import { FeedbackModulePopUpState } from '../../UiModules/UiFeedbackModules/FeedbackModulePopUpState';
import { UiFeedbackModuleLog } from '../../UiModules/UiFeedbackModules/UiFeedbackModuleLog';
import { FeedbackModuleContentState } from '../../UiModules/UiFeedbackModules/FeedbackModuleContentState';
import { UiSelectSnapshotMutationEvent_Observer } from '../../Events/SelectSnapUiMutationEvent/UiSelectSnapshotMutatedEvent_Observer';
import { AccordianModulesManager } from '../../UiModules/AccordianModule/AccordianManager';
import { UiVisibilityTestAgent } from './UiVisibilityTestAgent';
import { UiRefreshData } from '../../../../Shared/scripts/Interfaces/MenuCommand';
import { IMenuCommandDefinition } from "../../../../Shared/scripts/Interfaces/IMenuCommandDefinition";
import { SelectSnapUiMutationEvent_Observer } from '../../Events/SelectSnapUiMutationEvent/SelectSnapUiMutationEvent_Subject';
import { IDataContentReplyReceivedEvent_Payload } from '../../../../Content/scripts/Proxies/Desktop/DesktopProxy/Events/ContentReplyReceivedEvent/IDataContentReplyReceivedEvent_Payload';

export class UiManager {
  MenuCommandParameters: IMenuCommandDefinition[];
  AccordianModuleManager: IAccordianManager;
  ButtonModulesManager: UiStateManager;
  CancelButtonModule: CancelButtonModule;
  CurrScWindowState: IDataStateOfSitecoreWindow;
  FeedbackModuleMessages: FeedbackModuleMessages_Observer;
  MenuEnabled: boolean = true;
  MenuFocused: boolean = true;
  ModuleFeedbackOfPopUpState: FeedbackModulePopUpState;
  ModuleSelectSnapShots: SelectSnapshotModule;
  OtherFocused: boolean = false;
  ParentFocused: boolean = false;
  private CommandMan: CommandManager;
  private FeedbackModuleLog: UiFeedbackModuleLog;
  private Logger: ILoggerAgent;
  private ModuleFeedbackOfBrowserState: FeedbackModuleBrowserState;
  private ModuleFeedbackOfContentState: FeedbackModuleContentState;
  private SettingsAgent: ISettingsAgent;
  private TabMan: BrowserTabAgent;
  SettingsModule: SettingsModule;
  TabId: string;
  private UiVisibilityTestAgent: IUiVisibilityTestAgent;
  SelectSnapshotModule_Observer: SelectSnapUiMutationEvent_Observer;
  private LastKnownstateOfSitecoreWindow: IDataStateOfSitecoreWindow;
  private LastKnownStateOfStorageSnapShots: IDataStateOfStorageSnapShots;
  LastKnownSelectSnapshotId: any;

  constructor(logger: ILoggerAgent, settingsAgent: ISettingsAgent, tabMan: BrowserTabAgent, commandMan: CommandManager) {
    this.Logger = logger;
    this.SettingsAgent = settingsAgent;
    this.TabMan = tabMan;
    this.CommandMan = commandMan;

    this.Logger.InstantiateStart(UiManager.name);

    this.UiVisibilityTestAgent = new UiVisibilityTestAgent(this.Logger);
    this.ButtonModulesManager = new UiStateManager(this.Logger, this.CommandMan.MenuCommandParamsBucket, this.UiVisibilityTestAgent);
    this.AccordianModuleManager = new AccordianModulesManager(this.Logger, this.SettingsAgent);

    this.BuildModules();
    this.WireEvents();
    this.Logger.InstantiateEnd(UiManager.name);
  }

  BuildModules() {
    this.Logger.FuncStart(this.BuildModules.name);
    this.FeedbackModuleLog = new UiFeedbackModuleLog(this.Logger, PopConst.Const.Selector.HS.FeedbackLogElement);
    this.ModuleFeedbackOfContentState = new FeedbackModuleContentState(this.Logger, PopConst.Const.Selector.HS.FeedbackContentState,);
    this.ModuleFeedbackOfBrowserState = new FeedbackModuleBrowserState(this.Logger, PopConst.Const.Selector.HS.FeedbackBrowserState);
    this.ModuleFeedbackOfPopUpState = new FeedbackModulePopUpState(this.Logger, PopConst.Const.Selector.HS.FeedbackPopUpState);
    this.ModuleSelectSnapShots = new SelectSnapshotModule(this.Logger, PopConst.Const.Selector.HS.SelStateSnapShot)
    this.SettingsModule = new SettingsModule(this.Logger, this.SettingsAgent, this.AccordianModuleManager, '');
    this.CancelButtonModule = new CancelButtonModule(this.Logger, PopConst.Const.Selector.HS.HsCancel, null);
    this.Logger.FuncEnd(this.BuildModules.name);
  }

  WireEvents() {
    this.Logger.FuncStart(this.WireEvents.name);
    this.FeedbackModuleMessages = new FeedbackModuleMessages_Observer(this.Logger, PopConst.Const.Selector.HS.DivOverlayModule);

    this.SelectSnapshotModule_Observer = new SelectSnapUiMutationEvent_Observer(this.Logger, this.RefreshUiUIManagerFromSnapShotSelect.bind(this));
    this.ModuleSelectSnapShots.SelectSnapshotModule_Subject.RegisterObserver(this.SelectSnapshotModule_Observer);

    this.Logger.AddWriter(this.FeedbackModuleLog);
    this.Logger.FuncEnd(this.WireEvents.name);
  }

  InitUiManager() {
    this.Logger.FuncStart(this.InitUiManager.name);

    var self = this;
    //this.Logger.AddDebugTextChangedCallback(self, this.FeedbackModuleDebugData.HndlrDebugTextChanged);

    this.WriteBuildNumToUi();

    this.ModuleSelectSnapShots.Init();
    this.ModuleFeedbackOfBrowserState.Init();
    this.ModuleFeedbackOfContentState.Init();

    //this.MsgMan().SendMessageToContentTab(new MsgFromPopUp(MsgFlag.Ping, this.PopHub), this.TabMan.CurrentTabData);

    this.ScheduleAutoSaveSnapShot();
    this.ScheduleAutoLogin();

    this.ButtonModulesManager.InitButtonStateManager();

    this.Logger.FuncEnd(this.InitUiManager.name);
  }

  OnContentReplyReceivedEventCallBack(dataContentReplyReceivedEvent_Payload: IDataContentReplyReceivedEvent_Payload) {
    this.Logger.FuncStart(this.OnContentReplyReceivedEventCallBack.name);
    this.UpdateUiFromContentReply(dataContentReplyReceivedEvent_Payload.StateOfSitecoreWindow, dataContentReplyReceivedEvent_Payload.StateOfStorageSnapShots);
    this.Logger.FuncEnd(this.OnContentReplyReceivedEventCallBack.name);
  }

  ClosePopUp(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.Logger.FuncStart(this.ClosePopUp.name);
      try {
        this.FeedbackModuleMessages.UpdateMsgStatusStack('Command Completed Successfully');

        let setting: IGenericSetting = this.SettingsAgent.GetByKey(SettingKey.DebugKeepDialogOpen);
        if (!setting.ValueAsBool()) {
          window.close();
        } else {
          this.Logger.Log('Window not closed because of setting: ' + setting.FriendlySetting)
        }
        resolve();
      } catch (err) {
        reject(this.ClosePopUp.name + ' ' + err);
      }
      this.Logger.FuncEnd(this.ClosePopUp.name);
    });
  }

  AutoLogin() {
    //todo - put back ?
    //if (this.CachedState.WindowType === scWindowType.LoginPage) {
    //  this.SendMessageToContent(new MsgFromPopUp(MsgFlag.ReqLoginWithAdminB, this.PopHub));
    //}
  }

  ScheduleAutoSaveSnapShot() {
  }

  ScheduleAutoLogin() {
    //if (AllAgents. SettingsAgent.GetByKey(SettingKey.AutoLogin).ValueAsBool) {
    //  var self = this;

    //  window.setInterval(() => {
    //    self.AutoLogin();
    //  }, this.PopConst().Timeouts.AutoLoginCheckInterval)
    //}
  }

  WriteBuildNumToUi() {
    this.Logger.LogVal('BuiltDateStamp', BuiltDateStamp);

    var targetTag: HTMLElement = document.querySelector(PopConst.Const.Selector.HS.BuildStamp);
    if (targetTag) {
      targetTag.innerText = 'build stamp: ' + StaticHelpers.MakeFriendlyDate(new Date(BuiltDateStamp));
    } else {
      this.Logger.ErrorAndThrow(this.WriteBuildNumToUi.name, 'No Build Stamp Element Found');
    }
  }

  //async UpdateAtticFromUi(): Promise<any> {
  //  this.Logger.FuncStart(this.UpdateAtticFromUi.name);

  //  //let currentSettings: IDataPopUpSettings = await this.PopAtticMan().CurrentSettings();
  //  //let currentVal = (<HTMLInputElement>document.querySelector(PopConst.Const.Selector.HS.iCBoxdSettingsShowLogData)).checked;
  //  //currentVal = true; //todo - remove after debugging
  //  //this.Logger.LogVal('currentVal', currentVal.toString())
  //  //currentSettings.LogSettings.ShowDebugData = currentVal;

  //  //this.PopAtticMan().StoreSettings(currentSettings);
  //  this.RefreshUi();
  //  this.Logger.FuncEnd(this.UpdateAtticFromUi.name);
  //}

  HydrateModules(refreshData: UiRefreshData) {
    this.Logger.FuncStart(this.HydrateModules.name);
    if (refreshData) {
      if (refreshData.StateOfSitecoreWindow) {
        this.ModuleFeedbackOfPopUpState.HydratePopUpStateUI(refreshData);
        this.ModuleFeedbackOfContentState.HydrateContentStateFeedack(refreshData);
        this.ModuleFeedbackOfBrowserState.HydrateFeedackBrowserState(refreshData);
        this.ModuleSelectSnapShots.Hydrate(refreshData);
        this.ButtonModulesManager.HydrateUiModules(refreshData);
      } else {
        this.Logger.ErrorAndThrow(this.HydrateModules.name, 'null state');
      }
    }

    this.Logger.FuncEnd(this.HydrateModules.name);
  }

  RefreshModuleUis() {
    this.ButtonModulesManager.RefreshUiModuleVisibilityStatus();
    this.DrawCorrectNicknameInUI();
    this.ModuleFeedbackOfBrowserState.RefreshUi();
    this.ModuleSelectSnapShots.RefreshUi();
    this.SettingsModule.RefreshUi();
  }

  async RefreshUiUIManagerFromSnapShotSelect(uiData: ISelectSnapUiMutationEvent_Payload) {
    this.Logger.FuncStart(this.RefreshUiUIManagerFromSnapShotSelect.name);

    if (this.LastKnownSelectSnapshotId !== uiData.SelectSnapshotId) {
      this.LastKnownSelectSnapshotId = uiData.SelectSnapshotId;
      this.UpdateUiCommon();
    }

    this.Logger.FuncEnd(this.RefreshUiUIManagerFromSnapShotSelect.name);
  }

  async UpdateUiFromContentReply(stateOfSitecoreWindow: IDataStateOfSitecoreWindow, stateOfStorageSnapShots: IDataStateOfStorageSnapShots) {
    this.Logger.FuncStart(this.UpdateUiFromContentReply.name);

    if (StaticHelpers.IsNullOrUndefined(this.LastKnownSelectSnapshotId)) {
      this.LastKnownSelectSnapshotId = this.ModuleSelectSnapShots.GetSelectSnapshotId();
    }

    this.LastKnownstateOfSitecoreWindow = stateOfSitecoreWindow;
    this.LastKnownStateOfStorageSnapShots = stateOfStorageSnapShots;

    this.UpdateUiCommon();

    this.Logger.FuncEnd(this.UpdateUiFromContentReply.name);
  }

  private async UpdateUiCommon(): Promise<void> {
    if (this.LastKnownstateOfSitecoreWindow && this.LastKnownstateOfSitecoreWindow.Meta) {
      this.UiVisibilityTestAgent.Hydrate(this.LastKnownstateOfSitecoreWindow, this.LastKnownStateOfStorageSnapShots, this.LastKnownstateOfSitecoreWindow.Meta.WindowType, this.LastKnownSelectSnapshotId);

      let refreshData: UiRefreshData = new UiRefreshData(this.LastKnownstateOfSitecoreWindow, this.TabMan.GetScUrlAgent(), this.LastKnownStateOfStorageSnapShots, this.LastKnownSelectSnapshotId, this.UiVisibilityTestAgent);

      this.HydrateModules(refreshData);
      this.RefreshModuleUis()
    } else {
      this.Logger.ErrorAndThrow(this.UpdateUiFromContentReply.name, 'null state or meta');
    }
  }

  ShowDebugDataOneWindow() {
    this.Logger.FuncStart('ShowDebugDataOneWindow');
    var toReturn: string[] = [];

    for (var kdx = 0; kdx < toReturn.length; kdx++) {
      this.Logger.Log(toReturn[kdx]);
    }

    this.Logger.FuncEnd('ShowDebugDataOneWindow');
    return toReturn;
  }

  private DrawCorrectNicknameInUI() {
    this.Logger.FuncStart(this.DrawCorrectNicknameInUI.name);

    let snapShots: IDataStateOfSitecoreWindow[] = null; //todo - put back logic   stateOfStorageSnapShots.SnapShots

    var targetId: GuidData = this.ModuleSelectSnapShots.GetSelectSnapshotId()
    if (targetId) {
      this.Logger.Log('targetId : ' + targetId.Raw);

      var storageValues = snapShots;

      if (storageValues) {
        var storageMatch;

        for (var idx = 0; idx < storageValues.length; idx++) {
          var candidate = storageValues[idx];
          if (candidate.Meta.SnapshotId.Raw === this.ModuleSelectSnapShots.GetSelectSnapshotId().Raw) {
            storageMatch = candidate;
            break;
          }
        }

        if (storageMatch) {
          var inputElem = <HTMLInputElement>window.document.getElementById(PopConst.Const.ElemId.InputNickname);
          if (inputElem) {
            inputElem.value = storageMatch.NickName;
          }
        }
      } else {
        this.Logger.WarningAndContinue(this.DrawCorrectNicknameInUI.name, 'null storage values');
      }
    }
    this.Logger.FuncEnd(this.DrawCorrectNicknameInUI.name);
  }

  GetValueInNickname(): string {
    var toReturn: string = '';
    toReturn = (<HTMLInputElement>window.document.getElementById(PopConst.Const.ElemId.InputNickname)).value;
    return toReturn;
  }

  GetButtonByIdOrSelector(targetId: string): HTMLElement {
    var toReturn: HTMLElement = document.querySelector(targetId);
    if (!toReturn) {
      toReturn = document.querySelector('[id=' + targetId + ']');
    }
    return toReturn;
  }

  AssignOnCheckedEvent(targetId: string, handler: Function): void {
    var targetElem: HTMLElement = document.getElementById(targetId);
    if (!targetElem) {
      this.Logger.ErrorAndThrow(this.AssignOnClickEvent.name, 'No Id: ' + targetId);
    } else {
      targetElem.addEventListener('checked', (evt) => { handler(evt) });
    }
  }

  AssignOnClickEvent(targetId: string, handler: Function): void {
    var targetElem = this.GetButtonByIdOrSelector(targetId);

    if (!targetElem) {
      this.Logger.ErrorAndThrow(this.AssignOnClickEvent.name, 'No Id: ' + targetId);
    } else {
      targetElem.addEventListener('click', (evt) => { handler(evt) });
    }
  }

  AssignOnClickEventFromCmd(command: IMenuCommandDefinition, handler: Function): void {
    if (command && command.MenuCommandKey !== MenuCommandKey.Unknown) {
      this.AssignOnClickEvent(command.PlaceHolderSelector, handler);
    }
  }

  AssignDblClickEvent(selector: string, handler: Function): void {
    var targetElem: HTMLElement = document.querySelector(selector);
    if (!targetElem) {
      this.Logger.ErrorAndThrow(this.AssignOnClickEvent.name, 'No Id: ' + selector);
    } else {
      targetElem.ondblclick = (evt) => { handler(evt) };
    }
  }

  PopulateSnapShotsAuto() {
  }

  PopulateSnapShotsNotAuto() {
  }
}