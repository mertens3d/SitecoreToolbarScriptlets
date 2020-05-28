"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PopUpHub_1 = require("./Managers/PopUpHub");
var AllHelperAgents_1 = require("../../Shared/scripts/Classes/AllHelperAgents");
var SettingsAgent_1 = require("../../Shared/scripts/Agents/SettingsAgent/SettingsAgent");
var LoggerAgentBase_1 = require("../../Shared/scripts/Agents/LoggerAgent/LoggerAgentBase");
var AllPopUpAgents_1 = require("./Agents/AllPopUpAgents");
//console.log('did it');
var allAgents = new AllPopUpAgents_1.AllAgents();
allAgents.Logger = new LoggerAgentBase_1.LoggerAgent();
allAgents.SettingsAgent = new SettingsAgent_1.SettingsAgent();
allAgents.HelperAgents = new AllHelperAgents_1.AllHelperAgents(allAgents.Logger, allAgents.SettingsAgent);
new PopUpHub_1.PopUpHub(allAgents);
//# sourceMappingURL=EntryPoint.js.map