import { MsgFlag } from "../../Enums/1xxx-MessageFlag";
import { IError } from "../IError";
import { IDataSnapShots } from "./IDataSnapShots";
import { IDataOneStorageOneTreeState } from "./IDataOneStorageOneTreeState";
import { IDataDesktopState } from "./IDataDesktopState";

export interface IContentState {
    DesktopState: IDataDesktopState;
    LastReq: MsgFlag;
    SnapShotsMany: IDataSnapShots;
    ErrorStack: IError[];
    LastReqSuccessful: boolean;
    ActiveCe: IDataOneStorageOneTreeState;
}
