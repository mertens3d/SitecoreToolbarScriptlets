import { QueryStrKey } from "../../Enums/QueryStrKey";
import { ScWindowType } from "../../Enums/5000 - scWindowType";
import { IUrlJacket } from "../IUrlAgent";

export interface IScUrlAgent  {
  GetScWindowType(): ScWindowType;
  UrlJacket: IUrlJacket;
  SetFilePathFromWindowType(desiredPageType: ScWindowType);
  SetParameterValueByKey(qsKey: QueryStrKey, qsValue: string);
}