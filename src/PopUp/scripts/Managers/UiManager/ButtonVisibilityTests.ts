import { LoggableBase } from "../../../../Content/scripts/Managers/LoggableBase";
import { StaticHelpers } from "../../../../Shared/scripts/Classes/StaticHelpers";
import { ScWindowType } from "../../../../Shared/scripts/Enums/scWindowType";
import { GuidData } from "../../../../Shared/scripts/Helpers/GuidData";
import { ILoggerAgent } from "../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IUiVisibilityTestAgent } from "../../../../Shared/scripts/Interfaces/Agents/IUiVisibilityTestProctorAgent";
import { VisiblityTestResult } from "../../../../Shared/scripts/Interfaces/Agents/VisiblityTestResult";
import { IDataStateOfSitecoreWindow } from "../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfSitecoreWindow";
import { StateHelpers } from "../../Classes/StateHelpers";
import { VisiblityTestResults } from "../../../../Shared/scripts/Interfaces/Agents/IUiVisiblityTestResult";
import { VisibilityType } from "../../../../Shared/scripts/Enums/VisibilityType";
import { IMenuCommandParams } from "../../../../Shared/scripts/Interfaces/MenuCommand";
import { ScUrlAgent } from "../../../../Shared/scripts/Agents/Agents/UrlAgent/ScUrlAgent";
import { IDataStateOfStorageSnapShots } from "../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfStorageSnapShots";

export class UiVisibilityTestAgent extends LoggableBase implements IUiVisibilityTestAgent {
  private StateHelpers: StateHelpers;
  private scUrlAgent: ScUrlAgent;
  private StateOfSitecoreWindow: any;
  private SelectedSnapshot: GuidData = null;

  constructor(logger: ILoggerAgent) {
    super(logger);
    this.StateHelpers = new StateHelpers(this.Logger);
  }

  Prime(scUrlAgent: ScUrlAgent, stateOfSitecoreWindow: IDataStateOfSitecoreWindow, stateOfStorageSnapShots: IDataStateOfStorageSnapShots) {
    this.StateOfSitecoreWindow = stateOfSitecoreWindow;
    this.scUrlAgent = scUrlAgent;
  }

  VisibilityTestWindowType(windowType: ScWindowType, currentWindowType: ScWindowType): VisiblityTestResult {
    let OneResult = new VisiblityTestResult(this.VisibilityTestWindowType.name);

    OneResult.Passes = windowType === currentWindowType;

    if (!OneResult.Passes) {
      OneResult.FriendlyFailReason = 'Window types did not match: ' + StaticHelpers.ScWindowTypeFriendly(windowType) + ' vs ' + StaticHelpers.ScWindowTypeFriendly(currentWindowType);
    }

    return OneResult;
  }

  VisibilityTestSnapShotSelected(currSelSnapshot: GuidData): VisiblityTestResult {
    let OneResult = new VisiblityTestResult(this.VisibilityTestSnapShotSelected.name);

    OneResult.Passes = currSelSnapshot && currSelSnapshot.AsBracedGuid() !== GuidData.GetEmptyGuid().AsBracedGuid();

    if (!OneResult.Passes) {
      OneResult.FriendlyFailReason = "No snapshot selected";
    }

    return OneResult;
  }

  VisibilityTestSnapShotable(stateOfSitecoreWindow: IDataStateOfSitecoreWindow): VisiblityTestResult {
    //todo may want to be able take snap shots of other window types

    return this.VisibilityTestDesktopOrContentEditor(stateOfSitecoreWindow) && this.VisibilityTestIfDesktopMinOneConentEditorOpen(stateOfSitecoreWindow);
  }

  VisibilityTestIfDesktopMinOneConentEditorOpen(stateOfSitecoreWindow: IDataStateOfSitecoreWindow): VisiblityTestResult {
    let visiblityTestResult: VisiblityTestResult = new VisiblityTestResult(this.VisibilityTestIfDesktopMinOneConentEditorOpen.name);

    visiblityTestResult.Passes = (
      (stateOfSitecoreWindow.Meta.WindowType === ScWindowType.Desktop && stateOfSitecoreWindow.ScWindowStates.StateOfDesktop.IndexOfActiveFrame > -1)
      ||
      (stateOfSitecoreWindow.Meta.WindowType !== ScWindowType.Desktop));

    if (!visiblityTestResult.Passes) {
      visiblityTestResult.FriendlyFailReason = 'Requires an open Content Editor';
    }

    return visiblityTestResult;
  }

  VisibilityTestDesktopOrContentEditor(stateOfSitecoreWindow: IDataStateOfSitecoreWindow): VisiblityTestResult {
    let visiblityTestResult: VisiblityTestResult = new VisiblityTestResult(this.VisibilityTestDesktopOrContentEditor.name);

    visiblityTestResult.Passes = (stateOfSitecoreWindow.Meta.WindowType === ScWindowType.ContentEditor
      ||
      stateOfSitecoreWindow.Meta.WindowType === ScWindowType.Desktop);

    if (!visiblityTestResult.Passes) {
      visiblityTestResult.FriendlyFailReason = 'Requires Content Editor or Desktop';
    }
    return visiblityTestResult;
  }

  TestAgainstAllSetControllers(Command: IMenuCommandParams): VisiblityTestResults {
    let allResults: VisiblityTestResults = new VisiblityTestResults();

    if (Command.VisibilityControllers.length > 0) {
      for (var jdx = 0; jdx < Command.VisibilityControllers.length; jdx++) {
        let oneControl: VisibilityType = Command.VisibilityControllers[jdx];

        switch (oneControl) {
          case VisibilityType.Desktop:
            allResults.TestResults.push(this.VisibilityTestWindowType(ScWindowType.Desktop, this.scUrlAgent.GetScWindowType()))

            break;

          case VisibilityType.DesktopOrContentEditor:
            allResults.TestResults.push(this.VisibilityTestDesktopOrContentEditor(this.StateOfSitecoreWindow));
            break;

          case VisibilityType.IfDesktopMin1ContentEditor:
            allResults.TestResults.push(this.VisibilityTestIfDesktopMinOneConentEditorOpen(this.StateOfSitecoreWindow));
            break;

          case VisibilityType.ContentEditor:
            allResults.TestResults.push(this.VisibilityTestWindowType(ScWindowType.ContentEditor, this.scUrlAgent.GetScWindowType()));
            break;

          case VisibilityType.Edit:
            allResults.TestResults.push(this.VisibilityTestWindowType(ScWindowType.Edit, this.scUrlAgent.GetScWindowType()));
            break;

          case VisibilityType.Launchpad:
            allResults.TestResults.push(this.VisibilityTestWindowType(ScWindowType.Launchpad, this.scUrlAgent.GetScWindowType()));
            break;

          case VisibilityType.LoginPage:
            allResults.TestResults.push(this.VisibilityTestWindowType(ScWindowType.LoginPage, this.scUrlAgent.GetScWindowType()));
            break;

          case VisibilityType.Normal:
            allResults.TestResults.push(this.VisibilityTestWindowType(ScWindowType.Normal, this.scUrlAgent.GetScWindowType()));
            break;

          case VisibilityType.Preview:
            allResults.TestResults.push(this.VisibilityTestWindowType(ScWindowType.Preview, this.scUrlAgent.GetScWindowType()));
            break;

          case VisibilityType.SnapShotable:
            allResults.TestResults.push(this.VisibilityTestSnapShotable(this.StateOfSitecoreWindow));
            break;

          case VisibilityType.SnapShotSelected:
            allResults.TestResults.push(this.VisibilityTestSnapShotSelected(this.SelectedSnapshot));
            break;

          case VisibilityType.NotLogin:
            // tod o toReturnAgraget.TestResults.push(!  this.VisibilityTestWindowType(ScWindowType.LoginPage, this.CurrentWindowType));
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