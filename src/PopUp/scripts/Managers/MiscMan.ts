import { PopUpManagerBase } from "./PopUpManagerBase";
import { PopUpHub } from "./PopUpHub";
import { IAllAgents } from "../../../Shared/scripts/Interfaces/Agents/IallAgents";

export class MiscManager extends PopUpManagerBase {
  constructor(popHub: PopUpHub, allAgents: IAllAgents) {

    super(popHub, allAgents);
  }

}