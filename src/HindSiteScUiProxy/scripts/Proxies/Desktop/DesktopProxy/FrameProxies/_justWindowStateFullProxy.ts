import { DocumentJacket } from "../../../../../../DOMJacket/scripts/Document/DocumentJacket";
import { ScProxyDisciminator } from "../../../../../../Shared/scripts/Enums/40 - ScProxyDisciminator";
import { IAPICore } from "../../../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { IScDocProxy } from "../../../../../../Shared/scripts/Interfaces/ScProxies/IBaseScDocProxy";
import { IStateOf_ } from "../../../../../../Shared/scripts/Interfaces/StateOf/IStateOf_";
import { _BaseScProxy } from "../../../StateFullDocProxies/_BaseScProxy";
import { ScDocProxy } from "./_BaseStateFullDocProxy";

export abstract class _justWindowStateFullDocProxy extends ScDocProxy<IStateOf_> implements IScDocProxy {
  abstract readonly ScProxyDisciminator: ScProxyDisciminator;
  abstract readonly ScProxyDisciminatorFriendly: string;
  Friendly: string = '{unknown friendly}';


  constructor(apiCore: IAPICore, documentJacket: DocumentJacket) {
    super(apiCore, documentJacket);
  }

  GetStateOfSelf(): Promise<IStateOf_> {
    return new Promise((resolve, reject) => {
      this.Logger.FuncStart(this.GetStateOfSelf.name, _justWindowStateFullDocProxy.name);

      let stateOf_: IStateOf_ = {
        Disciminator: this.ScProxyDisciminator,
        DisciminatorFriendly: this.ScProxyDisciminatorFriendly,
        StateOfHostedProxies: null,
      }
      resolve(stateOf_);

      this.Logger.FuncEnd(this.GetStateOfSelf.name, _justWindowStateFullDocProxy.name);
    });
  }

  async InstantiateAsyncMembersSelf(): Promise<void> {
  }

  async OnFocus(): Promise<any> {
    // empty by default
  }

  async SetStateSelf(state: IStateOf_): Promise<void> {
  }

  TriggerEventsForInboundSelf(): void {
    //empty
  }

  async WireEventsSelf(): Promise<void> {
    //empty
  }
}