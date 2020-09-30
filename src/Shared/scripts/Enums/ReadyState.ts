import { SharedConst } from "../SharedConst";
import { LoggableBase } from "../LoggableBase";
import { ILoggerAgent } from "../Interfaces/Agents/ILoggerAgent";

export class ReadyStateNAB extends LoggableBase {
  private Document: Document;
  IsExausted: string = '';

  constructor(logger: ILoggerAgent, document: Document) {
    super(logger);
    this.Logger.ThrowIfNullOrUndefined(ReadyStateNAB.name, document);
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
    return 'DocumentReadyState :' + DocumentReadyState[this.DocumentReadyState()];
  }

  DocIsAboutBlank(): boolean {
    return ((this.DocUrl() === SharedConst.Const.UrlSuffix.AboutBlank) || (this.DocUrl() === ''));
  }

  SetDocument(document: Document) {
    this.Logger.ThrowIfNullOrUndefined(this.SetDocument.name, document);
    this.Document = document;
  }

  IsCompleteNAB(): boolean {
    return this.DocumentReadyState() === DocumentReadyState.Complete && !(this.DocIsAboutBlank());
  }

  DocumentReadyState(): DocumentReadyState {
    let toReturn: DocumentReadyState = DocumentReadyState.ReadyStateUnknown;

    let currentReadyState = document.readyState.toString();
    if (currentReadyState === 'complete') {
      toReturn = DocumentReadyState.Complete;
    } else if (currentReadyState === 'interactive') {
      toReturn = DocumentReadyState.Interactive
    } else if (currentReadyState === 'loading') {
      toReturn = DocumentReadyState.Loading;
    }

    return toReturn;
  }

  DocUrl(): string {
    return this.Document.URL;
  }
}

export enum DocumentReadyState {
  ReadyStateUnknown = 0,
  Complete,
  Interactive,
  Loading
}