import { GuidHelper } from "./GuidHelper";
import { UtilityHelper } from "./UtilityHelper";
import { PromiseHelper } from "../Classes/PromiseGeneric";
import { FactoryHelper } from "./FactoryHelper";
import { UrlHelper } from "./UrlHelper";
import { IAllHelperAgents } from "../Interfaces/Agents/IAllHelperAgents";
import { IAllAgents } from "../Interfaces/Agents/IAllAgents";

export class HelperHub {
  
  
  GuidHelp: GuidHelper;
  UtilityHelp: UtilityHelper;
  PromiseHelp: PromiseHelper;
  FactoryHelp: FactoryHelper;
  UrlHelp: UrlHelper;

  constructor(allAgents: IAllAgents) {
    allAgents.Logger.FuncStart(HelperHub.name);
    this.Init(allAgents);
    allAgents.Logger.FuncEnd(HelperHub.name);
  }

  Init(helperAgents: IAllHelperAgents) {
    this.GuidHelp = new GuidHelper(this, helperAgents);
    this.UtilityHelp = new UtilityHelper(this, helperAgents);
    this.PromiseHelp = new PromiseHelper(this, helperAgents);
    this.FactoryHelp = new FactoryHelper(this, helperAgents);
    this.UrlHelp = new UrlHelper(this, helperAgents);
  }
} 