import { ScProxyDisciminator } from "../../../../Shared/scripts/Enums/40 - StateFullProxyDisciminator";
import { IStateFullDocProxy } from "../../../../Shared/scripts/Interfaces/Proxies/StateFull/IStateFullDocProxy";
import { IStateOfMarketingControlPanel } from "../../../../Shared/scripts/Interfaces/StateOf/IStateOfMarketingControlPanel";
import { ContentConst } from "../../../../Shared/scripts/Interfaces/InjectConst";
import { _ContentTreeBasedDocProxy } from "../ContentEditor/ContentEditorProxy/_ContentTreeBasedProxy";

export class MarketingControlPanelDocProxy extends _ContentTreeBasedDocProxy<IStateOfMarketingControlPanel> implements IStateFullDocProxy {
  readonly ScProxyDisciminator: ScProxyDisciminator = ScProxyDisciminator.MarketingControlPanel;
  readonly ScProxyDisciminatorFriendly = ScProxyDisciminator[ScProxyDisciminator.MarketingControlPanel];
  readonly TreeRootSelector: string = ContentConst.Const.Selector.SC.ContentTree.BuiltIn.MarketingControlPanelRoodNode;

  async InstantiateAsyncMembers(): Promise<void> {
    return this.__baseInstantiateAsyncMembers();
  }

  WireEvents() {
    this.__baseWireEvents();
  }

  TriggerInboundEventsAsync(): void {
    return this.__BaseTriggerInboundEventsAsync();
  }

  GetState(): Promise<IStateOfMarketingControlPanel> {
    return this.__baseGetState();
  }

  async SetState(dataToRestore: IStateOfMarketingControlPanel): Promise<boolean> {
    return this.__baseSetState(dataToRestore);
  }
}