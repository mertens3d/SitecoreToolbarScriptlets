"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var PopUpManagerBase_1 = require("./PopUpManagerBase");
var scWindowType_1 = require("../../../Shared/scripts/Enums/scWindowType");
var MsgPayloadRequestFromPopUp_1 = require("../../../Shared/scripts/Classes/MsgPayloadRequestFromPopUp");
var MessageFlag_1 = require("../../../Shared/scripts/Enums/MessageFlag");
var UiManager = /** @class */ (function (_super) {
    __extends(UiManager, _super);
    function UiManager(popHub) {
        var _this = _super.call(this, popHub) || this;
        _this.__selectSnapshotIndex = 0;
        _this.ParentFocused = false;
        _this.MenuFocused = true;
        _this.OtherFocused = false;
        _this.MenuEnabled = true;
        popHub.debug.FuncStart(UiManager.name);
        popHub.debug.FuncEnd(UiManager.name);
        return _this;
    }
    UiManager.prototype.Init = function () {
        var self = this;
        this.debug().AddDebugTextChangedCallback(self, this.HndlrDebugTextChanged);
        //this.WriteTabId();
        this.__wireParentFocusCheck();
        this.RefreshUiRequest();
    };
    UiManager.prototype.__drawStoragePretty = function (ourData) {
        this.debug().FuncStart(this.__drawStoragePretty.name);
        this.ClearTextArea();
        for (var idx = 0; idx < ourData.length; idx++) {
            this.debug().Log('key: \t' + ourData[idx].key);
            var parsed = JSON.parse(ourData[idx].data);
            if (parsed) {
                this.DrawDebugDataPretty(parsed);
                this.debug().Log('------------');
            }
        }
        this.debug().FuncEnd(this.__drawStoragePretty.name);
    };
    UiManager.prototype.DebugDataOneNode = function (dataOneTreeNode) {
        this.debug().FuncStart(this.DebugDataOneNode.name);
        var activeOrNot = dataOneTreeNode.IsActive ? '* ' : '  ';
        var expandedOrNot = dataOneTreeNode.IsExpanded ? '+ ' : '  ';
        var toReturn = activeOrNot + expandedOrNot + dataOneTreeNode.NodeId.asString + ' ' + dataOneTreeNode.NodeFriendly;
        this.debug().FuncEnd(this.DebugDataOneNode.name);
        return toReturn;
    };
    UiManager.prototype.GetDebugDataOneCE = function (dataOneCe) {
        this.debug().FuncStart('GetDebugDataOneCE');
        var toReturn = [];
        toReturn.push('------ All Tree Nodes -----');
        for (var idx = 0; idx < dataOneCe.AllTreeNodeAr.length; idx++) {
            this.debug().Log('idx: ' + idx);
            var oneVal = this.DebugDataOneNode(dataOneCe.AllTreeNodeAr[idx]);
            this.debug().Log('oneVal : ' + oneVal);
            toReturn.push(oneVal);
        }
        this.debug().FuncEnd(this.GetDebugDataOneCE.name);
        return toReturn;
    };
    UiManager.prototype.__buildDebugDataPretty = function (dataOneWindow) {
        this.debug().FuncStart(this.__buildDebugDataPretty.name, 'data not null? ' + this.debug().IsNullOrUndefined(dataOneWindow));
        var toReturn = [];
        if (dataOneWindow) {
            toReturn.push('------ One Window Snap Shot Start -----');
            toReturn.push('Id: ' + dataOneWindow.Id);
            toReturn.push('TimeStamp: ' + dataOneWindow.TimeStamp);
            toReturn.push('CE Count: ' + dataOneWindow.AllCEAr.length);
            toReturn.push('Type: ' + scWindowType_1.scWindowType[dataOneWindow.WindowType]);
            toReturn.push('Nickname: ' + dataOneWindow.NickName);
            for (var jdx = 0; jdx < dataOneWindow.AllCEAr.length; jdx++) {
                toReturn.push('\t------ One CE Start -----');
                var dataOneCE = dataOneWindow.AllCEAr[jdx];
                toReturn.push('\tId: ' + dataOneCE.Id.asString);
                var allCeDebugDataAr = this.GetDebugDataOneCE(dataOneCE);
                for (var kdx = 0; kdx < allCeDebugDataAr.length; kdx++) {
                    toReturn.push('\t\t' + allCeDebugDataAr[kdx]);
                }
                toReturn.push('\t------ One CE End -----');
            }
            toReturn.push('------ One Window Snap Shot End -----');
            this.debug().FuncEnd(this.__buildDebugDataPretty.name);
        }
        else {
            this.debug().Error(this.__buildDebugDataPretty.name, 'missing data');
        }
        return toReturn;
    };
    UiManager.prototype.DrawDebugDataPretty = function (source) {
        this.debug().FuncStart(this.DrawDebugDataPretty.name, 'source not null: ' + this.debug().IsNullOrUndefined(source));
        var allDebugData = this.__buildDebugDataPretty(source);
        //allDebugData = allDebugData.concat(this.__drawSettings());
        for (var ldx = 0; ldx < allDebugData.length; ldx++) {
            this.PopHub.FeedbackMan.WriteLine(allDebugData[ldx]);
        }
        this.debug().FuncEnd(this.DrawDebugDataPretty.name);
    };
    UiManager.prototype.ClearTextArea = function () {
        var ta = this.__getTextArea();
        if (ta) {
            ta.value = '';
        }
        else {
            this.debug().Error(this.ClearTextArea.name, 'No text area found');
        }
    };
    UiManager.prototype.__wireParentFocusCheck = function () {
        ////this.PageDataMan().TopLevelWindow().DataDocSelf.Document.addEventListener('focus', () => { alert('vis change'); })
        //this.PageDataMan().TopLevelWindow().DataDocSelf.Document.addEventListener('focus', () => { this.OnParentFocused(true); })
        //this.PageDataMan().TopLevelWindow().DataDocSelf.Document.addEventListener('blur', () => { this.OnParentFocused(false); })
        var _this = this;
        window.addEventListener('focus', function () { _this.OnMenuFocused(true); });
        window.addEventListener('blur', function () { _this.OnMenuFocused(false); });
    };
    UiManager.prototype.OnParentFocused = function (isFocused) {
        this.ParentFocused = isFocused;
        this.CalculateMenuDisplay();
    };
    UiManager.prototype.OnMenuFocused = function (isFocused) {
        this.MenuFocused = isFocused;
        this.CalculateMenuDisplay();
    };
    UiManager.prototype.CalculateMenuDisplayDelayed = function (self) {
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
        var menuOverlay = document.querySelector(self.PopConst().Selector.HS.menuOverlay);
        if (menuOverlay) {
            if (self.MenuEnabled) {
                menuOverlay.style.display = 'none';
            }
            else
                menuOverlay.style.display = '';
        }
    };
    UiManager.prototype.CalculateMenuDisplay = function () {
        var _this = this;
        var self = this;
        setTimeout(function () { _this.CalculateMenuDisplayDelayed(self); }, 100);
        setTimeout(function () { _this.CalculateMenuDisplayDelayed(self); }, 1000);
    };
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
    UiManager.prototype.__getTextArea = function () {
        return document.getElementById(this.PopConst().ElemId.HS.TaDebug);
    };
    UiManager.prototype.HndlrDebugTextChanged = function (caller, data) {
        var self = caller;
        var ta = self.__getTextArea();
        if (ta) {
            if (data.Append) {
                ta.value += data.NewText + '\n';
            }
            else {
                ta.value = data.NewText + '\n';
            }
            ta.scrollTop = ta.scrollHeight;
        }
    };
    UiManager.prototype.SetParentInfo = function (winDataParent) {
        var targetSpan = document.getElementById(this.PopConst().ElemId.HindSiteParentInfo);
        if (targetSpan) {
            targetSpan.innerHTML = ' | Parent Id: ' + this.GuidMan().ShortGuid(winDataParent.DataDocSelf.XyyzId) + ' | ' + winDataParent.Window.location.href;
        }
    };
    UiManager.prototype.SetAccordianClass = function (targetElem, isCollapsed) {
        if (!isCollapsed) {
            targetElem.classList.remove(this.PopConst().ClassNames.HS.Collapsed);
        }
        else {
            targetElem.classList.add(this.PopConst().ClassNames.HS.Collapsed);
        }
    };
    UiManager.prototype.GetAccordianContentElem = function (sib) {
        //this.debug().FuncStart(this.GetAccordianContentElem.name);
        var toReturn;
        if (sib) {
            var siblings = sib.parentElement.getElementsByClassName('accordian-content');
            if (siblings) {
                var toReturn = siblings[0];
            }
        }
        //this.debug().FuncEnd(this.GetAccordianContentElem.name);
        return toReturn;
    };
    UiManager.prototype.DrawStorageResponse = function (data) {
        this.debug().FuncStart('DrawStorage');
        try {
            //var ourData: IOneStorageData[] = this.__getAllLocalStorageAsIOneStorageData();
            if (data.CurrentSnapShots) {
                //this.__drawStorageRaw(data.CurrentSnapShots)
                //this.__drawStoragePretty(data.CurrentSnapShots)
            }
        }
        catch (e) {
            this.debug().Error(this.DrawStorageResponse.name, e.message);
        }
        this.debug().FuncEnd('DrawStorage');
    };
    UiManager.prototype.__drawStorageRaw = function (ourData) {
        this.debug().FuncStart('DrawStorageRaw');
        for (var idx = 0; idx < ourData.length; idx++) {
            this.debug().Log('key: \t' + ourData[idx].key);
            this.debug().Log('data: \t' + ourData[idx].data);
            this.debug().Log('------------');
        }
        this.debug().FuncEnd('DrawStorageRaw');
    };
    UiManager.prototype.RestoreAccordianStates = function () {
        var accordianSettings = this.PopAtticMan().CurrentSettings().Accordian;
        for (var idx = 0; idx < accordianSettings.length; idx++) {
            var candidate = accordianSettings[idx];
            var target = document.getElementById(candidate.ElemId);
            if (target) {
                var contentSib = this.GetAccordianContentElem(target);
                if (contentSib) {
                    this.SetAccordianClass(contentSib, candidate.isCollapsed);
                }
            }
        }
    };
    UiManager.prototype.UpdateAtticFromUi = function () {
        this.debug().FuncStart(this.UpdateAtticFromUi.name);
        var currentSettings = this.PopAtticMan().CurrentSettings();
        var currentVal = document.querySelector(this.PopConst().Selector.HS.iCBoxdSettingsShowDebugData).checked;
        this.debug().LogVal('currentVal', currentVal.toString());
        currentSettings.DebugSettings.ShowDebugData = currentVal;
        this.PopAtticMan().StoreSettings(currentSettings);
        this.RefreshUiRequest();
        this.debug().FuncEnd(this.UpdateAtticFromUi.name);
    };
    UiManager.prototype.SelectChanged = function () {
        this.debug().FuncStart(this.SelectChanged.name);
        this.__selectSnapshotIndex = this.__getSelectElem().selectedIndex;
        this.debug().Log('new index :' + this.__selectSnapshotIndex);
        //if (e.ctrlKey) {
        //  alert
        //}
        this.RefreshUiRequest();
        this.debug().FuncEnd(this.SelectChanged.name);
    };
    UiManager.prototype.__GetCancelButton = function () {
        return document.getElementById(this.PopConst().ElemId.HS.Btn.Cancel);
    };
    UiManager.prototype.SetCancelFlag = function () {
        this.OperationCancelled = true;
        var btn = this.__GetCancelButton();
        if (btn) {
            btn.classList.add('red');
        }
    };
    UiManager.prototype.ClearCancelFlag = function () {
        var btn = this.__GetCancelButton();
        if (btn) {
            btn.classList.remove('red');
        }
        this.UiMan().OperationCancelled = false;
    };
    UiManager.prototype.__refreshSettings = function () {
        this.debug().FuncStart(this.__refreshSettings.name);
        var debugFieldSet = window.document.querySelector(this.PopConst().Selector.HS.IdFieldSetDebug);
        var currentSettings = this.PopAtticMan().CurrentSettings();
        if (currentSettings) {
            if (debugFieldSet) {
                var newDisplay = this.PopAtticMan().CurrentSettings().DebugSettings.ShowDebugData ? '' : 'none';
                debugFieldSet.style.display = newDisplay;
            }
            var checkBoxShowDebug = window.document.querySelector(this.PopConst().Selector.HS.iCBoxdSettingsShowDebugData);
            if (checkBoxShowDebug) {
                this.debug().LogVal('before', checkBoxShowDebug.checked.toString());
                checkBoxShowDebug.checked = currentSettings.DebugSettings.ShowDebugData;
                this.debug().LogVal('after', checkBoxShowDebug.checked.toString());
            }
            else {
                this.debug().Error(this.RefreshUiRequest.name, 'no checkbox found');
            }
        }
        else {
            this.debug().Error(this.RefreshUiRequest.name, 'no settings found');
        }
        this.debug().FuncEnd(this.__refreshSettings.name);
    };
    UiManager.prototype.RefreshUiRequest = function () {
        this.debug().FuncStart(this.__drawCorrectNicknameInUI.name);
        var payload = this.MsgMan().SendMessage(new MsgPayloadRequestFromPopUp_1.MsgFromPopUp(MessageFlag_1.MsgFlag.GiveCurrentData));
        this.__refreshSettings();
        this.RestoreAccordianStates();
        this.debug().FuncEnd(this.__drawCorrectNicknameInUI.name);
    };
    UiManager.prototype.RefreshUiResponse = function (data) {
        //var snapShots: IDataOneWindowStorage[] = this.MsgMan().SendMessage(MsgFlag.GetAllStorageOneWindow);
        this.__populateStateOfSnapShotSelect(data.CurrentSnapShots);
        this.__drawCorrectNicknameInUI(data.CurrentSnapShots);
    };
    UiManager.prototype.ShowDebugDataOneWindow = function () {
        this.debug().FuncStart('ShowDebugDataOneWindow');
        var toReturn = [];
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
    };
    UiManager.prototype.__drawCorrectNicknameInUI = function (snapShots) {
        this.debug().FuncStart(this.__drawCorrectNicknameInUI.name);
        var targetId = this.UiMan().GetIdOfSelectWindowSnapshot();
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
                var inputElem = window.document.getElementById(this.PopConst().ElemId.InputNickname);
                if (inputElem) {
                    inputElem.value = storageMatch.NickName;
                }
            }
        }
        this.debug().FuncEnd(this.__drawCorrectNicknameInUI.name);
    };
    UiManager.prototype.GetValueInNickname = function () {
        var toReturn = '';
        toReturn = window.document.getElementById(this.PopConst().ElemId.InputNickname).value;
        return toReturn;
    };
    UiManager.prototype.__getSelectElem = function () {
        return window.document.getElementById(this.PopConst().ElemId.HS.SelStateSnapShot);
    };
    UiManager.prototype.GetIdOfSelectWindowSnapshot = function () {
        this.debug().FuncStart(this.GetIdOfSelectWindowSnapshot.name);
        var targetSel = this.__getSelectElem();
        var toReturn = null;
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
    };
    UiManager.prototype.AssignOnClickEvent = function (targetId, handler) {
        var targetElem = document.getElementById(targetId);
        if (!targetElem) {
            this.debug().Error(this.AssignOnClickEvent.name, 'No Id: ' + targetId);
        }
        else {
            targetElem.addEventListener('click', function (evt) { handler(evt); });
        }
    };
    UiManager.prototype.AssignOnChangeEvent = function (targetId, handler) {
        var targetElem = document.getElementById(targetId);
        if (!targetElem) {
            this.debug().Error(this.AssignOnClickEvent.name, 'No Id: ' + targetId);
        }
        else {
            targetElem.onchange = function () { handler; };
        }
    };
    UiManager.prototype.AssignDblClickEvent = function (targetId, handler) {
        var targetElem = document.getElementById(targetId);
        if (!targetElem) {
            this.debug().Error(this.AssignOnClickEvent.name, 'No Id: ' + targetId);
        }
        else {
            targetElem.ondblclick = function (evt) { handler(evt); };
        }
    };
    UiManager.prototype.__populateStateOfSnapShotSelect = function (snapShots) {
        this.debug().FuncStart(this.__populateStateOfSnapShotSelect.name, this.__selectSnapshotIndex.toString());
        if (snapShots) {
            var targetSel = this.__getSelectElem();
            if (targetSel) {
                var header = window.document.createElement('optgroup');
                header.label = this.Utilites().SelectHeaderStr();
                if (snapShots && snapShots.length > 0) {
                    targetSel.options.length = 0;
                    this.debug().Log('targetSel.options.length : ' + targetSel.options.length);
                    for (var idx = 0; idx < snapShots.length; idx++) {
                        var data = snapShots[idx];
                        var el = window.document.createElement('option');
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
    };
    return UiManager;
}(PopUpManagerBase_1.PopUpManagerBase));
exports.UiManager = UiManager;
//# sourceMappingURL=UiManager.js.map