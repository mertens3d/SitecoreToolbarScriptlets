import { IStateOfContentEditorProxy } from "../../../Shared/scripts/Interfaces/Data/States/IDataStateOfContentEditor";
import { IDataStateOfDesktopProxy } from "../../../Shared/scripts/Interfaces/Data/States/IDataStateOfDesktop";
import { IStateOfDTFrameProxy } from "../../../Shared/scripts/Interfaces/Data/States/IDataStateOfDTFrame";
import { IStateOfScContentTreeNodeProxy } from "../../../Shared/scripts/Interfaces/Data/States/IDataStateOfScContentTreeNode";
import { IStateOfContentEditorTreeProxy } from "../../../Shared/scripts/Interfaces/Data/States/IDataStateOfTree";
import { LoggableBase } from "../../../Shared/scripts/LoggableBase";

export class StateHelpers extends LoggableBase {
  GetActiveTreeNodeFromStateOfTree(stateOfTree: IStateOfContentEditorTreeProxy): IStateOfScContentTreeNodeProxy {
    let toReturn: IStateOfScContentTreeNodeProxy = null;

    if (stateOfTree && stateOfTree.ActiveNodeCoord.SiblingIndex > -1 && stateOfTree.ActiveNodeCoord.LevelIndex > -1) {
      try {
        toReturn = stateOfTree.StateOfTreeNodes[stateOfTree.ActiveNodeCoord.LevelIndex][stateOfTree.ActiveNodeCoord.SiblingIndex];
      } catch (err) {
        this.Logger.WarningAndContinue(this.GetActiveTreeNodeFromStateOfTree.name, 'Invalid indices');
      }
    }
    return toReturn;
  }

  GetActiveTreeNodeFromStateOfContentEditor(stateOfContentEditor: IStateOfContentEditorProxy): IStateOfScContentTreeNodeProxy {
    return this.GetActiveTreeNodeFromStateOfTree(stateOfContentEditor.StateOfContentEditorTreeProxy);
  }

  GetActiveFrameFromStateOfDesktop(stateOfDesktop: IDataStateOfDesktopProxy): IStateOfDTFrameProxy {
    return stateOfDesktop.StateOfDTAreaProxy.StateOfDTFrameProxies[stateOfDesktop.StateOfDTAreaProxy.IndexOfActiveDTFrameProxy];
  }

  GetActiveContentEditFromStateOfDesktop(stateOfDesktop: IDataStateOfDesktopProxy): IStateOfContentEditorProxy {
    let toReturn: IStateOfContentEditorProxy = null;
    if (stateOfDesktop && stateOfDesktop.StateOfDTAreaProxy.IndexOfActiveDTFrameProxy > -1) {
      return stateOfDesktop.StateOfDTAreaProxy.StateOfDTFrameProxies[stateOfDesktop.StateOfDTAreaProxy.IndexOfActiveDTFrameProxy].StateOfContentEditorProxy;
    }
    return toReturn;
  }
}