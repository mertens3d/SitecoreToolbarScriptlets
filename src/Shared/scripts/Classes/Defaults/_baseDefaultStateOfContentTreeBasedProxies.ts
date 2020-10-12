import { DefaultStateOfContentTree } from "./DefaultStateOfContentTree";
import { IStateOfContentTreeBasedProxies } from "../../Interfaces/Data/States/IStateOfContentTreeBasedProxies";
import { StateFullProxyDisciminator } from "../../Enums/40 - StateFullProxyDisciminator";

export class _baseDefaultStateOfContentTreeBasedProxies implements IStateOfContentTreeBasedProxies {
  DisciminatorFriendly = StateFullProxyDisciminator[StateFullProxyDisciminator.Unknown];
  Disciminator = StateFullProxyDisciminator.Unknown;
  ContentTree = new DefaultStateOfContentTree();
}