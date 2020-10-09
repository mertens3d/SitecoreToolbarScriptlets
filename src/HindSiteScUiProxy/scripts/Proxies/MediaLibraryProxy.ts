import { DefaultStateOfMediaLibrary } from "../../../Shared/scripts/Classes/Defaults/DefaultStateOfMediaLibrary";
import { StateFullProxyDisciminator } from "../../../Shared/scripts/Enums/4000 - StateFullProxyDisciminator";
import { Guid } from "../../../Shared/scripts/Helpers/Guid";
import { IStateFullProxy } from "../../../Shared/scripts/Interfaces/Agents/IStateProxy";
import { IStateOfContentTree } from "../../../Shared/scripts/Interfaces/Data/States/IStateOfContentTree";
import { IStateOfMediaLibrary } from "../../../Shared/scripts/Interfaces/Data/States/IStateOfMediaLibrary";
import { ContentConst } from "../../../Shared/scripts/Interfaces/InjectConst";
import { _ContentTreeBasedProxy } from "./ContentEditor/ContentEditorProxy/_ContentTreeBasedProxy";

export class MediaLibraryProxy extends _ContentTreeBasedProxy<IStateOfMediaLibrary> implements IStateFullProxy {
  readonly TreeRootSelector: string = ContentConst.Const.Selector.SC.ContentTree.BuiltIn.MediaLibraryAnchorRootNode;
  readonly StateFullProxyDisciminator: StateFullProxyDisciminator = StateFullProxyDisciminator.MediaLibrary;
  StateFullProxyDisciminatorFriendly = StateFullProxyDisciminator[StateFullProxyDisciminator.MediaLibrary];

  async InstantiateAsyncMembers(): Promise<void> {
    this.Logger.FuncStart(this.InstantiateAsyncMembers.name, MediaLibraryProxy.name);
    await this.__baseInstantiateAsyncMembers()
      .then(() => { })
      .catch((err) => this.ErrorHand.ErrorAndThrow(this.InstantiateAsyncMembers.name, err));
    this.Logger.FuncEnd(this.InstantiateAsyncMembers.name, MediaLibraryProxy.name);
  }

  WireEvents() {
    this.__baseWireEvents();
  }

  TriggerInboundEventsAsync(): void {
    //empty
  }

  GetState(): Promise<IStateOfMediaLibrary> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.GetState.name, MediaLibraryProxy.name);

      let toreturnStateOfMediaLibrary: IStateOfMediaLibrary = new DefaultStateOfMediaLibrary();

      await this.ContentTreeProxy.GetStateOfContentTree()
        .then((stateOfContentTree: IStateOfContentTree) => toreturnStateOfMediaLibrary.StateOfContentTree = stateOfContentTree)
        .then(() => resolve(toreturnStateOfMediaLibrary))
        .catch((err) => reject(this.GetState.name + ' | ' + err));
      this.Logger.FuncEnd(this.GetState.name, MediaLibraryProxy.name);
    });
  }

  async SetState(dataToRestore: IStateOfMediaLibrary) {
    return new Promise<boolean>(async (resolve, reject) => {
      this.Logger.FuncStart(this.SetState.name, _ContentTreeBasedProxy.name + ' ' + Guid.AsShort(this.DocumentJacket.DocId));

      let StateResponse: boolean = false;

      await this.__baseSetState(dataToRestore)
        .then((response: boolean) => StateResponse = response)
        .then(() => {
          resolve(StateResponse);
        })
        .catch((err) => {
          reject(this.SetState.name + " " + err);
        });

      this.Logger.FuncEnd(this.SetState.name, _ContentTreeBasedProxy.name);
    });
  }
}