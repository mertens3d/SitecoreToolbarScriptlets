import { IUiModule } from "../../../../Shared/scripts/Interfaces/Agents/IUiModule";
import { UiRefreshData } from "../../../../Shared/scripts/Interfaces/MenuCommand";
import { _UiFeedbackModuleBase } from "./_UiFeedbackModuleBase.1";

export class FeedbackModuleContentState extends _UiFeedbackModuleBase implements IUiModule {


  Init(): void {
  }

  RefreshUi(): void {
  }

  HydrateContentStateFeedack(refreshData: UiRefreshData) {
    var allStateText: string = '';
    allStateText += JSON.stringify(refreshData.StateOfSitecoreWindow, null, 1);
    this.WriteSingleLine(allStateText);
  }
}