import { ContentHub } from './Managers/ContentHub/ContentHub';
import { IAllAgents } from '../../Shared/scripts/Interfaces/Agents/IAllAgents';
import { SettingsAgent } from '../../Shared/scripts/Agents/Agents/SettingsAgent/SettingsAgent';
import { LoggerAgent } from '../../Shared/scripts/Agents/Agents/LoggerAgent/LoggerAgent';
import { RepoAgent } from '../../Shared/scripts/Agents/Agents/RepositoryAgent/RepoAgent';
import { HelperAgent } from '../../Shared/scripts/Helpers/Helpers';
import { AllAgents } from '../../Shared/scripts/Agents/Agents/AllAgents';
import { RollingLogIdDrone } from '../../Shared/scripts/Agents/Drones/RollingLogIdDrone/RollingLogIdDrone';
import { IGenericSetting } from '../../Shared/scripts/Interfaces/Agents/IGenericSetting';
import { ConstAllSettings } from '../../Shared/scripts/Agents/Agents/SettingsAgent/ConstAllSettings';
import { ToastAgent } from '../../Shared/scripts/Agents/Agents/ToastAgent/ToastAgent';
import { LoggerConsoleWriter } from '../../Shared/scripts/Agents/Agents/LoggerAgent/LoggerConsoleWriter';
import { LoggerStorageWriter } from '../../Shared/scripts/Agents/Agents/LoggerAgent/LoggerStorageWriter';
import { SettingKey } from '../../Shared/scripts/Enums/3xxx-SettingKey';

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

    let Repo: RepoAgent = new RepoAgent(this.AllAgents.Logger);

    this.AllAgents.SettingsAgent = new SettingsAgent(this.AllAgents.Logger, Repo);

    var allSettings: IGenericSetting[] = new ConstAllSettings().AllSettings;

    this.AllAgents.SettingsAgent.InitSettingsAgent(allSettings);

    if (this.AllAgents.SettingsAgent.GetByKey(SettingKey.EnableLogging)) {
      let consoleLogWrite = new LoggerConsoleWriter();

      var RollingLogId = new RollingLogIdDrone(this.AllAgents.SettingsAgent, this.AllAgents.Logger);
      let storageLogWriter = new LoggerStorageWriter();
      var nextLogId = RollingLogId.GetNextLogId();
      storageLogWriter.SetLogToStorageKey(nextLogId);

      this.AllAgents.Logger.AddWriter(consoleLogWrite);
      this.AllAgents.Logger.AddWriter(storageLogWriter);
    }

    this.AllAgents.Logger.FlushBuffer();

    this.AllAgents.HelperAgent = new HelperAgent(this.AllAgents.Logger);
    this.AllAgents.ToastAgent = new ToastAgent(this.AllAgents.Logger);

  }
}

let contentEntry: ContentEntry = new ContentEntry();
contentEntry.main();
