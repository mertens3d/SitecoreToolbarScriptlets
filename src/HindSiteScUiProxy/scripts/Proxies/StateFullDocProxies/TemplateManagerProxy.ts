import { ScProxyDisciminator } from "../../../../Shared/scripts/Enums/40 - ScProxyDisciminator";
import { IStateFullDocProxy } from "../../../../Shared/scripts/Interfaces/Proxies/StateFull/IStateFullDocProxy";
import { IStateOfTemplateManager } from "../../../../Shared/scripts/Interfaces/StateOf/IStateOfTemplateManager";
import { ContentConst } from "../../../../Shared/scripts/Interfaces/InjectConst";
import { _ContentTreeBasedDocProxy } from "../ContentEditor/ContentEditorProxy/_ContentTreeBasedProxy";

export class TemplateManagerProxy extends _ContentTreeBasedDocProxy<IStateOfTemplateManager> implements IStateFullDocProxy {
  readonly ScProxyDisciminator: ScProxyDisciminator = ScProxyDisciminator.TemplateManager;
  readonly ScProxyDisciminatorFriendly = ScProxyDisciminator[ScProxyDisciminator.TemplateManager];
  readonly TreeRootSelector: string = ContentConst.Const.Selector.SC.ContentTree.BuiltIn.TemplatesAnchorRootNode;

  async InstantiateAsyncMembers(): Promise<void> {
    return this.__baseInstantiateAsyncMembers();
  }

  async WireEvents(): Promise<void> {
    this.__baseWireEvents();
  }

  async TriggerInboundEventsAsync(): Promise<void> {
    return this.__BaseTriggerInboundEventsAsync();
  }

  GetState(): Promise<IStateOfTemplateManager> {
    return this.__baseGetState();
  }

  async SetState(dataToRestore: IStateOfTemplateManager): Promise<void> {
     this.__baseSetState(dataToRestore);
  }
}