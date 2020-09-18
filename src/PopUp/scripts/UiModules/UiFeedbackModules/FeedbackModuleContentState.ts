import { IUiModule } from "../../../../Shared/scripts/Interfaces/Agents/IUiModule";
import { UiHydrationData } from "../../../../Shared/scripts/Interfaces/MenuCommand";
import { _UiFeedbackModuleBase } from "./_UiFeedbackModuleBase.1";
import { ModuleKey } from "../../../../Shared/scripts/Enums/ModuleKey";

export class FeedbackModuleContentState extends _UiFeedbackModuleBase implements IUiModule {
  ModuleKey = ModuleKey.ContentState;
  Init(): void {
  }

  RefreshUi(): void {
  }

  HydrateContentStateFeedack(refreshData: UiHydrationData) {
    var allStateText: string = '';
    allStateText += JSON.stringify(refreshData.StateOfSitecoreWindow, null, 1);
    this.WriteSingleLine(allStateText);
  }
}