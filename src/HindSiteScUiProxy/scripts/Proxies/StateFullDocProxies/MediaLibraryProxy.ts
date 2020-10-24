import { ScProxyDisciminator } from "../../../../Shared/scripts/Enums/40 - ScProxyDisciminator";
import { ContentConst } from "../../../../Shared/scripts/Interfaces/InjectConst";
import { IScDocProxy } from "../../../../Shared/scripts/Interfaces/ScProxies/IBaseScDocProxy";
import { IStateOfMediaLibrary } from "../../../../Shared/scripts/Interfaces/StateOf/IStateOfMediaLibrary";
import { _ContentTreeBasedDocProxy } from "../ContentEditor/ContentEditorProxy/_ContentTreeBasedProxy";

export class MediaLibraryProxy extends _ContentTreeBasedDocProxy<IStateOfMediaLibrary> implements IScDocProxy {
  readonly TreeRootSelector: string = ContentConst.Const.Selector.SC.ContentTree.BuiltIn.MediaLibraryAnchorRootNode;
  readonly ScProxyDisciminator: ScProxyDisciminator = ScProxyDisciminator.MediaLibrary;
  readonly ScProxyDisciminatorFriendly = ScProxyDisciminator[ScProxyDisciminator.MediaLibrary];

  async InstantiateAsyncMembersSelf(): Promise<void> {
    return this.__baseInstantiateAsyncMembers();
  }

  async  WireEventsSelf(): Promise<void>{
    this.__baseWireEvents();
  }

  TriggerEventsForInboundSelf(): void {
    this.__BaseTriggerInboundEventsAsync();
  }

  GetStateOfSelf(): Promise<IStateOfMediaLibrary> {
    return this.__baseGetState();
  }

  async SetStateSelf(dataToRestore: IStateOfMediaLibrary) : Promise<any>{
    return this.__baseSetState(dataToRestore);
  }
}