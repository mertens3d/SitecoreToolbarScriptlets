import { SettingKey } from "../../../Shared/scripts/Enums/3xxx-SettingKey";
import { HelperAgent } from "../../../Shared/scripts/Helpers/Helpers";
import { IAllAgents } from "../../../Shared/scripts/Interfaces/Agents/IallAgents";
import { IOneGenericSetting } from "../../../Shared/scripts/Interfaces/Agents/IOneGenericSetting";
import { SharedConst } from "../../../Shared/scripts/SharedConst";
import { EventManager } from "./EventManager";
import { LocationManager } from "./LocationManager";
import { MessageManager } from "./MessageManager";
import { BrowserManager } from "./MessageManager/BrowserManager";
import { PopUpMessagesBroker } from "./PopUpMessagesBroker/PopUpMessagesBroker";
import { TabManager } from "./TabManager";
import { FeedbackModuleMessages } from "./UiManager/Modules/UiFeedbackModules/FeedbackModuleMessages/FeedbackModuleMessages";
import { UiManager } from "./UiManager/UiManager";
import { PopConst } from "../Classes/PopConst";

export class PopUpHub {
  BrowserMan: BrowserManager;
  EventMan: EventManager;
  Helpers: HelperAgent;
  LocMan: LocationManager;
  _allAgents: IAllAgents;
  TabMan: TabManager;
  UiMan: UiManager;
  MessageMan: MessageManager;

  constructor(allAgents: IAllAgents) {
    allAgents.Logger.InstantiateStart(PopUpHub.name);
    this._allAgents = allAgents;

    this.EventMan = new EventManager(this, this._allAgents);

    this.LocMan = new LocationManager(this, this._allAgents);

    this.TabMan = new TabManager(this, this._allAgents);

    this.Helpers = new HelperAgent(allAgents.Logger);

    this.UiMan = new UiManager(this, this._allAgents);
    //after tabman
    //after uiMan
    // after HelperAgent

    let FeedbackModuleMsg: FeedbackModuleMessages = new FeedbackModuleMessages(PopConst.Const.Selector.HS.FeedbackMessages, this._allAgents.Logger);
    let PopUpMessageBroker: PopUpMessagesBroker = new PopUpMessagesBroker(this._allAgents.Logger, FeedbackModuleMsg);

    //after popUpMessageBroker
    this.MessageMan = new MessageManager(this, this._allAgents, PopUpMessageBroker);

    this.BrowserMan = new BrowserManager(this, this._allAgents);

    this._allAgents.Logger.InstantiateEnd(PopUpHub.name);
  }

  async InitPopUpHub(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this._allAgents.Logger.FuncStart(this.InitPopUpHub.name);

      let logToConsolesetting: IOneGenericSetting = await this._allAgents.SettingsAgent.GetByKey(SettingKey.LogToConsole);

      if (logToConsolesetting) {
        await this._allAgents.Logger.Init(this._allAgents.SettingsAgent.ValueAsBool(logToConsolesetting))
      } else {
        await this._allAgents.Logger.Init(SharedConst.Const.Settings.Defaults.LogToConsole);
      }

      this.TabMan.InitTabManager()
        .then(() => this.EventMan.InitEventManager())
        .then(() => this.UiMan.InitUiManager())
        .then(() => this.MessageMan.InitMessageManager())
        .then(() => resolve())
        .catch((err) => reject(err));


      this._allAgents.Logger.FuncEnd(this.InitPopUpHub.name);
    });
  }
}