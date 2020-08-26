import { ContentHub } from './Managers/ContentHub/ContentHub';
import { IAllAgents } from '../../Shared/scripts/Interfaces/Agents/IAllAgents';
import { SettingsAgent } from '../../Shared/scripts/Agents/Agents/SettingsAgent/SettingsAgent';
import { LoggerAgent } from '../../Shared/scripts/Agents/Agents/LoggerAgent/LoggerAgent';
import { RepoAgent } from '../../Shared/scripts/Agents/Agents/RepositoryAgent/RepoAgent';
import { HelperAgent } from '../../Shared/scripts/Helpers/Helpers';
import { AllAgents } from '../../Shared/scripts/Agents/Agents/AllAgents';
import { RollingLogIdDrone } from '../../Shared/scripts/Agents/Drones/RollingLogIdDrone/RollingLogIdDrone';
import { IOneGenericSetting } from '../../Shared/scripts/Interfaces/Agents/IOneGenericSetting';
import { ConstAllSettings } from '../../Shared/scripts/Agents/Agents/SettingsAgent/ConstAllSettings';
import { QueryStrAgent } from '../../Shared/scripts/Agents/Agents/QueryStringAgent/QueryStrAgent';
import { ToastAgent } from '../../Shared/scripts/Agents/Agents/ToastAgent/ToastAgent';
import { LoggerConsoleWriter } from '../../Shared/scripts/Agents/Agents/LoggerAgent/LoggerConsoleWriter';
import { LoggerStorageWriter } from '../../Shared/scripts/Agents/Agents/LoggerAgent/LoggerStorageWriter';

async function main() {
  var allAgents: IAllAgents = new AllAgents();
  allAgents.Logger = new LoggerAgent();
  allAgents.Logger.AddWriter(new LoggerConsoleWriter());
  let storageLogWriter = new LoggerStorageWriter();
  allAgents.Logger.AddWriter(storageLogWriter);

  let Repo: RepoAgent = new RepoAgent(allAgents.Logger);

  allAgents.SettingsAgent = new SettingsAgent(allAgents.Logger, Repo);

  var allSettings: IOneGenericSetting[] = new ConstAllSettings().AllSettings;
  await allAgents.SettingsAgent.InitSettingsAgent(allSettings);

  var RollingLogId = new RollingLogIdDrone(allAgents.SettingsAgent);
  var nextLogId = RollingLogId.GetNextLogId();
  console.log('RollingLogId: ' + nextLogId);

  storageLogWriter.SetLogToStorageKey(nextLogId);
  allAgents.Logger.AddWriter(new LoggerStorageWriter());

  allAgents.HelperAgent = new HelperAgent(allAgents.Logger);

  allAgents.QueryStrAgent = new QueryStrAgent(allAgents.Logger);

  allAgents.ToastAgent = new ToastAgent(allAgents.Logger)

  allAgents.Logger.ThrowIfNullOrUndefined("allAgents", allAgents);
  allAgents.Logger.ThrowIfNullOrUndefined("allAgents.HelperAgent", allAgents.HelperAgent);

  let ch: ContentHub = new ContentHub(allAgents);
  await ch.InitFromQueryStr();
}

main();
  //.then(text => {
  //  console.log(text);
  //})
  //.catch(err => {
  //  // Deal with the fact the chain failed
  //});