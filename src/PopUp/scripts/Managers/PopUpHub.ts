import { UiManager } from "./UiManager";
import { PopUpDebug } from "../Classes/PopUpDebug";
import { EventManager } from "./EventManager";
import { PopUpMessagesManager } from "./PopUpMessagesManager";
import { PopUpAtticManager } from "./PopUpAtticManager";
import { GuidHelper } from "../../../Shared/scripts/Classes/GuidHelper";
import { Utilities } from "../../../Shared/scripts/Classes/Utilities";
import { FeedbackManager } from "./FeedbackManager";
import { PopConst } from "../Classes/PopConst";
import { IPopUpConst } from "../../../Shared/scripts/Interfaces/IPopUpConst";
import { SettingsManager } from "./SettingsManager";
import { PromiseHelper } from "../../../Shared/scripts/Classes/PromiseHelper";
//import { PopUpFactoryManager } from "./FactoryManager";

export class PopUpHub {
  debug: PopUpDebug;
  EventMan: EventManager;
  FeedbackMan: FeedbackManager;
  GuidHelper: GuidHelper;
  PopMsgMan: PopUpMessagesManager;
  PopUpAtticMan: PopUpAtticManager;
  PopUpConst: IPopUpConst;
  SettingsMan: SettingsManager;
  UiMan: UiManager;
  Utilities: Utilities;
  promHelper: PromiseHelper;
  //FactMan: PopUpFactoryManager;

  constructor() {
    this.debug = new PopUpDebug(window);
    this.debug.Enabled = true;
    console.log('enabled? ' + this.debug.Enabled);
    this.PopUpAtticMan = new PopUpAtticManager(this);
    this.PopMsgMan = new PopUpMessagesManager(this);
    this.UiMan = new UiManager(this);
    this.EventMan = new EventManager(this);
    this.GuidHelper = new GuidHelper(this.debug);
    this.PopUpConst = PopConst.PopConst;
    this.Utilities = new Utilities(this.debug);
    this.FeedbackMan = new FeedbackManager(this);
    this.SettingsMan = new SettingsManager(this);
    this.promHelper = new PromiseHelper(this.debug);
    //this.FactMan = new PopUpFactoryManager(this);
    this.init();
  }

  init() {
    this.debug.FuncStart(this.init.name, PopUpHub.name);
    this.EventMan.Init();
    this.PopUpAtticMan.Init(); //before PopMsgMan
    this.PopMsgMan.Init(); // before uiman.Init
    this.UiMan.Init();
    this.debug.FuncEnd(this.init.name, PopUpHub.name);
  }
}