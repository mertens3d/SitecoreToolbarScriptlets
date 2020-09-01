import { AccordianManager } from '../../../../Shared/scripts/Agents/Drones/AccordianDrone/AccordianManager';
import { BuiltDateStamp } from '../../../../Shared/scripts/AutoBuild/BuildNum';
import { MenuCommand } from '../../../../Shared/scripts/Enums/2xxx-MenuCommand';
import { SettingKey } from '../../../../Shared/scripts/Enums/3xxx-SettingKey';
import { IAccordianManager } from '../../../../Shared/scripts/Interfaces/Agents/IAccordianManager';
import { IAllAgents } from "../../../../Shared/scripts/Interfaces/Agents/IallAgents";
import { IOneGenericSetting } from '../../../../Shared/scripts/Interfaces/Agents/IOneGenericSetting';
import { IContentState } from "../../../../Shared/scripts/Interfaces/IContentState/IContentState";
import { IDataOneWindowStorage } from '../../../../Shared/scripts/Interfaces/IDataOneWindowStorage';
import { IOneCommand } from '../../../../Shared/scripts/Interfaces/IOneCommand';
import { GenericUrlParts } from '../../../../Shared/scripts/Interfaces/UrlParts';
import { PopConst } from '../../Classes/PopConst';
import { PopUpHub } from '../PopUpHub';
import { PopUpManagerBase } from '../PopUpManagerBase';
import { UiButtonStateManager } from '../UiButtonStateManager';
import { SelectSnapshotModule } from './Modules/SelectSnapshotModule/SelectSnapshotModule';
import { SettingsModule } from './Modules/SettingsModule/SettingsModule';
import { FeedbackModuleBrowserState } from './Modules/UiFeedbackModules/FeedbackModuleBrowserState/FeedbackModuleBrowserState';
import { FeedbackModuleContentState } from './Modules/UiFeedbackModules/FeedbackModuleContentState/FeedbackModuleContentState';
import { FeedbackModuleMessages } from './Modules/UiFeedbackModules/FeedbackModuleMessages/FeedbackModuleMessages';
import { FeedbackModulePopUpState } from './Modules/UiFeedbackModules/FeedbackModulePopUpState/FeedbackModulePopUpState';
import { UiFeedbackModuleLog } from './Modules/UiFeedbackModules/UiFeedbackModuleLog/UiFeedbackModuleLog';
import { Guid } from '../../../../Shared/scripts/Helpers/Guid';

export class UiManager extends PopUpManagerBase {
  AccordianManager: IAccordianManager;
  ButtonStateManager: UiButtonStateManager;
  CurrContentState: IContentState;
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

  constructor(popHub: PopUpHub, allAgents: IAllAgents) {
    super(popHub, allAgents);

    this.AllAgents.Logger.InstantiateStart(UiManager.name);

    this.ButtonStateManager = new UiButtonStateManager(this.AllAgents.Logger);

    this.AccordianManager = new AccordianManager(this.AllAgents.Logger, this.AllAgents.SettingsAgent);

    this.FeedbackModuleMessages = new FeedbackModuleMessages(PopConst.Const.Selector.HS.DivOverlayModule, this.AllAgents.Logger);
    this.FeedbackModuleLog = new UiFeedbackModuleLog(PopConst.Const.Selector.HS.FeedbackLogElement, this.AllAgents.Logger);

    this.AllAgents.Logger.AddWriter(this.FeedbackModuleLog);

    this.FeedbackModuleContentState = new FeedbackModuleContentState(PopConst.Const.Selector.HS.FeedbackContentState, this.AllAgents.Logger);
    this.FeedbackModuleBrowserState = new FeedbackModuleBrowserState(PopConst.Const.Selector.HS.FeedbackBrowserState, this.AllAgents.Logger);
    this.FeedbackModulePopUpState = new FeedbackModulePopUpState(PopConst.Const.Selector.HS.FeedbackPopUpState, this.AllAgents.Logger);

    this.ModuleSelectSnapShot = new SelectSnapshotModule(PopConst.Const.Selector.HS.SelStateSnapShot, this.AllAgents.Logger)

    this.SettingsModule = new SettingsModule(this.AllAgents.Logger, this.AllAgents.SettingsAgent, this.AccordianManager);

    this.AllAgents.Logger.InstantiateEnd(UiManager.name);
  }

  InitUiManager() {
    this.AllAgents.Logger.FuncStart(this.InitUiManager.name);

    var self = this;
    //this.AllAgents.Logger.AddDebugTextChangedCallback(self, this.FeedbackModuleDebugData.HndlrDebugTextChanged);

    this.WriteBuildNumToUi();

    this.ModuleSelectSnapShot.Init();
    this.FeedbackModuleBrowserState.Init();
    this.FeedbackModuleContentState.Init();

    //this.MsgMan().SendMessageToContentTab(new MsgFromPopUp(MsgFlag.Ping, this.PopHub), this.TabMan().CurrentTabData);

    this.ScheduleAutoSaveSnapShot();
    this.ScheduleAutoLogin();

    this.ModuleSelectSnapShot.AddCallbackForSelChanged(() => {
      let self = this;

      self.RefreshUi();
    });

    this.ButtonStateManager.Init(this.EventMan().AllMenuCommands);

    this.AllAgents.Logger.FuncEnd(this.InitUiManager.name);
  }

  SetContentState(contentState: IContentState) {
    contentState.SnapShotsMany.CurrentSnapShots = this.FixGuidsInContentState(contentState.SnapShotsMany.CurrentSnapShots);

    this.LastKnownContentState = contentState;
  }

  FixGuidsInContentState(dataAr: IDataOneWindowStorage[]): IDataOneWindowStorage[] {
    let toReturn: IDataOneWindowStorage[] = [];
    if (dataAr) {

      for (var idx = 0; idx < dataAr.length; idx++) {
        let candidate = dataAr[idx];
        if (Guid.IsValidGuidStr(candidate.Id.Raw)) {
          candidate.Id = new Guid(candidate.Id.Raw);
          toReturn.push(candidate);
        }
      }
    }

    return toReturn
  }

  SelectChanged() {
    this.ModuleSelectSnapShot.SelectChanged();
    //this.RefreshUi();
  }

  OnFailedCommand(err: string): void {
    //todo
    this.AllAgents.Logger.Log(err);
  }

  ClosePopUp(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.AllAgents.Logger.FuncStart(this.ClosePopUp.name);
      try {
        this.FeedbackModuleMessages.UpdateMsgStatusStack('Command Completed Successfully');

        let setting: IOneGenericSetting = this.AllAgents.SettingsAgent.GetByKey(SettingKey.DebugKeepDialogOpen);
        if (!this.AllAgents.SettingsAgent.ValueAsBool(setting)) {
          window.close();
        } else {
          this.AllAgents.Logger.Log('Window not closed because of setting: ' + setting.Friendly)
        }
        resolve();
      } catch (ex) {
        console.log(ex.toString());
        reject(ex);
      }
      this.AllAgents.Logger.FuncEnd(this.ClosePopUp.name);
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
    this.AllAgents.Logger.LogVal('BuiltDateStamp', BuiltDateStamp);

    var targetTag: HTMLElement = document.querySelector(PopConst.Const.Selector.HS.BuildStamp);
    if (targetTag) {
      targetTag.innerText = 'build stamp: ' + this.AllAgents.HelperAgent.UtilityHelp.MakeFriendlyDate(new Date(BuiltDateStamp));
    } else {
      this.AllAgents.Logger.ErrorAndThrow(this.WriteBuildNumToUi.name, 'No Build Stamp Element Found');
    }
  }

  //async UpdateAtticFromUi(): Promise<any> {
  //  this.AllAgents.Logger.FuncStart(this.UpdateAtticFromUi.name);

  //  //let currentSettings: IDataPopUpSettings = await this.PopAtticMan().CurrentSettings();
  //  //let currentVal = (<HTMLInputElement>document.querySelector(PopConst.Const.Selector.HS.iCBoxdSettingsShowLogData)).checked;
  //  //currentVal = true; //todo - remove after debugging
  //  //this.allAgents.Logger.LogVal('currentVal', currentVal.toString())
  //  //currentSettings.LogSettings.ShowDebugData = currentVal;

  //  //this.PopAtticMan().StoreSettings(currentSettings);
  //  this.RefreshUi();
  //  this.AllAgents.Logger.FuncEnd(this.UpdateAtticFromUi.name);
  //}

  private __GetCancelButton() {
    return document.getElementById(PopConst.Const.Selector.HS.HsCancel);
  }

  SetCancelFlag() {
    //todo this.OperationCancelled = true;
    var btn = this.__GetCancelButton();
    if (btn) {
      btn.classList.add('red');
    }
  }

  ClearCancelFlag() {
    var btn = this.__GetCancelButton();
    if (btn) {
      btn.classList.remove('red');
    }
    //todo this.UiMan().OperationCancelled = false;
  }

  async SetUIStates(urlParts: GenericUrlParts) {
    this.AllAgents.Logger.FuncStart(this.SetUIStates.name);
    if (this.AllAgents.Logger.IsNotNullOrUndefinedBool('state', this.LastKnownContentState)) {
      this.FeedbackModulePopUpState.PopulatePopUpStateUI(this.ModuleSelectSnapShot.GetSelectSnapshotId());
      this.FeedbackModuleContentState.PopulateContentStateFeedack(this.LastKnownContentState);
      this.FeedbackModuleBrowserState.PopulateFeedackBrowserState(urlParts);
    }
    this.AllAgents.Logger.FuncEnd(this.SetUIStates.name);
  }

  async RefreshUi() {
    this.AllAgents.Logger.FuncStart(this.RefreshUi.name);

    await this.SetUIStates(this.TabMan().GetUrlParts());

    this.FeedbackModuleBrowserState.RefreshUi();

    this.ModuleSelectSnapShot.SetContentState(this.LastKnownContentState);
    this.ModuleSelectSnapShot.RefreshUi();

    this.SettingsModule.RefreshUi();

    let currentWindowType = this.TabMan().GetWindowType();
    let currSelSnapshot: Guid = this.UiMan().ModuleSelectSnapShot.GetSelectSnapshotId();

    this.ButtonStateManager.RefreshUi(currentWindowType, currSelSnapshot, this.LastKnownContentState);

    this.__drawCorrectNicknameInUI(this.LastKnownContentState.SnapShotsMany.CurrentSnapShots);

    this.AllAgents.Logger.FuncEnd(this.RefreshUi.name);
  }

  ShowDebugDataOneWindow() {
    this.AllAgents.Logger.FuncStart('ShowDebugDataOneWindow');
    var toReturn: string[] = [];

    for (var kdx = 0; kdx < toReturn.length; kdx++) {
      this.AllAgents.Logger.Log(toReturn[kdx]);
    }

    this.AllAgents.Logger.FuncEnd('ShowDebugDataOneWindow');
    return toReturn;
  }
  private __drawCorrectNicknameInUI(snapShots: IDataOneWindowStorage[]) {
    this.AllAgents.Logger.FuncStart(this.__drawCorrectNicknameInUI.name);
    var targetId: Guid = this.UiMan().ModuleSelectSnapShot.GetSelectSnapshotId()
    if (targetId) {
      this.AllAgents.Logger.Log('targetId : ' + targetId.ToString());

      var storageValues = snapShots;

      var storageMatch;

      for (var idx = 0; idx < storageValues.length; idx++) {
        var candidate = storageValues[idx];
        if (candidate.Id.ToString() === this.UiMan().ModuleSelectSnapShot.GetSelectSnapshotId().ToString()) {
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
    this.AllAgents.Logger.FuncEnd(this.__drawCorrectNicknameInUI.name);
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
      this.AllAgents.Logger.ErrorAndThrow(this.AssignOnClickEvent.name, 'No Id: ' + targetId);
    } else {
      targetElem.addEventListener('checked', (evt) => { handler(evt) });
    }
  }

  AssignOnClickEvent(targetId: string, handler: Function): void {
    var targetElem = this.GetButtonByIdOrSelector(targetId);

    if (!targetElem) {
      this.AllAgents.Logger.ErrorAndThrow(this.AssignOnClickEvent.name, 'No Id: ' + targetId);
    } else {
      var popHub: PopUpHub = this.PopHub;
      targetElem.addEventListener('click', (evt) => { handler(evt, popHub) });
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
      this.AllAgents.Logger.ErrorAndThrow(this.AssignOnClickEvent.name, 'No Id: ' + selector);
    } else {
      targetElem.ondblclick = (evt) => { handler(evt) };
    }
  }

  PopulateSnapShotsAuto() {
  }

  PopulateSnapShotsNotAuto() {
  }
}