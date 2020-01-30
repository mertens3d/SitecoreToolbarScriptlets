"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GuidHelper_1 = require("./GuidHelper");
var scWindowType_1 = require("../Enums/scWindowType");
var MessageFlag_1 = require("../Enums/MessageFlag");
var Utilities = /** @class */ (function () {
    function Utilities(debug) {
        debug.FuncStart(Utilities.name);
        this.Debug = debug;
        this.GuidMan = new GuidHelper_1.GuidHelper(debug);
        //this.Utilities = new Utilities(debug);
        debug.FuncEnd(Utilities.name);
    }
    Utilities.prototype.SelectHeaderStr = function () {
        var toReturn = '';
        // '    Time Stamp          - Page Type - Nickname       - Favorite?';
        toReturn += this.Buffer('...Time Stamp', 23, '.', false);
        toReturn += this.Buffer('- Page Type', 20, '.', false, false);
        toReturn += this.Buffer('- Nickname', 16, '.', false, false);
        toReturn += this.Buffer('- Fav.', 4, '.', false);
        return toReturn;
    };
    Utilities.prototype.MakeSelectorFromId = function (TabId) {
        return '[id=' + TabId + ']';
    };
    Utilities.prototype.MsgFlagAsString = function (msg) {
        var toReturn = "{error}";
        if (this.Debug.IsNotNullOrUndefinedBool('message', msg)) {
            try {
                toReturn = MessageFlag_1.MsgFlag[msg.MsgFlag];
            }
            catch (e) {
            }
        }
        return 'flag: ' + toReturn;
    };
    Utilities.prototype.TimeNicknameFavStr = function (data) {
        var typeStr = (data.WindowType === scWindowType_1.scWindowType.Unknown) ? '?' : scWindowType_1.scWindowType[data.WindowType];
        return this.MakeFriendlyDate(data.TimeStamp)
            + ' - ' + this.Buffer(typeStr, 17, ' ', false)
            + ' - ' + this.Buffer(data.NickName, 16, ' ', false)
            + ' - ' + this.Buffer((data.IsFavorite ? '*' : ' '), 1);
    };
    Utilities.prototype.Buffer = function (str, desiredLength, buffChar, bufferLEft, useNbsp) {
        if (buffChar === void 0) { buffChar = ' '; }
        if (bufferLEft === void 0) { bufferLEft = true; }
        if (useNbsp === void 0) { useNbsp = true; }
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
            if (buffChar === ' ' && useNbsp) {
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
    };
    Utilities.prototype.MakeFriendlyDate = function (date) {
        var year = date.getFullYear();
        var month = date.getMonth();
        var day = this.Buffer(date.getDay().toString(), 2, '0');
        var min = this.Buffer(date.getMinutes().toString(), 2, '0');
        var hoursRaw = date.getHours();
        var ampm = hoursRaw >= 12 ? 'pm' : 'am';
        hoursRaw = hoursRaw % 12;
        var hourClean = hoursRaw ? hoursRaw : 12; // the hour '0' should be '12'
        var hourCleanStr = this.Buffer(hourClean.toString(), 2, '0');
        var toReturn = year + '.' + month + '.' + day + ' ' + hourCleanStr + ':' + min + ' ' + ampm;
        return toReturn;
    };
    return Utilities;
}());
exports.Utilities = Utilities;
//# sourceMappingURL=Utilities.js.map