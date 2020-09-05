import { IContentState } from "../Interfaces/IContentState/IContentState";
import { ILoggerAgent } from "../Interfaces/Agents/ILoggerAgent";
import { DefaultContentState } from "./DefaultContentState";

export class ContentStateValidator {
  Logger: ILoggerAgent;

  constructor(logger: ILoggerAgent) {
    this.Logger = logger;
  }

  ValidateContentState(contentState: IContentState): IContentState {
    this.Logger.FuncStart(this.ValidateContentState.name);

    var defaultVal: IContentState = new DefaultContentState();

    if (!contentState) {
      contentState = defaultVal;
      this.Logger.ErrorAndContinue(this.ValidateContentState.name, 'Null contentState');
    }

    if (!contentState.SnapShotsMany) {
      contentState.SnapShotsMany = defaultVal.SnapShotsMany;
      this.Logger.ErrorAndContinue(this.ValidateContentState.name, 'Null SnapShotsMany');
    }

    if (!contentState.SnapShotsMany.CurrentSnapShots) {
      contentState.SnapShotsMany.CurrentSnapShots = defaultVal.SnapShotsMany.CurrentSnapShots;
      this.Logger.ErrorAndContinue(this.ValidateContentState.name, 'Null CurrentSnapShots');
    }

    if (!contentState.ErrorStack) {
      contentState.ErrorStack = defaultVal.ErrorStack;
    }

    if (!contentState.ActiveCe) {
      contentState.ActiveCe = defaultVal.ActiveCe;
    }

    this.Logger.FuncEnd(this.ValidateContentState.name);
    return contentState;
  }
}