import { StateFullProxyDisciminator } from "../../../Shared/scripts/Enums/40 - StateFullProxyDisciminator";
import { IStateFullProxy } from "../../../Shared/scripts/Interfaces/Agents/IStateProxy";
import { IStateOfMarketingControlPanel } from "../../../Shared/scripts/Interfaces/Data/States/IStateOfMarketingControlPanel";
import { ContentConst } from "../../../Shared/scripts/Interfaces/InjectConst";
import { _ContentTreeBasedProxy } from "./ContentEditor/ContentEditorProxy/_ContentTreeBasedProxy";

export class MarketingControlPanelProxy extends _ContentTreeBasedProxy<IStateOfMarketingControlPanel> implements IStateFullProxy {
  readonly StateFullProxyDisciminator: StateFullProxyDisciminator = StateFullProxyDisciminator.MarketingControlPanel;
  readonly StateFullProxyDisciminatorFriendly = StateFullProxyDisciminator[StateFullProxyDisciminator.MarketingControlPanel];
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