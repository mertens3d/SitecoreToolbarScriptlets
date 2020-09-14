import { LoggableBase } from "../../../Content/scripts/Managers/LoggableBase";
import { ScWindowType } from "../../../Shared/scripts/Enums/scWindowType";
import { VisibilityType } from "../../../Shared/scripts/Enums/VisibilityType";
import { GuidData } from "../../../Shared/scripts/Helpers/GuidData";
import { ILoggerAgent } from "../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IUiModule } from "../../../Shared/scripts/Interfaces/Agents/IUiModule";
import { IDataStateOfSitecoreWindow } from "../../../Shared/scripts/Interfaces/Data/States/IDataStateOfSitecoreWindow";
import { IOneCommand } from "../../../Shared/scripts/Interfaces/IOneCommand";
import { ButtonVisibilityTester } from "../Managers/UiManager/ButtonVisibilityTests";
import { VisiblityTestResults } from "../../../Shared/scripts/Interfaces/Agents/IUiVisiblityTestResult";
import { MenuCommand } from "../../../Shared/scripts/Enums/2xxx-MenuCommand";
import { ModuleType } from "../../../Shared/scripts/Interfaces/CommandButtonEvents";

export class CommandButtonModule extends LoggableBase implements IUiModule {
  private Command: IOneCommand;
  private CurrentWindowType: ScWindowType;
  private ElemButton: HTMLButtonElement;
  private ElemButtonBackText: HTMLDivElement;
  private PlaceHolderUiElem: HTMLElement;
  private SelectedSnapshot: GuidData;
  private StateOfSitecoreWindow: IDataStateOfSitecoreWindow;
  private Tester: ButtonVisibilityTester;
  ElemDivBtnOverlay: HTMLDivElement;

  constructor(loggerAgent: ILoggerAgent, oneCommand: IOneCommand, tester: ButtonVisibilityTester) {
    super(loggerAgent);
    this.Command = oneCommand;
    this.Tester = tester;

    if (this.Command.PlaceHolderSelector && this.Command.PlaceHolderSelector.length > 0) {
      this.PlaceHolderUiElem = document.querySelector(oneCommand.PlaceHolderSelector);
      if (this.Command.ModuleType === ModuleType.Button) {
        this.BuildModuleButton();
      }
    }
  }

  Init(): void {
  }

  private BuildButtonOverlayBackFill() {
    let divElem = document.createElement("div");
    divElem.classList.add("back-fill");
    return divElem;
  }

  private BuildButtonTextContainer() {
    this.ElemButtonBackText = document.createElement("div");
    this.ElemButtonBackText.classList.add("back-text");
    this.ElemButtonBackText.innerText = 'here is why it is disabled';
    return this.ElemButtonBackText;
  }

  private BuildButtonOverlay(): void {
    this.ElemDivBtnOverlay = document.createElement("div");
    this.ElemDivBtnOverlay.classList.add("btn-overlay");

    let backFill = this.BuildButtonOverlayBackFill();
    this.BuildButtonTextContainer();
    this.ElemDivBtnOverlay.appendChild(backFill);
    this.ElemDivBtnOverlay.appendChild(this.ElemButtonBackText);
  }
  private BuildButtonElem(): void {
    //<div id='PresentationDetails' type = 'button' class="button-wrapper icon details" > Presentation Details < /div>
    this.ElemButton = document.createElement("button");
    this.ElemButton.classList.add("icon");
    this.ElemButton.classList.add(this.Command.IconClassName);
    this.ElemButton.innerText = this.Command.InnerText;
    this.ElemButton.type = "button";
  }

  BuildModuleButton(): void {
    this.Logger.FuncStart(this.BuildModuleButton.name, this.Command.InnerText + ' ' + MenuCommand[this.Command.Command]);
    if (this.PlaceHolderUiElem) {
      this.BuildButtonElem();

      this.BuildButtonOverlay();

      this.PlaceHolderUiElem.classList.add('btn-container');

      this.PlaceHolderUiElem.appendChild(this.ElemDivBtnOverlay);
      this.PlaceHolderUiElem.appendChild(this.ElemButton);
    } else {
      this.Logger.ErrorAndContinue(CommandButtonModule.name, 'Could not find ' + this.Command.PlaceHolderSelector);
    }
    this.Logger.FuncEnd(this.BuildModuleButton.name);
  }

  Hydrate(stateOfSitecoreWindow: IDataStateOfSitecoreWindow, currentWindowType: ScWindowType, selectedSnapshot: GuidData): void {
    this.StateOfSitecoreWindow = stateOfSitecoreWindow;
    this.CurrentWindowType = currentWindowType;
    this.SelectedSnapshot = selectedSnapshot;
  }

  RefreshUi(): void {
    if (this.PlaceHolderUiElem) {
      let allresults: VisiblityTestResults = this.TestAgainstAllSetControllers();

      this.SetCommandButtonVisibility(allresults);
    }
  }

  private SetCommandButtonVisibility(allresults: VisiblityTestResults) {
    if (allresults && this.ElemButton) {
      if (!allresults.HasFailures()) {
        this.ElemButton.classList.remove('disabled');
        this.ElemButton.removeAttribute('disabled');

        if (this.ElemDivBtnOverlay) {
          this.ElemDivBtnOverlay.style.display = 'none';
        }
      } else {
        this.ElemButton.classList.add('disabled');
        this.ElemButton.setAttribute('disabled', 'disabled');

        if (this.ElemDivBtnOverlay) {
          this.ElemDivBtnOverlay.style.display = 'block';
        }

        if (this.ElemButtonBackText) {
          this.ElemButtonBackText.innerText = allresults.GetFriendlyFails();
        }
      }
    } else {
      this.Logger.ErrorAndContinue(this.SetCommandButtonVisibility.name, 'targetButton is NULL');
    }
  }
  //private EnrollInEvents(): boolean {
  //  let toReturn: boolean = false;

  //  if (this.Command.VisibilityControllers.length > 0) {
  //    for (var jdx = 0; jdx < this.Command.VisibilityControllers.length; jdx++) {
  //      let oneControl: VisibilityType = this.Command.VisibilityControllers[jdx];

  //      switch (oneControl) {
  //        case VisibilityType.Desktop:
  //          toReturn = this.Tester.VisibilityTestWindowType(ScWindowType.Desktop, this.CurrentWindowType)

  //          break;

  //        case VisibilityType.ActiveCeNode:
  //          toReturn = this.Tester.VisibilityTestActiveCeNode(this.StateOfSitecoreWindow);
  //          break;

  //        case VisibilityType.ContentEditor:
  //          toReturn = this.Tester.VisibilityTestWindowType(ScWindowType.ContentEditor, this.CurrentWindowType)
  //          break;

  //        case VisibilityType.Edit:
  //          toReturn = this.Tester.VisibilityTestWindowType(ScWindowType.Edit, this.CurrentWindowType)
  //          break;

  //        case VisibilityType.Launchpad:
  //          toReturn = this.Tester.VisibilityTestWindowType(ScWindowType.Launchpad, this.CurrentWindowType)
  //          break;

  //        case VisibilityType.LoginPage:
  //          toReturn = this.Tester.VisibilityTestWindowType(ScWindowType.LoginPage, this.CurrentWindowType)
  //          break;

  //        case VisibilityType.Normal:
  //          toReturn = this.Tester.VisibilityTestWindowType(ScWindowType.Normal, this.CurrentWindowType)
  //          break;

  //        case VisibilityType.Preview:
  //          toReturn = this.Tester.VisibilityTestWindowType(ScWindowType.Preview, this.CurrentWindowType)
  //          break;

  //        case VisibilityType.SnapShotable:
  //          this.EventManager.SelectionChangedEvent_Subject
  //            toReturn = this.Tester.VisibilityTestSnapShotable(this.StateOfSitecoreWindow);
  //          break;

  //        case VisibilityType.SnapShotSelected:
  //          toReturn = true;//todo put back this.Tester.VisibilityTestSnapShotSelected(this.currSelSnapshot);
  //          break;

  //        case VisibilityType.NotLogin:
  //          toReturn = !this.Tester.VisibilityTestWindowType(ScWindowType.LoginPage, this.CurrentWindowType)
  //          break;

  //        case VisibilityType.CommandIsRunning:
  //          toReturn = false; //todo
  //          break;

  //        case VisibilityType.Unknown:
  //          this.Logger.ErrorAndThrow(this.TestAgainstAllSetControllers.name, 'unknown visibility type');
  //          break;

  //        default:
  //          this.Logger.ErrorAndThrow(this.TestAgainstAllSetControllers.name, 'unknown visibility type');
  //          break;
  //      }

  //      if (toReturn) {
  //        break;
  //      }
  //    }
  //  }
  //  else {
  //    toReturn = true;
  //  }

  //  return toReturn;
  //}
  private TestAgainstAllSetControllers(): VisiblityTestResults {
    let allResults: VisiblityTestResults = new VisiblityTestResults();

    if (this.Command.VisibilityControllers.length > 0) {
      for (var jdx = 0; jdx < this.Command.VisibilityControllers.length; jdx++) {
        let oneControl: VisibilityType = this.Command.VisibilityControllers[jdx];

        switch (oneControl) {
          case VisibilityType.Desktop:
            allResults.TestResults.push(this.Tester.VisibilityTestWindowType(ScWindowType.Desktop, this.CurrentWindowType))

            break;

          case VisibilityType.ActiveCeNode:
            allResults.TestResults.push(this.Tester.VisibilityTestActiveCeNode(this.StateOfSitecoreWindow));
            break;

          case VisibilityType.ContentEditor:
            allResults.TestResults.push(this.Tester.VisibilityTestWindowType(ScWindowType.ContentEditor, this.CurrentWindowType));
            break;

          case VisibilityType.Edit:
            allResults.TestResults.push(this.Tester.VisibilityTestWindowType(ScWindowType.Edit, this.CurrentWindowType));
            break;

          case VisibilityType.Launchpad:
            allResults.TestResults.push(this.Tester.VisibilityTestWindowType(ScWindowType.Launchpad, this.CurrentWindowType));
            break;

          case VisibilityType.LoginPage:
            allResults.TestResults.push(this.Tester.VisibilityTestWindowType(ScWindowType.LoginPage, this.CurrentWindowType));
            break;

          case VisibilityType.Normal:
            allResults.TestResults.push(this.Tester.VisibilityTestWindowType(ScWindowType.Normal, this.CurrentWindowType));
            break;

          case VisibilityType.Preview:
            allResults.TestResults.push(this.Tester.VisibilityTestWindowType(ScWindowType.Preview, this.CurrentWindowType));
            break;

          case VisibilityType.SnapShotable:
            allResults.TestResults.push(this.Tester.VisibilityTestSnapShotable(this.StateOfSitecoreWindow));
            break;

          case VisibilityType.SnapShotSelected:
            allResults.TestResults.push(this.Tester.VisibilityTestSnapShotSelected(this.SelectedSnapshot));
            break;

          case VisibilityType.NotLogin:
            // tod o toReturnAgraget.TestResults.push(!  this.Tester.VisibilityTestWindowType(ScWindowType.LoginPage, this.CurrentWindowType));
            break;

          case VisibilityType.CommandIsRunning:
            //todo toReturnAgraget.TestResults.push( false; //todo
            break;

          case VisibilityType.Unknown:
            this.Logger.ErrorAndThrow(this.TestAgainstAllSetControllers.name, 'unknown visibility type');
            break;

          default:
            this.Logger.ErrorAndThrow(this.TestAgainstAllSetControllers.name, 'unknown visibility type');
            break;
        }

        if (allResults.HasFailures()) {
          break;
        }
      }
    }

    return allResults;
  }
}