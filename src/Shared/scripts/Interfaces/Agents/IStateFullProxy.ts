import { ScDocProxyDisciminator } from "../../Enums/40 - StateFullProxyDisciminator";

export interface IScDocOrFrameProxy {
  readonly ScDocProxyDisciminator: ScDocProxyDisciminator;
  readonly ScDocProxyDisciminatorFriendly: string;
  TriggerInboundEventsAsync();
  InstantiateAsyncMembers(): Promise<void>;
  WireEvents();
}

export interface IStateFullFrameProxy extends IScDocOrFrameProxy {
  GetState(): Promise<any>;
  SetState(state: any): Promise<any>;
}



export interface IStateFullElemProxy {

  GetState(): Promise<any>;
  SetState(state: any): Promise<any>;
}


export interface IStateFullDocProxy extends IScDocOrFrameProxy {

  
  GetState(): Promise<any>;
  SetState(state: any): Promise<any>;
}