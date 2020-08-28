import { PopUpHub } from "./Managers/PopUpHub";
import { SettingsAgent } from "../../Shared/scripts/Agents/Agents/SettingsAgent/SettingsAgent";
import { LoggerAgent } from "../../Shared/scripts/Agents/Agents/LoggerAgent/LoggerAgent";
import { RepoAgent } from "../../Shared/scripts/Agents/Agents/RepositoryAgent/RepoAgent";
import { AllAgents } from "../../Shared/scripts/Agents/Agents/AllAgents";
import { ConstAllSettings } from "../../Shared/scripts/Agents/Agents/SettingsAgent/ConstAllSettings";
import { IOneGenericSetting } from "../../Shared/scripts/Interfaces/Agents/IOneGenericSetting";
import { HelperAgent } from "../../Shared/scripts/Helpers/Helpers";
import { RollingLogIdDrone } from "../../Shared/scripts/Agents/Drones/RollingLogIdDrone/RollingLogIdDrone";
import { LoggerConsoleWriter } from "../../Shared/scripts/Agents/Agents/LoggerAgent/LoggerConsoleWriter";
import { LoggerStorageWriter } from "../../Shared/scripts/Agents/Agents/LoggerAgent/LoggerStorageWriter";
async function main() {
  var allAgents = new AllAgents();
  allAgents.Logger = new LoggerAgent();
  allAgents.Logger.AddWriter(new LoggerConsoleWriter());

  allAgents.RepoAgent = new RepoAgent(allAgents.Logger);
  allAgents.SettingsAgent = new SettingsAgent(allAgents.Logger, allAgents.RepoAgent);

  var allSettings: IOneGenericSetting[] = new ConstAllSettings().AllSettings;
  await allAgents.SettingsAgent.InitSettingsAgent(allSettings);

  var RollingLogId = new RollingLogIdDrone(allAgents.SettingsAgent);
  var nextLogId = RollingLogId.GetNextLogId();

  let storageLogWriter = new LoggerStorageWriter();
  storageLogWriter.SetLogToStorageKey(nextLogId);

  allAgents.HelperAgent = new HelperAgent(allAgents.Logger);

  let popUpHub = new PopUpHub(allAgents);

  allAgents.Logger.SectionMarker('Begin Init');
  await popUpHub.InitPopUpHub()
    .then(() => allAgents.Logger.Log('Init Successful'))
    .catch((err) => allAgents.Logger.ErrorAndContinue('Pop Up Entry Point Main', JSON.stringify( err)));
  allAgents.Logger.SectionMarker('End Init');
  allAgents.Logger.SectionMarker('Begin Standby');

}

main();