import { ScProxyDisciminator } from "../../../../Shared/scripts/Enums/40 - ScProxyDisciminator";
import { ContentConst } from "../../../../Shared/scripts/Interfaces/InjectConst";
import { IScDocProxy } from "../../../../Shared/scripts/Interfaces/ScProxies/IBaseScDocProxy";
import { IStateOfMarketingControlPanel } from "../../../../Shared/scripts/Interfaces/StateOf/IStateOfMarketingControlPanel";
import { _ContentTreeBasedDocProxy } from "../ContentEditor/ContentEditorProxy/_ContentTreeBasedProxy";

export class MarketingControlPanelDocProxy extends _ContentTreeBasedDocProxy<IStateOfMarketingControlPanel> implements IScDocProxy {
  readonly ScProxyDisciminator: ScProxyDisciminator = ScProxyDisciminator.MarketingControlPanel;
  readonly ScProxyDisciminatorFriendly = ScProxyDisciminator[ScProxyDisciminator.MarketingControlPanel];
  readonly TreeRootSelector: string = ContentConst.Const.Selector.SC.ContentTree.BuiltIn.MarketingControlPanelRoodNode;
}