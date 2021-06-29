import { ScProxyDisciminator } from "../../Enums/40 - ScProxyDisciminator";
import { GuidData } from "../../Helpers/GuidData";
import { IScIcon } from "../../Interfaces/Data/IScIcon";
import { IScContentTreeNodeCoord } from "../../Interfaces/StateOf/IScContentTreeNodeCoord";
import { IStateOfScContentTreeNodeDeep } from "../../Interfaces/StateOf/IStateOfScContentTreeNode";
import { DefaultScContentTreeNodeLineage } from "./DefaultScContentTreeNodeLineage";
import { DefaultScIcon } from "./DefaultScIcon";

export class DefaultStateOfScContentTreeNode implements IStateOfScContentTreeNodeDeep {
  Disciminator = ScProxyDisciminator.ContentTreeNode;
  DisciminatorFriendly = ScProxyDisciminator[ScProxyDisciminator.ContentTreeNode];
  // leave in this order to make it easier to debug when looking at the data in devtools. This is the order it will log out (and maybe store)
  Friendly: string = '';
  IsExpanded: boolean = false;
  IsActive: boolean = false;
  Coord: IScContentTreeNodeCoord = {
    LevelIndex: -1,
    LevelWidth: -1,
    SiblingIndex: -1
  };
  ItemId: GuidData = null;

  Children: [];

  IconSrc: IScIcon = new DefaultScIcon();

  Lineage = new DefaultScContentTreeNodeLineage();
}