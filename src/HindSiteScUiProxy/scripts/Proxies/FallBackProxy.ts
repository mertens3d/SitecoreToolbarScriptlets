import { ScDocProxyDisciminator } from "../../../Shared/scripts/Enums/40 - StateFullProxyDisciminator";
import { IStateFullDocProxy } from "../../../Shared/scripts/Interfaces/Agents/IStateFullProxy";
import { _BaseStateFullDocProxy } from "./Desktop/DesktopProxy/FrameProxies/_StateProxy";
import { IStateOfFallBack } from "../../../Shared/scripts/Interfaces/Data/States/IStateOfFallBack";

export class FallBackProxy extends _BaseStateFullDocProxy<IStateOfFallBack> implements IStateFullDocProxy {
  readonly ScDocProxyDisciminatorFriendly = ScDocProxyDisciminator[ScDocProxyDisciminator.FallBack];
  readonly ScDocProxyDisciminator: ScDocProxyDisciminator = ScDocProxyDisciminator.FallBack;

  async GetState(): Promise<IStateOfFallBack> {
    let toReturn: IStateOfFallBack = {
      Disciminator: this.ScDocProxyDisciminator,
      DisciminatorFriendly: ScDocProxyDisciminator[this.ScDocProxyDisciminator]
    }
    try {
    } catch (err) {
      this.ErrorHand.HandleFatalError(this.GetState + '.' + FallBackProxy.name, err)
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