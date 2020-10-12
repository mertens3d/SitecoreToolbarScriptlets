import { IStateOf_ } from "../../Interfaces/Data/States/IStateOf_";
import { StateFullProxyDisciminator } from "../../Enums/40 - StateFullProxyDisciminator";

export class DefaultStateOfStateFullProxy implements IStateOf_ {
  DisciminatorFriendly: string = StateFullProxyDisciminator[StateFullProxyDisciminator.Unknown];
  Disciminator: StateFullProxyDisciminator = StateFullProxyDisciminator.Unknown;
}