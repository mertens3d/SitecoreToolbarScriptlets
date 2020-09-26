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
exports.DesktopStartBarProxy = void 0;
var InjectConst_1 = require("../../../../../Shared/scripts/Interfaces/InjectConst");
var FrameHelper_1 = require("../../../Helpers/FrameHelper");
var LoggableBase_1 = require("../../../Managers/LoggableBase");
var DesktopStartBarButtonProxy_1 = require("./DesktopStartBarButtonProxy");
var TreeMutationEvent_Observer_1 = require("../DesktopProxy/Events/TreeMutationEvent/TreeMutationEvent_Observer");
var DesktopStartBarProxy = /** @class */ (function (_super) {
    __extends(DesktopStartBarProxy, _super);
    function DesktopStartBarProxy(logger, ownerDesktopProxy, settingsAgent) {
        var _this = _super.call(this, logger) || this;
        _this.CeProxies = [];
        _this.SettingsAgent = settingsAgent;
        _this.Logger.InstantiateStart(DesktopStartBarProxy.name);
        _this.OwnerDesktopProxy = ownerDesktopProxy;
        //this.EnrollListenerForActiveNodeChange();
        _this.Logger.InstantiateEnd(DesktopStartBarProxy.name);
        return _this;
    }
    DesktopStartBarProxy.prototype.GetAssociatedDoc = function () {
        return this.OwnerDesktopProxy.GetAssociatedDoc();
    };
    DesktopStartBarProxy.prototype.GetStartBarButtonById = function (targetId) {
        return this.OwnerDesktopProxy.GetAssociatedDoc().ContentDoc.querySelector('[id=' + targetId + ']');
    };
    DesktopStartBarProxy.prototype.GetStartBarElement = function () {
        if (!this.__statBarElem) {
            this.__statBarElem = this.OwnerDesktopProxy.GetAssociatedDoc().ContentDoc.querySelector(InjectConst_1.ContentConst.Const.Selector.SC.Desktop.DtStartBar);
        }
        return this.__statBarElem;
    };
    DesktopStartBarProxy.prototype.GetIframeHelper = function () {
        if (this.__iframeHelper == null) {
            this.__iframeHelper = new FrameHelper_1.FrameHelper(this.Logger);
        }
        return this.__iframeHelper;
    };
    DesktopStartBarProxy.prototype.GetAssociatedStartBarButton = function (iframeElemId) {
        var foundStartBarProxy = new DesktopStartBarButtonProxy_1.DesktopStartBarButtonProxy(this.Logger, iframeElemId, this);
        return foundStartBarProxy;
    };
    DesktopStartBarProxy.prototype.OnContentEditorProxyAdded = function (frameProxyMutated_Payload) {
        this.Logger.FuncStart(this.OnContentEditorProxyAdded.name);
        if (frameProxyMutated_Payload) {
            //todo put in new error checking for duplicates
            //if (this.CeProxies.indexOf(frameProxyMutated_Payload.ContentEditorProxyMutationPayload) < 0) {
            //  this.CeProxies.push(frameProxyMutated_Payload.ContentEditorProxyMutationPayload);
            var treeMutationEvent_Observer = new TreeMutationEvent_Observer_1.TreeMutationEvent_Observer(this.Logger, this);
            //todo -replace frameProxyMutated_Payload.ContentEditorProxyMutationPayload.RegisterObserverForTreeMutation(treeMutationEvent_Observer);
            //}
        }
        else {
            this.Logger.ErrorAndThrow(this.OnContentEditorProxyAdded.name, 'Null ceProxy');
        }
        this.Logger.FuncEnd(this.OnContentEditorProxyAdded.name);
    };
    DesktopStartBarProxy.prototype.OnTreeMutationEvent_DesktopStartBarProxy = function (dtframeProxyMutationEvent_Payload) {
        this.Logger.FuncStart(this.OnTreeMutationEvent_DesktopStartBarProxy.name);
        // at this point we have a new active node (or some other change event)
        if (dtframeProxyMutationEvent_Payload) {
            if (dtframeProxyMutationEvent_Payload.ContentEditorProxyMutationPayload && dtframeProxyMutationEvent_Payload.ContentEditorProxyMutationPayload.TreeMutation) {
                var treeMutationEvent_Payload = dtframeProxyMutationEvent_Payload.ContentEditorProxyMutationPayload.TreeMutation;
                var dtframeProxy = dtframeProxyMutationEvent_Payload.DTFrameProxy;
                if (treeMutationEvent_Payload.ActiveNode) {
                    var desktopStartBarButtonProxy = this.GetAssociatedStartBarButton(dtframeProxy.HTMLIframeElement.id);
                    desktopStartBarButtonProxy.Update(desktopStartBarButtonProxy, treeMutationEvent_Payload.ActiveNode);
                }
                //let iframeElement: HTMLIFrameElement = <HTMLIFrameElement>this.OwnerDesktopProxy.GetAssociatedDoc().ContentDoc.getElementById(treeMutationEvent_Payload.AssociatedIframeElemId);
                //if (iframeElement) {
                //  }
                //we need to know what the associated button is
                //we can get that by knowing the id of the CE
                //} else {
                //  this.Logger.ErrorAndContinue(this.OnTreeMutationEvent_DesktopStartBarProxy.name, 'Did not find Frame');
                //}
            }
        }
        else {
            this.Logger.ErrorAndThrow(this.OnTreeMutationEvent_DesktopStartBarProxy.name, 'Null payload');
        }
        this.Logger.FuncEnd(this.OnTreeMutationEvent_DesktopStartBarProxy.name);
    };
    return DesktopStartBarProxy;
}(LoggableBase_1.LoggableBase));
exports.DesktopStartBarProxy = DesktopStartBarProxy;
//# sourceMappingURL=DesktopStartBarProxy.js.map