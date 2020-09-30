import { GuidData } from "../../Helpers/GuidData";
import { IStateOfScContentTreeNodeProxy, ITreeNodeProxyCoord } from "../../Interfaces/Data/States/IDataStateOfScContentTreeNode";

export class DefaultStateOfScContentTreeNodeProxy implements IStateOfScContentTreeNodeProxy {
  IsActive = false;
  IsExpanded = false;
  FriendlyTreeNode = '';
  ItemId = new GuidData();
  IconSrc = '';
  MainIconSrc = '';
  Children = [];
  Coord: ITreeNodeProxyCoord = {
    LevelWidth: -1,
    SiblingIndex: -1,
    LevelIndex: -1,
  }
}