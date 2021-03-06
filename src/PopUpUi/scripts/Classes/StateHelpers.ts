﻿import { IStateOfContentEditor } from "../../../Shared/scripts/Interfaces/Data/States/IStateOfContentEditor";
import { IStateOfDesktop } from "../../../Shared/scripts/Interfaces/Data/States/IStateOfDesktop";
import { IStateOfDTFrame } from "../../../Shared/scripts/Interfaces/Data/States/IStateOfDTFrame";
import { IStateOfScContentTreeNodeDeep } from "../../../Shared/scripts/Interfaces/Data/States/IStateOfScContentTreeNode";
import { IStateOfContentTree } from "../../../Shared/scripts/Interfaces/Data/States/IStateOfContentTree";
import { _FrontBase } from "../../../Shared/scripts/_HindeCoreBase";
import { IStateOfScContentTreeNodeShallow } from "../../../Shared/scripts/Interfaces/Data/States/IStateOfScContentTreeNodeShallow";

export class StateHelpers extends _FrontBase {
  GetActiveTreeNodeFromStateOfTreeFlat(stateOfTree: IStateOfContentTree): IStateOfScContentTreeNodeShallow {
    let toReturn: IStateOfScContentTreeNodeDeep = null;

    return stateOfTree.ActiveNodeShallow;
    //if (stateOfTree && stateOfTree.ActiveNodeCoord.SiblingIndex > -1 && stateOfTree.ActiveNodeCoord.LevelIndex > -1) {
    //  try {
    //    if (stateOfTree.ActiveNodeCoord.LevelIndex > -1) {
    //      let activeLevelNodes: IStateOfScContentTreeNodeDeep[] = stateOfTree.StateOfScContentTreeNodeDeep[stateOfTree.ActiveNodeCoord.LevelIndex];
    //      activeLevelNodes.forEach((stateOfScContentTreeNodeDeep: IStateOfScContentTreeNodeDeep) => {
    //        if (stateOfScContentTreeNodeDeep.IsActive) {
    //          toReturn = stateOfScContentTreeNodeDeep;
    //        }
    //      })
    //    }
    //    //toReturn = stateOfTree.StateOfScContentTreeNodeProxy[stateOfTree.ActiveNodeCoord.LevelIndex][stateOfTree.ActiveNodeCoord.SiblingIndex];
    //  } catch (err) {
    //    this.ErrorHand.WarningAndContinue(this.GetActiveTreeNodeFromStateOfTree.name, 'Invalid indices');
    //  }
    //}
    //return toReturn;
  }

  GetActiveTreeNodeFromStateOfContentEditor(stateOfContentEditor: IStateOfContentEditor): IStateOfScContentTreeNodeShallow {
    return this.GetActiveTreeNodeFromStateOfTreeFlat(stateOfContentEditor.ContentTree);
  }

  GetActiveFrameFromStateOfDesktop(stateOfDesktop: IStateOfDesktop): IStateOfDTFrame {
    return stateOfDesktop.DTArea.DTFrames[stateOfDesktop.DTArea.ActiveFrameIndex];
  }

  //GetActiveContentEditFromStateOfDesktop(stateOfDesktop: IStateOfDesktop): IStateOfContentEditor {
  //  let toReturn: IStateOfContentEditor = null;
  //  if (stateOfDesktop && stateOfDesktop.StateOfDTArea.ActiveDTFrameIndex > -1) {
  //    return stateOfDesktop.StateOfDTArea.StateOfDTFrames[stateOfDesktop.StateOfDTArea.ActiveDTFrameIndex].StateOfHostedProxy;
  //  }
  //  return toReturn;
  //}
}