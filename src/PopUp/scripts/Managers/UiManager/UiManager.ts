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
import { IDataStateOfSnapShotSelect } from '../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfSnapShotSelect';
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
import { UiSelectSnapshotMutationEvent_Observer } from '../../../../Content/scripts/Proxies/Desktop/DesktopProxy/Events/UiSelectSnapshotMutatedEvent/UiSelectSnapshotMutatedEvent_Observer';
import { AccordianModulesManager } from '../../UiModules/AccordianModule/AccordianManager';
import { UiVisibilityTestAgent } from './UiVisibilityTestAgent';
import { UiRefreshData } from '../../../../Shared/scripts/Interfaces/MenuCommand';
import { IMenuCommandDefinition } from "../../../../Shared/scripts/Interfaces/IMenuCommandDefinition";

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
  ModuleSnapShots: SelectSnapshotModule;
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
    this.ModuleSnapShots = new SelectSnapshotModule(this.Logger, PopConst.Const.Selector.HS.SelStateSnapShot)
    this.SettingsModule = new SettingsModule(this.Logger, this.SettingsAgent, this.AccordianModuleManager, '');
    this.CancelButtonModule = new CancelButtonModule(this.Logger, PopConst.Const.Selector.HS.HsCancel, null);
    this.Logger.FuncEnd(this.BuildModules.name);
  }

  WireEvents() {
    this.Logger.FuncStart(this.WireEvents.name);
    this.FeedbackModuleMessages = new FeedbackModuleMessages_Observer(this.Logger, PopConst.Const.Selector.HS.DivOverlayModule);
    this.Logger.AddWriter(this.FeedbackModuleLog);
    this.Logger.FuncEnd(this.WireEvents.name);
  }

  InitUiManager() {
    this.Logger.FuncStart(this.InitUiManager.name);

    var self = this;
    //this.Logger.AddDebugTextChangedCallback(self, this.FeedbackModuleDebugData.HndlrDebugTextChanged);

    this.WriteBuildNumToUi();

    this.ModuleSnapShots.Init();
    this.ModuleFeedbackOfBrowserState.Init();
    this.ModuleFeedbackOfContentState.Init();

    //this.MsgMan().SendMessageToContentTab(new MsgFromPopUp(MsgFlag.Ping, this.PopHub), this.TabMan.CurrentTabData);

    this.ScheduleAutoSaveSnapShot();
    this.ScheduleAutoLogin();

    let uiSelectSnapshotChangeEvent_Observer = new UiSelectSnapshotMutationEvent_Observer(this.Logger, this);
    this.ModuleSnapShots.SelectSnapshotModule_Subject.RegisterObserver(uiSelectSnapshotChangeEvent_Observer);

    this.ButtonModulesManager.InitButtonStateManager();

    this.Logger.FuncEnd(this.InitUiManager.name);
  }

  SelectChanged() {
    this.ModuleSnapShots.SelectChanged();
    //this.RefreshUi();
  }

  OnFailedCommand(err: string): void {
    //todo
    this.Logger.Log(err);
  }

  ContentReplyReceivedEventCallBack(stateOfSitecoreWindow: IDataStateOfSitecoreWindow, stateOfStorageSnapshots: IDataStateOfStorageSnapShots) {
    this.Logger.FuncStart(this.ContentReplyReceivedEventCallBack.name);
    this.UpdateUiFromContentReply(stateOfSitecoreWindow, stateOfStorageSnapshots);
    this.Logger.FuncEnd(this.ContentReplyReceivedEventCallBack.name);
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
        this.ModuleSnapShots.HydrateStorageSnapShotModule(refreshData);
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
    this.ModuleSnapShots.RefreshUi();
    this.SettingsModule.RefreshUi();
  }

  async RefreshUiUIManagerFromSnapShotSelect(uiData: IDataStateOfSnapShotSelect) {
    // todo
  }

  async UpdateUiFromContentReply(stateOfSitecoreWindow: IDataStateOfSitecoreWindow, stateOfStorageSnapShots: IDataStateOfStorageSnapShots) {
    this.Logger.FuncStart(this.UpdateUiFromContentReply.name);

    if (stateOfSitecoreWindow && stateOfSitecoreWindow.Meta) {
      this.UiVisibilityTestAgent.Hydrate(stateOfSitecoreWindow, stateOfStorageSnapShots, stateOfSitecoreWindow.Meta.WindowType);

      let refreshData: UiRefreshData = new UiRefreshData(stateOfSitecoreWindow, null, this.TabMan.GetScUrlAgent(), stateOfStorageSnapShots, null, this.UiVisibilityTestAgent);

      this.HydrateModules(refreshData);
      this.RefreshModuleUis()
    } else {
      this.Logger.ErrorAndThrow(this.UpdateUiFromContentReply.name, 'null state or meta');
    }
    this.Logger.FuncEnd(this.UpdateUiFromContentReply.name);
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

    var targetId: GuidData = this.ModuleSnapShots.GetSelectSnapshotId()
    if (targetId) {
      this.Logger.Log('targetId : ' + targetId.Raw);

      var storageValues = snapShots;

      var storageMatch;

      for (var idx = 0; idx < storageValues.length; idx++) {
        var candidate = storageValues[idx];
        if (candidate.Meta.SnapshotId.Raw === this.ModuleSnapShots.GetSelectSnapshotId().Raw) {
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