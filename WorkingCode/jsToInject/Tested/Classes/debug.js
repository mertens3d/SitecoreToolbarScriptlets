var Debug = /** @class */ (function () {
    function Debug(parentWindow) {
        console.log('debug');
        this.__indentCount = 0;
        this.ParentWindow = parentWindow;
    }
    Debug.prototype.__getTextArea = function () {
        return document.getElementById('ta-debug');
    };
    Debug.prototype.ClearTextArea = function () {
        var ta = this.__getTextArea();
        if (ta) {
            ta.value = '';
        }
        else {
            this.Error(Debug.name, 'No text area found');
        }
    };
    Debug.prototype.Log = function (text) {
        var indent = '  ';
        //text =  indent.repeat(this.__indentCount) + text;
        for (var idx = 0; idx < this.__indentCount; idx++) {
            text = indent + text;
        }
        console.log(text);
        var ta = this.__getTextArea();
        if (ta) {
            ta.value += text + '\\n\\r';
            ta.scrollTop = ta.scrollHeight;
        }
        if (this.ParentWindow) {
            this.ParentWindow.console.log(text);
        }
    };
    Debug.prototype.FuncStart = function (text) {
        //console.log('caller is ' + this.FuncStart.caller.name)
        text = 's) ' + text;
        this.Log(text);
        this.__indentCount++;
    };
    Debug.prototype.FuncEnd = function (text) {
        text = 'e) ' + text;
        this.__indentCount--;
        this.Log(text);
    };
    Debug.prototype.Error = function (container, text) {
        if (!container) {
            container = 'unknown';
        }
        if (!text) {
            text = 'unknown';
        }
        var logText = '** ERROR ** ' + container + ':' + text;
        this.Log(logText);
    };
    return Debug;
}());
//# sourceMappingURL=debug.js.map