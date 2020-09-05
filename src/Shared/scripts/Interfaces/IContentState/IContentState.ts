import { MsgFlag } from "../../Enums/1xxx-MessageFlag";
import { IError } from "../IError";
import { ISnapShots } from "./ISnapShots";
import { IDataOneStorageOneTreeState } from "../IDataOneStorageOneTreeState";

export interface IContentState {
    LastReq: MsgFlag;
    SnapShotsMany: ISnapShots;
    ErrorStack: IError[];
    LastReqSuccessful: boolean;
    LastReqFailReason: string;
    ActiveCe: IDataOneStorageOneTreeState;
}
