console.log('InjectConst loaded');

class InjectConst extends SpokeBase {
  constructor(xyyz: Hub) {
    super(xyyz);
    xyyz.debug.FuncStart(InjectConst.name);
    xyyz.debug.FuncEnd(InjectConst.name);
  }
  ClassNames = {
    ContentTreeNode: 'scContentTreeNode',
  }

  Url = {
    Desktop: '/sitecore/shell/default.aspx',
    Login: '/sitecore/login',
    ContentEditor: '/sitecore/shell/Applications/Content%20Editor.aspx',
    LaunchPad: '/sitecore/shell/sitecore/client/applications/launchpad',
  }

  Selector = {
    ContentTreeNodeGlyph: '.scContentTreeNodeGlyph',
    RootNodeId: 'Tree_Node_11111111111111111111111111111111'
  }

  Storage = {
    WindowRoot: '  this.Xyyz.'
  }
  TreeExpandedPng = 'treemenu_expanded.png'

  MaxIter = 100;

  GuidEmpty = '00000000-0000-0000-0000-000000000000';

  prop = {
    AllTreeData: 'AllTreeData',
  }

  Names = {
    HtmlToInject: 'HtmlToInject',
    StylesToInject: 'StylesToInject'
  }
}