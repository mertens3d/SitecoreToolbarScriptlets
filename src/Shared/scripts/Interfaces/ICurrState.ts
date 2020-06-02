import { MsgFlag } from "../Enums/MessageFlag";
import { IError } from "./IError";
import { ISnapShotsMany } from "./ISnapShotsMany";
import { IDataOneStorageOneTreeState } from "./IDataOneStorageOneTreeState";

export interface ICurrStateContent {
  LastReq: MsgFlag,
  SnapShotsMany: ISnapShotsMany,
  //WindowType: scWindowType;
  //Url: string;
  ErrorStack: IError[],
  LastReqSuccessful: boolean,
  LastReqFailReason: string,
  ActiveCe: IDataOneStorageOneTreeState
}