import { DocumentJacket } from "../../../../DOMJacket/DocumentJacket";
import { ElementFrameJacket } from "../../../../DOMJacket/ElementFrameJacket";
import { _HindeCoreBase } from "../../../../Shared/scripts/_HindeCoreBase";
import { AppFrameProxy } from "./AppFrameProxy";

export class SupportFrameFactory extends _HindeCoreBase {
    MakeAppFrameProxy(frameJacket: ElementFrameJacket, parentJacket: DocumentJacket): Promise<AppFrameProxy> {
      return new Promise(async (resolve, reject) => {

        let appFrameProxy = new AppFrameProxy(this.HindeCore, frameJacket, parentJacket);
        await appFrameProxy.FrameJacket.WaitForCompleteNABHtmlIframeElement(AppFrameProxy.name)
          .then(() => resolve(appFrameProxy))
          .catch((err) => reject(this.ErrorHand.FormatejectMessage([SupportFrameFactory.name, this.MakeAppFrameProxy.name], err)))
      })
    }
}
