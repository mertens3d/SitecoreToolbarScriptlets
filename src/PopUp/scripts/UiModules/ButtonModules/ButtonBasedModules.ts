import { LoggableBase } from "../../../../Content/scripts/Managers/LoggableBase";
import { MenuCommandKey } from "../../../../Shared/scripts/Enums/2xxx-MenuCommand";
import { ModuleKey } from "../../../../Shared/scripts/Enums/ModuleKey";
import { ILoggerAgent } from "../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IMenuCommandDefinition } from "../../../../Shared/scripts/Interfaces/IMenuCommandDefinition";
import { CommandManager } from "../../Classes/AllCommands";
import { SelectSnapshotModule } from "../SelectSnapshotModule/SelectSnapshotModule";
import { CancelButtonModule } from "./CancelButtonModule";
import { CloseButtonModule } from "./CloseButtonModule";
import { InputWithButtonModule } from "./InputButtonModule";
import { TypButtonModule } from "./TypButtonModule";
import { _baseButtonModule } from "./_baseButtonModule";
import { IUiModule } from "../../../../Shared/scripts/Interfaces/Agents/IUiModule";

export class ButtonBasedModules extends LoggableBase {
  AllButtonBasedModules: IUiModule[] = [];

  SelectSnapShotModule: SelectSnapshotModule;
    CommandMan: CommandManager;

  constructor(logger: ILoggerAgent, commandMan: CommandManager) {
    super(logger);
    this.Logger.InstantiateStart(ButtonBasedModules.name);
    this.CommandMan = commandMan;

    this.InstantiateButtonBasedModules();
    this.Logger.InstantiateEnd(ButtonBasedModules.name);
    
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

    if (this.CommandMan.MenuCommandParamsBucket && this.CommandMan.MenuCommandParamsBucket.MenuCommandParamsAr) {
      this.CommandMan.MenuCommandParamsBucket.MenuCommandParamsAr.forEach((menuCommandParams: IMenuCommandDefinition) => {
        if (menuCommandParams.PlaceHolderSelector && menuCommandParams.PlaceHolderSelector.length > 0) {
          if (menuCommandParams.ModuleKey == ModuleKey.ButtonTypical) {
            this.AllButtonBasedModules.push(<IUiModule>new TypButtonModule(this.Logger, menuCommandParams));
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