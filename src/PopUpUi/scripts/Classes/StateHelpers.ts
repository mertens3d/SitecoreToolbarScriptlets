import { IStateOfContentEditor } from "../../../Shared/scripts/Interfaces/Data/States/IStateOfContentEditor";
import { IStateOfDesktop } from "../../../Shared/scripts/Interfaces/Data/States/IStateOfDesktop";
import { IStateOfDTFrame } from "../../../Shared/scripts/Interfaces/Data/States/IStateOfDTFrame";
import { IStateOfScContentTreeNode } from "../../../Shared/scripts/Interfaces/Data/States/IStateOfScContentTreeNode";
import { IStateOfContentTree } from "../../../Shared/scripts/Interfaces/Data/States/IStateOfContentTree";
import { LoggableBase } from "../../../Shared/scripts/LoggableBase";

export class StateHelpers extends LoggableBase {
  GetActiveTreeNodeFromStateOfTree(stateOfTree: IStateOfContentTree): IStateOfScContentTreeNode {
    let toReturn: IStateOfScContentTreeNode = null;

    if (stateOfTree && stateOfTree.ActiveNodeCoord.SiblingIndex > -1 && stateOfTree.ActiveNodeCoord.LevelIndex > -1) {
      try {
        toReturn = stateOfTree.StateOfScContentTreeNodeProxy[stateOfTree.ActiveNodeCoord.LevelIndex][stateOfTree.ActiveNodeCoord.SiblingIndex];
      } catch (err) {
        this.Logger.WarningAndContinue(this.GetActiveTreeNodeFromStateOfTree.name, 'Invalid indices');
      }
    }
    return toReturn;
  }

  GetActiveTreeNodeFromStateOfContentEditor(stateOfContentEditor: IStateOfContentEditor): IStateOfScContentTreeNode {
    return this.GetActiveTreeNodeFromStateOfTree(stateOfContentEditor.StateOfContentTree);
  }

  GetActiveFrameFromStateOfDesktop(stateOfDesktop: IStateOfDesktop): IStateOfDTFrame {
    return stateOfDesktop.StateOfDTArea.StateOfDTFrames[stateOfDesktop.StateOfDTArea.IndexOfActiveDTFrameProxy];
  }

  GetActiveContentEditFromStateOfDesktop(stateOfDesktop: IStateOfDesktop): IStateOfContentEditor {
    let toReturn: IStateOfContentEditor = null;
    if (stateOfDesktop && stateOfDesktop.StateOfDTArea.IndexOfActiveDTFrameProxy > -1) {
      return stateOfDesktop.StateOfDTArea.StateOfDTFrames[stateOfDesktop.StateOfDTArea.IndexOfActiveDTFrameProxy].StateOfContentEditor;
    }
    return toReturn;
  }
}