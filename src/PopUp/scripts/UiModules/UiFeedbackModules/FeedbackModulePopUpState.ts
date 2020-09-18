import { Guid } from "../../../../Shared/scripts/Helpers/Guid";
import { IUiModule } from "../../../../Shared/scripts/Interfaces/Agents/IUiModule";
import { UiHydrationData } from "../../../../Shared/scripts/Interfaces/MenuCommand";
import { _UiFeedbackModuleBase } from "./_UiFeedbackModuleBase.1";
import { ModuleKey } from "../../../../Shared/scripts/Enums/ModuleKey";

export class FeedbackModulePopUpState extends _UiFeedbackModuleBase implements IUiModule {

  ModuleKey = ModuleKey.PopUpState;

  Init(): void {

  }
  RefreshUi(): void {
  }

  Hydrate(refreshData: UiHydrationData) {
    var allStateText: string = 'Pop Up State:' + this.lineBreak;
    allStateText += 'Select Snapshot: ' + Guid.AsShort(refreshData.SelectSnapShot);
    this.AddHtmlString(allStateText);
  }
}