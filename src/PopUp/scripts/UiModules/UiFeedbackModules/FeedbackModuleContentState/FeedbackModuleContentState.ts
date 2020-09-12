import { UiFeedbackModuleBase } from "../UiFeedbackModuleBase/UiFeedbackModuleBase";
import { IDataStateOfSitecoreWindow } from "../../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfSitecoreWindow";
import { ILoggerAgent } from "../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IUiModule } from "../../../../../Shared/scripts/Interfaces/Agents/IUiModule";

export class FeedbackModuleContentState extends UiFeedbackModuleBase implements IUiModule {
  constructor(selector: string, loggerAgent: ILoggerAgent) {
    super(selector, loggerAgent)
  }

  Init(): void {
  }

  RefreshUi(): void {
  }

  HydrateContentStateFeedack(stateOfSitecoreWindow: IDataStateOfSitecoreWindow) {
    var allStateText: string = '';
    allStateText += JSON.stringify(stateOfSitecoreWindow, null, 1);
    this.WriteSingleLine(allStateText);
  }
}