import { ScWindowType } from "../../../Enums/scWindowType";
import { IHindeCore } from "../../../Interfaces/Agents/IHindeCore";
import { _HindeCoreBase } from "../../../LoggableBase";
import { ScUrlAgent } from "./ScUrlAgent";

export class DocumentProxy extends _HindeCoreBase {
  private Document: Document;
  private ScUrlAgent: ScUrlAgent;

  constructor(hindeCore: IHindeCore, document: Document) {
    super(hindeCore);
    this.Document = document;
  }

  GetScwindowType(): ScWindowType {
    return this.ScUrlAgent.GetScWindowType();
  }

  Instantiate() {
    this.ScUrlAgent = new ScUrlAgent(this.HindeCore, this.Document.URL);
    this.ScUrlAgent.Init_ScUrlAgent();
  }
}