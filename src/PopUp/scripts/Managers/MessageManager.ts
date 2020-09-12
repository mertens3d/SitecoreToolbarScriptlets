import { MsgFromPopUp } from '../../../Shared/scripts/Classes/MsgFromPopUp';
import { ILoggerAgent } from '../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { IDataContentReplyReceivedEvent_Payload } from "../../../Shared/scripts/Interfaces/Events/IDataContentReplyReceivedEvent_Payload";
import { PopUpMessagesBroker } from './PopUpMessagesBroker/PopUpMessagesBroker';
import { LoggableBase } from '../../../Content/scripts/Managers/LoggableBase';

export class PopUpMessageManager extends LoggableBase { 
  private MessageBroker: PopUpMessagesBroker;

  constructor(popUpMessagesBroker: PopUpMessagesBroker, logger: ILoggerAgent) {
    super(logger);
    this.MessageBroker = popUpMessagesBroker;
  }

  SendMessageToContentAsync(msgPayload: MsgFromPopUp): Promise<IDataContentReplyReceivedEvent_Payload> {
    return new Promise(async (resolve, reject) => {
      this.MessageBroker.SendMessageToContentAsync(msgPayload)
        .then((result: IDataContentReplyReceivedEvent_Payload) => resolve(result))
        .catch((err) => reject(err));
    });
  }
}