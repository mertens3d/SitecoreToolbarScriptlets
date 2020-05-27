import { GuidHelper } from "./GuidHelper";
import { UtilityHelper } from "./UtilityHelper";
import { PromiseHelper } from "../Classes/PromiseGeneric";
import { FactoryHelper } from "./FactoryHelper";
import { SettingsHelper } from "./SettingsHelper";
import { UrlHelper } from "./UrlHelper";
import { ILoggerAgentBase } from "../Interfaces/Agents/ILoggerBase";

export class HelperHub {
  
  
Log: ILoggerAgentBase
  GuidHelp: GuidHelper;
  UtilityHelp: UtilityHelper;
  PromiseHelp: PromiseHelper;
  FactoryHelp: FactoryHelper;
  SettingsHelp: SettingsHelper;
    UrlHelp: UrlHelper;

  constructor(logger: ILoggerAgentBase) {
    this.Log = logger;
    this.Log.FuncStart(HelperHub.name);
    this.Init();
    this.Log.FuncEnd(HelperHub.name);
  }

  Init() {
    this.GuidHelp = new GuidHelper(this);
    this.UtilityHelp = new UtilityHelper(this);
    this.PromiseHelp = new PromiseHelper(this);
    this.FactoryHelp = new FactoryHelper(this);
    this.SettingsHelp = new SettingsHelper(this);
    this.UrlHelp = new UrlHelper(this);
  }
} 