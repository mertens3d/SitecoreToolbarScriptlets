import { UiManager } from "./UiManager/UiManager";
import { EventManager } from "./EventManager";
import { PopUpMessagesBroker } from "./PopUpMessagesBroker/PopUpMessagesBroker";
import { FeedbackManager } from "./FeedbackManager";
import { TabManager } from "./TabManager";
import { LocationManager } from "./LocationManager";
import { HelperAgent } from "../../../Shared/scripts/Helpers/Helpers";
import { BrowserManager } from "./MessageManager/BrowserManager";
import { SettingKey } from "../../../Shared/scripts/Enums/3xxx-SettingKey";
import { SharedConst } from "../../../Shared/scripts/SharedConst";
import { IAllAgents } from "../../../Shared/scripts/Interfaces/Agents/IallAgents";
import { IOneGenericSetting } from "../../../Shared/scripts/Interfaces/Agents/IOneGenericSetting";
import { UiCommunicationFeedbackModule } from "./UiMessageOverlayModule";
import { MessageManager } from "./MessageManager";

export class PopUpHub {
  //[x: string]: any;

  BrowserMan: BrowserManager;
  EventMan: EventManager;
  FeedbackMan: FeedbackManager;
  Helpers: HelperAgent;
  LocMan: LocationManager;
  _allAgents: IAllAgents;
  TabMan: TabManager;
  UiMan: UiManager;
  MessageMan: MessageManager;

  constructor(allAgents: IAllAgents) {
    this._allAgents = allAgents;

    this.EventMan = new EventManager(this, this._allAgents);

    this.LocMan = new LocationManager(this, this._allAgents);
    //this.PopUpConst = PopConst.Const;

    this.FeedbackMan = new FeedbackManager(this, this._allAgents);
    this.TabMan = new TabManager(this, this._allAgents);

    this.UiMan = new UiManager(this, this._allAgents);
    //after tabman
    //after uiMan
    let PopUpMessageBroker = new PopUpMessagesBroker(this._allAgents.Logger, this.UiMan.MessageFeedbackModule);

    //after popUpMessageBroker
    this.MessageMan = new MessageManager(this, this._allAgents, PopUpMessageBroker);

    this.BrowserMan = new BrowserManager(this, this._allAgents);

    this.Helpers = new HelperAgent(allAgents.Logger);

    this.init();
  }

  async init() {
    this._allAgents.Logger.FuncStart(PopUpHub.name, this.init.name);

    let setting: IOneGenericSetting = await this._allAgents.SettingsAgent.GetByKey(SettingKey.LogToConsole);

    console.log("setting");
    console.log(setting);

    if (setting) {
      await this._allAgents.Logger.Init(this._allAgents.SettingsAgent.ValueAsBool(setting))
    } else {
      await this._allAgents.Logger.Init(SharedConst.Const.Settings.Defaults.LogToConsole);
    }

    await this.TabMan.Init();

    await this.MessageMan.Init();

    this._allAgents.Logger.DebugIDataBrowserTab(this.TabMan.CurrentTabData);
    this.EventMan.Init();
    this._allAgents.Logger.DebugIDataBrowserTab(this.TabMan.CurrentTabData);
    this._allAgents.Logger.DebugIDataBrowserTab(this.TabMan.CurrentTabData);

    this.UiMan.Init();

    //this.PageMan.Init();

    this._allAgents.Logger.FuncEnd(PopUpHub.name, this.init.name);

    this._allAgents.Logger.Log('');
    this._allAgents.Logger.Log('');
  }
}