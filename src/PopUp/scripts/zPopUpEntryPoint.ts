﻿import { PopUpHub } from "./Managers/PopUpHub";
import { SettingsAgent } from "../../Shared/scripts/Agents/Agents/SettingsAgent/SettingsAgent";
import { LoggerAgent } from "../../Shared/scripts/Agents/Agents/LoggerAgent/LoggerAgent";
import { RepoAgent } from "../../Shared/scripts/Agents/Agents/RepositoryAgent/RepoAgent";
import { AllAgents } from "../../Shared/scripts/Agents/Agents/AllAgents";
import { ConstAllSettings } from "../../Shared/scripts/Agents/Agents/SettingsAgent/ConstAllSettings";
import { IOneGenericSetting } from "../../Shared/scripts/Interfaces/Agents/IOneGenericSetting";
import { HelperAgent } from "../../Shared/scripts/Helpers/Helpers";
import { RollingLogIdDrone } from "../../Shared/scripts/Agents/Drones/RollingLogIdDrone/RollingLogIdDrone";
async function main() {
  var allAgents = new AllAgents();
  allAgents.Logger = new LoggerAgent();
  allAgents.RepoAgent = new RepoAgent(allAgents.Logger);
  allAgents.SettingsAgent = new SettingsAgent(allAgents.Logger, allAgents.RepoAgent);


  var allSettings: IOneGenericSetting[] = new ConstAllSettings().AllSettings;
  //allAgents.Logger.LogAsJsonPretty("allSettings (default values)", allSettings);
  await allAgents.SettingsAgent.InitSettingsAgent(allSettings);
  //allAgents.Logger.LogAsJsonPretty("allSettings (After init from storage)", allSettings);

  var RollingLogId = new RollingLogIdDrone(allAgents.SettingsAgent);
  var nextLogId = RollingLogId.GetNextLogId();
  console.log('RollingLogId: ' + nextLogId);
  allAgents.Logger.SetLogToStorageKey(nextLogId);


  allAgents.HelperAgent = new HelperAgent(allAgents.Logger);


  new PopUpHub(allAgents);
}

main();