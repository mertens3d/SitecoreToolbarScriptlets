import { IStateFullDocProxy } from "../../../../../../Shared/scripts/Interfaces/Agents/IStateFullProxy";
import { IStateOfCEFrameProxy } from "../../../../../../Shared/scripts/Interfaces/Agents/IStateOfCEFrameProxy";
import { _BaseScFrameProxy } from "./_BaseScFrameProxy";
import { ScDocProxyDisciminator } from "../../../../../../Shared/scripts/Enums/40 - StateFullProxyDisciminator";

export class CEFrameProxy extends _BaseScFrameProxy<IStateOfCEFrameProxy> implements IStateFullDocProxy {
  Friendly: string;
  readonly ScDocProxyDisciminator = ScDocProxyDisciminator.CEFrame;
  readonly ScDocProxyDisciminatorFriendly = ScDocProxyDisciminator[ScDocProxyDisciminator.CEFrame];
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