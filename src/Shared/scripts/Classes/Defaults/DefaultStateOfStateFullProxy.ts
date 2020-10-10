import { IStateOf_ } from "../../Interfaces/Data/States/IStateOf_";
import { StateFullProxyDisciminator } from "../../Enums/4000 - StateFullProxyDisciminator";

export class DefaultStateOfStateFullProxy implements IStateOf_ {
  DisciminatorFriendly: string = StateFullProxyDisciminator[StateFullProxyDisciminator.Unknown];
  Disciminator: StateFullProxyDisciminator = StateFullProxyDisciminator.Unknown;
}