import { DefaultStateOfContentTree } from "./DefaultStateOfContentTree";
import { IStateOfContentTreeBasedProxies } from "../../Interfaces/StateOf/IStateOfContentTreeBasedProxies";
import { ScProxyDisciminator } from "../../Enums/40 - StateFullProxyDisciminator";

export class _baseDefaultStateOfContentTreeBasedProxies implements IStateOfContentTreeBasedProxies {
  DisciminatorFriendly = ScProxyDisciminator[ScProxyDisciminator.Unknown];
  Disciminator = ScProxyDisciminator.Unknown;
  ContentTree = new DefaultStateOfContentTree();
}