import { IQueryStrAgent } from "../../../Interfaces/Agents/IQueryStrAgent";
import { ILoggerAgent } from "../../../Interfaces/Agents/ILoggerBase";
import { QueryStrKey } from "../../../Enums/QueryStrKey";

export class QueryStrAgent implements IQueryStrAgent {
  private Logger: ILoggerAgent;

  private UrlParams: URLSearchParams;

  constructor(loggerAgent: ILoggerAgent) {
    this.Logger = loggerAgent;

    this.UrlParams = new URLSearchParams(window.location.search);
  }

  HasKey(key: QueryStrKey): boolean {
    let toReturn: boolean = false;

    if (key !== null) {
      let keyAsStr: string = QueryStrKey[key];

      if (keyAsStr) {
        toReturn = this.UrlParams && this.UrlParams.has(keyAsStr)
      }
    }

    return toReturn;
  }

  QsValueByKey(key: QueryStrKey): string {
    let toReturn: string = '';

    if (this.HasKey(key)) {
      let keyAsStr: string = QueryStrKey[key];
      toReturn = this.UrlParams.get(keyAsStr);
    }

    return toReturn;
  }
}