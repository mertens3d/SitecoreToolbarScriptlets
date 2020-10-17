import { ScProxyDisciminator } from "../../Enums/40 - StateFullProxyDisciminator";
import { IStateOfTemplateManager } from "../../Interfaces/StateOf/IStateOfTemplateManager";
import { _baseDefaultStateOfContentTreeBasedProxies } from "./_baseDefaultStateOfContentTreeBasedProxies";

export class DefaultStateOfMediaLibrary extends _baseDefaultStateOfContentTreeBasedProxies implements IStateOfTemplateManager {
    DisciminatorFriendly = ScProxyDisciminator[ScProxyDisciminator.MediaLibrary];
    Disciminator = ScProxyDisciminator.MediaLibrary;
}
