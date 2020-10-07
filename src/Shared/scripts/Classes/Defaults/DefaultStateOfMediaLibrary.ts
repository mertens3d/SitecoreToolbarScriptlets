import { StateFullProxyDisciminator } from "../../Enums/4000 - StateFullProxyDisciminator";
import { IStateOfTemplateManager } from "../../Interfaces/Data/States/IStateOfTemplateManager";
import { _baseDefaultStateOfContentTreeBasedProxies } from "./DefaultStateOfContentEditor";

export class DefaultStateOfMediaLibrary extends _baseDefaultStateOfContentTreeBasedProxies implements IStateOfTemplateManager {
    StatefullDisciminatorFriendly = StateFullProxyDisciminator[StateFullProxyDisciminator.MediaLibrary];
    StatefullDisciminator = StateFullProxyDisciminator.MediaLibrary;
}
