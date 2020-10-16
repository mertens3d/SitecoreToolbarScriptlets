import { ScDocProxyDisciminator } from "../../../Shared/scripts/Enums/40 - StateFullProxyDisciminator";
import { IStateFullDocProxy } from "../../../Shared/scripts/Interfaces/Agents/IStateFullProxy";
import { IStateOfMarketingControlPanel } from "../../../Shared/scripts/Interfaces/Data/States/IStateOfMarketingControlPanel";
import { ContentConst } from "../../../Shared/scripts/Interfaces/InjectConst";
import { _ContentTreeBasedProxy } from "./ContentEditor/ContentEditorProxy/_ContentTreeBasedProxy";

export class MarketingControlPanelProxy extends _ContentTreeBasedProxy<IStateOfMarketingControlPanel> implements IStateFullDocProxy {
  readonly ScDocProxyDisciminator: ScDocProxyDisciminator = ScDocProxyDisciminator.MarketingControlPanel;
  readonly ScDocProxyDisciminatorFriendly = ScDocProxyDisciminator[ScDocProxyDisciminator.MarketingControlPanel];
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