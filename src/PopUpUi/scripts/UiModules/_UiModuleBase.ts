import { ModuleKey } from "../../../Shared/scripts/Enums/ModuleKey";
import { ILoggerAgent } from "../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { UiHydrationData } from "../../../Shared/scripts/Interfaces/UiHydrationData";
import { StaticHelpers } from "../../../Shared/scripts/Classes/StaticHelpers";
import { LoggableBase } from "../../../Shared/scripts/LoggableBase";

export abstract class _UiModuleBase extends LoggableBase {
  protected ContainerSelector: string;
  protected ContainerUiDivElem: HTMLDivElement;
  protected UiElement: HTMLElement;
  protected RefreshData: any;
  Friendly: string = 'Not Set';
  ModuleKey: ModuleKey = ModuleKey.Unknown;

  constructor(logger: ILoggerAgent, containerSelector: string) {
    super(logger);
    this.ContainerSelector = containerSelector;
  }

  protected Init_UiModuleBase() {
    this.Logger.FuncStart(this.Init_UiModuleBase.name, this.Friendly);

    this.ContainerUiDivElem = <HTMLDivElement>this.GetUiElement(this.ContainerSelector);

    if (StaticHelpers.IsNullOrUndefined(this.ContainerUiDivElem)) {
      this.Logger.ErrorAndThrow(this.Init_UiModuleBase.name, 'Null: ' + this.ContainerSelector);
    }

    this.Logger.FuncEnd(this.Init_UiModuleBase.name, this.Friendly);
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