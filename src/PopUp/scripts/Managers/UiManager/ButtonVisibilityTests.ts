import { LoggableBase } from "../../../../Content/scripts/Managers/LoggableBase";
import { StaticHelpers } from "../../../../Shared/scripts/Classes/StaticHelpers";
import { ScWindowType } from "../../../../Shared/scripts/Enums/scWindowType";
import { GuidData } from "../../../../Shared/scripts/Helpers/GuidData";
import { ILoggerAgent } from "../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { VisiblityTestResult } from "../../../../Shared/scripts/Interfaces/Agents/VisiblityTestResult";
import { IDataStateOfSitecoreWindow } from "../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfSitecoreWindow";
import { StateHelpers } from "../../Classes/StateHelpers";

export class ButtonVisibilityTester extends LoggableBase {
  StateHelpers: StateHelpers;

  constructor(logger: ILoggerAgent) {
    super(logger);
    this.StateHelpers = new StateHelpers(this.Logger);
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
      (stateOfSitecoreWindow.Meta.WindowType === ScWindowType.Desktop && stateOfSitecoreWindow.States.StateOfDesktop.IndexOfActiveFrame > -1)
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
}