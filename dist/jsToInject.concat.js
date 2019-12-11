console.log('_ManagerBase loaded');
class ManagerBase {
    constructor(xyyz) {
        this.Xyyz = xyyz;
    }
    AtticMan() { return this.Xyyz.AtticMan; }
    Const() { return this.Xyyz.Const; }
    debug() { return this.Xyyz.debug; }
    GuidMan() { return this.Xyyz.GuidMan; }
    PageDataMan() { return this.Xyyz.PageDataMan; }
    UiMan() { return this.Xyyz.UiMan; }
    Utilites() { return this.Xyyz.Utilities; }
}
exports = ManagerBase;

console.log('IConst loaded');





console.log('InjectConst loaded');
class InjectConst {
}
InjectConst.const = {
    Numbers: {
        ShortGuidLength: 4,
    },
    Iterations: {
        MaxIterationLookingForNode: 10,
        MaxIterationPageLoad: 10,
        MaxIterationRedButton: 10,
        MaxSetHrefEffort: 10,
    },
    Timeouts: {
        TimeoutChangeLocation: 1000,
        TimeoutTriggerRedButton: 1500,
        TimeoutWaitForNodeToLoad: 500,
        WaitFogPageLoad: 1000,
        PostLoginBtnClick: 1000,
        SetHrefEffortWait: 1000,
    },
    ElemId: {
        BtnEdit: 'btnEdit',
        BtnRestoreWindowState: 'btnRestoreWindowState',
        BtnSaveWindowState: 'btnSaveWindowState',
        InputNickname: 'inputNickname',
        scLoginBtn: {
            sc920: 'LogInBtn',
            sc820: null
        },
        SelStateSnapShot: 'selState',
        textAreaFeedback: 'ta-feedback',
        SitecoreRootNodeId: 'Tree_Node_11111111111111111111111111111111',
        SitecoreRootGlyphId: 'Tree_Glyph_11111111111111111111111111111111',
        btnUpdateNicknameB: 'btnUpdateNickname',
        btnToggleFavoriteB: 'btnToggleFavorite',
        scLoginPassword: 'Password',
        scLoginUserName: 'UserName',
        HindSiteParentInfo: 'spanParentInfo',
        scStartButton: {
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
        LaunchPad: '/client/applications/launchpad',
    },
    Selector: {
        ContentTreeNodeGlyph: '.scContentTreeNodeGlyph',
        IframeContent: 'iframe[src*=content]',
        scLoginBtn: {
            sc920: null,
            sc820: 'input.btn',
        },
    },
    Storage: {
        WindowRoot: 'Xyyz.WindowSnapShot.'
    },
    TreeExpandedPng: 'treemenu_expanded.png',
    MaxIter: 100,
    GuidEmpty: '00000000-0000-0000-0000-000000000000',
    prop: {
        AllTreeData: 'AllTreeData',
    },
    Names: {
        HtmlToInject: 'HtmlToInject',
        StylesToInject: 'StylesToInject',
        TreeMenuExpandedPng: 'treemenu_expanded.png',
        TreeMenuCollapsedPng: 'treemenu_collapsed.png',
        scDefaultAdminPassword: 'b',
        scDefaultAdminUserName: 'admin',
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
    Log(text, optionalValue = '') {
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
    CtorName(ctorName) {
        this.Log('Constructor: ' + ctorName);
    }
    FuncStart(textOrFunc, optionalValue = '') {
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
    FuncEnd(text, optionalValue = '') {
        text = 'e) ' + text;
        if (optionalValue.length > 0) {
            text = text + ' : ' + optionalValue;
        }
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
        return document.getElementById(this.Const().ElemId.textAreaFeedback);
    }
    ClearTextArea() {
        var ta = this.__getTextArea();
        if (ta) {
            ta.value = '';
        }
        else {
            this.debug().Error(FeedbackManager.name, 'No text area found');
        }
    }
    WriteLine(text) {
        var ta = this.__getTextArea();
        if (ta) {
            ta.value += text + '\\n';
        }
    }
}

class Utilities extends ManagerBase {
    TimeNicknameFavStr(data) {
        return this.MakeFriendlyDate(data.TimeStamp) + ' - ' + data.NickName + ' - ' + (data.IsFavorite ? 'Favorite' : '--');
    }
    constructor(xyyz) {
        super(xyyz);
        xyyz.debug.FuncStart(Utilities.name);
        xyyz.debug.FuncEnd(Utilities.name);
    }
    MakeFriendlyDate(date) {
        var toReturn = date.toDateString() + ' ' + date.toLocaleTimeString();
        return toReturn;
    }
}


var ChildWindowDest;
(function (ChildWindowDest) {
    ChildWindowDest[ChildWindowDest['Unknown'] = 0] = 'Unknown';
    ChildWindowDest[ChildWindowDest['Self'] = 1] = 'Self';
    ChildWindowDest[ChildWindowDest['New'] = 2] = 'New';
})(ChildWindowDest || (ChildWindowDest = {}));

var WindowType;
(function (WindowType) {
    WindowType[WindowType['Unknown'] = 0] = 'Unknown';
    WindowType[WindowType['LoginPage'] = 1] = 'LoginPage';
    WindowType[WindowType['Desktop'] = 2] = 'Desktop';
    WindowType[WindowType['ContentEditor'] = 3] = 'ContentEditor';
    WindowType[WindowType['Launchpad'] = 4] = 'Launchpad';
})(WindowType || (WindowType = {}));

class AtticManager extends ManagerBase {
    constructor(xyyz) {
        super(xyyz);
        xyyz.debug.FuncStart(AtticManager.name);
        xyyz.debug.FuncEnd(AtticManager.name);
    }
    Init() {
        this.eventAwesome = new CustomEvent('awesome', { detail: 'some detail' });
    }
    functioneventHandler(e) {
        console.log('this data is ' + e.detail);
    }
    UpdateNickname() {
        this.debug().FuncStart(this.UpdateNickname);
        var targetId = this.UiMan().GetIdOfSelectWindowSnapshot();
        if (targetId) {
            var storageMatch = this.GetFromStorageById(targetId);
            if (storageMatch) {
                var newNickname = this.UiMan().GetValueInNickname();
                storageMatch.NickName = newNickname;
                this.WriteToStorage(storageMatch);
            }
        }
        this.debug().FuncEnd(this.UpdateNickname);
    }
    ToggleFavorite() {
        this.debug().FuncStart(this.ToggleFavorite.name);
        var targetId = this.UiMan().GetIdOfSelectWindowSnapshot();
        if (targetId) {
            var storageMatch = this.GetFromStorageById(targetId);
            if (storageMatch) {
                storageMatch.IsFavorite = !storageMatch.IsFavorite;
                this.WriteToStorage(storageMatch);
            }
        }
        this.debug().FuncEnd(this.ToggleFavorite.name);
    }
    DrawDebugDataPretty(source) {
        var allDebugData = this.__buildDebugDataPretty(source);
        for (var ldx = 0; ldx < allDebugData.length; ldx++) {
            this.Xyyz.FeedbackMan.WriteLine(allDebugData[ldx]);
        }
    }
    __buildDebugDataPretty(dataOneWindow) {
        this.debug().FuncStart(this.__buildDebugDataPretty.name, (dataOneWindow !== null).toString());
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
            this.debug().FuncEnd(this.__buildDebugDataPretty.name);
        }
        else {
            this.debug().Error(this.__buildDebugDataPretty.name, 'missing data');
        }
        return toReturn;
    }
    __drawStorageRaw(ourData) {
        this.debug().FuncStart('DrawStorageRaw');
        for (var idx = 0; idx < ourData.length; idx++) {
            this.debug().Log('key: \t' + ourData[idx].key);
            this.debug().Log('data: \t' + ourData[idx].data);
            this.debug().Log('------------');
        }
        this.debug().FuncEnd('DrawStorageRaw');
    }
    __drawStoragePretty(ourData) {
        this.debug().FuncStart('DrawStoragePretty');
        this.Xyyz.FeedbackMan.ClearTextArea();
        for (var idx = 0; idx < ourData.length; idx++) {
            this.debug().Log('key: \t' + ourData[idx].key);
            var parsed = JSON.parse(ourData[idx].data);
            if (parsed) {
                this.DrawDebugDataPretty(parsed);
                this.debug().Log('------------');
            }
        }
        this.debug().FuncEnd('DrawStoragePretty');
    }
    __getAllLocalStorageAsIOneStorageData() {
        this.debug().FuncStart('__GetAllLocalStorage ');
        var toReturn = [];
        for (var idx = 0; idx < window.localStorage.length; idx++) {
            var candidate = {
                data: '',
                key: '',
            };
            candidate.key = window.localStorage.key(idx);
            if (candidate.key.startsWith(this.Const().Storage.WindowRoot)) {
                this.debug().Log('candidate.key: ' + candidate.key);
                candidate.data = window.localStorage.getItem(candidate.key);
                toReturn.push(candidate);
            }
        }
        this.debug().FuncEnd('__GetAllLocalStorage ');
        return toReturn;
    }
    WriteToStorage(dataOneWindow) {
        this.debug().FuncStart(this.WriteToStorage);
        var snapShotAsString = JSON.stringify(dataOneWindow);
        this.debug().Log('snapShotAsString: ' + snapShotAsString);
        window.localStorage.setItem(this.Const().Storage.WindowRoot + dataOneWindow.Id.asString, snapShotAsString);
        this.UiMan().RefreshUi();
        this.debug().FuncEnd(this.WriteToStorage.name);
    }
    GetAllStorageAsIDataOneWindow() {
        this.debug().FuncStart(this.GetAllStorageAsIDataOneWindow.name);
        var toReturn = [];
        var rawStorageData = this.__getAllLocalStorageAsIOneStorageData();
        if (rawStorageData) {
            for (var idx = 0; idx < rawStorageData.length; idx++) {
                var oneRaw = rawStorageData[idx];
                var candidate = JSON.parse(oneRaw.data);
                if (candidate) {
                    this.debug().Log('candidate.AllCEAr.length : ' + candidate.AllCEAr.length);
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
        this.debug().FuncEnd(this.GetAllStorageAsIDataOneWindow.name);
        return toReturn;
    }
    RemoveOneFromStorage() {
        this.debug().FuncStart(this.RemoveOneFromStorage.name);
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
        this.debug().FuncEnd(this.RemoveOneFromStorage.name);
    }
    DrawStorage() {
        this.debug().FuncStart('DrawStorage');
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
        this.debug().FuncEnd('DrawStorage');
    }
    GetRawFromStorageById(needleId) {
        this.debug().FuncStart(this.GetRawFromStorageById.name, needleId.asString);
        var toReturn = null;
        var foundStorage = this.__getAllLocalStorageAsIOneStorageData();
        if (foundStorage) {
            for (var idx = 0; idx < foundStorage.length; idx++) {
                var candidate = foundStorage[idx];
            }
        }
        this.debug().FuncEnd(this.GetRawFromStorageById.name);
        return toReturn;
    }
    GetFromStorageById(needleId) {
        this.debug().FuncStart(this.GetFromStorageById.name, needleId.asString);
        var foundStorage = this.GetAllStorageAsIDataOneWindow();
        var DateOneWinStoreMatch = null;
        if (foundStorage) {
            for (var idx = 0; idx < foundStorage.length; idx++) {
                var candidate = foundStorage[idx];
                if (candidate.Id.asString === needleId.asString) {
                    DateOneWinStoreMatch = candidate;
                    break;
                }
            }
        }
        if (DateOneWinStoreMatch) {
            this.debug().Log('found match', this.Utilites().TimeNicknameFavStr(DateOneWinStoreMatch));
        }
        else {
            this.debug().Error(this.GetFromStorageById.name, 'Match notfound');
        }
        this.debug().FuncEnd(this.GetFromStorageById.name);
        return DateOneWinStoreMatch;
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
    Init() {
        this.__wireMenuButtons();
    }
    __wireMenuButtons() {
        this.debug().FuncStart(EventManager.name + ' ' + this.__wireMenuButtons.name);
        var thisObj = this;
        var locMan = thisObj.Xyyz.LocationMan;
        var constId = this.Const().ElemId;
        this.__ById(this.Const().ElemId.BtnEdit).onclick = () => { locMan.SetScMode('edit'); };
        this.__ById('btnPrev').onclick = () => { locMan.SetScMode('preview'); };
        this.__ById('btnNorm').onclick = () => { locMan.SetScMode('normal'); };
        this.__ById('btnAdminB').onclick = () => { locMan.AdminB(this.PageDataMan().GetParentWindow().DataDocSelf, null); };
        this.__ById('btnDesktop').onclick = () => { this.debug().ClearTextArea(); locMan.ChangeLocationSwitchBoard(WindowType.Desktop, this.PageDataMan().GetParentWindow()); };
        this.__ById('btnCE').onclick = () => { this.debug().ClearTextArea(); locMan.ChangeLocationSwitchBoard(WindowType.ContentEditor, this.PageDataMan().GetParentWindow()); };
        this.__ById(constId.BtnSaveWindowState).onclick = () => { thisObj.Xyyz.OneWindowMan.SaveWindowState(this.PageDataMan().GetParentWindow()); };
        this.__ById('btnDrawLocalStorage').onclick = () => { this.AtticMan().DrawStorage(); };
        this.__ById('btnRemoveOneFromLocalStorage').onclick = () => { this.AtticMan().RemoveOneFromStorage(); };
        this.__ById('btnClearTextArea').onclick = () => { thisObj.Xyyz.debug.ClearTextArea(); };
        this.__ById(constId.btnUpdateNicknameB).onclick = () => { thisObj.Xyyz.AtticMan.UpdateNickname(); };
        this.__ById(constId.btnToggleFavoriteB).onclick = () => { thisObj.Xyyz.AtticMan.ToggleFavorite(); };
        this.__ById(constId.BtnRestoreWindowState).onclick = (evt) => { this._handlerRestoreClick(evt); };
        this.__ById(constId.SelStateSnapShot).onchange = () => { thisObj.Xyyz.UiMan.SelectChanged(); };
        this.__ById(constId.SelStateSnapShot).ondblclick = (evt) => { this._handlerRestoreClick(evt); };
        this.debug().FuncEnd(this.__wireMenuButtons.name);
    }
    ;
    _getTargetWindow(evt, callbackOnLoaded) {
        var targetWindow;
        if (evt.ctrlKey) {
            targetWindow = this.PageDataMan().GetParentWindow();
            this.debug().Log('targetWindow id: ' + targetWindow.DataDocSelf.Id.asString);
            callbackOnLoaded(targetWindow);
        }
        else {
            targetWindow = this.PageDataMan().OpenNewBrowserWindow();
            var self = this;
            targetWindow.Window.addEventListener('load', function () {
                self.debug().Log('targetWindow id: ' + targetWindow.DataDocSelf.Id.asString);
                targetWindow.DataDocSelf.DataWinParent = targetWindow;
                targetWindow.DataDocSelf.Document = targetWindow.Window.document;
                console.log(targetWindow.DataDocSelf.Document.body.innerHTML);
                callbackOnLoaded(targetWindow);
            }, false);
        }
        targetWindow.WindowType = WindowType.ContentEditor;
        return targetWindow;
    }
    _handlerRestoreClick(evt) {
        this.debug().ClearTextArea();
        this.debug().FuncStart(this._handlerRestoreClick.name);
        var idOfSelect = this.UiMan().GetIdOfSelectWindowSnapshot();
        var dataOneWindowStorage = this.AtticMan().GetFromStorageById(idOfSelect);
        var self = this;
        var callbackOnLoaded = (targetWindow) => {
            self.debug().Log('Page loaded callback ' + (targetWindow.Window.location.href));
            self.Xyyz.OneWindowMan.RestoreWindowStateToTarget(targetWindow, dataOneWindowStorage);
        };
        this._getTargetWindow(evt, callbackOnLoaded);
        this.debug().FuncEnd(this._handlerRestoreClick.name);
    }
}

class GuidManager extends ManagerBase {
    constructor(xyyz) {
        super(xyyz);
    }
    EmptyGuid() {
        return this.ParseGuid(this.Const().GuidEmpty);
    }
    NewGuid() {
        var toReturn;
        var temp = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            var toReturn = v.toString(16);
            return toReturn;
        });
        toReturn = this.ParseGuid(temp);
        return toReturn;
    }
    ShortGuid(Id) {
        var toReturn = '{error}';
        if (Id && Id.asString.length > this.Const().Numbers.ShortGuidLength) {
            toReturn = Id.asString.substr(0, this.Const().Numbers.ShortGuidLength);
        }
        return toReturn;
    }
    ParseGuid(val) {
        let toReturn = {
            asString: val,
            asShort: ''
        };
        toReturn.asShort = this.ShortGuid(toReturn);
        return toReturn;
    }
}

class Hub {
    constructor() {
        this.debug = new Debug(window.opener);
        this.debug.FuncStart(Hub.name);
        this.Start();
        this.debug.FuncEnd(Hub.name);
    }
    Start() {
        this.debug.FuncStart(this.Start.name);
        console.log('marker A');
        this.PageDataMan = new PageDataManager(this);
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
        this.debug.FuncEnd(this.Start.name);
    }
    init() {
        this.debug.FuncStart(Hub.constructor.name + ' ' + this.init.name);
        this.Const = InjectConst.const;
        this.EventMan.Init();
        this.PageDataMan.Init();
        this.OneWindowMan.Init();
        this.UiMan.RefreshUi();
        this.debug.FuncEnd(Hub.constructor.name + ' ' + this.init.name);
    }
}

class LocationManager extends ManagerBase {
    constructor(xyyz) {
        super(xyyz);
        xyyz.debug.FuncStart(LocationManager.name);
        this.EffortWait = 1000;
        xyyz.debug.FuncEnd(LocationManager.name);
    }
    SetHref(href, callback, targetWindow, effortCount = this.Const().Iterations.MaxSetHrefEffort) {
        this.debug().FuncStart(this.SetHref.name, href + ' : ' + effortCount + ' : has callback? ' + (callback !== null));
        effortCount -= 1;
        var isCorrectHref = targetWindow.Window.location.href = href;
        var isReadyState = targetWindow.DataDocSelf.Document.readyState === 'complete';
        if (effortCount > 0) {
            if (isCorrectHref && isReadyState) {
                this.debug().Log('triggering callback');
                callback();
            }
            else {
                if (!isCorrectHref) {
                    targetWindow.Window.location.href !== href;
                }
                var self = this;
                setTimeout(function () {
                    this.debug().Log('setting timeout');
                    self.SetHref(href, callback, targetWindow, effortCount);
                }, self.Const().Timeouts.SetHrefEffortWait);
            }
        }
        else {
            this.debug().Log('changing href unsuccessful. Dying');
        }
        this.debug().FuncEnd(this.SetHref.name);
    }
    ChangeLocationSwitchBoard(desiredPageType, targetWindow, iteration = 20) {
        this.debug().FuncStart(this.ChangeLocationSwitchBoard.name, 'desired = ' + WindowType[desiredPageType] + ' iteration: ' + iteration);
        if (iteration > 0) {
            iteration -= 1;
            var currentState = this.PageDataMan().GetCurrentPageType();
            if (currentState === WindowType.LoginPage) {
                var self = this;
                var callbackOnComplete = () => {
                    this.debug().Log('callback triggered');
                    self.ChangeLocationSwitchBoard(desiredPageType, targetWindow, iteration);
                };
                this.AdminB(targetWindow.DataDocSelf, callbackOnComplete);
                var self = this;
            }
            else if (currentState === WindowType.Launchpad || currentState === WindowType.ContentEditor || currentState === WindowType.Desktop) {
                var self = this;
                var callBackOnSuccessfulHrefChange = function () {
                    self.debug().Log('Callback triggered');
                    targetWindow = self.PageDataMan().SetWindowDataToCurrent(targetWindow.Window);
                    self.ChangeLocationSwitchBoard(desiredPageType, targetWindow, iteration);
                };
                if (desiredPageType === WindowType.Desktop && currentState !== WindowType.Desktop) {
                    this.SetHref(this.Const().Url.Desktop, callBackOnSuccessfulHrefChange, targetWindow);
                }
                else if (desiredPageType === WindowType.ContentEditor && currentState !== WindowType.ContentEditor) {
                    this.SetHref(this.Const().Url.ContentEditor, callBackOnSuccessfulHrefChange, targetWindow);
                }
                else if (currentState === WindowType.Desktop && desiredPageType === WindowType.Desktop) {
                    this.debug().Log('On Desktop');
                    this.Xyyz.LocationMan.TriggerRedButton(targetWindow.DataDocSelf);
                }
            }
        }
        this.debug().FuncEnd(this.Xyyz.LocationMan.ChangeLocationSwitchBoard.name);
    }
    GetBigRedButtonElem(targetDoc) {
        var toReturn = targetDoc.Document.getElementById(this.Const().ElemId.scStartButton.sc920);
        if (!toReturn) {
            toReturn = targetDoc.Document.getElementById(this.Const().ElemId.scStartButton.sc820);
        }
        return toReturn;
    }
    RedButton(iteration, targetDoc) {
        this.debug().FuncStart(this.RedButton.name, iteration.toString());
        iteration = iteration - 1;
        if (iteration > 0) {
            var found = this.GetBigRedButtonElem(targetDoc);
            if (found) {
                this.debug().Log('clicking it');
                found.click();
                var menuLeft = targetDoc.Document.querySelector('.scStartMenuLeftOption');
                if (menuLeft) {
                    menuLeft.click();
                }
            }
            else {
                var self = this;
                setTimeout(function () {
                    self.Xyyz.LocationMan.RedButton(iteration, targetDoc);
                }, self.Const().Timeouts.TimeoutTriggerRedButton);
            }
        }
        this.debug().FuncEnd(this.RedButton.name);
    }
    TriggerRedButton(targetDoc) {
        this.debug().FuncStart(this.Xyyz.LocationMan.TriggerRedButton.name);
        var self = this;
        setTimeout(function () {
            self.Xyyz.LocationMan.RedButton(self.Const().Iterations.MaxIterationRedButton, targetDoc);
        }, self.Const().Timeouts.TimeoutTriggerRedButton);
        this.debug().FuncEnd(this.Xyyz.LocationMan.TriggerRedButton.name);
    }
    SetScMode(newValue) {
        var newValueB = '=' + newValue;
        window.opener.location.href = window.opener.location.href.replace('=normal', newValueB).replace('=preview', newValueB).replace('=edit', newValueB);
    }
    GetLoginButton(targetDoc) {
        this.debug().FuncStart(this.GetLoginButton.name);
        var toReturn = targetDoc.Document.getElementById(this.Const().ElemId.scLoginBtn.sc920);
        if (!toReturn) {
            toReturn = targetDoc.Document.querySelector(this.Const().Selector.scLoginBtn.sc820);
        }
        this.debug().Log('toReturn: ' + toReturn);
        this.debug().FuncEnd(this.GetLoginButton.name);
        return toReturn;
    }
    AdminB(targetDoc, callbackOnComplete) {
        this.debug().FuncStart(this.AdminB.name, 'targetDoc: ' + targetDoc.Id.asShort);
        this.debug().Log('callback passed: ' + (callbackOnComplete !== null));
        var userNameElem = targetDoc.Document.getElementById(this.Const().ElemId.scLoginUserName);
        var passwordElem = targetDoc.Document.getElementById(this.Const().ElemId.scLoginPassword);
        this.debug().Log('userNameElem: ' + userNameElem);
        this.debug().Log('passwordElem: ' + passwordElem);
        userNameElem.setAttribute('value', this.Const().Names.scDefaultAdminUserName);
        passwordElem.setAttribute('value', this.Const().Names.scDefaultAdminPassword);
        var loginButton = this.GetLoginButton(targetDoc);
        if (loginButton) {
            this.debug().Log('clicking');
            loginButton.click();
            if (callbackOnComplete) {
                this.debug().Log('Triggering callback');
                setTimeout(callbackOnComplete, this.Const().Timeouts.PostLoginBtnClick);
            }
            else {
                this.debug().Log('no callback passed');
            }
        }
        else {
            this.debug().Error(this.AdminB.name, 'No loginButton');
        }
        this.debug().FuncEnd(this.AdminB.name);
    }
    QkID() {
        return this.Const().ElemId;
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
    WaitForNode(needleId, targetDoc, currentIteration, timeout, callbackOnComplete) {
        this.debug().FuncStart(this.WaitForNode.name, 'looking for guid: iter: ' + currentIteration + ' ' + needleId.asString + ' on ' + this.GuidMan().ShortGuid(targetDoc.Id));
        currentIteration--;
        var foundOnPage = targetDoc.Document.getElementById(needleId.asString);
        if (foundOnPage) {
            this.debug().Log('foundOnPage. Triggering callback on complete');
            this.__expandNode(foundOnPage);
            callbackOnComplete(foundOnPage);
        }
        else {
            if (currentIteration > 0) {
                this.debug().Log('not found on page...setting timeout: ' + timeout);
                var self = this;
                setTimeout(function () {
                    currentIteration = currentIteration - 1;
                    self.WaitForNode(needleId, targetDoc, currentIteration, timeout, callbackOnComplete);
                }, timeout);
            }
            else {
                this.debug().Log('Not Found. Triggering callback on complete');
                callbackOnComplete(null);
            }
        }
        this.debug().FuncEnd(this.WaitForNode.name);
    }
    __expandNode(foundOnPage) {
        this.debug().FuncStart(this.__expandNode.name);
        var currentSrc = foundOnPage.getAttribute('src');
        this.debug().Log('currentSrc' + currentSrc);
        if (currentSrc.indexOf(this.Const().Names.TreeMenuExpandedPng) < 0) {
            this.debug().Log('clicking it');
            foundOnPage.click();
        }
        this.debug().FuncEnd(this.__expandNode.name);
    }
    __collapseNode(element) {
        var currentSrc = element.getAttribute('src');
        this.debug().Log('currentSrc' + currentSrc);
        if (currentSrc.indexOf(this.Const().Names.TreeMenuExpandedPng) > -1) {
            this.debug().Log('clicking it');
            element.click();
        }
    }
    __collapseRootNode(targetCEDoc) {
        var rootElem = targetCEDoc.Document.getElementById(this.Const().ElemId.SitecoreRootGlyphId);
        if (rootElem) {
            this.__collapseNode(rootElem);
        }
        else {
            this.debug().Error(this.__collapseRootNode.name, 'Root glyph not found ' + this.Const().ElemId.SitecoreRootGlyphId);
        }
    }
    RestoreOneNodeAtATimeRecursive(storageData, dataOneDocTarget, nodeIteration, callBackOnNoNodesLeft) {
        this.debug().FuncStart(this.RestoreOneNodeAtATimeRecursive.name, nodeIteration.toString());
        nodeIteration--;
        while (storageData.AllTreeNodeAr.length > 0 && nodeIteration > 0) {
            var nextNode = storageData.AllTreeNodeAr.shift();
            var lookingFor = nextNode.NodeId;
            var self = this;
            var callbackOnNodeSearchComplete = function () {
                self.RestoreOneNodeAtATimeRecursive(storageData, dataOneDocTarget, nodeIteration, callBackOnNoNodesLeft);
            };
            this.WaitForNode(lookingFor, dataOneDocTarget, this.Const().Iterations.MaxIterationLookingForNode, this.Const().Timeouts.TimeoutWaitForNodeToLoad, callbackOnNodeSearchComplete);
        }
        callBackOnNoNodesLeft();
        this.debug().FuncEnd(this.RestoreOneNodeAtATimeRecursive.name);
    }
    RestoreCEState(storageData, dataOneDocTarget) {
        this.debug().FuncStart(this.RestoreCEState.name, this.GuidMan().ShortGuid(dataOneDocTarget.Id));
        var toReturn = false;
        this.debug().Log('Node Count in storage data: ' + storageData.AllTreeNodeAr.length);
        this.__collapseRootNode(dataOneDocTarget);
        const maxIteration = this.Const().Iterations.MaxIterationLookingForNode;
        const timeout = this.Const().Timeouts.TimeoutWaitForNodeToLoad;
        var callBackOnSuccess = function () {
        };
        this.RestoreOneNodeAtATimeRecursive(storageData, dataOneDocTarget, 100, callBackOnSuccess);
        this.debug().FuncEnd(this.RestoreCEState.name);
        return toReturn;
    }
    SaveStateOneContentEditor(id, dataOneDoc) {
        this.debug().FuncStart('SaveOneContentEditor');
        this.debug().Log('SaveOneContentEditor');
        ;
        this.debug().Log('docElem is null: ' + (dataOneDoc === null));
        ;
        var CeSnapShot = this.Xyyz.OneCEMan.MakeNewData(id);
        CeSnapShot.AllTreeNodeAr = this.Xyyz.OneTreeMan.GetOneLiveTreeData(CeSnapShot, dataOneDoc);
        this.AtticMan().DrawDebugDataPretty(null);
        this.Xyyz.OneWindowMan.PutCEDataToCurrentSnapShot(CeSnapShot);
        this.debug().FuncEnd('SaveOneContentEditor');
    }
    MakeNewData(id) {
        this.debug().FuncStart('MakeNewData: ' + id);
        var toReturn = {
            Id: id,
            AllTreeNodeAr: []
        };
        this.debug().FuncEnd('MakeNewData: ' + id);
        return toReturn;
    }
    DebugDataOneNode(dataOneTreeNode) {
        this.debug().FuncStart(this.DebugDataOneNode.name);
        var toReturn = dataOneTreeNode.NodeId.asString + ' ' + dataOneTreeNode.NodeFriendly;
        this.debug().FuncEnd(this.DebugDataOneNode.name);
        return toReturn;
    }
    GetDebugDataOneCE(dataOneCe) {
        this.debug().FuncStart('GetDebugDataOneCE');
        var toReturn = [];
        toReturn.push('------ All Tree Nodes -----');
        for (var idx = 0; idx < dataOneCe.AllTreeNodeAr.length; idx++) {
            this.debug().Log('idx: ' + idx);
            var oneVal = this.DebugDataOneNode(dataOneCe.AllTreeNodeAr[idx]);
            this.debug().Log('oneVal : ' + oneVal);
            toReturn.push(oneVal);
        }
        this.debug().FuncEnd(this.GetDebugDataOneCE.name);
        return toReturn;
    }
}

console.log('ManyTrees loaded');
class OneDesktopManager extends ManagerBase {
    constructor(xyyz) {
        xyyz.debug.FuncStart(OneDesktopManager.name);
        super(xyyz);
        xyyz.debug.FuncEnd(OneDesktopManager.name);
    }
    RestoreDesktopState(foundMatch) {
    }
    GetAllLiveIframeData(targetWindow) {
        this.debug().FuncStart(this.GetAllLiveIframeData.name);
        var toReturn = [];
        var iframeAr = targetWindow.DataDocSelf.Document.querySelectorAll(this.Const().Selector.IframeContent);
        if (iframeAr) {
            this.debug().Log('iframeAr: ' + iframeAr.length);
            for (var ifrIdx = 0; ifrIdx < iframeAr.length; ifrIdx++) {
                this.debug().Log('pushing: ' + ifrIdx);
                var iframeElem = iframeAr[ifrIdx];
                var id = this.GuidMan().ParseGuid(iframeElem.id);
                var dataOneIframe = {
                    Index: ifrIdx,
                    DocElem: null,
                    IframeElem: iframeElem,
                    Id: id
                };
                toReturn.push(dataOneIframe);
            }
        }
        this.debug().FuncEnd(this.GetAllLiveIframeData.name + ' ' + toReturn.length);
        return toReturn;
    }
    SaveStateOneDesktop(targetWindow) {
        this.debug().FuncStart(this.SaveStateOneDesktop.name);
        ;
        this.debug().FuncStart('SaveOneDesktop');
        ;
        var livingIframeAr = this.GetAllLiveIframeData(targetWindow);
        if (livingIframeAr && livingIframeAr.length > 0) {
            for (var iframeIdx = 0; iframeIdx < livingIframeAr.length; iframeIdx++) {
                this.debug().Log('iframeIdx: ' + iframeIdx);
                var targetIframeObj = livingIframeAr[iframeIdx];
                this.debug().Log('targetIframe: ' + JSON.stringify(targetIframeObj));
                this.Xyyz.OneCEMan.SaveStateOneContentEditor(targetIframeObj.Id, targetIframeObj.DocElem);
            }
        }
        this.debug().Log('done gathering tree data');
        this.AtticMan().DrawDebugDataPretty(null);
        this.debug().FuncEnd(this.SaveStateOneDesktop.name);
    }
}
;

class OneWindowManager extends ManagerBase {
    constructor(xyyz) {
        super(xyyz);
        xyyz.debug.FuncStart(OneWindowManager.name);
        xyyz.debug.FuncEnd(OneWindowManager.name);
    }
    SaveWindowState(targetWindow) {
        this.debug().FuncStart(this.SaveWindowState.name);
        this.Xyyz.OneWindowMan.CreateNewWindowSnapShot();
        var currentPageType = this.PageDataMan().GetCurrentPageType();
        if (currentPageType === WindowType.ContentEditor) {
            this.debug().Log('is Content Editor');
            var id = this.Xyyz.GuidMan.EmptyGuid();
            var docElem = targetWindow.DataDocSelf;
            this.Xyyz.OneCEMan.SaveStateOneContentEditor(id, targetWindow.DataDocSelf);
        }
        else if (currentPageType === WindowType.Desktop) {
            this.debug().Log('is Desktop');
            this.Xyyz.OneDesktopMan.SaveStateOneDesktop(targetWindow);
        }
        else {
            this.debug().Error(this.SaveWindowState.name, 'Invalid page location ' + currentPageType);
        }
        this.debug().FuncEnd(this.SaveWindowState.name);
        ;
    }
    RestoreWindowStateToTarget(targetWindow, dataToREstore) {
        this.debug().FuncStart(this.RestoreWindowStateToTarget.name);
        if (dataToREstore) {
            this.Xyyz.OneCEMan.RestoreCEState(dataToREstore.AllCEAr[0], targetWindow.DataDocSelf);
        }
        else {
            this.debug().Error(this.RestoreWindowStateToTarget.name, 'No match found for snap shot');
        }
        this.debug().FuncEnd(this.RestoreWindowStateToTarget.name);
    }
    PutCEDataToCurrentSnapShot(oneCeData) {
        this.debug().FuncStart(this.PutCEDataToCurrentSnapShot.name);
        this.debug().Log('PutCEDataToCurrentSnapShot');
        var matchingCeData = this.FindMatchingCeData(oneCeData);
        if (matchingCeData) {
            matchingCeData = oneCeData;
        }
        else {
            this.__activeWindowSnapShot.AllCEAr.push(oneCeData);
        }
        this.UpdateStorage();
        this.AtticMan().DrawDebugDataPretty(this.__activeWindowSnapShot);
        this.debug().FuncEnd(this.PutCEDataToCurrentSnapShot.name);
    }
    ShowDebugDataOneWindow() {
        this.debug().FuncStart('ShowDebugDataOneWindow');
        var toReturn = [];
        toReturn.push(this.__activeWindowSnapShot.TimeStamp.toJSON());
        for (var jdx = 0; jdx < this.__activeWindowSnapShot.AllCEAr.length; jdx++) {
            var oneCE = this.__activeWindowSnapShot.AllCEAr[jdx];
            toReturn = toReturn.concat(this.Xyyz.OneCEMan.GetDebugDataOneCE(oneCE));
        }
        for (var kdx = 0; kdx < toReturn.length; kdx++) {
            this.debug().Log(toReturn[kdx]);
        }
        this.debug().FuncEnd('ShowDebugDataOneWindow');
        return toReturn;
    }
    UpdateStorage() {
        this.debug().FuncStart('UpdateStorage');
        this.AtticMan().WriteToStorage(this.__activeWindowSnapShot);
        this.UiMan().RefreshUi();
        this.debug().FuncEnd('UpdateStorage');
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
        this.debug().Log('match found :' + (toReturn !== null));
        return toReturn;
    }
    Init() {
        this.CreateNewWindowSnapShot();
    }
    CreateNewWindowSnapShot() {
        this.debug().FuncStart('CreateNewWindowSnapShot');
        var dateToUse = new Date();
        var newGuid = this.Xyyz.GuidMan.NewGuid();
        this.__activeWindowSnapShot = {
            TimeStamp: dateToUse,
            AllCEAr: [],
            Id: newGuid,
            IsFavorite: false,
            NickName: '__',
            RawData: null
        };
        this.debug().FuncEnd('CreateNewWindowSnapShot');
    }
}

class PageDataManager extends ManagerBase {
    constructor(xyyz) {
        super(xyyz);
        this.debug().CtorName(this.constructor.name);
    }
    SetWindowDataToCurrent(window) {
        var toReturn = {
            Friendly: 'New Tab',
            Window: window,
            WindowType: WindowType.Unknown,
            DataDocSelf: {
                DataWinParent: null,
                Document: window.document,
                HasParentDesktop: false,
                Id: this.GuidMan().NewGuid(),
                IsCEDoc: false,
                ParentDesktop: null
            },
        };
        toReturn.DataDocSelf.DataWinParent = toReturn;
        return toReturn;
    }
    GetParentWindow() {
        return this.__winDataParent;
    }
    OpenNewBrowserWindow() {
        this.debug().FuncStart(this.OpenNewBrowserWindow.name);
        var newWindowUrl = this.PageDataMan().__winDataParent.Window.location.href;
        var newWindow = this.__winDataParent.Window.open(newWindowUrl);
        var toReturn = this.SetWindowDataToCurrent(newWindow);
        this.debug().FuncEnd(this.OpenNewBrowserWindow.name + ' : ' + toReturn.DataDocSelf.Id.asString);
        return toReturn;
    }
    Init() {
        this.debug().FuncStart(this.Init.name);
        if (window.opener) {
            this.__winDataParent = {
                Window: window.opener,
                Friendly: 'Parent Window',
                WindowType: WindowType.Unknown,
                DataDocSelf: {
                    DataWinParent: null,
                    Document: (window.opener).document,
                    HasParentDesktop: false,
                    Id: this.GuidMan().NewGuid(),
                    IsCEDoc: false,
                    ParentDesktop: null,
                }
            };
            this.__winDataParent.DataDocSelf.DataWinParent = this.__winDataParent;
        }
        else {
            this.debug().Error(this.constructor.name, 'No Opener Page');
        }
        this.UiMan().SetParentInfo(this.__winDataParent);
        console.log('PageData C');
        this.DebugInfo();
        this.debug().FuncEnd(this.Init.name);
    }
    GetPageTypeOfTargetWindow(targetWindow) {
        this.debug().FuncStart(this.GetPageTypeOfTargetWindow.name, targetWindow.location.href);
        var toReturn;
        var currentLoc = targetWindow.location.href;
        if (currentLoc.indexOf(this.Const().Url.Login) > -1) {
            toReturn = WindowType.LoginPage;
        }
        else if (currentLoc.indexOf(this.Const().Url.Desktop) > -1) {
            toReturn = WindowType.Desktop;
        }
        else if (currentLoc.indexOf(this.Const().Url.ContentEditor) > -1) {
            toReturn = WindowType.ContentEditor;
        }
        else if (currentLoc.toLowerCase().indexOf(this.Const().Url.LaunchPad.toLowerCase()) > -1) {
            toReturn = WindowType.Launchpad;
        }
        else {
            toReturn = WindowType.Unknown;
        }
        this.debug().FuncEnd(this.GetPageTypeOfTargetWindow.name, WindowType[toReturn]);
        return toReturn;
    }
    GetCurrentPageType() {
        this.debug().FuncStart(this.GetCurrentPageType.name);
        var toReturn = WindowType.Unknown;
        if (this.__winDataParent && this.__winDataParent && this.__winDataParent.Window && this.__winDataParent.DataDocSelf) {
            toReturn = this.GetPageTypeOfTargetWindow(this.__winDataParent.Window);
        }
        this.debug().FuncEnd(this.GetCurrentPageType.name + ' (' + toReturn + ') ' + WindowType[toReturn]);
        return toReturn;
    }
    DebugInfo() {
        this.debug().FuncStart(this.DebugInfo.name);
        this.debug().Log(this.__winDataParent.Window);
        this.debug().Log(this.__winDataParent.DataDocSelf);
        this.debug().FuncEnd(this.DebugInfo.name);
    }
}

class UiManager extends ManagerBase {
    constructor(xyyz) {
        super(xyyz);
        this.__selectSnapshotIndex = 0;
        xyyz.debug.FuncStart(UiManager.name);
        xyyz.debug.FuncEnd(UiManager.name);
    }
    SetParentInfo(winDataParent) {
        var targetSpan = document.getElementById(this.Const().ElemId.HindSiteParentInfo);
        if (targetSpan) {
            targetSpan.innerHTML = ' | Parent Id: ' + this.GuidMan().ShortGuid(winDataParent.DataDocSelf.Id) + ' | ' + winDataParent.Window.location.href;
        }
    }
    SelectChanged() {
        this.debug().FuncStart(this.SelectChanged.name);
        this.__selectSnapshotIndex = this.__getSelectElem().selectedIndex;
        this.debug().Log('new index :' + this.__selectSnapshotIndex);
        this.RefreshUi();
        this.debug().FuncEnd(this.SelectChanged.name);
    }
    RefreshUi() {
        this.debug().FuncStart(this.DrawCorrectNicknameInUI.name);
        this.__populateStateSel();
        this.DrawCorrectNicknameInUI();
        this.debug().FuncEnd(this.DrawCorrectNicknameInUI.name);
    }
    DrawCorrectNicknameInUI() {
        this.debug().FuncStart(this.DrawCorrectNicknameInUI.name);
        var targetId = this.UiMan().GetIdOfSelectWindowSnapshot();
        if (targetId) {
            this.debug().Log('targetId : ' + targetId.asString);
            var storageValue = this.AtticMan().GetFromStorageById(targetId);
            if (storageValue) {
                var inputElem = window.document.getElementById(this.Const().ElemId.InputNickname);
                if (inputElem) {
                    inputElem.value = storageValue.NickName;
                }
            }
        }
        this.debug().FuncEnd(this.DrawCorrectNicknameInUI.name);
    }
    GetValueInNickname() {
        var toReturn = '';
        toReturn = window.document.getElementById(this.Const().ElemId.InputNickname).value;
        return toReturn;
    }
    __getSelectElem() {
        return window.document.getElementById(this.Const().ElemId.SelStateSnapShot);
    }
    GetIdOfSelectWindowSnapshot() {
        var targetSel = this.__getSelectElem();
        var toReturn = null;
        if (targetSel) {
            var temp = targetSel.options[this.__selectSnapshotIndex].value;
            this.debug().Log('temp: ' + temp);
            toReturn = this.GuidMan().ParseGuid(temp);
        }
        this.debug().Log('idOfSelect: ' + toReturn.asString);
        return toReturn;
    }
    __populateStateSel() {
        this.debug().FuncStart(this.__populateStateSel.name, this.__selectSnapshotIndex.toString());
        var targetSel = this.__getSelectElem();
        if (targetSel) {
            var snapShots = this.AtticMan().GetAllStorageAsIDataOneWindow();
            if (snapShots && snapShots.length > 0) {
                targetSel.options.length = 0;
                this.debug().Log('targetSel.options.length : ' + targetSel.options.length);
                for (var idx = 0; idx < snapShots.length; idx++) {
                    var data = snapShots[idx];
                    this.debug().Log('data.Id.asString : ' + data.Id.asString);
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
        this.debug().FuncEnd(this.__populateStateSel.name);
    }
}

console.log('OneTree loaded');
class OneTreeManager extends ManagerBase {
    constructor(xyyz) {
        super(xyyz);
        xyyz.debug.FuncStart(OneTreeManager.name);
        xyyz.debug.FuncEnd(OneTreeManager.name);
    }
    GetFriendlyNameFromNode(inputNode) {
        this.debug().FuncStart(this.GetFriendlyNameFromNode.name);
        var toReturn = 'unknown';
        var parentNode = inputNode.parentNode;
        var treeNode = parentNode.querySelector('[id^=Tree_Node_]');
        if (treeNode) {
            toReturn = treeNode.innerText;
        }
        else {
            this.debug().Log('No treeNode');
        }
        this.debug().FuncEnd(this.GetFriendlyNameFromNode.toString + ' ' + toReturn);
        return toReturn;
    }
    WalkNodeRecursive(targetNode, depth) {
        var toReturn = [];
        depth = depth - 1;
        if (targetNode) {
            var className = targetNode.className;
            if (className === this.Const().ClassNames.ContentTreeNode) {
                var firstImg = targetNode.querySelector(this.Const().Selector.ContentTreeNodeGlyph);
                if (firstImg) {
                    var srcAttr = firstImg.getAttribute('src');
                    if (srcAttr.indexOf(this.Const().TreeExpandedPng) > -1) {
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
        this.debug().FuncStart(this.GetOneLiveTreeData.name + 'b idx: ' + dataOneCe.Id);
        this.debug().Log('targetDoc isnull xx: ' + (targetDoc === null));
        var toReturn = [];
        if (targetDoc) {
            var rootNode = targetDoc.Document.getElementById(this.Const().ElemId.SitecoreRootNodeId);
            if (rootNode) {
                this.debug().Log('rootNode: ' + rootNode.innerHTML);
                var rootParent = rootNode.parentElement;
                toReturn = this.WalkNodeRecursive(rootParent, this.Const().MaxIter);
                this.debug().Log('foundNodes count: ' + toReturn.length);
            }
            else {
                this.debug().Error(this.GetOneLiveTreeData.name, 'no root node');
            }
        }
        else {
            this.debug().Error(this.GetOneLiveTreeData.name, 'no targetDoc');
        }
        this.debug().FuncEnd(this.GetOneLiveTreeData.name);
        return toReturn;
    }
}

console.log('marker aa');
var xyyz = xyyz || {};
this.xyyz.HubObj = new Hub();
console.log('marker bb');
