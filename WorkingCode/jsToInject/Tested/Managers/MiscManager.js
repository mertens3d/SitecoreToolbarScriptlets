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
var MiscManager = /** @class */ (function (_super) {
    __extends(MiscManager, _super);
    function MiscManager(xyyz) {
        return _super.call(this, xyyz) || this;
    }
    MiscManager.prototype.FillConst = function () {
        this.Xyyz.InjectConst = {
            ElemId: {
                textAreaFeedback: 'ta-feedback',
            },
            ClassNames: {
                ContentTreeNode: 'scContentTreeNode',
            },
            Url: {
                Desktop: '/sitecore/shell/default.aspx',
                Login: '/sitecore/login',
                ContentEditor: '/sitecore/shell/Applications/Content%20Editor.aspx',
                LaunchPad: '/sitecore/shell/sitecore/client/applications/launchpad',
            },
            Selector: {
                ContentTreeNodeGlyph: '.scContentTreeNodeGlyph',
                RootNodeId: 'Tree_Node_11111111111111111111111111111111'
            },
            Storage: {
                WindowRoot: 'Xyyz.WindowSnapShot.'
            },
            TreeExpandedPng: 'treemenu_expanded.png',
            MaxIter: 100,
            GuidEmpty: this.Xyyz.GuidMan.ParseGuid('00000000-0000-0000-0000-000000000000'),
            prop: {
                AllTreeData: 'AllTreeData',
            },
            Names: {
                HtmlToInject: 'HtmlToInject',
                StylesToInject: 'StylesToInject'
            }
        };
    };
    return MiscManager;
}(ManagerBase));
//# sourceMappingURL=MiscManager.js.map