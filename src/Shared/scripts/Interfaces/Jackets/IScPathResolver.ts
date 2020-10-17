import { QueryStrKey } from "../../Enums/QueryStrKey";
import { ScWindowType } from "../../Enums/50 - scWindowType";
import { IUrlJacket } from "../IUrlAgent";


export interface IScURLResolver {
    SetFilePathFromWindowType(desiredPageType: ScWindowType);
    SetParameterValueByKey(qsKey: QueryStrKey, qsValue: string);
    UrlJacket: IUrlJacket;
}
