import { QueryStrKey } from "../../Enums/QueryStrKey";

export interface IQueryKeyValuePair {
    Key: QueryStrKey;
    ValueMatch: RegExp;
}
