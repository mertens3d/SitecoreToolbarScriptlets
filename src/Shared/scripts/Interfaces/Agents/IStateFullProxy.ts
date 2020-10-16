import { ScDocProxyDisciminator } from "../../Enums/40 - StateFullProxyDisciminator";

export interface IBaseScDocProxy {
  ScwindowType: any;
  readonly ScDocProxyDisciminator: ScDocProxyDisciminator;
  readonly ScDocProxyDisciminatorFriendly: string;
  TriggerInboundEventsAsync();
  InstantiateAsyncMembers(): Promise<void>;
  WireEvents();
}

export interface IStateFullFrameProxy extends IBaseScDocProxy {
  GetState(): Promise<any>;
  SetState(state: any): Promise<any>;
}

export interface IStateFullElemProxy {
  GetState(): Promise<any>;
  SetState(state: any): Promise<any>;
}

export interface IStateFullDocProxy extends IBaseScDocProxy {
  GetState(): Promise<any>;
  SetState(state: any): Promise<any>;
}