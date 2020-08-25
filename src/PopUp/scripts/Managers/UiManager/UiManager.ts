import { AccordianManager } from '../../../../Shared/scripts/Agents/Drones/AccordianDrone/AccordianManager';
import { BuiltDateStamp } from '../../../../Shared/scripts/AutoBuild/BuildNum';
import { StaticHelpers } from '../../../../Shared/scripts/Classes/StaticHelpers';
import { MsgFlag } from '../../../../Shared/scripts/Enums/1xxx-MessageFlag';
import { MenuCommand } from '../../../../Shared/scripts/Enums/2xxx-MenuCommand';
import { SettingKey } from '../../../../Shared/scripts/Enums/3xxx-SettingKey';
import { SettingType } from '../../../../Shared/scripts/Enums/SettingType';
import { IAccordianManager } from '../../../../Shared/scripts/Interfaces/Agents/IAccordianManager';
import { IAllAgents } from "../../../../Shared/scripts/Interfaces/Agents/IallAgents";
import { IOneGenericSetting } from '../../../../Shared/scripts/Interfaces/Agents/IOneGenericSetting';
import { ICurrStateContent } from '../../../../Shared/scripts/Interfaces/ICurrState';
import { IDataOneWindowStorage } from '../../../../Shared/scripts/Interfaces/IDataOneWindowStorage';
import { IGuid } from '../../../../Shared/scripts/Interfaces/IGuid';
import { IMenuState } from '../../../../Shared/scripts/Interfaces/IMenuState';
import { IOneCommand } from '../../../../Shared/scripts/Interfaces/IOneCommand';
import { UrlParts } from '../../../../Shared/scripts/Interfaces/UrlParts';
import { PopConst } from '../../Classes/PopConst';
import { PopUpHub } from '../PopUpHub';
import { PopUpManagerBase } from '../PopUpManagerBase';
import { UiButtonStateManager } from '../UiButtonStateManager';
import { SelectSnapshotModule } from './Modules/SelectSnapshotModule/SelectSnapshotModule';
import { CommunicationsFeedbackModule } from "./Modules/UiFeedbackModules/CommunicationsFeedbackModule/CommunicationsFeedbackModule";
import { UiContentStateModule } from './Modules/UiFeedbackModules/ContentStateModule/UiContentStateModule';
import { StorageFeedbackModule } from './Modules/UiFeedbackModules/StorageFeedbackModule/StorageFeedbackModule';
import { UiFeedbackModuleLog } from './Modules/UiFeedbackModules/UiFeedbackModuleLog/UiFeedbackModuleLog';

export class UiManager extends PopUpManagerBase {
  
  
   
  AccordianManager: IAccordianManager;
  ButtonStateManager: UiButtonStateManager;
  CommunicationsFeedbackModule: CommunicationsFeedbackModule;
  CurrContentState: ICurrStateContent;
  private FeedbackModuleLog: UiFeedbackModuleLog;
  private FeedbackModuleState: UiContentStateModule;
  private FeedbackModuleStorage: StorageFeedbackModule;
  indentedLineBreak = '<br/>&nbsp;&nbsp;&nbsp;';
  lineBreak = '<br/>';
  MenuEnabled: boolean = true;
  MenuFocused: boolean = true;
  OtherFocused: boolean = false;
  ParentFocused: boolean = false;
  private SelectSnapShotModule: SelectSnapshotModule;
  TabId: string;

  CurrentMenuState: IMenuState = {
    SelectSnapshotId: null,
  }
    

  constructor(popHub: PopUpHub, allAgents: IAllAgents) {
    super(popHub, allAgents);

    this.AllAgents.Logger.FuncStart(UiManager.name);

    this.ButtonStateManager = new UiButtonStateManager(this.PopHub, this.AllAgents);

    this.AccordianManager = new AccordianManager(this.AllAgents.Logger, this.AllAgents.SettingsAgent);

    this.CommunicationsFeedbackModule = new CommunicationsFeedbackModule(PopConst.Const.Selector.HS.DivOverlayModule, this.AllAgents.Logger);
    this.FeedbackModuleLog = new UiFeedbackModuleLog(PopConst.Const.ElemId.textAreaFeedback, this.AllAgents.Logger);
    this.FeedbackModuleState = new UiContentStateModule(PopConst.Const.Selector.HS.DivStatePopUp, this.AllAgents.Logger);


    this.SelectSnapShotModule = new SelectSnapshotModule(PopConst.Const.Selector.HS.SelStateSnapShot, this.AllAgents.Logger, this.Helpers().GuidHelper)

    this.AllAgents.Logger.FuncEnd(UiManager.name);
  }

  Init() {
    this.AllAgents.Logger.FuncStart(UiManager.name, this.Init.name);

    var self = this;
    //this.AllAgents.Logger.AddDebugTextChangedCallback(self, this.FeedbackModuleDebugData.HndlrDebugTextChanged);

    this.WriteBuildNumToUi();

    this.InitUiTextAreaModules();

    //this.MsgMan().SendMessageToContentTab(new MsgFromPopUp(MsgFlag.Ping, this.PopHub), this.TabMan().CurrentTabData);

    this.ScheduleAutoSaveSnapShot();
    this.ScheduleAutoLogin();

    this.AllAgents.Logger.FuncEnd(UiManager.name, this.Init.name);
  }
  SelectChanged() {
    this.SelectSnapShotModule.SelectChanged();
    this.RefreshUi();
  }
  private InitUiTextAreaModules() {
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
        this.CommunicationsFeedbackModule.UpdateMsgStatusStack('Command Completed Successfully');

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


  




  async UpdateAtticFromUi(): Promise<any> {
    this.AllAgents.Logger.FuncStart(this.UpdateAtticFromUi.name);

    //let currentSettings: IDataPopUpSettings = await this.PopAtticMan().CurrentSettings();
    //let currentVal = (<HTMLInputElement>document.querySelector(PopConst.Const.Selector.HS.iCBoxdSettingsShowLogData)).checked;
    //currentVal = true; //todo - remove after debugging
    //this.allAgents.Logger.LogVal('currentVal', currentVal.toString())
    //currentSettings.LogSettings.ShowDebugData = currentVal;

    //this.PopAtticMan().StoreSettings(currentSettings);
    this.RefreshUi();
    this.AllAgents.Logger.FuncEnd(this.UpdateAtticFromUi.name);
  }



  private __GetCancelButton() {
    return document.getElementById(PopConst.Const.ElemId.HS.Btn.HsCancel);
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

  RefreshUiGenericSettings() {
    this.AllAgents.Logger.FuncStart(this.RefreshUiGenericSettings.name);
    for (var idx = 0; idx < this.AllAgents.SettingsAgent.SettingsAr.length; idx++) {
      var oneSetting: IOneGenericSetting = this.AllAgents.SettingsAgent.SettingsAr[idx];
      //this.allAgents.Logger.LogVal('setting', StaticHelpers.SettingKeyAsString(oneSetting.SettingKey));
      if (oneSetting.UiSelector) {
        var foundElem: HTMLElement = document.querySelector(oneSetting.UiSelector);
        if (foundElem) {
          if (oneSetting.DataType === SettingType.BoolCheckBox) {
            let valueToDisplay: boolean = <boolean>(oneSetting.ValueAsObj || oneSetting.DefaultValue);
            //this.allAgents.Logger.LogVal('valueToDisplay', valueToDisplay);
            (<HTMLInputElement>foundElem).checked = valueToDisplay;
          }
          if (oneSetting.DataType === SettingType.Accordion) {
            this.AccordianManager.RestoreAccordionState(oneSetting);
          }
        } else {
          this.AllAgents.Logger.LogAsJsonPretty('oneSetting', oneSetting);
          this.AllAgents.Logger.ErrorAndThrow(this.RefreshUiGenericSettings.name, 'ui element not found: ' + oneSetting.UiSelector);
        }
      }
    }
    this.AllAgents.Logger.FuncEnd(this.RefreshUiGenericSettings.name);
  }

  async RefreshUi() {
  }

  async RefreshUiFromContentState(contentState: ICurrStateContent) {
    this.AllAgents.Logger.FuncStart(this.RefreshUiFromContentState.name);

    this.RefreshUiGenericSettings();

    this.UiMan().PopulateState(contentState);

    this.SelectSnapShotModule. PopulateStateOfSnapShotSelect(contentState.SnapShotsMany.CurrentSnapShots);

    this.ButtonStateManager.RefreshButtonStates();

    this.__drawCorrectNicknameInUI(contentState.SnapShotsMany.CurrentSnapShots);

    this.AllAgents.Logger.FuncEnd(this.RefreshUiFromContentState.name);
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
  PopulateContentStateDivContent(contentState: ICurrStateContent) {
    var targetCurrStateDiv: HTMLDivElement = <HTMLDivElement>window.document.querySelector(PopConst.Const.Selector.HS.DivStateContent);
    var allStateText: string = this.lineBreak + 'Content State as of: ' + this.AllAgents.HelperAgent.UtilityHelp.MakeFriendlyDate(new Date());

    if (targetCurrStateDiv) {
      allStateText += this.lineBreak + 'Editor:';
      allStateText += this.indentedLineBreak + 'Active Ce: '
      if (contentState.ActiveCe) {
        allStateText += contentState.ActiveCe.Id.AsShort;

        allStateText += this.indentedLineBreak + 'Active Node: '
        if (contentState.ActiveCe.ActiveNode) {
          allStateText += contentState.ActiveCe.ActiveNode.NodeFriendly + ' ' + contentState.ActiveCe.ActiveNode.NodeId.AsBracedGuid;
        } else {
          allStateText += '{no active node in CE}';
        }
      } else {
        allStateText += '{no active CE}';
      }
      allStateText += this.lineBreak;
      allStateText += this.lineBreak + 'Snap Shots: ';
      allStateText += this.indentedLineBreak + 'Birthday: ' + contentState.SnapShotsMany.Birthday.toString();
      allStateText += this.indentedLineBreak + 'Total Snapshots: ' + contentState.SnapShotsMany.CurrentSnapShots.length;
      allStateText += this.indentedLineBreak + 'Favorite Snapshots: ' + contentState.SnapShotsMany.FavoriteCount;
      allStateText += this.indentedLineBreak + 'Plain Snapshots: ' + contentState.SnapShotsMany.PlainCount;
      allStateText += this.indentedLineBreak + 'Auto Snapshots: ' + contentState.SnapShotsMany.SnapShotsAutoCount;

      allStateText += this.lineBreak;
      allStateText += 'Last Request: ' + MsgFlag[contentState.LastReq];

      allStateText += this.lineBreak;
      allStateText += 'Error Stack (' + contentState.ErrorStack.length + '):';
      for (var idx = 0; idx < contentState.ErrorStack.length; idx++) {
        allStateText += this.indentedLineBreak + idx + ' : ' + contentState.ErrorStack[idx].ContainerFunc + ' ' + contentState.ErrorStack[idx].ErrorString;
      }

      targetCurrStateDiv.innerHTML = allStateText;
    }
  }
  PopulateContentStateDivPopUp() {

    var allStateText: string = this.lineBreak + 'PopUp State as of: ' + this.AllAgents.HelperAgent.UtilityHelp.MakeFriendlyDate(new Date());

      allStateText += this.lineBreak + 'UI';

      allStateText += this.indentedLineBreak + 'Select Snapshot: ';
      if (this.CurrentMenuState.SelectSnapshotId) {
        allStateText += this.CurrentMenuState.SelectSnapshotId.AsShort;
      } else {
        allStateText += 'none selected';
      }

      allStateText += this.lineBreak + 'URL Parts';
      let urlParts: UrlParts = this.TabMan().CurrentTabData.UrlParts;
      allStateText += this.indentedLineBreak + 'Page Type: ' + StaticHelpers.WindowTypeAsString(urlParts.ScWindowType);

      allStateText += this.indentedLineBreak + 'Url Full (raw  ): ' + urlParts.OriginalRaw;

      allStateText += this.indentedLineBreak + 'Url Full (parts): ' + this.AllAgents.HelperAgent.UrlHelp.BuildFullUrlFromParts(urlParts).AbsUrl;

      allStateText += this.indentedLineBreak + 'Protocol: ' + urlParts.Protocol;

      allStateText += this.indentedLineBreak + 'Host & Port: ' + urlParts.HostAndPort;

      allStateText += this.indentedLineBreak + 'File Path: ' + urlParts.FilePath;
      //if (urlParts.FilePaths) {
      //  for (var idx = 0; idx < urlParts.FilePaths.length; idx++) {
      //    allTaText += this.lineBreak + '&nbsp;&nbsp;&nbsp;';
      //    allTaText += urlParts.FilePaths[idx];
      //  }
      //}

      allStateText += this.lineBreak + 'Parameters: ';
      if (urlParts.Parameters) {
        for (var idx = 0; idx < urlParts.Parameters.length; idx++) {
          allStateText += this.indentedLineBreak + this.indentedLineBreak + urlParts.Parameters[idx].Key;
          allStateText += '&nbsp; : &nbsp;';
          allStateText += urlParts.Parameters[idx].value || '';
        }


      this.FeedbackModuleState.AddHtml(allStateText);
     
    }
  }

  async PopulateState(contentState: ICurrStateContent) {
    this.AllAgents.Logger.FuncStart(this.PopulateState.name);

    this.AllAgents.Logger.DebugIDataBrowserTab(this.TabMan().CurrentTabData);

    this.CurrContentState = contentState;
    if (this.AllAgents.Logger.IsNotNullOrUndefinedBool('state', contentState)) {
      this.UiMan().SelectSnapShotModule.PopulateStateOfSnapShotSelect(contentState.SnapShotsMany.CurrentSnapShots);
      this.PopulateContentStateDivPopUp();
      this.PopulateContentStateDivContent(contentState);
    }
    this.AllAgents.Logger.FuncEnd(this.PopulateState.name);
  }

  PopulateSnapShotsAuto() {
  }

  PopulateSnapShotsNotAuto() {
  }





}