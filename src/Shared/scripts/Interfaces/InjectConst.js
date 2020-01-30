"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var scMode_1 = require("../Enums/scMode");
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
var InjectConst = /** @class */ (function () {
    function InjectConst() {
    }
    InjectConst.ContConst = {
        Iterations: {
            MaxSetHrefEffort: 10,
            MaxIterationSwitchBoard: 20,
        },
        Timeouts: {
            PostLoginBtnClick: 1000,
            SetHrefEffortWait: 1000,
            WaitBeforeRemovingCompleteFlagOnContent: 1500
        },
        IterHelper: {
            GrowthPerIteration: 0.5,
            MaxCount: {
                Default: 10,
                OverridePublishing: 15,
            },
            Timeouts: {
                Max: 10000,
                Default: 100,
            },
        },
        ElemId: {
            sc: {
                scLoginUserName: 'UserName',
                scLoginPassword: 'Password',
                SitecoreRootNodeId: 'Tree_Node_11111111111111111111111111111111',
                SitecoreRootGlyphId: 'Tree_Glyph_11111111111111111111111111111111',
                scLoginBtn: {
                    sc920: 'LogInBtn',
                    sc820: null
                },
            }
        },
        ClassNames: {
            ContentTreeNode: 'scContentTreeNode',
            SC: {
                scContentTreeNodeActive: 'scContentTreeNodeActive',
            }
        },
        UrlSuffix: {
            Desktop: '/sitecore/shell/default.aspx',
            Login: '/sitecore/login',
            LaunchPad: '/client/applications/launchpad',
            CE: '/sitecore/shell/Applications/Content Editor.aspx?sc_bw=1',
            None: '/',
        },
        Regex: {
            ContentEditor: /Content.*?Editor/ig,
        },
        ScMode: {
            edit: { asEnum: scMode_1.scMode.Edit, asString: 'edit' },
            normal: { asEnum: scMode_1.scMode.Normal, asString: 'normal' },
            preview: { asEnum: scMode_1.scMode.Preview, asString: 'preview' },
        },
        Selector: {
            SC: {
                ContentTreeNodeGlyph: '.scContentTreeNodeGlyph',
                IdStartsWithTreeNode: '[id^=Tree_Node_]',
                IframeContent: 'iframe[src*=content]',
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
            },
        },
        Storage: {
            SettingsSuffix: '.Settings',
            ShowDebugData: false,
            SnapShotPrefix: '.WindowSnapShot.',
            WindowRoot: 'Xyyz',
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
            PopUp: 'PopUp',
            PopUpStyles: 'PopUpStyles',
            TreeMenuExpandedPng: 'treemenu_expanded.png',
            TreeMenuCollapsedPng: 'treemenu_collapsed.png',
            scDefaultAdminPassword: 'b',
            scDefaultAdminUserName: 'admin',
        }
    };
    return InjectConst;
}());
exports.InjectConst = InjectConst;
//InjectConst.const.ElemId
//module.exports.Const = InjectConst.const;
//this.Xyyz.GuidMan.ParseGuid(
//# sourceMappingURL=InjectConst.js.map