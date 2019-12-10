console.log('_ManagerBase loaded');
class ManagerBase {
    constructor(xyyz) {
        this.Xyyz = xyyz;
    }
    AtticMan() {
        return this.Xyyz.AtticMan;
    }
    UiMan() {
        return this.Xyyz.UiMan;
    }
    debug() {
        return this.Xyyz.debug;
    }
    Const() {
        return this.Xyyz.Const;
    }
    Guidman() {
        return this.Xyyz.GuidMan;
    }
    OpenerDoc() {
        return this.Xyyz.PageData.WinDataParent.Opener.Document;
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
            ta.value = '--- Debug Text Reset ---\\n';
            this.__indentCount = 0;
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
    FuncStartName(textOrFunc, optionalValue = '') {
        textOrFunc = 's) ' + textOrFunc;
        if (typeof (textOrFunc) === 'function') {
            console.log('******* is func *************');
            textOrFunc = textOrFunc.name;
        }
        if (optionalValue.length > 0) {
            textOrFunc = textOrFunc + ' : ' + optionalValue;
        }
        this.Log(textOrFunc);
        this.__indentCount++;
        if (this.__indentCount > 10) {
            this.__indentCount = 10;
        }
    }
    FuncEndName(text) {
        text = 'e) ' + text;
        this.__indentCount--;
        if (this.__indentCount < 0) {
            this.__indentCount = 0;
        }
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
            this.WinDataParent = new WindowData(this.Xyyz);
            this.WinDataParent.Opener.Window = window.opener;
            this.WinDataParent.Opener.Document = window.opener.document;
        }
        else {
            this.Xyyz.debug.Error(this.constructor.name, 'No Opener Page');
        }
        console.log('PageData C');
        this.DebugInfo();
        this.Xyyz.debug.FuncEndName(this.constructor.name);
    }
    GetPageTypeOfTargetWindow(targetWindow) {
        this.Xyyz.debug.FuncStartName(this.GetPageTypeOfTargetWindow.name);
        var toReturn;
        var currentLoc = targetWindow.location.href;
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
        this.Xyyz.debug.FuncEndName(this.GetPageTypeOfTargetWindow.name);
        return toReturn;
    }
    GetCurrentPageType() {
        this.Xyyz.debug.FuncStartName(this.GetCurrentPageType.name);
        var toReturn = PageType.Unknown;
        if (this.WinDataParent && this.WinDataParent.Opener && this.WinDataParent.Opener.Window && this.WinDataParent.Opener.Document) {
            return this.GetPageTypeOfTargetWindow(this.WinDataParent.Opener.Window);
        }
        this.Xyyz.debug.FuncEndName(this.GetCurrentPageType.name + ' (' + toReturn + ') ' + PageType[toReturn]);
        return toReturn;
    }
    DebugInfo() {
        this.Xyyz.debug.FuncStartName(this.DebugInfo.name);
        this.Xyyz.debug.Log(this.WinDataParent.Opener.Window);
        this.Xyyz.debug.Log(this.WinDataParent.Opener.Document);
        this.Xyyz.debug.FuncEndName(this.DebugInfo.name);
    }
}

class Utilities extends ManagerBase {
    TimeNicknameFavStr(data) {
        return this.MakeFriendlyDate(data.TimeStamp) + ' - ' + data.NickName + ' - ' + (data.IsFavorite ? 'Favorite' : '--');
    }
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

class AtticManager extends ManagerBase {
    constructor(xyyz) {
        super(xyyz);
        xyyz.debug.FuncStartName(AtticManager.name);
        xyyz.debug.FuncEndName(AtticManager.name);
    }
    Init() {
        this.eventAwesome = new CustomEvent('awesome', { detail: 'some detail' });
    }
    functioneventHandler(e) {
        console.log('this data is ' + e.detail);
    }
    UpdateNickname() {
        this.Xyyz.debug.FuncStartName(this.UpdateNickname);
        var targetId = this.UiMan().GetIdOfSelectWindowSnapshot();
        if (targetId) {
            var storageMatch = this.GetFromStorageById(targetId);
            if (storageMatch) {
                var newNickname = this.UiMan().GetValueInNickname();
                storageMatch.NickName = newNickname;
                this.WriteToStorage(storageMatch);
            }
        }
        this.Xyyz.debug.FuncEndName(this.UpdateNickname);
    }
    ToggleFavorite() {
        this.Xyyz.debug.FuncStartName(this.ToggleFavorite);
        var targetId = this.UiMan().GetIdOfSelectWindowSnapshot();
        if (targetId) {
            var storageMatch = this.GetFromStorageById(targetId);
            if (storageMatch) {
                storageMatch.IsFavorite = !storageMatch.IsFavorite;
                this.WriteToStorage(storageMatch);
            }
        }
        this.Xyyz.debug.FuncEndName(this.ToggleFavorite);
    }
    DrawDebugDataPretty(source) {
        var allDebugData = this.__buildDebugDataPretty(source);
        for (var ldx = 0; ldx < allDebugData.length; ldx++) {
            this.Xyyz.FeedbackMan.WriteLine(allDebugData[ldx]);
        }
    }
    __buildDebugDataPretty(dataOneWindow) {
        this.Xyyz.debug.FuncStartName(this.__buildDebugDataPretty.name, (dataOneWindow !== null).toString());
        var toReturn = [];
        if (dataOneWindow) {
            toReturn.push('------ One Window Snap Shot Start -----');
            toReturn.push('Id: ' + dataOneWindow.Id);
            toReturn.push('TimeStamp: ' + dataOneWindow.TimeStamp);
            toReturn.push('CE Count: ' + dataOneWindow.AllCEAr.length);
            for (var jdx = 0; jdx < dataOneWindow.AllCEAr.length; jdx++) {
                toReturn.push('\t------ One CE -----');
                var dataOneCE = dataOneWindow.AllCEAr[jdx];
                toReturn.push('\tId: ' + dataOneCE.Id.asString);
                var allCeDebugDataAr = this.Xyyz.OneCEMan.GetDebugDataOneCE(dataOneCE);
                for (var kdx = 0; kdx < allCeDebugDataAr.length; kdx++) {
                    toReturn.push('\t\t' + allCeDebugDataAr[kdx]);
                }
            }
            toReturn.push('------ One Window Snap Shot End -----');
            this.Xyyz.debug.FuncEndName(this.__buildDebugDataPretty.name);
        }
        else {
            this.debug().Error(this.__buildDebugDataPretty.name, 'missing data');
        }
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
    __getAllLocalStorageAsIOneStorageData() {
        this.Xyyz.debug.FuncStartName('__GetAllLocalStorage ');
        var toReturn = [];
        for (var idx = 0; idx < window.localStorage.length; idx++) {
            var candidate = {
                data: '',
                key: '',
            };
            candidate.key = window.localStorage.key(idx);
            if (candidate.key.startsWith(this.Xyyz.Const.Storage.WindowRoot)) {
                this.Xyyz.debug.Log('candidate.key: ' + candidate.key);
                candidate.data = window.localStorage.getItem(candidate.key);
                toReturn.push(candidate);
            }
        }
        this.Xyyz.debug.FuncEndName('__GetAllLocalStorage ');
        return toReturn;
    }
    WriteToStorage(dataOneWindow) {
        this.Xyyz.debug.FuncStartName(this.WriteToStorage);
        var snapShotAsString = JSON.stringify(dataOneWindow);
        this.Xyyz.debug.Log('snapShotAsString: ' + snapShotAsString);
        window.localStorage.setItem(this.Xyyz.Const.Storage.WindowRoot + dataOneWindow.Id.asString, snapShotAsString);
        this.UiMan().RefreshUi();
        this.Xyyz.debug.FuncEndName(this.WriteToStorage.name);
    }
    GetAllStorageAsIDataOneWindow() {
        this.Xyyz.debug.FuncStartName(this.GetAllStorageAsIDataOneWindow.name);
        var toReturn = [];
        var rawStorageData = this.__getAllLocalStorageAsIOneStorageData();
        if (rawStorageData) {
            for (var idx = 0; idx < rawStorageData.length; idx++) {
                var oneRaw = rawStorageData[idx];
                var candidate = JSON.parse(oneRaw.data);
                if (candidate) {
                    this.Xyyz.debug.Log('candidate.AllCEAr.length : ' + candidate.AllCEAr.length);
                    candidate.TimeStamp = new Date(candidate.TimeStamp);
                    candidate.Id = this.Xyyz.GuidMan.ParseGuid(candidate.Id.asString);
                    candidate.RawData = oneRaw;
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
    RemoveOneFromStorage() {
        this.Xyyz.debug.FuncStartName(this.RemoveOneFromStorage.name);
        var targetId = this.UiMan().GetIdOfSelectWindowSnapshot();
        if (targetId) {
            var storageMatch = this.GetFromStorageById(targetId);
            if (storageMatch) {
                var result = confirm('Remove ?: ' + this.Xyyz.Utilities.TimeNicknameFavStr(storageMatch));
                if (result === true) {
                    window.localStorage.removeItem(storageMatch.RawData.key);
                    this.UiMan().RefreshUi();
                }
            }
        }
        this.Xyyz.debug.FuncEndName(this.RemoveOneFromStorage.name);
    }
    DrawStorage() {
        this.Xyyz.debug.FuncStartName('DrawStorage');
        try {
            var ourData = this.__getAllLocalStorageAsIOneStorageData();
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
    GetRawFromStorageById(needleId) {
        this.Xyyz.debug.FuncStartName(this.GetRawFromStorageById.name, needleId.asString);
        var toReturn = null;
        var foundStorage = this.__getAllLocalStorageAsIOneStorageData();
        if (foundStorage) {
            for (var idx = 0; idx < foundStorage.length; idx++) {
                var candidate = foundStorage[idx];
            }
        }
        this.Xyyz.debug.FuncEndName(this.GetRawFromStorageById.name);
        return toReturn;
    }
    GetFromStorageById(needleId) {
        this.Xyyz.debug.FuncStartName(this.GetFromStorageById.name, needleId.asString);
        var foundStorage = this.GetAllStorageAsIDataOneWindow();
        var foundMatch = null;
        if (foundStorage) {
            for (var idx = 0; idx < foundStorage.length; idx++) {
                var candidate = foundStorage[idx];
                if (candidate.Id.asString === needleId.asString) {
                    foundMatch = candidate;
                    this.Xyyz.debug.Log('Found Match');
                    break;
                }
            }
        }
        this.Xyyz.debug.FuncEndName(this.GetFromStorageById.name);
        return foundMatch;
    }
}

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
        this.__ById('btnDrawLocalStorage').onclick = () => { this.AtticMan().DrawStorage(); };
        this.__ById('btnRemoveOneFromLocalStorage').onclick = () => { this.AtticMan().RemoveOneFromStorage(); };
        this.__ById('btnClearTextArea').onclick = () => { thisObj.Xyyz.debug.ClearTextArea(); };
        this.__ById(constId.btnUpdateNicknameB).onclick = () => { thisObj.Xyyz.AtticMan.UpdateNickname(); };
        this.__ById(constId.btnToggleFavoriteB).onclick = () => { thisObj.Xyyz.AtticMan.ToggleFavorite(); };
        this.__ById(constId.SelStateSnapShot).onchange = () => { thisObj.Xyyz.UiMan.SelectChanged(); };
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
            asString: val
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
        this.AtticMan = new AtticManager(this);
        this.UiMan = new UiManager(this);
        this.init();
        this.debug.FuncEndName(this.Start.name);
    }
    init() {
        this.debug.FuncStartName(Hub.constructor.name + ' ' + this.init.name);
        this.Const = InjectConst.const;
        this.EventMan.WireMenuButtons();
        this.OneWindowMan.CreateNewWindowSnapShot();
        this.UiMan.RefreshUi();
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
        this.Xyyz.debug.FuncStartName(this.SetHref.name, href + ' : ' + isFromTimeout + ' : ' + effortCount);
        this.Xyyz.PageData.WinDataParent.Opener.Window.location.href = href;
        if (isFromTimeout) {
            effortCount--;
        }
        else {
            effortCount = this.MaxAttempts;
        }
        if (this.Xyyz.PageData.WinDataParent.Opener.Window.location.href === href) {
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
        this.Xyyz.debug.FuncStartName(this.ChangeLocation.name, 'desired = ' + PageType[desiredPageType]);
        var currentState = this.Xyyz.PageData.GetCurrentPageType();
        if (currentState === PageType.LoginPage) {
            this.Xyyz.debug.Log('On Login page: ');
            this.AdminB();
            var self = this;
            setTimeout(function () {
                self.Xyyz.LocationMan.ChangeLocation(desiredPageType);
            }, 1000);
        }
        else if (currentState === PageType.Launchpad || currentState === PageType.ContentEditor || currentState === PageType.Desktop) {
            if (desiredPageType === PageType.Desktop && currentState !== PageType.Desktop) {
                this.SetHref(this.Xyyz.Const.Url.Desktop, function () { this.ChangeLocation(desiredPageType); }, null, null);
            }
            else if (desiredPageType === PageType.ContentEditor && currentState !== PageType.ContentEditor) {
                this.SetHref(this.Xyyz.Const.Url.ContentEditor, function () { this.ChangeLocation(desiredPageType); }, null, null);
            }
            else if (currentState === PageType.Desktop && desiredPageType === PageType.Desktop) {
                this.Xyyz.debug.Log('On Desktop');
                this.Xyyz.LocationMan.TriggerRedButton();
            }
        }
        this.Xyyz.debug.FuncEndName(this.Xyyz.LocationMan.ChangeLocation.name);
    }
    RedButton(iteration) {
        this.Xyyz.debug.FuncStartName(this.Xyyz.LocationMan.RedButton.name + ':' + iteration);
        var found = this.Xyyz.PageData.WinDataParent.Opener.Document.getElementById(this.Const().ElemId.StartButton.sc920);
        if (!found) {
            found = this.Xyyz.PageData.WinDataParent.Opener.Document.getElementById(this.Const().ElemId.StartButton.sc820);
        }
        this.Xyyz.debug.Log('Red Button: ' + found + '  ' + this.Xyyz.PageData.WinDataParent.Opener.Window.location.href + ' ' + iteration);
        if (found) {
            found.click();
            var menuLeft = this.Xyyz.PageData.WinDataParent.Opener.Document.querySelector('.scStartMenuLeftOption');
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
        var userNameElem = this.Xyyz.PageData.WinDataParent.Opener.Document.getElementById(this.Const().ElemId.scLoginUserName);
        var passwordElem = this.Xyyz.PageData.WinDataParent.Opener.Document.getElementById(this.Const().ElemId.scLoginPassword);
        this.Xyyz.debug.Log('userNameElem: ' + userNameElem);
        this.Xyyz.debug.Log('passwordElem: ' + passwordElem);
        userNameElem.setAttribute('value', 'admin');
        passwordElem.setAttribute('value', 'b');
        var candidate = this.Xyyz.PageData.WinDataParent.Opener.Document.getElementById(this.QkID().LoginBtn);
        this.Xyyz.debug.Log('candidate: ' + candidate);
        if (candidate) {
            candidate.click();
        }
        else {
            candidate = this.Xyyz.PageData.WinDataParent.Opener.Document.querySelector(this.QkSel().InputBtn2);
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
        this.Xyyz.debug.Log('looking for guid: ' + currentIteration + ' ' + lookingFor.asString);
        var foundOnPage = targetDoc.getElementById(lookingFor.asString);
        if (foundOnPage) {
            this.Xyyz.debug.Log('foundOnPage');
            this.__expandNode(foundOnPage);
        }
        else {
            if (currentIteration > 0) {
                this.Xyyz.debug.Log('not found on page...setting timeout: ' + timeout);
                var self = this;
                setTimeout(function () {
                    currentIteration = currentIteration - 1;
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
        this.Xyyz.debug.FuncStartName(this.RestoreCEState.name);
        var toReturn = false;
        this.Xyyz.debug.Log('Node Count: ' + storageData.AllTreeNodeAr.length);
        this.__collapseRootNode(targetDoc);
        for (var idx = 0; idx < storageData.AllTreeNodeAr.length; idx++) {
            var lookingFor = storageData.AllTreeNodeAr[idx].NodeId;
            this.WaitForNode(lookingFor, targetDoc, 5, this.Xyyz.Const.TimeoutWaitForNodeToLoad);
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
        this.AtticMan().DrawDebugDataPretty(null);
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
        this.Xyyz.debug.FuncStartName(this.DebugDataOneNode.name);
        var toReturn = dataOneTreeNode.NodeId.asString + ' ' + dataOneTreeNode.NodeFriendly;
        this.Xyyz.debug.FuncEndName(this.DebugDataOneNode.name);
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
    constructor(xyyz) {
        xyyz.debug.FuncStartName(OneDesktopManager.name);
        super(xyyz);
        xyyz.debug.FuncEndName(OneDesktopManager.name);
    }
    RestoreDesktopState(foundMatch) {
        var allExistingIframe = this.GetAllLiveIframeData();
    }
    GetAllLiveIframeData() {
        this.Xyyz.debug.FuncStartName(this.GetAllLiveIframeData.name);
        var toReturn = [];
        var iframeAr = this.Xyyz.PageData.WinDataParent.Opener.Document.querySelectorAll(this.Const().Selector.IframeContent);
        if (iframeAr) {
            this.Xyyz.debug.Log('iframeAr: ' + iframeAr.length);
            for (var ifrIdx = 0; ifrIdx < iframeAr.length; ifrIdx++) {
                this.Xyyz.debug.Log('pushing: ' + ifrIdx);
                var iframeElem = iframeAr[ifrIdx];
                var id = this.Guidman().ParseGuid(iframeElem.id);
                var dataOneIframe = {
                    Index: ifrIdx,
                    DocElem: null,
                    IframeElem: iframeElem,
                    Id: id
                };
                toReturn.push(dataOneIframe);
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
        var livingIframeAr = this.GetAllLiveIframeData();
        if (livingIframeAr && livingIframeAr.length > 0) {
            for (var iframeIdx = 0; iframeIdx < livingIframeAr.length; iframeIdx++) {
                this.Xyyz.debug.Log('iframeIdx: ' + iframeIdx);
                var targetIframeObj = livingIframeAr[iframeIdx];
                this.Xyyz.debug.Log('targetIframe: ' + JSON.stringify(targetIframeObj));
                this.Xyyz.OneCEMan.SaveStateOneContentEditor(targetIframeObj.Id, targetIframeObj.DocElem);
            }
        }
        this.Xyyz.debug.Log('done gathering tree data');
        this.AtticMan().DrawDebugDataPretty(null);
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
    SaveWindowState() {
        this.Xyyz.debug.FuncStartName(this.SaveWindowState.name);
        this.Xyyz.OneWindowMan.CreateNewWindowSnapShot();
        var currentPageType = this.Xyyz.PageData.GetCurrentPageType();
        if (currentPageType === PageType.ContentEditor) {
            this.Xyyz.debug.Log('is Content Editor');
            var id = this.Xyyz.GuidMan.EmptyGuid();
            var docElem = this.Xyyz.PageData.WinDataParent.Opener.Document;
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
    WaitForPageLoad(desiredPageType, targetWindow, iteration, successCallBack) {
        this.Xyyz.debug.FuncStartName(this.WaitForPageLoad.name, 'Iteration: ' + iteration);
        this.Xyyz.debug.Log('desired type: ' + PageType[desiredPageType]);
        var targetPageType = this.Xyyz.PageData.GetPageTypeOfTargetWindow(targetWindow.Window);
        if (targetPageType !== desiredPageType) {
            var self = this;
            if (iteration > 0) {
                iteration = iteration - 1;
                setTimeout(function () {
                    self.WaitForPageLoad(desiredPageType, targetWindow, iteration, successCallBack);
                }, 1000);
            }
        }
        else {
            successCallBack();
        }
        this.Xyyz.debug.FuncEndName(this.WaitForPageLoad.name);
    }
    RestoreWindowState(targetDoc, treeIdx) {
        this.Xyyz.debug.ClearTextArea();
        this.Xyyz.debug.FuncStartName(this.RestoreWindowState.name);
        var idOfSelect = this.UiMan().GetIdOfSelectWindowSnapshot();
        var foundMatch = this.AtticMan().GetFromStorageById(idOfSelect);
        if (foundMatch) {
            this.Xyyz.debug.Log('found match ' + foundMatch.TimeStamp);
            var newPage = this.Xyyz.PageData.WinDataParent.Opener.Window.open(this.Xyyz.PageData.WinDataParent.Opener.Window.location.href);
            var ChildPage = {
                Window: newPage
            };
            ChildPage.Window.location.href = this.Const().Url.ContentEditor;
            var self = this;
            this.WaitForPageLoad(PageType.ContentEditor, ChildPage, 10, function () {
                self.Xyyz.OneCEMan.RestoreCEState(foundMatch.AllCEAr[0], ChildPage.Window.document);
            });
        }
        else {
            this.Xyyz.debug.Error(this.RestoreWindowState.name, 'No match found for snap shot');
        }
        this.Xyyz.debug.FuncEndName(this.RestoreWindowState.name);
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
        this.AtticMan().DrawDebugDataPretty(this.__activeWindowSnapShot);
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
        this.AtticMan().WriteToStorage(this.__activeWindowSnapShot);
        this.UiMan().RefreshUi();
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
            NickName: '__',
            RawData: null
        };
        this.Xyyz.debug.FuncEndName('CreateNewWindowSnapShot');
    }
}

class UiManager extends ManagerBase {
    constructor(xyyz) {
        super(xyyz);
        this.__selectSnapshotIndex = 0;
        xyyz.debug.FuncStartName(UiManager.name);
        xyyz.debug.FuncEndName(UiManager.name);
    }
    SelectChanged() {
        this.Xyyz.debug.FuncStartName(this.SelectChanged.name);
        this.__selectSnapshotIndex = this.__getSelectElem().selectedIndex;
        this.Xyyz.debug.Log('new index :' + this.__selectSnapshotIndex);
        this.RefreshUi();
        this.Xyyz.debug.FuncEndName(this.SelectChanged.name);
    }
    RefreshUi() {
        this.Xyyz.debug.FuncStartName(this.DrawCorrectNicknameInUI.name);
        this.__populateStateSel();
        this.DrawCorrectNicknameInUI();
        this.Xyyz.debug.FuncEndName(this.DrawCorrectNicknameInUI.name);
    }
    DrawCorrectNicknameInUI() {
        this.Xyyz.debug.FuncStartName(this.DrawCorrectNicknameInUI.name);
        var targetId = this.UiMan().GetIdOfSelectWindowSnapshot();
        if (targetId) {
            this.Xyyz.debug.Log('targetId : ' + targetId.asString);
            var storageValue = this.AtticMan().GetFromStorageById(targetId);
            if (storageValue) {
                var inputElem = window.document.getElementById(this.Const().ElemId.InputNickname);
                if (inputElem) {
                    inputElem.value = storageValue.NickName;
                }
            }
        }
        this.Xyyz.debug.FuncEndName(this.DrawCorrectNicknameInUI.name);
    }
    GetValueInNickname() {
        var toReturn = '';
        toReturn = window.document.getElementById(this.Const().ElemId.InputNickname).value;
        return toReturn;
    }
    __getSelectElem() {
        return window.document.getElementById(this.Xyyz.Const.ElemId.SelStateSnapShot);
    }
    GetIdOfSelectWindowSnapshot() {
        var targetSel = this.__getSelectElem();
        var toReturn = null;
        if (targetSel) {
            var temp = targetSel.options[this.__selectSnapshotIndex].value;
            this.debug().Log('temp: ' + temp);
            toReturn = this.Guidman().ParseGuid(temp);
        }
        this.debug().Log('idOfSelect: ' + toReturn.asString);
        return toReturn;
    }
    __populateStateSel() {
        this.Xyyz.debug.FuncStartName(this.__populateStateSel.name, this.__selectSnapshotIndex.toString());
        var targetSel = this.__getSelectElem();
        if (targetSel) {
            var snapShots = this.AtticMan().GetAllStorageAsIDataOneWindow();
            if (snapShots && snapShots.length > 0) {
                targetSel.options.length = 0;
                this.Xyyz.debug.Log('targetSel.options.length : ' + targetSel.options.length);
                for (var idx = 0; idx < snapShots.length; idx++) {
                    var data = snapShots[idx];
                    this.Xyyz.debug.Log('data.Id.asString : ' + data.Id.asString);
                    var el = window.document.createElement('option');
                    el.textContent = this.Xyyz.Utilities.TimeNicknameFavStr(data);
                    el.value = data.Id.asString;
                    if (idx === this.__selectSnapshotIndex) {
                        el.selected = true;
                    }
                    targetSel.appendChild(el);
                }
            }
        }
        this.Xyyz.debug.FuncEndName(this.__populateStateSel.name);
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
