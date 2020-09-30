import { GuidData } from "../../Helpers/GuidData";
import { IStateOfScContentTreeNodeDeep } from "../../Interfaces/Data/States/IStateOfScContentTreeNode";
import { IScContentTreeNodeCoord } from "../../Interfaces/Data/States/IScContentTreeNodeCoord";

export class DefaultStateOfScContentTreeNode implements IStateOfScContentTreeNodeDeep {
    IsActive = false;
    IsExpanded = false;
    FriendlyTreeNode = '';
    ItemId = new GuidData();
    IconSrc = '';
    MainIconSrc = '';
    TreeNodeChildren = [];
    Coord: IScContentTreeNodeCoord = {
        LevelWidth: -1,
        SiblingIndex: -1,
        LevelIndex: -1,
    };
}
