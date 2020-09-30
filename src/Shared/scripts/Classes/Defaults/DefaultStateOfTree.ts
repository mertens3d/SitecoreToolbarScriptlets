import { IStateOfContentEditorTreeProxy } from "../../Interfaces/Data/States/IDataStateOfTree";
import { IStateOfScContentTreeNodeProxy, ITreeNodeProxyCoord } from "../../Interfaces/Data/States/IDataStateOfScContentTreeNode";

export class DefaultStateOfContentEditorTreeProxy implements IStateOfContentEditorTreeProxy {
  ActiveNodeCoord: ITreeNodeProxyCoord = {
    LevelIndex: -1,
    LevelWidth: -1,
    SiblingIndex: -1
  }
  StateOfTreeNodes: IStateOfScContentTreeNodeProxy = null;
}