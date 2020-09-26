import { IMenuCommandDefinition } from "./IMenuCommandDefinition";
import { IStateOfPopUp } from "./IStateOfPopUp";
import { IDataContentReplyReceivedEvent_Payload } from "../../../Content/scripts/Events/ContentReplyReceivedEvent/IDataContentReplyReceivedEvent_Payload";

export interface IHindSiteUiLayer {
    OnContentReplyReceived(dataContentReplyReceivedEvent_Payload: IDataContentReplyReceivedEvent_Payload);
    UiCommandRaisedFlag_Subject: any;
    GetStateOfPopUp(): IStateOfPopUp;

}

export interface ICommandDefinitionBucket {

    MenuCommandParamsAr: IMenuCommandDefinition[];
}
