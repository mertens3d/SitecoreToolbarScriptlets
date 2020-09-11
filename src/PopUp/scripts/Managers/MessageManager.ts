import { MsgFromPopUp } from '../../../Shared/scripts/Classes/MsgFromPopUp';
import { ILoggerAgent } from '../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { IContentReplyPayload } from "../../../Shared/scripts/Interfaces/Data/IContentState";
import { PopUpMessagesBroker } from './PopUpMessagesBroker/PopUpMessagesBroker';

export class MessageManager { 
  private MessageBroker: PopUpMessagesBroker;
  private Logger: ILoggerAgent;

  constructor(PopUpMessagesBroker: PopUpMessagesBroker, logger: ILoggerAgent) {
    this.Logger = logger;
    this.MessageBroker = PopUpMessagesBroker;
  }

  SendMessageToContent(msgPayload: MsgFromPopUp): Promise<IContentReplyPayload> {
    return new Promise(async (resolve, reject) => {
      await this.MessageBroker.SendMessageToContentTab(msgPayload)
        .then((result: IContentReplyPayload) => resolve(result))
        .catch((err) => reject(err));
    });
  }
}