import { ModuleKey } from "../../../../Shared/scripts/Enums/ModuleKey";
import { ILoggerAgent } from "../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IUiModuleButton } from "../../../../Shared/scripts/Interfaces/Agents/IUiModuleButton";
import { IMenuCommandDefinition } from "../../../../Shared/scripts/Interfaces/IMenuCommandDefinition";
import { _base_ButtonModule } from "./_baseButtonModule";

export class CancelButtonModule extends _base_ButtonModule implements IUiModuleButton {
  ModuleKey = ModuleKey.ButtonCancel;

  constructor(loggerAgent: ILoggerAgent, menuCommandParameters: IMenuCommandDefinition) {
    super(loggerAgent, menuCommandParameters);
    this.Logger = loggerAgent;
  }

  WireEvents_Module(): void {
    this.WireEvents_Base();
  }

  Init_Module(): void {
    this.Init_BaseButtonModule();
  }

  BuildHtmlForModule() {
    this.BuildHtmlForModule_base_ButtonModule();
  }

  RefreshUi_Module(): void {
  }

  private __GetCancelButton(): HTMLElement {
    return this.ContainerUiDivElem;
  }

  SetCancelFlag() {
    //todo this.OperationCancelled = true;
    var btn = this.__GetCancelButton();
    if (btn) {
      btn.classList.add('red');
    }
  }

  ClearCancelFlag() {
    var btn = this.__GetCancelButton();
    if (btn) {
      btn.classList.remove('red');
    }
    //todo this.UiMan.OperationCancelled = false;
  }
}