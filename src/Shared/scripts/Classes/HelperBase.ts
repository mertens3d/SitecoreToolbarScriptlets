import { LoggerBase } from "./LoggerBase";
import { GuidHelper } from "../Helpers/GuidHelper";
import { HelperHub } from "../Helpers/Helpers";
export class HelperBase {
  protected Log: LoggerBase;
  HelperHub: HelperHub;

  constructor(helperHub: HelperHub) {
    this.HelperHub = helperHub;
    this.Log = helperHub.Log;
  }

  GuidHelp(): GuidHelper { return this.HelperHub.GuidHelp; }
}