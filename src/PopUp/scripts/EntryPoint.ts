import { PopUpHub } from "./Managers/PopUpHub";
import { LoggerPopUpAgent } from "./Agents/LoggerPopUpAgent";
import { AllPopUpAgents } from "./Agents/AllPopUpAgents";

//console.log('did it');
var allPopUpAgents = new AllPopUpAgents();
allPopUpAgents.Logger = new LoggerPopUpAgent();
new PopUpHub(allPopUpAgents);
