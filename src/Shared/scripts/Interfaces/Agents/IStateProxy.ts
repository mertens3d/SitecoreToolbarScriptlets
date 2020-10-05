import { ScWindowType } from "../../Enums/scWindowType";
import { StateFullProxyDisciminator } from "../../Enums/4000 - StateFullProxyDisciminator";

export interface IStateFullProxy {
  StateFullProxyDisciminator: StateFullProxyDisciminator;
  TriggerInboundEventsAsync();
  InstantiateAsyncMembers();
  WireEvents();
  GetState(): Promise<any>;
  SetState(state: any): Promise<any>;
}
