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
    this.PopUpAtticMan = new PopUpAtticManager(this);
    console.log("asdfasdfsdafa");
    console.log("dafsadfdsafsdafsaasdfasdfsa");
    this.debug.LogVal("dddd", "eeee");
    this.PopMsgMan = new PopUpMessagesManager(this);
    this.UiMan = new UiManager(this);
    this.EventMan = new EventManager(this);
    this.GuidMan = new GuidHelper();
    this.PopUpConst = PopConst.PopConst;
    this.Utilities = new Utilities(this.debug);
    this.FeedbackMan = new FeedbackManager(this);
    this.init();
  }

  init() {
    this.EventMan.Init();
    this.UiMan.Init();
  }
}