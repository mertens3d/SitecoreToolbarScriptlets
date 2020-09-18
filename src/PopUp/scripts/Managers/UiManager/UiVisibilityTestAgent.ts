import { LoggableBase } from "../../../../Content/scripts/Managers/LoggableBase";
import { StaticHelpers } from "../../../../Shared/scripts/Classes/StaticHelpers";
import { ScWindowType } from "../../../../Shared/scripts/Enums/scWindowType";
import { VisibilityType } from "../../../../Shared/scripts/Enums/VisibilityType";
import { GuidData } from "../../../../Shared/scripts/Helpers/GuidData";
import { ILoggerAgent } from "../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IUiVisibilityTestAgent } from "../../../../Shared/scripts/Interfaces/Agents/IUiVisibilityTestProctorAgent";
import { VisiblityTestResultsBucket } from "../../../../Shared/scripts/Interfaces/Agents/IUiVisiblityTestResult";
import { VisiblityTestResult } from "../../../../Shared/scripts/Interfaces/Agents/VisiblityTestResult";
import { IDataStateOfSitecoreWindow } from "../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfSitecoreWindow";
import { IDataStateOfStorageSnapShots } from "../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfStorageSnapShots";
import { IMenuCommandDefinition } from "../../../../Shared/scripts/Interfaces/IMenuCommandDefinition";

export class UiVisibilityTestAgent extends LoggableBase implements IUiVisibilityTestAgent {
  private StateOfSitecoreWindow: any;
  private SelectedSnapshot: GuidData = null;
  WindowType: ScWindowType;

  constructor(logger: ILoggerAgent) {
    super(logger);
  }

  Hydrate(stateOfSitecoreWindow: IDataStateOfSitecoreWindow, stateOfStorageSnapShots: IDataStateOfStorageSnapShots, windowType: ScWindowType, selectSnapShotId: GuidData) {
    this.Logger.FuncStart(this.Hydrate.name);
    this.StateOfSitecoreWindow = stateOfSitecoreWindow;
    this.SelectedSnapshot = selectSnapShotId;
    this.WindowType = windowType;
    this.Logger.FuncEnd(this.Hydrate.name);
  }

  VisibilityTestWindowType(windowType: ScWindowType, currentWindowType: ScWindowType): VisiblityTestResult {
    let OneResult = new VisiblityTestResult(this.VisibilityTestWindowType.name);

    OneResult.DidItPass = windowType === currentWindowType;

    if (!OneResult.DidItPass) {
      OneResult.FriendlyFailReason = 'Window types did not match: ' + StaticHelpers.ScWindowTypeFriendly(windowType) + ' vs ' + StaticHelpers.ScWindowTypeFriendly(currentWindowType);
    }

    return OneResult;
  }

  VisibilityTestSnapShotSelected(currSelSnapshot: GuidData): VisiblityTestResult {
    let OneResult = new VisiblityTestResult(this.VisibilityTestSnapShotSelected.name);

    OneResult.DidItPass = !StaticHelpers.IsNullOrUndefined(currSelSnapshot) && (currSelSnapshot.AsBracedGuid() !== GuidData.GetEmptyGuid().AsBracedGuid());

    if (!OneResult.DidItPass) {
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

    visiblityTestResult.DidItPass = (
      (stateOfSitecoreWindow.Meta.WindowType === ScWindowType.Desktop && stateOfSitecoreWindow.ScWindowStates.StateOfDesktop.IndexOfActiveFrame > -1)
      ||
      (stateOfSitecoreWindow.Meta.WindowType !== ScWindowType.Desktop));

    if (!visiblityTestResult.DidItPass) {
      visiblityTestResult.FriendlyFailReason = 'Requires an open Content Editor';
    }

    return visiblityTestResult;
  }

  VisibilityTestDesktopOrContentEditor(stateOfSitecoreWindow: IDataStateOfSitecoreWindow): VisiblityTestResult {
    this.Logger.FuncStart(this.VisibilityTestDesktopOrContentEditor.name);

    let visiblityTestResult: VisiblityTestResult = new VisiblityTestResult(this.VisibilityTestDesktopOrContentEditor.name);

    if (this.StateOfSitecoreWindow) {
      visiblityTestResult.DidItPass = (stateOfSitecoreWindow.Meta.WindowType === ScWindowType.ContentEditor
        ||
        stateOfSitecoreWindow.Meta.WindowType === ScWindowType.Desktop);

      if (!visiblityTestResult.DidItPass) {
        visiblityTestResult.FriendlyFailReason = 'Requires Content Editor or Desktop';
      }
    } else {
      this.Logger.ErrorAndThrow(this.VisibilityTestDesktopOrContentEditor.name, 'null state');
    }

    this.Logger.FuncEnd(this.VisibilityTestDesktopOrContentEditor.name);
    return visiblityTestResult;
  }

  TestAgainstOneControl(oneControl: VisibilityType): VisiblityTestResult {
    this.Logger.FuncStart(this.TestAgainstOneControl.name, VisibilityType[oneControl]);

    let toReturn: VisiblityTestResult = null;

    switch (oneControl) {
      case VisibilityType.Desktop:
        toReturn = this.VisibilityTestWindowType(ScWindowType.Desktop, this.WindowType);
        break;

      case VisibilityType.DesktopOrContentEditor:
        toReturn = this.VisibilityTestDesktopOrContentEditor(this.StateOfSitecoreWindow);
        break;

      case VisibilityType.IfDesktopMin1ContentEditor:
        toReturn = this.VisibilityTestIfDesktopMinOneConentEditorOpen(this.StateOfSitecoreWindow);
        break;

      case VisibilityType.ContentEditor:
        toReturn = this.VisibilityTestWindowType(ScWindowType.ContentEditor, this.WindowType);
        break;

      case VisibilityType.Edit:
        toReturn = this.VisibilityTestWindowType(ScWindowType.Edit, this.WindowType);
        break;

      case VisibilityType.Launchpad:
        toReturn = this.VisibilityTestWindowType(ScWindowType.Launchpad, this.WindowType);
        break;

      case VisibilityType.LoginPage:
        toReturn = this.VisibilityTestWindowType(ScWindowType.LoginPage, this.WindowType);
        break;

      case VisibilityType.Normal:
        toReturn = this.VisibilityTestWindowType(ScWindowType.Normal, this.WindowType);
        break;

      case VisibilityType.Preview:
        toReturn = this.VisibilityTestWindowType(ScWindowType.Preview, this.WindowType);
        break;

      case VisibilityType.SnapShotable:
        toReturn = this.VisibilityTestSnapShotable(this.StateOfSitecoreWindow);
        break;

      case VisibilityType.SnapShotSelected:
        toReturn = this.VisibilityTestSnapShotSelected(this.SelectedSnapshot);
        break;

      case VisibilityType.NotLogin:
        toReturn = this.VisibilityTestWindowType(ScWindowType.LoginPage, this.WindowType);
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

    if (!toReturn) {
      this.Logger.ErrorAndThrow(this.TestAgainstOneControl.name, 'null test result');
    }

    this.Logger.FuncEnd(this.TestAgainstOneControl.name, toReturn.DidItPass.toString());
    return toReturn;
  }

  TestAgainstAllSetControllers(Command: IMenuCommandDefinition): VisiblityTestResultsBucket {
    this.Logger.FuncStart(this.TestAgainstAllSetControllers.name, Command.VisibilityControllers.length);

    let allResults: VisiblityTestResultsBucket = new VisiblityTestResultsBucket(this.Logger);

    if (this.StateOfSitecoreWindow) {
      if (Command.VisibilityControllers.length > 0) {
        for (var jdx = 0; jdx < Command.VisibilityControllers.length; jdx++) {
          let oneControl: VisibilityType = Command.VisibilityControllers[jdx];
          let thisresult: VisiblityTestResult = this.TestAgainstOneControl(oneControl);
          allResults.TestResults.push(thisresult);
          if (!thisresult || allResults.HasFailures()) {
            break;
          }
        }
      }
    } else {
      this.Logger.ErrorAndThrow(this.TestAgainstAllSetControllers.name, 'null stateOfSitecoreWindow');
    }

    this.Logger.FuncEnd(this.TestAgainstAllSetControllers.name, allResults.HasFailures().toString());
    return allResults;
  }
}