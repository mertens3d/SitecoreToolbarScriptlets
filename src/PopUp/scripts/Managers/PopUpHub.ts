﻿import { UiManager } from "./UiManager";
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

export class PopUpHub {
  debug: PopUpDebug;
  EventMan: EventManager;
  FeedbackMan: FeedbackManager;
  GuidMan: GuidHelper;
  PopMsgMan: PopUpMessagesManager;
  PopUpAtticMan: PopUpAtticManager;
  PopUpConst: IPopUpConst;
  SettingsMan: SettingsManager;
  UiMan: UiManager;
  Utilities: Utilities;

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
    this.SettingsMan = new SettingsManager(this);
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