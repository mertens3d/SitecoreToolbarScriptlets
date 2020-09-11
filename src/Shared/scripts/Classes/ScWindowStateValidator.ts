import { ILoggerAgent } from "../Interfaces/Agents/ILoggerAgent";
import { IContentReplyPayload } from "../Interfaces/Data/IContentState";
import { DefaultContentReplyPayload } from "./DefaultScWindowState";

export class ScWindowStateValidator {
  Logger: ILoggerAgent;

  constructor(logger: ILoggerAgent) {
    this.Logger = logger;
  }

  ValidateScWindowState(contentState: IContentReplyPayload): IContentReplyPayload {
    this.Logger.FuncStart(this.ValidateScWindowState.name);

    var defaultVal: IContentReplyPayload = new DefaultContentReplyPayload();

    if (!contentState) {
      contentState = defaultVal;
      this.Logger.ErrorAndContinue(this.ValidateScWindowState.name, 'Null contentState');
    }

    if (!contentState.SnapShotsStateOfSitecore) {
      contentState.SnapShotsStateOfSitecore = defaultVal.SnapShotsStateOfSitecore;
      this.Logger.ErrorAndContinue(this.ValidateScWindowState.name, 'Null SnapShotsMany');
    }

    if (!contentState.SnapShotsStateOfSitecore.CurrentSnapShots) {
      contentState.SnapShotsStateOfSitecore.CurrentSnapShots = defaultVal.SnapShotsStateOfSitecore.CurrentSnapShots;
      this.Logger.ErrorAndContinue(this.ValidateScWindowState.name, 'Null CurrentSnapShots');
    }

    if (!contentState.ErrorStack) {
      contentState.ErrorStack = defaultVal.ErrorStack;
    }

    if (!contentState.ActiveCe) {
      contentState.ActiveCe = defaultVal.ActiveCe;
    }

    this.Logger.FuncEnd(this.ValidateScWindowState.name);
    return contentState;
  }
}