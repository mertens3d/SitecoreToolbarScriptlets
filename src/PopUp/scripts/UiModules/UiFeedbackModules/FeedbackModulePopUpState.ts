import { Guid } from "../../../../Shared/scripts/Helpers/Guid";
import { GuidData } from "../../../../Shared/scripts/Helpers/GuidData";
import { IUiModule } from "../../../../Shared/scripts/Interfaces/Agents/IUiModule";
import { _UiFeedbackModuleBase } from "./_UiFeedbackModuleBase.1";
import { UiRefreshData } from "../../../../Shared/scripts/Interfaces/MenuCommand";

export class FeedbackModulePopUpState extends _UiFeedbackModuleBase implements IUiModule {
  Init(): void {
  }
  RefreshUi(): void {
  }

  HydratePopUpStateUI(refreshData: UiRefreshData) {
    var allStateText: string = 'Pop Up State:' + this.lineBreak;
    allStateText += 'Select Snapshot: ' + Guid.AsShort(refreshData.SelectSnapShot);

    this.AddHtmlString(allStateText);
  }
}