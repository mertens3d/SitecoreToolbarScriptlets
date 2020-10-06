import { MsgFlag } from "../Enums/1xxx-MessageFlag";
import { IHindSiteSetting } from "./Agents/IGenericSetting";
import { IStateOfPopUp } from "./IStateOfPopUp";

export interface IMessageControllerToContent {
    StateOfPopUI: IStateOfPopUp;
    IsValid: boolean;
    CurrentContentPrefs: IHindSiteSetting[];
    MsgFlag: MsgFlag;
}
