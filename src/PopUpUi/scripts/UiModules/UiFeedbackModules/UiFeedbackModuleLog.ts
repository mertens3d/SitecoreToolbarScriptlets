import { ModuleKey } from "../../../../Shared/scripts/Enums/ModuleKey";
import { IUiModule } from "../../../../Shared/scripts/Interfaces/Agents/IUiModule";
import { _UiFeedbackModuleBase } from "./_UiFeedbackModuleBase";


export class UiFeedbackModuleLog extends _UiFeedbackModuleBase implements IUiModule {

  Friendly = UiFeedbackModuleLog.name;

  WireEvents_Module(): void {
  }
  
  ModuleKey: ModuleKey = ModuleKey.FeedbackModuleLog;
  FriendlyName: string = UiFeedbackModuleLog.name;


  RefreshUi(): void {
  }

  Init() {

  }

  WriteText(text: string) {
    this.WriteSingleLine(text);
  }
}