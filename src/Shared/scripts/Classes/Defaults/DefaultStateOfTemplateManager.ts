import { ScProxyDisciminator } from "../../Enums/40 - ScProxyDisciminator";
import { IStateOfTemplateManager } from "../../Interfaces/StateOf/IStateOfTemplateManager";
import { _baseDefaultStateOfContentTreeBasedProxies } from "./_baseDefaultStateOfContentTreeBasedProxies";

export class DefaultStateOfTemplateManager extends _baseDefaultStateOfContentTreeBasedProxies implements IStateOfTemplateManager {
  DisciminatorFriendly = ScProxyDisciminator[ScProxyDisciminator.TemplateManager];
  Disciminator = ScProxyDisciminator.TemplateManager;
}