import { RecipeBasics } from "../../../../../../Shared/scripts/Classes/RecipeBasics";
import { StateFullProxyDisciminator } from "../../../../../../Shared/scripts/Enums/4000 - StateFullProxyDisciminator";
import { IHindeCore } from "../../../../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { IStateFullProxy } from "../../../../../../Shared/scripts/Interfaces/Agents/IStateProxy";
import { _HindeCoreBase } from "../../../../../../Shared/scripts/_HindeCoreBase";
import { SupportFrameFactory } from "../../../SupportProxies/BaseFrameFactory";
import { IStateOf_ } from "../../../../../../Shared/scripts/Interfaces/Data/States/IStateOf_";

export abstract class _justWindowStateFullProxy extends _HindeCoreBase implements IStateFullProxy {
  abstract StateFullProxyDisciminator: StateFullProxyDisciminator;
  abstract StateFullProxyDisciminatorFriendly;
  Friendly: string = '{unknown friendly}';
  protected readonly SupportFrameFactory: SupportFrameFactory;
  RecipeBasics: RecipeBasics;

  constructor(hindeCore: IHindeCore) {
    super(hindeCore);
    this.SupportFrameFactory = new SupportFrameFactory(this.HindeCore);
  }

  GetState(): Promise<IStateOf_> {
    return new Promise((resolve, reject) => {
      this.Logger.FuncStart(this.GetState.name, _justWindowStateFullProxy.name);

      let stateOf_: IStateOf_ = {
        StatefullDisciminator: this.StateFullProxyDisciminator,
        StatefullDisciminatorFriendly: this.StateFullProxyDisciminatorFriendly
      }
      resolve(stateOf_);

      this.Logger.FuncEnd(this.GetState.name, _justWindowStateFullProxy.name);
    });
  }
  async InstantiateAsyncMembers(): Promise<void> {
  }

  async SetState(state: IStateOf_): Promise<void> {
  }

  TriggerInboundEventsAsync(): void {
    //empty
  }
  WireEvents() {
    //empty
  }
}