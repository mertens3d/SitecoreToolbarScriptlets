import { IAllAgents } from "../../../Shared/scripts/Interfaces/Agents/IAllAgents";
import { PopUpHub } from "../Managers/PopUpHub";

export class CommonEvents {
  protected PopHub: PopUpHub; 
  protected AllAgents: IAllAgents;

  constructor(hub: PopUpHub, allAgents: IAllAgents) {
    this.PopHub = hub;
    this.AllAgents = allAgents;
  }



 
}