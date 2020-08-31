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
import { ToastAgent } from '../../Shared/scripts/Agents/Agents/ToastAgent/ToastAgent';
import { LoggerConsoleWriter } from '../../Shared/scripts/Agents/Agents/LoggerAgent/LoggerConsoleWriter';
import { LoggerStorageWriter } from '../../Shared/scripts/Agents/Agents/LoggerAgent/LoggerStorageWriter';

class ContentEntry {
  private AllAgents: IAllAgents;

  async main() {
    await this.InstantiateMembers()
      .then(() => this.AllAgents.Logger.Log('Instantiate Members succeeded'))
      .then(() => {
        let contentHub: ContentHub = new ContentHub(this.AllAgents);
        contentHub.InitContentHub()
      })
      .then(() => this.AllAgents.Logger.Log('Init success'))
      .catch((err) => this.AllAgents.Logger.ErrorAndThrow('Content Entry Point', err));
  }

  private async InstantiateMembers() {
  this.AllAgents = new AllAgents();
  this.AllAgents.Logger = new LoggerAgent();
  this.AllAgents.Logger.AddWriter(new LoggerConsoleWriter());
  let storageLogWriter = new LoggerStorageWriter();
  this.AllAgents.Logger.AddWriter(storageLogWriter);

  let Repo: RepoAgent = new RepoAgent(this.AllAgents.Logger);

  this.AllAgents.SettingsAgent = new SettingsAgent(this.AllAgents.Logger, Repo);

  var allSettings: IOneGenericSetting[] = new ConstAllSettings().AllSettings;

  await this.AllAgents.SettingsAgent.InitSettingsAgent(allSettings)
    .then(() => {
      var RollingLogId = new RollingLogIdDrone(this.AllAgents.SettingsAgent, this.AllAgents.Logger);
      var nextLogId = RollingLogId.GetNextLogId();

      storageLogWriter.SetLogToStorageKey(nextLogId);

      this.AllAgents.Logger.AddWriter(new LoggerStorageWriter());

      this.AllAgents.HelperAgent = new HelperAgent(this.AllAgents.Logger);

      this.AllAgents.ToastAgent = new ToastAgent(this.AllAgents.Logger);
    })

    .catch((err) => this.AllAgents.Logger.ErrorAndThrow(this.InstantiateMembers.name, err));
}
}

let contentEntry: ContentEntry = new ContentEntry();
contentEntry.main();
  //.then(text => {
  //  console.log(text);
  //})
  //.catch(err => {
  //  // Deal with the fact the chain failed
  //});