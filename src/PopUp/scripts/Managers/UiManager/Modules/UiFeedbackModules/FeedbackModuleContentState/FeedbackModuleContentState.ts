import { ILoggerAgent } from "../../../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IUiModule } from "../../../../../../../Shared/scripts/Interfaces/Agents/IUiModule";
import { UiFeedbackModuleBase } from "../UiFeedbackModuleBase/UiFeedbackModuleBase";
import { IContentState } from "../../../../../../../Shared/scripts/Interfaces/Data/IContentState";

export class FeedbackModuleContentState extends UiFeedbackModuleBase implements IUiModule {
  constructor(selector: string, loggerAgent: ILoggerAgent) {
    super(selector, loggerAgent)
  }

  Init(): void {
  }

  RefreshUi(): void {
  }

  PopulateContentStateFeedack(dataScWindowState: IContentState) {
    var allStateText: string = '';
    allStateText += JSON.stringify(dataScWindowState, null, 1);
    this.WriteSingleLine(allStateText);
  }
}