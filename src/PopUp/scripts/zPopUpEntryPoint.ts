import { PopUpHub } from "./Managers/PopUpHub";
import { SettingsAgent } from "../../Shared/scripts/Agents/Agents/SettingsAgent/SettingsAgent";
import { LoggerAgent } from "../../Shared/scripts/Agents/Agents/LoggerAgent/LoggerAgent";
import { RepoAgent } from "../../Shared/scripts/Agents/Agents/RepositoryAgent/RepoAgent";
import { AllAgents } from "../../Shared/scripts/Agents/Agents/AllAgents";
import { ConstAllSettings } from "../../Shared/scripts/Agents/Agents/SettingsAgent/ConstAllSettings";
import { IGenericSetting } from "../../Shared/scripts/Interfaces/Agents/IGenericSetting";
import { HelperAgent } from "../../Shared/scripts/Helpers/Helpers";
import { RollingLogIdDrone } from "../../Shared/scripts/Agents/Drones/RollingLogIdDrone/RollingLogIdDrone";
import { LoggerConsoleWriter } from "../../Shared/scripts/Agents/Agents/LoggerAgent/LoggerConsoleWriter";
import { LoggerStorageWriter } from "../../Shared/scripts/Agents/Agents/LoggerAgent/LoggerStorageWriter";
import { SettingKey } from "../../Shared/scripts/Enums/3xxx-SettingKey";
import { PopConst } from "./Classes/PopConst";
import { OneGenericSetting } from "../../Shared/scripts/Agents/Agents/SettingsAgent/OneGenericSetting";

class PopUpEntry {
  RepoAgent: RepoAgent;
  Logger: LoggerAgent;
  SettingsAgent: SettingsAgent;
  HelperAgent: HelperAgent;

  async main() {
    try {
      this.InstantiateAndInitSettingsAndLogger();

      this.InstantiateMembers();
      await this.InitMembers()
        .then(() => { })
        .catch((err) => console.log(err));

      this.Logger.SectionMarker('Begin Standby');
    } catch (e) {
      console.log(e);
    }
  }

  private InstantiateAndInitSettingsAndLogger() {
    this.Logger = new LoggerAgent();

    this.RepoAgent = new RepoAgent(this.Logger);
    this.SettingsAgent = new SettingsAgent(this.Logger, this.RepoAgent);

    var allSettings: IGenericSetting[] = new ConstAllSettings().AllSettings;
    this.SettingsAgent.InitSettingsAgent(allSettings);

    this.InitLogger();
  }

  private async InstantiateMembers() {
    this.HelperAgent = new HelperAgent(this.Logger);
  }

  private InitLogger() {
    this.Logger.FuncStart(this.InitLogger.name);

    let enableLoggingSetting: OneGenericSetting = this.SettingsAgent.GetByKey(SettingKey.EnableLogging);
    this.Logger.MarkerB();

    this.Logger.LogAsJsonPretty('enableLoggingSetting', enableLoggingSetting);
    this.Logger.MarkerC();
    if (PopConst.Const.Debug.ForceLoggingEnabled || enableLoggingSetting.ValueAsBool()) {
      var RollingLogId = new RollingLogIdDrone(this.SettingsAgent, this.Logger);
      var nextLogId = RollingLogId.GetNextLogId();

      let storageLogWriter = new LoggerStorageWriter();
      storageLogWriter.SetLogToStorageKey(nextLogId);

      let consoleLogger = new LoggerConsoleWriter();

      //this.Logger.AddWriter(storageLogWriter);
      this.Logger.AddWriter(consoleLogger);
    }
    this.Logger.FlushBuffer();

    this.Logger.FuncEnd(this.InitLogger.name);
  }
  async InitHub() {
    let popUpHub: PopUpHub;

    let allAgents: AllAgents = new AllAgents();
    allAgents.SettingsAgent = this.SettingsAgent;
    allAgents.HelperAgent = this.HelperAgent;
    allAgents.Logger = this.Logger;
    popUpHub = new PopUpHub(allAgents);

    await popUpHub.InitPopUpHub()
      .then(() => { })
      .catch((err) => {
        this.Logger.ErrorAndContinue('Pop Up Entry Point Main', JSON.stringify(err));
        throw (err);
      });
  }
  async InitMembers(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.Logger.SectionMarker('Begin Init');

      this.InitHub();
      this.Logger.SectionMarker('End Init');
    });
  }
}

let popUpEntry: PopUpEntry = new PopUpEntry();

popUpEntry.main();