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
exports.UiVisibilityTestAgent = void 0;
var _HindeCoreBase_1 = require("../../../../Shared/scripts/_HindeCoreBase");
var StaticHelpers_1 = require("../../../../Shared/scripts/Classes/StaticHelpers");
var _5000___scWindowType_1 = require("../../../../Shared/scripts/Enums/5000 - scWindowType");
var VisibilityType_1 = require("../../../../Shared/scripts/Enums/VisibilityType");
var IUiVisiblityTestResult_1 = require("../../../../Shared/scripts/Interfaces/Agents/IUiVisiblityTestResult");
var VisiblityTestResult_1 = require("../../../../Shared/scripts/Interfaces/Agents/VisiblityTestResult");
var Guid_1 = require("../../../../Shared/scripts/Helpers/Guid");
var UiVisibilityTestAgent = /** @class */ (function (_super) {
    __extends(UiVisibilityTestAgent, _super);
    function UiVisibilityTestAgent(hindeCore) {
        var _this = _super.call(this, hindeCore) || this;
        _this.SelectedSnapshot = null;
        return _this;
    }
    UiVisibilityTestAgent.prototype.Hydrate = function (stateOfSitecoreWindow, stateOfStorageSnapShots, windowType, selectSnapShotId) {
        this.Logger.FuncStart(this.Hydrate.name);
        this.StateOfSitecoreWindow = stateOfSitecoreWindow;
        this.SelectedSnapshot = selectSnapShotId;
        this.WindowType = windowType;
        this.Logger.FuncEnd(this.Hydrate.name);
    };
    UiVisibilityTestAgent.prototype.VisibilityTestWindowType = function (windowType, currentWindowType) {
        var OneResult = new VisiblityTestResult_1.VisiblityTestResult(this.VisibilityTestWindowType.name);
        OneResult.DidItPass = windowType === currentWindowType;
        if (!OneResult.DidItPass) {
            OneResult.FriendlyFailReason = 'Window types did not match: ' + StaticHelpers_1.StaticHelpers.ScWindowTypeFriendly(windowType) + ' vs ' + StaticHelpers_1.StaticHelpers.ScWindowTypeFriendly(currentWindowType);
        }
        return OneResult;
    };
    UiVisibilityTestAgent.prototype.VisibilityTestSnapShotSelected = function (currSelSnapshot) {
        var OneResult = new VisiblityTestResult_1.VisiblityTestResult(this.VisibilityTestSnapShotSelected.name);
        OneResult.DidItPass = !StaticHelpers_1.StaticHelpers.IsNullOrUndefined(currSelSnapshot) && (Guid_1.Guid.AsBracedGuid(currSelSnapshot) !== Guid_1.Guid.AsBracedGuid(Guid_1.Guid.GetEmptyGuid()));
        if (!OneResult.DidItPass) {
            OneResult.FriendlyFailReason = "No snapshot selected";
        }
        return OneResult;
    };
    UiVisibilityTestAgent.prototype.VisibilityTestSnapShotable = function (stateOfSitecoreWindow) {
        //todo may want to be able take snap shots of other window types
        return this.VisibilityTestDesktopOrContentEditorOrPackageDesigner(stateOfSitecoreWindow) && this.VisibilityTestIfDesktopMinOneConentEditorOpen(stateOfSitecoreWindow);
    };
    UiVisibilityTestAgent.prototype.VisibilityTestIfDesktopMinOneConentEditorOpen = function (stateOfLiveHindSite) {
        this.Logger.FuncStart(this.VisibilityTestIfDesktopMinOneConentEditorOpen.name);
        var visiblityTestResult = new VisiblityTestResult_1.VisiblityTestResult(this.VisibilityTestIfDesktopMinOneConentEditorOpen.name);
        visiblityTestResult.DidItPass = ((stateOfLiveHindSite.Meta.WindowType === _5000___scWindowType_1.ScWindowType.Desktop && stateOfLiveHindSite.StateOfScWindow.StateOf_.StateOfDTArea.ActiveDTFrameIndex > -1)
            ||
                (stateOfLiveHindSite.Meta.WindowType === _5000___scWindowType_1.ScWindowType.ContentEditor));
        if (!visiblityTestResult.DidItPass) {
            visiblityTestResult.FriendlyFailReason = 'Requires an open Content Editor';
        }
        this.Logger.FuncEnd(this.VisibilityTestIfDesktopMinOneConentEditorOpen.name, visiblityTestResult.DidItPass.toString());
        return visiblityTestResult;
    };
    UiVisibilityTestAgent.prototype.VisibilityTestDesktopOrContentEditorOrPackageDesigner = function (stateOfSitecoreWindow) {
        this.Logger.FuncStart(this.VisibilityTestDesktopOrContentEditorOrPackageDesigner.name);
        var visiblityTestResult = new VisiblityTestResult_1.VisiblityTestResult(this.VisibilityTestDesktopOrContentEditorOrPackageDesigner.name);
        if (this.StateOfSitecoreWindow) {
            visiblityTestResult.DidItPass = (stateOfSitecoreWindow.Meta.WindowType === _5000___scWindowType_1.ScWindowType.ContentEditor
                || stateOfSitecoreWindow.Meta.WindowType === _5000___scWindowType_1.ScWindowType.Desktop
                || stateOfSitecoreWindow.Meta.WindowType === _5000___scWindowType_1.ScWindowType.PackageDesigner);
            if (!visiblityTestResult.DidItPass) {
                visiblityTestResult.FriendlyFailReason = 'Requires Content Editor or Desktop';
            }
        }
        else {
            this.ErrorHand.ErrorAndThrow(this.VisibilityTestDesktopOrContentEditorOrPackageDesigner.name, 'null state');
        }
        this.Logger.FuncEnd(this.VisibilityTestDesktopOrContentEditorOrPackageDesigner.name);
        return visiblityTestResult;
    };
    UiVisibilityTestAgent.prototype.TestAgainstOneControl = function (oneControl) {
        this.Logger.FuncStart(this.TestAgainstOneControl.name, VisibilityType_1.VisibilityType[oneControl]);
        var toReturn = null;
        switch (oneControl) {
            case VisibilityType_1.VisibilityType.Desktop:
                toReturn = this.VisibilityTestWindowType(_5000___scWindowType_1.ScWindowType.Desktop, this.WindowType);
                break;
            case VisibilityType_1.VisibilityType.DesktopOrContentEditor:
                toReturn = this.VisibilityTestDesktopOrContentEditorOrPackageDesigner(this.StateOfSitecoreWindow);
                break;
            case VisibilityType_1.VisibilityType.IfDesktopMin1ContentEditor:
                toReturn = this.VisibilityTestIfDesktopMinOneConentEditorOpen(this.StateOfSitecoreWindow);
                break;
            case VisibilityType_1.VisibilityType.ContentEditor:
                toReturn = this.VisibilityTestWindowType(_5000___scWindowType_1.ScWindowType.ContentEditor, this.WindowType);
                break;
            case VisibilityType_1.VisibilityType.Edit:
                toReturn = this.VisibilityTestWindowType(_5000___scWindowType_1.ScWindowType.Edit, this.WindowType);
                break;
            case VisibilityType_1.VisibilityType.Launchpad:
                toReturn = this.VisibilityTestWindowType(_5000___scWindowType_1.ScWindowType.Launchpad, this.WindowType);
                break;
            case VisibilityType_1.VisibilityType.LoginPage:
                toReturn = this.VisibilityTestWindowType(_5000___scWindowType_1.ScWindowType.LoginPage, this.WindowType);
                break;
            case VisibilityType_1.VisibilityType.Normal:
                toReturn = this.VisibilityTestWindowType(_5000___scWindowType_1.ScWindowType.Normal, this.WindowType);
                break;
            case VisibilityType_1.VisibilityType.Preview:
                toReturn = this.VisibilityTestWindowType(_5000___scWindowType_1.ScWindowType.Preview, this.WindowType);
                break;
            case VisibilityType_1.VisibilityType.SnapShotable:
                toReturn = this.VisibilityTestSnapShotable(this.StateOfSitecoreWindow);
                break;
            case VisibilityType_1.VisibilityType.SnapShotSelected:
                toReturn = this.VisibilityTestSnapShotSelected(this.SelectedSnapshot);
                break;
            case VisibilityType_1.VisibilityType.NotLogin:
                toReturn = this.VisibilityTestWindowType(_5000___scWindowType_1.ScWindowType.LoginPage, this.WindowType);
                break;
            case VisibilityType_1.VisibilityType.Always:
                toReturn = new VisiblityTestResult_1.VisiblityTestResult('Always visible');
                toReturn.DidItPass = true;
                break;
            case VisibilityType_1.VisibilityType.CommandIsRunning:
                //todo toReturnAgraget.TestResults.push( false; //todo
                break;
            case VisibilityType_1.VisibilityType.DISABLED:
                toReturn = {
                    DidItPass: false,
                    FriendlyFailReason: 'Disabled/ Not working yet',
                    TestNameFriendly: 'Disabler',
                };
                break;
            case VisibilityType_1.VisibilityType.Unknown:
                this.ErrorHand.ErrorAndThrow(this.TestAgainstAllSetControllers.name, 'unknown visibility type');
                break;
            default:
                this.ErrorHand.ErrorAndThrow(this.TestAgainstAllSetControllers.name, 'unknown visibility type');
                break;
        }
        if (!toReturn) {
            this.ErrorHand.ErrorAndThrow(this.TestAgainstOneControl.name, 'null test result');
        }
        this.Logger.FuncEnd(this.TestAgainstOneControl.name, toReturn.DidItPass.toString());
        return toReturn;
    };
    UiVisibilityTestAgent.prototype.TestAgainstAllSetControllers = function (Command) {
        this.Logger.FuncStart(this.TestAgainstAllSetControllers.name, Command.VisibilityControllers.length);
        var allResults = new IUiVisiblityTestResult_1.VisiblityTestResultsBucket(this.HindeCore);
        if (this.StateOfSitecoreWindow) {
            if (Command.VisibilityControllers.length > 0) {
                for (var jdx = 0; jdx < Command.VisibilityControllers.length; jdx++) {
                    var oneControl = Command.VisibilityControllers[jdx];
                    var thisresult = this.TestAgainstOneControl(oneControl);
                    allResults.TestResults.push(thisresult);
                    if (!thisresult || allResults.HasFailures()) {
                        break;
                    }
                }
            }
        }
        else {
            this.ErrorHand.ErrorAndThrow(this.TestAgainstAllSetControllers.name, 'null stateOfSitecoreWindow');
        }
        this.Logger.FuncEnd(this.TestAgainstAllSetControllers.name, allResults.HasFailures().toString());
        return allResults;
    };
    return UiVisibilityTestAgent;
}(_HindeCoreBase_1._HindeCoreBase));
exports.UiVisibilityTestAgent = UiVisibilityTestAgent;
//# sourceMappingURL=UiVisibilityTestAgent.js.map