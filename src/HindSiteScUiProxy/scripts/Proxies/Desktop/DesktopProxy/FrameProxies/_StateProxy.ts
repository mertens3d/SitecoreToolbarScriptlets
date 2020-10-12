import { RecipeBasics } from "../../../../RecipeBasics";
import { StateFullProxyDisciminator } from "../../../../../../Shared/scripts/Enums/40 - StateFullProxyDisciminator";
import { IAPICore } from "../../../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { IStateFullProxy } from "../../../../../../Shared/scripts/Interfaces/Agents/IStateProxy";
import { _APICoreBase } from "../../../../../../Shared/scripts/_APICoreBase";
import { SupportFrameFactory } from "../../../SupportProxies/BaseFrameFactory";


export abstract class _BaseStateFullProxy<T> extends _APICoreBase implements IStateFullProxy {
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

  constructor(apiCore: IAPICore) {
    super(apiCore);
    this.SupportFrameFactory = new SupportFrameFactory(this.ApiCore)
  }

}

