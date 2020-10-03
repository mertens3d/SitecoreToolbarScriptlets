import { RecipeBasics } from "../../../../../../Shared/scripts/Classes/RecipeBasics";
import { IHindeCore } from "../../../../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { IScStateFullProxy } from "../../../../../../Shared/scripts/Interfaces/Agents/IStateProxy";
import { _HindeCoreBase } from "../../../../../../Shared/scripts/LoggableBase";

export abstract class _BaseScStateFullProxy extends _HindeCoreBase implements IScStateFullProxy {
  RecipeBasics: RecipeBasics;
  Friendly: string = '{unknown friendly}';

  constructor(hindeCore: IHindeCore) {
    super(hindeCore);
  }

  abstract WireEvents();
  abstract Instantiate();
}