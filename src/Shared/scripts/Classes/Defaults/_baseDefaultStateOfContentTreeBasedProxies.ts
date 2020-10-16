import { DefaultStateOfContentTree } from "./DefaultStateOfContentTree";
import { IStateOfContentTreeBasedProxies } from "../../Interfaces/Data/States/IStateOfContentTreeBasedProxies";
import { ScDocProxyDisciminator } from "../../Enums/40 - StateFullProxyDisciminator";

export class _baseDefaultStateOfContentTreeBasedProxies implements IStateOfContentTreeBasedProxies {
  DisciminatorFriendly = ScDocProxyDisciminator[ScDocProxyDisciminator.Unknown];
  Disciminator = ScDocProxyDisciminator.Unknown;
  ContentTree = new DefaultStateOfContentTree();
}