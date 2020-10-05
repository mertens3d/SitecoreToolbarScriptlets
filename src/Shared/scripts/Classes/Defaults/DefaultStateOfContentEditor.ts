import { IStateOfContentEditor } from "../../Interfaces/Data/States/IStateOfContentEditor";
import { DefaultStateOfContentTree } from "./DefaultStateOfContentTree";
import { StateFullProxyDisciminator } from "../../Enums/4000 - StateFullProxyDisciminator";

export class DefaultStateOfContentEditor implements IStateOfContentEditor {
  StatefullDisciminatorFriendly = StateFullProxyDisciminator[StateFullProxyDisciminator.ContentEditor];
  StateOfContentTree = new DefaultStateOfContentTree();
  StatefullDisciminator = StateFullProxyDisciminator.ContentEditor;
}