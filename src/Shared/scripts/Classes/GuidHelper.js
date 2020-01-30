"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GuidHelper = /** @class */ (function () {
    function GuidHelper(debug) {
        this.ShortGuidLength = 4;
        this.Debug = debug;
    }
    GuidHelper.prototype.EmptyGuid = function () {
        return this.ParseGuid('00000000-0000-0000-0000-000000000000');
    };
    GuidHelper.prototype.newGuidString = function () {
        var toReturn;
        var temp = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
        toReturn = temp.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0;
            var v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
        return toReturn;
    };
    GuidHelper.prototype.NewGuid = function () {
        //https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
        var toReturn = this.ParseGuid(this.newGuidString());
        return toReturn;
    };
    GuidHelper.prototype.ShortGuid = function (Id) {
        var toReturn = '{error}';
        if (Id && Id.asString.length > this.ShortGuidLength) {
            toReturn = Id.asString.substr(0, this.ShortGuidLength);
        }
        else {
            this.Debug.DebugIGuid(Id);
            this.Debug.LogVal('Length', Id.asString.length);
            this.Debug.LogVal('ShortLength', this.ShortGuidLength);
        }
        return toReturn;
    };
    GuidHelper.prototype.ParseGuid = function (val) {
        var toReturn = {
            asString: val,
            asShort: ''
        };
        toReturn.asShort = this.ShortGuid(toReturn);
        return toReturn;
    };
    return GuidHelper;
}());
exports.GuidHelper = GuidHelper;
//# sourceMappingURL=GuidHelper.js.map