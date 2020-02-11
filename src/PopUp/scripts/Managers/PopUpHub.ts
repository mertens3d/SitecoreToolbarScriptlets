import { UiManager } from "./UiManager";
import { PopUpDebug } from "../Classes/PopUpDebug";
import { EventManager } from "./EventManager";
import { PopUpMessagesManager } from "./PopUpMessagesManager";
import { PopUpAtticManager } from "./PopUpAtticManager";
import { FeedbackManager } from "./FeedbackManager";
import { PopConst } from "../Classes/PopConst";
import { IPopUpConst } from "../../../Shared/scripts/Interfaces/IPopUpConst";
import { SettingsManager } from "./SettingsManager";
import { PageManagerPopUp } from "./PageManagerPopUp";
import { LocationManager } from "./LocationManager";
import { HelperHub } from "../../../Shared/scripts/Helpers/Helpers";
//import { PopUpFactoryManager } from "./FactoryManager";

export class PopUpHub {
  debug: PopUpDebug;

  EventMan: EventManager;
  FeedbackMan: FeedbackManager;
  PopMsgMan: PopUpMessagesManager;
  PopUpAtticMan: PopUpAtticManager;
  SettingsMan: SettingsManager;
  UiMan: UiManager;
  PageMan: PageManagerPopUp;
  LocMan: LocationManager;
  //FactMan: PopUpFactoryManager;

  PopUpConst: IPopUpConst;

  Helpers: HelperHub;

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
    //this.FactMan = new PopUpFactoryManager(this);
    this.PageMan = new PageManagerPopUp(this);
    this.init();
  }

  init() {
    this.debug.FuncStart(this.init.name, PopUpHub.name);
    this.EventMan.Init();
    this.PopUpAtticMan.Init(); //before PopMsgMan
    this.PopMsgMan.Init(); // before uiman.Init
    this.UiMan.Init();

    //this.PageMan.Init();

    this.debug.FuncEnd(this.init.name, PopUpHub.name);
  }
}