import { GuidHelper } from "./GuidHelper";
import { LoggerBase } from "../Classes/LoggerBase";
import { UtilityHelper } from "./UtilityHelper";
import { PromiseHelper } from "../Classes/PromiseGeneric";
import { FactoryHelper } from "./FactoryHelper";
import { SettingsHelper } from "./SettingsHelper";

export class HelperHub {
  Debug: LoggerBase;
  GuidHelp: GuidHelper;
  UtilityHelp: UtilityHelper;
  PromiseHelp: PromiseHelper;
  FactoryHelp: FactoryHelper;
  SettingsHelp: SettingsHelper;

  constructor(debug: LoggerBase) {
    debug.FuncStart(HelperHub.name);
    this.Debug = debug;
    this.Init();
    debug.FuncEnd(HelperHub.name);
  }

  Init() {
    this.GuidHelp = new GuidHelper(this);
    this.UtilityHelp = new UtilityHelper(this);
    this.PromiseHelp = new PromiseHelper(this);
    this.FactoryHelp = new FactoryHelper(this);
    this.SettingsHelp = new SettingsHelper(this);
  }
} 