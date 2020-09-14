//import { ILoggerAgent } from "../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
//import { LoggableBase } from "../../../Managers/LoggableBase";
//import { DesktopProxyMutationEvent_Subject } from "./Events/DesktopProxyMutationEvent/DesktopProxyMutationEvent_Subject";
//import { CEFrameProxyMutationEvent_Observer } from "./Events/FrameProxyMutationEvent/FrameProxyMutationEvent_Observer";
//import { CEFrameProxy } from "../../CEFrameProxy";
//import { CEFrameProxyBucket } from "./DesktopFrameProxyBucket";
//import { FrameProxyMutationEvent_Subject } from "./Events/FrameProxyMutationEvent/FrameProxyMutatedEvent_Subject";

//export class CEFrameProxyBucketItem extends LoggableBase {
//  readonly CEFrameProxy: CEFrameProxy;
//  DesktopProxyMutatedEvent_Subject: FrameProxyMutationEvent_Subject;
//  FrameProxyMutationEvent_Observer: CEFrameProxyMutationEvent_Observer;

//  constructor(logger: ILoggerAgent, ceframeProxy: CEFrameProxy) {
//    super(logger);
//    this.Logger.InstantiateStart(CEFrameProxyBucket.name);
//    this.CEFrameProxy = ceframeProxy;
//    this.FrameProxyMutationEvent_Observer = frameProxyMutationEvent_Observer;

//    this.Logger.FuncEnd(CEFrameProxyBucket.name);
//  }

  
//}