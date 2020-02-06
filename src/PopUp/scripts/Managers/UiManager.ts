import { PopUpManagerBase } from './PopUpManagerBase';
import { PopUpHub } from './PopUpHub';

import { IOneStorageData } from '../../../Shared/scripts/Interfaces/IOneStorageData';
import { IDataOneTreeNode } from '../../../Shared/scripts/Interfaces/IDataOneTreeNode';
import { IDataOneWindowStorage } from '../../../Shared/scripts/Interfaces/IDataOneWindowStorage';
import { IDataOneStorageCE } from '../../../Shared/scripts/Interfaces/IDataOneStorageCE';
import { scWindowType } from '../../../Shared/scripts/Enums/scWindowType';
import { ICallbackDataDebugTextChanged } from '../../../Shared/scripts/Interfaces/ICallbackDataDebugTextChanged';

import { IDataBrowserWindow } from '../../../Shared/scripts/Interfaces/IDataBrowserWindow';

import { PayloadDataFromContent } from '../../../Shared/scripts/Classes/PayloadDataFromContent';
import { MsgFromPopUp } from '../../../Shared/scripts/Classes/MsgPayloadRequestFromPopUp';
import { MsgFlag } from '../../../Shared/scripts/Enums/MessageFlag';
import { IGuid } from '../../../Shared/scripts/Interfaces/IGuid';
import { ICurrStateContent } from '../../../Shared/scripts/Interfaces/ICurrState';
import { BuildDateStamp } from '../../../Shared/scripts/AutoBuild/BuildNum';
import { IDataPopUpSettings } from '../../../Shared/scripts/Interfaces/IDataPopUpSettings';
import { IOneCommand } from '../../../Shared/scripts/Interfaces/IOneCommand';
import { MenuCommand } from '../../../Shared/scripts/Enums/MenuCommand';
import { StaticHelpers } from '../../../Shared/scripts/Classes/StaticHelpers';
import { ISelectionHeaders } from '../../../Shared/scripts/Interfaces/ISelectionHeaders';
import { SnapShotFlavor } from '../../../Shared/scripts/Enums/SnapShotFlavor';

export class UiManager extends PopUpManagerBase {
  private __selectSnapshotId: IGuid;
  OperationCancelled: any;
  TabId: string;
  ParentFocused: boolean = false;
  MenuFocused: boolean = true;
  OtherFocused: boolean = false;
  MenuEnabled: boolean = true;
  currentState: ICurrStateContent;

  constructor(popHub: PopUpHub) {
    super(popHub);
    popHub.debug.FuncStart(UiManager.name);

    popHub.debug.FuncEnd(UiManager.name);
  }

  Init() {
    this.debug().FuncStart(this.Init.name, UiManager.name);
    var self = this;
    this.debug().AddDebugTextChangedCallback(self, this.HndlrDebugTextChanged);

    this.WriteBuildNumToUi();

    this.MsgMan().SendMessageToContent(new MsgFromPopUp(MsgFlag.ReqCurState, this.PopHub));

    this.debug().FuncEnd(this.Init.name);
  }

  WriteBuildNumToUi() {
    this.debug().LogVal('BuildDateStamp', BuildDateStamp);

    var targetTag: HTMLElement = document.querySelector(this.PopConst().Selector.HS.BuildStamp);
    if (targetTag) {
      targetTag.innerText = 'build: ' + this.Utilites().MakeFriendlyDate(new Date(BuildDateStamp));
    } else {
      this.debug().Error(this.WriteBuildNumToUi.name, 'No Build Stamp Element Found');
    }
  }

  private __drawStoragePretty(ourData: IOneStorageData[]) {
    this.debug().FuncStart(this.__drawStoragePretty.name);

    this.ClearTextArea();

    for (var idx = 0; idx < ourData.length; idx++) {
      this.debug().Log('key: \t' + ourData[idx].key);
      var parsed: IDataOneWindowStorage = <IDataOneWindowStorage>JSON.parse(ourData[idx].data);
      if (parsed) {
        this.DrawDebugDataPretty(parsed);
        this.debug().Log('------------');
      }
    }
    this.debug().FuncEnd(this.__drawStoragePretty.name);
  }
  DebugDataOneNode(dataOneTreeNode: IDataOneTreeNode): string {
    this.debug().FuncStart(this.DebugDataOneNode.name);
    var activeOrNot = dataOneTreeNode.IsActive ? '* ' : '  ';
    var expandedOrNot = dataOneTreeNode.IsExpanded ? '+ ' : '  ';

    var toReturn: string = activeOrNot + expandedOrNot + dataOneTreeNode.NodeId.AsString + ' ' + dataOneTreeNode.NodeFriendly;
    this.debug().FuncEnd(this.DebugDataOneNode.name);
    return toReturn;
  }
  GetDebugDataOneCE(dataOneCe: IDataOneStorageCE): string[] {
    this.debug().FuncStart('GetDebugDataOneCE');
    var toReturn: string[] = [];
    toReturn.push('------ All Tree Nodes -----');

    for (var idx = 0; idx < dataOneCe.AllTreeNodeAr.length; idx++) {
      this.debug().Log('idx: ' + idx);
      var oneVal = this.DebugDataOneNode(dataOneCe.AllTreeNodeAr[idx]);
      this.debug().Log('oneVal : ' + oneVal);
      toReturn.push(oneVal);
    }

    this.debug().FuncEnd(this.GetDebugDataOneCE.name);
    return toReturn;
  }

  __buildDebugDataPretty(dataOneWindow: IDataOneWindowStorage) {
    this.debug().FuncStart(this.__buildDebugDataPretty.name, 'data not null? ' + this.debug().IsNullOrUndefined(dataOneWindow));

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

      this.debug().FuncEnd(this.__buildDebugDataPretty.name);
    } else {
      this.debug().Error(this.__buildDebugDataPretty.name, 'missing data')
    }
    return toReturn;
  }
  DrawDebugDataPretty(source: IDataOneWindowStorage): void {
    this.debug().FuncStart(this.DrawDebugDataPretty.name, 'source not null: ' + this.debug().IsNullOrUndefined(source));

    var allDebugData: string[] = this.__buildDebugDataPretty(source);

    //allDebugData = allDebugData.concat(this.__drawSettings());

    for (var ldx = 0; ldx < allDebugData.length; ldx++) {
      this.PopHub.FeedbackMan.WriteLine(allDebugData[ldx]);
    }

    this.debug().FuncEnd(this.DrawDebugDataPretty.name);
  }

  ClearTextArea(): void {
    var ta = this.__getTextArea();
    if (ta) {
      ta.value = '';
    } else {
      this.debug().Error(this.ClearTextArea.name, 'No text area found');
    }
  }

  __getTextArea(): HTMLTextAreaElement {
    return <HTMLTextAreaElement>document.querySelector(this.PopConst().Selector.HS.TaDebug);
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

  SetParentInfo(winDataParent: IDataBrowserWindow) {
    var targetSpan = document.getElementById(this.PopConst().ElemId.HindSiteParentInfo);
    if (targetSpan) {
      targetSpan.innerHTML = ' | Parent Id: ' + winDataParent.DataDocSelf.DocId.AsShort + ' | ' + winDataParent.Window.location.href;
    }
  }

  SetAccordianClass(targetElem: HTMLElement, isCollapsed: boolean) {
    if (!isCollapsed) {
      targetElem.classList.remove(this.PopConst().ClassNames.HS.Collapsed);
    } else {
      targetElem.classList.add(this.PopConst().ClassNames.HS.Collapsed);
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
    this.debug().FuncStart('DrawStorage');
    try {
      //var ourData: IOneStorageData[] = this.__getAllLocalStorageAsIOneStorageData();

      if (data.State.SnapShotsMany.CurrentSnapShots) {
        //this.__drawStorageRaw(data.CurrentSnapShots)
        //this.__drawStoragePretty(data.CurrentSnapShots)
      }
    } catch (e) {
      this.debug().Error(this.DrawStorageResponse.name, e.message);
    }
    this.debug().FuncEnd('DrawStorage');
  }

  private __drawStorageRaw(ourData: IOneStorageData[]) {
    this.debug().FuncStart('DrawStorageRaw');
    for (var idx = 0; idx < ourData.length; idx++) {
      this.debug().Log('key: \t' + ourData[idx].key);
      this.debug().Log('data: \t' + ourData[idx].data);
      this.debug().Log('------------');
    }
    this.debug().FuncEnd('DrawStorageRaw');
  }

  async RestoreAccordianStates(): Promise<void> {
    var accordianSettings = (await this.PopAtticMan().CurrentSettings()).Accordian;
    for (var idx = 0; idx < accordianSettings.length; idx++) {
      var candidate = accordianSettings[idx];
      var target = document.getElementById(candidate.ElemId);

      if (target) {
        var contentSib = this.GetAccordianContentElem(target);
        if (contentSib) {
          this.SetAccordianClass(contentSib, candidate.isCollapsed)
        }
      }
    }
  }

  async UpdateAtticFromUi(): Promise<any> {
    this.debug().FuncStart(this.UpdateAtticFromUi.name);

    let currentSettings: IDataPopUpSettings = await this.PopAtticMan().CurrentSettings();
    let currentVal = (<HTMLInputElement>document.querySelector(this.PopConst().Selector.HS.iCBoxdSettingsShowDebugData)).checked;
    currentVal = true; //todo - remove after debugging
    this.debug().LogVal('currentVal', currentVal.toString())
    currentSettings.DebugSettings.ShowDebugData = currentVal;

    this.PopAtticMan().StoreSettings(currentSettings);
    this.RefreshUiFromCache();
    this.debug().FuncEnd(this.UpdateAtticFromUi.name);
  }

  SelectChanged(): void {
    this.debug().FuncStart(this.SelectChanged.name);
    this.__selectSnapshotId = this.GuidMan().ParseGuid(this.__getSelectElem().value);
    //this.debug().Log('new index :' + this.__selectSnapshotId);

    //if (e.ctrlKey) {
    //  alert
    //}

    this.RefreshUiFromCache();
    this.debug().FuncEnd(this.SelectChanged.name);
  }

  private __GetCancelButton() {
    return document.getElementById(this.PopConst().ElemId.HS.Btn.HsCancel);
  }

  SetCancelFlag() {
    this.OperationCancelled = true;
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
    this.UiMan().OperationCancelled = false;
  }

  async __refreshSettings() {
    this.debug().FuncStart(this.__refreshSettings.name);
    let debugFieldSet: HTMLFieldSetElement = <HTMLFieldSetElement>window.document.querySelector(this.PopConst().Selector.HS.IdFieldSetDebug);

    let currentSettings: IDataPopUpSettings = await this.PopAtticMan().CurrentSettings();
    if (currentSettings) {
      if (debugFieldSet) {
        let newDisplay = currentSettings.DebugSettings.ShowDebugData ? '' : 'none';
        debugFieldSet.style.display = newDisplay;
      }
      let checkBoxShowDebug: HTMLInputElement = <HTMLInputElement>window.document.querySelector(this.PopConst().Selector.HS.iCBoxdSettingsShowDebugData);
      if (checkBoxShowDebug) {
        this.debug().LogVal('before', checkBoxShowDebug.checked.toString());
        checkBoxShowDebug.checked = currentSettings.DebugSettings.ShowDebugData;
        this.debug().LogVal('after', checkBoxShowDebug.checked.toString());
      } else {
        this.debug().Error(this.__refreshSettings.name, 'no checkbox found');
      }
    }
    else {
      this.debug().Error(this.__refreshSettings.name, 'no settings found');
    }
    this.debug().FuncEnd(this.__refreshSettings.name);
  }

  async RefreshUiFromCache() {
    this.debug().FuncStart(this.RefreshUiFromCache.name);

    this.__refreshSettings();

    this.RestoreAccordianStates();

    this.UiMan().PopulateContentState(this.MsgMan().CachedState);

    this.PopulateStateOfSnapShotSelect(this.MsgMan().CachedState.SnapShotsMany.CurrentSnapShots);

    this.RefreshButtonStates();

    this.__drawCorrectNicknameInUI(this.MsgMan().CachedState.SnapShotsMany.CurrentSnapShots);

    this.debug().FuncEnd(this.RefreshUiFromCache.name);
  }

  RefreshButtonStates(): void {
    this.debug().FuncStart(this.RefreshButtonStates.name, this.EventMan().AllMenuCommands.length);
    for (var idx = 0; idx < this.EventMan().AllMenuCommands.length; idx++) {
      var command = this.EventMan().AllMenuCommands[idx];
      this.debug().LogVal('working on', MenuCommand[command.Command])
      if (command.RequiredPageTypes.length > 0) {
        this.debug().LogVal('required pages', command.RequiredPageTypes.toString());

        var currentWindowType = this.MsgMan().CachedState.WindowType;
        this.debug().LogVal('current', currentWindowType);
        this.debug().LogVal('current', StaticHelpers.WindowTypeAsString(currentWindowType));
        var targetButton: HTMLElement = this.GetButtonByIdOrSelector(command.ButtonSelector);

        if (targetButton) {
          var isMatch: boolean = command.RequiredPageTypes.indexOf(currentWindowType) >= 0;
          this.debug().LogVal('isMatch', isMatch);

          if (isMatch) {
            targetButton.classList.remove('disabled');
            targetButton.removeAttribute('disabled');
          } else {
            targetButton.classList.add('disabled');
            targetButton.setAttribute('disabled', 'disabled');
          }
        } else {
          this.debug().Error(this.RefreshButtonStates.name, 'target button not found');
        }
      } else {
        this.debug().Log('no required pages');
      }
    }
    this.debug().FuncEnd(this.RefreshButtonStates.name);
  }
  ShowDebugDataOneWindow() {
    this.debug().FuncStart('ShowDebugDataOneWindow');
    var toReturn: string[] = [];

    //toReturn.push(this.__activeWindowSnapShot.TimeStamp.toJSON());
    //for (var jdx = 0; jdx < this.__activeWindowSnapShot.AllCEAr.length; jdx++) {
    //  var oneCE = this.__activeWindowSnapShot.AllCEAr[jdx];
    //  toReturn = toReturn.concat(this.Xyyz.OneCEMan.GetDebugDataOneCE(oneCE));
    //}

    for (var kdx = 0; kdx < toReturn.length; kdx++) {
      this.debug().Log(toReturn[kdx]);
    }

    this.debug().FuncEnd('ShowDebugDataOneWindow');
    return toReturn;
  }
  private __drawCorrectNicknameInUI(snapShots: IDataOneWindowStorage[]) {
    this.debug().FuncStart(this.__drawCorrectNicknameInUI.name);
    var targetId: IGuid = this.UiMan().GetIdOfSelectWindowSnapshot();
    if (targetId) {
      this.debug().Log('targetId : ' + targetId.AsString);

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
        var inputElem = <HTMLInputElement>window.document.getElementById(this.PopConst().ElemId.InputNickname);
        if (inputElem) {
          inputElem.value = storageMatch.NickName;
        }
      }
    }
    this.debug().FuncEnd(this.__drawCorrectNicknameInUI.name);
  }

  GetValueInNickname(): string {
    var toReturn: string = '';
    toReturn = (<HTMLInputElement>window.document.getElementById(this.PopConst().ElemId.InputNickname)).value;
    return toReturn;
  }

  private __getSelectElem(): HTMLSelectElement {
    return <HTMLSelectElement>window.document.querySelector(this.PopConst().Selector.HS.SelStateSnapShot);
  }

  GetIdOfSelectWindowSnapshot(): IGuid {
    this.debug().FuncStart(this.GetIdOfSelectWindowSnapshot.name);

    var targetSel: HTMLSelectElement = this.__getSelectElem();
    var toReturn: IGuid = null;
    if (targetSel) {
      var selectedValue: string = targetSel.value;
      if (selectedValue) {
        toReturn = this.GuidMan().ParseGuid(selectedValue);
      }
      //var optionsLength = targetSel.options.length;
      //if (this.__selectSnapshotId < optionsLength) {
      //  var temp = targetSel.options[this.__selectSnapshotId].value;
      //  //this.debug().Log('temp: ' + temp);
      //  toReturn = this.GuidMan().ParseGuid(temp);
      //}
    }

    if (!toReturn) {
      this.debug().Log('using empty guid');
      toReturn = this.GuidMan().EmptyGuid();
    }

    this.debug().DebugIGuid(toReturn);

    this.debug().FuncEnd(this.GetIdOfSelectWindowSnapshot.name, toReturn.AsString);
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
      this.debug().Error(this.AssignOnClickEvent.name, 'No Id: ' + targetId);
    } else {
      targetElem.addEventListener('checked', (evt) => { handler(evt) });
    }
  }

  AssignOnClickEvent(targetId: string, handler: Function): void {
    var targetElem = this.GetButtonByIdOrSelector(targetId);

    if (!targetElem) {
      this.debug().Error(this.AssignOnClickEvent.name, 'No Id: ' + targetId);
    } else {
      targetElem.addEventListener('click', (evt) => { handler(evt) });
    }
  }

  AssignOnClickEventFromCmd(command: IOneCommand, handler: Function): void {
    if (command && command.Command !== MenuCommand.Unknown) {
      this.AssignOnClickEvent(command.ButtonSelector, handler);
    }
  }

  AssignOnChangeEvent(selector: string, handler: Function): void {
    this.debug().FuncStart(this.AssignOnChangeEvent.name, selector);
    var targetElem: HTMLElement = document.querySelector(selector);
    if (!targetElem) {
      this.debug().Error(this.AssignOnClickEvent.name, 'No Id: ' + selector);
    } else {
      targetElem.onchange = () => { handler };
    }
    this.debug().FuncEnd(this.AssignOnChangeEvent.name, selector);
  }
  AssignDblClickEvent(selector: string, handler: Function): void {
    var targetElem: HTMLElement = document.querySelector(selector);
    if (!targetElem) {
      this.debug().Error(this.AssignOnClickEvent.name, 'No Id: ' + selector);
    } else {
      targetElem.ondblclick = (evt) => { handler(evt) };
    }
  }

  PopulateContentState(state: ICurrStateContent) {
    this.debug().FuncStart(this.PopulateContentState.name);
    this.currentState = state;
    if (this.debug().IsNotNullOrUndefinedBool('state', state)) {
      this.UiMan().PopulateStateOfSnapShotSelect(state.SnapShotsMany.CurrentSnapShots);

      var targetCurrStateTa: HTMLTextAreaElement = <HTMLTextAreaElement>window.document.querySelector(this.PopConst().Selector.HS.TaState);
      if (targetCurrStateTa) {
        var allTaText: string = 'State as of: ' + this.Utilites().MakeFriendlyDate(new Date());
        allTaText += '\n';
        allTaText += 'Page Type: ' + scWindowType[state.WindowType]
        allTaText += '\n';
        allTaText += 'Url: ' + state.Url;

        allTaText += '\n';
        allTaText += 'Last Request: ' + MsgFlag[state.LastReq];

        allTaText += '\n';
        allTaText += '\nSnap Shots: ';
        allTaText += '\nBirthday: ' + state.SnapShotsMany.Birthday.toString();
        allTaText += '\nTotal Snapshots: ' + state.SnapShotsMany.CurrentSnapShots.length;
        allTaText += '\nFavorite Snapshots: ' + state.SnapShotsMany.FavoriteCount;
        allTaText += '\nPlain Snapshots: ' + state.SnapShotsMany.PlainCount;
        allTaText += '\nAuto Snapshots: ' + state.SnapShotsMany.SnapShotsAutoCount;

        allTaText += '\n';
        allTaText += 'Error Stack (' + state.ErrorStack.length + '):';
        for (var idx = 0; idx < state.ErrorStack.length; idx++) {
          allTaText += '\n';
          allTaText += '\t' + idx + ' : ' + state.ErrorStack[idx].ContainerFunc + ' ' + state.ErrorStack[idx].ErrorString;
        }

        targetCurrStateTa.value = allTaText;
      }
    }
    this.debug().FuncEnd(this.PopulateContentState.name);
  }

  PopulateSnapShotsAuto() {
  }

  PopulateSnapShotsNotAuto() {
  }

  CleanExistingSelection(targetSel: HTMLSelectElement) {
    var optGroup = targetSel.querySelector('[id=' + this.PopConst().ElemId.HS.SelectHeaderAuto + ']')
    if (optGroup) {
      optGroup.remove();
    }
    optGroup = targetSel.querySelector('[id=' + this.PopConst().ElemId.HS.SelectHeaderFavorite + ']')
    if (optGroup) {
      optGroup.remove();
    }

    targetSel.options.length = 0;
  }

  WriteHeaders(targetSel: HTMLSelectElement) {
    var toReturn: ISelectionHeaders = {
      Auto: null,
      Favorite: null
    }

    toReturn.Auto = <HTMLOptGroupElement>window.document.createElement('optgroup');
    toReturn.Auto.label = this.Utilites().SelectHeaderStr('Auto');
    toReturn.Auto.id = this.PopConst().ElemId.HS.SelectHeaderAuto;

    toReturn.Favorite = <HTMLOptGroupElement>window.document.createElement('optgroup');
    toReturn.Favorite.label = this.Utilites().SelectHeaderStr('Favorite');
    toReturn.Favorite.id = this.PopConst().ElemId.HS.SelectHeaderFavorite;

    return toReturn;
  }

  PopulateStateOfSnapShotSelect(snapShots: IDataOneWindowStorage[]) {
    this.debug().FuncStart(this.PopulateStateOfSnapShotSelect.name);

    if (snapShots) {
      var targetSel: HTMLSelectElement = this.__getSelectElem();

      if (targetSel) {
        this.CleanExistingSelection(targetSel);
        var headers: ISelectionHeaders = this.WriteHeaders(targetSel);

        if (snapShots && snapShots.length > 0) {
          this.debug().Log('targetSel.options.length : ' + targetSel.options.length);

          for (var idx: number = 0; idx < snapShots.length; idx++) {
            var data = snapShots[idx];

            var el = <HTMLOptionElement>window.document.createElement('option');
            el.innerHTML = this.PopHub.Utilities.TimeNicknameFavStr(data);

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

        targetSel.appendChild(headers.Favorite);
        targetSel.appendChild(headers.Auto);

        if (!this.__selectSnapshotId || this.__selectSnapshotId === this.GuidMan().EmptyGuid()) {
          targetSel.selectedIndex = 0;
        }
      }
    }
    this.debug().FuncEnd(this.PopulateStateOfSnapShotSelect.name);
  }
}