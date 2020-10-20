import { ScProxyDisciminator } from "../../Enums/40 - ScProxyDisciminator";

export interface IBaseScDocProxy {
  readonly ScProxyDisciminator: ScProxyDisciminator;
  readonly ScProxyDisciminatorFriendly: string;
  TriggerInboundEventsAsync():void;
  InstantiateAsyncMembers(): Promise<void>;
  WireEvents(): Promise<void>;
  OnFocus(): Promise<any>
  EnableWatcherForFrames(): void;
}