import { IStateOfContentEditor } from "../../Interfaces/Data/States/IStateOfContentEditor";
import { StateFullProxyDisciminator } from "../../Enums/40 - StateFullProxyDisciminator";
import { _baseDefaultStateOfContentTreeBasedProxies } from "./_baseDefaultStateOfContentTreeBasedProxies";

export class DefaultStateOfContentEditor extends _baseDefaultStateOfContentTreeBasedProxies implements IStateOfContentEditor {
    DisciminatorFriendly = StateFullProxyDisciminator[StateFullProxyDisciminator.ContentEditor];
    Disciminator = StateFullProxyDisciminator.ContentEditor;
}
