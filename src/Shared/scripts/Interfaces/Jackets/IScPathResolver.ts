import { QueryStrKey } from "../../Enums/QueryStrKey";
import { ScWindowType } from "../../Enums/50 - scWindowType";
import { IUrlJacket } from "../IUrlAgent";


export interface IScURLResolver {
    SetFilePathFromWindowType(desiredPageType: ScWindowType):void;
    SetParameterValueByKey(qsKey: QueryStrKey, qsValue: string):void;
    UrlJacket: IUrlJacket;
}
