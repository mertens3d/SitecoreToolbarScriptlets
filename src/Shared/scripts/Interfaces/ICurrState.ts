import { IDataOneWindowStorage } from "./IDataOneWindowStorage";
import { scWindowType } from "../Enums/scWindowType";
import { MsgFlag } from "../Enums/MessageFlag";
import { IError } from "./IError";

export interface ICurrState {
  LastReq: MsgFlag;
  CurrentSnapShots: IDataOneWindowStorage[];
  WindowType: scWindowType;
  Url: string;
  ErrorStack: IError[];
}