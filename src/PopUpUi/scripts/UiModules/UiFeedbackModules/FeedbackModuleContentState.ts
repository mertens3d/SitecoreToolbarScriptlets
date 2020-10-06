import { ModuleKey } from "../../../../Shared/scripts/Enums/ModuleKey";
import { IUiModule } from "../../../../Shared/scripts/Interfaces/Agents/IUiModule";
import { _UiFeedbackModuleBase } from "./_UiFeedbackModuleBase";

export class FeedbackModuleContentState extends _UiFeedbackModuleBase implements IUiModule {
  Friendly = FeedbackModuleContentState.name;
  ModuleKey = ModuleKey.ContentState;

  WireEvents_Module(): void {
  }

  RefreshUi_Module(): void {
    this.ClearFeedbackElem();
    var allStateText: string = '';
    allStateText += JSON.stringify(this.RefreshData.StateOfLiveHindSite, null, '&nbsp;');
    this.WriteSingleLine(allStateText);
  }
}