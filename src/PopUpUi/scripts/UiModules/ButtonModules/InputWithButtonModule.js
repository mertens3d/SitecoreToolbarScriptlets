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
exports.InputWithButtonModule = void 0;
var ModuleKey_1 = require("../../../../Shared/scripts/Enums/ModuleKey");
var SharedConst_1 = require("../../../../Shared/scripts/SharedConst");
var _baseButtonModule_1 = require("./_baseButtonModule");
var InputWithButtonModule = /** @class */ (function (_super) {
    __extends(InputWithButtonModule, _super);
    function InputWithButtonModule() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ModuleKey = ModuleKey_1.ModuleKey.ButtonWithInput;
        return _this;
    }
    InputWithButtonModule.prototype.WireEvents_Module = function () {
        this.WireEvents_Base();
    };
    InputWithButtonModule.prototype.Init_Module = function () {
        this.Init_BaseButtonModule();
    };
    InputWithButtonModule.prototype.BuildHtmlForModule = function () {
        this.BuildHtmlForModule_base_ButtonModule();
        this.InputElement = document.createElement(SharedConst_1.SharedConst.Const.KeyWords.Html.Input);
        this.InputElement.type = SharedConst_1.SharedConst.Const.KeyWords.Html.Text;
        this.InputElement.placeholder = "Set Nick Name";
        this.InputElement.value = '';
        if (this.ContainerUiDivElem) {
            this.ContainerUiDivElem.insertBefore(this.InputElement, this.HTMLButtonElement);
        }
    };
    InputWithButtonModule.prototype.GetInputValue = function () {
        var toReturn = "";
        if (this.InputElement) {
            toReturn = this.InputElement.value;
        }
        return toReturn;
    };
    InputWithButtonModule.prototype.RefreshUi_Module = function () {
        this.DrawCorrectNicknameInUI();
    };
    InputWithButtonModule.prototype.DrawCorrectNicknameInUI = function () {
        this.Logger.FuncStart(this.DrawCorrectNicknameInUI.name);
        var snapShots = this.RefreshData.StateOfStorageSnapShots.SnapShots;
        var targetId = this.RefreshData.SelectSnapShotId;
        if (targetId) {
            this.Logger.Log('targetId : ' + targetId.Raw);
            var storageValues = snapShots;
            if (storageValues) {
                for (var idx = 0; idx < storageValues.length; idx++) {
                    var candidate = storageValues[idx];
                    //this.Logger.LogAsJsonPretty('candidate', candidate);
                    if (candidate.Meta.SnapshotId.Raw === this.RefreshData.SelectSnapShotId.Raw) {
                        this.Logger.Log('found one');
                        if (this.InputElement) {
                            this.InputElement.value = candidate.Friendly.NickName;
                            break;
                        }
                    }
                }
            }
            else {
                this.Logger.WarningAndContinue(this.DrawCorrectNicknameInUI.name, 'null storage values');
            }
        }
        else {
            this.Logger.Log('No targetId');
        }
        this.Logger.FuncEnd(this.DrawCorrectNicknameInUI.name);
    };
    return InputWithButtonModule;
}(_baseButtonModule_1._base_ButtonModule));
exports.InputWithButtonModule = InputWithButtonModule;
//# sourceMappingURL=InputWithButtonModule.js.map