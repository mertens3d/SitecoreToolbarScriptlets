import { DefaultStateOfContentTree } from "./DefaultStateOfContentTree";
import { IStateOfContentTreeBasedProxies } from "../../Interfaces/StateOf/IStateOfContentTreeBasedProxies";
import { ScProxyDisciminator } from "../../Enums/40 - ScProxyDisciminator";
import { IStateOf_ } from "../../Interfaces/StateOf/IStateOf_";

export abstract class _baseDefaultStateOfContentTreeBasedProxies implements IStateOfContentTreeBasedProxies {
  DisciminatorFriendly = ScProxyDisciminator[ScProxyDisciminator.Unknown];
  Disciminator = ScProxyDisciminator.Unknown;
  ContentTree = new DefaultStateOfContentTree();
  StateOfHostedProxies: IStateOf_[] = [];
}