import { AccordianManager } from '../../../../Shared/scripts/Agents/Drones/AccordianDrone/AccordianManager';
import { BuiltDateStamp } from '../../../../Shared/scripts/AutoBuild/BuildNum';
import { MenuCommand } from '../../../../Shared/scripts/Enums/2xxx-MenuCommand';
import { SettingKey } from '../../../../Shared/scripts/Enums/3xxx-SettingKey';
import { IAccordianManager } from '../../../../Shared/scripts/Interfaces/Agents/IAccordianManager';
import { IAllAgents } from "../../../../Shared/scripts/Interfaces/Agents/IallAgents";
import { IOneGenericSetting } from '../../../../Shared/scripts/Interfaces/Agents/IOneGenericSetting';
import { IContentState } from "../../../../Shared/scripts/Interfaces/IContentState/IContentState";
import { IDataOneWindowStorage } from '../../../../Shared/scripts/Interfaces/IDataOneWindowStorage';
import { IGuid } from '../../../../Shared/scripts/Interfaces/IGuid';
import { IGuidHelper } from '../../../../Shared/scripts/Interfaces/IGuidHelper';
import { IMenuState } from '../../../../Shared/scripts/Interfaces/IMenuState';
import { IOneCommand } from '../../../../Shared/scripts/Interfaces/IOneCommand';
import { PopConst } from '../../Classes/PopConst';
import { PopUpHub } from '../PopUpHub';
import { PopUpManagerBase } from '../PopUpManagerBase';
import { UiButtonStateManager } from '../UiButtonStateManager';
import { SelectSnapshotModule } from './Modules/SelectSnapshotModule/SelectSnapshotModule';
import { SettingsModule } from './Modules/SettingsModule/SettingsModule';
import { FeedbackModuleBrowserState } from './Modules/UiFeedbackModules/FeedbackModuleBrowserState/FeedbackModuleBrowserState';
import { FeedbackModuleContentState } from './Modules/UiFeedbackModules/FeedbackModuleContentState/FeedbackModuleContentState';
import { FeedbackModuleMessages } from './Modules/UiFeedbackModules/FeedbackModuleMessages/FeedbackModuleMessages';
import { StorageFeedbackModule } from './Modules/UiFeedbackModules/StorageFeedbackModule/StorageFeedbackModule';
import { UiFeedbackModuleLog } from './Modules/UiFeedbackModules/UiFeedbackModuleLog/UiFeedbackModuleLog';
import { FeedbackModulePopUpState } from './Modules/UiFeedbackModules/FeedbackModulePopUpState/FeedbackModulePopUpState';
import { UrlParts } from '../../../../Shared/scripts/Interfaces/UrlParts';

export class UiManager extends PopUpManagerBase {
  private FeedbackModuleBrowserState: FeedbackModuleBrowserState;
  AccordianManager: IAccordianManager;
  ButtonStateManager: UiButtonStateManager;
  CurrContentState: IContentState;
  FeedbackModuleMessages: FeedbackModuleMessages;
  MenuEnabled: boolean = true;
  MenuFocused: boolean = true;
  OtherFocused: boolean = false;
  ParentFocused: boolean = false;
  private FeedbackModuleLog: UiFeedbackModuleLog;
  private FeedbackModuleContentState: FeedbackModuleContentState;
  private FeedbackModuleStorage: StorageFeedbackModule;
  private ModuleSelectSnapShot: SelectSnapshotModule;
  TabId: string;

  CurrentMenuState: IMenuState = {
    SelectSnapshotId: null,
  }
  SettingsModule: SettingsModule;
    FeedbackModulePopUpState: FeedbackModulePopUpState;

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

    this.ModuleSelectSnapShot = new SelectSnapshotModule(PopConst.Const.Selector.HS.SelStateSnapShot, this.AllAgents.Logger, this.Helpers().GuidHelper)

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

    this.ButtonStateManager.Init(this.EventMan().AllMenuCommands);

    this.AllAgents.Logger.FuncEnd(this.InitUiManager.name);
  }

  SelectChanged() {
    this.ModuleSelectSnapShot.SelectChanged();
    //this.RefreshUi();
  }

  OnFailedCommand(err: string): void {
    //todo
    this.AllAgents.Logger.Log(err);
  }

  DrawStorage() {
    this.FeedbackModuleStorage.FromAtticDrawStorage();
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

  DrawPopUpLogStorage() {
    var lastId: IOneGenericSetting = this.AllAgents.SettingsAgent.GetByKey(SettingKey.LastUsedLogToStorageKey);
    this.FeedbackModuleStorage.FromAtticDrawPopUpLogStorage(lastId);
  }

  WriteBuildNumToUi() {
    this.AllAgents.Logger.LogVal('BuiltDateStamp', BuiltDateStamp);

    var targetTag: HTMLElement = document.querySelector(PopConst.Const.Selector.HS.BuildStamp);
    if (targetTag) {
      targetTag.innerText = 'build: ' + this.AllAgents.HelperAgent.UtilityHelp.MakeFriendlyDate(new Date(BuiltDateStamp));
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


  async SetUIStates(contentState: IContentState, currentMenuState: IMenuState, urlParts: UrlParts) {
    this.AllAgents.Logger.FuncStart(this.SetUIStates.name);
    if (this.AllAgents.Logger.IsNotNullOrUndefinedBool('state', contentState)) {

      this.FeedbackModulePopUpState.PopulatePopUpStateUI(contentState, currentMenuState, urlParts);
      this.FeedbackModuleContentState.PopulateContentStateFeedack(contentState, currentMenuState, urlParts);
      this.FeedbackModuleBrowserState.PopulateFeedackBrowserState(urlParts);

    }
    this.AllAgents. Logger.FuncEnd(this.SetUIStates.name);
  }

  async RefreshUi(contentState: IContentState) {
    this.AllAgents.Logger.FuncStart(this.RefreshUi.name);

    await this.SetUIStates(contentState, this.CurrentMenuState, this.TabMan().CurrentTabData.UrlParts);

    this.FeedbackModuleBrowserState.RefreshUi();

    this.ModuleSelectSnapShot.SetContentState(contentState);
    this.ModuleSelectSnapShot.RefreshUi();

    this.SettingsModule.RefreshUi();

    let currentWindowType = this.TabMan().CurrentTabData.UrlParts.ScWindowType;
    let currSelSnapshot: IGuid = this.UiMan().CurrentMenuState.SelectSnapshotId;
    let guidHelper: IGuidHelper = this.AllAgents.HelperAgent.GuidHelper
    let currentContentState: IContentState = this.UiMan().CurrContentState;

    this.ButtonStateManager.RefreshUi(currentWindowType, currSelSnapshot, guidHelper, currentContentState);

    this.__drawCorrectNicknameInUI(contentState.SnapShotsMany.CurrentSnapShots);

    this.AllAgents.Logger.FuncEnd(this.RefreshUi.name);
  }

  ShowDebugDataOneWindow() {
    this.AllAgents.Logger.FuncStart('ShowDebugDataOneWindow');
    var toReturn: string[] = [];

    //toReturn.push(this.__activeWindowSnapShot.TimeStamp.toJSON());
    //for (var jdx = 0; jdx < this.__activeWindowSnapShot.AllCEAr.length; jdx++) {
    //  var oneCE = this.__activeWindowSnapShot.AllCEAr[jdx];
    //  toReturn = toReturn.concat(this.Xyyz.OneCEMan.GetDebugDataOneCE(oneCE));
    //}

    for (var kdx = 0; kdx < toReturn.length; kdx++) {
      this.AllAgents.Logger.Log(toReturn[kdx]);
    }

    this.AllAgents.Logger.FuncEnd('ShowDebugDataOneWindow');
    return toReturn;
  }
  private __drawCorrectNicknameInUI(snapShots: IDataOneWindowStorage[]) {
    this.AllAgents.Logger.FuncStart(this.__drawCorrectNicknameInUI.name);
    var targetId: IGuid = this.UiMan().CurrentMenuState.SelectSnapshotId;
    if (targetId) {
      this.AllAgents.Logger.Log('targetId : ' + targetId.AsString);

      var storageValues = snapShots;

      var storageMatch;

      for (var idx = 0; idx < storageValues.length; idx++) {
        var candidate = storageValues[idx];
        if (candidate.Id.AsString === this.CurrentMenuState.SelectSnapshotId.AsString) {
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

  //GetIdOfSelectWindowSnapshot(): IGuid {
  //  this.allAgents.Logger.FuncStart(this.GetIdOfSelectWindowSnapshot.name);

  //  var targetSel: HTMLSelectElement = this.__getSelectElem();
  //  var toReturn: IGuid = null;
  //  if (targetSel) {
  //    var selectedValue: string = targetSel.value;
  //    if (selectedValue) {
  //      toReturn = this.AllAgents.HelperAgent.GuidHelp.ParseGuid(selectedValue);
  //    }
  //    //var optionsLength = targetSel.options.length;
  //    //if (this.__selectSnapshotId < optionsLength) {
  //    //  var temp = targetSel.options[this.__selectSnapshotId].value;
  //    //  //this.debug().Log('temp: ' + temp);
  //    //  toReturn = this.GuidMan().ParseGuid(temp);
  //    //}
  //  }

  //  if (!toReturn) {
  //    this.allAgents.Logger.Log('using empty guid');
  //    toReturn = this.AllAgents.HelperAgent.GuidHelp.EmptyGuid();
  //  }

  //  this.allAgents.Logger.DebugIGuid(toReturn);

  //  this.allAgents.Logger.FuncEnd(this.GetIdOfSelectWindowSnapshot.name, toReturn.AsString);
  //  return toReturn;
  //}

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

  AssignOnChangeEvent(selector: string, handler: Function): void {
    this.AllAgents.Logger.FuncStart(this.AssignOnChangeEvent.name, selector);
    var targetElem: HTMLElement = document.querySelector(selector);
    if (!targetElem) {
      this.AllAgents.Logger.ErrorAndThrow(this.AssignOnClickEvent.name, 'No Id: ' + selector);
    } else {
      var popHub: PopUpHub = this.PopHub;
      targetElem.onchange = (evt) => { handler(evt, popHub) };
    }
    this.AllAgents.Logger.FuncEnd(this.AssignOnChangeEvent.name, selector);
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