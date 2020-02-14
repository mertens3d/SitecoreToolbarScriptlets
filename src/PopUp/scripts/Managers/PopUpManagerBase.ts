import { PopUpHub } from "./PopUpHub";
import { UiManager } from "./UiManager";
import { PopUpMessagesManager } from "./PopUpMessagesManager";
import { PopUpAtticManager } from "./PopUpAtticManager";
import { LoggerPopUp } from "../Classes/LoggerPopUp";


import { IPopUpConst } from "../../../Shared/scripts/Interfaces/IPopUpConst";
import { SettingsManager } from "./SettingsManager";
import { EventManager } from "./EventManager";
import { TabManager } from "./TabManager";
import { LocationManager } from "./LocationManager";
import { HelperHub } from "../../../Shared/scripts/Helpers/Helpers";
import { BrowserManager } from "./BrowserManager";
//import { PopUpFactoryManager } from "./FactoryManager";

export class PopUpManagerBase {

  PopHub: PopUpHub;

  constructor(popHub: PopUpHub) {
    this.PopHub = popHub;
    
    
  }

  UiMan(): UiManager { return this.PopHub.UiMan; }
  Log(): LoggerPopUp { return this.PopHub.Log; }
  Const(): IPopUpConst { return this.PopHub.PopUpConst; }
  MsgMan(): PopUpMessagesManager { return this.PopHub.PopMsgMan; }
  PopAtticMan(): PopUpAtticManager { return this.PopHub.PopUpAtticMan; }
  Helpers(): HelperHub { return this.PopHub.Helpers; }
  EventMan(): EventManager { return this.PopHub.EventMan; }
  locMan(): LocationManager { return this.PopHub.LocMan; }
  TabMan(): TabManager { return this.PopHub.TabMan; }
  BrowserMan(): BrowserManager { return this.PopHub.BrowserMan; }
  SettingsMan(): SettingsManager { return this.PopHub.SettingsMan; }

}