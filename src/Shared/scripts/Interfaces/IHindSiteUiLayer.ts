import { IStateOfPopUp } from "./IStateOfPopUp";
import { IControllerMessageReceivedEvent_Payload } from "../Events/ContentReplyReceivedEvent/IDataContentReplyReceivedEvent_Payload";

export interface IHindSiteUiLayer {
    OnContentReplyReceived(dataContentReplyReceivedEvent_Payload: IControllerMessageReceivedEvent_Payload);
    UiCommandRaisedFlag_Subject: any;
    GetStateOfPopUp(): IStateOfPopUp;

}
