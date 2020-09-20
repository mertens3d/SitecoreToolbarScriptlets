import { LoggableBase } from "../../../Content/scripts/Managers/LoggableBase";
import { ModuleKey } from "../../../Shared/scripts/Enums/ModuleKey";
import { ILoggerAgent } from "../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { UiHydrationData } from "../../../Shared/scripts/Interfaces/MenuCommand";

export class _UiModuleBase extends LoggableBase {
  protected ContainerSelector: string;
  protected ContainerUiDivElem: HTMLDivElement;
  protected UiElement: HTMLElement;
  protected RefreshData: any;
  protected Friendly: string = 'Not Set';
  ModuleKey: ModuleKey = ModuleKey.Unknown;

  constructor(logger: ILoggerAgent, containerSelector: string) {
    super(logger);
    this.ContainerSelector = containerSelector;
  }

  protected InitUiModuleBase() {
    this.ContainerUiDivElem = <HTMLDivElement> this.GetUiElement(this.ContainerSelector);
  }

  protected GetUiElement(uiSelector: string): HTMLElement {
    let toReturn: HTMLElement = null;
    if (this.ContainerSelector) {
      toReturn = document.querySelector(uiSelector);
    }
    return toReturn;
  }

  Hydrate(refreshdata: UiHydrationData): void {
    this.RefreshData = refreshdata;
  }
}