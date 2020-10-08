import { FrameJacket } from "../../../../DOMJacket/FrameJacket";
import { IHindeCore } from "../../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { ContentConst } from "../../../../Shared/scripts/Interfaces/InjectConst";
import { _HindeCoreBase } from "../../../../Shared/scripts/_HindeCoreBase";
import { ScContentIframeId0Proxy } from "./ScContentIframeId0Proxy";

export class JqueryFrameProxy extends _HindeCoreBase {
  private jqueryFrameJacket: FrameJacket = null;

  constructor(hindeCore: IHindeCore, jqueryFrameJacket: FrameJacket) {
    super(hindeCore);
    this.jqueryFrameJacket = jqueryFrameJacket;
  }

  async OpenFile(fileName: string): Promise<void> {
    try {
      let scContentIframeId0Proxy: ScContentIframeId0Proxy;

      await this.jqueryFrameJacket.WaitForCompleteNABHtmlIframeElement('jquery jacket')
        .then(() => {
          let matchingJackets: FrameJacket[] = this.jqueryFrameJacket.DocumentJacket.GetHostedFramesFilteredBySelector(ContentConst.Const.Selector.SC.Frames.ScContentIframeId0Proxy.Id);

          if (matchingJackets && matchingJackets.length > 0) {
            scContentIframeId0Proxy = new ScContentIframeId0Proxy(this.HindeCore, matchingJackets[0]);
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