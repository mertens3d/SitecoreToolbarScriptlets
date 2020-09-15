import { LoggableBase } from "../../../Content/scripts/Managers/LoggableBase";
import { IDataStateOfDesktop } from "../../../Shared/scripts/Interfaces/Data/States/IDataStateOfDesktop";
import { IDataStateOfFrame } from "../../../Shared/scripts/Interfaces/Data/States/IDataStateOfFrame";
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
  GetActiveFrameFromStateOfDesktop(stateOfDesktop: IDataStateOfDesktop): IDataStateOfFrame {
    return stateOfDesktop.StateOfFrames[stateOfDesktop.IndexOfActiveFrame];
  }
  GetActiveContentEditFromStateOfDesktop(stateOfDesktop: IDataStateOfDesktop): IDataStateOfContentEditor {
    let toReturn: IDataStateOfContentEditor = null;
    if (stateOfDesktop && stateOfDesktop.IndexOfActiveFrame > -1) {
      return stateOfDesktop.StateOfFrames[stateOfDesktop.IndexOfActiveFrame].StateOfContentEditor;
    }
    return toReturn;
  }
}