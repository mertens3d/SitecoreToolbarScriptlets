import { ScWindowType } from "../../../Enums/50 - scWindowType";
import { IQueryKeyValuePair } from "./IQueryKeyValuePair";

export interface IPageDeterminator {
    ConfidenceScore: number;
    Friendly: string;
    QueryKeyValuePairs: IQueryKeyValuePair[];
    RegexPathTest: RegExp;
    ScWindowType: ScWindowType;
    ScWindowTypeFriendly: string;
}
