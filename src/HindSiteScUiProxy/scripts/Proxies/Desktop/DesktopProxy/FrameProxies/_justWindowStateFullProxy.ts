import { ScProxyDisciminator } from "../../../../../../Shared/scripts/Enums/40 - StateFullProxyDisciminator";
import { IAPICore } from "../../../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { IStateFullDocProxy } from "../../../../../../Shared/scripts/Interfaces/Proxies/StateFull/IStateFullDocProxy";
import { IStateOf_ } from "../../../../../../Shared/scripts/Interfaces/StateOf/IStateOf_";
import { _APICoreBase } from "../../../../../../Shared/scripts/_APICoreBase";
import { RecipeBasics } from "../../../../RecipeBasics";

export abstract class _justWindowStateFullProxy extends _APICoreBase implements IStateFullDocProxy {
  abstract readonly ScProxyDisciminator: ScProxyDisciminator;
  abstract readonly ScProxyDisciminatorFriendly;
  Friendly: string = '{unknown friendly}';
  RecipeBasics: RecipeBasics;

  constructor(apiCore: IAPICore) {
    super(apiCore);
  }

  GetState(): Promise<IStateOf_> {
    return new Promise((resolve, reject) => {
      this.Logger.FuncStart(this.GetState.name, _justWindowStateFullProxy.name);

      let stateOf_: IStateOf_ = {
        Disciminator: this.ScProxyDisciminator,
        DisciminatorFriendly: this.ScProxyDisciminatorFriendly
      }
      resolve(stateOf_);

      this.Logger.FuncEnd(this.GetState.name, _justWindowStateFullProxy.name);
    });
  }

  async InstantiateAsyncMembers(): Promise<void> {
  }

  async OnFocus(): Promise<any> {
    // empty by default
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