import { DocumentJacket } from "../../../../../DOMJacket/Document/DocumentJacket";
import { FrameElemJacket } from "../../../../../DOMJacket/Elements/FrameElemJacket";
import { IAPICore } from "../../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { IStateLessDocProxy } from "../../../../../Shared/scripts/Interfaces/Agents/IStateLessDocProxy";
import { IStateLessDTFrameProxy } from "../../../../../Shared/scripts/Interfaces/Agents/IStateLessFrameProxy";
import { _APICoreBase } from "../../../../../Shared/scripts/_APICoreBase";
import { JqueryModalDialogsFrameProxy } from "./JqueryModalDialogsFrameProxy";

export abstract class _baseStatelessDTFrameProxy extends _APICoreBase implements IStateLessDTFrameProxy {
  protected FrameJacket: FrameElemJacket = null;
  //BaseFrameFactory: SupportFrameFactory;
  abstract FrameSelectorOnHost: string;
  protected HostJacket: DocumentJacket;
  protected HostedDocProxy: IStateLessDocProxy;
  protected JqueryModalDialogsFrameProxy: JqueryModalDialogsFrameProxy;

  constructor(apiCore: IAPICore, hostDocmentJacket: DocumentJacket, jqueryModalDialogsFrameProxy: JqueryModalDialogsFrameProxy) {
    super(apiCore);

    this.HostJacket = hostDocmentJacket;
    this.JqueryModalDialogsFrameProxy = jqueryModalDialogsFrameProxy;
  }

  Instantiate() {
  }

  abstract InstantiateAsyncMembers(): Promise<void>;

  async _base_InstantiateAsyncProperties(): Promise<void> {
    //this.BaseFrameFactory = new SupportFrameFactory(this.ApiCore);
    try {
      await this.HostJacket.WaitForFirstHostedFrame(this.FrameSelectorOnHost)
        .then((elementFrameJacket: FrameElemJacket) => this.FrameJacket = elementFrameJacket)
        .then(() => this.FrameJacket.WaitForCompleteNABHtmlIframeElement(this.FrameSelectorOnHost))
        //.then(() => this.HostedDocProxy = this.FrameJacket.DocumentJacket)
        .catch((err) => this.ErrorHand.HandleFatalError(this._base_InstantiateAsyncProperties.name, err));
    } catch (err) {
      this.ErrorHand.HandleFatalError(this.InstantiateAsyncMembers.name, err);
    }
  }
}