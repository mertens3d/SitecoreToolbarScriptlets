import { IStateFullProxy } from "../../../../../../Shared/scripts/Interfaces/Agents/IStateProxy";
import { IStateOfCEFrameProxy } from "../../../../../../Shared/scripts/Interfaces/Agents/IStateOfCEFrameProxy";
import { _BaseScFrameProxy } from "./_BaseScFrameProxy";
import { StateFullProxyDisciminator } from "../../../../../../Shared/scripts/Enums/4000 - StateFullProxyDisciminator";

export class CEFrameProxy extends _BaseScFrameProxy<IStateOfCEFrameProxy> implements IStateFullProxy {
  Friendly: string;
  StateFullProxyDisciminator = StateFullProxyDisciminator.CEFrame;
  FrameTypeDiscriminator = CEFrameProxy.name;

  SetState(stateOfCEFrameProxy: IStateOfCEFrameProxy): Promise<void> {
    return null;
  }

  GetState(): Promise<IStateOfCEFrameProxy> {
    return null;
  }

  async InstantiateAsyncMembers(): Promise<void> {
  }

  WireEvents() {
  }

  TriggerInboundEventsAsync(): void {
  }
}