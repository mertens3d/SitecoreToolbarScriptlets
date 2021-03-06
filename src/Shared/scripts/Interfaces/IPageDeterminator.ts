﻿import { IQueryKeyValuePair } from "../Agents/UrlAgent/IQueryKeyValuePair";
import { ScWindowType } from "../Enums/50 - scWindowType";

export interface IPageDeterminator {
    ConfidenceScore: number;
    Friendly: string;
    QueryKeyValuePairs: IQueryKeyValuePair[];
    RegexPathTest: RegExp;
    ScWindowType: ScWindowType;
    ScWindowTypeFriendly: string;
}
