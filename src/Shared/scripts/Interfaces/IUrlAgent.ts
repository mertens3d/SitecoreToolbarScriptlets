import { QueryStrKey } from "../Enums/QueryStrKey";
import { GenericUrlParts } from "./UrlParts";

export interface IUrlAgent {
  GetUrlParts(): GenericUrlParts;
  GetQueryStringValueByKey(hsTargetSs: QueryStrKey): string;
  QueryStringHasKey(hsTargetSs: QueryStrKey);
  BuildFullUrlFromParts(); //newUrlParts: any
}