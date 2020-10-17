import { ReqCommandMsgFlag } from "../../Enums/10 - MessageFlag";
import { DefaultStateOfStorageSnapshots } from "./DefaultStateOfSnapshots";
import { IMessageContentToController_Payload } from "../../Events/ContentReplyReceivedEvent/IMessageContentToController_Payload";
import { IStateOfStorageSnapShots } from "../../Interfaces/StateOf/IStateOfStorageSnapShots";
import { IStateOfScUi } from "../../Interfaces/StateOf/IDataStateOfSitecoreWindow";

export class DefaultMessageContentToController_Payload implements IMessageContentToController_Payload {
    StateOfStorageSnapShots: IStateOfStorageSnapShots = new DefaultStateOfStorageSnapshots();
    ErrorStack: [];
    LastReqFriendly: string;
    LastReq: ReqCommandMsgFlag;
    StateOfScUiProxy_Live: IStateOfScUi;
}
