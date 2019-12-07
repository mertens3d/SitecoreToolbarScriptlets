var xyyz = xyyz || {};

xyyz.InjectConst = {
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
    WindowRoot: 'xyyz.'
  },
  TreeExpandedPng: 'treemenu_expanded.png',
  MaxIter: 100,
  GuidEmpty: '00000000-0000-0000-0000-000000000000',
  prop: {
    AllTreeData: 'AllTreeData',
  },
  Names: {
    HtmlToInject: 'HtmlToInject',
    StylesToInject: 'StylesToInject'
  },
  PageType: {
    Unknown: 0,
    LoginPage: 1,
    Desktop: 2,
    ContentEditor: 3,
    Launchpad: 4,
  }
};