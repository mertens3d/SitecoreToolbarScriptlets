import { StateFullProxyDisciminator } from "../../../Shared/scripts/Enums/40 - StateFullProxyDisciminator";
import { IStateFullProxy } from "../../../Shared/scripts/Interfaces/Agents/IStateFullProxy";
import { IStateOfMediaLibrary } from "../../../Shared/scripts/Interfaces/Data/States/IStateOfMediaLibrary";
import { ContentConst } from "../../../Shared/scripts/Interfaces/InjectConst";
import { _ContentTreeBasedProxy } from "./ContentEditor/ContentEditorProxy/_ContentTreeBasedProxy";

export class MediaLibraryProxy extends _ContentTreeBasedProxy<IStateOfMediaLibrary> implements IStateFullProxy {
  readonly TreeRootSelector: string = ContentConst.Const.Selector.SC.ContentTree.BuiltIn.MediaLibraryAnchorRootNode;
  readonly StateFullProxyDisciminator: StateFullProxyDisciminator = StateFullProxyDisciminator.MediaLibrary;
  readonly StateFullProxyDisciminatorFriendly = StateFullProxyDisciminator[StateFullProxyDisciminator.MediaLibrary];

  async InstantiateAsyncMembers(): Promise<void> {
    return this.__baseInstantiateAsyncMembers();
  }

  WireEvents() {
    this.__baseWireEvents();
  }

  TriggerInboundEventsAsync(): void {
    this.__BaseTriggerInboundEventsAsync();
  }

  GetState(): Promise<IStateOfMediaLibrary> {
    return this.__baseGetState();
  }

  async SetState(dataToRestore: IStateOfMediaLibrary) {
    return this.__baseSetState(dataToRestore);
  }
}