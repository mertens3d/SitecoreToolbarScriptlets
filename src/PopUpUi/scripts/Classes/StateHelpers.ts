import { IStateOfContentEditor } from "../../../Shared/scripts/Interfaces/Data/States/IStateOfContentEditor";
import { IStateOfDesktop } from "../../../Shared/scripts/Interfaces/Data/States/IStateOfDesktop";
import { IStateOfDTFrame } from "../../../Shared/scripts/Interfaces/Data/States/IStateOfDTFrame";
import { IStateOfScContentTreeNodeDeep } from "../../../Shared/scripts/Interfaces/Data/States/IStateOfScContentTreeNode";
import { IStateOfContentTree } from "../../../Shared/scripts/Interfaces/Data/States/IStateOfContentTree";
import { _HindeCoreBase } from "../../../Shared/scripts/LoggableBase";
import { IStateOfScContentTreeNodeFlat } from "../../../Shared/scripts/Interfaces/Data/States/IStateOfScContentTreeNodeFlat";

export class StateHelpers extends _HindeCoreBase {
  GetActiveTreeNodeFromStateOfTreeFlat(stateOfTree: IStateOfContentTree): IStateOfScContentTreeNodeFlat {
    let toReturn: IStateOfScContentTreeNodeDeep = null;

    return stateOfTree.ActiveNodeFlat;
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
    //    this.Logger.WarningAndContinue(this.GetActiveTreeNodeFromStateOfTree.name, 'Invalid indices');
    //  }
    //}
    //return toReturn;
  }

  GetActiveTreeNodeFromStateOfContentEditor(stateOfContentEditor: IStateOfContentEditor): IStateOfScContentTreeNodeFlat {
    return this.GetActiveTreeNodeFromStateOfTreeFlat(stateOfContentEditor.StateOfContentTree);
  }

  GetActiveFrameFromStateOfDesktop(stateOfDesktop: IStateOfDesktop): IStateOfDTFrame {
    return stateOfDesktop.StateOfDTArea.StateOfDTFrames[stateOfDesktop.StateOfDTArea.ActiveDTFrameIndex];
  }

  GetActiveContentEditFromStateOfDesktop(stateOfDesktop: IStateOfDesktop): IStateOfContentEditor {
    let toReturn: IStateOfContentEditor = null;
    if (stateOfDesktop && stateOfDesktop.StateOfDTArea.ActiveDTFrameIndex > -1) {
      return stateOfDesktop.StateOfDTArea.StateOfDTFrames[stateOfDesktop.StateOfDTArea.ActiveDTFrameIndex].StateOfContentEditor;
    }
    return toReturn;
  }
}