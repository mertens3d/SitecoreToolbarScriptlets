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
exports.UiCommandsManager = void 0;
var _HindeCoreBase_1 = require("../../../Shared/scripts/_HindeCoreBase");
var UiCommandsManager = /** @class */ (function (_super) {
    __extends(UiCommandsManager, _super);
    function UiCommandsManager(hindeCore, menuCommandParamsBucket, uiVisibilityTestAgent) {
        var _this = _super.call(this, hindeCore) || this;
        _this.UiModules = [];
        //this.Logger.CTORStart(UiCommandsManager.name);
        //this.UiVisibilityTestAgent = uiVisibilityTestAgent;
        //this.MenuCommandParamsBucket = menuCommandParamsBucket;
        _this.Logger.CTOREnd(UiCommandsManager.name);
        return _this;
    }
    UiCommandsManager.prototype.Init_ButtonStateManager = function () {
        //this.UiVisibilityTestAgent = new UiVisibilityTestAgent(this.HindeCore);
        //this.BuildCommandButtons();
    };
    UiCommandsManager.prototype.BuildCommandButtons = function () {
        //if (this.MenuCommandParamsBucket) {
        //  this.MenuCommandParamsBucket.MenuCommandParamsAr.forEach((menuCommandParams: IMenuCommandDefinition) => {
        //    if (menuCommandParams.ModuleKey === ModuleKey.ButtonTypical) {
        //      let typeButtonModule = new TypCommandButtonModule(this.HindeCore, menuCommandParams);
        //      this.UiModules.push(typeButtonModule);
        //    } else if (menuCommandParams.ModuleKey === ModuleKey.ButtonClose) {
        //    }
        //  });
        //} else {
        //  this.ErrorHand.ErrorAndThrow(this.BuildCommandButtons.name, 'no bucket');
        //}
    };
    UiCommandsManager.prototype.HydrateUi_UICommandManager = function (refreshData) {
        //this.UiModules.forEach((uiModule) => uiModule.Hydrate(refreshData));
    };
    UiCommandsManager.prototype.RefreshUiModuleVisibilityStatus = function () {
        //this.Logger.FuncStart(this.RefreshUiModuleVisibilityStatus.name, this.MenuCommandParamsBucket.MenuCommandParamsAr.length);
        ////this.UiModules.forEach((oneButtonModule) => oneButtonModule.RefreshUi_Module());
        //this.Logger.FuncEnd(this.RefreshUiModuleVisibilityStatus.name);
    };
    return UiCommandsManager;
}(_HindeCoreBase_1._HindeCoreBase));
exports.UiCommandsManager = UiCommandsManager;
//# sourceMappingURL=UiCommandsManager.js.map