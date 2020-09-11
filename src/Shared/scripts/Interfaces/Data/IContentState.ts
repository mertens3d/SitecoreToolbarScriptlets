import { MsgFlag } from "../../Enums/1xxx-MessageFlag";
import { IError } from "../IError";
import { IDataStateOfContentEditor } from "./IDataOneStorageOneTreeState";
import { IDataStateOfSitecore } from "./IDataOneWindowStorage";
import { IDataSnapShots } from "./IDataSnapShots";

export interface IContentReplyPayload {
  CurrentStateOfSitecore: IDataStateOfSitecore;
  LastReq: MsgFlag;
  SnapShotsStateOfSitecore: IDataSnapShots;
  ErrorStack: IError[];
  LastReqSuccessful: boolean;
  ActiveCe: IDataStateOfContentEditor;
}