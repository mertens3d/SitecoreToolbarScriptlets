import { ILoggerAgent } from "../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { LoggableBase } from "../../../Managers/LoggableBase";
import { CEFrameProxy } from "../../CEFrameProxy";
import { CEFrameProxyMutationEvent_Observer } from "./Events/FrameProxyMutationEvent/FrameProxyMutationEvent_Observer";

export class CEFrameProxyBucket extends LoggableBase {
  private FrameBucketUnits: CEFrameProxy[] = [];
  private CEFrameProxyMutationEvent_Observer: CEFrameProxyMutationEvent_Observer;

  constructor(logger: ILoggerAgent) {
    super(logger);
    this.Logger.InstantiateStart(CEFrameProxyBucket.name);

    this.Logger.InstantiateEnd(CEFrameProxyBucket.name);
  }

  //OnReadyInitCEFrameProxyBucket(): Promise<InitResultsCEFrameProxy[]> {
  //  let initResultFrameProxies: InitResultsCEFrameProxy[] = [];

  //  return new Promise((resolve, reject) => {
  //    this.Logger.FuncStart(this.OnReadyInitCEFrameProxyBucket.name);

  //    this.FrameBucketUnits.forEach(async (frameBucketUnit) => {
  //      await frameBucketUnit.CEFrameProxy.OnReadyInitCEFrameProxy()
  //        .then((result) => initResultFrameProxies.push(result))
  //        .catch((err) => { reject(this.OnReadyInitCEFrameProxyBucket.name + ' | ' + err) });
  //    });

  //    resolve(initResultFrameProxies);

  //    this.Logger.FuncEnd(this.OnReadyInitCEFrameProxyBucket.name);
  //  })
  //}

  //OnFrameProxyMutation(ceframeProxyMutatationEvent_Payload: ICEFrameProxyMutationEvent_Payload) {
  //  let desktopFrameProxyMutatationEvent_Payload: IDesktopProxyMutationEvent_Payload = {
  //    AddedCEFrameProxies: [],
  //    MutatedElement: null,
  //    FrameProxyMutationEvent_Payload: ceframeProxyMutatationEvent_Payload
  //  }

  //  this.OwnerDesktopProxy.OnCEFrameProxyMutation(desktopFrameProxyMutatationEvent_Payload);
  //}

  AddToCEFrameProxyBucket(ceframeProxy: CEFrameProxy): boolean {
    this.Logger.FuncStart(this.AddToCEFrameProxyBucket.name);
    let toReturn: boolean = false;

    //let desktopIframeProxy: FrameProxy = new DesktopFrameProxy(this.Logger, frameProxy, this.SettingsAgent);

    if (!this.BucketHasSameItem(ceframeProxy)) {
      this.FrameBucketUnits.push(ceframeProxy);
      toReturn = true;
    }

    this.Logger.FuncEnd(this.AddToCEFrameProxyBucket.name);
    return (toReturn);
  }

  private BucketHasSameItem(ceframeBucketItem: CEFrameProxy): boolean {
    this.Logger.FuncStart(this.BucketHasSameItem.name);

    let toReturn: boolean = true;

    //todo - I think we'll need to check against the iframe id
    if (this.FrameBucketUnits.indexOf(ceframeBucketItem) < 0) {
      toReturn = false;
    } else {
      toReturn = true;
      this.Logger.WarningAndContinue(this.BucketHasSameItem.name, 'Proxy already exists in bucket');
    }

    this.Logger.FuncEnd(this.BucketHasSameItem.name, toReturn.toString());
    return toReturn;
  }
}