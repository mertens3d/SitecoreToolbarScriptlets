import { ScProxyDisciminator } from "../../Enums/40 - ScProxyDisciminator";
import { ScIconPath } from "../../Enums/60 - ScIconPath";
import { GuidData } from "../../Helpers/GuidData";
import { IScIcon } from "../../Interfaces/Data/IScIcon";
import { IScContentTreeNodeCoord } from "../../Interfaces/StateOf/IScContentTreeNodeCoord";
import { IStateOfScContentTreeNodeDeep } from "../../Interfaces/StateOf/IStateOfScContentTreeNode";

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

  Lineage: {
    L1Icon: {
      IconSuffix: '',
      IconPath: ScIconPath.Unknown,
    },
    L1Text: '',
    L2Icon: {
      IconSuffix: '',
      IconPath: ScIconPath.Unknown,
    },
    L2Text: ''
  }

  IconSrc: IScIcon;

  //  IsActive = false;
  //  IsExpanded = false;
  //  Friendly = '';
  //  ItemId = new GuidData();
  //  IconSrc = '';
  //  NodeChildren = [];
  //  Coord: IScContentTreeNodeCoord = {
  //    LevelWidth: -1,
  //    SiblingIndex: -1,
  //    LevelIndex: -1,
  //  };
  //  Lineage = {
  //    L1MainIconSrc: '',

  //  }
}