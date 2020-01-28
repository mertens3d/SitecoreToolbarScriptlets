"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractDebug = /** @class */ (function () {
    function AbstractDebug(parentWindow) {
        this.Enabled = false;
        this.__debugTextChangedCallbacks = [];
        this.debugPrefix = '\t\t';
        this.__indentCount = 0;
        this.ParentWindow = parentWindow;
    }
    AbstractDebug.prototype.DebugIDataDoc = function (dataOneDoc) {
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
    AbstractDebug.prototype.AddDebugTextChangedCallback = function (caller, callback) {
        //console.log('========================================');
        this.__debugTextChangedCallbacks.push({
            Caller: caller,
            Func: callback
        });
    };
    AbstractDebug.prototype.HndlrClearDebugText = function (self, verify) {
        if (verify === void 0) { verify = false; }
        this.FuncStart(this.HndlrClearDebugText.name);
        var proceed = true;
        if (verify) {
            proceed = confirm('Clear Debug TextArea ?');
        }
        console.log('maker pink');
        console.log('enabled? ' + this.Enabled.toString());
        if (proceed) {
            var newText = '--- Debug Text Reset ---';
            self.__triggerAllDebugTextChangedCallbacks({
                NewText: newText,
                Append: false
            });
        }
        this.FuncEnd(this.HndlrClearDebugText.name);
    };
    AbstractDebug.prototype.MarkerA = function () {
        this.__markerRaw('A');
    };
    AbstractDebug.prototype.MarkerB = function () {
        this.__markerRaw('B');
    };
    AbstractDebug.prototype.MarkerC = function () {
        this.__markerRaw('C');
    };
    AbstractDebug.prototype.MarkerD = function () {
        this.__markerRaw('D');
    };
    AbstractDebug.prototype.MarkerE = function () {
        this.__markerRaw('E');
    };
    AbstractDebug.prototype.__markerRaw = function (marker) {
        this.Log('Marker ' + marker);
    };
    AbstractDebug.prototype.LogVal = function (textValName, textValVal) {
        this.Log(textValName + ' : ' + textValVal);
    };
    AbstractDebug.prototype.Log = function (text, optionalValue, hasPrefix) {
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
    AbstractDebug.prototype.__triggerAllDebugTextChangedCallbacks = function (data) {
        for (var idx = 0; idx < this.__debugTextChangedCallbacks.length; idx++) {
            var oneCallback = this.__debugTextChangedCallbacks[idx];
            oneCallback.Func(oneCallback.Caller, data);
        }
    };
    AbstractDebug.prototype.CtorName = function (ctorName) {
        this.Log('Constructor: ' + ctorName);
    };
    AbstractDebug.prototype.FuncStart = function (textOrFunc, optionalValue) {
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
    AbstractDebug.prototype.FuncEnd = function (text, optionalValue) {
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
    AbstractDebug.prototype.Error = function (container, text) {
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
    AbstractDebug.prototype.NotNullCheck = function (title, value) {
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
    AbstractDebug.prototype.IsNullOrUndefined = function (subject) {
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
    return AbstractDebug;
}());
exports.AbstractDebug = AbstractDebug;
//# sourceMappingURL=debug.js.map