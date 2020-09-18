import { ModuleKey } from "../../../../Shared/scripts/Enums/ModuleKey";
import { IUiModule } from "../../../../Shared/scripts/Interfaces/Agents/IUiModule";
import { _UiFeedbackModuleBase } from "./_UiFeedbackModuleBase.1";


export class UiFeedbackModuleLog extends _UiFeedbackModuleBase implements IUiModule {
  ModuleKey: ModuleKey = ModuleKey.FeedbackModuleLog;
  FriendlyName: string = UiFeedbackModuleLog.name;


  WriteText(text: string) {
    this.WriteSingleLine(text);
  }
}