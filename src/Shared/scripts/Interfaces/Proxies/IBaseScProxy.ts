import { ScProxyDisciminator } from "../../Enums/40 - ScProxyDisciminator";

export interface IBaseScProxy {
  readonly ScProxyDisciminator: ScProxyDisciminator;
  readonly ScProxyDisciminatorFriendly: string;
  readonly HostedProxies: IBaseScProxy[];
  InstantiateAsyncMembers(): Promise<void>;
  TriggerInboundEventsAsync(): void;
  InstantiateAsyncMembers(): Promise<void>;
  WireEvents(): void;
  GetState(): Promise<any>;
  SetState(state: any): Promise<any>;
}