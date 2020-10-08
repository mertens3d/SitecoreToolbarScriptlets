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
exports.SelectSnapshotModule = void 0;
var StaticHelpers_1 = require("../../../../Shared/scripts/Classes/StaticHelpers");
var BufferChar_1 = require("../../../../Shared/scripts/Enums/BufferChar");
var ModuleKey_1 = require("../../../../Shared/scripts/Enums/ModuleKey");
var BufferDirection_1 = require("../../../../Shared/scripts/Enums/BufferDirection");
var _5000___scWindowType_1 = require("../../../../Shared/scripts/Enums/5000 - scWindowType");
var SnapShotFlavor_1 = require("../../../../Shared/scripts/Enums/SnapShotFlavor");
var Guid_1 = require("../../../../Shared/scripts/Helpers/Guid");
var SharedConst_1 = require("../../../../Shared/scripts/SharedConst");
var PopConst_1 = require("../../../../Shared/scripts/Const/PopConst");
var StateHelpers_1 = require("../../Classes/StateHelpers");
var SelectSnapUiMutationEvent_Subject_1 = require("../../Events/SelectSnapUiMutationEvent/SelectSnapUiMutationEvent_Subject");
var _UiModuleBase_1 = require("../_UiModuleBase");
var SelectSnapshotModule = /** @class */ (function (_super) {
    __extends(SelectSnapshotModule, _super);
    function SelectSnapshotModule(hindeCore, containerSelector) {
        var _this = _super.call(this, hindeCore, containerSelector) || this;
        _this.ModuleKey = ModuleKey_1.ModuleKey.SelectSnapShot;
        _this.Friendly = SelectSnapshotModule.name;
        _this.SelectSnapshotModule_Subject = new SelectSnapUiMutationEvent_Subject_1.SelectSnapUiMutationEvent_Subject(_this.HindeCore);
        _this.StateHelpers = new StateHelpers_1.StateHelpers(_this.HindeCore);
        return _this;
    }
    SelectSnapshotModule.prototype.Init_Module = function () {
        this.Init_UiModuleBase();
        this.SelectElement = this.ContainerUiDivElem.querySelector('select');
    };
    SelectSnapshotModule.prototype.BuildHtmlForModule = function () {
        //intentionally empty
    };
    SelectSnapshotModule.prototype.WireEvents_Module = function () {
        var _this = this;
        this.Logger.FuncStart(this.WireEvents_Module.name, this.ContainerSelector);
        if (!this.SelectElement) {
            this.ErrorHand.ErrorAndThrow(this.WireEvents_Module.name, 'No Id: ' + this.ContainerSelector);
        }
        else {
            this.SelectElement.onchange = (function () {
                var self = _this;
                var payload = {
                    SelectSnapshotId: _this.GetSelectSnapshotId()
                };
                _this.SelectSnapshotModule_Subject.NotifyObserversAsync(payload);
            });
        }
        this.Logger.FuncEnd(this.WireEvents_Module.name, this.ContainerSelector);
    };
    SelectSnapshotModule.prototype.RefreshUi_Module = function () {
        this.PopulateStateOfSnapShotSelectElement();
        //this.SelectSnapshotModule_Subject.NotifyObservers();
    };
    SelectSnapshotModule.prototype.SelectHeaderStr = function (prefix) {
        // '    Time Stamp          - Page Type - Nickname       - Favorite?';
        var toReturn = StaticHelpers_1.StaticHelpers.BufferString('', 4, BufferChar_1.BufferChar.Period, BufferDirection_1.BufferDirection.right)
            + StaticHelpers_1.StaticHelpers.BufferString('Time Stamp', PopConst_1.PopConst.Const.SnapShotFormat.lenTimestamp, BufferChar_1.BufferChar.Period, BufferDirection_1.BufferDirection.right)
            + PopConst_1.PopConst.Const.SnapShotFormat.colSep + StaticHelpers_1.StaticHelpers.BufferString('Type', PopConst_1.PopConst.Const.SnapShotFormat.lenPageType, BufferChar_1.BufferChar.Period, BufferDirection_1.BufferDirection.right)
            + PopConst_1.PopConst.Const.SnapShotFormat.colSep + StaticHelpers_1.StaticHelpers.BufferString('Nickname', PopConst_1.PopConst.Const.SnapShotFormat.lenNickname, BufferChar_1.BufferChar.Period, BufferDirection_1.BufferDirection.right)
            + PopConst_1.PopConst.Const.SnapShotFormat.colSep + StaticHelpers_1.StaticHelpers.BufferString('Main Sec', PopConst_1.PopConst.Const.SnapShotFormat.MainSectionNode, BufferChar_1.BufferChar.Period, BufferDirection_1.BufferDirection.right)
            + PopConst_1.PopConst.Const.SnapShotFormat.colSep + StaticHelpers_1.StaticHelpers.BufferString('Active', PopConst_1.PopConst.Const.SnapShotFormat.lenActiveNode, BufferChar_1.BufferChar.Period, BufferDirection_1.BufferDirection.right)
            + PopConst_1.PopConst.Const.SnapShotFormat.colSep + StaticHelpers_1.StaticHelpers.BufferString('Fav.', PopConst_1.PopConst.Const.SnapShotFormat.lenFavorite, BufferChar_1.BufferChar.Period, BufferDirection_1.BufferDirection.right)
            + PopConst_1.PopConst.Const.SnapShotFormat.colSep + StaticHelpers_1.StaticHelpers.BufferString('Id', PopConst_1.PopConst.Const.SnapShotFormat.lenShortId, BufferChar_1.BufferChar.Period, BufferDirection_1.BufferDirection.right)
            + PopConst_1.PopConst.Const.SnapShotFormat.colSep + StaticHelpers_1.StaticHelpers.BufferString('#CE', PopConst_1.PopConst.Const.SnapShotFormat.lenCeCount, BufferChar_1.BufferChar.Period, BufferDirection_1.BufferDirection.right);
        return toReturn;
    };
    SelectSnapshotModule.prototype.GetSelectSnapshotId = function () {
        this.Logger.FuncStart(this.GetSelectSnapshotId.name);
        var currentVal = this.SelectElement.value;
        this.Logger.LogVal('currentVal', currentVal);
        var toReturn;
        if (currentVal) {
            toReturn = Guid_1.Guid.ParseGuid(currentVal, true);
        }
        else {
            toReturn = Guid_1.Guid.GetEmptyGuid();
        }
        this.Logger.FuncEnd(this.GetSelectSnapshotId.name);
        return toReturn;
    };
    SelectSnapshotModule.prototype.GetSelectSnapshotNickname = function () {
        this.Logger.FuncStart(this.GetSelectSnapshotId.name);
        var selectedIndex = this.SelectElement.selectedIndex;
        this.Logger.LogVal('selectedIndex', selectedIndex);
        var toReturn;
        if (selectedIndex && this.RefreshData && this.RefreshData.StateOfStorageSnapShots) {
            var snapShots = this.RefreshData.StateOfStorageSnapShots.SnapShots;
            if (snapShots) {
                var selected = snapShots[selectedIndex];
                if (selected) {
                    toReturn = selected.Friendly.NickName;
                }
            }
        }
        else {
            this.ErrorHand.WarningAndContinue(this.GetSelectSnapshotNickname.name, 'no match');
        }
        this.Logger.FuncEnd(this.GetSelectSnapshotId.name);
        return toReturn;
    };
    SelectSnapshotModule.prototype.WriteHeaders = function () {
        var toReturn = {
            Auto: null,
            Favorite: null,
            AutoTitle: null,
            FavoriteTitle: null,
            Manual: null,
            ManualTitle: null
        };
        toReturn.Auto = window.document.createElement(SharedConst_1.SharedConst.Const.KeyWords.Html.optgroup);
        toReturn.Auto.label = this.SelectHeaderStr('');
        toReturn.Auto.id = PopConst_1.PopConst.Const.ElemId.HS.SelectHeaderAuto;
        toReturn.AutoTitle = window.document.createElement(SharedConst_1.SharedConst.Const.KeyWords.Html.optgroup);
        toReturn.AutoTitle.label = 'Auto Snap Shots';
        toReturn.AutoTitle.id = PopConst_1.PopConst.Const.ElemId.HS.SelectHeaderAutoTitle;
        toReturn.AutoTitle.classList.add('title');
        //------
        toReturn.Manual = window.document.createElement(SharedConst_1.SharedConst.Const.KeyWords.Html.optgroup);
        toReturn.Manual.label = this.SelectHeaderStr('');
        toReturn.Manual.id = PopConst_1.PopConst.Const.ElemId.HS.SelectHeaderManual;
        toReturn.ManualTitle = window.document.createElement(SharedConst_1.SharedConst.Const.KeyWords.Html.optgroup);
        toReturn.ManualTitle.label = 'Manual Snap Shots';
        toReturn.ManualTitle.id = PopConst_1.PopConst.Const.ElemId.HS.SelectHeaderManualTitle;
        toReturn.ManualTitle.classList.add('title');
        //------
        toReturn.Favorite = window.document.createElement(SharedConst_1.SharedConst.Const.KeyWords.Html.optgroup);
        toReturn.Favorite.label = this.SelectHeaderStr('');
        toReturn.Favorite.id = PopConst_1.PopConst.Const.ElemId.HS.SelectHeaderFavorite;
        toReturn.FavoriteTitle = window.document.createElement(SharedConst_1.SharedConst.Const.KeyWords.Html.optgroup);
        toReturn.FavoriteTitle.label = 'Favorite Snap Shots';
        toReturn.FavoriteTitle.id = PopConst_1.PopConst.Const.ElemId.HS.SelectHeaderFavoriteTitle;
        toReturn.FavoriteTitle.classList.add('title');
        return toReturn;
    };
    SelectSnapshotModule.prototype.SelectChanged = function () {
        this.Logger.FuncStart(this.SelectChanged.name);
        //this.debug().Log('new index :' + this.__selectSnapshotId);
        //if (e.ctrlKey) {
        //  alert
        //}
        this.Logger.FuncEnd(this.SelectChanged.name);
    };
    SelectSnapshotModule.prototype.PopulateStateOfSnapShotSelectElement = function () {
        this.Logger.FuncStart(this.PopulateStateOfSnapShotSelectElement.name);
        var priorValue = this.GetSelectSnapshotId();
        if (this.RefreshData.StateOfStorageSnapShots && this.RefreshData.StateOfStorageSnapShots.SnapShots) {
            var stateOfScUiProxies = this.RefreshData.StateOfStorageSnapShots.SnapShots;
            if (this.SelectElement) {
                this.CleanExistingSelection(this.SelectElement);
                var headers = this.WriteHeaders();
                if (stateOfScUiProxies && stateOfScUiProxies.length > 0) {
                    for (var idx = 0; idx < stateOfScUiProxies.length; idx++) {
                        var stateOfScUiProxy = stateOfScUiProxies[idx];
                        this.ErrorHand.ThrowIfNullOrUndefined(this.PopulateStateOfSnapShotSelectElement.name, stateOfScUiProxy);
                        var el = this.BuildOneSnapshot(stateOfScUiProxy, priorValue, idx);
                        this.AppendSnapShotToCorrectGroup(stateOfScUiProxy, el, headers);
                    }
                }
                this.SelectElement.appendChild(headers.FavoriteTitle);
                this.SelectElement.appendChild(headers.Favorite);
                this.SelectElement.appendChild(headers.ManualTitle);
                this.SelectElement.appendChild(headers.Manual);
                this.SelectElement.appendChild(headers.AutoTitle);
                this.SelectElement.appendChild(headers.Auto);
            }
        }
        else {
            this.Logger.Log('no snap shots');
        }
        this.Logger.FuncEnd(this.PopulateStateOfSnapShotSelectElement.name);
    };
    SelectSnapshotModule.prototype.GetFirstDataWithActiveNode = function (stateOfScUiProxy) {
        var toReturn = {
            StateOfHostedFrame: null,
            activeTreeNodeFlat: null
        };
        // todo - put back
        //if (stateOfScUiProxy.Meta.WindowType === ScWindowType.Desktop) {
        //  if (stateOfScUiProxy.StateOfScWindow && stateOfScUiProxy.StateOfScWindow.StateOfDesktop && (stateOfScUiProxy.StateOfScWindow.StateOfDesktop.StateOfDTArea.ActiveDTFrameIndex > -1) && stateOfScUiProxy.StateOfScWindow.StateOfDesktop.StateOfDTArea.StateOfDTFrames) {
        //    let activeFrame: IStateOfDTFrame = this.StateHelpers.GetActiveFrameFromStateOfDesktop(stateOfScUiProxy.StateOfScWindow.StateOfDesktop);
        //    toReturn.StateOfHostedProxy = activeFrame.StateOfHostedProxy;
        //    if (toReturn.StateOfHostedProxy.StatefullDisciminator === StateFullProxyDisciminator.ContentEditor) {
        //      toReturn.activeTreeNodeFlat = this.StateHelpers.GetActiveTreeNodeFromStateOfContentEditor(<IStateOfContentEditor>activeFrame.StateOfHostedProxy);
        //    } else {
        //      toReturn.activeTreeNodeFlat = null;
        //    }
        //  } else {
        //    //this.Logger.LogAsJsonPretty('something is wrong with the data (maybe)', data);
        //  }
        //}
        //else if ((stateOfScUiProxy.Meta.WindowType === ScWindowType.ContentEditor) && stateOfScUiProxy.StateOfScWindow.StateOfContentEditor && stateOfScUiProxy.StateOfScWindow.StateOfContentEditor.StateOfContentTree) {
        //  toReturn.activeTreeNodeFlat = this.StateHelpers.GetActiveTreeNodeFromStateOfContentEditor(<IStateOfContentEditor>(toReturn.StateOfHostedProxy));
        //} else {
        //  this.ErrorHand.WarningAndContinue(this.GetFirstDataWithActiveNode.name, 'Not implemented ' + StaticHelpers.ScWindowTypeFriendly(stateOfScUiProxy.Meta.WindowType));
        //}
        return toReturn;
    };
    SelectSnapshotModule.prototype.TimeNicknameFavStr = function (stateOfScUiProxy) {
        var typeStr = '';
        if (stateOfScUiProxy.Meta.WindowType === _5000___scWindowType_1.ScWindowType.ContentEditor) {
            typeStr = 'Cont Ed';
        }
        else if (stateOfScUiProxy.Meta.WindowType === _5000___scWindowType_1.ScWindowType.Desktop) {
            typeStr = 'Desktop';
        }
        //= (data.Meta.WindowType === scWindowType.Unknown) ? '?' : scWindowType[data.Meta.WindowType];
        var activeCeNode = '';
        var MainSectionNode = '';
        var candidateCe = this.GetFirstDataWithActiveNode(stateOfScUiProxy);
        if (candidateCe && candidateCe.activeTreeNodeFlat && candidateCe.activeTreeNodeFlat.Friendly) {
            activeCeNode = candidateCe.activeTreeNodeFlat.Friendly.trim();
            //todo - put back if (candidateCe.StateOfContentEditorProxy.StateOfContentEditorTreeProxy.StateOfTreeNodes.length >= 2) {
            //  MainSectionNode = candidateCe.StateOfContentEditorProxy.StateOfContentEditorTreeProxy.StateOfTreeNodes[1].FriendlyTreeNode.trim();
            //}
        }
        else {
            MainSectionNode = 'todo ' + this.TimeNicknameFavStr.name;
        }
        var toReturn = this.FormatDisplayString(stateOfScUiProxy, typeStr, MainSectionNode, activeCeNode);
        var count = "";
        if (stateOfScUiProxy.Meta.WindowType === _5000___scWindowType_1.ScWindowType.Desktop) {
            if (stateOfScUiProxy
                &&
                    stateOfScUiProxy.StateOfScWindow
                &&
                    stateOfScUiProxy.StateOfScWindow.StateOf_) {
                var stateOfDesktop = stateOfScUiProxy.StateOfScWindow.StateOf_;
                if (stateOfDesktop
                    &&
                        stateOfDesktop.StateOfDTArea
                    &&
                        stateOfDesktop.StateOfDTArea.StateOfDTFrames) {
                    count = PopConst_1.PopConst.Const.SnapShotFormat.colSep + StaticHelpers_1.StaticHelpers.BufferString(stateOfDesktop.StateOfDTArea.StateOfDTFrames.length.toString(), PopConst_1.PopConst.Const.SnapShotFormat.lenCeCount, BufferChar_1.BufferChar.Nbsp, BufferDirection_1.BufferDirection.right);
                    toReturn = toReturn + count;
                }
            }
        }
        return toReturn;
    };
    SelectSnapshotModule.prototype.FormatDisplayString = function (stateOfScUiProxy, typeStr, MainSectionNode, activeCeNode) {
        var toReturn = StaticHelpers_1.StaticHelpers.BufferString(stateOfScUiProxy.Friendly.TimeStamp, PopConst_1.PopConst.Const.SnapShotFormat.lenTimestamp, BufferChar_1.BufferChar.space, BufferDirection_1.BufferDirection.right)
            + PopConst_1.PopConst.Const.SnapShotFormat.colSep + StaticHelpers_1.StaticHelpers.BufferString(typeStr, PopConst_1.PopConst.Const.SnapShotFormat.lenPageType, BufferChar_1.BufferChar.Nbsp, BufferDirection_1.BufferDirection.right)
            + PopConst_1.PopConst.Const.SnapShotFormat.colSep + StaticHelpers_1.StaticHelpers.BufferString(stateOfScUiProxy.Friendly.NickName, PopConst_1.PopConst.Const.SnapShotFormat.lenNickname, BufferChar_1.BufferChar.Nbsp, BufferDirection_1.BufferDirection.right)
            + PopConst_1.PopConst.Const.SnapShotFormat.colSep + StaticHelpers_1.StaticHelpers.BufferString(MainSectionNode, PopConst_1.PopConst.Const.SnapShotFormat.MainSectionNode, BufferChar_1.BufferChar.Nbsp, BufferDirection_1.BufferDirection.right)
            + PopConst_1.PopConst.Const.SnapShotFormat.colSep + StaticHelpers_1.StaticHelpers.BufferString(activeCeNode, PopConst_1.PopConst.Const.SnapShotFormat.lenActiveNode, BufferChar_1.BufferChar.Nbsp, BufferDirection_1.BufferDirection.right)
            + PopConst_1.PopConst.Const.SnapShotFormat.colSep + StaticHelpers_1.StaticHelpers.BufferString((stateOfScUiProxy.Meta.Flavor === SnapShotFlavor_1.SnapShotFlavor.Favorite ? '*' : ''), PopConst_1.PopConst.Const.SnapShotFormat.lenFavorite, BufferChar_1.BufferChar.Nbsp, BufferDirection_1.BufferDirection.right)
            //+ PopConst.Const.SnapShotFormat.colSep + StaticHelpers.BufferString((data.Flavor === SnapShotFlavor.Autosave ? 'A' : ' '), 1, BufferChar.Nbsp, BufferDirection.right)
            + PopConst_1.PopConst.Const.SnapShotFormat.colSep + StaticHelpers_1.StaticHelpers.BufferString(Guid_1.Guid.AsShort(stateOfScUiProxy.Meta.SnapshotId), PopConst_1.PopConst.Const.SnapShotFormat.lenShortId, BufferChar_1.BufferChar.Nbsp, BufferDirection_1.BufferDirection.right);
        return toReturn;
    };
    SelectSnapshotModule.prototype.BuildOneSnapshot = function (stateOfScUiProxy, prior, idx) {
        var el = window.document.createElement('option');
        var timeNicknameFavStr = this.TimeNicknameFavStr(stateOfScUiProxy);
        el.innerHTML = timeNicknameFavStr;
        if (stateOfScUiProxy.Meta.Flavor === SnapShotFlavor_1.SnapShotFlavor.Favorite) {
            el.classList.add('favorite');
        }
        el.value = stateOfScUiProxy.Meta.SnapshotId.Raw;
        //data.Meta.SessionId &&
        if ((prior && stateOfScUiProxy.Meta.SnapshotId.Raw === prior.Raw) ||
            (idx === 0 && !prior)
            ||
                (idx === 0 && prior.Raw === Guid_1.Guid.GetEmptyGuid().Raw)) {
            el.selected = true;
        }
        return el;
    };
    SelectSnapshotModule.prototype.AppendSnapShotToCorrectGroup = function (data, el, headers) {
        if (!StaticHelpers_1.StaticHelpers.IsNullOrUndefined([data, el, headers])) {
            if (data.Meta.Flavor === SnapShotFlavor_1.SnapShotFlavor.Autosave) {
                headers.Auto.appendChild(el);
            }
            else if (data.Meta.Flavor === SnapShotFlavor_1.SnapShotFlavor.Favorite) {
                headers.Favorite.appendChild(el);
            }
            else {
                headers.Manual.appendChild(el);
            }
        }
        else {
            this.ErrorHand.WarningAndContinue(this.AppendSnapShotToCorrectGroup.name, 'null in parameters');
        }
    };
    SelectSnapshotModule.prototype.cleanOneGroup = function (targetSel, targetId) {
        var optGroup = targetSel.querySelector('[id=' + targetId + ']');
        if (optGroup) {
            optGroup.remove();
        }
    };
    SelectSnapshotModule.prototype.CleanExistingSelection = function (targetSel) {
        this.Logger.FuncStart(this.CleanExistingSelection.name);
        this.cleanOneGroup(targetSel, PopConst_1.PopConst.Const.ElemId.HS.SelectHeaderAuto);
        this.cleanOneGroup(targetSel, PopConst_1.PopConst.Const.ElemId.HS.SelectHeaderAutoTitle);
        this.cleanOneGroup(targetSel, PopConst_1.PopConst.Const.ElemId.HS.SelectHeaderFavorite);
        this.cleanOneGroup(targetSel, PopConst_1.PopConst.Const.ElemId.HS.SelectHeaderFavoriteTitle);
        this.cleanOneGroup(targetSel, PopConst_1.PopConst.Const.ElemId.HS.SelectHeaderManual);
        this.cleanOneGroup(targetSel, PopConst_1.PopConst.Const.ElemId.HS.SelectHeaderManualTitle);
        targetSel.options.length = 0;
        this.Logger.FuncEnd(this.CleanExistingSelection.name);
    };
    return SelectSnapshotModule;
}(_UiModuleBase_1._UiModuleBase));
exports.SelectSnapshotModule = SelectSnapshotModule;
//# sourceMappingURL=SelectSnapshotModule.js.map