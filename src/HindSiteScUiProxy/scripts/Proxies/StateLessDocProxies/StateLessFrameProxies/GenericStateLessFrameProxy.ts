import { DocumentJacket } from "../../../../../DOMJacket/scripts/Document/DocumentJacket";
import { FrameElemJacket } from "../../../../../DOMJacket/scripts/Elements/FrameElemJacket";
import { ScProxyDisciminator } from "../../../../../Shared/scripts/Enums/40 - ScProxyDisciminator";
import { IAPICore } from "../../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { IBaseScDocProxy } from "../../../../../Shared/scripts/Interfaces/Proxies/IBaseScDocProxy";
import { IStateLessScFrameProxy } from "../../../../../Shared/scripts/Interfaces/Proxies/StateLess/IStateLessFrameProxy";
import { ScDocProxyResolver } from "../../ScDocProxyResolver";
import { _BaseStateLessScDocProxy } from "../StateLessDocProxies/_BaseStateLessScDocProxy";
import { _baseStatelessFrameProxyOfType } from "./_baseStatelessFrameProxyOfType";

export class GenericStateLessFrameProxy extends _baseStatelessFrameProxyOfType<_BaseStateLessScDocProxy> implements IStateLessScFrameProxy {
  FrameSelectorOnHost: string;
  FrameElemJacket: FrameElemJacket;
  public HostedDocProxy: IBaseScDocProxy;
  ScProxyDisciminator: ScProxyDisciminator = ScProxyDisciminator.GenericStateLessFrameProxy;
  ScProxyDisciminatorFriendly: string;

  private constructor(apiCore: IAPICore, frameJacket: FrameElemJacket) {
    super(apiCore, frameJacket);
    this.FrameElemJacket = frameJacket;
  }

  TriggerInboundEventsAsync() {
    //empty
  }
  async InstantiateAsyncMembers(): Promise<void> {
    //empty
  }
  WireEvents() {
    //empty
  }

  public static async ProcessHostedScDocProxy(apiCore: IAPICore, documentJacket: DocumentJacket): Promise<IBaseScDocProxy> {
    return new Promise(async (resolve, reject) => {
      let scDocProxyResolver: ScDocProxyResolver = new ScDocProxyResolver(apiCore);
      await scDocProxyResolver.ScDocProxyFactoryMake( documentJacket, null)
        .then((scDocProxy: IBaseScDocProxy) => resolve(scDocProxy))
        .catch((err) => reject(apiCore.ErrorHand.FormatRejectMessage([GenericStateLessFrameProxy.name, this.ProcessHostedScDocProxy.name], err)));
    });
  }

  public static async ProcessFrameProxy<T extends _BaseStateLessScDocProxy>(apiCore: IAPICore, frameElemJacket: FrameElemJacket): Promise<_baseStatelessFrameProxyOfType<T>> {
    return new Promise(async (resolve, reject) => {

      let stateLessFrameProxyToReturn: _baseStatelessFrameProxyOfType<T> = null;

      await frameElemJacket.WaitForCompleteNABFrameElement(this.StateLessFrameProxyFactory.name)
        .then(() => stateLessFrameProxyToReturn = (new _baseStatelessFrameProxyOfType<T>(apiCore, frameElemJacket)))
        .then(() => resolve(stateLessFrameProxyToReturn))
        .catch((err) => reject(apiCore.ErrorHand.FormatRejectMessage([GenericStateLessFrameProxy.name, this.ProcessFrameProxy.name], err)));
    });
  }

  public static async StateLessFrameProxyFactory<T extends _BaseStateLessScDocProxy>(apiCore: IAPICore, frameElemJacket: FrameElemJacket): Promise<_baseStatelessFrameProxyOfType<T>> {
    return new Promise(async (resolve, reject) => {
      apiCore.Logger.FuncStart([GenericStateLessFrameProxy.name, this.StateLessFrameProxyFactory.name]);
      let stateLessFrameProxyToReturn: _baseStatelessFrameProxyOfType<T> = null;

      await GenericStateLessFrameProxy.ProcessFrameProxy(apiCore, frameElemJacket)
        .then((frameProxy: _baseStatelessFrameProxyOfType<T>) => stateLessFrameProxyToReturn = frameProxy)
        .then(() => GenericStateLessFrameProxy.ProcessHostedScDocProxy(apiCore, frameElemJacket.DocumentJacket))
        .then((statelessDocProxy: T) => stateLessFrameProxyToReturn.HostedStatelessDocProxy = statelessDocProxy)
        .then(() => resolve(stateLessFrameProxyToReturn))
        .catch((err) => reject(apiCore.ErrorHand.FormatRejectMessage([GenericStateLessFrameProxy.name, this.StateLessFrameProxyFactory.name], err)));

      apiCore.Logger.FuncStart([GenericStateLessFrameProxy.name, this.StateLessFrameProxyFactory.name]);
    });
  }
}