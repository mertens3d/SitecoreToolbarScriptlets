import { IStateOfContentEditor } from "../../Interfaces/StateOf/IStateOfContentEditor";
import { ScProxyDisciminator } from "../../Enums/40 - StateFullProxyDisciminator";
import { _baseDefaultStateOfContentTreeBasedProxies } from "./_baseDefaultStateOfContentTreeBasedProxies";

export class DefaultStateOfContentEditor extends _baseDefaultStateOfContentTreeBasedProxies implements IStateOfContentEditor {
    DisciminatorFriendly = ScProxyDisciminator[ScProxyDisciminator.ContentEditor];
    Disciminator = ScProxyDisciminator.ContentEditor;
}
