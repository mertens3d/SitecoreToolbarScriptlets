import { StateFullProxyDisciminator } from "../../Enums/4000 - StateFullProxyDisciminator";
import { IStateOfTemplateManager } from "../../Interfaces/Data/States/IStateOfTemplateManager";
import { _baseDefaultStateOfContentTreeBasedProxies } from "./_baseDefaultStateOfContentTreeBasedProxies";

export class DefaultStateOfTemplateManager extends _baseDefaultStateOfContentTreeBasedProxies implements IStateOfTemplateManager {
    StatefullDisciminatorFriendly = StateFullProxyDisciminator[StateFullProxyDisciminator.TemplateManager];
    StatefullDisciminator = StateFullProxyDisciminator.TemplateManager;



}
