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



export class PopUpHub {
  UiMan: UiManager;
  debug: PopUpDebug;
  EventMan: EventManager;
  PopUpConst: IPopUpConst;
  PopMsgMan: PopUpMessagesManager;
  PopUpAtticMan: PopUpAtticManager;
  GuidMan: GuidHelper;
  Utilities: Utilities;
  FeedbackMan: FeedbackManager;

  constructor() {
    this.debug = new PopUpDebug(window);
    this.debug.Enabled = true;
    console.log('enabled? ' + this.debug.Enabled);
    this.PopUpAtticMan = new PopUpAtticManager(this);
    console.log("asdfasdfsdafa");
    console.log("dafsadfdsafsdafsaasdfasdfsa");
    this.debug.LogVal("dddd", "eeee");
    this.PopMsgMan = new PopUpMessagesManager(this);
    this.UiMan = new UiManager(this);
    this.EventMan = new EventManager(this);
    this.GuidMan = new GuidHelper(this.debug);
    this.PopUpConst = PopConst.PopConst;
    this.Utilities = new Utilities(this.debug);
    this.FeedbackMan = new FeedbackManager(this);
    this.init();
  }

  init() {
    this.debug.FuncStart(this.init.name, PopUpHub.name);
    this.EventMan.Init();
    this.PopMsgMan.Init(); // before uiman.Init
    this.UiMan.Init();
    this.debug.FuncEnd(this.init.name, PopUpHub.name);
  }
}