import { RecipeBasics } from "../../../../../../Shared/scripts/Classes/RecipeBasics";
import { IHindeCore } from "../../../../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { IStateFullProxy } from "../../../../../../Shared/scripts/Interfaces/Agents/IStateProxy";
import { _HindeCoreBase } from "../../../../../../Shared/scripts/LoggableBase";

export abstract class _BaseStateFullProxy<T> extends _HindeCoreBase implements IStateFullProxy<T> {
  RecipeBasics: RecipeBasics;
  Friendly: string = '{unknown friendly}';

  constructor(hindeCore: IHindeCore) {
    super(hindeCore);
  }
  abstract GetState(): Promise<T>;
  abstract SetState(state: T);
  abstract WireEvents();
  abstract Instantiate();
}