import { ILoggerAgent } from "../../../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IUiModule } from "../../../../../../../Shared/scripts/Interfaces/Agents/IUiModule";
import { IContentState } from "../../../../../../../Shared/scripts/Interfaces/IContentState/IContentState";
import { UiFeedbackModuleBase } from "../UiFeedbackModuleBase/UiFeedbackModuleBase";

export class FeedbackModuleContentState extends UiFeedbackModuleBase implements IUiModule {
  constructor(selector: string, loggerAgent: ILoggerAgent) {
    super(selector, loggerAgent)
  }

  Init(): void {
  }

  RefreshUi(): void {
  }

  PopulateContentStateFeedack(contentState: IContentState) {
    var allStateText: string = '';
    allStateText += JSON.stringify(contentState, null, 1);
    this.WriteSingleLine(allStateText);
  }
}