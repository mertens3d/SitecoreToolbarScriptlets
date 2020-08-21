import { PopUpManagerBase } from './PopUpManagerBase';
import { PopUpHub } from './PopUpHub';
import { IAllAgents } from '../../../Shared/scripts/Interfaces/Agents/IAllAgents';
import { PopUpMessagesBroker } from './PopUpMessagesBroker/PopUpMessagesBroker';
import { PayloadDataFromPopUp } from '../../../Shared/scripts/Classes/PayloadDataReqPopUp';
import { MsgFromPopUp } from '../../../Shared/scripts/Classes/MsgFromPopUp';
import { ICurrStateContent } from '../../../Shared/scripts/Interfaces/ICurrState';
export class MessageManager extends PopUpManagerBase {
  private MessageBroker: PopUpMessagesBroker;
  constructor(popHub: PopUpHub, allAgents: IAllAgents, PopUpMessagesBroker: PopUpMessagesBroker) {
    super(popHub, allAgents);

    this.MessageBroker = PopUpMessagesBroker;
  }

  Init() {
    this.MessageBroker.Init(this.PopHub.TabMan.CurrentTabData);
  }

  SendMessageToContent(msgPayload: MsgFromPopUp): Promise<ICurrStateContent> {
    return new Promise(async (resolve, reject) => {
      await this.MessageBroker.SendMessageToContentTab(msgPayload)
        .then((result: ICurrStateContent) => resolve(result))
        .catch((err) => reject(err));
    });
  }
}