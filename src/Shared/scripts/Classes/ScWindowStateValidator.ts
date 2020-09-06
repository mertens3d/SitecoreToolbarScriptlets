import { ILoggerAgent } from "../Interfaces/Agents/ILoggerAgent";
import { IContentState } from "../Interfaces/Data/IContentState";
import { DefaultScWindowState } from "./DefaultScWindowState";

export class ScWindowStateValidator {
  Logger: ILoggerAgent;

  constructor(logger: ILoggerAgent) {
    this.Logger = logger;
  }

  ValidateScWindowState(contentState: IContentState): IContentState {
    this.Logger.FuncStart(this.ValidateScWindowState.name);

    var defaultVal: IContentState = new DefaultScWindowState();

    if (!contentState) {
      contentState = defaultVal;
      this.Logger.ErrorAndContinue(this.ValidateScWindowState.name, 'Null contentState');
    }

    if (!contentState.SnapShotsMany) {
      contentState.SnapShotsMany = defaultVal.SnapShotsMany;
      this.Logger.ErrorAndContinue(this.ValidateScWindowState.name, 'Null SnapShotsMany');
    }

    if (!contentState.SnapShotsMany.CurrentSnapShots) {
      contentState.SnapShotsMany.CurrentSnapShots = defaultVal.SnapShotsMany.CurrentSnapShots;
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