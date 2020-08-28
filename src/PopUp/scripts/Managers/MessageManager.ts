import { MsgFromPopUp } from '../../../Shared/scripts/Classes/MsgFromPopUp';
import { IAllAgents } from '../../../Shared/scripts/Interfaces/Agents/IAllAgents';
import { IContentState } from "../../../Shared/scripts/Interfaces/IContentState/IContentState";
import { PopUpHub } from './PopUpHub';
import { PopUpManagerBase } from './PopUpManagerBase';
import { PopUpMessagesBroker } from './PopUpMessagesBroker/PopUpMessagesBroker';
export class MessageManager extends PopUpManagerBase {
  private MessageBroker: PopUpMessagesBroker;
  constructor(popHub: PopUpHub, allAgents: IAllAgents, PopUpMessagesBroker: PopUpMessagesBroker) {
    super(popHub, allAgents);

    this.MessageBroker = PopUpMessagesBroker;
  }

  InitMessageManager() {
    return new Promise(async (resolve, reject) => {
      this.AllAgents.Logger.FuncStart(this.InitMessageManager.name);

      this.MessageBroker.InitMessageBroker()

      await this.PopHub.EventMan.TriggerPingEvent()
              .then(() => resolve())
        .catch((err) => reject(err));

      this.AllAgents.Logger.FuncEnd(this.InitMessageManager.name);
    });
  }

  SendMessageToContent(msgPayload: MsgFromPopUp): Promise<IContentState> {
    return new Promise(async (resolve, reject) => {
      await this.MessageBroker.SendMessageToContentTab(msgPayload)
        .then((result: IContentState) => resolve(result))
        .catch((err) => reject(err));
    });
  }
}