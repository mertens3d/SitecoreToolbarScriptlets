import { QueryStrKey } from "../Enums/QueryStrKey";
import { IGenericUrlParts } from "./Jackets/IUrlParts";
import { ISiteUrl } from "./IAbsoluteUrl";

export interface IUrlJacket {
  readonly OriginalURL: string;
  SetFilePath(CE: string):void;
  SetParameterValueByKey(qsKey: QueryStrKey, qsValue: string):void;
  GetUrlParts(): IGenericUrlParts;
  GetQueryStringValueByKey(hsTargetSs: QueryStrKey): string;
  QueryStringHasKey(hsTargetSs: QueryStrKey): boolean;
  BuildFullUrlFromParts():ISiteUrl; //newUrlParts: any
}