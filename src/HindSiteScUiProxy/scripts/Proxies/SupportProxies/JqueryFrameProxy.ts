import { ElementFrameJacket } from "../../../../DOMJacket/ElementFrameJacket";
import { IAPICore } from "../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { ContentConst } from "../../../../Shared/scripts/Interfaces/InjectConst";
import { _APICoreBase } from "../../../../Shared/scripts/_APICoreBase";
import { ScContentIframeId0Proxy } from "./ScContentIframeId0Proxy";

export class JqueryFrameProxy extends _APICoreBase {
  private jqueryFrameJacket: ElementFrameJacket = null;

  constructor(apiCore: IAPICore, jqueryFrameJacket: ElementFrameJacket) {
    super(apiCore);
    this.jqueryFrameJacket = jqueryFrameJacket;
  }

  async OpenFile(fileName: string): Promise<void> {
    try {
      let scContentIframeId0Proxy: ScContentIframeId0Proxy;

      await this.jqueryFrameJacket.WaitForCompleteNABHtmlIframeElement('jquery jacket')
        .then(() => {
          let matchingJackets: ElementFrameJacket[] = this.jqueryFrameJacket.DocumentJacket.GetHostedFramesFilteredBySelector(ContentConst.Const.Selector.SC.Frames.ScContentIframeId0.Id);

          if (matchingJackets && matchingJackets.length > 0) {
            scContentIframeId0Proxy = new ScContentIframeId0Proxy(this.ApiCore, matchingJackets[0]);
            this.Logger.LogImportant('scContentIframeId0FrameJacket frame found');
          }
          else {
            this.ErrorHand.ErrorAndThrow([JqueryFrameProxy.name, this.OpenFile.name], 'no matching jackets');
          }
        })
        .then(() => scContentIframeId0Proxy.OpenFile(fileName))
        .catch((err) => this.ErrorHand.ErrorAndThrow(this.OpenFile.name, err));
    }
    catch (err) {
      this.ErrorHand.ErrorAndThrow([JqueryFrameProxy.name, this.OpenFile.name], err);
    }
  }
}