import { ILoggerAgent } from "../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { ISettingsAgent, InitResultsScWindowManager, InitResultsFrameProxy } from "../../../../../Shared/scripts/Interfaces/Agents/ISettingsAgent";
import { IDataOneDoc } from "../../../../../Shared/scripts/Interfaces/Data/IDataOneDoc";
import { FrameProxy } from "../../../../../Shared/scripts/Interfaces/Data/Proxies/FrameProxy";
import { FrameHelper } from "../../../Helpers/IframeHelper";
import { LoggableBase } from "../../../Managers/LoggableBase";
import { DesktopProxyMutationEvent_Subject } from "./Events/DesktopProxyMutationEvent/DesktopProxyMutationEvent_Subject";
import { IDesktopProxyMutationEvent_Payload } from "./Events/DesktopProxyMutationEvent/IDesktopProxyMutationEvent_Payload";
import { FrameProxyMutationEvent_Observer } from "./Events/FrameProxyMutationEvent/FrameProxyMutationEvent_Observer";
import { IFrameProxyMutationEvent_Payload } from "./Events/FrameProxyMutationEvent/IFrameProxyMutationEvent_Payload";
import { DesktopProxy } from "./DesktopProxy";
import { CEFrameProxy } from "../../../../../Shared/scripts/Interfaces/Data/Proxies/FrameProxyForContentEditor";

export class DesktopFrameProxyBucketUnit extends LoggableBase {
  readonly CEFrameProxy: CEFrameProxy;
  DesktopProxyMutatedEvent_Subject: DesktopProxyMutationEvent_Subject;
  FrameProxyMutationEvent_Observer: FrameProxyMutationEvent_Observer;

  constructor(logger: ILoggerAgent, ceframeProxy: CEFrameProxy) {
    super(logger);
    this.Logger.InstantiateStart(DesktopFrameProxyBucket.name);
    this.CEFrameProxy = ceframeProxy;

    this.DesktopProxyMutatedEvent_Subject = new DesktopProxyMutationEvent_Subject(this.Logger, null);
    this.FrameProxyMutationEvent_Observer = new FrameProxyMutationEvent_Observer(this.Logger, null, this);

    this.CEFrameProxy.FrameProxyMutationEvent_Subject.RegisterObserver(this.FrameProxyMutationEvent_Observer);
    this.Logger.FuncEnd(DesktopFrameProxyBucket.name);
  }
}

export class DesktopFrameProxyBucket extends LoggableBase {
  private OwnerDesktopProxy: DesktopProxy;
  private FrameBucketUnits: DesktopFrameProxyBucketUnit[] = [];

  public DesktopProxyMutationEvent_Subject: DesktopProxyMutationEvent_Subject;

  constructor(logger: ILoggerAgent, ownerDesktopProxy: DesktopProxy) {
    super(logger);
    this.Logger.InstantiateStart(DesktopFrameProxyBucket.name);
    this.OwnerDesktopProxy = ownerDesktopProxy;

    this.Logger.InstantiateEnd(DesktopFrameProxyBucket.name);
  }

  OnReadyInitCEFrames(): Promise<InitResultsFrameProxy[]> {
    let initResultFrameProxies: InitResultsFrameProxy[] = [];

    return new Promise((resolve, reject) => {
      this.Logger.FuncStart(this.OnReadyInitCEFrames.name);

      this.FrameBucketUnits.forEach(async (frameBucketUnit) => {
        await frameBucketUnit.CEFrameProxy.OnReadyInitCEFrameProxy()
          .then((result) => initResultFrameProxies.push(result))
          .catch((err) => { reject(this.OnReadyInitCEFrames.name + ' | ' + err)});
      });

      resolve(initResultFrameProxies);

      this.Logger.FuncEnd(this.OnReadyInitCEFrames.name);
    })
  }

  OnFrameProxyMutation(frameProxyMutatationEvent_Payload: IFrameProxyMutationEvent_Payload) {
    let desktopFrameProxyMutatationEvent_Payload: IDesktopProxyMutationEvent_Payload = {
      AddedCEFrameProxies: [],
      MutatedElement: null,
      FrameProxyMutationEvent_Payload: frameProxyMutatationEvent_Payload
    }

    this.OwnerDesktopProxy.OnFrameProxyMutation(desktopFrameProxyMutatationEvent_Payload);
  }

  AddDesktopCEFrameProxy(frameProxy: CEFrameProxy): void {
    this.Logger.FuncStart(this.AddDesktopCEFrameProxy.name);

    //let newCeProxy = frameProxy.NewCeProxy;

    let frameBucketUnit = new DesktopFrameProxyBucketUnit(this.Logger, frameProxy);

    // todo - this will no longer catch duplicates
    if (this.FrameBucketUnits.indexOf(frameBucketUnit) < 0) {
      this.FrameBucketUnits.push(frameBucketUnit);

      let payload: IDesktopProxyMutationEvent_Payload = {
        AddedCEFrameProxies: [frameProxy],
        MutatedElement: null,
        FrameProxyMutationEvent_Payload: null
      }

      this.DesktopProxyMutationEvent_Subject.NotifyObservers(payload);
    } else {
      this.Logger.WarningAndContinue(this.AddDesktopCEFrameProxy.name, 'Proxy already exists in bucket');
    }
    this.Logger.FuncEnd(this.AddDesktopCEFrameProxy.name);
  }

  async AddToFrameProxyBucket(ceframeProxy: CEFrameProxy): Promise<InitResultsFrameProxy> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.AddToFrameProxyBucket.name);

      let initResultFrameProxy = new InitResultsFrameProxy();

      //let desktopIframeProxy: FrameProxy = new DesktopFrameProxy(this.Logger, frameProxy, this.SettingsAgent);
      await ceframeProxy.OnReadyInitCEFrameProxy()
        .then((result) => initResultFrameProxy = result)
        .then(() => this.AddDesktopCEFrameProxy(ceframeProxy))
        .then(() => resolve(initResultFrameProxy))
        .catch((err) => reject(this.AddToFrameProxyBucket.name + ' | ' + err));
      this.Logger.FuncEnd(this.AddToFrameProxyBucket.name);
    });
  }
}