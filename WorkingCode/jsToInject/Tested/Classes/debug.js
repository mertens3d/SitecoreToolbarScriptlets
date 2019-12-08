var Debug = /** @class */ (function () {
    function Debug() {
        console.log('debug');
        this.__indentCount = 0;
    }
    Debug.prototype.Log = function (text) {
        var indent = '  ';
        //text =  indent.repeat(this.__indentCount) + text;
        for (var idx = 0; idx < this.__indentCount; idx++) {
            text = indent + text;
        }
        console.log(text);
        var ta = document.getElementById('ta-debug');
        if (ta) {
            ta.value += text + '\\n\\r';
            ta.scrollTop = ta.scrollHeight;
        }
    };
    Debug.prototype.FuncStart = function (text) {
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