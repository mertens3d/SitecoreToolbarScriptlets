import { RecipeBasics } from "../../../../../../Shared/scripts/Classes/RecipeBasics";
import { IHindeCore } from "../../../../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { IStateFullProxy } from "../../../../../../Shared/scripts/Interfaces/Agents/IStateProxy";
import { _HindeCoreBase } from "../../../../../../Shared/scripts/_HindeCoreBase";
import { ScWindowType } from "../../../../../../Shared/scripts/Enums/scWindowType";
import { StateFullProxyDisciminator } from "../../../../../../Shared/scripts/Enums/4000 - StateFullProxyDisciminator";
import { DocumentJacket } from "../../../../../../DOMJacket/DocumentJacket";


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

