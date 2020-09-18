import { MenuCommandKey } from "../../../../Shared/scripts/Enums/2xxx-MenuCommand";
import { ModuleKey } from "../../../../Shared/scripts/Enums/ModuleKey";
import { ModuleType } from "../../../../Shared/scripts/Enums/ModuleType";
import { ILoggerAgent } from "../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IMenuCommandDefinition } from "../../../../Shared/scripts/Interfaces/IMenuCommandDefinition";
import { UiHydrationData } from "../../../../Shared/scripts/Interfaces/MenuCommand";
import { _UiModuleBase } from "../UiFeedbackModules/_UiFeedbackModuleBase";

export class _baseButtonModule extends _UiModuleBase {
  protected MenuCommandDefinition: IMenuCommandDefinition;
  protected PlaceHolderUiElem: HTMLElement;
  protected RefreshData: UiHydrationData;
  ModuleKey: ModuleKey = ModuleKey.Unknown;
  Friendly =  this.MenuCommandDefinition ? MenuCommandKey[this.MenuCommandDefinition.MenuCommandKey] : '{error 111}';

  constructor(loggerAgent: ILoggerAgent, menuCommandDefinition: IMenuCommandDefinition) {
    super(loggerAgent, menuCommandDefinition ? menuCommandDefinition.PlaceHolderSelector : null);
    this.MenuCommandDefinition = menuCommandDefinition;

    if (this.MenuCommandDefinition && this.MenuCommandDefinition.PlaceHolderSelector && this.MenuCommandDefinition.PlaceHolderSelector.length > 0) {
      this.PlaceHolderUiElem = document.querySelector(menuCommandDefinition.PlaceHolderSelector);
      if (this.MenuCommandDefinition.ModuleType === ModuleType.ButtonTyp) {
        this.BuildModuleButton();
      }
    }
  }


  Hydrate(refreshData: UiHydrationData): void {
    this.Logger.FuncStart(this.Hydrate.name, this.Friendly);
    this.RefreshData = refreshData;
    this.Logger.FuncEnd(this.Hydrate.name, this.Friendly);
  }

  Init(): void { }
  RefreshUi(): void { }
  BuildModuleButton(): void { }
}