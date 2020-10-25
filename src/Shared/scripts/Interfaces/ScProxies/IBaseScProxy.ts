import { ScProxyDisciminator } from "../../Enums/40 - ScProxyDisciminator";

export interface IBaseScProxy {
  StateHasBeenSet: any;
  readonly ScProxyDisciminator: ScProxyDisciminator;
  readonly ScProxyDisciminatorFriendly: string;
  readonly HostedProxies: IBaseScProxy[];

  TriggerEventsForInbound(): void;
  InstantiateAwaitElements(): Promise<void>;
  WireEvents(): void;
  GetState(): Promise<any>;
  SetState(state: any): Promise<any>;

}