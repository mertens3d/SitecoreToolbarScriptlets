"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GuidHelper = /** @class */ (function () {
    function GuidHelper() {
    }
    GuidHelper.prototype.EmptyGuid = function () {
        return this.ParseGuid('00000000-0000-0000-0000-000000000000');
    };
    GuidHelper.prototype.NewGuid = function () {
        var toReturn;
        //https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
        var temp = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            var toReturn = v.toString(16);
            return toReturn;
        });
        toReturn = this.ParseGuid(temp);
        return toReturn;
    };
    GuidHelper.prototype.ShortGuid = function (Id) {
        var toReturn = '{error}';
        if (Id && Id.asString.length > this.ShortGuidLength) {
            toReturn = Id.asString.substr(0, this.ShortGuidLength);
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