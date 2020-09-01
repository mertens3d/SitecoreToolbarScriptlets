import { scWindowType } from "../../../../Shared/scripts/Enums/scWindowType";
import { IContentState } from "../../../../Shared/scripts/Interfaces/IContentState/IContentState";
import { GuidData } from "../../../../Shared/scripts/Helpers/GuidData";

export class ButtonVisibilityTester {
  VisibilityTestWindowType(windowType: scWindowType, currentWindowType: scWindowType): boolean {
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

  VisibilityTestSnapShotable(currentContentState: IContentState): boolean {
    //todo may want to be able take snap shots of other window types
    return this.VisibilityTestActiveCeNode(currentContentState);
  }

  VisibilityTestActiveCeNode(currentContentState: IContentState): boolean {
    let toReturn: boolean = false;

    toReturn = currentContentState && currentContentState.ActiveCe && currentContentState.ActiveCe.ActiveNode !== null;
    return toReturn;
  }
}