"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._ApiRecipeBase = void 0;
var RecipeBasics_1 = require("../../../../../Shared/scripts/Classes/RecipeBasics");
var _ApiRecipeBase = /** @class */ (function () {
    function _ApiRecipeBase(commandData) {
        this.Logger = commandData.Logger;
        this.RecipeBasics = new RecipeBasics_1.RecipeBasics(this.Logger);
        this.ScWinMan = commandData.ScWinMan;
        this.AtticAgent = commandData.AtticAgent;
        //this.TargetSnapShotFlavor = commandData.TargetSnapShotFlavor
        this.TargetDoc = commandData.TargetDoc;
        this.TargetConEdProxy = commandData.TargetCeProxy;
        this.AutoSnapShotAgent = commandData.AutoSnapShotAgent;
    }
    return _ApiRecipeBase;
}());
exports._ApiRecipeBase = _ApiRecipeBase;
//# sourceMappingURL=__RecipeBase.js.map