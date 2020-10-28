import { ScProxyDisciminator } from "../../Enums/40 - ScProxyDisciminator";
import { IWindowStateTree } from "../../Interfaces/StateOf/IRootState";
import { IStateOf_ } from "../../Interfaces/StateOf/IStateOf_";

export class DefaultStateOfRoot implements IWindowStateTree {
  DisciminatorFriendly: string = ScProxyDisciminator[ScProxyDisciminator.Root];
  Disciminator: ScProxyDisciminator = ScProxyDisciminator.Root;
  Children: IStateOf_[] = [];
}