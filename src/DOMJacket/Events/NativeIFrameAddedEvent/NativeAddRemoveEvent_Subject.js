"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.NativeAddRemoveEvent_Subject = void 0;
var _70___TypeDiscriminator_1 = require("../../../Shared/scripts/Enums/70 - TypeDiscriminator");
var HindeSiteEvent_Subject_1 = require("../../../Shared/scripts/Events/_HindSiteEvent/HindeSiteEvent_Subject");
var SharedConst_1 = require("../../../Shared/scripts/SharedConst");
var GenericElemJacket_1 = require("../../Elements/GenericElemJacket");
var NativeAddRemoveEvent_Subject = /** @class */ (function (_super) {
    __extends(NativeAddRemoveEvent_Subject, _super);
    function NativeAddRemoveEvent_Subject(commonCore, elemJacket, watcherParams) {
        var _this = _super.call(this, commonCore) || this;
        _this.TypeDiscriminator = _70___TypeDiscriminator_1.TypeDiscriminator.FrameJacketAddRemoveEvent_Subject;
        _this.ShowLogActions = true;
        _this.Logger.CTORStart(NativeAddRemoveEvent_Subject.name);
        if (!elemJacket) {
            _this.ErrorHand.HandleFatalError(NativeAddRemoveEvent_Subject.name, 'No target doc');
        }
        _this.ContainerElemJacket = elemJacket;
        _this.WatcherParams = watcherParams;
        _this.InitMutationObserver();
        _this.Logger.CTOREnd(NativeAddRemoveEvent_Subject.name);
        return _this;
    }
    NativeAddRemoveEvent_Subject.prototype.HandleRemovedNodes = function (removedNodes) {
        var removedIframeIds = [];
        removedNodes.forEach(function (removedNode) {
            if (removedNode instanceof HTMLIFrameElement) { //this may not filter correctly
                var htmlIFrameElement = removedNode;
                if (htmlIFrameElement) {
                    removedIframeIds.push(htmlIFrameElement.id);
                }
            }
        });
        return removedIframeIds;
    };
    NativeAddRemoveEvent_Subject.prototype.HandleAddedNodes = function (addedNodes) {
        var _this = this;
        this.Logger.FuncStart([NativeAddRemoveEvent_Subject.name, this.HandleAddedNodes.name], 'for: ' + this.WatcherParams.OwnerFriendly);
        var addedElementJackets = [];
        addedNodes.forEach(function (addedNode) {
            if (addedNode instanceof HTMLElement) {
                var passesFilterTest = true;
                var addedHtmlElement = addedNode;
                if (_this.WatcherParams.TagFilter && _this.WatcherParams.TagFilter.length > 0) {
                    passesFilterTest = (_this.WatcherParams.TagFilter.indexOf(addedHtmlElement.tagName) > -1);
                }
                if (passesFilterTest && addedHtmlElement.tagName === SharedConst_1.SharedConst.Const.KeyWords.NodeTagName.IFrame) {
                    passesFilterTest = passesFilterTest && addedHtmlElement.contentDocument !== null;
                }
                if (passesFilterTest) {
                    if (addedHtmlElement instanceof HTMLIFrameElement) {
                        addedElementJackets.push(new GenericElemJacket_1.GenericElemJacket(_this.CommonCore, addedHtmlElement));
                    }
                }
            }
        });
        this.Logger.FuncEnd([NativeAddRemoveEvent_Subject.name, this.HandleAddedNodes.name], addedElementJackets.length + '  for: ' + this.WatcherParams.OwnerFriendly);
        return addedElementJackets;
    };
    NativeAddRemoveEvent_Subject.prototype.CallBackOnNativeMutation = function (mutations) {
        var _this = this;
        this.Logger.FuncStart(this.CallBackOnNativeMutation.name);
        if (this.HasObservers()) {
            mutations.forEach(function (mutation, index) {
                _this.Logger.Log('processing mutation ' + (index + 1) + ':' + mutations.length);
                _this.Logger.LogVal('mutation.addedNodes.length ', mutation.addedNodes.length);
                if (mutation.type === 'childList' && (mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0)) {
                    var nativeDomAddRemoveEvent_Payload_1 = {
                        AddedElementJacket: null,
                        RemovedIFrameId: null,
                        OnBehalfOfFriendly: _this.WatcherParams.OwnerFriendly
                    };
                    if (mutation.addedNodes.length > 0) {
                        var addedNodes = _this.HandleAddedNodes(mutation.addedNodes);
                        addedNodes.forEach(function (addedNode) {
                            nativeDomAddRemoveEvent_Payload_1.AddedElementJacket = addedNode;
                            nativeDomAddRemoveEvent_Payload_1.RemovedIFrameId = null;
                            _this.NotifyObserversAsync(nativeDomAddRemoveEvent_Payload_1);
                        });
                    }
                    if (mutation.removedNodes.length > 0) {
                        var removedNodeIds = _this.HandleRemovedNodes(mutation.removedNodes);
                        removedNodeIds.forEach(function (removedNodeId) {
                            nativeDomAddRemoveEvent_Payload_1.AddedElementJacket = null;
                            nativeDomAddRemoveEvent_Payload_1.RemovedIFrameId = removedNodeId;
                            _this.Logger.LogAsJsonPretty('removed', nativeDomAddRemoveEvent_Payload_1);
                            _this.NotifyObserversAsync(nativeDomAddRemoveEvent_Payload_1);
                        });
                    }
                }
            });
        }
        else {
            this.Logger.Log('No observers');
        }
        this.Logger.FuncEnd(this.CallBackOnNativeMutation.name);
    };
    NativeAddRemoveEvent_Subject.prototype.InitMutationObserver = function () {
        this.Logger.FuncStart(this.InitMutationObserver.name);
        try {
            if (this.ContainerElemJacket) {
                var self_1 = this;
                var mutationObserver = new MutationObserver(function (mutations) { self_1.CallBackOnNativeMutation(mutations); });
                //let desktop: HTMLElement = <HTMLElement> this.NativeDocument.getElementsByTagName(SharedConst.Const.KeyWords.Html.Tags.Body)[0];
                //let desktopElemJacket: ElementJacket = this.DocumentJacket.GetElementById('Desktop');
                this.Logger.LogAsJsonPretty(this.InitMutationObserver.name, this.WatcherParams);
                if (this.WatcherParams) {
                    mutationObserver.observe(this.ContainerElemJacket.NativeElement, { attributes: this.WatcherParams.Attributes, subtree: this.WatcherParams.Subtree, childList: this.WatcherParams.ChildList });
                }
                else {
                    this.ErrorHand.HandleFatalError(this.InitMutationObserver.name, ' no params');
                }
            }
            else {
                this.ErrorHand.HandleFatalError(this.InitMutationObserver.name, 'no container element');
            }
        }
        catch (err) {
            throw (err);
        }
        this.Logger.FuncEnd(this.InitMutationObserver.name);
    };
    return NativeAddRemoveEvent_Subject;
}(HindeSiteEvent_Subject_1.HindeSiteEvent_Subject));
exports.NativeAddRemoveEvent_Subject = NativeAddRemoveEvent_Subject;
//# sourceMappingURL=NativeAddRemoveEvent_Subject.js.map