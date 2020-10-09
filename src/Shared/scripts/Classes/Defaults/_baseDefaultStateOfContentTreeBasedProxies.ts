import { DefaultStateOfContentTree } from "./DefaultStateOfContentTree";
import { IStateOfContentTreeBasedProxies } from "../../Interfaces/Data/States/IStateOfContentTreeBasedProxies";
import { StateFullProxyDisciminator } from "../../Enums/4000 - StateFullProxyDisciminator";

export class _baseDefaultStateOfContentTreeBasedProxies implements IStateOfContentTreeBasedProxies {
  StatefullDisciminatorFriendly = StateFullProxyDisciminator[StateFullProxyDisciminator.Unknown];
  StatefullDisciminator = StateFullProxyDisciminator.Unknown;
  StateOfContentTree = new DefaultStateOfContentTree();
}