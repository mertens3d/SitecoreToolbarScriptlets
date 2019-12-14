console.log('InjectConst loaded');

//https://sitecore.stackexchange.com/questions/338/what-are-the-ways-to-find-the-sitecore-version-on-sitecore-installations

class InjectConst {
  static const: IConst = {
    Numbers: {
      ShortGuidLength: 4,
    },
    Iterations: {
      MaxIterationLookingForNode: 10,
      MaxIterationPageLoad: 10,
      MaxIterationRedButton: 10,
      MaxSetHrefEffort: 10,
      MaxIterationSwitchBoard: 20,
    },
    Timeouts: {
      TimeoutChangeLocation: 1000,
      TimeoutTriggerRedButton: 1500,
      TimeoutWaitForNodeToLoad: 500,
      WaitFogPageLoad: 1000,
      PostLoginBtnClick: 1000,
      SetHrefEffortWait: 1000,
      IterationHelperInitial: 100,
    },
    ElemId: {
      Hs: {
        btnClearDebugTextArea: 'btnClearDebugTextArea',
      },
      BtnEdit: 'btnEdit',
      BtnRestoreWindowState: 'btnRestoreWindowState',
      BtnSaveWindowState: 'btnSaveWindowState',
      InputNickname: 'inputNickname',
      hsBtnBigRed: 'btnBigRed',

      SelStateSnapShot: 'selState',
      textAreaFeedback: 'ta-feedback',
      btnUpdateNicknameB: 'btnUpdateNickname',
      btnToggleFavoriteB: 'btnToggleFavorite',
      HindSiteParentInfo: 'spanParentInfo',

      sc: {
        scLoginUserName: 'UserName',
        scLoginPassword: 'Password',
        SitecoreRootNodeId: 'Tree_Node_11111111111111111111111111111111',
        SitecoreRootGlyphId: 'Tree_Glyph_11111111111111111111111111111111',

        scLoginBtn: {
          sc920: 'LogInBtn',
          sc820: null
        },

        scStartButton: {
          sc920: 'StartButton',
          sc820: 'startButton'
        },
      }
    },

    ClassNames: {
      ContentTreeNode: 'scContentTreeNode',
    },

    Url: {
      Desktop: '/sitecore/shell/default.aspx',
      Login: '/sitecore/login',
      ContentEditor: '/sitecore/shell/Applications/Content%20Editor.aspx',
      LaunchPad: '/client/applications/launchpad',
    },

    Selector: {
      ContentTreeNodeGlyph: '.scContentTreeNodeGlyph',
      IframeContent: 'iframe[src*=content]',
      sc: {
        StartMenuLeftOption: '.scStartMenuLeftOption',
        LoginBtn: {
          sc920: null,
          sc820: 'input.btn',
        },
      },
    },

    Storage: {
      WindowRoot: 'Xyyz.WindowSnapShot.'
    },

    MaxIter: 100,

    GuidEmpty: '00000000-0000-0000-0000-000000000000',

    prop: {
      AllTreeData: 'AllTreeData',
    },

    Names: {
      sc: {
        scTreeExpandedPng: 'treemenu_expanded.png',
      },
      HtmlToInject: 'HtmlToInject',
      StylesToInject: 'StylesToInject',
      TreeMenuExpandedPng: 'treemenu_expanded.png',
      TreeMenuCollapsedPng: 'treemenu_collapsed.png',
      scDefaultAdminPassword: 'b',
      scDefaultAdminUserName: 'admin',
    }
  }
}
//InjectConst.const.ElemId

//module.exports.Const = InjectConst.const;

//this.Xyyz.GuidMan.ParseGuid(