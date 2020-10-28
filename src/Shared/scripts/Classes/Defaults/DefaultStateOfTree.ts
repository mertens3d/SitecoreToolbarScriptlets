import { ScProxyDisciminator } from "../../Enums/40 - ScProxyDisciminator";
import { IWindowStateTree } from "../../Interfaces/StateOf/IRootState";
import { IStateOf_ } from "../../Interfaces/StateOf/IStateOf_";

export class DefaultWindowStateTree implements IWindowStateTree {
  DisciminatorFriendly: string = ScProxyDisciminator[ScProxyDisciminator.WindowStateTree];
  Disciminator: ScProxyDisciminator = ScProxyDisciminator.WindowStateTree;
  Children: IStateOf_[] = [];
}