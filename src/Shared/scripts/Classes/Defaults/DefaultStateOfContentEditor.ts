import { IStateOfContentEditor } from "../../Interfaces/Data/States/IStateOfContentEditor";
import { ScDocProxyDisciminator } from "../../Enums/40 - StateFullProxyDisciminator";
import { _baseDefaultStateOfContentTreeBasedProxies } from "./_baseDefaultStateOfContentTreeBasedProxies";

export class DefaultStateOfContentEditor extends _baseDefaultStateOfContentTreeBasedProxies implements IStateOfContentEditor {
    DisciminatorFriendly = ScDocProxyDisciminator[ScDocProxyDisciminator.ContentEditor];
    Disciminator = ScDocProxyDisciminator.ContentEditor;
}
