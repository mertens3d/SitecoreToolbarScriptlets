import { ModuleKey } from "../../../../Shared/scripts/Enums/ModuleKey";
import { IUiModule } from "../../../../Shared/scripts/Interfaces/Agents/IUiModule";
import { _UiFeedbackModuleBase } from "./_UiFeedbackModuleBase";

export class UiFeedbackModuleLog extends _UiFeedbackModuleBase implements IUiModule {
  Friendly = UiFeedbackModuleLog.name;
  ModuleKey: ModuleKey = ModuleKey.FeedbackModule;
  FriendlyName: string = UiFeedbackModuleLog.name;

  WireEvents_Module(): void {
  }

  RefreshUi_Module(): void {
  }

  WriteText(text: string) {
    this.WriteSingleLine(text);
  }
}