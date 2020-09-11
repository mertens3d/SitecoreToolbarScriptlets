import { ScWindowType } from "../../../../Shared/scripts/Enums/scWindowType";
import { IContentReplyPayload } from "../../../../Shared/scripts/Interfaces/Data/IContentState";
import { GuidData } from "../../../../Shared/scripts/Helpers/GuidData";
import { LoggableBase } from "../../../../Content/scripts/Managers/LoggableBase";

export class ButtonVisibilityTester extends LoggableBase {
  VisibilityTestWindowType(windowType: ScWindowType, currentWindowType: ScWindowType): boolean {
    let toReturn: boolean = false;

    toReturn = windowType === currentWindowType;

    return toReturn;
  }

  VisibilityTestSnapShotSelected(currSelSnapshot: GuidData): boolean {
    let toReturn: boolean = false;

    if (currSelSnapshot && currSelSnapshot.AsBracedGuid() !== GuidData.GetEmptyGuid().AsBracedGuid()) {
      toReturn = true;
    }
    return toReturn;
  }

  VisibilityTestSnapShotable(currentContentState: IContentReplyPayload): boolean {
    //todo may want to be able take snap shots of other window types
    return this.VisibilityTestActiveCeNode(currentContentState);
  }

  VisibilityTestActiveCeNode(currentContentState: IContentReplyPayload): boolean {

    let toReturn: boolean = false;

    toReturn = currentContentState !== null && currentContentState.ActiveCe !== null && currentContentState.ActiveCe.StateOfTree.ActiveNode !== null;

    if (currentContentState) {
      if (currentContentState.ActiveCe) {
      }
    }

    //todo - fix
    toReturn = true;
    return toReturn;
  }
}