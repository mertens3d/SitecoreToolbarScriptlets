import { UiManager } from "./UiManager";
import { PopUpDebug } from "../Classes/PopUpDebug";
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
//import { PopUpFactoryManager } from "./FactoryManager";

export class PopUpHub {
  debug: PopUpDebug;

  EventMan: EventManager;
  FeedbackMan: FeedbackManager;
  PopMsgMan: PopUpMessagesManager;
  PopUpAtticMan: PopUpAtticManager;
  SettingsMan: SettingsManager;
  UiMan: UiManager;
  TabMan: TabManager;
  LocMan: LocationManager;
  //FactMan: PopUpFactoryManager;

  PopUpConst: IPopUpConst;

  Helpers: HelperHub;
    BrowserMan: BrowserManager;

  constructor() {
    this.debug = new PopUpDebug(window);
    this.debug.Enabled = true;
    console.log('enabled? ' + this.debug.Enabled);
    this.PopUpAtticMan = new PopUpAtticManager(this);
    this.PopMsgMan = new PopUpMessagesManager(this);
    this.UiMan = new UiManager(this);
    this.EventMan = new EventManager(this);
    this.Helpers = new HelperHub(this.debug);
    this.LocMan = new LocationManager(this);
    this.PopUpConst = PopConst.PopConst;
    
    this.FeedbackMan = new FeedbackManager(this);
    this.SettingsMan = new SettingsManager(this);
    this.TabMan = new TabManager(this);
    //this.FactMan = new PopUpFactoryManager(this);
    this.BrowserMan = new BrowserManager(this);
    this.init();
  }

  async init() {
    this.debug.FuncStart(PopUpHub.name, this.init.name);
    await this.TabMan.Init(); 
    this.debug.DebugIDataBrowserTab(this.TabMan.CurrentTabData);
    this.EventMan.Init();
    this.debug.DebugIDataBrowserTab(this.TabMan.CurrentTabData);
    this.PopUpAtticMan.Init(); //before PopMsgMan
    this.debug.DebugIDataBrowserTab(this.TabMan.CurrentTabData);

    this.PopMsgMan.Init(); // before uiman.Init

    this.UiMan.Init();

    //this.PageMan.Init();


    this.debug.FuncEnd(PopUpHub.name, this.init.name);


    this.debug.Log('');
    this.debug.Log('');
  }
}