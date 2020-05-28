import { PopUpManagerBase } from './PopUpManagerBase';
import { PopUpHub } from './PopUpHub';
import { VisibilityType } from '../../../Shared/scripts/Enums/VisibilityType';
import { IOneCommand } from '../../../Shared/scripts/Interfaces/IOneCommand';
import { scWindowType } from '../../../Shared/scripts/Enums/scWindowType';
import { IGuid } from '../../../Shared/scripts/Interfaces/IGuid';
import { IAllAgents } from "../../../Shared/scripts/Interfaces/Agents/IallAgents";
export class UiButtonStateManager extends PopUpManagerBase {
  constructor(popHub: PopUpHub, allAgents: IAllAgents) {
    super(popHub, allAgents);
    this.AllAgents.Logger.FuncStart(UiButtonStateManager.name);
        this.AllAgents.Logger.FuncEnd(UiButtonStateManager.name);
  }
  VisibilityTestWindowType(windowType: scWindowType): boolean {
    let toReturn: boolean = false;
    var currentWindowType = this.TabMan().CurrentTabData.UrlParts.ScWindowType;
    toReturn = windowType === currentWindowType;

    return toReturn;
  }
  TestAgainstAllSetControllers(command: IOneCommand): boolean {
    let toReturn: boolean = false;
    if (command.VisibilityControllers.length > 0) {
      for (var jdx = 0; jdx < command.VisibilityControllers.length; jdx++) {
        let oneControl: VisibilityType = command.VisibilityControllers[jdx];

        switch (oneControl) {
          case VisibilityType.Desktop:
            toReturn = this.VisibilityTestWindowType(scWindowType.Desktop)
            break;

          case VisibilityType.ActiveCeNode:
            toReturn = this.VisibilityTestActiveCeNode();
            break;

          case VisibilityType.ContentEditor:
            toReturn = this.VisibilityTestWindowType(scWindowType.ContentEditor)
            break;

          case VisibilityType.Edit:
            toReturn = this.VisibilityTestWindowType(scWindowType.Edit)
            break;

          case VisibilityType.Launchpad:
            toReturn = this.VisibilityTestWindowType(scWindowType.Launchpad)
            break;

          case VisibilityType.LoginPage:
            toReturn = this.VisibilityTestWindowType(scWindowType.LoginPage)
            break;

          case VisibilityType.Normal:
            toReturn = this.VisibilityTestWindowType(scWindowType.Normal)
            break;

          case VisibilityType.Preview:
            toReturn = this.VisibilityTestWindowType(scWindowType.Preview)
            break;
          case VisibilityType.SnapShotable:
            toReturn = this.VisibilityTestSnapShotable()
            break;

          case VisibilityType.SnapShotSelected:
            toReturn = this.VisibilityTestSnapShotSelected()
            break;

          case VisibilityType.NotLogin:
            toReturn = !this.VisibilityTestWindowType(scWindowType.LoginPage)
            break;

          case VisibilityType.CommandIsRunning:
            toReturn = false; //todo
            break;

          case VisibilityType.Unknown:
            this.AllAgents.Logger.Error(this.TestAgainstAllSetControllers.name, 'unknown visibility type');
            break;

          default:
            this.AllAgents.Logger.Error(this.TestAgainstAllSetControllers.name, 'unknown visibility type');
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

  VisibilityTestSnapShotSelected(): boolean {
    let toReturn: boolean = false;
    let currSelSnapshot: IGuid = this.UiMan().CurrentMenuState.SelectSnapshotId;

    if (currSelSnapshot && currSelSnapshot.AsBracedGuid !== this.Helpers().GuidHelp.EmptyGuid().AsBracedGuid) {
      toReturn = true;
    }
    return toReturn;
  }


  VisibilityTestSnapShotable(): boolean {
    //todo may want to be able take snap shots of other window types
    return this.VisibilityTestActiveCeNode();
  }

  VisibilityTestActiveCeNode(): boolean {
    let toReturn: boolean = false;

    toReturn = this.UiMan().CurrContentState.ActiveCe && this.UiMan().CurrContentState.ActiveCe.ActiveNode !== null ;
    return toReturn;
  }
  SetOneButtonVisibility(targetButton: HTMLElement, passesOneTest: boolean) {
    if (passesOneTest) {
      targetButton.classList.remove('disabled');
      targetButton.removeAttribute('disabled');
    } else {
      targetButton.classList.add('disabled');
      targetButton.setAttribute('disabled', 'disabled');
    }
  }
  
  RefreshButtonStates(): void {
    this.AllAgents.Logger.FuncStart(this.RefreshButtonStates.name, this.EventMan().AllMenuCommands.length);
    for (var idx = 0; idx < this.EventMan().AllMenuCommands.length; idx++) {
      var oneCommand = this.EventMan().AllMenuCommands[idx];
      //this.allAgents.Logger.LogVal('working on', MenuCommand[command.Command])
      let passesOneTest: boolean = false;
      var targetButton: HTMLElement = this.UiMan().GetButtonByIdOrSelector(oneCommand.ButtonSelector);
      if (targetButton) {
        passesOneTest = this.TestAgainstAllSetControllers(oneCommand);
      } else {
        this.AllAgents.Logger.Error(this.RefreshButtonStates.name, 'target button not found');
      }
      this.SetOneButtonVisibility(targetButton, passesOneTest);
    }
    this.AllAgents.Logger.FuncEnd(this.RefreshButtonStates.name);
  }
}
