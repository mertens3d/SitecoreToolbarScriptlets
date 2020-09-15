import { ILoggerAgent } from "../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IUiModule } from "../../../Shared/scripts/Interfaces/Agents/IUiModule";

export class CancelButtonModule implements IUiModule {
  private Selector: string;
  private Logger: ILoggerAgent;

  constructor(selector: string, loggerAgent: ILoggerAgent) {
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