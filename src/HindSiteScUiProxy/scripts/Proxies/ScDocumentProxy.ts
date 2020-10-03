import { ScUrlAgent } from "../../../Shared/scripts/Agents/Agents/UrlAgent/ScUrlAgent";
import { ScWindowType } from "../../../Shared/scripts/Enums/scWindowType";
import { IHindeCore } from "../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { SharedConst } from "../../../Shared/scripts/SharedConst";
import { NativeDocumentProxy } from "./NativeDocumentProxy";
import { ReadyStateNAB } from "../../../Shared/scripts/Enums/ReadyState";

export class ScDocumentProxy extends NativeDocumentProxy {
  Nickname: string;

  public ScUrlAgent: ScUrlAgent;

  constructor(hindeCore: IHindeCore, nativeDocument: Document) {
    super(hindeCore, nativeDocument);
  }

  Instantiate() {
    this.Logger.FuncStart(this.Instantiate.name, ScDocumentProxy.name);
    this.Instantiate_BaseNativeDocumentProxy();
    this.ScUrlAgent = new ScUrlAgent(this.HindeCore, this.Document.URL);
    this.ScUrlAgent.Init_ScUrlAgent();
    this.Logger.FuncEnd(this.Instantiate.name, ScDocumentProxy.name);
  }

  GetScWindowType(): ScWindowType {
    this.ErrorHand.ThrowIfNullOrUndefined(this.GetScWindowType.name + ' ' + ScDocumentProxy.name, this.ScUrlAgent)
    return this.ScUrlAgent.GetScWindowType();
  }

  async WaitForCompleteNAB_ScDocumentProxy(friendly: string): Promise<ReadyStateNAB> {
    //try {
    return this.WaitForCompleteNAB_NativeDocument(friendly);

    //} catch (err) {
    //  this.ErrorHand.ErrorAndThrow(this.WaitForCompleteNAB_ScDocumentProxy.name, err);
    //}
  }




  Validate() {
    if (!this.Document) {
      this.ErrorHand.ErrorAndThrow(this.Validate.name, 'No content doc');
    }
    else if (!this.Document.URL) {
      this.ErrorHand.ErrorAndThrow(this.Validate.name, 'No URL');
    }
    else if (this.Document.URL === SharedConst.Const.UrlSuffix.AboutBlank) {
      this.ErrorHand.ErrorAndThrow(this.Validate.name, SharedConst.Const.UrlSuffix.AboutBlank + ' not allowed');
    }
  }
}