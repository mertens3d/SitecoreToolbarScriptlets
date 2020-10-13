import { RecipeBasics } from "../../../../RecipeBasics";
import { StateFullProxyDisciminator } from "../../../../../../Shared/scripts/Enums/40 - StateFullProxyDisciminator";
import { IAPICore } from "../../../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { IStateFullProxy } from "../../../../../../Shared/scripts/Interfaces/Agents/IStateProxy";
import { _APICoreBase } from "../../../../../../Shared/scripts/_APICoreBase";
import { SupportFrameFactory } from "../../../SupportProxies/BaseFrameFactory";
import { IStateOf_ } from "../../../../../../Shared/scripts/Interfaces/Data/States/IStateOf_";

export abstract class _justWindowStateFullProxy extends _APICoreBase implements IStateFullProxy {
  abstract readonly StateFullProxyDisciminator: StateFullProxyDisciminator;
  abstract readonly StateFullProxyDisciminatorFriendly;
  Friendly: string = '{unknown friendly}';
  protected readonly SupportFrameFactory: SupportFrameFactory;
  RecipeBasics: RecipeBasics;

  constructor(apiCore: IAPICore) {
    super(apiCore);
    this.SupportFrameFactory = new SupportFrameFactory(this.ApiCore);
  }

  GetState(): Promise<IStateOf_> {
    return new Promise((resolve, reject) => {
      this.Logger.FuncStart(this.GetState.name, _justWindowStateFullProxy.name);

      let stateOf_: IStateOf_ = {
        Disciminator: this.StateFullProxyDisciminator,
        DisciminatorFriendly: this.StateFullProxyDisciminatorFriendly
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