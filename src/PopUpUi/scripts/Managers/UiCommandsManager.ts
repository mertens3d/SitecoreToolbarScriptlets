import { LoggableBase } from '../../../Content/scripts/Managers/LoggableBase';
import { ScWindowType } from '../../../Shared/scripts/Enums/scWindowType';
import { ILoggerAgent } from '../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { IUiModule } from '../../../Shared/scripts/Interfaces/Agents/IUiModule';
import { IUiVisibilityTestAgent } from '../../../Shared/scripts/Interfaces/Agents/IUiVisibilityTestProctorAgent';
import { IMenuCommandDefinition } from "../../../Shared/scripts/Interfaces/IMenuCommandDefinition";
import { ICommandDefinitionBucket } from "../../../Shared/scripts/Interfaces/IMenuCommandDefinitionBucket";
import { UiHydrationData } from '../../../Shared/scripts/Interfaces/UiHydrationData';
import { TypCommandButtonModule } from '../UiModules/ButtonModules/TypCommandButtonModule';
import { UiVisibilityTestAgent } from './UiManager/UiVisibilityTestAgent';
import { ModuleKey } from '../../../Shared/scripts/Enums/ModuleKey';

export class UiCommandsManager extends LoggableBase {
  private UiModules: IUiModule[] = [];
  private UiVisibilityTestAgent: IUiVisibilityTestAgent;
  private MenuCommandParamsBucket: ICommandDefinitionBucket;

  constructor(logger: ILoggerAgent, menuCommandParamsBucket: ICommandDefinitionBucket, uiVisibilityTestAgent: IUiVisibilityTestAgent) {
    super(logger);

    this.Logger.InstantiateStart(UiCommandsManager.name);
    this.UiVisibilityTestAgent = uiVisibilityTestAgent;
    this.MenuCommandParamsBucket = menuCommandParamsBucket;

    this.Logger.InstantiateEnd(UiCommandsManager.name);
  }

  Init_ButtonStateManager() {
    this.UiVisibilityTestAgent = new UiVisibilityTestAgent(this.Logger);

    this.BuildCommandButtons();
  }

  private BuildCommandButtons() {
    if (this.MenuCommandParamsBucket) {

      this.MenuCommandParamsBucket.MenuCommandParamsAr.forEach((menuCommandParams: IMenuCommandDefinition) => {
        if (menuCommandParams.ModuleKey === ModuleKey.ButtonTypical) {
          let typeButtonModule = new TypCommandButtonModule(this.Logger, menuCommandParams);
          this.UiModules.push(typeButtonModule);
        } else if (menuCommandParams.ModuleKey === ModuleKey.ButtonClose) {
        }
      });
    } else {
      this.Logger.ErrorAndThrow(this.BuildCommandButtons.name, 'no bucket');
    }
    
  }

  HydrateUiModules(refreshData: UiHydrationData): void {
    let currentWindowType: ScWindowType = refreshData.StateOfSitecoreWindow.Meta.WindowType;

    this.UiModules.forEach((uiModule) => uiModule.Hydrate(refreshData));
  }

  RefreshUiModuleVisibilityStatus(): void {
    this.Logger.FuncStart(this.RefreshUiModuleVisibilityStatus.name, this.MenuCommandParamsBucket.MenuCommandParamsAr.length);

    this.UiModules.forEach((oneButtonModule) => oneButtonModule.RefreshUi());

    this.Logger.FuncEnd(this.RefreshUiModuleVisibilityStatus.name);
  }
}