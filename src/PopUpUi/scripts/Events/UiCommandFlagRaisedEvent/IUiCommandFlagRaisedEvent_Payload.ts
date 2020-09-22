import { MsgFlag } from "../../../../Shared/scripts/Enums/1xxx-MessageFlag";
import { IStateOfPopUpUi } from "../../../../Shared/scripts/Interfaces/IMsgPayload";

export interface IUiCommandFlagRaisedEvent_Payload {
  MsgFlag: MsgFlag,
  StateOfPopUp: IStateOfPopUpUi
}