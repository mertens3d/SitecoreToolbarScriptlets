import { ScProxyDisciminator } from "../../Enums/40 - ScProxyDisciminator";

export interface IProxyCommand { }
export interface IBaseScProxy {
  StateHasBeenSet: any;
  readonly ScProxyDisciminator: ScProxyDisciminator;
  readonly ScProxyDisciminatorFriendly: string;
  readonly HostedProxies: IBaseScProxy[];

  TriggerEventsForInbound(): void;
  InstantiateAwaitElementsTop(): Promise<void>;
  WireEvents(): void;
  GetState(): Promise<any>;
  SetState(state: any): Promise<any>;

}