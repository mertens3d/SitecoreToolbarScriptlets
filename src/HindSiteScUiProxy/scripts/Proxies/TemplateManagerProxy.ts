import { StateFullProxyDisciminator } from "../../../Shared/scripts/Enums/40 - StateFullProxyDisciminator";
import { IStateFullProxy } from "../../../Shared/scripts/Interfaces/Agents/IStateProxy";
import { IStateOfTemplateManager } from "../../../Shared/scripts/Interfaces/Data/States/IStateOfTemplateManager";
import { ContentConst } from "../../../Shared/scripts/Interfaces/InjectConst";
import { _ContentTreeBasedProxy } from "./ContentEditor/ContentEditorProxy/_ContentTreeBasedProxy";

export class TemplateManagerProxy extends _ContentTreeBasedProxy<IStateOfTemplateManager> implements IStateFullProxy {
  readonly StateFullProxyDisciminator: StateFullProxyDisciminator = StateFullProxyDisciminator.TemplateManager;
  readonly StateFullProxyDisciminatorFriendly = StateFullProxyDisciminator[StateFullProxyDisciminator.TemplateManager];
  readonly TreeRootSelector: string = ContentConst.Const.Selector.SC.ContentTree.BuiltIn.TemplatesAnchorRootNode;

  async InstantiateAsyncMembers(): Promise<void> {
    return this.__baseInstantiateAsyncMembers();
  }

  WireEvents() {
    this.__baseWireEvents();
  }

  TriggerInboundEventsAsync(): void {
    return this.__BaseTriggerInboundEventsAsync();
  }

  GetState(): Promise<IStateOfTemplateManager> {
    return this.__baseGetState();
  }

  async SetState(dataToRestore: IStateOfTemplateManager): Promise<boolean> {
    return this.__baseSetState(dataToRestore);
  }
}