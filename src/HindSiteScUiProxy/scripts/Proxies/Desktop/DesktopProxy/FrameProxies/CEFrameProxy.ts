import { ScProxyDisciminator } from "../../../../../../Shared/scripts/Enums/40 - ScProxyDisciminator";
import { IStateOfCEFrameProxy } from "../../../../../../Shared/scripts/Interfaces/Agents/IStateOfCEFrameProxy";
import { IStateFullFrameProxy } from "../../../../../../Shared/scripts/Interfaces/Proxies/StateFull/IStateFullFrameProxy";
import { _BaseScFrameProxy } from "./_BaseScFrameProxy";

export class CEFrameProxy extends _BaseScFrameProxy<IStateOfCEFrameProxy> implements IStateFullFrameProxy {
  Friendly: string;
  readonly ScProxyDisciminator = ScProxyDisciminator.CEFrame;
  readonly ScProxyDisciminatorFriendly = ScProxyDisciminator[ScProxyDisciminator.CEFrame];
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