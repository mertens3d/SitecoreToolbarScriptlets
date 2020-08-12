"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PopUpHub_1 = require("./Managers/PopUpHub");
var SettingsAgent_1 = require("../../Shared/scripts/Agents/Agents/SettingsAgent/SettingsAgent");
var LoggerAgent_1 = require("../../Shared/scripts/Agents/Agents/LoggerAgent/LoggerAgent");
var RepoAgent_1 = require("../../Shared/scripts/Agents/Agents/RepositoryAgent/RepoAgent");
var AllAgents_1 = require("../../Shared/scripts/Agents/Agents/AllAgents");
var ConstAllSettings_1 = require("../../Shared/scripts/Agents/Agents/SettingsAgent/ConstAllSettings");
var Helpers_1 = require("../../Shared/scripts/Helpers/Helpers");
var allAgents = new AllAgents_1.AllAgents();
allAgents.Logger = new LoggerAgent_1.LoggerAgent();
allAgents.RepoAgent = new RepoAgent_1.RepoAgent(allAgents.Logger);
allAgents.SettingsAgent = new SettingsAgent_1.SettingsAgent(allAgents.Logger, allAgents.RepoAgent);
var allSettings = new ConstAllSettings_1.ConstAllSettings().AllSettings;
allAgents.Logger.LogAsJsonPretty("allSettings", allSettings);
allAgents.SettingsAgent.InitSettingsAgent(allSettings);
allAgents.HelperAgent = new Helpers_1.HelperAgent(allAgents.Logger);
new PopUpHub_1.PopUpHub(allAgents);
//# sourceMappingURL=EntryPoint.js.map