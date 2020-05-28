import { ContentHub } from './Managers/ContentHub';
import { ContentAgents } from './_first/ContentAgents';
import { IAllConentAgents } from '../../Shared/scripts/Interfaces/Agents/IAllConentAgents';
import { AllHelperAgents } from '../../Shared/scripts/Classes/AllHelperAgents';
import { SettingsAgent } from '../../Shared/scripts/Agents/SettingsAgent/SettingsAgent';
import { LoggerAgent } from '../../Shared/scripts/Agents/LoggerAgent/LoggerAgentBase';

var allContentAgents: IAllConentAgents = new ContentAgents();
allContentAgents.Logger = new LoggerAgent();
allContentAgents.SettingsAgent = new SettingsAgent();
allContentAgents.HelperAgents = new AllHelperAgents(allContentAgents.Logger, allContentAgents.SettingsAgent);

new ContentHub(allContentAgents);