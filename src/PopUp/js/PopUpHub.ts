import { UiManager } from "./Managers/UiManager";
import { EventManager } from "./Managers/EventManager";
import { IPopUpConst } from "./Interfaces/IPopUpConst";
import { PopUpMessagesManager } from "./Managers/PopUpMessagesManager";
import { PopUpAtticManager } from "./Managers/PopUpAtticManager";
import { PopUpDebug } from "./Classes/PopUpDebug";
import { GuidHelper } from "../../JsShared/Classes/GuidHelper";
import { PopConst } from "./Classes/PopConst";
import { Utilities } from "../../jsContent/Classes/Utilities";
import { FeedbackManager } from "./Managers/FeedbackManager";

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