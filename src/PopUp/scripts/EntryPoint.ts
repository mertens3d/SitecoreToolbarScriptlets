import { PopUpHub } from "./Managers/PopUpHub";
import { AllHelperAgents } from "../../Shared/scripts/Classes/AllHelperAgents";
import { SettingsAgent } from "../../Shared/scripts/Agents/SettingsAgent/SettingsAgent";
import { LoggerAgent } from "../../Shared/scripts/Agents/LoggerAgent/LoggerAgentBase";
import { AllAgents } from "./Agents/AllPopUpAgents";

//console.log('did it');
var allAgents = new AllAgents();
allAgents.Logger = new LoggerAgent();
allAgents.SettingsAgent = new SettingsAgent();
allAgents.HelperAgents = new AllHelperAgents(allAgents.Logger, allAgents.SettingsAgent );
new PopUpHub(allAgents);
