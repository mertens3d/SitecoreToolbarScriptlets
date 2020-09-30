import { GuidData } from "../../../Helpers/GuidData";

export interface ITreeNodeProxyCoord {
  LevelIndex: number;
  SiblingIndex: number;
  LevelWidth: number;
}

export interface IStateOfScContentTreeNodeProxy {
  Coord: ITreeNodeProxyCoord;
  MainIconSrc: string;
  IconSrc: string;
  IsActive: Boolean;
  IsExpanded: Boolean;
  FriendlyTreeNode: string;
  ItemId: GuidData;
  Children: IStateOfScContentTreeNodeProxy[];
}