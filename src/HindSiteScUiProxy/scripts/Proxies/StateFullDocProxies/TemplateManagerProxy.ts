import { ScProxyDisciminator } from "../../../../Shared/scripts/Enums/40 - ScProxyDisciminator";
import { ContentConst } from "../../../../Shared/scripts/Interfaces/InjectConst";
import { IScDocProxy } from "../../../../Shared/scripts/Interfaces/ScProxies/IBaseScDocProxy";
import { IStateOfTemplateManager } from "../../../../Shared/scripts/Interfaces/StateOf/IStateOfTemplateManager";
import { _ContentTreeBasedDocProxy } from "../ContentEditor/ContentEditorProxy/_ContentTreeBasedProxy";

export class TemplateManagerProxy extends _ContentTreeBasedDocProxy<IStateOfTemplateManager> implements IScDocProxy {
  readonly ScProxyDisciminator: ScProxyDisciminator = ScProxyDisciminator.TemplateManager;
  readonly ScProxyDisciminatorFriendly = ScProxyDisciminator[ScProxyDisciminator.TemplateManager];
  readonly TreeRootSelector: string = ContentConst.Const.Selector.SC.ContentTree.BuiltIn.TemplatesAnchorRootNode;
}