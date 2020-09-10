import { IContentConst } from './IContentConst';

/* publish
 *
 * document.body.querySelector('[id='Ribbon0DE95AE441AB4D019EB067441B7C2450_Nav_PublishStrip']').click() -- need to have a node selected
 * document.body.querySelector('[id='B414550BADAF4542C9ADF44BED5FA6CB3E_menu_button']').click() -- 'publish - opens drop down
 * document.body.querySelector('[id*='B414550BADAF4542C9ADF44BED5FA6CB3E_menu_98719A90225A4802A0625D3967E4DD47']').click() -- opens publish item dialog
 * var jq = document.querySelector('[id='jqueryModalDialogsFrame']')
 * var blue = jq.contentDocument.querySelector('[id='scContentIframeId0']')
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
 * document.body.querySelector('[id='Ribbon11111111111111111111111111111111_Nav_PublishStrip']').click()
 * document.body.querySelector('[id='B414550BADAF4542C9ADF44BED5FA6CB3E_menu_button']').click()
 *
 *
 * document.body.querySelector('[id='Ribbon0DE95AE441AB4D019EB067441B7C2450_Nav_PublishStrip']').click() -- need to have a node selected
 *
 * cat.contentDocument.body.querySelector('[id*='B414550BADAF4542C9ADF44BED5FA6CB3E_menu_98719A90225A4802A0625D3967E4DD47']').click()
 * var q = document.querySelector('[id='jqueryModalDialogsFrame']')
 * dialog q.contentDocument.querySelector('[id='scContentIframeId0']')
 * var mouse = q.contentDocument.querySelector('[id='scContentIframeId0']')
 *
 *
 *
 * mouse.contentDocument.querySelector('[id='NextButton']')
 *
 * or maybe just a new window
 * http://perficient9sc.dev.local/sitecore/shell/Applications/Publish.aspx?id=%7BB959B665-AECC-4CFF-AD24-108471725BE0%7D
 * var cat = document.querySelector('[id=NextButton]').click()
 *
 *
 * dialog are you sure you want to proceed
 *
 * var mouse = document.querySelector('[id='jqueryModalDialogsFrame']')
 * var bat = mouse.contentDocument.querySelector('[id='scContentIframeId0']')
 * bat.contentDocument.querySelector('[id='OK']').click();
 * */

//https://sitecore.stackexchange.com/questions/338/what-are-the-ways-to-find-the-sitecore-version-on-sitecore-installations

export class ContentConst {
  static Const: IContentConst = {
    MaxAutoToSaveCount: 10,
    DefaultMaxAutoSaveAgeDays: 7,
    DefaultAutoRenameCeTabButton: false,
    Iterations: {
      MaxSetHrefEffort: 10,
      MaxIterationSwitchBoard: 20,
    },
    Timeouts: {
      PostLoginBtnClick: 1000,
      SetHrefEffortWait: 1000,
      WaitBeforeRemovingCompleteFlagOnContent: 1500,
      AutoSaveIntervalMin: 1,
    },

    ElemId: {
      sc: {
        scLoginPassword: 'Password',
        scLoginUserName: 'UserName',
        SitecoreRootAnchorNodeId: 'Tree_Node_11111111111111111111111111111111',
        SitecoreRootApparentIdRaw: '11111111111111111111111111111111',
        SitecoreRootGlyphId: 'Tree_Glyph_11111111111111111111111111111111',

        scLoginBtn: {
          sc920: 'LogInBtn',
          sc820: null
        },
      }
    },

    ClassNames: {
      SC: {
        ContentTreeNode: 'scContentTreeNode',
        scContentTreeNodeActive: 'scContentTreeNodeActive',
      }
    },
    Selector: {
      SC: {
        ContentEditor: {
          ContentTreeNodeGlyph: '.scContentTreeNodeGlyph',
          scContentTreeNodeIcon: '.scContentTreeNodeIcon',
        },
        IdStartsWithTreeNode: '[id^=Tree_Node_]',
        IframeContent: {
          sc820: null,
          sc920: 'iframe[src*=Content]'
        },

        JqueryModalDialogsFrame: '[id=jqueryModalDialogsFrame]',
        ContentIframe0: '[id=scContentIframeId0]',
        NextButton: '[id=NextButton]',
        ContentIFrame1: '[id=scContentIframeId1]',
        Ok: '[id=OK]',
        Cancel: '[id=CancelButton]',
        MenuButtonPublish: '[id=B414550BADAF4542C9ADF44BED5FA6CB3E_menu_button]',
        MenuDropDownPublishItem: '[id=B414550BADAF4542C9ADF44BED5FA6CB3E_menu_98719A90225A4802A0625D3967E4DD47]',
        NavPublishStrip: '[id*=_Nav_PublishStrip]',
        StartMenuLeftOption: '.scStartMenuLeftOption',
        Publish: {
          TheItemHasBeenPublished: '[id=LastPage]:not([style*=\'display:none\'])',
          SettingsHidden: '[id=Settings][style*=\'display: none\']',
          PublishingHidden: '[id=Publishing][style*=\'display: none\']',
        },
        LoginBtn: {
          sc920: null,
          sc820: 'input.btn',
        },
        scStartButton: {
          sc920: '[id=StartButton]',
          sc820: '[id=startButton]'
        },
        Desktop: {
          DtStartBar: '[id=Startbar]',
          ContentTreeHolder: '[id=ContentTreeHolder]',
        },
      },
    },

    Storage: {
      SettingsSuffix: '.Settings',
      ShowDebugData: false,
      SnapShotPrefix: 'WindowSnapShot.',
      WindowRoot: 'HindSite.',
    },
    Numbers: {
      Desktop: {
        MaxToolBarNameChars: 13
      }
    },
    MaxIter: 100,
    MaxNullOrUndefinedIter: 100,

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
      Desktop: {
        StartBarApplicationPrefix: 'startbar_application_',
      },
      PopUp: 'PopUp',
      PopUpStyles: 'PopUpStyles',
      TreeMenuExpandedPng: 'treemenu_expanded.png',
      TreeMenuCollapsedPng: 'treemenu_collapsed.png',
      scDefaultAdminPassword: 'b',
      scDefaultAdminUserName: 'admin',
    }
  }
}