import { MsgFromPopUp } from '../../../Shared/scripts/Classes/MsgFromPopUp';
import { ILoggerAgent } from '../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { IDataContentReplyPayload } from "../../../Shared/scripts/Interfaces/Data/IContentState";
import { PopUpMessagesBroker } from './PopUpMessagesBroker/PopUpMessagesBroker';
import { LoggableBase } from '../../../Content/scripts/Managers/LoggableBase';

export class PopUpMessageManager extends LoggableBase { 
  private MessageBroker: PopUpMessagesBroker;

  constructor(popUpMessagesBroker: PopUpMessagesBroker, logger: ILoggerAgent) {
    super(logger);
    this.MessageBroker = popUpMessagesBroker;
  }

  SendMessageToContent(msgPayload: MsgFromPopUp): Promise<IDataContentReplyPayload> {
    return new Promise(async (resolve, reject) => {
      await this.MessageBroker.SendMessageToContentTab(msgPayload)
        .then((result: IDataContentReplyPayload) => resolve(result))
        .catch((err) => reject(err));
    });
  }
}