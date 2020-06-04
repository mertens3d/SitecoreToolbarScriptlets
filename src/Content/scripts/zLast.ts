import { ContentHub } from './Managers/ContentHub';
import { IAllAgents } from '../../Shared/scripts/Interfaces/Agents/IAllAgents';
import { SettingsAgent } from '../../Shared/scripts/Agents/Agents/SettingsAgent/SettingsAgent';
import { LoggerAgent } from '../../Shared/scripts/Agents/Agents/LoggerAgent/LoggerAgentBase';
import { RepoAgent } from '../../Shared/scripts/Agents/Agents/RepositoryAgent/RepoAgent';
import { HelperAgent } from '../../Shared/scripts/Helpers/Helpers';
import { AllAgents } from '../../Shared/scripts/Agents/Agents/AllAgents';

var allAgents: IAllAgents = new AllAgents();
allAgents.Logger = new LoggerAgent();
allAgents.RepoAgent = new RepoAgent(allAgents.Logger);
allAgents.SettingsAgent = new SettingsAgent(allAgents.Logger, allAgents.RepoAgent);
allAgents.HelperAgent = new HelperAgent(allAgents.Logger);

allAgents.Logger.ThrowIfNullOrUndefined("allAgents", allAgents);
allAgents.Logger.ThrowIfNullOrUndefined("allAgents.HelperAgent", allAgents.HelperAgent);

new ContentHub(allAgents);