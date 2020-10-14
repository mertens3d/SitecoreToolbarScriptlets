import { DocumentJacket } from "../../../../DOMJacket/Document/DocumentJacket";
import { _APICoreBase } from "../../../../Shared/scripts/_APICoreBase";
import { AppFrameProxy } from "./StateLessFrameProxies/AppFrameProxy";

export class SupportFrameFactory extends _APICoreBase {
    MakeAppFrameProxy(hostJacket: DocumentJacket): Promise<AppFrameProxy> {
      return new Promise(async (resolve, reject) => {

        this.ErrorHand.ThrowIfNullOrUndefined(this.MakeAppFrameProxy.name, [hostJacket]);

        let appFrameProxy = new AppFrameProxy(this.ApiCore, hostJacket);

        await appFrameProxy.InstantiateAsyncMembers()
          .then(() => resolve(appFrameProxy))
          .catch((err) => reject(this.ErrorHand.FormatRejectMessage([SupportFrameFactory.name, this.MakeAppFrameProxy.name], err)));

        //await appFrameProxy.FrameJacket.WaitForCompleteNABHtmlIframeElement(AppFrameProxy.name)
        //  .then(() => resolve(appFrameProxy))
      })
    }
}
