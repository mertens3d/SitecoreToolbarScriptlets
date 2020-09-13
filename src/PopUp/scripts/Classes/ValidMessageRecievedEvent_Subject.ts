import { GenericEvent_Subject } from "../../../Content/scripts/Proxies/Desktop/DesktopProxy/Events/GenericEvent/GenericEvent_Subject";
import { ILoggerAgent } from "../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IDataContentReplyReceivedEvent_Payload } from "../../../Shared/scripts/Interfaces/Events/IDataContentReplyReceivedEvent_Payload";

export class ValidMessageRecievedEvent_Subject extends GenericEvent_Subject<IDataContentReplyReceivedEvent_Payload> {
    constructor(logger: ILoggerAgent) {
        super(logger, ValidMessageRecievedEvent_Subject.name);
    }
}
