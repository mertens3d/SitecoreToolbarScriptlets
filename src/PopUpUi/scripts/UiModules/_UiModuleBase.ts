import { ModuleKey } from "../../../Shared/scripts/Enums/ModuleKey";
import { IHindeCore } from "../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { UiHydrationData } from "../../../Shared/scripts/Interfaces/UiHydrationData";
import { StaticHelpers } from "../../../Shared/scripts/Classes/StaticHelpers";
import { _HindeCoreBase } from "../../../Shared/scripts/LoggableBase";
import { IUiModule } from "../../../Shared/scripts/Interfaces/Agents/IUiModule";

export abstract class _UiModuleBase extends _HindeCoreBase implements IUiModule {
  ContainerSelector: string;
  ContainerUiDivElem: HTMLDivElement;
  protected UiElement: HTMLElement;
  protected RefreshData: UiHydrationData;
  Friendly: string = 'Not Set';
  ModuleKey: ModuleKey = ModuleKey.Unknown;

  constructor(hindeCore: IHindeCore, containerSelector: string) {
    super(hindeCore);
    this.ContainerSelector = containerSelector;
  }

  abstract Init_Module();
  abstract BuildHtmlForModule();
  abstract RefreshUi_Module();
  abstract WireEvents_Module();

  protected Init_UiModuleBase() {
    this.Logger.FuncStart(this.Init_UiModuleBase.name, this.Friendly);

    this.ContainerUiDivElem = <HTMLDivElement>this.GetUiElement(this.ContainerSelector);

    if (StaticHelpers.IsNullOrUndefined(this.ContainerUiDivElem)) {
      this.ErrorHand.ErrorAndThrow(this.Init_UiModuleBase.name, 'Null: ' + this.ContainerSelector);
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

  Hydrate(refreshData: UiHydrationData): void {
    this.Logger.FuncStart(this.Hydrate.name, this.Friendly);
    this.Logger.LogVal("container exists: ", this.DoesContainerExist().toString());
    this.RefreshData = refreshData;
    this.Logger.FuncEnd(this.Hydrate.name, this.Friendly);
  }

  DoesContainerExist(): boolean {
    let result = this.ContainerUiDivElem !== null;
    this.Logger.LogVal('does it exist ', result.toString());
    return result;
  }
}