import { UiManager } from "./UiManager";
import { LoggerPopUp } from "../Classes/LoggerPopUp";
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
import { LogLevel } from "../../../Shared/scripts/Enums/LogLevel";
//import { PopUpFactoryManager } from "./FactoryManager";

export class PopUpHub {
  Log: LoggerPopUp;

  EventMan: EventManager;
  FeedbackMan: FeedbackManager;
  PopMsgMan: PopUpMessagesManager;
  PopUpAtticMan: PopUpAtticManager;
  UiMan: UiManager;
  TabMan: TabManager;
  LocMan: LocationManager;
  //FactMan: PopUpFactoryManager;

  PopUpConst: IPopUpConst;

  Helpers: HelperHub;
  BrowserMan: BrowserManager;
  SettingsMan: SettingsManager;

  constructor() {
    this.Log = new LoggerPopUp(LogLevel.Enabled);
    this.PopUpAtticMan = new PopUpAtticManager(this);
    this.PopMsgMan = new PopUpMessagesManager(this);
    this.UiMan = new UiManager(this);
    this.EventMan = new EventManager(this);
    this.Helpers = new HelperHub(this.Log);
    this.LocMan = new LocationManager(this);
    this.PopUpConst = PopConst.PopConst;

    this.FeedbackMan = new FeedbackManager(this);
    this.SettingsMan = new SettingsManager(this);
    this.TabMan = new TabManager(this);
    this.BrowserMan = new BrowserManager(this);

    this.init();
  }

  async init() {
    this.Log.FuncStart(PopUpHub.name, this.init.name);
    await this.TabMan.Init();
   await this.SettingsMan.Init();
    this.Log.DebugIDataBrowserTab(this.TabMan.CurrentTabData);
    this.EventMan.Init();
    this.Log.DebugIDataBrowserTab(this.TabMan.CurrentTabData);
    this.PopUpAtticMan.Init(); //before PopMsgMan
    this.Log.DebugIDataBrowserTab(this.TabMan.CurrentTabData);

    this.PopMsgMan.Init(); // before uiman.Init

    this.UiMan.Init();

    //this.PageMan.Init();

    this.Log.FuncEnd(PopUpHub.name, this.init.name);

    this.Log.Log('');
    this.Log.Log('');
  }
}