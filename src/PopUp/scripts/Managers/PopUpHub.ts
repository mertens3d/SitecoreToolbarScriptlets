import { IAllAgents } from "../../../Shared/scripts/Interfaces/Agents/IallAgents";
import { PopConst } from "../Classes/PopConst";
import { EventManager } from "./EventManager";
import { MessageManager } from "./MessageManager";
import { BrowserManager } from "./MessageManager/BrowserManager";
import { PopUpMessagesBroker } from "./PopUpMessagesBroker/PopUpMessagesBroker";
import { TabManager } from "./TabManager";
import { FeedbackModuleMessages } from "./UiManager/Modules/UiFeedbackModules/FeedbackModuleMessages/FeedbackModuleMessages";
import { UiManager } from "./UiManager/UiManager";
import { Handlers } from "./Handlers";

export class PopUpHub {
  BrowserMan: BrowserManager;
  EventMan: EventManager;
  _allAgents: IAllAgents;
  TabMan: TabManager;
  UiMan: UiManager;
  MessageMan: MessageManager;

  constructor(allAgents: IAllAgents, tabman: TabManager, uiMan: UiManager, handlers: Handlers, eventMan: EventManager) {
    allAgents.Logger.InstantiateStart(PopUpHub.name);
    this._allAgents = allAgents;

    this.UiMan = uiMan;

    this.EventMan = eventMan;

    let FeedbackModuleMsg: FeedbackModuleMessages = new FeedbackModuleMessages(PopConst.Const.Selector.HS.FeedbackMessages, this._allAgents.Logger);
    let PopUpMessageBroker: PopUpMessagesBroker = new PopUpMessagesBroker(this._allAgents.Logger, FeedbackModuleMsg);

    //after popUpMessageBroker
    this.MessageMan = new MessageManager(PopUpMessageBroker, this.EventMan, allAgents.Logger);

    this.BrowserMan = new BrowserManager(this, this._allAgents);

    this._allAgents.Logger.InstantiateEnd(PopUpHub.name);
  }

  async InitPopUpHub(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this._allAgents.Logger.FuncStart(this.InitPopUpHub.name);

      await this.TabMan.InitTabManager()
        .then(() => this.EventMan.InitEventManager())
        .then(() => this.UiMan.InitUiManager())
        .then(() => this.MessageMan.InitMessageManager())
        .then(() => resolve())
        .catch((err) => reject(err));

      this._allAgents.Logger.FuncEnd(this.InitPopUpHub.name);
    });
  }
}