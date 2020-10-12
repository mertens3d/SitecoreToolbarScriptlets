import { QueryStrKey } from "../Enums/QueryStrKey";
import { IGenericUrlParts } from "./Jackets/IUrlParts";
import { ISiteUrl } from "./IAbsoluteUrl";

export interface IUrlJacket {
  readonly OriginalURL: string;
  SetFilePath(CE: string);
  SetParameterValueByKey(qsKey: QueryStrKey, qsValue: string);
  GetUrlParts(): IGenericUrlParts;
  GetQueryStringValueByKey(hsTargetSs: QueryStrKey): string;
  QueryStringHasKey(hsTargetSs: QueryStrKey);
  BuildFullUrlFromParts():ISiteUrl; //newUrlParts: any
}