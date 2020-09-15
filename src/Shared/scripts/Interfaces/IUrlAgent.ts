import { QueryStrKey } from "../Enums/QueryStrKey";
import { IGenericUrlParts } from "./IUrlParts";

export interface IUrlAgent {
  GetUrlParts(): IGenericUrlParts;
  GetQueryStringValueByKey(hsTargetSs: QueryStrKey): string;
  QueryStringHasKey(hsTargetSs: QueryStrKey);
  BuildFullUrlFromParts(); //newUrlParts: any
}