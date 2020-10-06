import { RecipeBasics } from "../../../../../../Shared/scripts/Classes/RecipeBasics";
import { IHindeCore } from "../../../../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { IStateFullProxy } from "../../../../../../Shared/scripts/Interfaces/Agents/IStateProxy";
import { _HindeCoreBase } from "../../../../../../Shared/scripts/LoggableBase";
import { ScWindowType } from "../../../../../../Shared/scripts/Enums/scWindowType";
import { StateFullProxyDisciminator } from "../../../../../../Shared/scripts/Enums/4000 - StateFullProxyDisciminator";

export abstract class _BaseStateFullProxy<T> extends _HindeCoreBase implements IStateFullProxy {
  RecipeBasics: RecipeBasics;
  Friendly: string = '{unknown friendly}';

  constructor(hindeCore: IHindeCore) {
    super(hindeCore);
  }
  abstract StateFullProxyDisciminator: StateFullProxyDisciminator;
  abstract GetState(): Promise<T>;
  abstract SetState(state: T);
  abstract WireEvents();
  abstract InstantiateAsyncMembers();
  abstract TriggerInboundEventsAsync(): void;
}