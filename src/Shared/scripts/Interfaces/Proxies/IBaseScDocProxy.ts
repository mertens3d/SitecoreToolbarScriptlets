import { ScProxyDisciminator } from "../../Enums/40 - ScProxyDisciminator";
import { IStateFullElemProxy } from "./StateFull/IStateFullElemProxy";

export interface IBaseScDocProxy {
  readonly ScProxyDisciminator: ScProxyDisciminator;
  readonly ScProxyDisciminatorFriendly: string;
  TriggerInboundEventsAsync();
  InstantiateAsyncMembers(): Promise<void>;
  WireEvents();
  OnFocus(): Promise<any>
  EnableWatcherForFrames(): void;
  HostedElemProxies: IStateFullElemProxy[];
}