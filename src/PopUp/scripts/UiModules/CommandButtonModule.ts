import { IUiModule } from "../../../Shared/scripts/Interfaces/Agents/IUiModule";
import { LoggableBase } from "../../../Content/scripts/Managers/LoggableBase";
import { IOneCommand } from "../../../Shared/scripts/Interfaces/IOneCommand";
import { IDataStateOfSitecoreWindow } from "../../../Shared/scripts/Interfaces/Data/States/IDataStateOfSitecoreWindow";
import { ButtonVisibilityTester } from "../Managers/UiManager/ButtonVisibilityTests";
import { ScWindowType } from "../../../Shared/scripts/Enums/scWindowType";
import { ILoggerAgent } from "../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { VisibilityType } from "../../../Shared/scripts/Enums/VisibilityType";


export class CommandButtonModule extends LoggableBase implements IUiModule {
  private Command: IOneCommand;
  private StateOfSitecoreWindow: IDataStateOfSitecoreWindow;
  private targetButton: HTMLElement;
  private Tester: ButtonVisibilityTester;
  private CurrentWindowType: ScWindowType;

  constructor(loggerAgent: ILoggerAgent, oneCommand: IOneCommand, tester: ButtonVisibilityTester) {
    super(loggerAgent);
    this.Command = oneCommand;
    this.Tester = tester;
    this.targetButton = document.querySelector(oneCommand.ButtonSelector);
  }

  Init(): void {
  }

  Hydrate(stateOfSitecoreWindow: IDataStateOfSitecoreWindow, currentWindowType: ScWindowType): void {
    this.StateOfSitecoreWindow = stateOfSitecoreWindow;
    this.CurrentWindowType = currentWindowType;
  }

  RefreshUi(): void {
    let passesOneTest: boolean = false;

    if (this.targetButton) {
      passesOneTest = this.TestAgainstAllSetControllers(this.Command);
    } else {
      this.Logger.LogAsJsonPretty('oneCommand', this.Command);
      this.Logger.ErrorAndContinue(this.RefreshUi.name, 'target button not found: ' + this.Command.ButtonSelector);
    }
    this.SetCommandButtonVisibility(this.targetButton, passesOneTest);
  }
  private SetCommandButtonVisibility(targetButton: HTMLElement, passesOneTest: boolean) {
    if (targetButton) {
      if (passesOneTest) {
        targetButton.classList.remove('disabled');
        targetButton.removeAttribute('disabled');
      } else {
        targetButton.classList.add('disabled');
        targetButton.setAttribute('disabled', 'disabled');
      }
    } else {
      this.Logger.ErrorAndContinue(this.SetCommandButtonVisibility.name, 'targetButton is NULL');
    }
  }
  private TestAgainstAllSetControllers(command: IOneCommand): boolean {
    let toReturn: boolean = false;

    if (command.VisibilityControllers.length > 0) {
      for (var jdx = 0; jdx < command.VisibilityControllers.length; jdx++) {
        let oneControl: VisibilityType = command.VisibilityControllers[jdx];

        switch (oneControl) {
          case VisibilityType.Desktop:
            toReturn = this.Tester.VisibilityTestWindowType(ScWindowType.Desktop, this.CurrentWindowType)

            break;

          case VisibilityType.ActiveCeNode:
            toReturn = this.Tester.VisibilityTestActiveCeNode(this.StateOfSitecoreWindow);
            break;

          case VisibilityType.ContentEditor:
            toReturn = this.Tester.VisibilityTestWindowType(ScWindowType.ContentEditor, this.CurrentWindowType)
            break;

          case VisibilityType.Edit:
            toReturn = this.Tester.VisibilityTestWindowType(ScWindowType.Edit, this.CurrentWindowType)
            break;

          case VisibilityType.Launchpad:
            toReturn = this.Tester.VisibilityTestWindowType(ScWindowType.Launchpad, this.CurrentWindowType)
            break;

          case VisibilityType.LoginPage:
            toReturn = this.Tester.VisibilityTestWindowType(ScWindowType.LoginPage, this.CurrentWindowType)
            break;

          case VisibilityType.Normal:
            toReturn = this.Tester.VisibilityTestWindowType(ScWindowType.Normal, this.CurrentWindowType)
            break;

          case VisibilityType.Preview:
            toReturn = this.Tester.VisibilityTestWindowType(ScWindowType.Preview, this.CurrentWindowType)
            break;

          case VisibilityType.SnapShotable:
            toReturn = this.Tester.VisibilityTestSnapShotable(this.StateOfSitecoreWindow);
            break;

          case VisibilityType.SnapShotSelected:
            toReturn = false;//todo put back this.Tester.VisibilityTestSnapShotSelected(this.currSelSnapshot);
            break;

          case VisibilityType.NotLogin:
            toReturn = !this.Tester.VisibilityTestWindowType(ScWindowType.LoginPage, this.CurrentWindowType)
            break;

          case VisibilityType.CommandIsRunning:
            toReturn = false; //todo
            break;

          case VisibilityType.Unknown:
            this.Logger.ErrorAndThrow(this.TestAgainstAllSetControllers.name, 'unknown visibility type');
            break;

          default:
            this.Logger.ErrorAndThrow(this.TestAgainstAllSetControllers.name, 'unknown visibility type');
            break;
        }

        if (toReturn) {
          break;
        }
      }
    }
    else {
      toReturn = true;
    }

    return toReturn;
  }
}