import { GuidHelper } from "./GuidHelper";
import { BaseDebug } from "../Classes/debug";
import { UtilityHelper } from "./UtilityHelper";
import { PromiseHelper } from "../Classes/PromiseGeneric";
import { FactoryHelper } from "./FactoryHelper";

export class HelperHub {
  Debug: BaseDebug;
  GuidHelp: GuidHelper;
  UtilityHelp: UtilityHelper;
  PromiseHelp: PromiseHelper;
  FactoryHelp: FactoryHelper;

  constructor(debug: BaseDebug) {
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
  }
} 