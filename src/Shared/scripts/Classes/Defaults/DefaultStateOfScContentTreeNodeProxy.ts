import { GuidData } from "../../Helpers/GuidData";
import { IStateOfScContentTreeNode } from "../../Interfaces/Data/States/IStateOfScContentTreeNode";
import { IScContentTreeNodeCoord } from "../../Interfaces/Data/States/IScContentTreeNodeCoord";

export class DefaultStateOfScContentTreeNodeProxy implements IStateOfScContentTreeNode {
    IsActive = false;
    IsExpanded = false;
    FriendlyTreeNode = '';
    ItemId = new GuidData();
    IconSrc = '';
    MainIconSrc = '';
    Children = [];
    Coord: IScContentTreeNodeCoord = {
        LevelWidth: -1,
        SiblingIndex: -1,
        LevelIndex: -1,
    };
}
