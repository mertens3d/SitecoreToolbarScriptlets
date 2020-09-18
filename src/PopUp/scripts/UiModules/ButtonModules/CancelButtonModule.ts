import { ILoggerAgent } from "../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IUiModule } from "../../../../Shared/scripts/Interfaces/Agents/IUiModule";
import { IMenuCommandDefinition } from "../../../../Shared/scripts/Interfaces/IMenuCommandDefinition";
import { _baseButtonModule } from "./_baseButtonModule";
import { ModuleKey } from "../../../../Shared/scripts/Enums/ModuleKey";
export class CancelButtonModule extends _baseButtonModule implements IUiModule {
  private Selector: string;
  ModuleKey = ModuleKey.CancelButton;

  constructor(loggerAgent: ILoggerAgent, selector: string, menuCommandParameters: IMenuCommandDefinition) {
    super(loggerAgent, menuCommandParameters);
    this.Logger = loggerAgent;
    this.Selector = selector;
  }

  Init(): void {
  }

  RefreshUi(): void {
  }


  private __GetCancelButton() {
    return document.getElementById(this.Selector);
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
