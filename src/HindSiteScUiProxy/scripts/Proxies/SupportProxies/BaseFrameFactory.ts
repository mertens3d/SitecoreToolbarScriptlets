﻿import { DocumentJacket } from "../../../../DOMJacket/DocumentJacket";
import { ElementFrameJacket } from "../../../../DOMJacket/ElementFrameJacket";
import { _APICoreBase } from "../../../../Shared/scripts/_APICoreBase";
import { AppFrameProxy } from "./AppFrameProxy";

export class SupportFrameFactory extends _APICoreBase {
    MakeAppFrameProxy(frameJacket: ElementFrameJacket, parentJacket: DocumentJacket): Promise<AppFrameProxy> {
      return new Promise(async (resolve, reject) => {

        let appFrameProxy = new AppFrameProxy(this.ApiCore, frameJacket, parentJacket);
        await appFrameProxy.FrameJacket.WaitForCompleteNABHtmlIframeElement(AppFrameProxy.name)
          .then(() => resolve(appFrameProxy))
          .catch((err) => reject(this.ErrorHand.FormatejectMessage([SupportFrameFactory.name, this.MakeAppFrameProxy.name], err)))
      })
    }
}
