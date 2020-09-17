import { LoggableBase } from "../../../../Content/scripts/Managers/LoggableBase";
import { MenuCommandKey } from "../../../../Shared/scripts/Enums/2xxx-MenuCommand";
import { ModuleType } from "../../../../Shared/scripts/Enums/ModuleType";
import { ILoggerAgent } from "../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IUiModule } from "../../../../Shared/scripts/Interfaces/Agents/IUiModule";
import { UiRefreshData } from "../../../../Shared/scripts/Interfaces/MenuCommand";
import { IMenuCommandDefinition } from "../../../../Shared/scripts/Interfaces/IMenuCommandDefinition";

export class _baseButtonModule extends LoggableBase implements IUiModule {
  protected MenuCommandDefinition: IMenuCommandDefinition;
  protected PlaceHolderUiElem: HTMLElement;
  protected RefreshData: UiRefreshData;

  constructor(loggerAgent: ILoggerAgent, menuCommandDefinition: IMenuCommandDefinition) {
    super(loggerAgent);
    this.MenuCommandDefinition = menuCommandDefinition;

    if (this.MenuCommandDefinition && this.MenuCommandDefinition.PlaceHolderSelector && this.MenuCommandDefinition.PlaceHolderSelector.length > 0) {
      this.PlaceHolderUiElem = document.querySelector(menuCommandDefinition.PlaceHolderSelector);
      if (this.MenuCommandDefinition.ModuleType === ModuleType.ButtonTyp) {
        this.BuildModuleButton();
      }
    }
  }

  Friendly() {
    return MenuCommandKey[this.MenuCommandDefinition.MenuCommandKey];
  }

  Hydrate(refreshData: UiRefreshData): void {
    this.Logger.FuncStart(this.Hydrate.name, this.Friendly());
    this.RefreshData = refreshData;
    this.Logger.FuncEnd(this.Hydrate.name, this.Friendly());
  }

  Init(): void { }
  RefreshUi(): void { }
  BuildModuleButton(): void { }
}