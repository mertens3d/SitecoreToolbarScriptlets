import { ReqCommandMsgFlag } from "../Enums/10 - MessageFlag";
import { IHindSiteSetting } from "./Agents/IGenericSetting";
import { IStateOfPopUp } from "./IStateOfPopUp";

export interface IHotKeyCommandPayload {


}

export interface IMessageControllerToContent {
    StateOfPopUI: IStateOfPopUp;
    IsValid: boolean;
    CurrentContentPrefs: IHindSiteSetting[];
    MsgFlag: ReqCommandMsgFlag;
}
