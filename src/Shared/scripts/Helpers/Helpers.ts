import { GuidHelper } from "./GuidHelper";
import { UtilityHelper } from "./UtilityHelper";
import { PromiseHelper } from "../Classes/PromiseGeneric";
import { FactoryHelper } from "./FactoryHelper";
import { UrlHelper } from "./UrlHelper";
import { IAllHelperAgents } from "../Interfaces/Agents/IAllHelperAgents";

export class HelperHub {
  
  
  GuidHelp: GuidHelper;
  UtilityHelp: UtilityHelper;
  PromiseHelp: PromiseHelper;
  FactoryHelp: FactoryHelper;
  UrlHelp: UrlHelper;

  constructor(helperAgents: IAllHelperAgents){
    helperAgents.LoggerAgent.FuncStart(HelperHub.name);
    this.Init(helperAgents);
    helperAgents.LoggerAgent.FuncEnd(HelperHub.name);
  }

  Init(helperAgents: IAllHelperAgents) {
    this.GuidHelp = new GuidHelper(this, helperAgents);
    this.UtilityHelp = new UtilityHelper(this, helperAgents);
    this.PromiseHelp = new PromiseHelper(this, helperAgents);
    this.FactoryHelp = new FactoryHelper(this, helperAgents);
    this.UrlHelp = new UrlHelper(this, helperAgents);
  }
} 