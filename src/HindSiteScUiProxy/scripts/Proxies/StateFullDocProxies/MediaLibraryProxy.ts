import { ScProxyDisciminator } from "../../../../Shared/scripts/Enums/40 - ScProxyDisciminator";
import { IStateFullDocProxy } from "../../../../Shared/scripts/Interfaces/Proxies/StateFull/IStateFullDocProxy";
import { IStateOfMediaLibrary } from "../../../../Shared/scripts/Interfaces/StateOf/IStateOfMediaLibrary";
import { ContentConst } from "../../../../Shared/scripts/Interfaces/InjectConst";
import { _ContentTreeBasedDocProxy } from "../ContentEditor/ContentEditorProxy/_ContentTreeBasedProxy";

export class MediaLibraryProxy extends _ContentTreeBasedDocProxy<IStateOfMediaLibrary> implements IStateFullDocProxy {
  readonly TreeRootSelector: string = ContentConst.Const.Selector.SC.ContentTree.BuiltIn.MediaLibraryAnchorRootNode;
  readonly ScProxyDisciminator: ScProxyDisciminator = ScProxyDisciminator.MediaLibrary;
  readonly ScProxyDisciminatorFriendly = ScProxyDisciminator[ScProxyDisciminator.MediaLibrary];

  async InstantiateAsyncMembers(): Promise<void> {
    return this.__baseInstantiateAsyncMembers();
  }

  async  WireEvents(): Promise<void>{
    this.__baseWireEvents();
  }

  TriggerInboundEventsAsync(): void {
    this.__BaseTriggerInboundEventsAsync();
  }

  GetState(): Promise<IStateOfMediaLibrary> {
    return this.__baseGetState();
  }

  async SetState(dataToRestore: IStateOfMediaLibrary) : Promise<any>{
    return this.__baseSetState(dataToRestore);
  }
}