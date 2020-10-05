import { MsgFlag } from "../../Enums/1xxx-MessageFlag";
import { DefaultStateOfStorageSnapshots } from "./DefaultStateOfSnapshots";
import { IMessageContentToController_Payload } from "../../Events/ContentReplyReceivedEvent/IMessageContentToController_Payload";
import { IStateOfStorageSnapShots } from "../../Interfaces/Data/States/IStateOfStorageSnapShots";
import { IStateOfScUi } from "../../Interfaces/Data/States/IDataStateOfSitecoreWindow";

export class DefaultMessageContentToController_Payload implements IMessageContentToController_Payload {
    StateOfStorageSnapShots: IStateOfStorageSnapShots = new DefaultStateOfStorageSnapshots();
    ErrorStack: [];
    LastReqFriendly: string;
    LastReq: MsgFlag;
    StateOfScUiProxy_Live: IStateOfScUi;
}
