import { ScWindowType } from '../../../Shared/scripts/Enums/5000 - scWindowType';
import { IHindeCore } from "../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { IUiModule } from '../../../Shared/scripts/Interfaces/Agents/IUiModule';
import { IUiVisibilityTestAgent } from '../../../Shared/scripts/Interfaces/Agents/IUiVisibilityTestProctorAgent';
import { IMenuCommandDefinition } from "../../../Shared/scripts/Interfaces/IMenuCommandDefinition";
import { ICommandDefinitionBucket } from "../../../Shared/scripts/Interfaces/IMenuCommandDefinitionBucket";
import { UiHydrationData } from '../../../Shared/scripts/Interfaces/UiHydrationData';
import { TypCommandButtonModule } from '../UiModules/ButtonModules/TypCommandButtonModule';
import { UiVisibilityTestAgent } from './UiManager/UiVisibilityTestAgent';
import { ModuleKey } from '../../../Shared/scripts/Enums/ModuleKey';
import { _HindeCoreBase } from "../../../Shared/scripts/_HindeCoreBase";

export class UiCommandsManager extends _HindeCoreBase {
  private UiModules: IUiModule[] = [];
  private UiVisibilityTestAgent: IUiVisibilityTestAgent;
  private MenuCommandParamsBucket: ICommandDefinitionBucket;

  constructor(hindeCore: IHindeCore, menuCommandParamsBucket: ICommandDefinitionBucket, uiVisibilityTestAgent: IUiVisibilityTestAgent) {
    super(hindeCore);

    //this.Logger.CTORStart(UiCommandsManager.name);
    //this.UiVisibilityTestAgent = uiVisibilityTestAgent;
    //this.MenuCommandParamsBucket = menuCommandParamsBucket;

    this.Logger.CTOREnd(UiCommandsManager.name);
  }

  Init_ButtonStateManager() {
    //this.UiVisibilityTestAgent = new UiVisibilityTestAgent(this.HindeCore);

    //this.BuildCommandButtons();
  }

  private BuildCommandButtons() {
    //if (this.MenuCommandParamsBucket) {

    //  this.MenuCommandParamsBucket.MenuCommandParamsAr.forEach((menuCommandParams: IMenuCommandDefinition) => {
    //    if (menuCommandParams.ModuleKey === ModuleKey.ButtonTypical) {
    //      let typeButtonModule = new TypCommandButtonModule(this.HindeCore, menuCommandParams);
    //      this.UiModules.push(typeButtonModule);
    //    } else if (menuCommandParams.ModuleKey === ModuleKey.ButtonClose) {
    //    }
    //  });
    //} else {
    //  this.ErrorHand.ErrorAndThrow(this.BuildCommandButtons.name, 'no bucket');
    //}
    
  }

  HydrateUi_UICommandManager(refreshData: UiHydrationData): void {
    //this.UiModules.forEach((uiModule) => uiModule.Hydrate(refreshData));
  }

  RefreshUiModuleVisibilityStatus(): void {
    //this.Logger.FuncStart(this.RefreshUiModuleVisibilityStatus.name, this.MenuCommandParamsBucket.MenuCommandParamsAr.length);

    ////this.UiModules.forEach((oneButtonModule) => oneButtonModule.RefreshUi_Module());

    //this.Logger.FuncEnd(this.RefreshUiModuleVisibilityStatus.name);
  }
}