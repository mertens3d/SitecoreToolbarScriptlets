import { DocumentJacket } from "../../../../../../DOMJacket/scripts/Document/DocumentJacket";
import { ScProxyDisciminator } from "../../../../../../Shared/scripts/Enums/40 - ScProxyDisciminator";
import { IAPICore } from "../../../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { IStateFullDocProxy } from "../../../../../../Shared/scripts/Interfaces/Proxies/StateFull/IStateFullDocProxy";
import { IStateFullElemProxy } from "../../../../../../Shared/scripts/Interfaces/Proxies/StateFull/IStateFullElemProxy";
import { IStateOf_ } from "../../../../../../Shared/scripts/Interfaces/StateOf/IStateOf_";
import { _APICoreBase } from "../../../../../../Shared/scripts/_APICoreBase";
import { _BaseScDocProxy } from "../../../StateFullDocProxies/_BaseScDocProxy";

export abstract class _justWindowStateFullDocProxy extends _BaseScDocProxy implements IStateFullDocProxy {
  abstract readonly ScProxyDisciminator: ScProxyDisciminator;
  abstract readonly ScProxyDisciminatorFriendly: string;
  Friendly: string = '{unknown friendly}';
  HostedElemProxies: IStateFullElemProxy[] = [];

  constructor(apiCore: IAPICore, documentJacket: DocumentJacket) {
    super(apiCore, documentJacket);
  }

  GetState(): Promise<IStateOf_> {
    return new Promise((resolve, reject) => {
      this.Logger.FuncStart(this.GetState.name, _justWindowStateFullDocProxy.name);

      let stateOf_: IStateOf_ = {
        Disciminator: this.ScProxyDisciminator,
        DisciminatorFriendly: this.ScProxyDisciminatorFriendly
      }
      resolve(stateOf_);

      this.Logger.FuncEnd(this.GetState.name, _justWindowStateFullDocProxy.name);
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

  async WireEvents(): Promise<void> {
    //empty
  }
}