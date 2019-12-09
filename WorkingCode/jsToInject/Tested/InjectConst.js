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
console.log('InjectConst loaded');
var InjectConst = /** @class */ (function (_super) {
    __extends(InjectConst, _super);
    function InjectConst(xyyz) {
        var _this = _super.call(this, xyyz) || this;
        _this.ElemId = {
            textAreaFeedback: 'ta-feedback',
        };
        _this.ClassNames = {
            ContentTreeNode: 'scContentTreeNode',
        };
        _this.Url = {
            Desktop: '/sitecore/shell/default.aspx',
            Login: '/sitecore/login',
            ContentEditor: '/sitecore/shell/Applications/Content%20Editor.aspx',
            LaunchPad: '/sitecore/shell/sitecore/client/applications/launchpad',
        };
        _this.Selector = {
            ContentTreeNodeGlyph: '.scContentTreeNodeGlyph',
            RootNodeId: 'Tree_Node_11111111111111111111111111111111'
        };
        _this.Storage = {
            WindowRoot: 'Xyyz.WindowSnapShot.'
        };
        _this.TreeExpandedPng = 'treemenu_expanded.png';
        _this.MaxIter = 100;
        _this.GuidEmpty = '00000000-0000-0000-0000-000000000000';
        _this.prop = {
            AllTreeData: 'AllTreeData',
        };
        _this.Names = {
            HtmlToInject: 'HtmlToInject',
            StylesToInject: 'StylesToInject'
        };
        xyyz.debug.FuncStart(InjectConst.name);
        xyyz.debug.FuncEnd(InjectConst.name);
        return _this;
    }
    return InjectConst;
}(SpokeBase));
//# sourceMappingURL=InjectConst.js.map