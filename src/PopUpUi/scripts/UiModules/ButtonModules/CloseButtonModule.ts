import { IUiModule } from "../../../../Shared/scripts/Interfaces/Agents/IUiModule";
import { _base_ButtonModule } from "./_baseButtonModule";
import { StaticHelpers } from "../../../../Shared/scripts/Classes/StaticHelpers";
import { MenuCommandKey } from "../../../../Shared/scripts/Enums/2xxx-MenuCommand";
import { IUiModuleButton } from "../../../../Shared/scripts/Interfaces/Agents/IUiModuleButton";
import { ModuleKey } from "../../../../Shared/scripts/Enums/ModuleKey";

export class CloseButtonModule extends _base_ButtonModule implements IUiModuleButton {
  ModuleKey = ModuleKey.ButtonClose;

  RefreshUi_Module(): void {
  }

  Init_Module(): void {
    this.Init_BaseButtonModule();
  }

  BuildHtmlForModule() {
    this.BuildHtmlForModule_base_ButtonModule();
    this.BuildElements();
  }

  WireEvents_Module(): void {
    this.WireEvents_Base();
  }

  GetCommandKey() {
    return this.MenuCommandDefinition.MenuCommandKey;
  }

  BuildElements(): void {
    this.Logger.FuncStart(this.BuildElements.name, this.MenuCommandDefinition.InnerText + ' ' + MenuCommandKey[this.MenuCommandDefinition.MenuCommandKey]);
    if (!StaticHelpers.IsNullOrUndefined(this.ContainerUiDivElem)) {
      this.ContainerUiDivElem.appendChild(this.HTMLButtonElement);
    } else {
      this.Logger.ErrorAndContinue(CloseButtonModule.name, 'Could not find ' + this.MenuCommandDefinition.PlaceHolderSelector);
    }
    this.Logger.FuncEnd(this.BuildElements.name);
  }
}