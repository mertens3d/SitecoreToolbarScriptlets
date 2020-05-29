import { PopUpManagerBase } from './PopUpManagerBase';
import { PopUpHub } from './PopUpHub';

import { IOneStorageData } from '../../../Shared/scripts/Interfaces/IOneStorageData';
import { IDataOneTreeNode } from '../../../Shared/scripts/Interfaces/IDataOneTreeNode';
import { IDataOneWindowStorage } from '../../../Shared/scripts/Interfaces/IDataOneWindowStorage';
import { IDataOneStorageCE } from '../../../Shared/scripts/Interfaces/IDataOneStorageCE';
import { scWindowType } from '../../../Shared/scripts/Enums/scWindowType';
import { ICallbackDataDebugTextChanged } from '../../../Shared/scripts/Interfaces/ICallbackDataDebugTextChanged';
import { PayloadDataFromContent } from '../../../Shared/scripts/Classes/PayloadDataFromContent';
import { MsgFromPopUp } from "../../../Shared/scripts/Classes/MsgFromPopUp";
import { MsgFlag } from '../../../Shared/scripts/Enums/MessageFlag';
import { IGuid } from '../../../Shared/scripts/Interfaces/IGuid';
import { ICurrStateContent } from '../../../Shared/scripts/Interfaces/ICurrState';
import { IOneCommand } from '../../../Shared/scripts/Interfaces/IOneCommand';
import { MenuCommand } from '../../../Shared/scripts/Enums/MenuCommand';
import { StaticHelpers } from '../../../Shared/scripts/Classes/StaticHelpers';
import { ISelectionHeaders } from '../../../Shared/scripts/Interfaces/ISelectionHeaders';
import { SnapShotFlavor } from '../../../Shared/scripts/Enums/SnapShotFlavor';
import { SettingType } from '../../../Shared/scripts/Enums/SettingType';
import { BuildDateStamp } from '../../../Shared/scripts/AutoBuild/BuildNum';
import { UrlParts } from '../../../Shared/scripts/Interfaces/UrlParts';
import { PopConst } from '../Classes/PopConst';
import { SettingKey } from '../../../Shared/scripts/Enums/SettingKey';
import { SettingsAgent } from '../../../Shared/scripts/Agents/Agents/SettingsAgent/SettingsAgent';
import { UiButtonStateManager } from './UiButtonStateManager';
import { IMenuState } from '../../../Shared/scripts/Interfaces/IMenuState';
import { IAllAgents } from "../../../Shared/scripts/Interfaces/Agents/IallAgents";
import { IOneGenericSetting } from '../../../Shared/scripts/Interfaces/Agents/IOneGenericSetting';

export class UiManager extends PopUpManagerBase {
  TabId: string;
  ParentFocused: boolean = false;
  MenuFocused: boolean = true;
  OtherFocused: boolean = false;
  MenuEnabled: boolean = true;
  CurrContentState: ICurrStateContent;
  ButtonStateManager: UiButtonStateManager;
  lineBreak = '<br/>';
  indentedLineBreak = '<br/>&nbsp;&nbsp;&nbsp;';

  CurrentMenuState: IMenuState = {
    SelectSnapshotId: null,
  }
  MsgStatusDiv: HTMLDivElement;

  constructor(popHub: PopUpHub, allAgents: IAllAgents) {
    super(popHub, allAgents);

    this.AllAgents.Logger.FuncStart(UiManager.name);

    this.ButtonStateManager = new UiButtonStateManager(this.PopHub, this.AllAgents);
    this.AllAgents.Logger.FuncEnd(UiManager.name);
  }

  Init() {
    this.AllAgents.Logger.FuncStart(UiManager.name, this.Init.name);

    var self = this;
    this.AllAgents.Logger.AddDebugTextChangedCallback(self, this.HndlrDebugTextChanged);

    this.LookForMsgStatusDiv();
    this.WriteBuildNumToUi();

    this.MsgMan().SendMessageToContentTab(new MsgFromPopUp(MsgFlag.ReqCurState, this.PopHub), this.TabMan().CurrentTabData);

    this.AllAgents.Logger.FuncEnd(UiManager.name, this.Init.name);
  }
  LookForMsgStatusDiv() {
    this.MsgStatusDiv = document.querySelector(PopConst.Const.Selector.HS.DivMsgStatus);
  }
  UpdateMsgStatusStack(textToShow: string) {
    if (this.MsgStatusDiv) {
      this.MsgStatusDiv.innerHTML = textToShow + '</br>' + this.MsgStatusDiv.innerHTML;
    }
    this.AllAgents.Logger.Log('msg stat: ' + textToShow);
  }

  OnSuccessfullCommand(): void {
    this.AllAgents.Logger.FuncStart(this.OnSuccessfullCommand.name);
    try {
      this.UpdateMsgStatusStack('Command Completed Successfully');

      let setting: IOneGenericSetting = this.SettingsMan().GetByKey(SettingKey.DebugKeepDialogOpen);
      if (!this.AllAgents
        .SettingsAgent.ValueAsBool(setting)) {
        window.close();
      } else {
        this.AllAgents.Logger.Log('Window not closed because of setting: ' + setting.Friendly)
      }
    } catch (ex) {
      console.log(ex.toString());
      //this.allAgents.Logger.Error(this.CloseWindow.name, ex.toString());
    }
    this.AllAgents.Logger.FuncEnd(this.OnSuccessfullCommand.name);
  }
  WriteBuildNumToUi() {
    this.AllAgents.Logger.LogVal('BuildDateStamp', BuildDateStamp);

    var targetTag: HTMLElement = document.querySelector(PopConst.Const.Selector.HS.BuildStamp);
    if (targetTag) {
      targetTag.innerText = 'build: ' + this.Helpers().UtilityHelp.MakeFriendlyDate(new Date(BuildDateStamp));
    } else {
      this.AllAgents.Logger.Error(this.WriteBuildNumToUi.name, 'No Build Stamp Element Found');
    }
  }

  private __drawStoragePretty(ourData: IOneStorageData[]) {
    this.AllAgents.Logger.FuncStart(this.__drawStoragePretty.name);

    this.ClearTextArea();

    for (var idx = 0; idx < ourData.length; idx++) {
      this.AllAgents.Logger.Log('key: \t' + ourData[idx].key);
      var parsed: IDataOneWindowStorage = <IDataOneWindowStorage>JSON.parse(ourData[idx].data);
      if (parsed) {
        this.DrawDebugDataPretty(parsed);
        this.AllAgents.Logger.Log('------------');
      }
    }
    this.AllAgents.Logger.FuncEnd(this.__drawStoragePretty.name);
  }
  DebugDataOneNode(dataOneTreeNode: IDataOneTreeNode): string {
    this.AllAgents.Logger.FuncStart(this.DebugDataOneNode.name);
    var activeOrNot = dataOneTreeNode.IsActive ? '* ' : '  ';
    var expandedOrNot = dataOneTreeNode.IsExpanded ? '+ ' : '  ';

    var toReturn: string = activeOrNot + expandedOrNot + dataOneTreeNode.NodeId.AsString + ' ' + dataOneTreeNode.NodeFriendly;
    this.AllAgents.Logger.FuncEnd(this.DebugDataOneNode.name);
    return toReturn;
  }
  GetDebugDataOneCE(dataOneCe: IDataOneStorageCE): string[] {
    this.AllAgents.Logger.FuncStart('GetDebugDataOneCE');
    var toReturn: string[] = [];
    toReturn.push('------ All Tree Nodes -----');

    for (var idx = 0; idx < dataOneCe.AllTreeNodeAr.length; idx++) {
      this.AllAgents.Logger.Log('idx: ' + idx);
      var oneVal = this.DebugDataOneNode(dataOneCe.AllTreeNodeAr[idx]);
      this.AllAgents.Logger.Log('oneVal : ' + oneVal);
      toReturn.push(oneVal);
    }

    this.AllAgents.Logger.FuncEnd(this.GetDebugDataOneCE.name);
    return toReturn;
  }

  __buildDebugDataPretty(dataOneWindow: IDataOneWindowStorage) {
    this.AllAgents.Logger.FuncStart(this.__buildDebugDataPretty.name, 'data not null? ' + this.AllAgents.Logger.IsNullOrUndefined(dataOneWindow));

    var toReturn: string[] = [];
    if (dataOneWindow) {
      toReturn.push('------ One Window Snap Shot Start -----');
      toReturn.push('Id: ' + dataOneWindow.Id);
      toReturn.push('TimeStamp: ' + dataOneWindow.TimeStamp);
      toReturn.push('CE Count: ' + dataOneWindow.AllCEAr.length);
      toReturn.push('Type: ' + scWindowType[dataOneWindow.WindowType]);
      toReturn.push('Nickname: ' + dataOneWindow.NickName);
      for (var jdx = 0; jdx < dataOneWindow.AllCEAr.length; jdx++) {
        toReturn.push('\t------ One CE Start -----');
        var dataOneCE: IDataOneStorageCE = dataOneWindow.AllCEAr[jdx];
        toReturn.push('\tId: ' + dataOneCE.Id.AsString);

        var allCeDebugDataAr = this.GetDebugDataOneCE(dataOneCE);
        for (var kdx = 0; kdx < allCeDebugDataAr.length; kdx++) {
          toReturn.push('\t\t' + allCeDebugDataAr[kdx]);
        }
        toReturn.push('\t------ One CE End -----');
      }
      toReturn.push('------ One Window Snap Shot End -----');

      this.AllAgents.Logger.FuncEnd(this.__buildDebugDataPretty.name);
    } else {
      this.AllAgents.Logger.Error(this.__buildDebugDataPretty.name, 'missing data')
    }
    return toReturn;
  }
  DrawDebugDataPretty(source: IDataOneWindowStorage): void {
    this.AllAgents.Logger.FuncStart(this.DrawDebugDataPretty.name, 'source not null: ' + this.AllAgents.Logger.IsNullOrUndefined(source));

    var allDebugData: string[] = this.__buildDebugDataPretty(source);

    //allDebugData = allDebugData.concat(this.__drawSettings());

    for (var ldx = 0; ldx < allDebugData.length; ldx++) {
      this.PopHub.FeedbackMan.WriteLine(allDebugData[ldx]);
    }

    this.AllAgents.Logger.FuncEnd(this.DrawDebugDataPretty.name);
  }

  ClearTextArea(): void {
    var ta = this.__getTextArea();
    if (ta) {
      ta.value = '';
    } else {
      this.AllAgents.Logger.Error(this.ClearTextArea.name, 'No text area found');
    }
  }

  __getTextArea(): HTMLTextAreaElement {
    return <HTMLTextAreaElement>document.querySelector(PopConst.Const.Selector.HS.TaDebug);
  }

  HndlrDebugTextChanged(caller: any, data: ICallbackDataDebugTextChanged) {
    var self = caller;
    var ta = self.__getTextArea();

    if (ta) {
      if (data.Append) {
        ta.value += data.NewText + '\n';
      } else {
        ta.value = data.NewText + '\n';
      }

      ta.scrollTop = ta.scrollHeight;
    }
  }

  //SetParentInfo(winDataParent: IDataBrowserTab) {
  //  var targetSpan = document.getElementById(PopConst.Const.ElemId.HindSiteParentInfo);
  //  if (targetSpan) {
  //    targetSpan.innerHTML = ' | Parent Id: ' + winDataParent.DataDocSelf.DocId.AsShort + ' | ' + winDataParent.Window.location.href;
  //  }
  //}

  SetaccordionClass(targetElem: HTMLElement, isCollapsed: boolean) {
    if (!isCollapsed) {
      targetElem.classList.remove(PopConst.Const.ClassNames.HS.Collapsed);
    } else {
      targetElem.classList.add(PopConst.Const.ClassNames.HS.Collapsed);
    }
  }

  GetaccordionContentElem(sib: HTMLElement): HTMLElement {
    //this.debug().FuncStart(this.GetaccordionContentElem.name);
    var toReturn: HTMLElement;
    if (sib) {
      var siblings = sib.parentElement.getElementsByClassName('accordion-content');

      if (siblings) {
        var toReturn = <HTMLElement>siblings[0];
      }
    }

    //this.debug().FuncEnd(this.GetaccordionContentElem.name);
    return toReturn;
  }

  DrawStorageResponse(data: PayloadDataFromContent) {
    this.AllAgents.Logger.FuncStart('DrawStorage');
    try {
      //var ourData: IOneStorageData[] = this.__getAllLocalStorageAsIOneStorageData();

      if (data.State.SnapShotsMany.CurrentSnapShots) {
        //this.__drawStorageRaw(data.CurrentSnapShots)
        //this.__drawStoragePretty(data.CurrentSnapShots)
      }
    } catch (e) {
      this.AllAgents.Logger.Error(this.DrawStorageResponse.name, e.message);
    }
    this.AllAgents.Logger.FuncEnd('DrawStorage');
  }

  private __drawStorageRaw(ourData: IOneStorageData[]) {
    this.AllAgents.Logger.FuncStart('DrawStorageRaw');
    for (var idx = 0; idx < ourData.length; idx++) {
      this.AllAgents.Logger.Log('key: \t' + ourData[idx].key);
      this.AllAgents.Logger.Log('data: \t' + ourData[idx].data);
      this.AllAgents.Logger.Log('------------');
    }
    this.AllAgents.Logger.FuncEnd('DrawStorageRaw');
  }

  async RestoreaccordionState(oneSetting: IOneGenericSetting, foundElem: HTMLElement): Promise<void> {
    this.AllAgents.Logger.FuncStart(this.RestoreaccordionState.name);
    var contentSib = this.GetaccordionContentElem(foundElem);
    if (contentSib) {
      this.SetaccordionClass(contentSib, <boolean>oneSetting.ValueAsObj)
    } else {
      this.AllAgents.Logger.Error(this.RestoreaccordionState.name, 'Sibling not found');
    }
    this.AllAgents.Logger.FuncEnd(this.RestoreaccordionState.name);
  }

  async UpdateAtticFromUi(): Promise<any> {
    this.AllAgents.Logger.FuncStart(this.UpdateAtticFromUi.name);

    //let currentSettings: IDataPopUpSettings = await this.PopAtticMan().CurrentSettings();
    //let currentVal = (<HTMLInputElement>document.querySelector(PopConst.Const.Selector.HS.iCBoxdSettingsShowLogData)).checked;
    //currentVal = true; //todo - remove after debugging
    //this.allAgents.Logger.LogVal('currentVal', currentVal.toString())
    //currentSettings.LogSettings.ShowDebugData = currentVal;

    //this.PopAtticMan().StoreSettings(currentSettings);
    this.RefreshUiFromCache();
    this.AllAgents.Logger.FuncEnd(this.UpdateAtticFromUi.name);
  }

  SelectChanged(): void {
    this.AllAgents.Logger.FuncStart(this.SelectChanged.name);
    this.CurrentMenuState.SelectSnapshotId = this.Helpers().GuidHelp.ParseGuid(this.__getSelectElem().value);
    //this.debug().Log('new index :' + this.__selectSnapshotId);

    //if (e.ctrlKey) {
    //  alert
    //}

    this.RefreshUiFromCache();
    this.AllAgents.Logger.FuncEnd(this.SelectChanged.name);
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

  //async __refreshSettings() {
  //  this.allAgents.Logger.FuncStart(this.__refreshSettings.name);
  //  let debugFieldSet: HTMLFieldSetElement = <HTMLFieldSetElement>window.document.querySelector(PopConst.Const.Selector.HS.IdFieldSetDebug);

  //  let currentSettings: IDataPopUpSettings =  await this.PopAtticMan().CurrentSettings();
  //  if (currentSettings) {
  //    if (debugFieldSet) {
  //      let newDisplay = currentSettings.LogSettings.ShowDebugData ? '' : 'none';
  //      debugFieldSet.style.display = newDisplay;
  //    }
  //    let checkBoxShowDebug: HTMLInputElement = <HTMLInputElement>window.document.querySelector(PopConst.Const.Selector.HS.iCBoxdSettingsShowLogData);
  //    if (checkBoxShowDebug) {
  //      this.allAgents.Logger.LogVal('before', checkBoxShowDebug.checked.toString());
  //      checkBoxShowDebug.checked = currentSettings.LogSettings.ShowDebugData;
  //      this.allAgents.Logger.LogVal('after', checkBoxShowDebug.checked.toString());
  //    } else {
  //      this.allAgents.Logger.Error(this.__refreshSettings.name, 'no checkbox found');
  //    }
  //  }
  //  else {
  //    this.allAgents.Logger.Error(this.__refreshSettings.name, 'no settings found');
  //  }
  //  this.allAgents.Logger.FuncEnd(this.__refreshSettings.name);
  //}

  RefreshUiGenericSettings() {
    this.AllAgents.Logger.FuncStart(this.RefreshUiGenericSettings.name);
    for (var idx = 0; idx < this.SettingsMan().AllSettings.SettingsAr.length; idx++) {
      var oneSetting: IOneGenericSetting = this.SettingsMan().AllSettings.SettingsAr[idx];
      //this.allAgents.Logger.LogVal('setting', StaticHelpers.SettingKeyAsString(oneSetting.SettingKey));
      var foundElem: HTMLElement = document.querySelector(oneSetting.UiSelector);
      if (foundElem) {
        if (oneSetting.DataType === SettingType.BoolCheckBox) {
          let valueToDisplay: boolean = <boolean>(oneSetting.ValueAsObj || oneSetting.DefaultValue);
          //this.allAgents.Logger.LogVal('valueToDisplay', valueToDisplay);
          (<HTMLInputElement>foundElem).checked = valueToDisplay;
        }
        if (oneSetting.DataType === SettingType.Accordion) {
          this.RestoreaccordionState(oneSetting, foundElem);
        }
      } else {
        this.AllAgents.Logger.Error(this.RefreshUiGenericSettings.name, 'ui element not found: ' + oneSetting.UiSelector);
      }
    }
    this.AllAgents.Logger.FuncEnd(this.RefreshUiGenericSettings.name);
  }

  async RefreshUiFromCache() {
    this.AllAgents.Logger.FuncStart(this.RefreshUiFromCache.name);

    this.RefreshUiGenericSettings();

    this.UiMan().PopulateState(this.MsgMan().LastKnownContentState);

    this.PopulateStateOfSnapShotSelect(this.MsgMan().LastKnownContentState.SnapShotsMany.CurrentSnapShots);

    this.ButtonStateManager.RefreshButtonStates();

    this.__drawCorrectNicknameInUI(this.MsgMan().LastKnownContentState.SnapShotsMany.CurrentSnapShots);

    this.AllAgents.Logger.FuncEnd(this.RefreshUiFromCache.name);
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

  private __getSelectElem(): HTMLSelectElement {
    return <HTMLSelectElement>window.document.querySelector(PopConst.Const.Selector.HS.SelStateSnapShot);
  }

  //GetIdOfSelectWindowSnapshot(): IGuid {
  //  this.allAgents.Logger.FuncStart(this.GetIdOfSelectWindowSnapshot.name);

  //  var targetSel: HTMLSelectElement = this.__getSelectElem();
  //  var toReturn: IGuid = null;
  //  if (targetSel) {
  //    var selectedValue: string = targetSel.value;
  //    if (selectedValue) {
  //      toReturn = this.Helpers().GuidHelp.ParseGuid(selectedValue);
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
  //    toReturn = this.Helpers().GuidHelp.EmptyGuid();
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
      this.AllAgents.Logger.Error(this.AssignOnClickEvent.name, 'No Id: ' + targetId);
    } else {
      targetElem.addEventListener('checked', (evt) => { handler(evt) });
    }
  }

  AssignOnClickEvent(targetId: string, handler: Function): void {
    var targetElem = this.GetButtonByIdOrSelector(targetId);

    if (!targetElem) {
      this.AllAgents.Logger.Error(this.AssignOnClickEvent.name, 'No Id: ' + targetId);
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
      this.AllAgents.Logger.Error(this.AssignOnClickEvent.name, 'No Id: ' + selector);
    } else {
      var popHub: PopUpHub = this.PopHub;
      targetElem.onchange = (evt) => { handler(evt, popHub) };
    }
    this.AllAgents.Logger.FuncEnd(this.AssignOnChangeEvent.name, selector);
  }
  AssignDblClickEvent(selector: string, handler: Function): void {
    var targetElem: HTMLElement = document.querySelector(selector);
    if (!targetElem) {
      this.AllAgents.Logger.Error(this.AssignOnClickEvent.name, 'No Id: ' + selector);
    } else {
      targetElem.ondblclick = (evt) => { handler(evt) };
    }
  }
  PopulateContentStateDivContent(contentState: ICurrStateContent) {
    var targetCurrStateDiv: HTMLDivElement = <HTMLDivElement>window.document.querySelector(PopConst.Const.Selector.HS.DivStateContent);
    var allStateText: string = this.lineBreak + 'Content State as of: ' + this.Helpers().UtilityHelp.MakeFriendlyDate(new Date());

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
    var targetCurrStateDiv: HTMLDivElement = <HTMLDivElement>window.document.querySelector(PopConst.Const.Selector.HS.DivStatePopUp);

    //this.allAgents.Logger.LogVal('now', new Date().toString());
    //var allTaText: string = 'State as of: ' + (new Date()).toString();
    var allStateText: string = this.lineBreak + 'PopUp State as of: ' + this.Helpers().UtilityHelp.MakeFriendlyDate(new Date());

    if (targetCurrStateDiv) {
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

      allStateText += this.indentedLineBreak + 'Url Full (parts): ' + this.Helpers().UrlHelp.BuildFullUrlFromParts(urlParts).AbsUrl;

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
      }

      targetCurrStateDiv.innerHTML = allStateText;
    }
  }

  async PopulateState(contentState: ICurrStateContent) {
    this.AllAgents.Logger.FuncStart(this.PopulateState.name);

    this.AllAgents.Logger.DebugIDataBrowserTab(this.TabMan().CurrentTabData);

    this.CurrContentState = contentState;
    if (this.AllAgents.Logger.IsNotNullOrUndefinedBool('state', contentState)) {
      this.UiMan().PopulateStateOfSnapShotSelect(contentState.SnapShotsMany.CurrentSnapShots);
      this.PopulateContentStateDivPopUp();
      this.PopulateContentStateDivContent(contentState);
    }
    this.AllAgents.Logger.FuncEnd(this.PopulateState.name);
  }

  PopulateSnapShotsAuto() {
  }

  PopulateSnapShotsNotAuto() {
  }

  CleanExistingSelection(targetSel: HTMLSelectElement) {
    var optGroup = targetSel.querySelector('[id=' + PopConst.Const.ElemId.HS.SelectHeaderAutoTitle + ']')
    if (optGroup) {
      optGroup.remove();
    }

    optGroup = targetSel.querySelector('[id=' + PopConst.Const.ElemId.HS.SelectHeaderAuto + ']')
    if (optGroup) {
      optGroup.remove();
    }
    optGroup = targetSel.querySelector('[id=' + PopConst.Const.ElemId.HS.SelectHeaderFavorite + ']')
    if (optGroup) {
      optGroup.remove();
    }

    optGroup = targetSel.querySelector('[id=' + PopConst.Const.ElemId.HS.SelectHeaderFavoriteTitle + ']')
    if (optGroup) {
      optGroup.remove();
    }

    targetSel.options.length = 0;
  }

  WriteHeaders(targetSel: HTMLSelectElement) {
    var toReturn: ISelectionHeaders = {
      Auto: null,
      Favorite: null,
      AutoTitle: null,
      FavoriteTitle: null,
    }

    toReturn.Auto = <HTMLOptGroupElement>window.document.createElement('optgroup');
    toReturn.Auto.label = this.Helpers().UtilityHelp.SelectHeaderStr('');
    toReturn.Auto.id = PopConst.Const.ElemId.HS.SelectHeaderAuto;

    toReturn.AutoTitle = <HTMLOptGroupElement>window.document.createElement('optgroup');
    toReturn.AutoTitle.label = 'Auto Snap Shots';
    toReturn.AutoTitle.id = PopConst.Const.ElemId.HS.SelectHeaderAutoTitle;
    toReturn.AutoTitle.classList.add('title');

    toReturn.Favorite = <HTMLOptGroupElement>window.document.createElement('optgroup');
    toReturn.Favorite.label = this.Helpers().UtilityHelp.SelectHeaderStr('');
    toReturn.Favorite.id = PopConst.Const.ElemId.HS.SelectHeaderFavorite;

    toReturn.FavoriteTitle = <HTMLOptGroupElement>window.document.createElement('optgroup');
    toReturn.FavoriteTitle.label = 'Tyical Snap Shots';
    toReturn.FavoriteTitle.id = PopConst.Const.ElemId.HS.SelectHeaderFavoriteTitle;
    toReturn.FavoriteTitle.classList.add('title');

    return toReturn;
  }

  PopulateStateOfSnapShotSelect(snapShots: IDataOneWindowStorage[]) {
    this.AllAgents.Logger.FuncStart(this.PopulateStateOfSnapShotSelect.name);

    if (snapShots) {
      var targetSel: HTMLSelectElement = this.__getSelectElem();

      if (targetSel) {
        this.CleanExistingSelection(targetSel);
        var headers: ISelectionHeaders = this.WriteHeaders(targetSel);

        if (snapShots && snapShots.length > 0) {
          this.AllAgents.Logger.Log('targetSel.options.length : ' + targetSel.options.length);

          for (var idx: number = 0; idx < snapShots.length; idx++) {
            var data = snapShots[idx];

            var el = <HTMLOptionElement>window.document.createElement('option');
            el.innerHTML = this.PopHub.Helpers.UtilityHelp.TimeNicknameFavStr(data);

            if (data.Flavor === SnapShotFlavor.Favorite) {
              el.classList.add('favorite');
            }

            el.value = data.Id.AsString;
            if (data.Id && this.CurrentMenuState.SelectSnapshotId) {
              if (data.Id.AsString === this.CurrentMenuState.SelectSnapshotId.AsString) {
                el.selected = true;
              }
            }
            if (data.Flavor === SnapShotFlavor.Autosave) {
              headers.Auto.appendChild(el);
            } else {
              headers.Favorite.appendChild(el);
            }
          }
        }

        targetSel.appendChild(headers.FavoriteTitle);
        targetSel.appendChild(headers.Favorite);
        targetSel.appendChild(headers.AutoTitle);
        targetSel.appendChild(headers.Auto);

        if (!this.CurrentMenuState.SelectSnapshotId || this.CurrentMenuState.SelectSnapshotId === this.Helpers().GuidHelp.EmptyGuid()) {
          targetSel.selectedIndex = 0;
        }
      }
    }
    this.AllAgents.Logger.FuncEnd(this.PopulateStateOfSnapShotSelect.name);
  }
}