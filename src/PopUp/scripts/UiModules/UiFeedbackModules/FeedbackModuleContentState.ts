import { ILoggerAgent } from "../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IUiModule } from "../../../../Shared/scripts/Interfaces/Agents/IUiModule";
import { IDataStateOfSitecoreWindow } from "../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfSitecoreWindow";
import { _UiFeedbackModuleBase } from "./_UiFeedbackModuleBase";

export class FeedbackModuleContentState extends _UiFeedbackModuleBase implements IUiModule {


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