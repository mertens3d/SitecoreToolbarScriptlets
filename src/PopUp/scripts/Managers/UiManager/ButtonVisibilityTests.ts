﻿import { ScWindowType } from "../../../../Shared/scripts/Enums/scWindowType";
import { IDataContentReplyPayload } from "../../../../Shared/scripts/Interfaces/Data/IContentState";
import { GuidData } from "../../../../Shared/scripts/Helpers/GuidData";
import { LoggableBase } from "../../../../Content/scripts/Managers/LoggableBase";
import { IDataStateOfSitecoreWindow } from "../../../../Shared/scripts/Interfaces/Data/IDataOneWindowStorage";
import { IDataStateOfContentEditor } from "../../../../Shared/scripts/Interfaces/Data/IDataOneStorageOneTreeState";

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

  VisibilityTestSnapShotable(stateOfSitecoreWindow: IDataStateOfSitecoreWindow): boolean {
    //todo may want to be able take snap shots of other window types
    return this.VisibilityTestActiveCeNode(stateOfSitecoreWindow);
  }

  VisibilityTestActiveCeNode(stateOfSitecoreWindow: IDataStateOfSitecoreWindow): boolean {
    let toReturn: boolean = false;

    if (stateOfSitecoreWindow) {
      let foundActive: IDataStateOfContentEditor = stateOfSitecoreWindow.StateOfDesktop.StateOfActiveFrame.ContentEditorState;

      if (!foundActive) {
        foundActive = stateOfSitecoreWindow.StateOfContentEditor;
      }

      toReturn = foundActive && foundActive.StateOfTree.ActiveNode !== null;

      toReturn = true;
    }
    return toReturn;
  }
}