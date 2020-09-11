import { ScWindowType } from '../../../Shared/scripts/Enums/scWindowType';
import { VisibilityType } from '../../../Shared/scripts/Enums/VisibilityType';
import { ILoggerAgent } from '../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { IOneCommand } from '../../../Shared/scripts/Interfaces/IOneCommand';
import { ButtonVisibilityTester } from './UiManager/ButtonVisibilityTests';
import { IContentReplyPayload } from "../../../Shared/scripts/Interfaces/Data/IContentState";
import { GuidData } from '../../../Shared/scripts/Helpers/GuidData';
import { LoggableBase } from '../../../Content/scripts/Managers/LoggableBase';

export class UiButtonStateManager extends LoggableBase {
  private currentContentState: IContentReplyPayload;
  private currentWindowType: ScWindowType;
  private currSelSnapshot: GuidData;
  private Tester: ButtonVisibilityTester;

  constructor(logger: ILoggerAgent) {
    super(logger);

    this.Logger.InstantiateStart(UiButtonStateManager.name);
    this.Logger.InstantiateEnd(UiButtonStateManager.name);
  }

  InitButtonStateManager() {
    this.Tester = new ButtonVisibilityTester(this.Logger);
  }

  private TestAgainstAllSetControllers(command: IOneCommand): boolean {
    let toReturn: boolean = false;

    if (command.VisibilityControllers.length > 0) {
      for (var jdx = 0; jdx < command.VisibilityControllers.length; jdx++) {
        let oneControl: VisibilityType = command.VisibilityControllers[jdx];

        switch (oneControl) {
          case VisibilityType.Desktop:
            toReturn = this.Tester.VisibilityTestWindowType(ScWindowType.Desktop, this.currentWindowType)

            break;

          case VisibilityType.ActiveCeNode:
            toReturn = this.Tester.VisibilityTestActiveCeNode(this.currentContentState);
            break;

          case VisibilityType.ContentEditor:
            toReturn = this.Tester.VisibilityTestWindowType(ScWindowType.ContentEditor, this.currentWindowType)
            break;

          case VisibilityType.Edit:
            toReturn = this.Tester.VisibilityTestWindowType(ScWindowType.Edit, this.currentWindowType)
            break;

          case VisibilityType.Launchpad:
            toReturn = this.Tester.VisibilityTestWindowType(ScWindowType.Launchpad, this.currentWindowType)
            break;

          case VisibilityType.LoginPage:
            toReturn = this.Tester.VisibilityTestWindowType(ScWindowType.LoginPage, this.currentWindowType)
            break;

          case VisibilityType.Normal:
            toReturn = this.Tester.VisibilityTestWindowType(ScWindowType.Normal, this.currentWindowType)
            break;

          case VisibilityType.Preview:
            toReturn = this.Tester.VisibilityTestWindowType(ScWindowType.Preview, this.currentWindowType)
            break;

          case VisibilityType.SnapShotable:
            toReturn = this.Tester.VisibilityTestSnapShotable(this.currentContentState);
            break;

          case VisibilityType.SnapShotSelected:
            toReturn = this.Tester.VisibilityTestSnapShotSelected(this.currSelSnapshot);
            break;

          case VisibilityType.NotLogin:
            toReturn = !this.Tester.VisibilityTestWindowType(ScWindowType.LoginPage, this.currentWindowType)
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

  private SetOneButtonVisibility(targetButton: HTMLElement, passesOneTest: boolean) {
    if (targetButton) {
      if (passesOneTest) {
        targetButton.classList.remove('disabled');
        targetButton.removeAttribute('disabled');
      } else {
        targetButton.classList.add('disabled');
        targetButton.setAttribute('disabled', 'disabled');
      }
    } else {
      this.Logger.ErrorAndContinue(this.SetOneButtonVisibility.name, 'targetButton is NULL');
    }
  }

  RefreshUiButtonState(currentWindowType: ScWindowType, currSelSnapshot: GuidData, contentState: IContentReplyPayload, allMenuCommands: IOneCommand[]): void {
    this.Logger.FuncStart(this.RefreshUiButtonState.name, allMenuCommands.length);

    this.currentWindowType = currentWindowType;
    this.currSelSnapshot = currSelSnapshot;
    this.currentContentState = contentState;

    for (var idx = 0; idx < allMenuCommands.length; idx++) {
      var oneCommand = allMenuCommands[idx];

      if (oneCommand.ButtonSelector !== null) {
        let passesOneTest: boolean = false;
        var targetButton: HTMLElement = document.querySelector(oneCommand.ButtonSelector);

        if (targetButton) {
          passesOneTest = this.TestAgainstAllSetControllers(oneCommand);
        } else {
          this.Logger.LogAsJsonPretty('oneCommand', oneCommand);
          this.Logger.ErrorAndContinue(this.RefreshUiButtonState.name, 'target button not found: ' + oneCommand.ButtonSelector);
        }
        this.SetOneButtonVisibility(targetButton, passesOneTest);
      }
    }

    this.Logger.FuncEnd(this.RefreshUiButtonState.name);
  }
}