import { StateFullProxyDisciminator } from "../../Enums/4000 - StateFullProxyDisciminator";

export interface IStateFullProxy {
  readonly StateFullProxyDisciminator: StateFullProxyDisciminator;
  TriggerInboundEventsAsync();
  InstantiateAsyncMembers(): Promise<void> ;
  WireEvents();
  GetState(): Promise<any>;
  SetState(state: any): Promise<any>;
}
