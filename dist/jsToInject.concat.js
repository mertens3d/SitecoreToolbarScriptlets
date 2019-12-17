console.log('_ManagerBase loaded');
class ManagerBase {
    constructor(xyyz) {
        this.Xyyz = xyyz;
    }
    AtticMan() { return this.Xyyz.AtticMan; }
    Const() { return this.Xyyz.Const; }
    debug() { return this.Xyyz.debug; }
    DesktopMan() { return this.Xyyz.OneDesktopMan; }
    GuidMan() { return this.Xyyz.GuidMan; }
    locMan() { return this.Xyyz.LocationMan; }
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
        ContentEditor: /Content.*?Editor/ig,
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
    ClearDebugText() {
        var ta = this.__getTextArea();
        if (ta) {
            ta.value = '--- Debug Text Reset ---\\n';
            this.__indentCount = 0;
        }
        else {
            this.Error(Debug.name, 'No text area found');
        }
    }
    MarkerA() {
        this.__markerRaw('A');
    }
    MarkerB() {
        this.__markerRaw('B');
    }
    MarkerC() {
        this.__markerRaw('C');
    }
    MarkerD() {
        this.__markerRaw('D');
    }
    MarkerE() {
        this.__markerRaw('E');
    }
    __markerRaw(marker) {
        this.Log('Marker ' + marker);
    }
    Log(text, optionalValue = '', hasPrefix = false) {
        var indent = '  ';
        for (var idx = 0; idx < this.__indentCount; idx++) {
            text = indent + text;
        }
        var prefixLength = 3;
        if (!hasPrefix) {
            for (var idx = 0; idx < prefixLength; idx++) {
                text = ' ' + text;
            }
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
        this.Log(textOrFunc, '', true);
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
        this.Log(text, optionalValue, true);
    }
    Error(container, text) {
        if (!container) {
            container = 'unknown';
        }
        if (!text) {
            text = 'unknown';
        }
        this.Log('');
        this.Log('\t\t** ERROR ** ' + container);
        this.Log('');
        this.Log(text);
        this.Log('');
        this.Log('\t\t** ERROR ** ' + container);
        this.Log('');
    }
    IsNullOrUndefined(subject) {
        var toReturn = '{unknown}';
        if (subject) {
            if ((typeof subject) == 'undefined') {
                toReturn = 'Is Undefined';
            }
            else {
                toReturn = subject;
            }
        }
        else {
            toReturn = 'Is Null';
        }
        return toReturn;
    }
    PromiseBucketDebug(promiseBucket, friendlyName) {
        this.FuncStart(this.PromiseBucketDebug.name, friendlyName);
        this.Log('promiseBucket : ' + this.IsNullOrUndefined(promiseBucket));
        if (promiseBucket && typeof (promiseBucket) !== 'undefined') {
            this.Log('promiseBucket.IFramesbefore: ' + this.IsNullOrUndefined(promiseBucket.IFramesbefore));
            this.Log('promiseBucket.targetWindow: ' + this.IsNullOrUndefined(promiseBucket.targetWindow));
            this.Log('promiseBucket.oneCEdata: ' + this.IsNullOrUndefined(promiseBucket.oneCEdata));
            this.Log('promiseBucket.NewIframe: ' + this.IsNullOrUndefined(promiseBucket.NewIframe));
            if (promiseBucket.NewIframe) {
                this.DebugDataOneIframe(promiseBucket.NewIframe);
            }
        }
        this.FuncEnd(this.PromiseBucketDebug.name, friendlyName);
    }
    DebugDataOneIframe(dataOneIframe) {
        this.FuncStart(this.DebugDataOneIframe.name);
        try {
        }
        catch (e) {
        }
        this.Log('dataOneIframe : ' + this.IsNullOrUndefined(dataOneIframe));
        if (dataOneIframe) {
            this.Log('dataOneIframe.IframeElem: \t' + this.IsNullOrUndefined(dataOneIframe.IframeElem));
            if (dataOneIframe.IframeElem) {
                this.Log('dataOneIframe.id: \t' + this.IsNullOrUndefined(dataOneIframe.IframeElem.id));
            }
            this.Log('dataOneIframe.ContentDoc: \t' + this.IsNullOrUndefined(dataOneIframe.ContentDoc));
            if (dataOneIframe.ContentDoc) {
                this.Log('dataOneIframe.ContentDoc: \t' + this.IsNullOrUndefined(dataOneIframe.ContentDoc));
                this.Log('dataOneIframe.ContentDoc.XyyzId.asShort: \t' + this.IsNullOrUndefined(dataOneIframe.ContentDoc.XyyzId.asShort));
                this.Log('dataOneIframe.ContentDoc.Document: \t' + this.IsNullOrUndefined(dataOneIframe.ContentDoc.Document));
            }
        }
        this.FuncEnd(this.DebugDataOneIframe.name);
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

class IterationHelper extends ManagerBase {
    constructor(xyyz, maxIterations, nickname) {
        super(xyyz);
        this.__maxIterations = maxIterations;
        this.__currentIteration = maxIterations;
        this.__timeout = xyyz.Const.Timeouts.IterationHelperInitial;
        this.__nickName = nickname;
    }
    DecrementAndKeepGoing() {
        var toReturn = false;
        if (this.__currentIteration > 0) {
            this.__currentIteration -= 1;
            this.__timeout += this.__timeout * 0.5;
            this.debug().Log('DecrementAndKeepGoing: ' + this.__nickName + ' ' + this.__currentIteration + ':' + this.__maxIterations + ' | timeout: ' + this.__timeout);
            toReturn = true;
        }
        else {
            this.NotifyExhausted();
            toReturn = false;
        }
        return toReturn;
    }
    NotifyExhausted() {
        this.debug().Log('Iteration: ' + this.__nickName + ' counter exhausted ' + this.__currentIteration + ':' + this.__maxIterations);
    }
    WaitAndThen(timeoutFunction) {
        this.debug().FuncStart(this.WaitAndThen.name, this.__nickName + ' ' + timeoutFunction.name);
        var self = this;
        setTimeout(timeoutFunction(), self.__timeout);
        this.debug().FuncEnd(this.WaitAndThen.name, this.__nickName);
    }
    Wait() {
        return new Promise((resolve) => {
            setTimeout(resolve, this.__timeout);
        });
    }
}

class Utilities extends ManagerBase {
    TimeNicknameFavStr(data) {
        var typeStr = (data.WindowType === WindowType.Unknown) ? '?' : WindowType[data.WindowType];
        return this.MakeFriendlyDate(data.TimeStamp)
            + ' - ' + this.Buffer(typeStr, 9, ' ', false)
            + ' - ' + this.Buffer(data.NickName, 16, ' ', false)
            + ' - ' + this.Buffer((data.IsFavorite ? '*' : ' '), 1);
    }
    constructor(xyyz) {
        super(xyyz);
        xyyz.debug.FuncStart(Utilities.name);
        xyyz.debug.FuncEnd(Utilities.name);
    }
    Buffer(str, desiredLength, buffChar = ' ', bufferLEft = true) {
        var toReturn = str;
        if (buffChar.length === 0) {
            buffChar = ' ';
        }
        if (toReturn.length > desiredLength) {
            if (desiredLength > 6) {
                toReturn = toReturn.substring(0, desiredLength - 3) + '...';
            }
            else {
                toReturn = toReturn.substring(0, desiredLength);
            }
        }
        if (toReturn.length < desiredLength) {
            var spacesNeeded = desiredLength - toReturn.length;
            if (buffChar === ' ') {
                buffChar = '&nbsp;';
            }
            for (var idx = 0; idx < spacesNeeded; idx++) {
                if (bufferLEft) {
                    toReturn = buffChar + toReturn;
                }
                else {
                    toReturn = toReturn + buffChar;
                }
            }
        }
        return toReturn;
    }
    MakeFriendlyDate(date) {
        var year = date.getFullYear();
        var month = date.getMonth();
        var day = this.Utilites().Buffer(date.getDay().toString(), 2, '0');
        var min = this.Utilites().Buffer(date.getMinutes().toString(), 2, '0');
        var hoursRaw = date.getHours();
        var ampm = hoursRaw >= 12 ? 'pm' : 'am';
        hoursRaw = hoursRaw % 12;
        var hourClean = hoursRaw ? hoursRaw : 12;
        var hourCleanStr = this.Utilites().Buffer(hourClean.toString(), 2, '0');
        var toReturn = year + '.' + month + '.' + day + ' ' + hourCleanStr + ':' + min + ' ' + ampm;
        return toReturn;
    }
}

var iIterationResults;
(function (iIterationResults) {
    iIterationResults[iIterationResults['unknown'] = 0] = 'unknown';
    iIterationResults[iIterationResults['BeepGoing'] = 1] = 'BeepGoing';
    iIterationResults[iIterationResults['Exhausted'] = 2] = 'Exhausted';
    iIterationResults[iIterationResults['Completed'] = 3] = 'Completed';
})(iIterationResults || (iIterationResults = {}));

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
        this.debug().FuncStart(this.__buildDebugDataPretty.name, 'data not null? ' + (dataOneWindow !== null).toString());
        var toReturn = [];
        if (dataOneWindow) {
            toReturn.push('------ One Window Snap Shot Start -----');
            toReturn.push('Id: ' + dataOneWindow.Id);
            toReturn.push('TimeStamp: ' + dataOneWindow.TimeStamp);
            toReturn.push('CE Count: ' + dataOneWindow.AllCEAr.length);
            toReturn.push('Type: ' + WindowType[dataOneWindow.WindowType]);
            toReturn.push('Nickname: ' + dataOneWindow.NickName);
            for (var jdx = 0; jdx < dataOneWindow.AllCEAr.length; jdx++) {
                toReturn.push('\t------ One CE Start -----');
                var dataOneCE = dataOneWindow.AllCEAr[jdx];
                toReturn.push('\tId: ' + dataOneCE.Id.asString);
                var allCeDebugDataAr = this.Xyyz.OneCEMan.GetDebugDataOneCE(dataOneCE);
                for (var kdx = 0; kdx < allCeDebugDataAr.length; kdx++) {
                    toReturn.push('\t\t' + allCeDebugDataAr[kdx]);
                }
                toReturn.push('\t------ One CE End -----');
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
                    if (!candidate.WindowType) {
                        candidate.WindowType = WindowType.Unknown;
                        candidate.WindowFriendly = WindowType[candidate.WindowType];
                    }
                    if (!candidate.NickName) {
                        candidate.NickName = '';
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
        this.__ById(this.Const().ElemId.BtnEdit).onclick = () => { this.locMan().SetScMode('edit'); };
        this.__ById('btnPrev').onclick = () => { this.locMan().SetScMode('preview'); };
        this.__ById('btnNorm').onclick = () => { this.locMan().SetScMode('normal'); };
        this.__ById('btnAdminB').onclick = () => { this.locMan().AdminB(this.PageDataMan().GetParentWindow().DataDocSelf, null); };
        this.__ById('btnDesktop').onclick = () => { this.debug().ClearDebugText(); this.locMan().ChangeLocationSwitchBoard(WindowType.Desktop, this.PageDataMan().GetParentWindow()); };
        this.__ById('btnCE').onclick = () => { this.__openCE(); };
        this.__ById(this.Const().ElemId.BtnSaveWindowState).onclick = () => { this.__takeSnapShot(); };
        this.__ById('btnDrawLocalStorage').onclick = () => { this.AtticMan().DrawStorage(); };
        this.__ById('btnRemoveOneFromLocalStorage').onclick = () => { this.AtticMan().RemoveOneFromStorage(); };
        this.__ById(this.Const().ElemId.Hs.btnClearDebugTextArea).onclick = () => { this.Xyyz.debug.ClearDebugText(); };
        this.__ById(this.Const().ElemId.btnUpdateNicknameB).onclick = () => { this.Xyyz.AtticMan.UpdateNickname(); };
        this.__ById(this.Const().ElemId.hsBtnBigRed).onclick = () => { this.__addCETab(); };
        this.__ById(this.Const().ElemId.BtnRestoreWindowState).onclick = (evt) => { this._handlerRestoreClick(evt); };
        this.__ById(this.Const().ElemId.SelStateSnapShot).onchange = () => { this.Xyyz.UiMan.SelectChanged(); };
        this.__ById(this.Const().ElemId.SelStateSnapShot).ondblclick = (evt) => { this._handlerRestoreClick(evt); };
        this.debug().FuncEnd(this.__wireMenuButtons.name);
    }
    ;
    __takeSnapShot() {
        this.debug().ClearDebugText();
        this.Xyyz.OneWindowMan.SaveWindowState(this.PageDataMan().GetParentWindow());
    }
    __addCETab() {
        this.debug().ClearDebugText();
        this.DesktopMan().WaitForAndClickRedStartButtonWorker(this.PageDataMan().SelfWindow);
    }
    __openCE() {
        this.debug().ClearDebugText();
        this.locMan().ChangeLocationSwitchBoard(WindowType.ContentEditor, this.PageDataMan().GetParentWindow());
    }
    __getTargetWindow(evt, callbackOnLoaded) {
        this.debug().FuncStart(this.__getTargetWindow.name);
        var targetWindow;
        if (evt.ctrlKey) {
            this.debug().Log('target window is self');
            targetWindow = this.PageDataMan().GetParentWindow();
            callbackOnLoaded(targetWindow);
        }
        else {
            this.debug().Log('target window is new');
            targetWindow = this.PageDataMan().OpenNewBrowserWindow();
            var self = this;
            targetWindow.Window.addEventListener('load', function () {
                if (targetWindow) {
                    targetWindow.DataDocSelf.DataWinParent = targetWindow;
                    targetWindow.DataDocSelf.Document = targetWindow.Window.document;
                    self.debug().Log(self.__getTargetWindow.name, 'triggering callback');
                    callbackOnLoaded(targetWindow);
                }
                else {
                    self.debug().Error(self.__getTargetWindow, 'No target window');
                }
            }, false);
        }
        targetWindow.WindowType = WindowType.ContentEditor;
        this.debug().FuncEnd(this.__getTargetWindow.name, 'child window id: ' + targetWindow.DataDocSelf.XyyzId.asShort);
        return targetWindow;
    }
    _handlerRestoreClick(evt) {
        this.debug().ClearDebugText();
        this.debug().FuncStart(this._handlerRestoreClick.name);
        try {
            var idOfSelect = this.UiMan().GetIdOfSelectWindowSnapshot();
            this.debug().MarkerA();
            var dataOneWindowStorage = this.AtticMan().GetFromStorageById(idOfSelect);
            this.debug().MarkerB();
            var self = this;
            var callbackOnLoaded = function (targetWindow) {
                self.debug().FuncStart(self._handlerRestoreClick.name, 'callback');
                if (targetWindow) {
                    self.Xyyz.OneWindowMan.RestoreWindowStateToTarget(targetWindow, dataOneWindowStorage);
                }
                else {
                    self.debug().Error(this._handlerRestoreClick.name, 'no target window');
                }
                self.debug().FuncEnd('callback');
            };
            this.debug().MarkerC();
            this.__getTargetWindow(evt, callbackOnLoaded);
        }
        catch (ex) {
            this.debug().Error(this._handlerRestoreClick.name, ex);
        }
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
        xyyz.debug.FuncEnd(LocationManager.name);
    }
    SetHref(href, callback, targetWindow, effortCount = this.Const().Iterations.MaxSetHrefEffort) {
        this.debug().FuncStart(this.SetHref.name, href + ' : ' + effortCount + ' : has callback? ' + (callback !== null));
        effortCount -= 1;
        var isCorrectHref = targetWindow.Window.location.href = href;
        var isReadyState = targetWindow.DataDocSelf.Document.readyState === 'complete';
        if (effortCount > 0) {
            if (isCorrectHref && isReadyState) {
                this.debug().Log(this.SetHref.name, 'triggering callback');
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
    ChangeLocationSwitchBoard(desiredPageType, targetWindow, iteration = this.Const().Iterations.MaxIterationSwitchBoard) {
        this.debug().FuncStart(this.ChangeLocationSwitchBoard.name, 'desired = ' + WindowType[desiredPageType] + ' iteration: ' + iteration + ':' + this.Const().Iterations.MaxIterationSwitchBoard);
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
                }
            }
        }
        this.debug().FuncEnd(this.ChangeLocationSwitchBoard.name);
    }
    SetScMode(newValue) {
        var newValueB = '=' + newValue;
        window.opener.location.href = window.opener.location.href.replace('=normal', newValueB).replace('=preview', newValueB).replace('=edit', newValueB);
    }
    GetLoginButton(targetDoc) {
        this.debug().FuncStart(this.GetLoginButton.name);
        var toReturn = targetDoc.Document.getElementById(this.Const().ElemId.sc.scLoginBtn.sc920);
        if (!toReturn) {
            toReturn = targetDoc.Document.querySelector(this.Const().Selector.sc.LoginBtn.sc820);
        }
        this.debug().Log('toReturn: ' + toReturn);
        this.debug().FuncEnd(this.GetLoginButton.name);
        return toReturn;
    }
    AdminB(targetDoc, callbackOnComplete) {
        this.debug().FuncStart(this.AdminB.name, 'targetDoc: ' + targetDoc.XyyzId.asShort);
        this.debug().Log('callback passed: ' + (callbackOnComplete !== null));
        var userNameElem = targetDoc.Document.getElementById(this.Const().ElemId.sc.scLoginUserName);
        var passwordElem = targetDoc.Document.getElementById(this.Const().ElemId.sc.scLoginPassword);
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

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator['throw'](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class OneCEManager extends ManagerBase {
    constructor(xyyz) {
        super(xyyz);
    }
    WaitForNode(needleId, targetDoc, currentIteration, timeout, callbackOnComplete) {
        this.debug().FuncStart(this.WaitForNode.name, 'looking for guid: iter: ' + currentIteration + ' ' + needleId.asString + ' on ' + this.GuidMan().ShortGuid(targetDoc.XyyzId));
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
        var rootElem = targetCEDoc.Document.getElementById(this.Const().ElemId.sc.SitecoreRootGlyphId);
        if (rootElem) {
            this.__collapseNode(rootElem);
        }
        else {
            this.debug().Error(this.__collapseRootNode.name, 'Root glyph not found ' + this.Const().ElemId.sc.SitecoreRootGlyphId);
        }
    }
    WaitForAndRestoreOneNode(nextNode, dataOneDocTarget) {
        return __awaiter(this, void 0, void 0, function* () {
            this.debug().FuncStart(this.WaitForAndRestoreOneNode.name, dataOneDocTarget.XyyzId.asShort);
            this.debug().Log('looking for: ' + nextNode.NodeId.asString + ' ' + nextNode.NodeFriendly + ' in ' + dataOneDocTarget.XyyzId.asShort);
            this.debug().Log('document not null ' + (dataOneDocTarget.Document != null));
            var iterHelper = new IterationHelper(this.Xyyz, 2, this.WaitForAndRestoreOneNode.name);
            var foundOnPage = null;
            while (!foundOnPage && iterHelper.DecrementAndKeepGoing()) {
                this.debug().Log('looking for: *' + nextNode.NodeId.asString + '* ' + nextNode.NodeFriendly + ' in *' + dataOneDocTarget.XyyzId.asShort + '*');
                foundOnPage = dataOneDocTarget.Document.getElementById(nextNode.NodeId.asString);
                if (foundOnPage) {
                    this.__expandNode(foundOnPage);
                }
                else {
                    this.debug().Log('not Found...waiting: ');
                    yield iterHelper.Wait();
                }
            }
            this.debug().FuncStart(this.WaitForAndRestoreOneNode.name, dataOneDocTarget.XyyzId.asShort);
        });
    }
    WaitForAndRestoreManyAllNodes(storageData, dataOneDocTarget, iterHelper = null) {
        return __awaiter(this, void 0, void 0, function* () {
            this.debug().FuncStart(this.WaitForAndRestoreManyAllNodes.name, dataOneDocTarget.XyyzId.asShort);
            if (!iterHelper) {
                iterHelper = new IterationHelper(this.Xyyz, 10, this.WaitForAndRestoreManyAllNodes.name);
            }
            while (storageData.AllTreeNodeAr.length > 0 && iterHelper.DecrementAndKeepGoing()) {
                var nextNode = storageData.AllTreeNodeAr.shift();
                yield this.WaitForAndRestoreOneNode(nextNode, dataOneDocTarget);
            }
            this.debug().FuncEnd(this.WaitForAndRestoreManyAllNodes.name);
        });
    }
    RestoreCEState(dataToRestore, dataOneDocTarget) {
        return __awaiter(this, void 0, void 0, function* () {
            this.debug().FuncStart(this.RestoreCEState.name, dataOneDocTarget.XyyzId.asShort);
            var toReturn = false;
            this.debug().Log('Node Count in storage data: ' + dataToRestore.AllTreeNodeAr.length);
            yield this.WaitForAndRestoreManyAllNodes(dataToRestore, dataOneDocTarget);
            this.debug().FuncEnd(this.RestoreCEState.name);
            return toReturn;
        });
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

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator['throw'](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
console.log('ManyTrees loaded');
class OneDesktopManager extends ManagerBase {
    constructor(xyyz) {
        xyyz.debug.FuncStart(OneDesktopManager.name);
        super(xyyz);
        xyyz.debug.FuncEnd(OneDesktopManager.name);
    }
    RestoreDesktopState(targetWindow, dataToRestore) {
        return __awaiter(this, void 0, void 0, function* () {
            this.debug().FuncStart(this.RestoreDesktopState.name);
            ;
            var allFunc = [];
            for (var idx = 0; idx < dataToRestore.AllCEAr.length; idx++) {
                this.debug().Log('idx: ' + idx);
                var desktopPromiser = new PromiseChainRestoreDesktop(this.Xyyz);
                allFunc.push(() => desktopPromiser.RunOneChain(targetWindow, dataToRestore.AllCEAr[idx]));
                yield desktopPromiser.RunOneChain(targetWindow, dataToRestore.AllCEAr[idx]);
            }
            if (allFunc.length > 0) {
            }
            this.debug().FuncEnd(this.RestoreDesktopState.name);
        });
    }
    RestoreDataToOneIframeWorker(oneCEdata, newIframe) {
        return __awaiter(this, void 0, void 0, function* () {
            this.debug().FuncStart(this.RestoreDataToOneIframeWorker.name, 'data not null: ' + (oneCEdata != null) + ' newFrame not null: ' + (newIframe !== null));
            var toReturn = false;
            this.debug().DebugDataOneIframe(newIframe);
            if (oneCEdata && newIframe) {
                yield this.Xyyz.OneCEMan.RestoreCEState(oneCEdata, newIframe.ContentDoc);
                toReturn = true;
            }
            else {
                this.debug().Error(this.RestoreDataToOneIframeWorker.name, 'bad data');
                toReturn = false;
            }
            this.debug().FuncEnd(this.RestoreDataToOneIframeWorker.name, toReturn.toString());
            return toReturn;
        });
    }
    WaitForIframeCountDiffWorker(IFramesbefore, targetWin) {
        return __awaiter(this, void 0, void 0, function* () {
            this.debug().FuncStart(this.WaitForIframeCountDiffWorker.name);
            var toReturn = null;
            var iterationJr = new IterationHelper(this.Xyyz, 10, this.WaitForIframeCountDiffWorker.name);
            while (!toReturn && iterationJr.DecrementAndKeepGoing()) {
                let beforeCount = IFramesbefore.length;
                var allIframesAfter = this.GetAllLiveIframeData(targetWin);
                var count = allIframesAfter.length;
                this.debug().Log('iFrame count before: ' + IFramesbefore.length);
                this.debug().Log('iFrame count after: ' + allIframesAfter.length);
                if (count > beforeCount) {
                    var newIframes = allIframesAfter.filter(e => !IFramesbefore.includes(e));
                    toReturn = newIframes[0];
                }
                else {
                    var self = this;
                    yield iterationJr.Wait();
                }
            }
            this.debug().FuncEnd(this.WaitForIframeCountDiffWorker.name);
            return toReturn;
        });
    }
    __getBigRedButtonElem(targetWin) {
        this.debug().FuncStart(this.__getBigRedButtonElem.name, 'targetWin not null: ' + (targetWin !== null));
        var toReturn = targetWin.Window.document.getElementById(this.Const().ElemId.sc.scStartButton.sc920);
        if (!toReturn) {
            toReturn = targetWin.Window.document.getElementById(this.Const().ElemId.sc.scStartButton.sc820);
        }
        this.debug().FuncEnd(this.__getBigRedButtonElem.name, 'toReturn: ' + (toReturn !== null));
        return toReturn;
    }
    WaitForAndClickRedStartButtonWorker(targetWin) {
        this.debug().FuncStart(this.WaitForAndClickRedStartButtonWorker.name, 'targetDoc not null: ' + (targetWin !== null));
        var toReturn = false;
        var iterationJr = new IterationHelper(this.Xyyz, 10, this.WaitForAndClickRedStartButtonWorker.name);
        while (!toReturn && iterationJr.DecrementAndKeepGoing()) {
            var found = this.__getBigRedButtonElem(targetWin);
            if (found) {
                this.debug().Log('red button found, clicking it');
                found.click();
                toReturn = true;
            }
            else {
                iterationJr.Wait();
            }
        }
        this.debug().FuncEnd(this.WaitForAndClickRedStartButtonWorker.name);
        return toReturn;
    }
    WaitForReadyIframe(dataOneIframe, iterationJr = null) {
        return __awaiter(this, void 0, void 0, function* () {
            this.debug().FuncStart(this.WaitForReadyIframe.name, dataOneIframe.Id.asShort);
            this.debug().DebugDataOneIframe(dataOneIframe);
            var toReturn = false;
            if (!iterationJr) {
                iterationJr = new IterationHelper(this.Xyyz, 10, this.WaitForReadyIframe.name);
            }
            this.debug().MarkerA();
            while (iterationJr.DecrementAndKeepGoing() && toReturn === false) {
                this.debug().MarkerB();
                var currentReadyState = dataOneIframe.IframeElem.contentDocument.readyState.toString();
                var isReadyStateComplete = currentReadyState === 'complete';
                this.debug().Log('currentReadyState : ' + currentReadyState);
                ;
                this.debug().MarkerC();
                this.debug().Log('isReadyStateComplete: ' + isReadyStateComplete);
                if (isReadyStateComplete) {
                    toReturn = true;
                    this.debug().Log('toReturn A is ' + toReturn);
                }
                else {
                    var self = this;
                    this.debug().Log('about to Wait and then ');
                    yield iterationJr.Wait();
                    this.debug().Log('toReturn C is ' + toReturn);
                }
                this.debug().Log('while is looping ' + toReturn);
            }
            this.debug().FuncEnd(this.WaitForReadyIframe.name, currentReadyState + ' ' + toReturn.toString());
            ;
            return toReturn;
        });
    }
    WaitForAndThenClickCEFromMenuWorker(targetWin) {
        return __awaiter(this, void 0, void 0, function* () {
            this.debug().FuncStart(this.WaitForAndThenClickCEFromMenuWorker.name);
            ;
            var toReturn = false;
            var iterationJr = new IterationHelper(this.Xyyz, 10, this.WaitForAndThenClickCEFromMenuWorker.name);
            while (!toReturn && iterationJr.DecrementAndKeepGoing()) {
                var menuLeft = targetWin.Window.document.querySelector(this.Const().Selector.sc.StartMenuLeftOption);
                if (menuLeft) {
                    this.debug().FuncStart('clicking it A');
                    menuLeft.click();
                    toReturn = true;
                }
                else {
                    yield iterationJr.Wait();
                }
            }
            this.debug().FuncEnd(this.WaitForAndThenClickCEFromMenuWorker.name);
            ;
            return toReturn;
        });
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
                    IframeElem: iframeElem,
                    Id: this.GuidMan().NewGuid(),
                    ContentDoc: {
                        DataWinParent: targetWindow,
                        Document: iframeElem.contentDocument,
                        HasParentDesktop: true,
                        XyyzId: this.GuidMan().NewGuid(),
                        IsCEDoc: true,
                        ParentDesktop: null
                    },
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
        this.debug().Log('SaveOneDesktop');
        ;
        var livingIframeAr = this.GetAllLiveIframeData(targetWindow);
        if (livingIframeAr && livingIframeAr.length > 0) {
            for (var iframeIdx = 0; iframeIdx < livingIframeAr.length; iframeIdx++) {
                this.debug().Log('iframeIdx: ' + iframeIdx);
                var targetIframeObj = livingIframeAr[iframeIdx];
                this.Xyyz.OneCEMan.SaveStateOneContentEditor(targetIframeObj.Id, targetIframeObj.ContentDoc);
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
        var currentPageType = this.PageDataMan().GetCurrentPageType();
        this.Xyyz.OneWindowMan.CreateNewWindowSnapShot(currentPageType);
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
    RestoreWindowStateToTarget(targetWindow, dataToRestore) {
        this.debug().FuncStart(this.RestoreWindowStateToTarget.name);
        if (dataToRestore) {
            if (dataToRestore.WindowType === WindowType.ContentEditor) {
                this.Xyyz.OneCEMan.RestoreCEState(dataToRestore.AllCEAr[0], targetWindow.DataDocSelf);
            }
            else if (dataToRestore.WindowType === WindowType.Desktop) {
                this.Xyyz.OneDesktopMan.RestoreDesktopState(targetWindow, dataToRestore);
            }
            else {
                this.debug().Error(this.RestoreWindowStateToTarget.name, 'No match found for snap shot');
            }
            this.debug().FuncEnd(this.RestoreWindowStateToTarget.name);
        }
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
        var currentPageType = this.PageDataMan().GetCurrentPageType();
        this.CreateNewWindowSnapShot(currentPageType);
    }
    CreateNewWindowSnapShot(windowType) {
        this.debug().FuncStart('CreateNewWindowSnapShot');
        var dateToUse = new Date();
        var newGuid = this.Xyyz.GuidMan.NewGuid();
        this.__activeWindowSnapShot = {
            TimeStamp: dateToUse,
            WindowType: windowType,
            WindowFriendly: windowType[windowType],
            AllCEAr: [],
            Id: newGuid,
            IsFavorite: false,
            NickName: '',
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
                XyyzId: this.GuidMan().NewGuid(),
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
        this.debug().FuncEnd(this.OpenNewBrowserWindow.name + ' : ' + toReturn.DataDocSelf.XyyzId.asString);
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
                    XyyzId: this.GuidMan().NewGuid(),
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
        var regStr = /Content.*?Editor/ig;
        var regEx = new RegExp(regStr);
        var result = regEx.test(targetWindow.location.href.toLowerCase());
        this.debug().Log('targetWindow.location.href.toLowerCase() ' + targetWindow.location.href.toLowerCase());
        this.debug().Log('regStr ' + regStr);
        this.debug().Log('result ' + result);
        if (currentLoc.indexOf(this.Const().Url.Login) > -1) {
            toReturn = WindowType.LoginPage;
        }
        else if (currentLoc.toLowerCase().indexOf(this.Const().Url.Desktop.toLowerCase()) > -1) {
            this.debug().Log('Testing for Desktop editor');
            this.debug().Log('currentLoc.toLowerCase()' + currentLoc.toLowerCase());
            this.debug().Log('this.Const().Url.Desktop.toLowerCase()' + this.Const().Url.Desktop.toLowerCase());
            toReturn = WindowType.Desktop;
        }
        else if (new RegExp(this.Const().Url.ContentEditor).test(currentLoc)) {
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
            targetSpan.innerHTML = ' | Parent Id: ' + this.GuidMan().ShortGuid(winDataParent.DataDocSelf.XyyzId) + ' | ' + winDataParent.Window.location.href;
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
        this.debug().FuncStart(this.GetIdOfSelectWindowSnapshot.name);
        var targetSel = this.__getSelectElem();
        var toReturn = null;
        if (targetSel) {
            var temp = targetSel.options[this.__selectSnapshotIndex].value;
            toReturn = this.GuidMan().ParseGuid(temp);
        }
        this.debug().FuncEnd(this.GetIdOfSelectWindowSnapshot.name, 'idOfSelect: ' + toReturn.asString);
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
                    el.innerHTML = this.Xyyz.Utilities.TimeNicknameFavStr(data);
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

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator['throw'](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class PromiseChainRestoreDesktop extends ManagerBase {
    constructor(xyyz) {
        xyyz.debug.FuncStart(PromiseChainRestoreDesktop.name);
        super(xyyz);
        xyyz.debug.FuncEnd(PromiseChainRestoreDesktop.name);
    }
    __waitForAndClickRedStartButtonPromise(promiseBucket) {
        return new Promise((resolve, reject) => {
            this.debug().FuncStart(this.__waitForAndClickRedStartButtonPromise.name, 'tagetDoc not null: ' + (promiseBucket.targetDoc !== null));
            var success = this.DesktopMan().WaitForAndClickRedStartButtonWorker(promiseBucket.targetWindow);
            if (success) {
                resolve(promiseBucket);
            }
            else {
                reject(this.__waitForAndClickRedStartButtonPromise.name);
            }
            this.debug().FuncEnd(this.__waitForAndClickRedStartButtonPromise.name);
        });
    }
    __waitForIframeReady(promiseBucket) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            this.debug().FuncStart(this.__waitForIframeReady.name, 'promiseBucket not null: ' + (promiseBucket !== null));
            this.debug().PromiseBucketDebug(promiseBucket, this.__waitForIframeReady.name);
            var success = yield this.DesktopMan().WaitForReadyIframe(promiseBucket.NewIframe);
            if (success) {
                this.debug().Log('resolved! : ');
                promiseBucket.NewIframe.ContentDoc.Document = promiseBucket.NewIframe.IframeElem.contentDocument;
                this.debug().DebugDataOneIframe(promiseBucket.NewIframe);
                resolve(promiseBucket);
            }
            else {
                this.debug().Log('rejected ! : ');
                reject(this.__waitForIframeReady.name);
            }
            this.debug().FuncEnd(this.__waitForIframeReady.name);
        }));
    }
    __waitForIframeCountDiffPromise(promiseBucket) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            this.debug().FuncStart(this.__waitForIframeCountDiffPromise.name);
            this.debug().MarkerA();
            var success = yield this.DesktopMan().WaitForIframeCountDiffWorker(promiseBucket.IFramesbefore, promiseBucket.targetWindow);
            this.debug().MarkerB();
            if (success) {
                this.debug().MarkerC();
                promiseBucket.NewIframe = success;
                this.debug().DebugDataOneIframe(promiseBucket.NewIframe);
                resolve(promiseBucket);
            }
            else {
                reject(this.__waitForIframeCountDiffPromise.name);
            }
            this.debug().FuncEnd(this.__waitForIframeCountDiffPromise.name);
        }));
    }
    __waitForAndThenClickCEFromMenuPromise(promiseBucket) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            var success = yield this.DesktopMan().WaitForAndThenClickCEFromMenuWorker(promiseBucket.targetWindow);
            if (success) {
                resolve(promiseBucket);
            }
            else {
                reject(this.__waitForAndThenClickCEFromMenuPromise.name);
            }
        }));
    }
    __restoreDataToOneIframe(promiseBucket) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            this.debug().FuncStart(this.__restoreDataToOneIframe.name);
            this.debug().DebugDataOneIframe(promiseBucket.NewIframe);
            var success = yield this.DesktopMan().RestoreDataToOneIframeWorker(promiseBucket.oneCEdata, promiseBucket.NewIframe);
            if (success) {
                resolve(promiseBucket);
            }
            else {
                reject(this.__restoreDataToOneIframe.name);
            }
            this.debug().FuncEnd(this.__restoreDataToOneIframe.name);
        }));
    }
    RunOneChain(targetWindow, dataToRestore) {
        return __awaiter(this, void 0, void 0, function* () {
            var allIframeData = this.DesktopMan().GetAllLiveIframeData(targetWindow);
            var dataBucket = {
                targetWindow: targetWindow,
                targetDoc: null,
                IFramesbefore: allIframeData,
                oneCEdata: dataToRestore,
                NewIframe: null,
                LastChainLinkSuccessful: false,
            };
            yield this.__waitForAndClickRedStartButtonPromise(dataBucket)
                .then(dataBucket => this.__waitForAndThenClickCEFromMenuPromise(dataBucket))
                .then(dataBucket => this.__waitForIframeCountDiffPromise(dataBucket))
                .then(dataBucket => this.__waitForIframeReady(dataBucket))
                .then(dataBucket => this.__restoreDataToOneIframe(dataBucket))
                .catch(ex => {
                this.debug().Error(this.RunOneChain.name, ex);
            });
        });
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
                    if (srcAttr.indexOf(this.Const().Names.sc.scTreeExpandedPng) > -1) {
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
        this.debug().FuncStart(this.GetOneLiveTreeData.name, 'id: ' + dataOneCe.Id.asShort);
        this.debug().Log('targetDoc isnull: ' + (targetDoc === null));
        var toReturn = [];
        if (targetDoc) {
            var rootNode = targetDoc.Document.getElementById(this.Const().ElemId.sc.SitecoreRootNodeId);
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
