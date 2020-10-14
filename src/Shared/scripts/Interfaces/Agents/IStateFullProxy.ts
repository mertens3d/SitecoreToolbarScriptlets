import { StateFullProxyDisciminator } from "../../Enums/40 - StateFullProxyDisciminator";

export interface IStateFullProxy {
  readonly StateFullProxyDisciminator: StateFullProxyDisciminator;
  readonly StateFullProxyDisciminatorFriendly: string;
  TriggerInboundEventsAsync();
  InstantiateAsyncMembers(): Promise<void>;
  WireEvents();
  GetState(): Promise<any>;
  SetState(state: any): Promise<any>;
}