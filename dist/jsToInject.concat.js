console.log('_ManagerBase loaded');
class ManagerBase {
    constructor(xyyz) {
        this.Xyyz = xyyz;
    }
    OpenerDoc() {
        return this.Xyyz.PageData.WinData.Opener.Document;
    }
}
exports = ManagerBase;

console.log('InjectConst loaded');




console.log('InjectConst loaded');
class InjectConst {
}
InjectConst.const = {
    ElemId: {
        BtnEdit: 'btnEdit',
        BtnRestoreWindowState: 'btnRestoreWindowState',
        BtnSaveWindowState: 'btnSaveWindowState',
        LoginBtn: 'LogInBtn',
        SelStateSnapShot: 'selState',
        textAreaFeedback: 'ta-feedback',
        SitecoreRootNodeId: 'Tree_Node_11111111111111111111111111111111',
        SitecoreRootGlyphId: 'Tree_Glyph_11111111111111111111111111111111',
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
};


console.log('_first loaded');

class Debug {
    constructor(parentWindow) {
        console.log('debug');
        this.__indentCount = 0;
        this.ParentWindow = parentWindow;
    }
    __getTextArea() {
        return document.getElementById('ta-debug');
    }
    ClearTextArea() {
        var ta = this.__getTextArea();
        if (ta) {
            ta.value = '';
        }
        else {
            this.Error(Debug.name, 'No text area found');
        }
    }
    Log(text) {
        var indent = '  ';
        for (var idx = 0; idx < this.__indentCount; idx++) {
            text = indent + text;
        }
        console.log(text);
        var ta = this.__getTextArea();
        if (ta) {
            ta.value += text + '\\n';
            ta.scrollTop = ta.scrollHeight;
        }
        if (this.ParentWindow) {
            this.ParentWindow.console.log(text);
        }
    }
    FuncStartFunc(func) {
        this.FuncStartName(func.name);
    }
    FuncStartName(text) {
        text = 's) ' + text;
        this.Log(text);
        this.__indentCount++;
    }
    FuncEndName(text) {
        text = 'e) ' + text;
        this.__indentCount--;
        this.Log(text);
    }
    Error(container, text) {
        if (!container) {
            container = 'unknown';
        }
        if (!text) {
            text = 'unknown';
        }
        var logText = '** ERROR ** ' + container + ':' + text;
        this.Log(logText);
    }
}

class FeedbackManager extends ManagerBase {
    constructor(xyyz) {
        super(xyyz);
        console.log('Feedback');
    }
    __getTextArea() {
        return document.getElementById(this.Xyyz.Const.ElemId.textAreaFeedback);
    }
    ClearTextArea() {
        var ta = this.__getTextArea();
        if (ta) {
            ta.value = '';
        }
        else {
            this.Xyyz.debug.Error(FeedbackManager.name, 'No text area found');
        }
    }
    WriteLine(text) {
        var ta = this.__getTextArea();
        if (ta) {
            ta.value += text + '\\n';
        }
    }
}

class PageData extends ManagerBase {
    constructor(window, xyyz) {
        super(xyyz);
        this.Start();
    }
    Start() {
        this.Xyyz.debug.FuncStartName(this.constructor.name + ' ' + this.Start.name);
        console.log('PageData B');
        if (window.opener) {
            this.WinData = new WindowData(this.Xyyz);
            this.WinData.Opener.Window = window.opener;
            this.WinData.Opener.Document = window.opener.document;
        }
        else {
            this.Xyyz.debug.Error(this.constructor.name, 'No Opener Page');
        }
        console.log('PageData C');
        this.DebugInfo();
        this.Xyyz.debug.FuncEndName(this.constructor.name);
    }
    GetCurrentPageType() {
        this.Xyyz.debug.FuncStartName(this.GetCurrentPageType.name);
        var toReturn = PageType.Unknown;
        if (this.WinData && this.WinData.Opener && this.WinData.Opener.Window && this.WinData.Opener.Document) {
            var currentLoc = this.WinData.Opener.Window.location.href;
            this.Xyyz.debug.Log('currentLoc: ' + currentLoc);
            if (currentLoc.indexOf(this.Xyyz.Const.Url.Login) > -1) {
                toReturn = PageType.LoginPage;
            }
            else if (currentLoc.indexOf(this.Xyyz.Const.Url.Desktop) > -1) {
                toReturn = PageType.Desktop;
            }
            else if (currentLoc.indexOf(this.Xyyz.Const.Url.ContentEditor) > -1) {
                toReturn = PageType.ContentEditor;
            }
            else if (currentLoc.indexOf(this.Xyyz.Const.Url.LaunchPad) > -1) {
                toReturn = PageType.Launchpad;
            }
            else {
                toReturn = PageType.Unknown;
            }
        }
        this.Xyyz.debug.FuncEndName(this.GetCurrentPageType.name + ' ' + toReturn);
        return toReturn;
    }
    DebugInfo() {
        this.Xyyz.debug.FuncStartName(this.DebugInfo.name);
        this.Xyyz.debug.Log(this.WinData.Opener.Window);
        this.Xyyz.debug.Log(this.WinData.Opener.Document);
        this.Xyyz.debug.FuncEndName(this.DebugInfo.name);
    }
}

class Utilities extends ManagerBase {
    constructor(xyyz) {
        super(xyyz);
        xyyz.debug.FuncStartName(Utilities.name);
        xyyz.debug.FuncEndName(Utilities.name);
    }
    MakeFriendlyDate(date) {
        var toReturn = date.toDateString() + ' ' + date.toLocaleTimeString();
        return toReturn;
    }
}

class Opener {
    constructor() {
        this.Window = null;
        this.Document = null;
    }
}
class WindowData extends ManagerBase {
    constructor(xyyz) {
        super(xyyz);
        xyyz.debug.FuncStartName(this.constructor.name);
        this.Opener = new Opener();
        xyyz.debug.FuncEndName(this.constructor.name);
        xyyz.debug.FuncEndName(this.constructor.name);
    }
}

var PageType;
(function (PageType) {
    PageType[PageType['Unknown'] = 0] = 'Unknown';
    PageType[PageType['LoginPage'] = 1] = 'LoginPage';
    PageType[PageType['Desktop'] = 2] = 'Desktop';
    PageType[PageType['ContentEditor'] = 3] = 'ContentEditor';
    PageType[PageType['Launchpad'] = 4] = 'Launchpad';
})(PageType || (PageType = {}));

console.log('EventManager loaded');
class EventManager extends ManagerBase {
    constructor(xyyz) {
        super(xyyz);
    }
    __ById(value) {
        return document.getElementById(value);
    }
    WireMenuButtons() {
        this.Xyyz.debug.FuncStartName(EventManager.name + ' ' + this.WireMenuButtons.name);
        var thisObj = this;
        var locMan = thisObj.Xyyz.LocationMan;
        var constId = this.Xyyz.Const.ElemId;
        this.__ById(this.Xyyz.Const.ElemId.BtnEdit).onclick = () => { locMan.SetScMode('edit'); };
        this.__ById('btnPrev').onclick = () => { locMan.SetScMode('preview'); };
        this.__ById('btnNorm').onclick = () => { locMan.SetScMode('normal'); };
        this.__ById('btnAdminB').onclick = () => { locMan.AdminB(); };
        this.__ById('btnDesktop').onclick = () => { locMan.ChangeLocation(PageType.Desktop); };
        this.__ById('btnCE').onclick = () => { locMan.ChangeLocation(PageType.ContentEditor); };
        this.__ById(constId.BtnSaveWindowState).onclick = () => { thisObj.Xyyz.OneWindowMan.SaveWindowState(); };
        this.__ById(constId.BtnRestoreWindowState).onclick = () => { thisObj.Xyyz.OneWindowMan.RestoreWindowState(window.opener.document, 0); };
        this.__ById('btnDrawLocalStorage').onclick = () => { thisObj.Xyyz.OneWindowMan.DrawStorage(); };
        this.__ById('btnClearLocalStorage').onclick = () => { thisObj.Xyyz.OneWindowMan.ClearStorage(); };
        this.__ById('btnClearTextArea').onclick = () => { thisObj.Xyyz.debug.ClearTextArea(); };
        this.Xyyz.debug.FuncEndName(this.WireMenuButtons.name);
    }
    ;
}

class GuidManager extends ManagerBase {
    constructor(xyyz) {
        super(xyyz);
    }
    EmptyGuid() {
        return this.ParseGuid(this.Xyyz.Const.GuidEmpty);
    }
    Uuidv4() {
        var toReturn;
        var temp = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            var toReturn = v.toString(16);
            return toReturn;
        });
        toReturn = this.ParseGuid(temp);
        return toReturn;
    }
    ParseGuid(val) {
        let toReturn = {
            Value: val
        };
        return toReturn;
    }
}

class Hub {
    constructor() {
        this.debug = new Debug(window.opener);
        this.debug.FuncStartName(Hub.name);
        this.Start();
        this.debug.FuncEndName(Hub.name);
    }
    Start() {
        this.debug.FuncStartName(this.Start.name);
        console.log('marker A');
        this.PageData = new PageData(window, this);
        console.log('marker B');
        this.EventMan = new EventManager(this);
        console.log('marker C');
        this.Utilities = new Utilities(this);
        console.log('marker D');
        console.log('marker E');
        this.LocationMan = new LocationManager(this);
        console.log('marker F');
        this.OneDesktopMan = new OneDesktopManager(this);
        console.log('marker G');
        this.OneTreeMan = new OneTreeManager(this);
        console.log('marker H');
        this.OneWindowMan = new OneWindowManager(this);
        console.log('marker I');
        this.OneCEMan = new OneCEManager(this);
        console.log('marker J');
        this.FeedbackMan = new FeedbackManager(this);
        this.GuidMan = new GuidManager(this);
        this.MiscMan = new MiscManager(this);
        this.init();
        this.debug.FuncEndName(this.Start.name);
    }
    init() {
        this.debug.FuncStartName(Hub.constructor.name + ' ' + this.init.name);
        this.Const = InjectConst.const;
        this.EventMan.WireMenuButtons();
        this.OneWindowMan.CreateNewWindowSnapShot();
        this.OneWindowMan.PopulateStateSel();
        this.debug.FuncEndName(Hub.constructor.name + ' ' + this.init.name);
    }
}

class LocationManager extends ManagerBase {
    constructor(xyyz) {
        super(xyyz);
        xyyz.debug.FuncStartName(LocationManager.name);
        this.MaxAttempts = 10;
        this.CurrentAttempt = this.MaxAttempts;
        this.EffortWait = 1000;
        xyyz.debug.FuncEndName(LocationManager.name);
    }
    SetHref(href, callback, isFromTimeout, effortCount) {
        this.Xyyz.debug.FuncStartName(this.SetHref.toString() + ' : ' + href + ' : ' + isFromTimeout + ' : ' + effortCount);
        this.Xyyz.PageData.WinData.Opener.Window.location.href = href;
        if (isFromTimeout) {
            effortCount--;
        }
        else {
            effortCount = this.MaxAttempts;
        }
        if (this.Xyyz.PageData.WinData.Opener.Window.location.href === href) {
            callback();
        }
        else if (effortCount > 0) {
            setTimeout(function () {
                this.SetHref(href, callback, true, effortCount);
            }, this.EffortWait);
        }
        else {
            this.Xyyz.debug.Log('changing href unsuccessful. Dying');
        }
        this.Xyyz.debug.FuncEndName(this.SetHref.name);
    }
    ChangeLocation(desiredPageType) {
        this.Xyyz.debug.FuncStartName(this.ChangeLocation.name);
        var currentState = this.Xyyz.PageData.GetCurrentPageType();
        if (currentState === PageType.LoginPage) {
            this.Xyyz.debug.Log('On Login page: ');
            this.AdminB();
            var self = this;
            setTimeout(function () {
                self.Xyyz.LocationMan.ChangeLocation(desiredPageType);
            }, 1000);
        }
        else if (currentState === PageType.Launchpad) {
            if (desiredPageType === PageType.Desktop) {
                this.SetHref(this.Xyyz.Const.Url.Desktop, function () { this.ChangeLocation(desiredPageType); }, null, null);
            }
            else if (desiredPageType === PageType.ContentEditor) {
                this.SetHref(this.Xyyz.Const.Url.ContentEditor, function () { this.ChangeLocation(desiredPageType); }, null, null);
            }
        }
        else if (currentState === PageType.Desktop) {
            this.Xyyz.debug.Log('On Desktop');
            this.Xyyz.LocationMan.TriggerRedButton();
        }
        this.Xyyz.debug.FuncEndName(this.Xyyz.LocationMan.ChangeLocation.name);
    }
    RedButton(iteration) {
        this.Xyyz.debug.FuncStartName(this.Xyyz.LocationMan.RedButton.name + ':' + iteration);
        var found = this.Xyyz.PageData.WinData.Opener.Document.getElementById('StartButton');
        this.Xyyz.debug.Log('Red Button: ' + found + '  ' + this.Xyyz.PageData.WinData.Opener.Window.location.href + ' ' + iteration);
        if (found) {
            found.click();
            var menuLeft = this.Xyyz.PageData.WinData.Opener.Document.querySelector('.scStartMenuLeftOption');
            if (menuLeft) {
                menuLeft.click();
            }
        }
        else {
            iteration = iteration - 1;
            if (iteration > 0) {
                var self = this;
                setTimeout(function () {
                    self.Xyyz.LocationMan.RedButton(iteration);
                }, 1500);
            }
        }
        this.Xyyz.debug.FuncEndName(this.Xyyz.LocationMan.RedButton.name);
    }
    TriggerRedButton() {
        this.Xyyz.debug.FuncStartName(this.Xyyz.LocationMan.TriggerRedButton.name);
        var self = this;
        setTimeout(function () {
            self.Xyyz.LocationMan.RedButton(10);
        }, 1500);
        this.Xyyz.debug.FuncEndName(this.Xyyz.LocationMan.TriggerRedButton.name);
    }
    SetScMode(newValue) {
        var newValueB = '=' + newValue;
        window.opener.location.href = window.opener.location.href.replace('=normal', newValueB).replace('=preview', newValueB).replace('=edit', newValueB);
    }
    AdminB() {
        this.Xyyz.debug.FuncStartName(this.AdminB.name);
        var userNameElem = this.Xyyz.PageData.WinData.Opener.Document.getElementById('UserName');
        var passwordElem = this.Xyyz.PageData.WinData.Opener.Document.getElementById('Password');
        this.Xyyz.debug.Log('userNameElem: ' + userNameElem);
        this.Xyyz.debug.Log('passwordElem: ' + passwordElem);
        userNameElem.setAttribute('value', 'admin');
        passwordElem.setAttribute('value', 'b');
        var candidate = this.Xyyz.PageData.WinData.Opener.Document.getElementById(this.QkID().LoginBtn);
        this.Xyyz.debug.Log('candidate: ' + candidate);
        if (candidate) {
            candidate.click();
        }
        else {
            candidate = this.Xyyz.PageData.WinData.Opener.Document.querySelector(this.QkSel().InputBtn2);
            this.Xyyz.debug.Log('candidate: ' + candidate);
            if (candidate) {
                candidate.click();
            }
        }
        this.Xyyz.debug.FuncEndName(this.AdminB.name);
    }
    QkSel() {
        return this.Xyyz.Const.Selector;
    }
    QkID() {
        return this.Xyyz.Const.ElemId;
    }
}

class MiscManager extends ManagerBase {
    constructor(xyyz) {
        super(xyyz);
    }
}

class OneCEManager extends ManagerBase {
    constructor(xyyz) {
        super(xyyz);
    }
    WaitForNode(lookingFor, targetDoc, currentIteration, timeout) {
        this.Xyyz.debug.Log('looking for guid: ' + lookingFor.Value);
        var foundOnPage = targetDoc.getElementById(lookingFor.Value);
        if (foundOnPage) {
            this.Xyyz.debug.Log('foundOnPage');
            this.__expandNode(foundOnPage);
        }
        else {
            if (currentIteration > 0) {
                this.Xyyz.debug.Log('not found on page...setting timeout: ' + timeout);
                var self = this;
                setTimeout(function () {
                    self.WaitForNode(lookingFor, targetDoc, currentIteration--, timeout);
                }, timeout);
            }
        }
    }
    __expandNode(foundOnPage) {
        var currentSrc = foundOnPage.getAttribute('src');
        this.Xyyz.debug.Log('currentSrc' + currentSrc);
        if (currentSrc.indexOf(this.Xyyz.Const.Names.TreeMenuExpandedPng) < 0) {
            this.Xyyz.debug.Log('clicking it');
            foundOnPage.click();
        }
    }
    __collapseNode(element) {
        var currentSrc = element.getAttribute('src');
        this.Xyyz.debug.Log('currentSrc' + currentSrc);
        if (currentSrc.indexOf(this.Xyyz.Const.Names.TreeMenuExpandedPng) > -1) {
            this.Xyyz.debug.Log('clicking it');
            element.click();
        }
    }
    __collapseRootNode(targetDoc) {
        var rootElem = targetDoc.getElementById(this.Xyyz.Const.ElemId.SitecoreRootGlyphId);
        if (rootElem) {
            this.__collapseNode(rootElem);
        }
        else {
            this.Xyyz.debug.Error(this.__collapseRootNode.name, 'Root glyph not found ' + this.Xyyz.Const.ElemId.SitecoreRootGlyphId);
        }
    }
    RestoreCEState(storageData, targetDoc) {
        this.Xyyz.debug.FuncStartFunc(this.RestoreCEState);
        var toReturn = false;
        this.Xyyz.debug.Log('Node Count: ' + storageData.AllTreeNodeAr.length);
        this.__collapseRootNode(targetDoc);
        for (var idx = 0; idx < storageData.AllTreeNodeAr.length; idx++) {
            var lookingFor = storageData.AllTreeNodeAr[idx].NodeId;
            this.WaitForNode(lookingFor, targetDoc, 100, this.Xyyz.Const.TimeoutWaitForNodeToLoad);
        }
        this.Xyyz.debug.FuncEndName(this.RestoreCEState.name);
        return toReturn;
    }
    SaveStateOneContentEditor(id, docElem) {
        this.Xyyz.debug.FuncStartName('SaveOneContentEditor');
        this.Xyyz.debug.Log('SaveOneContentEditor');
        ;
        this.Xyyz.debug.Log('docElem is null: ' + (docElem === null));
        ;
        this.Xyyz.debug.Log('docElem is null: ' + (docElem === null));
        ;
        var CeSnapShot = this.Xyyz.OneCEMan.MakeNewData(id);
        CeSnapShot.AllTreeNodeAr = this.Xyyz.OneTreeMan.GetOneLiveTreeData(CeSnapShot, docElem);
        this.Xyyz.OneWindowMan.DrawDebugDataPretty(null);
        this.Xyyz.OneWindowMan.PutCEDataToCurrentSnapShot(CeSnapShot);
        this.Xyyz.debug.FuncEndName('SaveOneContentEditor');
    }
    MakeNewData(id) {
        this.Xyyz.debug.FuncStartName('MakeNewData: ' + id);
        var toReturn = {
            Id: id,
            AllTreeNodeAr: []
        };
        this.Xyyz.debug.FuncEndName('MakeNewData: ' + id);
        return toReturn;
    }
    DebugDataOneNode(dataOneTreeNode) {
        this.Xyyz.debug.FuncStartName('DebugDataOneNode');
        var toReturn = dataOneTreeNode.NodeId + ' ' + dataOneTreeNode.NodeFriendly;
        this.Xyyz.debug.FuncEndName('DebugDataOneNode');
        return toReturn;
    }
    GetDebugDataOneCE(dataOneCe) {
        this.Xyyz.debug.FuncStartName('GetDebugDataOneCE');
        var toReturn = [];
        toReturn.push('------ All Tree Nodes -----');
        for (var idx = 0; idx < dataOneCe.AllTreeNodeAr.length; idx++) {
            this.Xyyz.debug.Log('idx: ' + idx);
            var oneVal = this.DebugDataOneNode(dataOneCe.AllTreeNodeAr[idx]);
            this.Xyyz.debug.Log('oneVal : ' + oneVal);
            toReturn.push(oneVal);
        }
        this.Xyyz.debug.FuncEndName(this.GetDebugDataOneCE.name);
        return toReturn;
    }
}

console.log('ManyTrees loaded');
class OneDesktopManager extends ManagerBase {
    RestoreDesktopState(foundMatch) {
        throw new Error('Method not implemented.');
    }
    constructor(xyyz) {
        xyyz.debug.FuncStartName(OneDesktopManager.name);
        super(xyyz);
        xyyz.debug.FuncEndName(OneDesktopManager.name);
    }
    GetNewIframeData(index, docElem, iframe) {
        var toReturn = {
            Index: index,
            DocElem: docElem,
            IframeElem: iframe,
            Id: this.Xyyz.GuidMan.ParseGuid(iframe.getAttribute('id'))
        };
        return toReturn;
    }
    GetAllLiveIframeData(targetDoc) {
        this.Xyyz.debug.FuncStartName(this.GetAllLiveIframeData.name);
        var toReturn = [];
        var iframeAr = targetDoc.querySelectorAll('iframe[src*=content]');
        if (iframeAr) {
            this.Xyyz.debug.Log('iframeAr: ' + iframeAr.length);
            for (var ifrIdx = 0; ifrIdx < iframeAr.length; ifrIdx++) {
                this.Xyyz.debug.Log('pushing: ' + ifrIdx);
                toReturn.push(this.GetNewIframeData(ifrIdx, null, iframeAr[ifrIdx]));
            }
        }
        this.Xyyz.debug.FuncEndName(this.GetAllLiveIframeData.name + ' ' + toReturn.length);
        return toReturn;
    }
    SaveStateOneDesktop() {
        this.Xyyz.debug.FuncStartName(this.SaveStateOneDesktop.name);
        ;
        this.Xyyz.debug.FuncStartName('SaveOneDesktop');
        ;
        var livingIframeAr = this.GetAllLiveIframeData(this.Xyyz.PageData.WinData.Opener.Document);
        if (livingIframeAr && livingIframeAr.length > 0) {
            for (var iframeIdx = 0; iframeIdx < livingIframeAr.length; iframeIdx++) {
                this.Xyyz.debug.Log('iframeIdx: ' + iframeIdx);
                var targetIframeObj = livingIframeAr[iframeIdx];
                this.Xyyz.debug.Log('targetIframe: ' + JSON.stringify(targetIframeObj));
                this.Xyyz.OneCEMan.SaveStateOneContentEditor(targetIframeObj.Id, targetIframeObj.DocElem);
            }
        }
        this.Xyyz.debug.Log('done gathering tree data');
        this.Xyyz.OneWindowMan.DrawDebugDataPretty(null);
        this.Xyyz.debug.FuncEndName(this.SaveStateOneDesktop.name);
    }
}
;

class OneWindowManager extends ManagerBase {
    constructor(xyyz) {
        super(xyyz);
        xyyz.debug.FuncStartName(OneWindowManager.name);
        xyyz.debug.FuncEndName(OneWindowManager.name);
    }
    __getSelectElem() {
        return window.document.getElementById(this.Xyyz.Const.ElemId.SelStateSnapShot);
    }
    PopulateStateSel() {
        this.Xyyz.debug.FuncStartFunc(this.PopulateStateSel);
        var targetSel = this.__getSelectElem();
        if (targetSel) {
            var snapShots = this.GetAllStorageAsIDataOneWindow();
            if (snapShots && snapShots.length > 0) {
                for (var idx = 0; idx < snapShots.length; idx++) {
                    var data = snapShots[idx];
                    var el = window.document.createElement('option');
                    el.textContent = this.Xyyz.Utilities.MakeFriendlyDate(data.TimeStamp) + ' - ' + data.NickName + ' - ' + (data.IsFavorite ? 'Favorite' : '--');
                    el.value = data.Id.Value.toString();
                    if (idx === 0) {
                        el.selected = true;
                    }
                    targetSel.appendChild(el);
                }
            }
        }
        else {
        }
        this.Xyyz.debug.FuncEndName(this.PopulateStateSel.name);
    }
    SaveWindowState() {
        this.Xyyz.debug.FuncStartName(this.SaveWindowState.name);
        this.Xyyz.OneWindowMan.CreateNewWindowSnapShot();
        var currentPageType = this.Xyyz.PageData.GetCurrentPageType();
        if (currentPageType === PageType.ContentEditor) {
            this.Xyyz.debug.Log('is Content Editor');
            var id = this.Xyyz.GuidMan.EmptyGuid();
            var docElem = this.Xyyz.PageData.WinData.Opener.Document;
            this.Xyyz.OneCEMan.SaveStateOneContentEditor(id, docElem);
        }
        else if (currentPageType === PageType.Desktop) {
            this.Xyyz.debug.Log('is Desktop');
            this.Xyyz.OneDesktopMan.SaveStateOneDesktop();
        }
        else {
            this.Xyyz.debug.Error(this.SaveWindowState.name, 'Invalid page location ' + currentPageType);
        }
        this.Xyyz.debug.FuncEndName(this.SaveWindowState.name);
        ;
    }
    RestoreWindowState(targetDoc, treeIdx) {
        this.Xyyz.debug.FuncStartFunc(this.RestoreWindowState);
        this.Xyyz.debug.Log('s) LookAtExistingData: ' + treeIdx);
        var idOfSelect = this.Xyyz.OneWindowMan.GetIdOfSelect();
        this.Xyyz.debug.Log('idOfSelect: ' + idOfSelect);
        var foundInStorage = this.GetAllStorageAsIDataOneWindow();
        var foundMatch = null;
        if (foundInStorage) {
            this.Xyyz.debug.Log('foundInStorage: ');
            for (var idx = 0; idx < foundInStorage.length; idx++) {
                var candidate = foundInStorage[idx];
                if (candidate.Id.Value === idOfSelect) {
                    foundMatch = candidate;
                    break;
                }
            }
            if (foundMatch) {
                this.Xyyz.debug.Log('found match ' + foundMatch.TimeStamp);
                if (this.Xyyz.PageData.GetCurrentPageType() === PageType.ContentEditor) {
                    if (foundMatch.AllCEAr.length > 1) {
                        alert('This data has multiple Content Editor data. Only the first will be used');
                    }
                    this.Xyyz.OneCEMan.RestoreCEState(foundMatch.AllCEAr[0], this.Xyyz.PageData.OpenerDoc());
                }
                else {
                    this.Xyyz.OneDesktopMan.RestoreDesktopState(foundMatch);
                }
                var allData = this.Xyyz.OneDesktopMan.GetAllLiveIframeData(targetDoc)[treeIdx];
            }
            else {
                this.Xyyz.debug.Error(this.RestoreWindowState.name, 'No match found for snap shot');
            }
        }
        this.Xyyz.debug.FuncEndName(this.RestoreWindowState.name);
    }
    GetIdOfSelect() {
        var targetSel = this.__getSelectElem();
        var toReturn = '';
        if (targetSel) {
            toReturn = targetSel.options[targetSel.selectedIndex].value;
        }
        return toReturn;
    }
    ClearStorage() {
        this.Xyyz.debug.FuncStartName('ClearStorage');
        var result = confirm('Clear Local Storage for Xyyz b?');
        if (result === true) {
            var targets = this.GetAllLocalStorage();
            if (targets) {
                this.Xyyz.debug.Log('Target Count: ' + targets.length);
                var countBefore = targets.length;
                for (var idx = 0; idx < targets.length; idx++) {
                    this.Xyyz.debug.Log('idx: ' + idx);
                    var oneTarget = targets[idx];
                    this.Xyyz.debug.Log('key: ' + oneTarget.key);
                    window.localStorage.removeItem(oneTarget.key);
                }
                targets = this.GetAllLocalStorage();
                var countAfter = targets.length;
                alert('Count Before: ' + countBefore + ' Count After: ' + countAfter);
            }
            else {
                alert('No local storage was found for Xyyz');
            }
        }
        this.Xyyz.debug.FuncEndName('ClearStorage');
    }
    GetAllStorageAsIDataOneWindow() {
        this.Xyyz.debug.FuncStartFunc(this.GetAllStorageAsIDataOneWindow);
        var toReturn = [];
        var rawStorageData = this.GetAllLocalStorage();
        if (rawStorageData) {
            for (var idx = 0; idx < rawStorageData.length; idx++) {
                var candidate = JSON.parse(rawStorageData[idx].data);
                this.Xyyz.debug.Log('rawStorageData[idx].data : ' + rawStorageData[idx].data);
                this.Xyyz.debug.Log('candidate : ' + candidate.AllCEAr.length);
                if (candidate) {
                    candidate.TimeStamp = new Date(candidate.TimeStamp);
                    candidate.Id = this.Xyyz.GuidMan.ParseGuid(candidate.Id.toString());
                    if (!candidate.NickName) {
                        candidate.NickName = '__';
                    }
                    toReturn.push(candidate);
                }
            }
        }
        toReturn.sort((a, b) => +b.TimeStamp - +a.TimeStamp);
        this.Xyyz.debug.FuncEndName(this.GetAllStorageAsIDataOneWindow.name);
        return toReturn;
    }
    GetAllLocalStorage() {
        this.Xyyz.debug.FuncStartName('__GetAllLocalStorage ');
        var toReturn = [];
        for (var idx = 0; idx < window.localStorage.length; idx++) {
            var candidate = {
                data: '',
                key: ''
            };
            candidate.key = window.localStorage.key(idx);
            this.Xyyz.debug.Log('candidate.key: ' + candidate.key);
            if (candidate.key.startsWith(this.Xyyz.Const.Storage.WindowRoot)) {
                candidate.data = window.localStorage.getItem(candidate.key);
                toReturn.push(candidate);
            }
        }
        this.Xyyz.debug.FuncEndName('__GetAllLocalStorage ');
        return toReturn;
    }
    __drawStorageRaw(ourData) {
        this.Xyyz.debug.FuncStartName('DrawStorageRaw');
        for (var idx = 0; idx < ourData.length; idx++) {
            this.Xyyz.debug.Log('key: \t' + ourData[idx].key);
            this.Xyyz.debug.Log('data: \t' + ourData[idx].data);
            this.Xyyz.debug.Log('------------');
        }
        this.Xyyz.debug.FuncEndName('DrawStorageRaw');
    }
    __drawStoragePretty(ourData) {
        this.Xyyz.debug.FuncStartName('DrawStoragePretty');
        this.Xyyz.FeedbackMan.ClearTextArea();
        for (var idx = 0; idx < ourData.length; idx++) {
            this.Xyyz.debug.Log('key: \t' + ourData[idx].key);
            var parsed = JSON.parse(ourData[idx].data);
            if (parsed) {
                this.DrawDebugDataPretty(parsed);
                this.Xyyz.debug.Log('------------');
            }
        }
        this.Xyyz.debug.FuncEndName('DrawStoragePretty');
    }
    DrawStorage() {
        this.Xyyz.debug.FuncStartName('DrawStorage');
        try {
            var ourData = this.GetAllLocalStorage();
            if (ourData) {
                this.__drawStorageRaw(ourData);
                this.__drawStoragePretty(ourData);
            }
        }
        catch (e) {
            xyyz.debug.Error(e.message);
        }
        this.Xyyz.debug.FuncEndName('DrawStorage');
    }
    PutCEDataToCurrentSnapShot(oneCeData) {
        this.Xyyz.debug.FuncStartName(this.PutCEDataToCurrentSnapShot.name);
        this.Xyyz.debug.Log('PutCEDataToCurrentSnapShot');
        var matchingCeData = this.FindMatchingCeData(oneCeData);
        if (matchingCeData) {
            matchingCeData = oneCeData;
        }
        else {
            this.__activeWindowSnapShot.AllCEAr.push(oneCeData);
        }
        this.UpdateStorage();
        this.DrawDebugDataPretty(null);
        this.Xyyz.debug.FuncEndName(this.PutCEDataToCurrentSnapShot.name);
    }
    ShowDebugDataOneWindow() {
        this.Xyyz.debug.FuncStartName('ShowDebugDataOneWindow');
        var toReturn = [];
        toReturn.push(this.__activeWindowSnapShot.TimeStamp.toJSON());
        for (var jdx = 0; jdx < this.__activeWindowSnapShot.AllCEAr.length; jdx++) {
            var oneCE = this.__activeWindowSnapShot.AllCEAr[jdx];
            toReturn = toReturn.concat(this.Xyyz.OneCEMan.GetDebugDataOneCE(oneCE));
        }
        for (var kdx = 0; kdx < toReturn.length; kdx++) {
            this.Xyyz.debug.Log(toReturn[kdx]);
        }
        this.Xyyz.debug.FuncEndName('ShowDebugDataOneWindow');
        return toReturn;
    }
    UpdateStorage() {
        this.Xyyz.debug.FuncStartName('UpdateStorage');
        var snapShotAsString = JSON.stringify(this.__activeWindowSnapShot);
        this.Xyyz.debug.Log('snapShotAsString: ' + snapShotAsString);
        window.localStorage.setItem(this.Xyyz.Const.Storage.WindowRoot + this.__activeWindowSnapShot.Id, snapShotAsString);
        this.Xyyz.debug.FuncEndName('UpdateStorage');
    }
    FindMatchingCeData(oneCeData) {
        var toReturn = null;
        for (var idx = 0; idx < this.__activeWindowSnapShot.AllCEAr.length; idx++) {
            var candidate = this.__activeWindowSnapShot.AllCEAr[idx];
            if (candidate.Id === oneCeData.Id) {
                toReturn = candidate;
                break;
            }
        }
        this.Xyyz.debug.Log('match found :' + (toReturn !== null));
        return toReturn;
    }
    CreateNewWindowSnapShot() {
        this.Xyyz.debug.FuncStartName('CreateNewWindowSnapShot');
        var dateToUse = new Date();
        var newGuid = this.Xyyz.GuidMan.Uuidv4();
        this.__activeWindowSnapShot = {
            TimeStamp: dateToUse,
            AllCEAr: [],
            Id: newGuid,
            IsFavorite: false,
            NickName: '__'
        };
        this.Xyyz.debug.FuncEndName('CreateNewWindowSnapShot');
    }
    DrawDebugDataPretty(source) {
        var allDebugData = this.__buildDebugDataPretty(source);
        for (var ldx = 0; ldx < allDebugData.length; ldx++) {
            this.Xyyz.FeedbackMan.WriteLine(allDebugData[ldx]);
        }
    }
    __buildDebugDataPretty(source) {
        this.Xyyz.debug.FuncStartName(this.__buildDebugDataPretty.name);
        if (!source) {
            source = this.__activeWindowSnapShot;
        }
        var toReturn = [];
        toReturn.push('------ One Window Snap Shot Start -----');
        toReturn.push('Id: ' + source.Id);
        toReturn.push('TimeStamp: ' + source.TimeStamp);
        toReturn.push('CE Count: ' + source.AllCEAr.length);
        for (var jdx = 0; jdx < source.AllCEAr.length; jdx++) {
            toReturn.push('\t------ One CE -----');
            var dataOneCE = source.AllCEAr[jdx];
            toReturn.push('\tId: ' + dataOneCE.Id);
            var allCeDebugDataAr = this.Xyyz.OneCEMan.GetDebugDataOneCE(dataOneCE);
            for (var kdx = 0; kdx < allCeDebugDataAr.length; kdx++) {
                toReturn.push('\t\t' + allCeDebugDataAr[kdx]);
            }
        }
        toReturn.push('------ One Window Snap Shot End -----');
        this.Xyyz.debug.FuncEndName(this.__buildDebugDataPretty.name);
        return toReturn;
    }
}

console.log('OneTree loaded');
class OneTreeManager extends ManagerBase {
    constructor(xyyz) {
        super(xyyz);
        xyyz.debug.FuncStartName(OneTreeManager.name);
        xyyz.debug.FuncEndName(OneTreeManager.name);
    }
    GetFriendlyNameFromNode(inputNode) {
        this.Xyyz.debug.FuncStartName(this.GetFriendlyNameFromNode.name);
        var toReturn = 'unknown';
        var parentNode = inputNode.parentNode;
        var treeNode = parentNode.querySelector('[id^=Tree_Node_]');
        if (treeNode) {
            toReturn = treeNode.innerText;
        }
        else {
            this.Xyyz.debug.Log('No treeNode');
        }
        this.Xyyz.debug.FuncEndName(this.GetFriendlyNameFromNode.toString + ' ' + toReturn);
        return toReturn;
    }
    WalkNodeRecursive(targetNode, depth) {
        var toReturn = [];
        depth = depth - 1;
        if (targetNode) {
            var className = targetNode.className;
            if (className === this.Xyyz.Const.ClassNames.ContentTreeNode) {
                var firstImg = targetNode.querySelector(this.Xyyz.Const.Selector.ContentTreeNodeGlyph);
                if (firstImg) {
                    var srcAttr = firstImg.getAttribute('src');
                    if (srcAttr.indexOf(this.Xyyz.Const.TreeExpandedPng) > -1) {
                        var friendlyName = this.GetFriendlyNameFromNode(firstImg);
                        var newData = { NodeFriendly: friendlyName, NodeId: this.Xyyz.GuidMan.ParseGuid(firstImg.id) };
                        toReturn.push(newData);
                    }
                }
            }
            var childNodes = targetNode.children;
            if (childNodes && childNodes.length > 0 && depth > 0) {
                for (var jdx = 0; jdx < childNodes.length; jdx++) {
                    var oneChild = childNodes[jdx];
                    toReturn = toReturn.concat(this.WalkNodeRecursive(oneChild, depth));
                }
            }
        }
        return toReturn;
    }
    GetOneLiveTreeData(dataOneCe, targetDoc) {
        this.Xyyz.debug.FuncStartName(this.GetOneLiveTreeData.name + 'b idx: ' + dataOneCe.Id);
        this.Xyyz.debug.Log('targetDoc isnull xx: ' + (targetDoc === null));
        var toReturn = [];
        if (targetDoc) {
            this.Xyyz.debug.Log(targetDoc);
            var rootNode = targetDoc.getElementById(this.Xyyz.Const.ElemId.SitecoreRootNodeId);
            if (rootNode) {
                this.Xyyz.debug.Log('rootNode: ' + rootNode.innerHTML);
                var rootParent = rootNode.parentElement;
                toReturn = this.WalkNodeRecursive(rootParent, this.Xyyz.Const.MaxIter);
                this.Xyyz.debug.Log('foundNodes count: ' + toReturn.length);
            }
            else {
                this.Xyyz.debug.Error(this.GetOneLiveTreeData.name, 'no root node');
            }
        }
        else {
            this.Xyyz.debug.Error(this.GetOneLiveTreeData.name, 'no targetDoc');
        }
        this.Xyyz.debug.FuncEndName(this.GetOneLiveTreeData.name);
        return toReturn;
    }
}

console.log('marker aa');
var xyyz = xyyz || {};
this.xyyz.HubObj = new Hub();
console.log('marker bb');
