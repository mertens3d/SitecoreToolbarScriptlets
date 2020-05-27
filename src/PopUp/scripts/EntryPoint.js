"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PopUpHub_1 = require("./Managers/PopUpHub");
var LoggerPopUpAgent_1 = require("./Agents/LoggerPopUpAgent");
var AllPopUpAgents_1 = require("./Agents/AllPopUpAgents");
//console.log('did it');
var allPopUpAgents = new AllPopUpAgents_1.AllPopUpAgents();
allPopUpAgents.Logger = new LoggerPopUpAgent_1.LoggerPopUpAgent();
new PopUpHub_1.PopUpHub(allPopUpAgents);
//# sourceMappingURL=EntryPoint.js.map