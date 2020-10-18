import { SharedConst } from "../SharedConst";
import { _CommonBase } from "../_CommonCoreBase";
import { ICommonCore } from "../Interfaces/Agents/ICommonCore";
import { DocReadyState } from "../Enums/ReadyState";

export class ReadyStateNAB extends _CommonBase {
  private Document: Document;
  IsExausted: string = '';

  constructor(hindeCore: ICommonCore, document: Document) {
    super(hindeCore);
    this.ErrorHand.ThrowIfNullOrUndefined(ReadyStateNAB.name, document);
    this.Document = document;
  }

  LogDebugValues() {
    this.Logger.LogVal('IsCompleteNAB', this.IsCompleteNAB());
    this.Logger.LogVal('Ready State', this.DocumentReadtStateFriendly());
    this.Logger.LogVal('document.URL', this.DocUrl());
    this.Logger.LogVal('Is Exhausted', this.IsExausted.toString());
    this.Logger.LogVal('DocIsAboutBlank', this.DocIsAboutBlank().toString());
  }

  DocumentReadtStateFriendly(): string {
    return 'DocumentReadyState :' + DocReadyState[this.DocumentReadyState()];
  }

  DocIsAboutBlank(): boolean {
    return ((this.DocUrl() === SharedConst.Const.UrlSuffix.AboutBlank) || (this.DocUrl() === ''));
  }

  SetDocument(document: Document) {
    this.ErrorHand.ThrowIfNullOrUndefined(this.SetDocument.name, document);
    this.Document = document;
  }

  IsCompleteNAB(): boolean {
    return this.DocumentReadyState() === DocReadyState.Complete && !(this.DocIsAboutBlank());
  }

  DocumentReadyState(): DocReadyState {
    let toReturn: DocReadyState = DocReadyState.ReadyStateUnknown;

    let currentReadyState = document.readyState.toString();
    if (currentReadyState === 'complete') {
      toReturn = DocReadyState.Complete;
    } else if (currentReadyState === 'interactive') {
      toReturn = DocReadyState.Interactive;
    } else if (currentReadyState === 'loading') {
      toReturn = DocReadyState.Loading;
    }

    return toReturn;
  }

  DocUrl(): string {
    return this.Document.URL;
  }
}