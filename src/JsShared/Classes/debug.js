"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Debug = /** @class */ (function () {
    function Debug(parentWindow) {
        this.Enabled = false;
        this.__debugTextChangedCallbacks = [];
        this.debugPrefix = '\t\t';
        this.__indentCount = 0;
        this.ParentWindow = parentWindow;
    }
    Debug.prototype.DebugIDataDoc = function (dataOneDoc) {
        this.FuncStart(this.DebugIDataDoc.name);
        this.Log('');
        this.Log(this.debugPrefix + this.DebugIDataDoc.name);
        if (dataOneDoc) {
            this.Log(this.debugPrefix + 'dataOneDoc: \t' + this.IsNullOrUndefined(dataOneDoc));
            this.Log(this.debugPrefix + 'dataOneDoc.XyyzId.asShort: \t' + this.IsNullOrUndefined(dataOneDoc.XyyzId.asShort));
            this.Log(this.debugPrefix + 'dataOneDoc.Document: \t' + this.IsNullOrUndefined(dataOneDoc.Document));
            if (dataOneDoc.Document) {
                this.LogVal(this.debugPrefix + 'dataOneDoc.Document.readyState:', dataOneDoc.Document.readyState);
                if (dataOneDoc.Document.location) {
                    this.LogVal(this.debugPrefix + 'targetDoc.location.href', dataOneDoc.Document.location.href);
                }
                else {
                    this.Log(this.debugPrefix + 'dataOneDoc.Document.location - does not exist');
                }
            }
            else {
                this.Log(this.debugPrefix + 'dataOneDoc.Document - does not exist');
            }
        }
        else {
            this.Error(this.DebugIDataDoc.name, 'no targetDoc');
        }
        this.Log('');
    };
    Debug.prototype.AddDebugTextChangedCallback = function (caller, callback) {
        //console.log('========================================');
        this.__debugTextChangedCallbacks.push({
            Caller: caller,
            Func: callback
        });
    };
    Debug.prototype.HndlrClearDebugText = function (self, verify) {
        if (verify === void 0) { verify = false; }
        var proceed = true;
        if (verify) {
            proceed = confirm('Clear Debug TextArea ?');
        }
        console.log('maker pink');
        if (proceed) {
            var newText = '--- Debug Text Reset ---';
            self.__triggerAllDebugTextChangedCallbacks({
                NewText: newText,
                Append: false
            });
        }
    };
    Debug.prototype.MarkerA = function () {
        this.__markerRaw('A');
    };
    Debug.prototype.MarkerB = function () {
        this.__markerRaw('B');
    };
    Debug.prototype.MarkerC = function () {
        this.__markerRaw('C');
    };
    Debug.prototype.MarkerD = function () {
        this.__markerRaw('D');
    };
    Debug.prototype.MarkerE = function () {
        this.__markerRaw('E');
    };
    Debug.prototype.__markerRaw = function (marker) {
        this.Log('Marker ' + marker);
    };
    Debug.prototype.LogVal = function (textValName, textValVal) {
        this.Log(textValName + ' : ' + textValVal);
    };
    Debug.prototype.Log = function (text, optionalValue, hasPrefix) {
        if (optionalValue === void 0) { optionalValue = ''; }
        if (hasPrefix === void 0) { hasPrefix = false; }
        if (this.Enabled) {
            var indent = '  ';
            //text =  indent.repeat(this.__indentCount) + text;
            for (var idx = 0; idx < this.__indentCount; idx++) {
                text = indent + text;
            }
            var prefixLength = 3;
            if (!hasPrefix) {
                for (var idx = 0; idx < prefixLength; idx++) {
                    text = ' ' + text;
                }
            }
            this.__triggerAllDebugTextChangedCallbacks({
                NewText: text,
                Append: true
            });
            console.log(text);
            if (this.ParentWindow) {
                this.ParentWindow.console.log(text);
            }
        }
    };
    Debug.prototype.__triggerAllDebugTextChangedCallbacks = function (data) {
        for (var idx = 0; idx < this.__debugTextChangedCallbacks.length; idx++) {
            var oneCallback = this.__debugTextChangedCallbacks[idx];
            oneCallback.Func(oneCallback.Caller, data);
        }
    };
    Debug.prototype.CtorName = function (ctorName) {
        this.Log('Constructor: ' + ctorName);
    };
    Debug.prototype.FuncStart = function (textOrFunc, optionalValue) {
        textOrFunc = 's) ' + textOrFunc;
        if (!optionalValue) {
            optionalValue = '';
        }
        else {
            optionalValue = optionalValue.toString();
        }
        //if (typeof (textOrFunc) === 'function') {
        //  console.log('******* is func *************');
        //  textOrFunc = textOrFunc.name;
        //}
        if (optionalValue.length > 0) {
            textOrFunc = textOrFunc + ' : ' + optionalValue;
        }
        this.Log(textOrFunc, '', true);
        this.__indentCount++;
        if (this.__indentCount > 10) {
            this.__indentCount = 10;
        }
    };
    Debug.prototype.FuncEnd = function (text, optionalValue) {
        if (optionalValue === void 0) { optionalValue = ''; }
        text = 'e) ' + text;
        if (optionalValue.length > 0) {
            text = text + ' : ' + optionalValue;
        }
        this.__indentCount--;
        if (this.__indentCount < 0) {
            this.__indentCount = 0;
        }
        this.Log(text, optionalValue, true);
    };
    Debug.prototype.Error = function (container, text) {
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
    };
    Debug.prototype.NotNullCheck = function (title, value) {
        if (typeof value === 'undefined') {
            this.LogVal(title, 'Is Undefined');
        }
        else if (!value) {
            this.LogVal(title, 'Is Null');
        }
        else {
            this.LogVal(title, 'Is Not Null');
        }
    };
    Debug.prototype.IsNullOrUndefined = function (subject) {
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
    };
    Debug.prototype.PromiseBucketDebug = function (promiseBucket, friendlyName) {
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
    };
    Debug.prototype.DebugDataOneIframe = function (dataOneIframe) {
        this.FuncStart(this.DebugDataOneIframe.name);
        this.Log('dataOneIframe : ' + this.IsNullOrUndefined(dataOneIframe));
        if (dataOneIframe) {
            this.Log('dataOneIframe.Nickname : ' + dataOneIframe.Nickname);
            this.Log('dataOneIframe.IframeElem: \t' + this.IsNullOrUndefined(dataOneIframe.IframeElem));
            if (dataOneIframe.IframeElem) {
                this.Log('dataOneIframe.id: \t' + this.IsNullOrUndefined(dataOneIframe.IframeElem.id));
                //  //this.Log('dataOneIframe.IframeElem.src: \t' + this.IsNullOrUndefined(dataOneIframe.IframeElem.src));
                //  this.Log('dataOneIframe.IframeElem.id: \t' + this.IsNullOrUndefined(dataOneIframe.IframeElem.id));
                //  //this.Log('dataOneIframe.IframeElem.name: \t' + this.IsNullOrUndefined(dataOneIframe.IframeElem.name));
            }
            this.Log('dataOneIframe.ContentDoc: \t' + this.IsNullOrUndefined(dataOneIframe.ContentDoc));
            this.DebugIDataDoc(dataOneIframe.ContentDoc);
            //this.Log('dataOneIframe.IframeElem: \t' + this.IsNullOrUndefined(dataOneIframe.IframeElem));
            //this.Log('dataOneIframe.Id: \t' + this.IsNullOrUndefined(dataOneIframe.Id));
            //if (dataOneIframe.Id) {
            //  this.Log('dataOneIframe.Id.asShort: \t' + this.IsNullOrUndefined(dataOneIframe.Id.asShort));
            //}
            //this.Log('dataOneIframe.DocElem: \t' + this.IsNullOrUndefined(dataOneIframe.Index));
        }
        this.FuncEnd(this.DebugDataOneIframe.name);
    };
    return Debug;
}());
exports.Debug = Debug;
//# sourceMappingURL=debug.js.map