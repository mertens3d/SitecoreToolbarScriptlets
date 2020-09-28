import { IDataStateOfDesktop } from "../../../Shared/scripts/Interfaces/Data/States/IDataStateOfDesktop";
import { IDataStateOfDTFrame } from "../../../Shared/scripts/Interfaces/Data/States/IDataStateOfDTFrame";
import { IDataStateOfTree } from "../../../Shared/scripts/Interfaces/Data/States/IDataStateOfTree";
import { IDataStateOfScContentTreeNode } from "../../../Shared/scripts/Interfaces/Data/States/IDataStateOfScContentTreeNode";
import { IDataStateOfContentEditor } from "../../../Shared/scripts/Interfaces/Data/States/IDataStateOfContentEditor";
import { LoggableBase } from "../../../Shared/scripts/LoggableBase";

export class StateHelpers extends LoggableBase {

  GetActiveTreeNodeFromStateOfTree(stateOfTree: IDataStateOfTree): IDataStateOfScContentTreeNode {
    return stateOfTree.StateOfTreeNodes[stateOfTree.ActiveTreeNodeIndex];
  }

  GetActiveTreeNodeFromStateOfContentEditor(stateOfContentEditor: IDataStateOfContentEditor): IDataStateOfScContentTreeNode {
    return this.GetActiveTreeNodeFromStateOfTree(stateOfContentEditor.StateOfTree);
  }

  GetActiveFrameFromStateOfDesktop(stateOfDesktop: IDataStateOfDesktop): IDataStateOfDTFrame {
    return stateOfDesktop.StateOfDTArea.StateOfDTFrames[stateOfDesktop.StateOfDTArea.IndexOfActiveFrame];
  }

  GetActiveContentEditFromStateOfDesktop(stateOfDesktop: IDataStateOfDesktop): IDataStateOfContentEditor {
    let toReturn: IDataStateOfContentEditor = null;
    if (stateOfDesktop && stateOfDesktop.StateOfDTArea.IndexOfActiveFrame > -1) {
      return stateOfDesktop.StateOfDTArea.StateOfDTFrames[stateOfDesktop.StateOfDTArea.IndexOfActiveFrame].StateOfContentEditor;
    }
    return toReturn;
  }
}