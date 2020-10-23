import { IStateOf_ } from "../../Interfaces/StateOf/IStateOf_";
import { ScProxyDisciminator } from "../../Enums/40 - ScProxyDisciminator";

export class DefaultStateOfStateFullProxy implements IStateOf_ {
  DisciminatorFriendly: string = ScProxyDisciminator[ScProxyDisciminator.Unknown];
  Disciminator: ScProxyDisciminator = ScProxyDisciminator.Unknown;
  StateOfHostedProxies: IStateOf_[] = [];
}