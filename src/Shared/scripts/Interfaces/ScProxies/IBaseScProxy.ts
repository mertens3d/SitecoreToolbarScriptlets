import { ScProxyDisciminator } from "../../Enums/40 - ScProxyDisciminator";

export interface IBaseScProxy {
  StateHasBeenSet: any;
  readonly ScProxyDisciminator: ScProxyDisciminator;
  readonly ScProxyDisciminatorFriendly: string;
  readonly HostedProxies: IBaseScProxy[];
  InstantiateAsyncMembersSelf(): Promise<void>;
  TriggerEventsForInboundSelf(): void;
  InstantiateAsyncMembersSelf(): Promise<void>;
  WireEventsSelf(): void;
  GetStateOfSelf(): Promise<any>;
  SetStateSelf(state: any): Promise<any>;

}