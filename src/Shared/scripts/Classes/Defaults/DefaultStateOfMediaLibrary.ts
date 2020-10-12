import { StateFullProxyDisciminator } from "../../Enums/40 - StateFullProxyDisciminator";
import { IStateOfTemplateManager } from "../../Interfaces/Data/States/IStateOfTemplateManager";
import { _baseDefaultStateOfContentTreeBasedProxies } from "./_baseDefaultStateOfContentTreeBasedProxies";

export class DefaultStateOfMediaLibrary extends _baseDefaultStateOfContentTreeBasedProxies implements IStateOfTemplateManager {
    DisciminatorFriendly = StateFullProxyDisciminator[StateFullProxyDisciminator.MediaLibrary];
    Disciminator = StateFullProxyDisciminator.MediaLibrary;
}
