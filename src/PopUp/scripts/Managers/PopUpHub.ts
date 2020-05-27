import { UiManager } from "./UiManager";
import { LoggerPopUpAgent } from "../Agents/LoggerPopUpAgent";
import { EventManager } from "./EventManager";
import { PopUpMessagesManager } from "./PopUpMessagesManager";
import { PopUpAtticManager } from "./PopUpAtticManager";
import { FeedbackManager } from "./FeedbackManager";
import { PopConst } from "../Classes/PopConst";
import { IPopUpConst } from "../../../Shared/scripts/Interfaces/IPopUpConst";
import { SettingsManager } from "./SettingsManager";
import { TabManager } from "./TabManager";
import { LocationManager } from "./LocationManager";
import { HelperHub } from "../../../Shared/scripts/Helpers/Helpers";
import { BrowserManager } from "./BrowserManager";
import { OneGenericSetting } from "../../../Shared/scripts/Classes/OneGenericSetting";
import { SettingKey } from "../../../Shared/scripts/Enums/SettingKey";
import { SharedConst } from "../../../Shared/scripts/SharedConst";
import { SettingsHelper } from "../../../Shared/scripts/Helpers/SettingsHelper";
import { IAllPopUpAgents } from "../../../Shared/scripts/Interfaces/Agents/IAllPopUpAgents";
//import { PopUpFactoryManager } from "./FactoryManager";

export class PopUpHub {
    [x: string]: any;


  //FactMan: PopUpFactoryManager;
  //PopUpConst: IPopUpConst;
  BrowserMan: BrowserManager;
  EventMan: EventManager;
  FeedbackMan: FeedbackManager;
  Helpers: HelperHub;
  LocMan: LocationManager;
  private AllPopUpAgents: IAllPopUpAgents;
  PopMsgMan: PopUpMessagesManager;
  PopUpAtticMan: PopUpAtticManager;
  SettingsMan: SettingsManager;
  TabMan: TabManager;
  UiMan: UiManager;

  constructor(allPopUpAgents: IAllPopUpAgents) {

    this.AllPopUpAgents = allPopUpAgents;
    this.SettingsMan = new SettingsManager(this, this.AllPopUpAgents);

    this.PopUpAtticMan = new PopUpAtticManager(this, this.AllPopUpAgents);
    this.PopMsgMan = new PopUpMessagesManager(this, this.AllPopUpAgents);
    this.UiMan = new UiManager(this, this.AllPopUpAgents);
    this.EventMan = new EventManager(this, this.AllPopUpAgents);
    this.Helpers = new HelperHub(this.AllPopUpAgents.Logger);
    this.LocMan = new LocationManager(this, this.AllPopUpAgents);
    //this.PopUpConst = PopConst.Const;

    this.FeedbackMan = new FeedbackManager(this, this.AllPopUpAgents);
    this.TabMan = new TabManager(this, this.AllPopUpAgents);
    this.BrowserMan = new BrowserManager(this, this.logger);

    this.init();
  }

  async init() {
    this.AllPopUpAgents.Logger.FuncStart(PopUpHub.name, this.init.name);

    await this.PopUpAtticMan.Init(); //before PopMsgMan
    await this.SettingsMan.Init();//after attic (?)



    let setting: OneGenericSetting = await this.SettingsMan.GetByKey(SettingKey.LogToConsole);
    if (setting) {
      this.AllPopUpAgents.Logger.Init(SettingsHelper.ValueAsBool(setting))
    } else {
      this.AllPopUpAgents.Logger.Init(SharedConst.Const.Settings.Defaults.LogToConsole);
    }




    await this.TabMan.Init();
    

    this.AllPopUpAgents.Logger.DebugIDataBrowserTab(this.TabMan.CurrentTabData);
    this.EventMan.Init();
    this.AllPopUpAgents.Logger.DebugIDataBrowserTab(this.TabMan.CurrentTabData);
    this.AllPopUpAgents.Logger.DebugIDataBrowserTab(this.TabMan.CurrentTabData);

    this.PopMsgMan.Init(); // before uiman.Init

    this.UiMan.Init();

    //this.PageMan.Init();

    this.AllPopUpAgents.Logger.FuncEnd(PopUpHub.name, this.init.name);

    this.AllPopUpAgents.Logger.Log('');
    this.AllPopUpAgents.Logger.Log('');
  }
}