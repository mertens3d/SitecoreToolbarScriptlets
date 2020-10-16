import { FrameElemJacket } from "../../../../../../DOMJacket/Elements/FrameElemJacket";
import { ScPageTypeResolver } from "../../../../../../Shared/scripts/Agents/UrlAgent/ScPageTypeResolver";
import { ScWindowType } from "../../../../../../Shared/scripts/Enums/50 - scWindowType";
import { IAPICore } from "../../../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { _APICoreBase } from "../../../../../../Shared/scripts/_APICoreBase";
import { ScDocProxyResolver } from "../../../ScDocProxyResolver";
import { IBaseScDocProxy } from "../../../../../../Shared/scripts/Interfaces/Agents/IStateFullProxy";
import { DocumentJacket } from "../../../../../../DOMJacket/Document/DocumentJacket";
import { _BaseScDocProxy } from "./_StateProxy";

export class StateLessFrameProxy extends _APICoreBase {
  FrameJacket: FrameElemJacket;
  public HostedDocProxy: IBaseScDocProxy;
  HostedDocScWindowType: ScWindowType = ScWindowType.Unknown;

  //{
  //  let scPageTypeResolver = new ScPageTypeResolver(this.ApiCore, this.FrameJacket.DocumentJacket.UrlJacket);
  //  return scPageTypeResolver.GetScWindowType();
  //}
  private constructor(apiCore: IAPICore, frameJacket: FrameElemJacket) {
    super(apiCore);
    this.FrameJacket = frameJacket;
  }

  private async ProcessHostedScDocProxy(): Promise<void> {
    try {
      let scDocProxyResolver: ScDocProxyResolver = new ScDocProxyResolver(this.ApiCore);
      await scDocProxyResolver.ScDocProxyFactory(ScWindowType.Unknown, this.FrameJacket.DocumentJacket, null)
        .then((scDocProxy: IBaseScDocProxy) => this.HostedDocProxy = scDocProxy)
    } catch (err) {
    }
  }

  public static async StateLessFrameProxyFactory(apiCore: IAPICore, frameElemJacket: FrameElemJacket): Promise<StateLessFrameProxy> {
    return new Promise((resolve, reject) => {
      let stateLessFrameProxyToReturn: StateLessFrameProxy = null;
      let jacketWindowType: ScWindowType = ScWindowType.Unknown;

      let documentJacket: DocumentJacket = null;

      await frameElemJacket.WaitForCompleteNABHtmlIframeElement(this.StateLessFrameProxyFactory.name)
        .then(() => documentJacket = frameElemJacket.DocumentJacket)
        //.then(() => frameElemJacket.ProcessHostedScDocProxy)
        .then(() => stateLessFrameProxyToReturn.HostedDocScWindowType = stateLessFrameProxyToReturn.HostedDocProxy.ScwindowType)
        .then(() => apiCore.Logger.LogVal('URL', frameElemJacket.DocumentJacket.UrlJacket.GetOriginalURL()))
        .then(() => stateLessFrameProxyToReturn = new StateLessFrameProxy(apiCore, frameElemJacket))
        .then(() => documentJacket = stateLessFrameProxyToReturn.FrameJacket.DocumentJacket)
        .then(() => resolve(stateLessFrameProxyToReturn))
        .catch((err) => reject(apiCore.ErrorHand.FormatRejectMessage([StateLessFrameProxy.name, this.StateLessFrameProxyFactory.name], err);
    });
  }
}