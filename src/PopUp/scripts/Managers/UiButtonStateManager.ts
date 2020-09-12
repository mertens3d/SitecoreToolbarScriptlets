import { LoggableBase } from '../../../Content/scripts/Managers/LoggableBase';
import { ScWindowType } from '../../../Shared/scripts/Enums/scWindowType';
import { ILoggerAgent } from '../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { IDataStateOfSitecoreWindow } from "../../../Shared/scripts/Interfaces/Data/States/IDataStateOfSitecoreWindow";
import { IOneCommand } from '../../../Shared/scripts/Interfaces/IOneCommand';
import { ButtonVisibilityTester } from './UiManager/ButtonVisibilityTests';
import { CommandButtonModule } from '../UiModules/CommandButtonModule';

export class UiStateManager extends LoggableBase {
  private AllMenuCommands: IOneCommand[];
  private AllMenuCommandButtons: CommandButtonModule[] = [];
    Tester: ButtonVisibilityTester;

  constructor(logger: ILoggerAgent, allMenuCommands: IOneCommand[]) {
    super(logger);

    this.Logger.InstantiateStart(UiStateManager.name);
    this.AllMenuCommands = allMenuCommands;//: IOneCommand[]
    this.Logger.InstantiateEnd(UiStateManager.name);
  }

  InitButtonStateManager() {
    this.Tester = new ButtonVisibilityTester(this.Logger);

    this.BuildCommandButtons();
  }
  private BuildCommandButtons() {
    this.AllMenuCommands.forEach((oneCommand) => {
      let newButtonCommandModule = new CommandButtonModule(this.Logger, oneCommand, this.Tester);
      this.AllMenuCommandButtons.push(newButtonCommandModule);
    });
  }

  HydrateUiButtonState(stateOfSitecoreWindow: IDataStateOfSitecoreWindow): void {
    let currentWindowType: ScWindowType = stateOfSitecoreWindow.Meta.WindowType;

    this.AllMenuCommandButtons.forEach((commandButton) => commandButton.Hydrate(stateOfSitecoreWindow, currentWindowType));

  }

  RefreshUiButtonVisibilityStatus(): void {
    this.Logger.FuncStart(this.RefreshUiButtonVisibilityStatus.name, this.AllMenuCommands.length);

    this.AllMenuCommandButtons.forEach((oneButtonModule) => oneButtonModule.RefreshUi());

    this.Logger.FuncEnd(this.RefreshUiButtonVisibilityStatus.name);
  }
}