import { MsgFlag } from "../Enums/1xxx-MessageFlag";
import { IHindSiteSetting } from "./Agents/IGenericSetting";
import { IStateOfPopUp } from "./IStateOfPopUp";
import { GuidData } from "../Helpers/GuidData";

export interface ICommandRouterParams {
    NewNickName: string;
    SelectSnapShotId: GuidData;
    MsgFlag: any;

}
export interface IMessageControllerToContent {
  StateOfPopUI: IStateOfPopUp;
  IsValid: boolean;
  CurrentContentPrefs: IHindSiteSetting[];
  MsgFlag: MsgFlag;
}