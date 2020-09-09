import { AccordianManager } from '../../../../Shared/scripts/Agents/Drones/AccordianDrone/AccordianManager';
import { BuiltDateStamp } from '../../../../Shared/scripts/AutoBuild/BuildNum';
import { StaticHelpers } from '../../../../Shared/scripts/Classes/StaticHelpers';
import { MenuCommand } from '../../../../Shared/scripts/Enums/2xxx-MenuCommand';
import { SettingKey } from '../../../../Shared/scripts/Enums/3xxx-SettingKey';
import { GuidData } from '../../../../Shared/scripts/Helpers/GuidData';
import { IAccordianManager } from '../../../../Shared/scripts/Interfaces/Agents/IAccordianManager';
import { IGenericSetting } from '../../../../Shared/scripts/Interfaces/Agents/IGenericSetting';
import { ILoggerAgent } from '../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { ISettingsAgent } from '../../../../Shared/scripts/Interfaces/Agents/ISettingsAgent';
import { IOneCommand } from '../../../../Shared/scripts/Interfaces/IOneCommand';
import { GenericUrlParts } from '../../../../Shared/scripts/Interfaces/UrlParts';
import { CommandManager } from '../../Classes/AllCommands';
import { PopConst } from '../../Classes/PopConst';
import { TabManager } from '../TabManager';
import { UiButtonStateManager } from '../UiButtonStateManager';
import { CancelButtonModule } from './Modules/CancelButtonModule';
import { SelectSnapshotModule } from './Modules/SelectSnapshotModule/SelectSnapshotModule';
import { SettingsModule } from './Modules/SettingsModule/SettingsModule';
import { FeedbackModuleBrowserState } from './Modules/UiFeedbackModules/FeedbackModuleBrowserState/FeedbackModuleBrowserState';
import { FeedbackModuleContentState } from './Modules/UiFeedbackModules/FeedbackModuleContentState/FeedbackModuleContentState';
import { FeedbackModuleMessages } from './Modules/UiFeedbackModules/FeedbackModuleMessages/FeedbackModuleMessages';
import { FeedbackModulePopUpState } from './Modules/UiFeedbackModules/FeedbackModulePopUpState/FeedbackModulePopUpState';
import { UiFeedbackModuleLog } from './Modules/UiFeedbackModules/UiFeedbackModuleLog/UiFeedbackModuleLog';
import { IContentState } from '../../../../Shared/scripts/Interfaces/Data/IContentState';
import { IDataOneWindowStorage } from '../../../../Shared/scripts/Interfaces/Data/IDataOneWindowStorage';
import { ScUrlAgent } from '../../../../Shared/scripts/Agents/Agents/UrlAgent/ScUrlAgent';

export class UiManager {
  AccordianManager: IAccordianManager;
  ButtonStateManager: UiButtonStateManager;
  CurrScWindowState: IContentState;
  FeedbackModuleMessages: FeedbackModuleMessages;
  FeedbackModulePopUpState: FeedbackModulePopUpState;
  LastKnownContentState: IContentState;
  MenuEnabled: boolean = true;
  MenuFocused: boolean = true;
  ModuleSelectSnapShot: SelectSnapshotModule;
  OtherFocused: boolean = false;
  ParentFocused: boolean = false;
  SettingsModule: SettingsModule;
  TabId: string;

  private FeedbackModuleBrowserState: FeedbackModuleBrowserState;
  private FeedbackModuleContentState: FeedbackModuleContentState;
  private FeedbackModuleLog: UiFeedbackModuleLog;
  private Logger: ILoggerAgent;
  private SettingsAgent: ISettingsAgent;
  private TabMan: TabManager;
  private CommandMan: CommandManager;
  CancelButtonModule: CancelButtonModule;

  constructor(logger: ILoggerAgent, settingsAgent: ISettingsAgent, tabMan: TabManager, commandMan: CommandManager) {
    this.Logger = logger;
    this.SettingsAgent = settingsAgent;
    this.TabMan = tabMan;
    this.CommandMan = commandMan;

    this.Logger.InstantiateStart(UiManager.name);

    this.ButtonStateManager = new UiButtonStateManager(this.Logger);

    this.AccordianManager = new AccordianManager(this.Logger, this.SettingsAgent);

    this.FeedbackModuleMessages = new FeedbackModuleMessages(PopConst.Const.Selector.HS.DivOverlayModule, this.Logger);
    this.FeedbackModuleLog = new UiFeedbackModuleLog(PopConst.Const.Selector.HS.FeedbackLogElement, this.Logger);

    this.Logger.AddWriter(this.FeedbackModuleLog);

    this.FeedbackModuleContentState = new FeedbackModuleContentState(PopConst.Const.Selector.HS.FeedbackContentState, this.Logger);
    this.FeedbackModuleBrowserState = new FeedbackModuleBrowserState(PopConst.Const.Selector.HS.FeedbackBrowserState, this.Logger);
    this.FeedbackModulePopUpState = new FeedbackModulePopUpState(PopConst.Const.Selector.HS.FeedbackPopUpState, this.Logger);

    this.ModuleSelectSnapShot = new SelectSnapshotModule(PopConst.Const.Selector.HS.SelStateSnapShot, this.Logger)

    this.SettingsModule = new SettingsModule(this.Logger, this.SettingsAgent, this.AccordianManager);

    this.CancelButtonModule = new CancelButtonModule(PopConst.Const.Selector.HS.HsCancel, this.Logger);

    this.Logger.InstantiateEnd(UiManager.name);
  }

  InitUiManager() {
    this.Logger.FuncStart(this.InitUiManager.name);

    var self = this;
    //this.Logger.AddDebugTextChangedCallback(self, this.FeedbackModuleDebugData.HndlrDebugTextChanged);

    this.WriteBuildNumToUi();

    this.ModuleSelectSnapShot.Init();
    this.FeedbackModuleBrowserState.Init();
    this.FeedbackModuleContentState.Init();

    //this.MsgMan().SendMessageToContentTab(new MsgFromPopUp(MsgFlag.Ping, this.PopHub), this.TabMan.CurrentTabData);

    this.ScheduleAutoSaveSnapShot();
    this.ScheduleAutoLogin();

    this.ModuleSelectSnapShot.AddCallbackForSelChanged(() => {
      self.RefreshUi();
    });

    this.ButtonStateManager.Init(this.CommandMan.AllMenuCommands);

    this.Logger.FuncEnd(this.InitUiManager.name);
  }

  SetContentState(contentState: IContentState) {
    //contentState.SnapShotsMany.CurrentSnapShots = this.FixGuidsInContentState(contentState.SnapShotsMany.CurrentSnapShots);

    this.LastKnownContentState = contentState;
  }

  SelectChanged() {
    this.ModuleSelectSnapShot.SelectChanged();
    //this.RefreshUi();
  }

  OnFailedCommand(err: string): void {
    //todo
    this.Logger.Log(err);
  }

  CallBackCommandComplete(contentState: IContentState) {
    this.Logger.LogAsJsonPretty('contentState', contentState);
    this.SetContentState(contentState)
    this.RefreshUi();
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
          this.Logger.Log('Window not closed because of setting: ' + setting.Friendly)
        }
        resolve();
      } catch (ex) {
        console.log(ex.toString());
        reject(ex);
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

  async SetUIStates(scUrlAgent: ScUrlAgent) {
    this.Logger.FuncStart(this.SetUIStates.name);
    if (this.Logger.IsNotNullOrUndefinedBool('state', this.LastKnownContentState)) {
      this.FeedbackModulePopUpState.PopulatePopUpStateUI(this.ModuleSelectSnapShot.GetSelectSnapshotId());
      this.FeedbackModuleContentState.PopulateContentStateFeedack(this.LastKnownContentState);
      this.FeedbackModuleBrowserState.PopulateFeedackBrowserState(scUrlAgent);
    }
    this.Logger.FuncEnd(this.SetUIStates.name);
  }

  async RefreshUi() {
    this.Logger.FuncStart(this.RefreshUi.name);

    await this.SetUIStates(this.TabMan.GetScUrlAgent());
    await this.SetUIStates(this.TabMan.GetScUrlAgent());

    this.FeedbackModuleBrowserState.RefreshUi();

    this.ModuleSelectSnapShot.SetContentState(this.LastKnownContentState);
    this.ModuleSelectSnapShot.RefreshUi();

    this.SettingsModule.RefreshUi();

    let currentWindowType = this.TabMan.GetWindowType();
    let currSelSnapshot: GuidData = this.ModuleSelectSnapShot.GetSelectSnapshotId();

    this.ButtonStateManager.RefreshUi(currentWindowType, currSelSnapshot, this.LastKnownContentState, this.CommandMan.AllMenuCommands);

    this.__drawCorrectNicknameInUI(this.LastKnownContentState.SnapShotsMany.CurrentSnapShots);

    this.Logger.FuncEnd(this.RefreshUi.name);
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
  private __drawCorrectNicknameInUI(snapShots: IDataOneWindowStorage[]) {
    this.Logger.FuncStart(this.__drawCorrectNicknameInUI.name);
    var targetId: GuidData = this.ModuleSelectSnapShot.GetSelectSnapshotId()
    if (targetId) {
      this.Logger.Log('targetId : ' + targetId.Raw);

      var storageValues = snapShots;

      var storageMatch;

      for (var idx = 0; idx < storageValues.length; idx++) {
        var candidate = storageValues[idx];
        if (candidate.GuidId.Raw === this.ModuleSelectSnapShot.GetSelectSnapshotId().Raw) {
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
    this.Logger.FuncEnd(this.__drawCorrectNicknameInUI.name);
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

  AssignOnClickEventFromCmd(command: IOneCommand, handler: Function): void {
    if (command && command.Command !== MenuCommand.Unknown) {
      this.AssignOnClickEvent(command.ButtonSelector, handler);
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