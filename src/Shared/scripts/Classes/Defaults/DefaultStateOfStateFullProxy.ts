import { IStateOf_ } from "../../Interfaces/Data/States/IStateOf_";
import { ScDocProxyDisciminator } from "../../Enums/40 - StateFullProxyDisciminator";

export class DefaultStateOfStateFullProxy implements IStateOf_ {
  DisciminatorFriendly: string = ScDocProxyDisciminator[ScDocProxyDisciminator.Unknown];
  Disciminator: ScDocProxyDisciminator = ScDocProxyDisciminator.Unknown;
}