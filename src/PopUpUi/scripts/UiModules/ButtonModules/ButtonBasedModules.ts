import { LoggableBase } from "../../../../Shared/scripts/LoggableBase";
import { MenuCommandKey } from "../../../../Shared/scripts/Enums/2xxx-MenuCommand";
import { ModuleKey } from "../../../../Shared/scripts/Enums/ModuleKey";
import { ILoggerAgent } from "../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IUiModule } from "../../../../Shared/scripts/Interfaces/Agents/IUiModule";
import { IMenuCommandDefinition } from "../../../../Shared/scripts/Interfaces/IMenuCommandDefinition";
import { ICommandDefinitionBucket } from "../../../../Shared/scripts/Interfaces/IMenuCommandDefinitionBucket";
import { SelectSnapshotModule } from "../SelectSnapshotModule/SelectSnapshotModule";
import { CancelButtonModule } from "./CancelButtonModule";
import { CloseButtonModule } from "./CloseButtonModule";
import { InputWithButtonModule } from "./InputWithButtonModule";
import { TypCommandButtonModule } from "./TypCommandButtonModule";

export class ButtonBasedModulesBucket extends LoggableBase {
  AllButtonBasedModules: IUiModule[] = [];
  SelectSnapShotModule: SelectSnapshotModule;
  CommandDefinitionBucket: ICommandDefinitionBucket;

  constructor(logger: ILoggerAgent, commandMan: ICommandDefinitionBucket) {
    super(logger);
    this.Logger.CTORStart(ButtonBasedModulesBucket.name);
    this.CommandDefinitionBucket = commandMan;

    this.InstantiateButtonBasedModules();
    this.Logger.CTOREnd(ButtonBasedModulesBucket.name);
  }

  private InstantiateButtonBasedModules() {
    this.Logger.FuncStart(this.InstantiateButtonBasedModules.name);
    this.PopulateMenuButtons();

    try {
    } catch (err) {
      this.Logger.ErrorAndThrow(this.InstantiateButtonBasedModules.name, err);
    }
    this.Logger.FuncEnd(this.InstantiateButtonBasedModules.name);
  }

  public PopulateMenuButtons() {
    this.Logger.FuncStart(this.PopulateMenuButtons.name);

    if (this.CommandDefinitionBucket && this.CommandDefinitionBucket.MenuCommandParamsAr) {
      this.CommandDefinitionBucket.MenuCommandParamsAr.forEach((menuCommandParams: IMenuCommandDefinition) => {
        if (menuCommandParams.PlaceHolderSelector && menuCommandParams.PlaceHolderSelector.length > 0) {
          if (menuCommandParams.ModuleKey == ModuleKey.ButtonTypical) {
            this.AllButtonBasedModules.push(<IUiModule>new TypCommandButtonModule(this.Logger, menuCommandParams));
          } else if (menuCommandParams.ModuleKey == ModuleKey.ButtonWithInput) {
            this.AllButtonBasedModules.push(new InputWithButtonModule(this.Logger, menuCommandParams));
          } else if (menuCommandParams.ModuleKey == ModuleKey.ButtonClose) {
            this.AllButtonBasedModules.push(new CloseButtonModule(this.Logger, menuCommandParams));
          } else if (menuCommandParams.ModuleKey == ModuleKey.ButtonCancel) {
            this.AllButtonBasedModules.push(new CancelButtonModule(this.Logger, menuCommandParams));
          }
        } else {
          this.Logger.Log('No ui for this command: ' + MenuCommandKey[menuCommandParams.MenuCommandKey]);
        }
      })
    } else {
      this.Logger.ErrorAndThrow(this.PopulateMenuButtons.name, 'no bucket or no array inside');
    }

    this.Logger.FuncEnd(this.PopulateMenuButtons.name);
  }
}