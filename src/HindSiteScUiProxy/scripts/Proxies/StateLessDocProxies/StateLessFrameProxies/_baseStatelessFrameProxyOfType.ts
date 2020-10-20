import { FrameElemJacket } from "../../../../../DOMJacket/scripts/Elements/FrameElemJacket";
import { ScProxyDisciminator } from "../../../../../Shared/scripts/Enums/40 - ScProxyDisciminator";
import { IAPICore } from "../../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { IStateLessScFrameProxy } from "../../../../../Shared/scripts/Interfaces/Proxies/StateLess/IStateLessFrameProxy";
import { _APICoreBase } from "../../../../../Shared/scripts/_APICoreBase";
import { _BaseStateLessScDocProxy } from "../StateLessDocProxies/_BaseStateLessScDocProxy";

export class _baseStatelessFrameProxyOfType<T extends _BaseStateLessScDocProxy> extends _APICoreBase implements IStateLessScFrameProxy {
  ScProxyDisciminator: ScProxyDisciminator;
  ScProxyDisciminatorFriendly: string;
  FrameSelectorOnHost: string;
  FrameElemJacket: FrameElemJacket;
  HostedDocProxy: T;

  constructor(apiCore: IAPICore, frameElemJacket: FrameElemJacket) {
    super(apiCore);

    this.FrameElemJacket = frameElemJacket;
  }

  Instantiate() {
  }

  async  TriggerInboundEventsAsync() : Promise<void>{
    //empty by default
  }

  async WireEvents(): Promise<void>{
    //empty by default
  }

  async InstantiateAsyncMembers(): Promise<void> {
    //empty by default
  }

  async _base_InstantiateAsyncProperties(): Promise<void> {
    //this.BaseFrameFactory = new SupportFrameFactory(this.ApiCore);
    try {
      await this.FrameElemJacket.WaitForCompleteNABFrameElement(this.FrameSelectorOnHost)
        //.then(() => this.HostedDocProxy = this.FrameJacket.DocumentJacket)
        .catch((err: any) => this.ErrorHand.HandleFatalError(this._base_InstantiateAsyncProperties.name, err));
    } catch (err: any) {
      this.ErrorHand.HandleFatalError(this.InstantiateAsyncMembers.name, err);
    }
  }
}