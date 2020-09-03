import { MsgFromPopUp } from '../../../Shared/scripts/Classes/MsgFromPopUp';
import { ILoggerAgent } from '../../../Shared/scripts/Interfaces/Agents/ILoggerBase';
import { IContentState } from "../../../Shared/scripts/Interfaces/IContentState/IContentState";
import { EventManager } from './EventManager';
import { PopUpMessagesBroker } from './PopUpMessagesBroker/PopUpMessagesBroker';

export class MessageManager { //extends PopUpManagerBase
  private MessageBroker: PopUpMessagesBroker;
  private EventMan: EventManager;
  private Logger: ILoggerAgent;

  constructor(PopUpMessagesBroker: PopUpMessagesBroker, EventMan: EventManager, logger: ILoggerAgent) {
    //super(popHub, allAgents);
    this.Logger = logger;
    this.MessageBroker = PopUpMessagesBroker;
    this.EventMan = EventMan;
  }

  InitMessageManager() {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.InitMessageManager.name);

      this.MessageBroker.InitMessageBroker();

      await this.EventMan.TriggerPingEvent()
        .then(() => resolve())
        .catch((err) => reject(err));

      this.Logger.FuncEnd(this.InitMessageManager.name);
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