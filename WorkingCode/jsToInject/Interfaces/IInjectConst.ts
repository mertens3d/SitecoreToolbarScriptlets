console.log('InjectConst loaded');
interface InjectConst {
  ElemId: {
    textAreaFeedback: string
  },
  ClassNames: {
    ContentTreeNode: string,
  },
  Url: {
    Desktop: string,
    Login: string,
    ContentEditor: string,
    LaunchPad: string,
  },
  Selector: {
    ContentTreeNodeGlyph: string,
    RootNodeId: string
  },
  Storage: {
    WindowRoot: string
  },
  TreeExpandedPng: string,

  MaxIter: number,

  GuidEmpty : IGuid,
  prop: {
    AllTreeData: string,
  },
  Names: {
    HtmlToInject: string,
    StylesToInject: string
  }
}
