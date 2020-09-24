import { IUrlAgent } from "../../IUrlAgent";
import { ScWindowType } from "../../../Enums/scWindowType";
import { QueryStrKey } from "../../../Enums/QueryStrKey";

export interface IScUrlAgent extends IUrlAgent {
  SetFilePathFromWindowType(desiredPageType: ScWindowType);
  SetParameterValueByKey(qsKey: QueryStrKey, qsValue: string);
  GetScWindowType(): ScWindowType;
  Init_ScUrlAgent(): void;
}