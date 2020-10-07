import { ScWindowType } from "../../../Enums/scWindowType";
import { IQueryKeyValuePair } from "./IQueryKeyValuePair";

export interface IPageDeterminator {
    ConfidenceScore: number;
    Friendly: string;
    QueryKeyValuePairs: IQueryKeyValuePair[];
    RegexPathTest: RegExp;
    ScWindowType: ScWindowType;
    ScWindowTypeFriendly: string;
}
