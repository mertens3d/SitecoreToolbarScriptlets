var xyyz = xyyz || {};

xyyz.debug = {
    IndentCount: 0,

    Log: function (text) {
        text = '  '.repeat(this.IndentCount) + text;
        console.log(text);
        var ta = document.getElementById('ta-debug');
        if (ta) {
            ta.value += ('\\n\\r' + text);
        }
    },
    FuncStart: function (text) {
        text = 's) ' + text;
        this.Log(text);
        this.IndentCount++;
    },
    FuncEnd: function (text) {
        text = 'e) ' + text;
        this.Log(text);
        this.IndentCount--;
    },
    Error: function (text) {
        text = '** ERROR ** ' + text;
        this.Log(text);
    }
};