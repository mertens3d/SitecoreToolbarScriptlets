import { IStateOf_ } from "../../Interfaces/StateOf/IStateOf_";
import { ScProxyDisciminator } from "../../Enums/40 - ScProxyDisciminator";

export class DefaultStateOfStateFullProxy implements IStateOf_ {
  DisciminatorFriendly: string = ScProxyDisciminator[ScProxyDisciminator.What];
  Disciminator: ScProxyDisciminator = ScProxyDisciminator.What;
  Children: IStateOf_[] = [];
}