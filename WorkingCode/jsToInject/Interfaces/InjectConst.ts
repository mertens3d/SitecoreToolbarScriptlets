console.log('InjectConst loaded');

/* publish
 *
 * document.body.querySelector("[id='Ribbon0DE95AE441AB4D019EB067441B7C2450_Nav_PublishStrip']").click() -- need to have a node selected
 * document.body.querySelector("[id='B414550BADAF4542C9ADF44BED5FA6CB3E_menu_button']").click() -- 'publish - opens drop down
 * document.body.querySelector("[id*='B414550BADAF4542C9ADF44BED5FA6CB3E_menu_98719A90225A4802A0625D3967E4DD47']").click() -- opens publish item dialog
 * var jq = document.querySelector("[id='jqueryModalDialogsFrame']")
 * var blue = jq.contentDocument.querySelector("[id='scContentIframeId0']")
 * blue.contentDocument.querySelector('[id=NextButton]').click()
 * var red = jq.contentDocument.querySelector('[id=scContentIframeId1]')
 * red.contentDocument.querySelector('[id=OK]').click() - starts publishing
 * blue.contentDocument.querySelector('[id=CancelButton]').click() - close final dialog
 *
 *
 *
 * var cat = document.getElementById('FRAME84781366')
 *
 * inside CE
 * document.body.querySelector("[id='Ribbon11111111111111111111111111111111_Nav_PublishStrip']").click()
 * document.body.querySelector("[id='B414550BADAF4542C9ADF44BED5FA6CB3E_menu_button']").click()
 *
 *
 * document.body.querySelector("[id='Ribbon0DE95AE441AB4D019EB067441B7C2450_Nav_PublishStrip']").click() -- need to have a node selected
 *
 * cat.contentDocument.body.querySelector("[id*='B414550BADAF4542C9ADF44BED5FA6CB3E_menu_98719A90225A4802A0625D3967E4DD47']").click()
 * var q = document.querySelector("[id='jqueryModalDialogsFrame']")
 * dialog q.contentDocument.querySelector("[id='scContentIframeId0']")
 * var mouse = q.contentDocument.querySelector("[id='scContentIframeId0']")
 *
 *
 *
 * mouse.contentDocument.querySelector('[id="NextButton"]')
 *
 * or maybe just a new window
 * http://perficient9sc.dev.local/sitecore/shell/Applications/Publish.aspx?id=%7BB959B665-AECC-4CFF-AD24-108471725BE0%7D
 * var cat = document.querySelector('[id=NextButton]').click()
 *
 *
 * dialog are you sure you want to proceed
 *
 * var mouse = document.querySelector("[id='jqueryModalDialogsFrame']")
 * var bat = mouse.contentDocument.querySelector('[id="scContentIframeId0"]')
 * bat.contentDocument.querySelector('[id="OK"]').click();
 * */

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
      SC: {
        scContentTreeNodeActive: 'scContentTreeNodeActive',
      }
    },

    Url: {
      Desktop: '/sitecore/shell/default.aspx',
      Login: '/sitecore/login',
      ContentEditor: /Content.*?Editor/ig,
      LaunchPad: '/client/applications/launchpad',
    },

    Selector: {
      IframeContent: 'iframe[src*=content]',
      SC: {
        ContentTreeNodeGlyph: '.scContentTreeNodeGlyph',
        StartMenuLeftOption: '.scStartMenuLeftOption',
        IdStartsWithTreeNode: '[id^=Tree_Node_]',
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
      SC: {
        TreeGlyphPrefix: 'Tree_Glyph_',
        TreeNodePrefix: 'Tree_Node_',
        TreeExpandedPng: {
          sc920: 'treemenu_expanded.png',
          sc820: 'todo'
        }
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