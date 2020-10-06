import { ModuleKey } from "../../../../Shared/scripts/Enums/ModuleKey";
import { IUiModule } from "../../../../Shared/scripts/Interfaces/Agents/IUiModule";
import { _UiFeedbackModuleBase } from "./_UiFeedbackModuleBase";

export class FeedbackModuleStateOfPopUp extends _UiFeedbackModuleBase implements IUiModule {
  Friendly = FeedbackModuleStateOfPopUp.name;

  WireEvents_Module(): void {
  }

  ModuleKey = ModuleKey.PopUpState;

  RefreshUi_Module(): void {

    this.ClearFeedbackElem();
    this.AddHtmlString('not implemented');
  }
}