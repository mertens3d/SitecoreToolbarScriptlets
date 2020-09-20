import { LoggableBase } from "../../../Content/scripts/Managers/LoggableBase";
import { IDataStateOfDesktop } from "../../../Shared/scripts/Interfaces/Data/States/IDataStateOfDesktop";
import { IDataStateOfDTFrame } from "../../../Shared/scripts/Interfaces/Data/States/IDataStateOfDTFrame";
import { IDataStateOfTree } from "../../../Shared/scripts/Interfaces/Data/States/IDataStateOfTree";
import { IDataStateOfScContentTreeNode } from "../../../Shared/scripts/Interfaces/Data/States/IDataStateOfScContentTreeNode";
import { IDataStateOfContentEditor } from "../../../Shared/scripts/Interfaces/Data/States/IDataStateOfContentEditor";

export class StateHelpers extends LoggableBase {

  GetActiveTreeNodeFromStateOfTree(stateOfTree: IDataStateOfTree): IDataStateOfScContentTreeNode {
    return stateOfTree.StateOfTreeNodes[stateOfTree.ActiveTreeNodeIndex];
  }

  GetActiveTreeNodeFromStateOfContentEditor(stateOfContentEditor: IDataStateOfContentEditor): IDataStateOfScContentTreeNode {
    return this.GetActiveTreeNodeFromStateOfTree(stateOfContentEditor.StateOfTree);
  }

  GetActiveFrameFromStateOfDesktop(stateOfDesktop: IDataStateOfDesktop): IDataStateOfDTFrame {
    return stateOfDesktop.StateOfDTFrames[stateOfDesktop.IndexOfActiveFrame];
  }

  GetActiveContentEditFromStateOfDesktop(stateOfDesktop: IDataStateOfDesktop): IDataStateOfContentEditor {
    let toReturn: IDataStateOfContentEditor = null;
    if (stateOfDesktop && stateOfDesktop.IndexOfActiveFrame > -1) {
      return stateOfDesktop.StateOfDTFrames[stateOfDesktop.IndexOfActiveFrame].StateOfContentEditor;
    }
    return toReturn;
  }
}