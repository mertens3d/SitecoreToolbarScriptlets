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
    DefaultShowDebuggingModules: false,
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
      SC: {
        PackageDesigner: {
          StatusText: 'StatusText',
        },
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
        scContentTreeNodeNormal: 'scContentTreeNodeNormal',
      }
    },
    Selector: {
      SC: {
        ContentEditor: {
          ScContentTreeNodeGlyph: '.scContentTreeNodeGlyph',
          ScContentTreeNode: '.scContentTreeNode',
          ScContentTreeContainer: '.scContentTreeContainer',
          scContentTreeNodeIcon: '.scContentTreeNodeIcon',
        },

        ContentTree: {
          BuiltIn: {
            TreeNodeSitecoreRoot: '[id=Tree_Node_11111111111111111111111111111111]',
            MediaLibraryAnchorRootNode: '[id=Tree_Node_3D6658D8A0BF4E75B3E2D050FABCF4E1]',
            MarketingControlPanelRoodNode: '[id=Tree_Node_33CFB9CAF5654D5BB88A7CDFE29A6D71]',
            TemplatesAnchorRootNode: '[id=Tree_Node_3C1715FE6A134FCF845FDE308BA9741D]',
            LayoutRootAnchorNode: '[id=Tree_Node_EB2E4FFD27614653B05226A64D385227]',
            SystemRootAnchorNode: '[id=Tree_Node_13D6D6C6C50B4BBDB3312B04F1A58F21]',
            ContentRootAnchorNode: '[id=Tree_Node_0DE95AE441AB4D019EB067441B7C2450]',
          }
        },
        PackageDesigner: {
          Ribbon: {
            InstallerRibbon_Nav_Package: '[id=InstallerRibbon_Nav_Package]',
            InstallerRibbon_Toolbar: '[id=InstallerRibbon_Toolbar]',
            Open: '[title="Open an existing project"]',
          },
        },

        IdStartsWithTreeNode: '[id^=Tree_Node_]',
        IframeContent: {
          sc820: null,
          sc920: 'iframe[src*=Content], iframe[src*=MediaShop]'
        },
        Frames: {
          ScContentIframeId0: {
            Cancel: '[id=Cancel]',
            Filename: '[id=Filename]',
            Id: '[id=scContentIframeId0]',
            Ok: '[id=OK]',
          },
          AppFrame: {
            Id: '[id=AppFrame]',
          },
          JqueryModalDialogsFrame: {
            Id: '[id=jqueryModalDialogsFrame]',
          },
          scContentIframeId1: {
            Id: '[id=scContentIframeId1]',
          }
        },
        NextButton: '[id=NextButton]',
        Ok: '[id=OK]',
        Cancel: '[id=CancelButton]',
        MenuButtonPublish: '[id=B414550BADAF4542C9ADF44BED5FA6CB3E_menu_button]',
        Popup1: {
          DevelopmentTools: '[src="/temp/iconcache/apps/24x24/magic-cube.png"]',
          MediaLibrary: 'img[src$="pictures.png"]', ///temp/iconcache/apps/32x32/pictures.png
          RecycleBin: 'img[src$="refresh.png"]',
          StartMenuLeftOption: 'img[src$="pencil.png"]',
          TemplateManager: 'img[src$="newspaper.png"]',
          SecurityTools: 'img[src$="lock-2.png"]',
          ReportingTools: 'img[src$="scripts.png"]',
          
        },
        Popup2: {
          AccessViewer: 'img[src$="lock.png"]',
          Archive: 'img[src$=".png"]',
          DomainManager: 'img[src$="routes.png"]',
          InstallationWizard: 'img[src$="install_wizard.png"]',
          KeyboardMap: 'img[src$="keyboardmap.png"]',
          LogViewer: 'img[src$="logviewer.png"]',
          MarketingControlPanel: 'img[src$="object.png"]',
          PackageDesigner: '[id=MenuItem211048689]',
          PackageDesignerButton: 'img[src$="packager.png"]',
          RoleManager: 'img[src$="account.png"]',
          Run: 'img[src$="run.png"]',
          ScanForBrokenLinks: 'img[src$="link_broken.png"]',
          SecurityEditor: 'img[src$="shield.png"]',
          UserManager: 'img[src$="user (1).png"]',
          Workbox: 'img[src$="workbox.png"]',
          System: 'img[src$="blank.gif"]:nth-child(1)', // this is not going to work since there are two
          Security: 'img[src$="blank.gif"]:nth-child(2)', // second blank this is not going to work since there are two
        },
        Popup3: {

          InstalledLicenses: 'img[src$="certificate.png"]',
          LicenseDetails: 'img[src$="informations.png"]',
        },
        Publish: {
          MenuDropDownPublishItem: '[id=B414550BADAF4542C9ADF44BED5FA6CB3E_menu_98719A90225A4802A0625D3967E4DD47]',
          NavPublishStrip: '[id*=_Nav_PublishStrip]',
          TheItemHasBeenPublished: '[id=LastPage]:not([style*=\'display:none\'])',
          SettingsHidden: '[id=Settings][style*=\'display: none\']',
          PublishingHidden: '[id=Publishing][style*=\'display: none\']',
        },
        LoginBtn: {
          sc920: null,
          sc820: 'input.btn',
        },
        scStartButtonVSpec: {
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
      SnapShotPrefix: 'ScSnapShot.',
      WindowRoot: 'HindSite.',
      SessionKey: 'HindSite.SessionKey',
    },
    Numbers: {
      Desktop: {
        MaxToolBarNameChars: 13,
        TimeNewCEWaitForScOverlayToClearMs: 1500, //500, 300 - not long enough
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
      PopUpUi: 'PopUpUi',
      PopUpUiStyles: 'PopUpUiStyles',
      TreeMenuExpandedPng: 'treemenu_expanded.png',
      TreeMenuCollapsedPng: 'treemenu_collapsed.png',
      scDefaultAdminPassword: 'b',
      scDefaultAdminUserName: 'admin',
    }
  }
}