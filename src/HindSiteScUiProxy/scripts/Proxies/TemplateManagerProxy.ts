import { StateFullProxyDisciminator } from "../../../Shared/scripts/Enums/4000 - StateFullProxyDisciminator";
import { IStateFullProxy } from "../../../Shared/scripts/Interfaces/Agents/IStateProxy";
import { IStateOfTemplateManager } from "../../../Shared/scripts/Interfaces/Data/States/IStateOfTemplateManager";
import { ContentConst } from "../../../Shared/scripts/Interfaces/InjectConst";
import { _ContentTreeBasedProxy } from "./ContentEditor/ContentEditorProxy/_ContentTreeBasedProxy";

export class TemplateManagerProxy extends _ContentTreeBasedProxy<IStateOfTemplateManager> implements IStateFullProxy {
  readonly TreeRootSelector: string = ContentConst.Const.Selector.SC.ContentTree.BuiltIn.TemplatesAnchorRootNode;
  readonly StateFullProxyDisciminator: StateFullProxyDisciminator = StateFullProxyDisciminator.TemplateManager;
  StateFullProxyDisciminatorFriendly = StateFullProxyDisciminator[StateFullProxyDisciminator.TemplateManager];

  async InstantiateAsyncMembers(): Promise<void> {

    return this.__baseInstantiateAsyncMembers();
    //this.Logger.FuncStart(this.InstantiateAsyncMembers.name, TemplateManagerProxy.name);
    //await this.__baseInstantiateAsyncMembers()
    //  .then(() => { })
    //  .catch((err) => this.ErrorHand.ErrorAndThrow(this.InstantiateAsyncMembers.name, err));
    //this.Logger.FuncEnd(this.InstantiateAsyncMembers.name, TemplateManagerProxy.name);
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