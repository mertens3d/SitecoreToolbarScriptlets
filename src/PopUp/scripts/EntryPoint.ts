import { PopUpHub } from "./Managers/PopUpHub";
import { AllHelperAgents } from "../../Shared/scripts/Classes/AllHelperAgents";
import { SettingsAgent } from "../../Shared/scripts/Agents/Agents/SettingsAgent/SettingsAgent";
import { LoggerAgent } from "../../Shared/scripts/Agents/Agents/LoggerAgent/LoggerAgentBase";
import { RepoAgent } from "../../Shared/scripts/Agents/Agents/RepositoryAgent/RepoAgent";
import { AllAgents } from "../../Shared/scripts/Agents/Agents/AllAgents";

//console.log('did it');
var allAgents = new AllAgents();
allAgents.Logger = new LoggerAgent();
allAgents.SettingsAgent = new SettingsAgent();
allAgents.RepoAgent = new RepoAgent(allAgents.Logger);

allAgents.HelperAgents = new AllHelperAgents(allAgents.Logger, allAgents.SettingsAgent );
new PopUpHub(allAgents);
