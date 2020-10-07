import { IStateOfContentEditor } from "../../Interfaces/Data/States/IStateOfContentEditor";
import { StateFullProxyDisciminator } from "../../Enums/4000 - StateFullProxyDisciminator";
import { _baseDefaultStateOfContentTreeBasedProxies } from "./DefaultStateOfContentEditor";

export class DefaultStateOfContentEditor extends _baseDefaultStateOfContentTreeBasedProxies implements IStateOfContentEditor {
    StatefullDisciminatorFriendly = StateFullProxyDisciminator[StateFullProxyDisciminator.ContentEditor];
    StatefullDisciminator = StateFullProxyDisciminator.ContentEditor;
}
