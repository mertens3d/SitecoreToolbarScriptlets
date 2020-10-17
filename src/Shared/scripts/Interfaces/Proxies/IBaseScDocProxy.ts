import { ScProxyDisciminator } from "../../Enums/40 - StateFullProxyDisciminator";

export interface IBaseScDocProxy {
  readonly ScProxyDisciminator: ScProxyDisciminator;
  readonly ScProxyDisciminatorFriendly: string;
  TriggerInboundEventsAsync();
  InstantiateAsyncMembers(): Promise<void>;
  WireEvents();
  OnFocus(): Promise<any>
}