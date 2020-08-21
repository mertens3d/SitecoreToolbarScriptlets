import { BrowserManager } from "./MessageManager/BrowserManager";
import { EventManager } from "./EventManager";
import { HelperAgent } from "../../../Shared/scripts/Helpers/Helpers";
import { IAllAgents } from "../../../Shared/scripts/Interfaces/Agents/IallAgents";
import { LocationManager } from "./LocationManager";
import { PopUpHub } from "./PopUpHub";
import { TabManager } from "./TabManager";
import { UiManager } from "./UiManager/UiManager";
import { MessageManager } from "./MessageManager";

export class PopUpManagerBase {
  PopHub: PopUpHub;
  IsInit: Boolean = false;
  AllAgents: IAllAgents;

  constructor(popHub: PopUpHub, allAgents: IAllAgents) {
    this.PopHub = popHub;
    this.AllAgents = allAgents;
    
  }

  UiMan(): UiManager { return this.PopHub.UiMan; }
  MsgMan(): MessageManager { return this.PopHub.MessageMan; }
  Helpers(): HelperAgent { return this.PopHub.Helpers; }
  EventMan(): EventManager { return this.PopHub.EventMan; }
  locMan(): LocationManager { return this.PopHub.LocMan; }
  TabMan(): TabManager { return this.PopHub.TabMan; }
  BrowserMan(): BrowserManager { return this.PopHub.BrowserMan; }
}