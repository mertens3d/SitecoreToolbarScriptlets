import { ScWindowType } from "../../../../Shared/scripts/Enums/scWindowType";
import { IContentState } from "../../../../Shared/scripts/Interfaces/Data/IContentState";
import { GuidData } from "../../../../Shared/scripts/Helpers/GuidData";
import { LoggableBase } from "../../../../Content/scripts/Managers/LoggableBase";

export class ButtonVisibilityTester extends LoggableBase {
  VisibilityTestWindowType(windowType: ScWindowType, currentWindowType: ScWindowType): boolean {
    this.Logger.FuncStart(this.VisibilityTestWindowType.name);
    let toReturn: boolean = false;

    toReturn = windowType === currentWindowType;

    this.Logger.FuncEnd(this.VisibilityTestWindowType.name, toReturn.toString());
    return toReturn;
  }

  VisibilityTestSnapShotSelected(currSelSnapshot: GuidData): boolean {
    let toReturn: boolean = false;

    if (currSelSnapshot && currSelSnapshot.AsBracedGuid() !== GuidData.GetEmptyGuid().AsBracedGuid()) {
      toReturn = true;
    }
    return toReturn;
  }

  VisibilityTestSnapShotable(currentContentState: IContentState): boolean {
    //todo may want to be able take snap shots of other window types
    return this.VisibilityTestActiveCeNode(currentContentState);
  }

  VisibilityTestActiveCeNode(currentContentState: IContentState): boolean {
    this.Logger.FuncStart(this.VisibilityTestActiveCeNode.name);

    let toReturn: boolean = false;

    toReturn = currentContentState !== null && currentContentState.ActiveCe !== null && currentContentState.ActiveCe.ActiveNode !== null;

    this.Logger.LogVal('currentContentState', currentContentState === null);
    if (currentContentState) {
      this.Logger.LogVal('currentContentState.ActiveCe', currentContentState.ActiveCe === null);
      if (currentContentState.ActiveCe) {

        this.Logger.LogVal('currentContentState.ActiveCe.ActiveNode', currentContentState.ActiveCe.ActiveNode === null);
      }

    }

    //todo - fix
    toReturn = true;
    this.Logger.FuncEnd(this.VisibilityTestActiveCeNode.name, toReturn.toString());
    return toReturn;
  }
}