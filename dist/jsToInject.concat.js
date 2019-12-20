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
    OneCEMan() { return this.Xyyz.OneCEMan; }
    OneWinMan() { return this.Xyyz.OneWindowMan; }
    PageDataMan() { return this.Xyyz.PageDataMan; }
    UiMan() { return this.Xyyz.UiMan; }
    Utilites() { return this.Xyyz.Utilities; }
    MiscMan() { return this.Xyyz.MiscMan; }
    PromiseGen() { return this.Xyyz.PromiseGeneric; }
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
        IterationHelperInitial: 100,
        PostLoginBtnClick: 1000,
        SetHrefEffortWait: 1000,
        TimeoutChangeLocation: 1000,
        TimeoutTriggerRedButton: 1500,
        TimeoutWaitForNodeToLoad: 500,
        WaitBeforeRemovingCompleteFlag: 3000,
        WaitFogPageLoad: 1000,
    },
    ElemId: {
        Hs: {
            btnClearDebugTextArea: 'btnClearDebugTextArea',
            SelStateSnapShot: 'selState',
            BtnCancel: 'btnCancel',
        },
        BtnEdit: 'btnEdit',
        btnQuickPublish: 'btnQuickPublish',
        BtnRestoreWindowState: 'btnRestoreWindowState',
        BtnSaveWindowState: 'btnSaveWindowState',
        btnToggleFavoriteB: 'btnToggleFavorite',
        btnUpdateNicknameB: 'btnUpdateNickname',
        HindSiteParentInfo: 'spanParentInfo',
        hsBtnBigRed: 'btnBigRed',
        InputNickname: 'inputNickname',
        textAreaFeedback: 'ta-feedback',
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
    },
    Regex: {
        ContentEditor: /Content.*?Editor/ig,
    },
    Selector: {
        XS: {
            IdFieldSetDebug: '[id=id-fieldset-debug]',
            iCBoxdSettingsShowDebugData: '[id=id-settings-show-debug-data]',
        },
        SC: {
            IframeContent: 'iframe[src*=content]',
            ContentTreeNodeGlyph: '.scContentTreeNodeGlyph',
            StartMenuLeftOption: '.scStartMenuLeftOption',
            IdStartsWithTreeNode: '[id^=Tree_Node_]',
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
        DefaultDebugKeepDialogOpen: false,
        SettingsSuffix: '.Settings',
        ShowDebugData: false,
        SnapShotSuffix: '.WindowSnapShot.',
        WindowRoot: 'Xyyz',
    },
    MaxIter: 100,
    MaxNullOrUndefinedIter: 100,
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
};



console.log('_first loaded');

class Debug {
    constructor(parentWindow) {
        this.Enabled = false;
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
    LogVal(textValName, textValVal) {
        this.Log(textValName + ' : ' + textValVal);
    }
    Log(text, optionalValue = '', hasPrefix = false) {
        if (this.Enabled) {
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
        this.Log('\t\t  ' + text);
        this.Log('');
        this.Log('\t\t** ERROR ** ' + container);
        this.Log('');
    }
    NotNullCheck(title, value) {
        if (typeof value === 'undefined') {
            this.LogVal(title, 'Is Undefined');
        }
        else if (!value) {
            this.LogVal(title, 'Is Null');
        }
        else {
            this.LogVal(title, 'Is Not Null');
        }
    }
    IsNullOrUndefined(subject) {
        var toReturn = '{unknown}';
        if (subject) {
            if ((typeof subject) == 'undefined') {
                toReturn = 'Is Undefined';
            }
            else {
                toReturn = 'Not Null';
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
        this.IsExhausted = false;
    }
    DecrementAndKeepGoing() {
        var toReturn = false;
        if (!this.UiMan().OperationCancelled && this.__currentIteration > 0) {
            this.__currentIteration -= 1;
            this.__timeout += this.__timeout * 0.5;
            this.debug().Log('DecrementAndKeepGoing: ' + this.__nickName + ' ' + this.__currentIteration + ':' + this.__maxIterations + ' | timeout: ' + this.__timeout);
            toReturn = true;
        }
        else {
            this.IsExhausted = true;
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
        if (!this.UiMan().OperationCancelled) {
            return new Promise((resolve) => {
                setTimeout(resolve, this.__timeout);
            });
        }
    }
}

class Utilities extends ManagerBase {
    TimeNicknameFavStr(data) {
        var typeStr = (data.WindowType === scWindowType.Unknown) ? '?' : scWindowType[data.WindowType];
        return this.MakeFriendlyDate(data.TimeStamp)
            + ' - ' + this.Buffer(typeStr, 17, ' ', false)
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

var scWindowType;
(function (scWindowType) {
    scWindowType[scWindowType['Unknown'] = 0] = 'Unknown';
    scWindowType[scWindowType['LoginPage'] = 1] = 'LoginPage';
    scWindowType[scWindowType['Desktop'] = 2] = 'Desktop';
    scWindowType[scWindowType['ContentEditor'] = 3] = 'ContentEditor';
    scWindowType[scWindowType['Launchpad'] = 4] = 'Launchpad';
})(scWindowType || (scWindowType = {}));

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
        this.debug().FuncStart(this.DrawDebugDataPretty.name, 'source not null: ' + this.debug().IsNullOrUndefined(source));
        var allDebugData = this.__buildDebugDataPretty(source);
        for (var ldx = 0; ldx < allDebugData.length; ldx++) {
            this.Xyyz.FeedbackMan.WriteLine(allDebugData[ldx]);
        }
        this.debug().FuncEnd(this.DrawDebugDataPretty.name);
    }
    __buildDebugDataPretty(dataOneWindow) {
        this.debug().FuncStart(this.__buildDebugDataPretty.name, 'data not null? ' + this.debug().IsNullOrUndefined(dataOneWindow));
        var toReturn = [];
        if (dataOneWindow) {
            toReturn.push('------ One Window Snap Shot Start -----');
            toReturn.push('Id: ' + dataOneWindow.Id);
            toReturn.push('TimeStamp: ' + dataOneWindow.TimeStamp);
            toReturn.push('CE Count: ' + dataOneWindow.AllCEAr.length);
            toReturn.push('Type: ' + scWindowType[dataOneWindow.WindowType]);
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
        this.debug().FuncStart(this.__drawStoragePretty.name);
        this.Xyyz.FeedbackMan.ClearTextArea();
        for (var idx = 0; idx < ourData.length; idx++) {
            this.debug().Log('key: \t' + ourData[idx].key);
            var parsed = JSON.parse(ourData[idx].data);
            if (parsed) {
                this.DrawDebugDataPretty(parsed);
                this.debug().Log('------------');
            }
        }
        this.debug().FuncEnd(this.__drawStoragePretty.name);
    }
    SetSettings(currentSettings) {
        this.debug().FuncStart(this.SetSettings.name);
        window.localStorage.setItem(this.Const().Storage.WindowRoot + this.Const().Storage.SettingsSuffix, JSON.stringify(currentSettings));
        this.debug().FuncEnd(this.SetSettings.name);
    }
    GetDefaultSettings() {
        let defaultDebugSettings = {
            KeepDialogOpen: this.Const().Storage.DefaultDebugKeepDialogOpen,
            ShowDebugData: this.Const().Storage.ShowDebugData,
        };
        let toReturn = {
            DebugSettings: defaultDebugSettings
        };
        return toReturn;
    }
    Settings() {
        this.debug().FuncStart(this.Settings.name);
        var defaultSettings = this.GetDefaultSettings();
        var toReturn;
        var settingsRaw = window.localStorage.getItem(this.Const().Storage.WindowRoot + this.Const().Storage.SettingsSuffix);
        this.debug().LogVal('settingsRaw', settingsRaw);
        if (settingsRaw) {
            toReturn = JSON.parse(settingsRaw);
        }
        if (!toReturn) {
            toReturn = defaultSettings;
        }
        this.debug().NotNullCheck('toReturn', toReturn);
        if (!toReturn.DebugSettings) {
            toReturn.DebugSettings = defaultSettings.DebugSettings;
        }
        if (!toReturn.DebugSettings.KeepDialogOpen) {
            toReturn.DebugSettings.KeepDialogOpen = defaultSettings.DebugSettings.KeepDialogOpen;
        }
        if (!toReturn.DebugSettings.ShowDebugData) {
            toReturn.DebugSettings.ShowDebugData = defaultSettings.DebugSettings.ShowDebugData;
        }
        this.DebugSettings(toReturn);
        this.debug().FuncEnd(this.Settings.name);
        return toReturn;
    }
    DebugSettings(toReturn) {
        this.debug().FuncStart(this.DebugSettings.name);
        this.debug().LogVal('Settings', JSON.stringify(toReturn));
        this.debug().FuncEnd(this.DebugSettings.name);
    }
    __getAllLocalStorageAsIOneStorageData() {
        this.debug().FuncStart(this.__getAllLocalStorageAsIOneStorageData.name);
        var toReturn = [];
        for (var idx = 0; idx < window.localStorage.length; idx++) {
            var candidate = {
                data: '',
                key: '',
            };
            candidate.key = window.localStorage.key(idx);
            if (candidate.key.startsWith(this.Const().Storage.WindowRoot + this.Const().Storage.SnapShotSuffix)) {
                candidate.data = window.localStorage.getItem(candidate.key);
                toReturn.push(candidate);
            }
        }
        this.debug().FuncEnd(this.__getAllLocalStorageAsIOneStorageData.name);
        return toReturn;
    }
    WriteToStorage(dataOneWindow) {
        this.debug().FuncStart(this.WriteToStorage);
        var snapShotAsString = JSON.stringify(dataOneWindow);
        this.debug().Log('snapShotAsString: ' + snapShotAsString);
        window.localStorage.setItem(this.Const().Storage.WindowRoot + this.Const().Storage.SnapShotSuffix + dataOneWindow.Id.asString, snapShotAsString);
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
                    candidate.TimeStamp = new Date(candidate.TimeStamp);
                    candidate.Id = this.Xyyz.GuidMan.ParseGuid(candidate.Id.asString);
                    candidate.RawData = oneRaw;
                    if (!candidate.WindowType) {
                        candidate.WindowType = scWindowType.Unknown;
                        candidate.WindowFriendly = scWindowType[candidate.WindowType];
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
                }
            }
        }
        this.UiMan().RefreshUi();
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

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator['throw'](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
        this.__ById('btnDesktop').onclick = () => { this.debug().ClearDebugText(); this.locMan().ChangeLocationSwitchBoard(scWindowType.Desktop, this.PageDataMan().GetParentWindow()); };
        this.__ById('btnCE').onclick = () => { this.__hndlrOpenCE(); };
        this.__ById(this.Const().ElemId.BtnSaveWindowState).onclick = () => { this.__hndlrTakeSnapShot(); };
        this.__ById('btnDrawLocalStorage').onclick = () => { this.AtticMan().DrawStorage(); };
        this.__ById('btnRemoveOneFromLocalStorage').onclick = () => { this.AtticMan().RemoveOneFromStorage(); };
        this.__ById(this.Const().ElemId.Hs.btnClearDebugTextArea).onclick = () => { this.Xyyz.debug.ClearDebugText(); };
        this.__ById(this.Const().ElemId.btnUpdateNicknameB).onclick = () => { this.Xyyz.AtticMan.UpdateNickname(); };
        this.__ById(this.Const().ElemId.hsBtnBigRed).onclick = () => { this.__hndlrAddCETab(); };
        this.__ById(this.Const().ElemId.btnQuickPublish).onclick = (evt) => { this.__hndlrQuickPublish(evt); };
        this.__ById(this.Const().ElemId.Hs.BtnCancel).onclick = (evt) => { this.__hndlrCancelOperation(evt); };
        this.__ById(this.Const().ElemId.BtnRestoreWindowState).onclick = (evt) => { this.__hndlrRestoreClick(evt); };
        this.__ById(this.Const().ElemId.Hs.SelStateSnapShot).onchange = () => { this.Xyyz.UiMan.SelectChanged(); };
        this.__ById(this.Const().ElemId.Hs.SelStateSnapShot).ondblclick = (evt) => { this.__hndlrRestoreClick(evt); };
        document.querySelector(this.Const().Selector.XS.iCBoxdSettingsShowDebugData).onclick = () => { this.UiMan().UpdateAtticFromUi(); };
        this.debug().FuncEnd(this.__wireMenuButtons.name);
    }
    __hndlrCancelOperation(evt) {
        this.UiMan().SetCancelFlag();
    }
    __hndlrQuickPublish(evt) {
        this.__initNewOperation();
        var targetWin = this.PageDataMan().GetParentWindow();
        this.OneWinMan().PublishActiveCE(targetWin);
    }
    __hndlrTakeSnapShot() {
        this.__initNewOperation();
        this.Xyyz.OneWindowMan.SaveWindowState(this.PageDataMan().GetParentWindow());
    }
    __hndlrAddCETab() {
        return __awaiter(this, void 0, void 0, function* () {
            this.__initNewOperation();
            yield this.PromiseGen().RaceWaitAndClick(this.Const().Selector.SC.scStartButton, this.PageDataMan().GetParentWindow().DataDocSelf)
                .then(() => { this.PromiseGen().WaitAndClick(this.Const().Selector.SC.StartMenuLeftOption, this.PageDataMan().GetParentWindow().DataDocSelf); });
        });
    }
    __hndlrOpenCE() {
        this.__initNewOperation();
        this.locMan().ChangeLocationSwitchBoard(scWindowType.ContentEditor, this.PageDataMan().GetParentWindow());
    }
    __initNewOperation() {
        this.debug().ClearDebugText();
        this.UiMan().ClearCancelFlag();
    }
    __hndlrRestoreClick(evt) {
        return __awaiter(this, void 0, void 0, function* () {
            this.debug().FuncStart(this.__hndlrRestoreClick.name);
            this.__initNewOperation();
            try {
                var idOfSelect = this.UiMan().GetIdOfSelectWindowSnapshot();
                this.debug().MarkerA();
                var dataOneWindowStorage = this.AtticMan().GetFromStorageById(idOfSelect);
                this.debug().MarkerB();
                var self = this;
                var targetWindow = yield this.PageDataMan().GetTargetWindowAsync(evt.ctrlKey ? true : false, dataOneWindowStorage.WindowType);
                if (targetWindow) {
                    yield self.Xyyz.OneWindowMan.RestoreWindowStateToTarget(targetWindow, dataOneWindowStorage)
                        .then(() => { this.UiMan().NotifyComplete(targetWindow); })
                        .then(() => {
                    });
                }
                else {
                    self.debug().Error(this.__hndlrRestoreClick.name, 'no target window');
                }
            }
            catch (ex) {
                this.debug().Error(this.__hndlrRestoreClick.name, ex);
            }
            this.debug().FuncEnd(this.__hndlrRestoreClick.name);
        });
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
        this.AtticMan = new AtticManager(this);
        this.EventMan = new EventManager(this);
        this.FeedbackMan = new FeedbackManager(this);
        this.GuidMan = new GuidManager(this);
        this.LocationMan = new LocationManager(this);
        this.MiscMan = new MiscManager(this);
        this.OneCEMan = new OneCEManager(this);
        this.OneDesktopMan = new OneDesktopManager(this);
        this.OneTreeMan = new OneTreeManager(this);
        this.OneWindowMan = new OneWindowManager(this);
        this.PageDataMan = new PageDataManager(this);
        this.PromiseGeneric = new PromiseGeneric(this);
        this.SitecoreUiMan = new SitecoreUiManager(this);
        this.UiMan = new UiManager(this);
        this.Utilities = new Utilities(this);
        this.init();
        this.debug.FuncEnd(this.Start.name);
    }
    init() {
        this.debug.FuncStart(Hub.constructor.name + ' ' + this.init.name);
        this.Const = InjectConst.const;
        this.AtticMan.Init();
        this.debug.Enabled = this.AtticMan.Settings().DebugSettings.ShowDebugData;
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
        this.debug().FuncStart(this.ChangeLocationSwitchBoard.name, 'desired = ' + scWindowType[desiredPageType] + ' iteration: ' + iteration + ':' + this.Const().Iterations.MaxIterationSwitchBoard);
        if (iteration > 0) {
            iteration -= 1;
            var currentState = this.PageDataMan().GetCurrentPageType();
            if (currentState === scWindowType.LoginPage) {
                var self = this;
                var callbackOnComplete = () => {
                    this.debug().Log('callback triggered');
                    self.ChangeLocationSwitchBoard(desiredPageType, targetWindow, iteration);
                };
                this.AdminB(targetWindow.DataDocSelf, callbackOnComplete);
                var self = this;
            }
            else if (currentState === scWindowType.Launchpad || currentState === scWindowType.ContentEditor || currentState === scWindowType.Desktop) {
                var self = this;
                var callBackOnSuccessfulHrefChange = function () {
                    self.debug().Log('Callback triggered');
                    targetWindow = self.PageDataMan().SetWindowDataToCurrent(targetWindow.Window);
                    self.ChangeLocationSwitchBoard(desiredPageType, targetWindow, iteration);
                };
                if (desiredPageType === scWindowType.Desktop && currentState !== scWindowType.Desktop) {
                    this.SetHref(this.Const().UrlSuffix.Desktop, callBackOnSuccessfulHrefChange, targetWindow);
                }
                else if (desiredPageType === scWindowType.ContentEditor && currentState !== scWindowType.ContentEditor) {
                    this.SetHref(this.Const().UrlSuffix.CE, callBackOnSuccessfulHrefChange, targetWindow);
                }
                else if (currentState === scWindowType.Desktop && desiredPageType === scWindowType.Desktop) {
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
            toReturn = targetDoc.Document.querySelector(this.Const().Selector.SC.LoginBtn.sc820);
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
    NotNullOrUndefined(subjectAnyOrAr, label = '', iterationCheck = null) {
        var toReturn = false;
        if (!iterationCheck) {
            iterationCheck = this.Const().MaxNullOrUndefinedIter;
        }
        iterationCheck -= 1;
        if (iterationCheck > 0) {
            if (label === '') {
                label = this.NotNullOrUndefined.name + ' : no labelprovided';
            }
            if (subjectAnyOrAr === 'undefined') {
                this.debug().Error(label, 'Is undefined');
            }
            else if (!subjectAnyOrAr) {
                this.debug().Error(label, 'Is Null');
            }
            else {
                this.debug().LogVal(label, 'Passed');
                toReturn = true;
                if (Array.isArray(subjectAnyOrAr)) {
                    for (var idx = 0; idx < subjectAnyOrAr.length; idx++) {
                        toReturn = toReturn && this.NotNullOrUndefined(subjectAnyOrAr[idx], (idx + 1) + ':' + subjectAnyOrAr.length + ' ' + label, iterationCheck);
                    }
                }
            }
        }
        else {
            this.debug().Error(this.NotNullOrUndefined.name, 'max iteration hit');
        }
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
    __activateNode(hotTreeNode) {
        this.debug().FuncStart(this.__activateNode.name);
        this.debug().Log('clicking it');
        hotTreeNode.click();
        this.debug().FuncEnd(this.__activateNode.name);
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
            var treeGlyphTargetId = this.Const().Names.SC.TreeGlyphPrefix + nextNode.NodeId.asString;
            this.debug().Log('looking for: ' + treeGlyphTargetId + ' ' + nextNode.NodeFriendly + ' in ' + dataOneDocTarget.XyyzId.asShort);
            this.debug().Log('document not null ' + (dataOneDocTarget.Document != null));
            var iterHelper = new IterationHelper(this.Xyyz, 2, this.WaitForAndRestoreOneNode.name);
            var foundOnPageTreeGlyph = null;
            while (!foundOnPageTreeGlyph && iterHelper.DecrementAndKeepGoing()) {
                this.debug().Log('looking for: *' + treeGlyphTargetId + '* ' + nextNode.NodeFriendly + ' in *' + dataOneDocTarget.XyyzId.asShort + '*');
                foundOnPageTreeGlyph = dataOneDocTarget.Document.getElementById(treeGlyphTargetId);
                if (foundOnPageTreeGlyph) {
                    if (nextNode.IsExpanded) {
                        this.__expandNode(foundOnPageTreeGlyph);
                    }
                    if (nextNode.IsActive) {
                        var hotTreeNodeId = this.Const().Names.SC.TreeNodePrefix + nextNode.NodeId.asString;
                        var hotTreeNode = dataOneDocTarget.Document.getElementById(hotTreeNodeId);
                        if (hotTreeNode) {
                            this.__activateNode(hotTreeNode);
                        }
                    }
                }
                else {
                    this.debug().Log('not Found...waiting: ');
                    yield iterHelper.Wait();
                }
            }
            this.debug().FuncEnd(this.WaitForAndRestoreOneNode.name, dataOneDocTarget.XyyzId.asShort);
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
    RestoreCEStateAsync(dataToRestore, dataOneDocTarget) {
        return __awaiter(this, void 0, void 0, function* () {
            this.debug().FuncStart(this.RestoreCEStateAsync.name, dataOneDocTarget.XyyzId.asShort);
            var toReturn = false;
            this.debug().Log('Node Count in storage data: ' + dataToRestore.AllTreeNodeAr.length);
            yield this.WaitForAndRestoreManyAllNodes(dataToRestore, dataOneDocTarget);
            this.debug().FuncEnd(this.RestoreCEStateAsync.name);
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
        var activeOrNot = dataOneTreeNode.IsActive ? '* ' : '  ';
        var expandedOrNot = dataOneTreeNode.IsExpanded ? '+ ' : '  ';
        var toReturn = activeOrNot + expandedOrNot + dataOneTreeNode.NodeId.asString + ' ' + dataOneTreeNode.NodeFriendly;
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
    RestoreDesktopStateAsync(targetWindow, dataToRestore) {
        return __awaiter(this, void 0, void 0, function* () {
            this.debug().FuncStart(this.RestoreDesktopStateAsync.name);
            ;
            if (this.MiscMan().NotNullOrUndefined([targetWindow, dataToRestore, dataToRestore.AllCEAr], this.RestoreDesktopStateAsync.name)) {
                for (var idx = 0; idx < dataToRestore.AllCEAr.length; idx++) {
                    this.debug().Log('data idx: ' + idx + ':' + dataToRestore.AllCEAr.length);
                    var desktopPromiser = new PromiseChainRestoreDesktop(this.Xyyz);
                    yield desktopPromiser.RunOneChain(targetWindow, dataToRestore.AllCEAr[idx]);
                }
            }
            this.debug().FuncEnd(this.RestoreDesktopStateAsync.name);
        });
    }
    RestoreDataToOneIframeWorker(oneCEdata, newIframe) {
        return __awaiter(this, void 0, void 0, function* () {
            this.debug().FuncStart(this.RestoreDataToOneIframeWorker.name, 'data not null: ' + (oneCEdata != null) + ' newFrame not null: ' + (newIframe !== null));
            var toReturn = false;
            this.debug().DebugDataOneIframe(newIframe);
            if (oneCEdata && newIframe) {
                yield this.Xyyz.OneCEMan.RestoreCEStateAsync(oneCEdata, newIframe.ContentDoc);
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
    GetAllLiveIframeData(targetWindow) {
        this.debug().FuncStart(this.GetAllLiveIframeData.name);
        var toReturn = [];
        var iframeAr = targetWindow.DataDocSelf.Document.querySelectorAll(this.Const().Selector.SC.IframeContent);
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
                    Zindex: iframeElem.style.zIndex ? parseInt(iframeElem.style.zIndex) : -1
                };
                toReturn.push(dataOneIframe);
            }
        }
        this.debug().FuncEnd(this.GetAllLiveIframeData.name, 'count:  ' + toReturn.length);
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
        this.debug().FuncEnd(this.SaveStateOneDesktop.name);
    }
}
;

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator['throw'](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
        if (currentPageType === scWindowType.ContentEditor) {
            this.debug().Log('is Content Editor');
            var id = this.Xyyz.GuidMan.EmptyGuid();
            var docElem = targetWindow.DataDocSelf;
            this.Xyyz.OneCEMan.SaveStateOneContentEditor(id, targetWindow.DataDocSelf);
        }
        else if (currentPageType === scWindowType.Desktop) {
            this.debug().Log('is Desktop');
            this.Xyyz.OneDesktopMan.SaveStateOneDesktop(targetWindow);
        }
        else {
            this.debug().Error(this.SaveWindowState.name, 'Invalid page location ' + currentPageType);
        }
        this.debug().FuncEnd(this.SaveWindowState.name);
        ;
    }
    __getTopLevelIframe(targetWindow) {
        var toReturn = null;
        var allIframe = this.DesktopMan().GetAllLiveIframeData(targetWindow);
        var maxZVal = -1;
        if (allIframe && allIframe.length > 0) {
            for (var idx = 0; idx < allIframe.length; idx++) {
                var candidateIframe = allIframe[idx];
                if (candidateIframe && candidateIframe.Zindex > maxZVal) {
                    toReturn = candidateIframe;
                    maxZVal = candidateIframe.Zindex;
                }
            }
        }
        return toReturn;
    }
    PublishActiveCE(targetWindow) {
        this.debug().FuncStart(this.PublishActiveCE.name);
        var currentWindowType = this.PageDataMan().GetCurrentPageType();
        var docToPublish = null;
        if (currentWindowType == scWindowType.Desktop) {
            var topIframe = this.__getTopLevelIframe(targetWindow);
            if (topIframe) {
                docToPublish = topIframe.ContentDoc;
            }
        }
        else {
            docToPublish = this.PageDataMan().GetParentWindow().DataDocSelf;
        }
        this.debug().Log('docToPublish', this.debug().IsNullOrUndefined(docToPublish));
        if (docToPublish) {
            var publishChain = new PromiseChainQuickPublish(this.Xyyz);
            publishChain.PublishCE(docToPublish);
        }
        this.debug().FuncEnd(this.PublishActiveCE.name);
    }
    RestoreWindowStateToTarget(targetWindow, dataToRestore) {
        return __awaiter(this, void 0, void 0, function* () {
            this.debug().FuncStart(this.RestoreWindowStateToTarget.name);
            if (dataToRestore) {
                if (dataToRestore.WindowType === scWindowType.ContentEditor) {
                    yield this.Xyyz.OneCEMan.RestoreCEStateAsync(dataToRestore.AllCEAr[0], targetWindow.DataDocSelf);
                }
                else if (dataToRestore.WindowType === scWindowType.Desktop) {
                    yield this.Xyyz.OneDesktopMan.RestoreDesktopStateAsync(targetWindow, dataToRestore);
                }
                else {
                    this.debug().Error(this.RestoreWindowStateToTarget.name, 'No match found for snap shot');
                }
                this.debug().FuncEnd(this.RestoreWindowStateToTarget.name);
            }
        });
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
        this.debug().FuncStart(this.UpdateStorage.name);
        this.AtticMan().WriteToStorage(this.__activeWindowSnapShot);
        this.UiMan().RefreshUi();
        this.debug().FuncEnd(this.UpdateStorage.name);
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

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator['throw'](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class PageDataManager extends ManagerBase {
    constructor(xyyz) {
        super(xyyz);
        this.debug().CtorName(this.constructor.name);
    }
    GetTargetWindowAsync(useSelf, windowType) {
        return __awaiter(this, void 0, void 0, function* () {
            this.debug().FuncStart(this.GetTargetWindowAsync.name);
            var targetWindow;
            if (useSelf) {
                this.debug().Log('target window is self');
                targetWindow = this.GetParentWindow();
            }
            else {
                this.debug().Log('target window is new');
                let newWindowUrl = this.GetUrlForWindowType(windowType);
                yield this.__getNewTargetWindowAsync(newWindowUrl)
                    .then((data) => targetWindow = data);
            }
            this.debug().FuncEnd(this.GetTargetWindowAsync.name, 'child window id: ' + targetWindow.DataDocSelf.XyyzId.asShort);
            return targetWindow;
        });
    }
    __getNewTargetWindowAsync(newWindowUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                this.debug().FuncStart(this.__getNewTargetWindowAsync.name);
                this.debug().LogVal('newWindowUrl', newWindowUrl);
                var newWindow = this.__winDataParent.Window.open(newWindowUrl);
                var self = this;
                newWindow.addEventListener('load', () => {
                    var toReturn = self.SetWindowDataToCurrent(newWindow);
                    resolve(toReturn);
                });
                this.debug().FuncEnd(this.__getNewTargetWindowAsync.name);
            });
        });
    }
    SetWindowDataToCurrent(window) {
        var toReturn = {
            Friendly: 'New Tab',
            Window: window,
            WindowType: scWindowType.Unknown,
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
    Init() {
        this.debug().FuncStart(this.Init.name);
        if (window.opener) {
            this.__winDataParent = {
                Window: window.opener,
                Friendly: 'Parent Window',
                WindowType: scWindowType.Unknown,
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
        if (currentLoc.indexOf(this.Const().UrlSuffix.Login) > -1) {
            toReturn = scWindowType.LoginPage;
        }
        else if (currentLoc.toLowerCase().indexOf(this.Const().UrlSuffix.Desktop.toLowerCase()) > -1) {
            this.debug().Log('Testing for Desktop editor');
            this.debug().Log('currentLoc.toLowerCase()' + currentLoc.toLowerCase());
            this.debug().Log('this.Const().Url.Desktop.toLowerCase()' + this.Const().UrlSuffix.Desktop.toLowerCase());
            toReturn = scWindowType.Desktop;
        }
        else if (new RegExp(this.Const().Regex.ContentEditor).test(currentLoc)) {
            toReturn = scWindowType.ContentEditor;
        }
        else if (currentLoc.toLowerCase().indexOf(this.Const().UrlSuffix.LaunchPad.toLowerCase()) > -1) {
            toReturn = scWindowType.Launchpad;
        }
        else {
            toReturn = scWindowType.Unknown;
        }
        this.debug().FuncEnd(this.GetPageTypeOfTargetWindow.name, scWindowType[toReturn]);
        return toReturn;
    }
    GetUrlForWindowType(windowType) {
        var toReturn;
        var hostName = this.__winDataParent.DataDocSelf.Document.location.origin;
        switch (windowType) {
            case scWindowType.ContentEditor:
                toReturn = hostName + this.Const().UrlSuffix.CE;
                break;
            case scWindowType.Desktop:
                toReturn = hostName + this.Const().UrlSuffix.Desktop;
                break;
            default:
                toReturn = hostName;
                this.debug().Error(this.GetUrlForWindowType.name, 'unaccounted for window type');
                break;
        }
        return toReturn;
    }
    GetCurrentPageType() {
        this.debug().FuncStart(this.GetCurrentPageType.name);
        var toReturn = scWindowType.Unknown;
        if (this.__winDataParent && this.__winDataParent && this.__winDataParent.Window && this.__winDataParent.DataDocSelf) {
            toReturn = this.GetPageTypeOfTargetWindow(this.__winDataParent.Window);
        }
        this.debug().FuncEnd(this.GetCurrentPageType.name + ' (' + toReturn + ') ' + scWindowType[toReturn]);
        return toReturn;
    }
    DebugInfo() {
        this.debug().FuncStart(this.DebugInfo.name);
        this.debug().Log(this.__winDataParent.Window);
        this.debug().Log(this.__winDataParent.DataDocSelf);
        this.debug().FuncEnd(this.DebugInfo.name);
    }
}

class SitecoreUiManager extends ManagerBase {
    constructor(xyyz) {
        super(xyyz);
        xyyz.debug.FuncStart(OneWindowManager.name);
        xyyz.debug.FuncEnd(OneWindowManager.name);
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
    NotifyComplete(targetWindow) {
        let bodyTag = targetWindow.DataDocSelf.Document.getElementsByTagName('body')[0];
        alert(bodyTag);
        var flagElem = targetWindow.DataDocSelf.Document.createElement('div');
        flagElem.innerHTML = '<div>Complete</div>';
        flagElem.style.position = 'absolute';
        flagElem.style.top = '100px';
        flagElem.style.left = '100px';
        flagElem.style.backgroundColor = 'yellow';
        flagElem.style.zIndex = '999';
        flagElem.style.fontSize = '40px';
        console.log(flagElem.toString());
        setTimeout(function () {
            flagElem.remove();
        }, this.Const().Timeouts.WaitBeforeRemovingCompleteFlag);
        bodyTag.appendChild(flagElem);
    }
    UpdateAtticFromUi() {
        this.debug().FuncStart(this.UpdateAtticFromUi.name);
        let currentSettings = this.AtticMan().Settings();
        let currentVal = document.querySelector(this.Const().Selector.XS.iCBoxdSettingsShowDebugData).checked;
        this.debug().LogVal('currentVal', currentVal.toString());
        currentSettings.DebugSettings.ShowDebugData = currentVal;
        this.AtticMan().SetSettings(currentSettings);
        this.RefreshUi();
        this.debug().FuncEnd(this.UpdateAtticFromUi.name);
    }
    SelectChanged() {
        this.debug().FuncStart(this.SelectChanged.name);
        this.__selectSnapshotIndex = this.__getSelectElem().selectedIndex;
        this.debug().Log('new index :' + this.__selectSnapshotIndex);
        this.RefreshUi();
        this.debug().FuncEnd(this.SelectChanged.name);
    }
    __GetCancelButton() {
        return document.getElementById(this.Const().ElemId.Hs.BtnCancel);
    }
    SetCancelFlag() {
        this.OperationCancelled = true;
        var btn = this.__GetCancelButton();
        if (btn) {
            btn.classList.add('red');
        }
    }
    ClearCancelFlag() {
        var btn = this.__GetCancelButton();
        if (btn) {
            btn.classList.remove('red');
        }
        this.UiMan().OperationCancelled = false;
    }
    __refreshSettings() {
        this.debug().FuncStart(this.__refreshSettings.name);
        let debugFieldSet = window.document.querySelector(this.Const().Selector.XS.IdFieldSetDebug);
        let currentSettings = this.AtticMan().Settings();
        if (currentSettings) {
            if (debugFieldSet) {
                let newDisplay = this.AtticMan().Settings().DebugSettings.ShowDebugData ? '' : 'none';
                debugFieldSet.style.display = newDisplay;
            }
            let checkBoxShowDebug = window.document.querySelector(this.Const().Selector.XS.iCBoxdSettingsShowDebugData);
            if (checkBoxShowDebug) {
                this.debug().LogVal('before', checkBoxShowDebug.checked.toString());
                checkBoxShowDebug.checked = currentSettings.DebugSettings.ShowDebugData;
                this.debug().LogVal('after', checkBoxShowDebug.checked.toString());
            }
            else {
                this.debug().Error(this.RefreshUi.name, 'no checkbox found');
            }
        }
        else {
            this.debug().Error(this.RefreshUi.name, 'no settings found');
        }
        this.debug().FuncEnd(this.__refreshSettings.name);
    }
    RefreshUi() {
        this.debug().FuncStart(this.DrawCorrectNicknameInUI.name);
        this.__populateStateSel();
        this.DrawCorrectNicknameInUI();
        this.__refreshSettings();
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
        return window.document.getElementById(this.Const().ElemId.Hs.SelStateSnapShot);
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
class PromiseChainQuickPublish extends ManagerBase {
    constructor(xyyz) {
        xyyz.debug.FuncStart(PromiseChainRestoreDesktop.name);
        super(xyyz);
        xyyz.debug.FuncEnd(PromiseChainRestoreDesktop.name);
    }
    __debugDataPublishChain(dataPublishChain) {
        this.debug().FuncStart(this.__debugDataPublishChain.name);
        this.debug().LogVal('docToPublish', this.debug().IsNullOrUndefined(dataPublishChain.docToPublish));
        this.debug().LogVal('jq', this.debug().IsNullOrUndefined(dataPublishChain.jq) + ' ' + (dataPublishChain.jq ? dataPublishChain.jq.src : ''));
        this.debug().LogVal('blue', this.debug().IsNullOrUndefined(dataPublishChain.blue) + ' ' + (dataPublishChain.blue ? dataPublishChain.blue.src : ''));
        this.debug().LogVal('red', this.debug().IsNullOrUndefined(dataPublishChain.red) + ' ' + (dataPublishChain.red ? dataPublishChain.red.src : ''));
        this.debug().FuncEnd(this.__debugDataPublishChain.name);
    }
    __waitForAndClick(selector, targetDoc, dataPublishChain) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            this.debug().FuncStart(this.__waitForAndClick.name, selector);
            yield this.PromiseGen().WaitAndClick(selector, targetDoc)
                .then(() => resolve(dataPublishChain))
                .catch(ex => {
                this.debug().Error(this.__waitForAndClick.name, ex);
                reject(ex);
            });
        }));
    }
    PublishCE(docToPublish) {
        return __awaiter(this, void 0, void 0, function* () {
            this.debug().FuncStart(this.PublishCE.name);
            var targetDocA = docToPublish;
            var targetDoc = docToPublish.Document;
            var dataPublishChain = {
                docToPublish: docToPublish,
                blue: null,
                jq: null,
                red: null
            };
            yield this.__waitForAndClick('[id*=_Nav_PublishStrip]', targetDocA, dataPublishChain)
                .then((dataPublishChain) => this.__waitForAndClick('[id=B414550BADAF4542C9ADF44BED5FA6CB3E_menu_button]', targetDocA, dataPublishChain))
                .then((dataPublishChain) => this.__waitForAndClick('[id=B414550BADAF4542C9ADF44BED5FA6CB3E_menu_98719A90225A4802A0625D3967E4DD47]', targetDocA, dataPublishChain))
                .then((dataPublishChain) => this.__waitFor('[id=jqueryModalDialogsFrame]', targetDoc, dataPublishChain, (found, dataPublishChain) => {
                dataPublishChain.jq = found;
                return dataPublishChain;
            }))
                .then((dataPublishChain) => this.__waitFor('[id=scContentIframeId0]', dataPublishChain.jq.contentDocument, dataPublishChain, (found, dataPublishChain) => {
                this.debug().Log('before');
                this.__debugDataPublishChain(dataPublishChain);
                dataPublishChain.blue = found;
                this.debug().Log('after');
                this.__debugDataPublishChain(dataPublishChain);
                return dataPublishChain;
            }))
                .then((dataPublishChain) => this.__waitFor('[id=NextButton]', dataPublishChain.blue.contentDocument, dataPublishChain))
                .then((dataPublishChain) => this.__waitFor('[id=scContentIframeId1]', dataPublishChain.jq.contentDocument, dataPublishChain, (found, dataPublishChain) => {
                dataPublishChain.red = found;
                return dataPublishChain;
            }))
                .then((dataPublishChain) => this.__waitFor('[id=OK]', dataPublishChain.red.contentDocument, dataPublishChain))
                .then((dataPublishChain) => this.__waitFor('[id=CancelButton]', dataPublishChain.blue.contentDocument, dataPublishChain))
                .catch(ex => {
                this.debug().Error(this.PublishCE.name, ex);
            });
            this.debug().FuncEnd(this.PublishCE.name);
        });
    }
    __waitFor(selector, targetDoc, dataPublishChain, optionFunc = null) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            this.debug().FuncStart(this.__waitFor.name, selector + ' ' + targetDoc.location.href);
            var found = null;
            var iterationJr = new IterationHelper(this.Xyyz, 6, this.__waitFor.name);
            while (!found && iterationJr.DecrementAndKeepGoing()) {
                found = targetDoc.querySelector(selector);
                if (found) {
                    this.debug().Log('found');
                    if (optionFunc) {
                        this.debug().Log('executing func');
                        dataPublishChain = yield optionFunc(found, dataPublishChain);
                    }
                    this.__debugDataPublishChain(dataPublishChain);
                    this.debug().FuncEnd(this.__waitFor.name, selector + targetDoc.location.href);
                    resolve(dataPublishChain);
                }
                else {
                    yield iterationJr.Wait();
                }
            }
            if (!found && iterationJr.IsExhausted) {
                this.debug().FuncEnd(this.__waitFor.name, selector + targetDoc.location.href);
                reject('exhausted');
            }
        }));
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
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            this.debug().FuncStart(this.__waitForAndClickRedStartButtonPromise.name);
            if (this.MiscMan().NotNullOrUndefined([promiseBucket, promiseBucket.targetDoc], this.__waitForAndClickRedStartButtonPromise.name)) {
                yield this.PromiseGen().RaceWaitAndClick(this.Const().Selector.SC.scStartButton, promiseBucket.targetDoc)
                    .then(() => resolve(promiseBucket))
                    .catch(ex => {
                    this.debug().Error(this.__waitForAndClickRedStartButtonPromise.name, ex);
                    reject();
                });
            }
            else {
                reject();
            }
            this.debug().FuncEnd(this.__waitForAndClickRedStartButtonPromise.name);
        }));
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
            yield this.PromiseGen().WaitAndClick(this.Const().Selector.SC.StartMenuLeftOption, promiseBucket.targetWindow.DataDocSelf)
                .then(() => { resolve(promiseBucket); })
                .catch((ex) => { reject(this.__waitForAndThenClickCEFromMenuPromise.name); });
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
            this.debug().FuncStart(this.RunOneChain.name);
            if (this.MiscMan().NotNullOrUndefined([targetWindow, dataToRestore], this.RunOneChain.name)) {
                var allIframeData = this.DesktopMan().GetAllLiveIframeData(targetWindow);
                var dataBucket = {
                    targetWindow: targetWindow,
                    targetDoc: targetWindow.DataDocSelf,
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
                this.debug().FuncEnd(this.RunOneChain.name);
            }
        });
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
class PromiseGeneric extends ManagerBase {
    constructor(xyyz) {
        xyyz.debug.FuncStart(PromiseChainRestoreDesktop.name);
        super(xyyz);
        xyyz.debug.FuncEnd(PromiseChainRestoreDesktop.name);
    }
    WaitForPageReadyNative(targetWindow) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                this.debug().FuncStart(this.WaitForPageReadyNative.name);
                let iterationJr = new IterationHelper(this.Xyyz, 5, this.WaitAndClick.name);
                var loaded = false;
                if (this.MiscMan().NotNullOrUndefined(targetWindow, this.WaitForPageReadyNative.name + ' document')) {
                }
            }));
        });
    }
    WaitForPageReady(targetWindow) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                this.debug().FuncStart(this.WaitForPageReady.name);
                this.debug().NotNullCheck('toReturn', targetWindow);
                this.debug().NotNullCheck('toReturn', targetWindow.DataDocSelf);
                this.debug().NotNullCheck('toReturn', targetWindow.DataDocSelf.Document);
                this.debug().NotNullCheck('toReturn', targetWindow.DataDocSelf.Document.location);
                this.debug().NotNullCheck('toReturn', targetWindow.DataDocSelf.Document.location.href);
                this.debug().LogVal('targetWindow.DataDocSelf.Document.location.href', targetWindow.DataDocSelf.Document.location.href);
                if (targetWindow) {
                    yield this.WaitForPageReadyNative(targetWindow)
                        .then(() => resolve())
                        .catch((ex) => {
                        reject(ex);
                    });
                }
                this.debug().FuncEnd(this.WaitForPageReady.name);
            }));
        });
    }
    RaceWaitAndClick(selector, targetDoc, resolveFn = null) {
        return __awaiter(this, void 0, void 0, function* () {
            this.debug().FuncStart(this.RaceWaitAndClick.name);
            var prom1 = this.WaitAndClick(selector.sc920, targetDoc, resolveFn);
            var prom2 = this.WaitAndClick(selector.sc820, targetDoc, resolveFn);
            this.debug().FuncEnd(this.RaceWaitAndClick.name);
            return yield Promise.race([prom1, prom2]);
        });
    }
    WaitAndClick(selector, targetDoc, resolveFn = null) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            this.debug().FuncStart(this.WaitAndClick.name, selector);
            var found = null;
            var iterationJr = new IterationHelper(this.Xyyz, 10, this.WaitAndClick.name);
            while (!found && iterationJr.DecrementAndKeepGoing() && !this.UiMan().OperationCancelled) {
                found = targetDoc.Document.querySelector(selector);
                if (found) {
                    this.debug().Log('found and clicking');
                    found.click();
                    this.debug().FuncEnd(this.WaitAndClick.name, selector);
                    if (resolveFn) {
                        resolveFn();
                    }
                    resolve();
                }
                else {
                    yield iterationJr.Wait();
                }
            }
            this.debug().FuncEnd(this.WaitAndClick.name, selector);
            if (!found && iterationJr.IsExhausted) {
                reject('exhausted');
            }
        }));
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
        var treeNode = parentNode.querySelector(this.Const().Selector.SC.IdStartsWithTreeNode);
        if (treeNode) {
            toReturn = treeNode.innerText;
        }
        else {
            this.debug().Log('No treeNode');
        }
        this.debug().FuncEnd(this.GetFriendlyNameFromNode.name, toReturn);
        return toReturn;
    }
    __isActive(targetNode) {
        var toReturn = false;
        var firstNodeActiveTest = targetNode.querySelector(this.Const().Selector.SC.IdStartsWithTreeNode);
        if (firstNodeActiveTest) {
            var className = firstNodeActiveTest.className;
            if (className.indexOf(this.Const().ClassNames.SC.scContentTreeNodeActive) > -1) {
                toReturn = true;
                this.debug().Log('** isActive ' + targetNode.innerText);
            }
        }
        return toReturn;
    }
    __isExpanded(firstImg) {
        var toReturn = false;
        if (firstImg) {
            var srcAttr = firstImg.getAttribute('src');
            if (srcAttr.indexOf(this.Const().Names.SC.TreeExpandedPng.sc920) > -1) {
                toReturn = true;
            }
            return toReturn;
        }
    }
    __isContentTreeNode(targetNode) {
        var toReturn = false;
        var className = targetNode.className;
        if (className === this.Const().ClassNames.ContentTreeNode) {
            toReturn = true;
        }
        return toReturn;
    }
    WalkNodeRecursive(targetNode, depth) {
        var toReturn = [];
        depth = depth - 1;
        if (targetNode) {
            var firstImg = targetNode.querySelector(this.Const().Selector.SC.ContentTreeNodeGlyph);
            if (this.__isContentTreeNode(targetNode)) {
                var newData = {
                    IsExpanded: this.__isExpanded(firstImg),
                    IsActive: this.__isActive(targetNode),
                    NodeFriendly: '',
                    NodeId: null
                };
                if (newData.IsExpanded || newData.IsActive) {
                    this.debug().LogVal('isExpanded', newData.IsExpanded.toString());
                    this.debug().LogVal('isActive', newData.IsActive.toString());
                    newData.NodeFriendly = this.GetFriendlyNameFromNode(firstImg);
                    this.debug().LogVal('friendlyName', newData.NodeFriendly);
                    var apparentId = firstImg.id.replace(this.Const().Names.SC.TreeGlyphPrefix, '');
                    newData.NodeId = this.Xyyz.GuidMan.ParseGuid(apparentId);
                    toReturn.push(newData);
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
