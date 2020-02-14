import { LoggerBase } from "./LoggerBase";
import { GuidHelper } from "../Helpers/GuidHelper";
import { HelperHub } from "../Helpers/Helpers";
export class HelperBase {
  protected Debug: LoggerBase;
  HelperHub: HelperHub;

  constructor(helperHub: HelperHub) {
    this.HelperHub = helperHub;
    this.Debug = helperHub.Debug;
  }
  
  GuidHelp(): GuidHelper{    return this.HelperHub.GuidHelp;  }

}
