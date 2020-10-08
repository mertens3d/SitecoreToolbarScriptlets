import { IStateOf_ } from "../../Interfaces/Data/States/IStateOf_";
import { StateFullProxyDisciminator } from "../../Enums/4000 - StateFullProxyDisciminator";

export class DefaultStateOfStateFullProxy implements IStateOf_ {
  StatefullDisciminatorFriendly: string = StateFullProxyDisciminator[StateFullProxyDisciminator.Unknown];
  StatefullDisciminator: StateFullProxyDisciminator = StateFullProxyDisciminator.Unknown;
}