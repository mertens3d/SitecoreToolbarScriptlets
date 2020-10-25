import { DefaultStateOfContentTree } from "./DefaultStateOfContentTree";
import { IStateOfContentTreeBasedProxies } from "../../Interfaces/StateOf/IStateOfContentTreeBasedProxies";
import { ScProxyDisciminator } from "../../Enums/40 - ScProxyDisciminator";
import { IStateOf_ } from "../../Interfaces/StateOf/IStateOf_";

export abstract class _baseDefaultStateOfContentTreeBasedProxies implements IStateOfContentTreeBasedProxies {
  DisciminatorFriendly = ScProxyDisciminator[ScProxyDisciminator.ContentTreeBased];
  Disciminator = ScProxyDisciminator.ContentTreeBased;
  ContentTree = new DefaultStateOfContentTree();
  Children: IStateOf_[] = [];
}