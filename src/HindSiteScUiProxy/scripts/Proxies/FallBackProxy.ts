import { StateFullProxyDisciminator } from "../../../Shared/scripts/Enums/40 - StateFullProxyDisciminator";
import { IStateFullProxy } from "../../../Shared/scripts/Interfaces/Agents/IStateProxy";
import { _BaseStateFullProxy } from "./Desktop/DesktopProxy/FrameProxies/_StateProxy";
import { IStateOfFallBack } from "../../../Shared/scripts/Interfaces/Data/States/IStateOfFallBack";

export class FallBackProxy extends _BaseStateFullProxy<IStateOfFallBack> implements IStateFullProxy {
  StateFullProxyDisciminatorFriendly = StateFullProxyDisciminator[StateFullProxyDisciminator.FallBack];
  readonly StateFullProxyDisciminator: StateFullProxyDisciminator = StateFullProxyDisciminator.FallBack;

  async GetState(): Promise<IStateOfFallBack> {
    let toReturn: IStateOfFallBack = {
      Disciminator: this.StateFullProxyDisciminator,
      DisciminatorFriendly: StateFullProxyDisciminator[this.StateFullProxyDisciminator]
    }
    try {
    } catch (err) {
      this.ErrorHand.ErrorAndThrow(this.GetState + '.' + FallBackProxy.name, err)
    }

    return toReturn;
  }

  async SetState(state: any) {
    //empty
  }

  WireEvents() {
    //empty
  }

  async InstantiateAsyncMembers(): Promise<void> {
    //empty
  }

  TriggerInboundEventsAsync(): void {
    //empty
  }
}