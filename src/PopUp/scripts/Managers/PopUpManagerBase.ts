import { PopUpHub } from "./PopUpHub";
import { UiManager } from "./UiManager";
import { PopUpMessagesManager } from "./PopUpMessagesManager";
import { PopUpAtticManager } from "./PopUpAtticManager";
import { PopUpDebug } from "../Classes/PopUpDebug";


import { IPopUpConst } from "../../../Shared/scripts/Interfaces/IPopUpConst";
import { SettingsManager } from "./SettingsManager";
import { EventManager } from "./EventManager";
import { PageManagerPopUp } from "./PageManagerPopUp";
import { LocationManager } from "./LocationManager";
import { HelperHub } from "../../../Shared/scripts/Helpers/Helpers";
//import { PopUpFactoryManager } from "./FactoryManager";

export class PopUpManagerBase {

  PopHub: PopUpHub;

  constructor(popHub: PopUpHub) {
    this.PopHub = popHub;
    
  }

  UiMan(): UiManager { return this.PopHub.UiMan; }
  debug(): PopUpDebug { return this.PopHub.debug; }
  Const(): IPopUpConst { return this.PopHub.PopUpConst; }
  MsgMan(): PopUpMessagesManager { return this.PopHub.PopMsgMan; }
  PopAtticMan(): PopUpAtticManager { return this.PopHub.PopUpAtticMan; }
  Helpers(): HelperHub { return this.PopHub.Helpers; }
  SettingsMan(): SettingsManager { return this.PopHub.SettingsMan; }
  EventMan(): EventManager { return this.PopHub.EventMan; }
  locMan(): LocationManager { return this.PopHub.LocMan; }
  PageMan(): PageManagerPopUp { return this.PopHub.PageMan; }

}