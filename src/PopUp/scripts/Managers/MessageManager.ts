import { MsgFromPopUp } from '../../../Shared/scripts/Classes/MsgFromPopUp';
import { ILoggerAgent } from '../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { IContentState } from "../../../Shared/scripts/Interfaces/Data/IContentState";
import { PopUpMessagesBroker } from './PopUpMessagesBroker/PopUpMessagesBroker';

export class MessageManager { 
  private MessageBroker: PopUpMessagesBroker;
  private Logger: ILoggerAgent;

  constructor(PopUpMessagesBroker: PopUpMessagesBroker, logger: ILoggerAgent) {
    this.Logger = logger;
    this.MessageBroker = PopUpMessagesBroker;
  }

  SendMessageToContent(msgPayload: MsgFromPopUp): Promise<IContentState> {
    return new Promise(async (resolve, reject) => {
      await this.MessageBroker.SendMessageToContentTab(msgPayload)
        .then((result: IContentState) => resolve(result))
        .catch((err) => reject(err));
    });
  }
}