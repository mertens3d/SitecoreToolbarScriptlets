import { LoggableBase } from "../../../../Content/scripts/Managers/LoggableBase";
import { ModuleKey } from "../../../../Shared/scripts/Enums/ModuleKey";
import { ILoggerAgent } from "../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { UiHydrationData } from "../../../../Shared/scripts/Interfaces/MenuCommand";

export class _UiModuleBase extends LoggableBase  {
  protected ElementSelector: string;
  protected UiElement: HTMLElement;
  protected RefreshData: any;
  protected Friendly: string = 'Not Set';
  ModuleKey: ModuleKey = ModuleKey.Unknown;

  constructor(logger: ILoggerAgent, selector: string) {
    super(logger);
    this.ElementSelector = selector;
  }

  GetUiElement(): HTMLElement {

    let toReturn: HTMLElement = null;
    if (this.ElementSelector) {
      toReturn = document.querySelector(this.ElementSelector);

    }
    return toReturn;
  }

  Hydrate(refreshdata: UiHydrationData): void {
    this.RefreshData = refreshdata;
  }

  Init(): void {
  }

  RefreshUi(): void {
  }
}

