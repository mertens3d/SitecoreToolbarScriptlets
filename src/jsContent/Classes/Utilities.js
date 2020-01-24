"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var scWindowType_1 = require("../Enums/scWindowType");
var GuidHelper_1 = require("../../JsShared/Classes/GuidHelper");
var Utilities = /** @class */ (function () {
    function Utilities(debug) {
        debug.FuncStart(Utilities.name);
        this.GuidMan = new GuidHelper_1.GuidHelper();
        this.Utilities = new Utilities(debug);
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
    Utilities.prototype.DateOneIframeFactory = function (iframeElem, parentDocument, nickname) {
        var toReturn = {
            Index: -1,
            IframeElem: iframeElem,
            Id: this.GuidMan.NewGuid(),
            Zindex: iframeElem.style.zIndex ? parseInt(iframeElem.style.zIndex) : -1,
            Nickname: nickname,
            ContentDoc: this.DataOneContentDocFactoryFromIframe(iframeElem, parentDocument, nickname),
        };
        return toReturn;
    };
    Utilities.prototype.DataOneContentDocFactoryFromIframe = function (IframeElem, parentDocument, nickname) {
        var toReturn = {
            ParentDoc: parentDocument,
            Document: IframeElem.contentDocument,
            HasParentDesktop: false,
            XyyzId: this.GuidMan.NewGuid(),
            IsCEDoc: false,
            ParentDesktop: null,
            Nickname: nickname + ' - content doc'
        };
        return toReturn;
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
        var day = this.Utilities.Buffer(date.getDay().toString(), 2, '0');
        var min = this.Utilities.Buffer(date.getMinutes().toString(), 2, '0');
        var hoursRaw = date.getHours();
        var ampm = hoursRaw >= 12 ? 'pm' : 'am';
        hoursRaw = hoursRaw % 12;
        var hourClean = hoursRaw ? hoursRaw : 12; // the hour '0' should be '12'
        var hourCleanStr = this.Utilities.Buffer(hourClean.toString(), 2, '0');
        var toReturn = year + '.' + month + '.' + day + ' ' + hourCleanStr + ':' + min + ' ' + ampm;
        return toReturn;
    };
    return Utilities;
}());
exports.Utilities = Utilities;
//# sourceMappingURL=Utilities.js.map