import { ReqCommandMsgFlag } from "../Enums/10 - MessageFlag";
import { IHindSiteSetting } from "./Agents/IGenericSetting";
import { IStateOfPopUp } from "./IStateOfPopUp";

export interface IDeepHotKeyData {
  ReqCommandMsgFlag: ReqCommandMsgFlag;
}
export interface ISingleHotKeyPayload {
    ReqCommandMsgFlag: ReqCommandMsgFlag;


}

export interface IMessageControllerToContent {
    StateOfPopUI: IStateOfPopUp;
    IsValid: boolean;
    CurrentContentPrefs: IHindSiteSetting[];
    MsgFlag: ReqCommandMsgFlag;
}
