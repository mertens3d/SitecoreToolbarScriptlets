import { LoggableBase } from '../../../Content/scripts/Managers/LoggableBase';
import { ModuleType } from '../../../Shared/scripts/Enums/ModuleType';
import { ScWindowType } from '../../../Shared/scripts/Enums/scWindowType';
import { GuidData } from '../../../Shared/scripts/Helpers/GuidData';
import { ILoggerAgent } from '../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { IUiModule } from '../../../Shared/scripts/Interfaces/Agents/IUiModule';
import { IUiVisibilityTestAgent } from '../../../Shared/scripts/Interfaces/Agents/IUiVisibilityTestProctorAgent';
import { IDataStateOfSitecoreWindow } from '../../../Shared/scripts/Interfaces/Data/States/IDataStateOfSitecoreWindow';
import { IMenuCommandParams, IMenuCommandParamsBucket } from '../../../Shared/scripts/Interfaces/MenuCommand';
import { TypButtonModule } from '../UiModules/ButtonModules/CommandButtonModule';
import { UiVisibilityTestAgent } from './UiManager/ButtonVisibilityTests';

export class UiStateManager extends LoggableBase {
  private UiModules: IUiModule[] = [];
  private UiVisibilityTestAgent: IUiVisibilityTestAgent;
  private MenuCommandParamsBucket: IMenuCommandParamsBucket;

  constructor(logger: ILoggerAgent, menuCommandParamsBucket: IMenuCommandParamsBucket, uiVisibilityTestAgent: IUiVisibilityTestAgent) {
    super(logger);

    this.Logger.InstantiateStart(UiStateManager.name);

    this.UiVisibilityTestAgent = uiVisibilityTestAgent;
    this.MenuCommandParamsBucket = menuCommandParamsBucket;

    this.Logger.InstantiateEnd(UiStateManager.name);
  }

  InitButtonStateManager() {
    this.UiVisibilityTestAgent = new UiVisibilityTestAgent(this.Logger);

    this.BuildCommandButtons();
  }

  private BuildCommandButtons() {
    if (this.MenuCommandParamsBucket) {

      this.MenuCommandParamsBucket.MenuCommandParamsAr.forEach((menuCommandParams: IMenuCommandParams) => {
        if (menuCommandParams.ModuleType === ModuleType.ButtonTyp) {
          let typeButtonModule = new TypButtonModule(this.Logger, menuCommandParams);
          this.UiModules.push(typeButtonModule);
        } else if (menuCommandParams.ModuleType === ModuleType.ButtonClose) {
        }
      });
    } else {
      this.Logger.ErrorAndThrow(this.BuildCommandButtons.name, 'no bucket');
    }
    
  }

  HydrateUiModules(stateOfSitecoreWindow: IDataStateOfSitecoreWindow, selectSnapShotId: GuidData): void {
    let currentWindowType: ScWindowType = stateOfSitecoreWindow.Meta.WindowType;

    this.UiModules.forEach((uiModule) => uiModule.Hydrate(stateOfSitecoreWindow, currentWindowType, selectSnapShotId));
  }

  RefreshUiModuleVisibilityStatus(): void {
    this.Logger.FuncStart(this.RefreshUiModuleVisibilityStatus.name, this.MenuCommandParamsBucket.MenuCommandParamsAr.length);

    this.UiModules.forEach((oneButtonModule) => oneButtonModule.RefreshUi());

    this.Logger.FuncEnd(this.RefreshUiModuleVisibilityStatus.name);
  }
}