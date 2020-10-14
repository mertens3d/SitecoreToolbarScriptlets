import { _baseStatelessFrameProxy } from "./_baseStatelessFrameProxy";
import { StateFullProxyDisciminator } from "../../../../../Shared/scripts/Enums/40 - StateFullProxyDisciminator";
import { IStateLessFrameProxy } from "../../../../../Shared/scripts/Interfaces/Agents/IStateLessFrameProxy";
import { DocumentJacket } from "../../../../../DOMJacket/Document/DocumentJacket";
import { IAPICore } from "../../../../../Shared/scripts/Interfaces/Agents/IAPICore";

export class JqueryModalDialogsFrameProxy extends _baseStatelessFrameProxy implements IStateLessFrameProxy {
  FrameSelectorOnHost: string = "[id=jqueryModalDialogsFrame]";
  readonly StateFullProxyDisciminator: StateFullProxyDisciminator = StateFullProxyDisciminator.JqueryModalDialogsFrameProxy;



  constructor(apiCore: IAPICore, hostJacket: DocumentJacket) {
    super(apiCore, hostJacket);
  }

  async InstantiateAsyncMembers(): Promise<void> {

    await this._base_InstantiateAsyncProperties()
      .catch((err) => this.ErrorHand.HandleFatalError(this.InstantiateAsyncMembers.name, err));
  }

  InstantiateHostedDoc() {
  }
}