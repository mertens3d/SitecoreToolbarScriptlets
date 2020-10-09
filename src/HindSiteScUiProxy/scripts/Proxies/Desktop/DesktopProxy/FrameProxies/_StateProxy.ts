import { RecipeBasics } from "../../../../../../Shared/scripts/Classes/RecipeBasics";
import { StateFullProxyDisciminator } from "../../../../../../Shared/scripts/Enums/4000 - StateFullProxyDisciminator";
import { IHindeCore } from "../../../../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { IStateFullProxy } from "../../../../../../Shared/scripts/Interfaces/Agents/IStateProxy";
import { _HindeCoreBase } from "../../../../../../Shared/scripts/_HindeCoreBase";
import { SupportFrameFactory } from "../../../SupportProxies/BaseFrameFactory";


export abstract class _BaseStateFullProxy<T> extends _HindeCoreBase implements IStateFullProxy {
  abstract GetState(): Promise<T>;
  abstract InstantiateAsyncMembers();
  abstract SetState(state: T);
  abstract StateFullProxyDisciminator: StateFullProxyDisciminator;
  abstract StateFullProxyDisciminatorFriendly;
  abstract TriggerInboundEventsAsync(): void;
  abstract WireEvents();
  Friendly: string = '{unknown friendly}';
  protected readonly SupportFrameFactory: SupportFrameFactory;
  RecipeBasics: RecipeBasics;

  constructor(hindeCore: IHindeCore) {
    super(hindeCore);
    this.SupportFrameFactory = new SupportFrameFactory(this.HindeCore)
  }

}

