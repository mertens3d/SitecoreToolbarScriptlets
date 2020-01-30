import { IDataSettings } from '../../../Shared/scripts/Interfaces/IDataSettings';
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

export class UiManager extends PopUpManagerBase {
  private __selectSnapshotIndex: number = 0;
  OperationCancelled: any;
  TabId: string;
  ParentFocused: boolean = false;
  MenuFocused: boolean = true;
  OtherFocused: boolean = false;
  MenuEnabled: boolean = true;

  constructor(popHub: PopUpHub) {
    super(popHub);
    popHub.debug.FuncStart(UiManager.name);

    popHub.debug.FuncEnd(UiManager.name);
  }

  Init() {
    this.debug().FuncStart(this.Init.name, UiManager.name);
    var self = this;
    this.debug().AddDebugTextChangedCallback(self, this.HndlrDebugTextChanged);

    //this.WriteTabId();

    this.__wireParentFocusCheck();

    this.RefreshUiRequest();
    this.debug().FuncEnd(this.Init.name);
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

    var toReturn: string = activeOrNot + expandedOrNot + dataOneTreeNode.NodeId.asString + ' ' + dataOneTreeNode.NodeFriendly;
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
        toReturn.push('\tId: ' + dataOneCE.Id.asString);

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

  private __wireParentFocusCheck() {
    ////this.PageDataMan().TopLevelWindow().DataDocSelf.Document.addEventListener('focus', () => { alert('vis change'); })
    //this.PageDataMan().TopLevelWindow().DataDocSelf.Document.addEventListener('focus', () => { this.OnParentFocused(true); })
    //this.PageDataMan().TopLevelWindow().DataDocSelf.Document.addEventListener('blur', () => { this.OnParentFocused(false); })

    window.addEventListener('focus', () => { this.OnMenuFocused(true); })
    window.addEventListener('blur', () => { this.OnMenuFocused(false); })
  }

  OnParentFocused(isFocused: boolean) {
    this.ParentFocused = isFocused;
    this.CalculateMenuDisplay();
  }

  OnMenuFocused(isFocused: boolean) {
    this.MenuFocused = isFocused;
    this.CalculateMenuDisplay();
  }

  CalculateMenuDisplayDelayed(self: UiManager) {
    // user opens sc -> nothing
    // user opens Hs -> wire, set menuBlur = false, parentBlur = true;
    // user selects parent -> trigger menu enabled
    // user selects other window, unless it is menu -> blur menu

    if (!self.ParentFocused && !self.MenuFocused) {
      self.OtherFocused = true;
    }

    if (self.ParentFocused) {
      self.OtherFocused = false;
    }
    self.MenuEnabled = !self.OtherFocused && (self.ParentFocused || self.MenuFocused);

    //self.debug().Log('');
    //self.debug().LogVal('ParentFocused', self.ParentFocused.toString());
    //self.debug().LogVal('MenuFocused', self.MenuFocused.toString());
    //self.debug().LogVal('OtherFocused', self.OtherFocused.toString());
    //self.debug().Log('');

    //if (!this.ParentFocused && !this.MenuFocused) {
    //  this.OtherFocused = true;
    //}

    //if (this.ParentFocused && !this.MenuFocused) {
    //  this.MenuEnabled = true;
    //}

    //if (   this.MenuFocused)

    var menuOverlay: HTMLElement = document.querySelector(self.PopConst().Selector.HS.menuOverlay);
    if (menuOverlay) {
      if (self.MenuEnabled) {
        menuOverlay.style.display = 'none';
      } else
        menuOverlay.style.display = '';
    }
  }

  CalculateMenuDisplay() {
    var self = this;
    setTimeout(() => { this.CalculateMenuDisplayDelayed(self); }, 100);
    setTimeout(() => { this.CalculateMenuDisplayDelayed(self); }, 1000);
  }

  //WriteTabId() {
  //  this.TabId = new Date().getTime().toString();
  //  this.WriteDocIdTo(this.PageDataMan().TopLevelWindow().Window.document, this.TabId);
  //  //this.WriteDocIdTo(document, this.TabId);
  //}

  //WriteDocIdTo(targetDoc: Document, documentId: string) {
  //  this.debug().FuncStart(this.WriteDocIdTo.name, documentId);
  //  if (targetDoc) {
  //    this.RemoveExistingTabId(targetDoc);
  //    var foreSiteIdDivOrig = targetDoc.createElement('div');
  //    foreSiteIdDivOrig.id = this.Const().ElemId.HS.TabId;
  //    foreSiteIdDivOrig.innerText = documentId;
  //    targetDoc.body.appendChild(foreSiteIdDivOrig);
  //  } else {
  //    this.debug().Error(this.WriteDocIdTo.name, 'no target window');
  //  }

  //  this.debug().FuncEnd(this.WriteDocIdTo.name, documentId.toString());
  //}

  //RemoveExistingTabId(targetDoc: Document) {
  //  var foundTabId: HTMLElement = targetDoc.querySelector(this.Utilites().MakeSelectorFromId(this.Const().ElemId.HS.TabId));
  //  if (foundTabId) {
  //    targetDoc.removeChild(foundTabId);
  //  }
  //}

  //VerifyTabMatch() {
  //  //todo - maybe with communication between the two

  //  //var parentIdWrapper = <HTMLElement>this.PageDataMan().TopLevelWindow().Window.document.querySelector(this.Utilites().MakeSelectorFromId(this.Const().ElemId.HS.TabId));
  //  //var matches: boolean = false;

  //  //if (parentIdWrapper) {
  //  //  var parentId = parentIdWrapper.innerText;
  //  //  this.debug().LogVal('id for match', parentId);

  //  //  if (parentId && parentId === this.TabId) {
  //  //    matches = true;
  //  //  }
  //  //}

  //  //var menuOverlay: HTMLElement = document.querySelector(this.Const().Selector.HS.menuOverlay);
  //  //if (menuOverlay) {
  //  //  if (matches) {
  //  //    menuOverlay.style.display = 'none';
  //  //  } else
  //  //    menuOverlay.style.display = '';
  //  //}
  //}

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
      targetSpan.innerHTML = ' | Parent Id: ' + this.GuidMan().ShortGuid(winDataParent.DataDocSelf.XyyzId) + ' | ' + winDataParent.Window.location.href;
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

      if (data.CurrentSnapShots) {
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

  RestoreAccordianStates(): void {
    var accordianSettings = this.PopAtticMan().CurrentSettings().Accordian;
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

  UpdateAtticFromUi(): any {
    this.debug().FuncStart(this.UpdateAtticFromUi.name);

    let currentSettings = this.PopAtticMan().CurrentSettings();
    let currentVal = (<HTMLInputElement>document.querySelector(this.PopConst().Selector.HS.iCBoxdSettingsShowDebugData)).checked;
    currentVal = true; //todo - remove after debugging
    this.debug().LogVal('currentVal', currentVal.toString())
    currentSettings.DebugSettings.ShowDebugData = currentVal;

    this.PopAtticMan().StoreSettings(currentSettings);
    this.RefreshUiRequest();
    this.debug().FuncEnd(this.UpdateAtticFromUi.name);
  }

  SelectChanged(): void {
    this.debug().FuncStart(this.SelectChanged.name);
    this.__selectSnapshotIndex = this.__getSelectElem().selectedIndex;
    this.debug().Log('new index :' + this.__selectSnapshotIndex);

    //if (e.ctrlKey) {
    //  alert
    //}

    this.RefreshUiRequest();
    this.debug().FuncEnd(this.SelectChanged.name);
  }

  private __GetCancelButton() {
    return document.getElementById(this.PopConst().ElemId.HS.Btn.Cancel);
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

  __refreshSettings() {
    this.debug().FuncStart(this.__refreshSettings.name);
    let debugFieldSet: HTMLFieldSetElement = <HTMLFieldSetElement>window.document.querySelector(this.PopConst().Selector.HS.IdFieldSetDebug);

    let currentSettings: IDataSettings = this.PopAtticMan().CurrentSettings();
    if (currentSettings) {
      if (debugFieldSet) {
        let newDisplay = this.PopAtticMan().CurrentSettings().DebugSettings.ShowDebugData ? '' : 'none';
        debugFieldSet.style.display = newDisplay;
      }
      let checkBoxShowDebug: HTMLInputElement = <HTMLInputElement>window.document.querySelector(this.PopConst().Selector.HS.iCBoxdSettingsShowDebugData);
      if (checkBoxShowDebug) {
        this.debug().LogVal('before', checkBoxShowDebug.checked.toString());
        checkBoxShowDebug.checked = currentSettings.DebugSettings.ShowDebugData;
        this.debug().LogVal('after', checkBoxShowDebug.checked.toString());
      } else {
        this.debug().Error(this.RefreshUiRequest.name, 'no checkbox found');
      }
    }
    else {
      this.debug().Error(this.RefreshUiRequest.name, 'no settings found');
    }
    this.debug().FuncEnd(this.__refreshSettings.name);
  }
  RefreshUiRequest() {
    this.debug().FuncStart(this.__drawCorrectNicknameInUI.name);

    var payload = this.MsgMan().SendMessageHndlr(new MsgFromPopUp(MsgFlag.GiveCurrentData));

    this.__refreshSettings();
    this.RestoreAccordianStates();

    this.debug().FuncEnd(this.__drawCorrectNicknameInUI.name);
  }

  RefreshUiResponse(data: PayloadDataFromContent) {
    //var snapShots: IDataOneWindowStorage[] = this.MsgMan().SendMessage(MsgFlag.GetAllStorageOneWindow);

    this.__populateStateOfSnapShotSelect(data.CurrentSnapShots);
    this.__drawCorrectNicknameInUI(data.CurrentSnapShots);
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
      this.debug().Log('targetId : ' + targetId.asString);

      var storageValues = snapShots;
      var currentSelectId = this.GetIdOfSelectWindowSnapshot();

      var storageMatch;

      for (var idx = 0; idx < storageValues.length; idx++) {
        var candidate = storageValues[idx];
        if (candidate.Id.asString === currentSelectId.asString) {
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
      var optionsLength = targetSel.options.length;
      if (this.__selectSnapshotIndex < optionsLength) {
        var temp = targetSel.options[this.__selectSnapshotIndex].value;
        //this.debug().Log('temp: ' + temp);
        toReturn = this.GuidMan().ParseGuid(temp);
        this.debug().LogVal('toReturn', toReturn.asString);
      }
    }
    this.debug().FuncEnd(this.GetIdOfSelectWindowSnapshot.name);
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
    var targetElem: HTMLElement = document.querySelector(targetId);
    if (!targetElem) {
      targetElem = document.querySelector('[id=' + targetId + ']');
    }


    if (!targetElem) {

      this.debug().Error(this.AssignOnClickEvent.name, 'No Id: ' + targetId);
    } else {
      targetElem.addEventListener('click', (evt) => { handler(evt) });
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
  private __populateStateOfSnapShotSelect(snapShots: IDataOneWindowStorage[]) {
    this.debug().FuncStart(this.__populateStateOfSnapShotSelect.name, this.__selectSnapshotIndex.toString());

    if (snapShots) {
      var targetSel: HTMLSelectElement = this.__getSelectElem();

      if (targetSel) {
        var header: HTMLOptGroupElement = <HTMLOptionElement>window.document.createElement('optgroup');
        header.label = this.Utilites().SelectHeaderStr();

        if (snapShots && snapShots.length > 0) {
          targetSel.options.length = 0;
          this.debug().Log('targetSel.options.length : ' + targetSel.options.length);

          for (var idx: number = 0; idx < snapShots.length; idx++) {
            var data = snapShots[idx];

            var el = <HTMLOptionElement>window.document.createElement('option');
            el.innerHTML = this.PopHub.Utilities.TimeNicknameFavStr(data);

            el.value = data.Id.asString;
            if (idx === this.__selectSnapshotIndex) {
              el.selected = true;
            }
            header.appendChild(el);
          }
        }

        targetSel.appendChild(header);
      }
    }
    this.debug().FuncEnd(this.__populateStateOfSnapShotSelect.name);
  }
}