import { ScProxyDisciminator } from "../../Enums/40 - ScProxyDisciminator";
import { IStateOfContentTree } from "../../Interfaces/StateOf/IStateOfContentTree";
import { IStateOfScContentTreeNodeDeep } from "../../Interfaces/StateOf/IStateOfScContentTreeNode";
import { IStateOfScContentTreeNodeShallow } from "../../Interfaces/StateOf/IStateOfScContentTreeNodeShallow";
import { IStateOf_ } from "../../Interfaces/StateOf/IStateOf_";

export class DefaultStateOfContentTree implements IStateOfContentTree {
  Disciminator = ScProxyDisciminator.ContentTreeElem;
  DisciminatorFriendly = ScProxyDisciminator[ScProxyDisciminator.ContentTreeElem];
  StateOfHostedProxies: IStateOf_[];
  ActiveNodeShallow: IStateOfScContentTreeNodeShallow = null;
  ContentTreeNodeDeep: IStateOfScContentTreeNodeDeep = null;
}