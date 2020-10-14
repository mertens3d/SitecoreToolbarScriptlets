import { DocumentJacket } from "../../../../../DOMJacket/Document/DocumentJacket";
import { ElementFrameJacket } from "../../../../../DOMJacket/Elements/ElementFrameJacket";
import { IAPICore } from "../../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { IStateLessDocProxy } from "../../../../../Shared/scripts/Interfaces/Agents/IStateLessDocProxy";
import { IStateLessFrameProxy } from "../../../../../Shared/scripts/Interfaces/Agents/IStateLessFrameProxy";
import { _APICoreBase } from "../../../../../Shared/scripts/_APICoreBase";

export abstract class _baseStatelessFrameProxy extends _APICoreBase implements IStateLessFrameProxy {
  protected FrameJacket: ElementFrameJacket = null;
  //BaseFrameFactory: SupportFrameFactory;
  abstract FrameSelectorOnHost: string;
  protected HostJacket: DocumentJacket;
  protected HostedDocProxy: IStateLessDocProxy;

  constructor(apiCore: IAPICore, hostDocmentJacket: DocumentJacket) {
    super(apiCore);

    this.HostJacket = hostDocmentJacket;
  }

  Instantiate() {
  }

  abstract InstantiateAsyncMembers(): Promise<void>;

  async _base_InstantiateAsyncProperties(): Promise<void> {
    //this.BaseFrameFactory = new SupportFrameFactory(this.ApiCore);
    try {
      await this.HostJacket.WaitForFirstHostedFrame(this.FrameSelectorOnHost)
        .then((elementFrameJacket: ElementFrameJacket) => this.FrameJacket = elementFrameJacket)
        .then(() => this.FrameJacket.WaitForCompleteNABHtmlIframeElement(this.FrameSelectorOnHost))
        .then(() => this.HostedDocProxy = this.FrameJacket.DocumentJacket)
        .catch((err) => this.ErrorHand.HandleFatalError(this._base_InstantiateAsyncProperties.name, err));
    } catch (err) {
      this.ErrorHand.HandleFatalError(this.InstantiateAsyncMembers.name, err);
    }
  }
}