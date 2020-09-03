import { IAllAgents } from "../../../Shared/scripts/Interfaces/Agents/IallAgents";
import { EventManager } from "./EventManager";
import { BrowserManager } from "./MessageManager/BrowserManager";
import { PopUpHub } from "./PopUpHub";
import { TabManager } from "./TabManager";
import { UiManager } from "./UiManager/UiManager";

export class PopUpManagerBase {
  PopHub: PopUpHub;
  IsInit: Boolean = false;
  protected AllAgents: IAllAgents;

  constructor(popHub: PopUpHub, allAgents: IAllAgents) {
    this.PopHub = popHub;
    this.AllAgents = allAgents;
    
  }

  UiMan(): UiManager { return this.PopHub.UiMan; }
  EventMan(): EventManager { return this.PopHub.EventMan; }
  TabMan(): TabManager { return this.PopHub.TabMan; }
  BrowserMan(): BrowserManager { return this.PopHub.BrowserMan; }
}