import { LoggableBase } from "../../../../../../Content/scripts/Managers/LoggableBase";
import { IDataStateOfDesktop } from "../../../../../../Shared/scripts/Interfaces/Data/IDataDesktopState";
import { IDataStateOfFrame } from "../../../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfFrame";
import { IDataStateOfTree } from "../../../../../../Shared/scripts/Interfaces/Data/iDataTreeState";
import { IDataStateOfScContentTreeNode } from "../../../../../../Shared/scripts/Interfaces/Data/IDataOneTreeNode";
import { IDataStateOfContentEditor } from "../../../../../../Shared/scripts/Interfaces/Data/IDataOneStorageOneTreeState";

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
    return stateOfDesktop.StateOfFrames[stateOfDesktop.IndexOfActiveFrame].StateOfContentEditor;
  }
}