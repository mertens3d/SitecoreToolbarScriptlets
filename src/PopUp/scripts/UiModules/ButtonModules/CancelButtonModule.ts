import { ModuleKey } from "../../../../Shared/scripts/Enums/ModuleKey";
import { ILoggerAgent } from "../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IUiModuleButton } from "../../../../Shared/scripts/Interfaces/Agents/IUiModuleButton";
import { IMenuCommandDefinition } from "../../../../Shared/scripts/Interfaces/IMenuCommandDefinition";
import { _baseButtonModule } from "./_baseButtonModule";

export class CancelButtonModule extends _baseButtonModule implements IUiModuleButton {
  ModuleKey = ModuleKey.ButtonCancel;

  constructor(loggerAgent: ILoggerAgent, menuCommandParameters: IMenuCommandDefinition) {
    super(loggerAgent, menuCommandParameters);
    this.Logger = loggerAgent;
  }

  WireEvents(): void {
    this.WireEvents_Base();
  }

  Init(): void {
    this.Init_BaseButtonModule();
  }

  RefreshUi(): void {
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