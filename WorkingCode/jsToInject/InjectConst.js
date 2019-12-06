var xyyz = xyyz || {};

xyyz.InjectConst = {
  ClassNames: {
    ContentTreeNode: 'scContentTreeNode',
  },
  Url: {
    Desktop: '/sitecore/shell/default.aspx',
    Login: '/sitecore/login',
    ContentEditor: '/sitecore/shell/Applications/Content%20Editor.aspx',
  },
  Selector: {
    ContentTreeNodeGlyph: '.scContentTreeNodeGlyph',
    RootNodeId: 'Tree_Node_11111111111111111111111111111111'
  },
  Storage: {
    Root: 'xyyz'
  },
  TreeExpandedPng: 'treemenu_expanded.png',
  MaxIter: 100,
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
  }
};