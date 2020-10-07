import { IStateOfContentEditor } from "../../Interfaces/Data/States/IStateOfContentEditor";
import { DefaultStateOfContentTree } from "./DefaultStateOfContentTree";
import { StateFullProxyDisciminator } from "../../Enums/4000 - StateFullProxyDisciminator";
import { IStateOfTemplateManager } from "../../Interfaces/Data/States/IStateOfTemplateManager";

export abstract class _baseDefaultStateOfContentTreeBasedProxies  {
  StateOfContentTree = new DefaultStateOfContentTree();

}

export class DefaultStateOfTemplateManager extends _baseDefaultStateOfContentTreeBasedProxies implements IStateOfTemplateManager{
  StatefullDisciminatorFriendly = StateFullProxyDisciminator[StateFullProxyDisciminator.TemplateManager];
  StatefullDisciminator = StateFullProxyDisciminator.TemplateManager;



}

export class DefaultStateOfContentEditor extends _baseDefaultStateOfContentTreeBasedProxies implements IStateOfContentEditor {
  StatefullDisciminatorFriendly = StateFullProxyDisciminator[StateFullProxyDisciminator.ContentEditor];
  StatefullDisciminator = StateFullProxyDisciminator.ContentEditor;
}