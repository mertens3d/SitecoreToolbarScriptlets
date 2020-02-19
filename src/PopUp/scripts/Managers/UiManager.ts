import { PopUpManagerBase } from './PopUpManagerBase';
import { PopUpHub } from './PopUpHub';

import { IOneStorageData } from '../../../Shared/scripts/Interfaces/IOneStorageData';
import { IDataOneTreeNode } from '../../../Shared/scripts/Interfaces/IDataOneTreeNode';
import { IDataOneWindowStorage } from '../../../Shared/scripts/Interfaces/IDataOneWindowStorage';
import { IDataOneStorageCE } from '../../../Shared/scripts/Interfaces/IDataOneStorageCE';
import { scWindowType } from '../../../Shared/scripts/Enums/scWindowType';
import { ICallbackDataDebugTextChanged } from '../../../Shared/scripts/Interfaces/ICallbackDataDebugTextChanged';
import { PayloadDataFromContent } from '../../../Shared/scripts/Classes/PayloadDataFromContent';
import { MsgFromPopUp } from '../../../Shared/scripts/Classes/MsgPayloadRequestFromPopUp';
import { MsgFlag } from '../../../Shared/scripts/Enums/MessageFlag';
import { IGuid } from '../../../Shared/scripts/Interfaces/IGuid';
import { ICurrStateContent } from '../../../Shared/scripts/Interfaces/ICurrState';
import { IOneCommand } from '../../../Shared/scripts/Interfaces/IOneCommand';
import { MenuCommand } from '../../../Shared/scripts/Enums/MenuCommand';
import { StaticHelpers } from '../../../Shared/scripts/Classes/StaticHelpers';
import { ISelectionHeaders } from '../../../Shared/scripts/Interfaces/ISelectionHeaders';
import { SnapShotFlavor } from '../../../Shared/scripts/Enums/SnapShotFlavor';
import { OneGenericSetting } from "../../../Shared/scripts/Classes/OneGenericSetting";
import { SettingType } from '../../../Shared/scripts/Enums/SettingType';
import { BuildDateStamp } from '../../../Shared/scripts/AutoBuild/BuildNum';
import { UrlParts } from '../../../Shared/scripts/Interfaces/UrlParts';
import { PopConst } from '../Classes/PopConst';
import { SettingKey } from '../../../Shared/scripts/Enums/SettingKey';
import { SettingsHelper } from '../../../Shared/scripts/Helpers/SettingsHelper';

export class UiManager extends PopUpManagerBase {
  private __selectSnapshotId: IGuid;

  TabId: string;
  ParentFocused: boolean = false;
  MenuFocused: boolean = true;
  OtherFocused: boolean = false;
  MenuEnabled: boolean = true;
  CurrContentState: ICurrStateContent;

  constructor(popHub: PopUpHub) {
    super(popHub);
    popHub.Log.FuncStart(UiManager.name);

    popHub.Log.FuncEnd(UiManager.name);
  }

  Init() {
    this.Log().FuncStart(UiManager.name, this.Init.name);
    var self = this;
    this.Log().AddDebugTextChangedCallback(self, this.HndlrDebugTextChanged);

    this.WriteBuildNumToUi();

    this.MsgMan().SendMessageToContentTab(new MsgFromPopUp(MsgFlag.ReqCurState, this.PopHub), this.TabMan().CurrentTabData);

    this.Log().FuncEnd(UiManager.name, this.Init.name);
  }
  OnSuccessfullCommand(): void {
    this.Log().FuncStart(this.OnSuccessfullCommand.name);
    try {
      let setting: OneGenericSetting = this.SettingsMan().GetByKey(SettingKey.DebugKeepDialogOpen);
      if (!SettingsHelper.ValueAsBool(setting)) {
        window.close();
      } else {
        this.Log().Log('Window not closed because of setting: ' + setting.Friendly)
      }
    } catch (ex) {
      console.log(ex.toString());
      //this.Log().Error(this.CloseWindow.name, ex.toString());
    }
    this.Log().FuncEnd(this.OnSuccessfullCommand.name);
  }
  WriteBuildNumToUi() {
    this.Log().LogVal('BuildDateStamp', BuildDateStamp);

    var targetTag: HTMLElement = document.querySelector(PopConst.Const.Selector.HS.BuildStamp);
    if (targetTag) {
      targetTag.innerText = 'build: ' + this.Helpers().UtilityHelp.MakeFriendlyDate(new Date(BuildDateStamp));
    } else {
      this.Log().Error(this.WriteBuildNumToUi.name, 'No Build Stamp Element Found');
    }
  }

  private __drawStoragePretty(ourData: IOneStorageData[]) {
    this.Log().FuncStart(this.__drawStoragePretty.name);

    this.ClearTextArea();

    for (var idx = 0; idx < ourData.length; idx++) {
      this.Log().Log('key: \t' + ourData[idx].key);
      var parsed: IDataOneWindowStorage = <IDataOneWindowStorage>JSON.parse(ourData[idx].data);
      if (parsed) {
        this.DrawDebugDataPretty(parsed);
        this.Log().Log('------------');
      }
    }
    this.Log().FuncEnd(this.__drawStoragePretty.name);
  }
  DebugDataOneNode(dataOneTreeNode: IDataOneTreeNode): string {
    this.Log().FuncStart(this.DebugDataOneNode.name);
    var activeOrNot = dataOneTreeNode.IsActive ? '* ' : '  ';
    var expandedOrNot = dataOneTreeNode.IsExpanded ? '+ ' : '  ';

    var toReturn: string = activeOrNot + expandedOrNot + dataOneTreeNode.NodeId.AsString + ' ' + dataOneTreeNode.NodeFriendly;
    this.Log().FuncEnd(this.DebugDataOneNode.name);
    return toReturn;
  }
  GetDebugDataOneCE(dataOneCe: IDataOneStorageCE): string[] {
    this.Log().FuncStart('GetDebugDataOneCE');
    var toReturn: string[] = [];
    toReturn.push('------ All Tree Nodes -----');

    for (var idx = 0; idx < dataOneCe.AllTreeNodeAr.length; idx++) {
      this.Log().Log('idx: ' + idx);
      var oneVal = this.DebugDataOneNode(dataOneCe.AllTreeNodeAr[idx]);
      this.Log().Log('oneVal : ' + oneVal);
      toReturn.push(oneVal);
    }

    this.Log().FuncEnd(this.GetDebugDataOneCE.name);
    return toReturn;
  }

  __buildDebugDataPretty(dataOneWindow: IDataOneWindowStorage) {
    this.Log().FuncStart(this.__buildDebugDataPretty.name, 'data not null? ' + this.Log().IsNullOrUndefined(dataOneWindow));

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

      this.Log().FuncEnd(this.__buildDebugDataPretty.name);
    } else {
      this.Log().Error(this.__buildDebugDataPretty.name, 'missing data')
    }
    return toReturn;
  }
  DrawDebugDataPretty(source: IDataOneWindowStorage): void {
    this.Log().FuncStart(this.DrawDebugDataPretty.name, 'source not null: ' + this.Log().IsNullOrUndefined(source));

    var allDebugData: string[] = this.__buildDebugDataPretty(source);

    //allDebugData = allDebugData.concat(this.__drawSettings());

    for (var ldx = 0; ldx < allDebugData.length; ldx++) {
      this.PopHub.FeedbackMan.WriteLine(allDebugData[ldx]);
    }

    this.Log().FuncEnd(this.DrawDebugDataPretty.name);
  }

  ClearTextArea(): void {
    var ta = this.__getTextArea();
    if (ta) {
      ta.value = '';
    } else {
      this.Log().Error(this.ClearTextArea.name, 'No text area found');
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

  SetAccordianClass(targetElem: HTMLElement, isCollapsed: boolean) {
    if (!isCollapsed) {
      targetElem.classList.remove(PopConst.Const.ClassNames.HS.Collapsed);
    } else {
      targetElem.classList.add(PopConst.Const.ClassNames.HS.Collapsed);
    }
  }

  GetAccordianContentElem(sib: HTMLElement): HTMLElement {
    //this.debug().FuncStart(this.GetAccordianContentElem.name);
    var toReturn: HTMLElement;
    if (sib) {
      var siblings = sib.parentElement.getElementsByClassName('accordian-content');

      if (siblings) {
        var toReturn = <HTMLElement>siblings[0];
      }
    }

    //this.debug().FuncEnd(this.GetAccordianContentElem.name);
    return toReturn;
  }

  DrawStorageResponse(data: PayloadDataFromContent) {
    this.Log().FuncStart('DrawStorage');
    try {
      //var ourData: IOneStorageData[] = this.__getAllLocalStorageAsIOneStorageData();

      if (data.State.SnapShotsMany.CurrentSnapShots) {
        //this.__drawStorageRaw(data.CurrentSnapShots)
        //this.__drawStoragePretty(data.CurrentSnapShots)
      }
    } catch (e) {
      this.Log().Error(this.DrawStorageResponse.name, e.message);
    }
    this.Log().FuncEnd('DrawStorage');
  }

  private __drawStorageRaw(ourData: IOneStorageData[]) {
    this.Log().FuncStart('DrawStorageRaw');
    for (var idx = 0; idx < ourData.length; idx++) {
      this.Log().Log('key: \t' + ourData[idx].key);
      this.Log().Log('data: \t' + ourData[idx].data);
      this.Log().Log('------------');
    }
    this.Log().FuncEnd('DrawStorageRaw');
  }

  async RestoreAccordianState(oneSetting: OneGenericSetting, foundElem: HTMLElement): Promise<void> {
    this.Log().FuncStart(this.RestoreAccordianState.name);
    var contentSib = this.GetAccordianContentElem(foundElem);
    if (contentSib) {
      this.SetAccordianClass(contentSib, <boolean>oneSetting.ValueAsObj)
    } else {
      this.Log().Error(this.RestoreAccordianState.name, 'Sibling not found');
    }
    this.Log().FuncEnd(this.RestoreAccordianState.name);
  }

  async UpdateAtticFromUi(): Promise<any> {
    this.Log().FuncStart(this.UpdateAtticFromUi.name);

    //let currentSettings: IDataPopUpSettings = await this.PopAtticMan().CurrentSettings();
    //let currentVal = (<HTMLInputElement>document.querySelector(PopConst.Const.Selector.HS.iCBoxdSettingsShowLogData)).checked;
    //currentVal = true; //todo - remove after debugging
    //this.Log().LogVal('currentVal', currentVal.toString())
    //currentSettings.LogSettings.ShowDebugData = currentVal;

    //this.PopAtticMan().StoreSettings(currentSettings);
    this.RefreshUiFromCache();
    this.Log().FuncEnd(this.UpdateAtticFromUi.name);
  }

  SelectChanged(): void {
    this.Log().FuncStart(this.SelectChanged.name);
    this.__selectSnapshotId = this.Helpers().GuidHelp.ParseGuid(this.__getSelectElem().value);
    //this.debug().Log('new index :' + this.__selectSnapshotId);

    //if (e.ctrlKey) {
    //  alert
    //}

    this.RefreshUiFromCache();
    this.Log().FuncEnd(this.SelectChanged.name);
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
  //  this.Log().FuncStart(this.__refreshSettings.name);
  //  let debugFieldSet: HTMLFieldSetElement = <HTMLFieldSetElement>window.document.querySelector(PopConst.Const.Selector.HS.IdFieldSetDebug);

  //  let currentSettings: IDataPopUpSettings =  await this.PopAtticMan().CurrentSettings();
  //  if (currentSettings) {
  //    if (debugFieldSet) {
  //      let newDisplay = currentSettings.LogSettings.ShowDebugData ? '' : 'none';
  //      debugFieldSet.style.display = newDisplay;
  //    }
  //    let checkBoxShowDebug: HTMLInputElement = <HTMLInputElement>window.document.querySelector(PopConst.Const.Selector.HS.iCBoxdSettingsShowLogData);
  //    if (checkBoxShowDebug) {
  //      this.Log().LogVal('before', checkBoxShowDebug.checked.toString());
  //      checkBoxShowDebug.checked = currentSettings.LogSettings.ShowDebugData;
  //      this.Log().LogVal('after', checkBoxShowDebug.checked.toString());
  //    } else {
  //      this.Log().Error(this.__refreshSettings.name, 'no checkbox found');
  //    }
  //  }
  //  else {
  //    this.Log().Error(this.__refreshSettings.name, 'no settings found');
  //  }
  //  this.Log().FuncEnd(this.__refreshSettings.name);
  //}

  RefreshUiGenericSettings() {
    this.Log().FuncStart(this.RefreshUiGenericSettings.name);
    for (var idx = 0; idx < this.SettingsMan().AllSettings.SettingsAr.length; idx++) {
      var oneSetting: OneGenericSetting = this.SettingsMan().AllSettings.SettingsAr[idx];
      //this.Log().LogVal('setting', StaticHelpers.SettingKeyAsString(oneSetting.SettingKey));
      var foundElem: HTMLElement = document.querySelector(oneSetting.UiSelector);
      if (foundElem) {
        if (oneSetting.DataType === SettingType.BoolCheckBox) {
          let valueToDisplay: boolean = <boolean>(oneSetting.ValueAsObj || oneSetting.DefaultValue);
          //this.Log().LogVal('valueToDisplay', valueToDisplay);
          (<HTMLInputElement>foundElem).checked = valueToDisplay;
        }
        if (oneSetting.DataType === SettingType.Accordian) {
          this.RestoreAccordianState(oneSetting, foundElem);
        }
      } else {
        this.Log().Error(this.RefreshUiGenericSettings.name, 'ui element not found: ' + oneSetting.UiSelector);
      }
    }
    this.Log().FuncEnd(this.RefreshUiGenericSettings.name);
  }

  async RefreshUiFromCache() {
    this.Log().FuncStart(this.RefreshUiFromCache.name);

    this.RefreshUiGenericSettings();

    this.UiMan().PopulateContentState(this.MsgMan().LastKnownContentState);

    this.PopulateStateOfSnapShotSelect(this.MsgMan().LastKnownContentState.SnapShotsMany.CurrentSnapShots);

    this.RefreshButtonStates();

    this.__drawCorrectNicknameInUI(this.MsgMan().LastKnownContentState.SnapShotsMany.CurrentSnapShots);

    this.Log().FuncEnd(this.RefreshUiFromCache.name);
  }

  RefreshButtonStates(): void {
    this.Log().FuncStart(this.RefreshButtonStates.name, this.EventMan().AllMenuCommands.length);
    for (var idx = 0; idx < this.EventMan().AllMenuCommands.length; idx++) {
      var command = this.EventMan().AllMenuCommands[idx];
      //this.Log().LogVal('working on', MenuCommand[command.Command])
      if (command.RequiredPageTypes.length > 0) {
        //this.Log().LogVal('required pages', command.RequiredPageTypes.toString());

        var currentWindowType = this.TabMan().CurrentTabData.UrlParts.ScWindowType;
        //this.Log().LogVal('current', StaticHelpers.WindowTypeAsString(currentWindowType));
        var targetButton: HTMLElement = this.GetButtonByIdOrSelector(command.ButtonSelector);

        if (targetButton) {
          var isMatch: boolean = command.RequiredPageTypes.indexOf(currentWindowType) >= 0;
          //this.Log().LogVal('isMatch', isMatch);

          if (isMatch) {
            targetButton.classList.remove('disabled');
            targetButton.removeAttribute('disabled');
          } else {
            targetButton.classList.add('disabled');
            targetButton.setAttribute('disabled', 'disabled');
          }
        } else {
          this.Log().Error(this.RefreshButtonStates.name, 'target button not found');
        }
      } else {
        //this.Log().Log('no required pages');
      }
    }
    this.Log().FuncEnd(this.RefreshButtonStates.name);
  }
  ShowDebugDataOneWindow() {
    this.Log().FuncStart('ShowDebugDataOneWindow');
    var toReturn: string[] = [];

    //toReturn.push(this.__activeWindowSnapShot.TimeStamp.toJSON());
    //for (var jdx = 0; jdx < this.__activeWindowSnapShot.AllCEAr.length; jdx++) {
    //  var oneCE = this.__activeWindowSnapShot.AllCEAr[jdx];
    //  toReturn = toReturn.concat(this.Xyyz.OneCEMan.GetDebugDataOneCE(oneCE));
    //}

    for (var kdx = 0; kdx < toReturn.length; kdx++) {
      this.Log().Log(toReturn[kdx]);
    }

    this.Log().FuncEnd('ShowDebugDataOneWindow');
    return toReturn;
  }
  private __drawCorrectNicknameInUI(snapShots: IDataOneWindowStorage[]) {
    this.Log().FuncStart(this.__drawCorrectNicknameInUI.name);
    var targetId: IGuid = this.UiMan().GetIdOfSelectWindowSnapshot();
    if (targetId) {
      this.Log().Log('targetId : ' + targetId.AsString);

      var storageValues = snapShots;
      var currentSelectId = this.GetIdOfSelectWindowSnapshot();

      var storageMatch;

      for (var idx = 0; idx < storageValues.length; idx++) {
        var candidate = storageValues[idx];
        if (candidate.Id.AsString === currentSelectId.AsString) {
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
    this.Log().FuncEnd(this.__drawCorrectNicknameInUI.name);
  }

  GetValueInNickname(): string {
    var toReturn: string = '';
    toReturn = (<HTMLInputElement>window.document.getElementById(PopConst.Const.ElemId.InputNickname)).value;
    return toReturn;
  }

  private __getSelectElem(): HTMLSelectElement {
    return <HTMLSelectElement>window.document.querySelector(PopConst.Const.Selector.HS.SelStateSnapShot);
  }

  GetIdOfSelectWindowSnapshot(): IGuid {
    this.Log().FuncStart(this.GetIdOfSelectWindowSnapshot.name);

    var targetSel: HTMLSelectElement = this.__getSelectElem();
    var toReturn: IGuid = null;
    if (targetSel) {
      var selectedValue: string = targetSel.value;
      if (selectedValue) {
        toReturn = this.Helpers().GuidHelp.ParseGuid(selectedValue);
      }
      //var optionsLength = targetSel.options.length;
      //if (this.__selectSnapshotId < optionsLength) {
      //  var temp = targetSel.options[this.__selectSnapshotId].value;
      //  //this.debug().Log('temp: ' + temp);
      //  toReturn = this.GuidMan().ParseGuid(temp);
      //}
    }

    if (!toReturn) {
      this.Log().Log('using empty guid');
      toReturn = this.Helpers().GuidHelp.EmptyGuid();
    }

    this.Log().DebugIGuid(toReturn);

    this.Log().FuncEnd(this.GetIdOfSelectWindowSnapshot.name, toReturn.AsString);
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
      this.Log().Error(this.AssignOnClickEvent.name, 'No Id: ' + targetId);
    } else {
      targetElem.addEventListener('checked', (evt) => { handler(evt) });
    }
  }

  AssignOnClickEvent(targetId: string, handler: Function): void {
    var targetElem = this.GetButtonByIdOrSelector(targetId);

    if (!targetElem) {
      this.Log().Error(this.AssignOnClickEvent.name, 'No Id: ' + targetId);
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
    this.Log().FuncStart(this.AssignOnChangeEvent.name, selector);
    var targetElem: HTMLElement = document.querySelector(selector);
    if (!targetElem) {
      this.Log().Error(this.AssignOnClickEvent.name, 'No Id: ' + selector);
    } else {
      targetElem.onchange = () => { handler };
    }
    this.Log().FuncEnd(this.AssignOnChangeEvent.name, selector);
  }
  AssignDblClickEvent(selector: string, handler: Function): void {
    var targetElem: HTMLElement = document.querySelector(selector);
    if (!targetElem) {
      this.Log().Error(this.AssignOnClickEvent.name, 'No Id: ' + selector);
    } else {
      targetElem.ondblclick = (evt) => { handler(evt) };
    }
  }

  PopulateContentStateDiv(contentState: ICurrStateContent) {
    var targetCurrStateDiv: HTMLDivElement = <HTMLDivElement>window.document.querySelector(PopConst.Const.Selector.HS.DivState);

    //this.Log().LogVal('now', new Date().toString());
    var allTaText: string = 'State as of: ' + (new Date()).toString();
    var allTaText: string = 'State as of: ' + this.Helpers().UtilityHelp.MakeFriendlyDate(new Date());

    var lineBreak = '<br/>';

    if (targetCurrStateDiv) {
      allTaText += lineBreak;
      allTaText += 'Page Type: ' + StaticHelpers.WindowTypeAsString(this.TabMan().CurrentTabData.UrlParts.ScWindowType);

      if (contentState.ActiveCe) {
        allTaText += lineBreak;
        allTaText += 'Active Ce: ' + contentState.ActiveCe.Id.AsShort;

        if (contentState.ActiveCe.ActiveNode) {
          allTaText += lineBreak;
          allTaText += 'Active Node: ' + contentState.ActiveCe.ActiveNode.NodeFriendly + ' ' + contentState.ActiveCe.ActiveNode.NodeId.AsBracedGuid;
        } else {
          allTaText += lineBreak;
          allTaText += '{no active node in CE}';
        }
      } else {
        allTaText += lineBreak;
        allTaText += '{no active CE}';
      }

      let urlParts: UrlParts = this.TabMan().CurrentTabData.UrlParts;

      allTaText += lineBreak;
      allTaText += 'Url Full (raw  ): ' + urlParts.OriginalRaw;

      allTaText += lineBreak;
      allTaText += 'Url Full (parts): ' + this.Helpers().UrlHelp.BuildFullUrlFromParts(urlParts).AbsUrl;

      allTaText += lineBreak;
      allTaText += 'Protocol: ' + urlParts.Protocol;

      allTaText += lineBreak;
      allTaText += 'Host & Port: ' + urlParts.HostAndPort;

      allTaText += lineBreak;
      allTaText += 'File Path: ' + urlParts.FilePath;
      //if (urlParts.FilePaths) {
      //  for (var idx = 0; idx < urlParts.FilePaths.length; idx++) {
      //    allTaText += lineBreak + '&nbsp;&nbsp;&nbsp;';
      //    allTaText += urlParts.FilePaths[idx];
      //  }
      //}

      allTaText += lineBreak;
      allTaText += 'Parameters: ';
      if (urlParts.Parameters) {
        for (var idx = 0; idx < urlParts.Parameters.length; idx++) {
          allTaText += lineBreak + '&nbsp;&nbsp;&nbsp;';
          allTaText += urlParts.Parameters[idx].Key;
          allTaText += '&nbsp; : &nbsp;';
          allTaText += urlParts.Parameters[idx].value || '';
        }
      }

      allTaText += lineBreak;
      allTaText += 'Last Request: ' + MsgFlag[contentState.LastReq];

      allTaText += lineBreak;
      allTaText += lineBreak + 'Snap Shots: ';
      allTaText += lineBreak + 'Birthday: ' + contentState.SnapShotsMany.Birthday.toString();
      allTaText += lineBreak + 'Total Snapshots: ' + contentState.SnapShotsMany.CurrentSnapShots.length;
      allTaText += lineBreak + 'Favorite Snapshots: ' + contentState.SnapShotsMany.FavoriteCount;
      allTaText += lineBreak + 'Plain Snapshots: ' + contentState.SnapShotsMany.PlainCount;
      allTaText += lineBreak + 'Auto Snapshots: ' + contentState.SnapShotsMany.SnapShotsAutoCount;

      allTaText += lineBreak;
      allTaText += 'Error Stack (' + contentState.ErrorStack.length + '):';
      for (var idx = 0; idx < contentState.ErrorStack.length; idx++) {
        allTaText += lineBreak;
        allTaText += '&nbsp;nbsp;nbsp;' + idx + ' : ' + contentState.ErrorStack[idx].ContainerFunc + ' ' + contentState.ErrorStack[idx].ErrorString;
      }

      targetCurrStateDiv.innerHTML = allTaText;
    }
  }

  async PopulateContentState(contentState: ICurrStateContent) {
    this.Log().FuncStart(this.PopulateContentState.name);

    this.Log().DebugIDataBrowserTab(this.TabMan().CurrentTabData);

    this.CurrContentState = contentState;
    if (this.Log().IsNotNullOrUndefinedBool('state', contentState)) {
      this.UiMan().PopulateStateOfSnapShotSelect(contentState.SnapShotsMany.CurrentSnapShots);
      this.PopulateContentStateDiv(contentState);
    }
    this.Log().FuncEnd(this.PopulateContentState.name);
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
    this.Log().FuncStart(this.PopulateStateOfSnapShotSelect.name);

    if (snapShots) {
      var targetSel: HTMLSelectElement = this.__getSelectElem();

      if (targetSel) {
        this.CleanExistingSelection(targetSel);
        var headers: ISelectionHeaders = this.WriteHeaders(targetSel);

        if (snapShots && snapShots.length > 0) {
          this.Log().Log('targetSel.options.length : ' + targetSel.options.length);

          for (var idx: number = 0; idx < snapShots.length; idx++) {
            var data = snapShots[idx];

            var el = <HTMLOptionElement>window.document.createElement('option');
            el.innerHTML = this.PopHub.Helpers.UtilityHelp.TimeNicknameFavStr(data);

            if (data.Flavor === SnapShotFlavor.Favorite) {
              el.classList.add('favorite');
            }

            el.value = data.Id.AsString;
            if (data.Id === this.__selectSnapshotId) {
              el.selected = true;
            }
            if (data.Flavor == SnapShotFlavor.Autosave) {
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

        if (!this.__selectSnapshotId || this.__selectSnapshotId === this.Helpers().GuidHelp.EmptyGuid()) {
          targetSel.selectedIndex = 0;
        }
      }
    }
    this.Log().FuncEnd(this.PopulateStateOfSnapShotSelect.name);
  }
}