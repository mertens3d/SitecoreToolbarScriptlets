import { scWindowType } from '../../../Shared/scripts/Enums/scWindowType';
import { VisibilityType } from '../../../Shared/scripts/Enums/VisibilityType';
import { ILoggerAgent } from '../../../Shared/scripts/Interfaces/Agents/ILoggerBase';
import { IOneCommand } from '../../../Shared/scripts/Interfaces/IOneCommand';
import { ButtonVisibilityTester } from './UiManager/ButtonVisibilityTests';
import { IGuid } from '../../../Shared/scripts/Interfaces/IGuid';
import { IGuidHelper } from '../../../Shared/scripts/Interfaces/IGuidHelper';
import { IContentState } from "../../../Shared/scripts/Interfaces/IContentState/IContentState";

export class UiButtonStateManager {
  private AllMenuCommands: IOneCommand[];
  private currentContentState: IContentState;
  private currentWindowType: scWindowType;
  private currSelSnapshot: IGuid;
  private guidHelper: IGuidHelper;
  private Logger: ILoggerAgent;
  private Tester: ButtonVisibilityTester;

  constructor(logger: ILoggerAgent) {
    this.Logger = logger;

    this.Logger.FuncStart(UiButtonStateManager.name);
    this.Logger.FuncEnd(UiButtonStateManager.name);
  }

  Init(AllMenuCommands: IOneCommand[]) {
    this.AllMenuCommands = AllMenuCommands;
    this.Tester = new ButtonVisibilityTester();
  }

  private TestAgainstAllSetControllers(command: IOneCommand): boolean {
    let toReturn: boolean = false;

    if (command.VisibilityControllers.length > 0) {
      for (var jdx = 0; jdx < command.VisibilityControllers.length; jdx++) {
        let oneControl: VisibilityType = command.VisibilityControllers[jdx];

        switch (oneControl) {
          case VisibilityType.Desktop:
            toReturn = this.Tester.VisibilityTestWindowType(scWindowType.Desktop, this.currentWindowType)
            break;

          case VisibilityType.ActiveCeNode:
            toReturn = this.Tester.VisibilityTestActiveCeNode(this.currentContentState);
            break;

          case VisibilityType.ContentEditor:
            toReturn = this.Tester.VisibilityTestWindowType(scWindowType.ContentEditor, this.currentWindowType)
            break;

          case VisibilityType.Edit:
            toReturn = this.Tester.VisibilityTestWindowType(scWindowType.Edit, this.currentWindowType)
            break;

          case VisibilityType.Launchpad:
            toReturn = this.Tester.VisibilityTestWindowType(scWindowType.Launchpad, this.currentWindowType)
            break;

          case VisibilityType.LoginPage:
            toReturn = this.Tester.VisibilityTestWindowType(scWindowType.LoginPage, this.currentWindowType)
            break;

          case VisibilityType.Normal:
            toReturn = this.Tester.VisibilityTestWindowType(scWindowType.Normal, this.currentWindowType)
            break;

          case VisibilityType.Preview:
            toReturn = this.Tester.VisibilityTestWindowType(scWindowType.Preview, this.currentWindowType)
            break;
          case VisibilityType.SnapShotable:

            toReturn = this.Tester.VisibilityTestSnapShotable(this.currentContentState);
            break;

          case VisibilityType.SnapShotSelected:

            toReturn = this.Tester.VisibilityTestSnapShotSelected(this.currSelSnapshot, this.guidHelper);
            break;

          case VisibilityType.NotLogin:
            toReturn = !this.Tester.VisibilityTestWindowType(scWindowType.LoginPage, this.currentWindowType)
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

  RefreshUi(currentWindowType: scWindowType, currSelSnapshot: IGuid, guidHelper: IGuidHelper, currentContentState: IContentState): void {
    this.Logger.FuncStart(this.RefreshUi.name, this.AllMenuCommands.length);

    this.currentWindowType = currentWindowType;
    this.currSelSnapshot = currSelSnapshot;
    this.guidHelper = guidHelper;
    this.currentContentState = currentContentState;

    for (var idx = 0; idx < this.AllMenuCommands.length; idx++) {
      var oneCommand = this.AllMenuCommands[idx];

      if (oneCommand.ButtonSelector !== null) {
        //this.Logger.LogVal('working on', MenuCommand[command.Command])
        let passesOneTest: boolean = false;
        var targetButton: HTMLElement = document.querySelector(oneCommand.ButtonSelector);

        if (targetButton) {
          passesOneTest = this.TestAgainstAllSetControllers(oneCommand);
        } else {
          this.Logger.LogAsJsonPretty('oneCommand', oneCommand);
          this.Logger.ErrorAndContinue(this.RefreshUi.name, 'target button not found: ' + oneCommand.ButtonSelector);
        }
        this.SetOneButtonVisibility(targetButton, passesOneTest);
      }
    }
    this.Logger.FuncEnd(this.RefreshUi.name);
  }
}