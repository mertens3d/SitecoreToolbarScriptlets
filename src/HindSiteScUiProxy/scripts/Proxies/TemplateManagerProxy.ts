import { DefaultStateOfTemplateManager } from "../../../Shared/scripts/Classes/Defaults/DefaultStateOfTemplateManager";
import { StateFullProxyDisciminator } from "../../../Shared/scripts/Enums/4000 - StateFullProxyDisciminator";
import { IStateFullProxy } from "../../../Shared/scripts/Interfaces/Agents/IStateProxy";
import { IStateOfContentTree } from "../../../Shared/scripts/Interfaces/Data/States/IStateOfContentTree";
import { IStateOfTemplateManager } from "../../../Shared/scripts/Interfaces/Data/States/IStateOfTemplateManager";
import { _ContentTreeBasedProxy } from "./ContentEditor/ContentEditorProxy/_ContentTreeBasedProxy";
import { Guid } from "../../../Shared/scripts/Helpers/Guid";
import { ContentConst } from "../../../Shared/scripts/Interfaces/InjectConst";

export class TemplateManagerProxy extends _ContentTreeBasedProxy<IStateOfTemplateManager> implements IStateFullProxy {
  readonly TreeRootSelector: string = ContentConst.Const.Selector.SC.ContentTree.BuiltIn.TemplatesAnchorRootNode;
  readonly StateFullProxyDisciminator: StateFullProxyDisciminator = StateFullProxyDisciminator.TemplateManager;

  async InstantiateAsyncMembers(): Promise<void> {
    this.Logger.FuncStart(this.InstantiateAsyncMembers.name, TemplateManagerProxy.name);
    await this.__baseInstantiateAsyncMembers()
      .then(() => { })
      .catch((err) => this.ErrorHand.ErrorAndThrow(this.InstantiateAsyncMembers.name, err));
    this.Logger.FuncEnd(this.InstantiateAsyncMembers.name, TemplateManagerProxy.name);
  }

  WireEvents() {
    this.__baseWireEvents();
  }

  TriggerInboundEventsAsync(): void {
    //empty
  }

  GetState(): Promise<IStateOfTemplateManager> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.GetState.name, TemplateManagerProxy.name);

      let toreturnStateOfTemplateManager: IStateOfTemplateManager = new DefaultStateOfTemplateManager();

      await this.ContentTreeProxy.GetStateOfContentTree()
        .then((stateOfContentTree: IStateOfContentTree) => toreturnStateOfTemplateManager.StateOfContentTree = stateOfContentTree)
        .then(() => resolve(toreturnStateOfTemplateManager))
        .catch((err) => reject(this.GetState.name + ' | ' + err));
      this.Logger.FuncEnd(this.GetState.name, TemplateManagerProxy.name);
    });
  }

  async SetState(dataToRestore: IStateOfTemplateManager) {
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