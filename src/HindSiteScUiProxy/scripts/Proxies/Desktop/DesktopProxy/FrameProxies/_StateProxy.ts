import { RecipeBasics } from "../../../../../../Shared/scripts/Classes/RecipeBasics";
import { IHindeCore } from "../../../../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { IStateFullProxy } from "../../../../../../Shared/scripts/Interfaces/Agents/IStateProxy";
import { _HindeCoreBase } from "../../../../../../Shared/scripts/LoggableBase";

export abstract class _BaseScStateProxy extends _HindeCoreBase implements IStateFullProxy {
    RecipeBasics: RecipeBasics;
    Friendly: string = '{unknown friendly}';
    constructor(hindeCore: IHindeCore) {
        super(hindeCore);
    }


    abstract Instantiate();

}
