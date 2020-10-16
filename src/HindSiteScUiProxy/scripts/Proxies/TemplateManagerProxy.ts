import { ScDocProxyDisciminator } from "../../../Shared/scripts/Enums/40 - StateFullProxyDisciminator";
import { IStateFullDocProxy } from "../../../Shared/scripts/Interfaces/Agents/IStateFullProxy";
import { IStateOfTemplateManager } from "../../../Shared/scripts/Interfaces/Data/States/IStateOfTemplateManager";
import { ContentConst } from "../../../Shared/scripts/Interfaces/InjectConst";
import { _ContentTreeBasedProxy } from "./ContentEditor/ContentEditorProxy/_ContentTreeBasedProxy";

export class TemplateManagerProxy extends _ContentTreeBasedProxy<IStateOfTemplateManager> implements IStateFullDocProxy {
  readonly ScDocProxyDisciminator: ScDocProxyDisciminator = ScDocProxyDisciminator.TemplateManager;
  readonly ScDocProxyDisciminatorFriendly = ScDocProxyDisciminator[ScDocProxyDisciminator.TemplateManager];
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