import { LoggableBase } from "../../../../Content/scripts/Managers/LoggableBase";
import { ILoggerAgent } from "../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IUiModule } from "../../../../Shared/scripts/Interfaces/Agents/IUiModule";
import { UiRefreshData } from "../../../../Shared/scripts/Interfaces/MenuCommand";

export class _UiModuleBase extends LoggableBase implements IUiModule {
  protected ElementSelector: string;
  protected __targetElement: HTMLElement;
    RefreshData: any;

  constructor(logger: ILoggerAgent, selector: string) {
    super(logger);
    this.ElementSelector = selector;
  }

  Hydrate(refreshdata: UiRefreshData): void {
    this.RefreshData = refreshdata;
  }

  Init(): void {
  }

  RefreshUi(): void {
  }
}

