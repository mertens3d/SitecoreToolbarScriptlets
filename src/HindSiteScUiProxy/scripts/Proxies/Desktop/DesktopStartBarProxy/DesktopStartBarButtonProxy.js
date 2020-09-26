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
exports.DesktopStartBarButtonProxy = void 0;
var LoggableBase_1 = require("../../../Managers/LoggableBase");
var InjectConst_1 = require("../../../../../Shared/scripts/Interfaces/InjectConst");
var StaticHelpers_1 = require("../../../../../Shared/scripts/Classes/StaticHelpers");
var BufferChar_1 = require("../../../../../Shared/scripts/Enums/BufferChar");
var BufferDirection_1 = require("../../../../../Shared/scripts/Enums/BufferDirection");
var DesktopStartBarButtonProxy = /** @class */ (function (_super) {
    __extends(DesktopStartBarButtonProxy, _super);
    function DesktopStartBarButtonProxy(logger, iframeElemId, ownerStartBar) {
        var _this = _super.call(this, logger) || this;
        _this.OwnerStartBar = ownerStartBar;
        _this.StartBarButtonElemId = InjectConst_1.ContentConst.Const.Names.Desktop.StartBarApplicationPrefix + iframeElemId;
        var querySelectBtn = '[id=' + _this.StartBarButtonElemId + ']';
        _this.FoundStartBarButton = _this.OwnerStartBar.GetAssociatedDoc().ContentDoc.querySelector(querySelectBtn);
        return _this;
    }
    DesktopStartBarButtonProxy.prototype.DesignMainIconNode = function (mainIconSrc) {
        var newMainIconNode = document.createElement('img');
        newMainIconNode.width = 16;
        newMainIconNode.height = 16;
        newMainIconNode.src = mainIconSrc;
        newMainIconNode.style.position = 'relative';
        newMainIconNode.style.left = '-8px';
        newMainIconNode.style.top = '-8px';
        newMainIconNode.style.marginRight = '-4px';
        newMainIconNode.style.opacity = '0.5';
        newMainIconNode.border = '0';
        newMainIconNode.classList.add("scContentTreeNodeIcon");
        return newMainIconNode;
    };
    DesktopStartBarButtonProxy.prototype.DesignItemIconNode = function (itemIconSource) {
        var newItemIconNode = document.createElement('img');
        newItemIconNode.width = 16;
        newItemIconNode.height = 16;
        newItemIconNode.src = itemIconSource;
        newItemIconNode.border = '0px';
        newItemIconNode.classList.add("scContentTreeNodeIcon");
        return newItemIconNode;
    };
    DesktopStartBarButtonProxy.prototype.Update = function (targetButton, scContentTreeNodeProxy) {
        this.Logger.FuncStart(this.Update.name);
        this.ScContentTreeNodeProxy = scContentTreeNodeProxy;
        var itemIconSource = scContentTreeNodeProxy.GetIconSrc();
        var mainIconSrc = scContentTreeNodeProxy.GetMainIconSrc();
        var text = StaticHelpers_1.StaticHelpers.BufferString(scContentTreeNodeProxy.GetNodeLinkText(), InjectConst_1.ContentConst.Const.Numbers.Desktop.MaxToolBarNameChars, BufferChar_1.BufferChar.space, BufferDirection_1.BufferDirection.right);
        this.Logger.LogVal('iconSrc', itemIconSource);
        this.Logger.LogVal('mainIconSrc', mainIconSrc);
        if (targetButton && itemIconSource.length > 0) {
            var containerSpanElement = targetButton.FoundStartBarButton.querySelector('div').querySelector('span');
            var newItemIconNode = this.DesignItemIconNode(itemIconSource);
            var newMainIconNode = this.DesignMainIconNode(mainIconSrc);
            containerSpanElement.innerHTML = newMainIconNode.outerHTML + newItemIconNode.outerHTML + text;
        }
        this.Logger.FuncEnd(this.Update.name);
    };
    return DesktopStartBarButtonProxy;
}(LoggableBase_1.LoggableBase));
exports.DesktopStartBarButtonProxy = DesktopStartBarButtonProxy;
//# sourceMappingURL=DesktopStartBarButtonProxy.js.map