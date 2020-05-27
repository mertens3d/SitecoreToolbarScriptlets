import { PopUpManagerBase } from "./PopUpManagerBase";
import { PopUpHub } from "./PopUpHub";
import { LoggerPopUpAgent } from "../Agents/LoggerPopUpAgent";
import { IAllPopUpAgents } from "../../../Shared/scripts/Interfaces/Agents/IAllPopUpAgents";

export class MiscManager extends PopUpManagerBase {
  constructor(popHub: PopUpHub, allPopUpAgents: IAllPopUpAgents) {

    super(popHub, allPopUpAgents);
  }

}