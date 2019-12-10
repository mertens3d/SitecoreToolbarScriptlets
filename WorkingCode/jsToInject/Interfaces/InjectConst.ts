console.log('InjectConst loaded');

//https://sitecore.stackexchange.com/questions/338/what-are-the-ways-to-find-the-sitecore-version-on-sitecore-installations

class InjectConst {
  static const: IConst = {
    ElemId: {
      BtnEdit: 'btnEdit',
      BtnRestoreWindowState: 'btnRestoreWindowState',
      BtnSaveWindowState: 'btnSaveWindowState',
      InputNickname: 'inputNickname',
      LoginBtn: 'LogInBtn',
      SelStateSnapShot: 'selState',
      textAreaFeedback: 'ta-feedback',
      SitecoreRootNodeId: 'Tree_Node_11111111111111111111111111111111',
      SitecoreRootGlyphId: 'Tree_Glyph_11111111111111111111111111111111',
      btnUpdateNicknameB: 'btnUpdateNickname',
      btnToggleFavoriteB: 'btnToggleFavorite',
      scLoginPassword: 'Password',
      scLoginUserName: 'UserName',
      StartButton: {
        sc920: 'StartButton',
        sc820: 'startButton'
      }
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
      InputBtn2: 'input.btn',
      IframeContent: 'iframe[src*=content]'
    },

    Storage: {
      WindowRoot: 'Xyyz.WindowSnapShot.'
    },
    TreeExpandedPng: 'treemenu_expanded.png',

    MaxIter: 100,
    TimeoutWaitForNodeToLoad: 200,
    GuidEmpty: '00000000-0000-0000-0000-000000000000',

    prop: {
      AllTreeData: 'AllTreeData',
    },

    Names: {
      HtmlToInject: 'HtmlToInject',
      StylesToInject: 'StylesToInject',
      TreeMenuExpandedPng: 'treemenu_expanded.png',
      TreeMenuCollapsedPng: 'treemenu_collapsed.png',
    }
  }
}
//InjectConst.const.ElemId

//module.exports.Const = InjectConst.const;

//this.Xyyz.GuidMan.ParseGuid(