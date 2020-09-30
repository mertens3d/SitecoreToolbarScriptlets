import { IStateOfScContentTreeNodeProxy, ITreeNodeProxyCoord } from './IDataStateOfScContentTreeNode';

export interface IStateOfContentEditorTreeProxy {
  ActiveNodeCoord: ITreeNodeProxyCoord;
  StateOfTreeNodes: IStateOfScContentTreeNodeProxy;
}