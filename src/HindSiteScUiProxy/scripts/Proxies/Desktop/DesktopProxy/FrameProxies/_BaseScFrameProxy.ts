//import { DocumentJacket } from "../../../../../../DOMJacket/scripts/Document/DocumentJacket";
//import { FrameElemJacket } from "../../../../../../DOMJacket/scripts/Elements/FrameElemJacket";
//import { DocReadyState } from "../../../../../../Shared/scripts/Enums/ReadyState";
//import { ReadyStateNAB } from "../../../../../../Shared/scripts/Classes/ReadyStateNAB";
//import { ScProxyDisciminator } from "../../../../../../Shared/scripts/Enums/40 - ScProxyDisciminator";
//import { IAPICore } from "../../../../../../Shared/scripts/Interfaces/Agents/IAPICore";
//import { _BaseStateFullFrameProxy } from "./_BaseStateFullFrameProxy";
//import { IScFrameProxy } from "../../../../../../Shared/scripts/Interfaces/ScProxies/IStateFullFrameProxy";
//import { IStateOf_ } from "../../../../../../Shared/scripts/Interfaces/StateOf/IStateOf_";

//export abstract class _BaseScFrameProxy<T extends IStateOf_> extends _BaseStateFullFrameProxy<T> implements IScFrameProxy {
 
//  constructor(apiCore: IAPICore, frameJacket: FrameElemJacket) {
//    super(apiCore, frameJacket);

//    this.ErrorHand.ThrowIfNullOrUndefined(_BaseScFrameProxy.name, [frameJacket]);
//    this.Id = 'base_' + this.FrameJacket.GetNativeIframeId();
//  }

//  abstract InstantiateAsyncMembers(): Promise<void>;

//  abstract WireEvents(): Promise<void>;

//}