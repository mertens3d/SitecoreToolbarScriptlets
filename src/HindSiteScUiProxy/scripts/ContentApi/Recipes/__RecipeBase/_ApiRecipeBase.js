"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._ApiRecipeBase = void 0;
var RecipeBasics_1 = require("../../../../../Shared/scripts/Classes/RecipeBasics");
var _ApiRecipeBase = /** @class */ (function () {
    function _ApiRecipeBase(logger) {
        this.Logger = logger;
        this.RecipeBasics = new RecipeBasics_1.RecipeBasics(this.Logger);
        this.TargetDoc = null; //todo
    }
    return _ApiRecipeBase;
}());
exports._ApiRecipeBase = _ApiRecipeBase;
//# sourceMappingURL=_ApiRecipeBase.js.map