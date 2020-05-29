"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PopUpHub_1 = require("./Managers/PopUpHub");
var AllHelperAgents_1 = require("../../Shared/scripts/Classes/AllHelperAgents");
var SettingsAgent_1 = require("../../Shared/scripts/Agents/Agents/SettingsAgent/SettingsAgent");
var LoggerAgentBase_1 = require("../../Shared/scripts/Agents/Agents/LoggerAgent/LoggerAgentBase");
var RepoAgent_1 = require("../../Shared/scripts/Agents/Agents/RepositoryAgent/RepoAgent");
var AllAgents_1 = require("../../Shared/scripts/Agents/Agents/AllAgents");
//console.log('did it');
var allAgents = new AllAgents_1.AllAgents();
allAgents.Logger = new LoggerAgentBase_1.LoggerAgent();
allAgents.SettingsAgent = new SettingsAgent_1.SettingsAgent();
allAgents.RepoAgent = new RepoAgent_1.RepoAgent(allAgents.Logger);
allAgents.HelperAgents = new AllHelperAgents_1.AllHelperAgents(allAgents.Logger, allAgents.SettingsAgent);
new PopUpHub_1.PopUpHub(allAgents);
//# sourceMappingURL=EntryPoint.js.map